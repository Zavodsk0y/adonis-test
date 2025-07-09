import { inject } from '@adonisjs/core'
import User from '#models/user'
import { CreateUserSchemaType, LoginUserSchemaType } from '#validators/users/user'
import EmailAlreadyInUseException from '#exceptions/users/email_already_in_use_exception'
import UserNotFoundException from '#exceptions/users/user_not_found_exception'
import { HttpContext } from '@adonisjs/core/http'
import string from '@adonisjs/core/helpers/string'
import VerifyEmailNotification from '#mails/verify_email_notification'
import mail from '@adonisjs/mail/services/main'
import EmailAlreadyConfirmedException from '#exceptions/users/email_already_confirmed_exception'

@inject()
export class UserService {
  constructor(protected ctx: HttpContext) {}

  async create(data: CreateUserSchemaType): Promise<User> {
    if (await User.findBy('email', data.email)) throw EmailAlreadyInUseException
    const user = await User.create(data)
    user.emailTokenConfirmation = string.random(64)
    await user.save()
    await mail.send(new VerifyEmailNotification(user))
    return user
  }

  async verify(token: string) {
    const user = await User.findBy('email_token_confirmation', token)
    if (!user) throw UserNotFoundException
    if (user.isVerified) throw EmailAlreadyConfirmedException
    user.isVerified = true
    await user.save()
  }

  async login(data: LoginUserSchemaType) {
    if (!(await User.findBy('email', data.email))) throw UserNotFoundException
    const user = await User.verifyCredentials(data.email, data.password)
    return await this.ctx.auth.use('api').createToken(user)
  }
}
