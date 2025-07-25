// import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { UserService } from '#services/user/user_service'
import {
  changeEmailValidator,
  changeFullNameValidator,
  changePasswordValidator,
  createUserValidator,
  loginUserValidator,
} from '#validators/user/user_validator'
import User from '#models/user'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}

  /**
   * @signup
   * @tag User
   * @requestBody <createUserValidator>
   * @responseBody 201 - {"message": "User created successfully, check your email for account verification", "user": <User>}
   */
  async signup(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(createUserValidator)
    const user = await this.userService.create(payload)
    return ctx.response.status(201).json({
      message: 'User created successfully, check your email for account verification',
      user: user,
    })
  }

  async login(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(loginUserValidator)
    const token = await this.userService.login(payload)
    return { message: 'User login successfully', token }
  }

  async emailVerify({ params }: HttpContext) {
    const token = params.token
    await this.userService.verify(token)
    return { message: 'Email confirmed successfully' }
  }

  async index() {
    return await User.all()
  }

  async changeFullName(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(changeFullNameValidator)
    const user = ctx.auth.user!
    await this.userService.updateFullName(user, payload)
    return ctx.response.status(200).json({ message: 'Full name updated successfully', user })
  }

  async changeEmail(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(changeEmailValidator)
    const user = ctx.auth.user!
    await this.userService.updateEmail(user, payload)
    return ctx.response
      .status(200)
      .json({ message: 'Email updated successfully, check your email for verification', user })
  }

  async changePassword(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(changePasswordValidator)
    const user = ctx.auth.user!
    await this.userService.updatePassword(user, payload)
    return ctx.response.status(200).json({ message: 'Password updated', user })
  }
}
