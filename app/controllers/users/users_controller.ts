// import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { UserService } from '#services/users/user_service'
import { createUserValidator, loginUserValidator } from '#validators/users/user'
import User from '#models/user'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}

  async signup(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(createUserValidator)
    const user = await this.userService.create(payload)
    return {
      message: 'User created successfully, check your email for account verification',
      user: user,
    }
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
}
