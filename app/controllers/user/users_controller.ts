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

  /**
   * @login
   * @tag User
   * @requestBody <loginUserValidator>
   * @responseBody 200 - {"message": "User login successfully", "token": "xxxxxx"}
   */
  async login(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(loginUserValidator)
    const token = await this.userService.login(payload)
    return { message: 'User login successfully', token }
  }

  /**
   * @emailVerify
   * @tag User
   * @paramPath token - The token of the verify - @type(string)
   * @responseBody 200 - {"message": "Email confirmed successfully"}
   */
  async emailVerify({ params }: HttpContext) {
    const token = params.token
    await this.userService.verify(token)
    return { message: 'Email confirmed successfully' }
  }

  async index() {
    return await User.all()
  }

  /**
   * @changeFullName
   * @tag User
   * @requestBody <changeFullNameValidator>
   * @responseBody 200 - {"message": "Full name updated successfully", "user": "<User>"}
   */
  async changeFullName(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(changeFullNameValidator)
    const user = ctx.auth.user!
    await this.userService.updateFullName(user, payload)
    return ctx.response.status(200).json({ message: 'Full name updated successfully', user })
  }

  /**
   * @changeEmail
   * @tag User
   * @requestBody <changeEmailValidator>
   * @responseBody 200 - {"message": "Email updated successfully, check your email for verification", "user": "<User>"}
   */
  async changeEmail(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(changeEmailValidator)
    const user = ctx.auth.user!
    await this.userService.updateEmail(user, payload)
    return ctx.response
      .status(200)
      .json({ message: 'Email updated successfully, check your email for verification', user })
  }

  /**
   * @changePassword
   * @tag User
   * @requestBody <changePasswordValidator>
   * @responseBody 200 - {"message": "Password updated", "user": "<User>"}
   */
  async changePassword(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(changePasswordValidator)
    const user = ctx.auth.user!
    await this.userService.updatePassword(user, payload)
    return ctx.response.status(200).json({ message: 'Password updated', user })
  }
}
