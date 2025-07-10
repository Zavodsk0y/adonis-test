import { inject } from '@adonisjs/core'
import User from '#models/user'
import {
  ChangeEmailSchemaType,
  ChangeFullNameSchemaType, ChangePasswordSchemaType,
  CreateUserSchemaType,
  LoginUserSchemaType,
} from '#validators/user/user_validator'
import UserNotFoundException from '#exceptions/user/user_not_found_exception'
import { HttpContext } from '@adonisjs/core/http'
import string from '@adonisjs/core/helpers/string'
import VerifyEmailNotification from '#mails/verify_email_notification'
import mail from '@adonisjs/mail/services/main'
import EmailAlreadyConfirmedException from '#exceptions/user/email_already_confirmed_exception'
import hash from "@adonisjs/core/services/hash";
import PasswordMismatchException from "#exceptions/user/password_mismatch_exception";
import PasswordIsNotDifferentException from "#exceptions/user/password_is_not_different_exception";

@inject()
export class UserService {
  constructor(protected ctx: HttpContext) {}

  async create(data: CreateUserSchemaType): Promise<User> {
    const user = await User.create(data)
    await user.merge({ emailTokenConfirmation: string.random(64) }).save()
    await mail.send(new VerifyEmailNotification(user))
    return user
  }

  async verify(token: string) {
    const user = await User.findBy('email_token_confirmation', token)
    if (!user) throw UserNotFoundException
    if (user.isVerified) throw EmailAlreadyConfirmedException
    await user.merge({ isVerified: true, emailTokenConfirmation: null }).save()
  }

  async login(payload: LoginUserSchemaType) {
    if (!(await User.findBy('email', payload.email))) throw UserNotFoundException
    const user = await User.verifyCredentials(payload.email, payload.password)
    return await this.ctx.auth.use('api').createToken(user)
  }

  async updateFullName(user: User, payload: ChangeFullNameSchemaType) {
    return await user.merge(payload).save()
  }

  async updateEmail(user: User, payload: ChangeEmailSchemaType) {
    const emailTokenConfirmation = string.random(64)
    await user.merge({ ...payload, isVerified: false, emailTokenConfirmation }).save()
    await mail.send(new VerifyEmailNotification(user))
  }

  async updatePassword(user: User, payload: ChangePasswordSchemaType) {
    const { new_password: newPassword, old_password: oldPassword } = payload

    if (!await hash.verify(user.password!, oldPassword)) throw new PasswordMismatchException
    if (await hash.verify(user.password!, newPassword)) throw new PasswordIsNotDifferentException

    await user.merge({ password: newPassword }).save()
  }
}
