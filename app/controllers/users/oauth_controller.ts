// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import { OauthService } from '#services/users/oauth_service'
import { inject } from '@adonisjs/core'
import { GithubDriver } from '@adonisjs/ally/drivers/github'
import { GoogleDriver } from '@adonisjs/ally/drivers/google'

@inject()
export default class OauthController {
  constructor(protected oauthService: OauthService) {}

  async redirect({ ally, params }: HttpContext) {
    console.log(params)
    return ally.use(params.provider).redirect()
  }

  async callback({ ally, response, auth, params }: HttpContext) {
    const provider: GithubDriver | GoogleDriver = ally.use(params.provider)

    if (provider.accessDenied())
      return response.badRequest({ error: 'You have cancelled the login process' })
    if (provider.stateMisMatch())
      return response.badRequest({ error: 'We are unable to verify the request. Please try again' })
    if (provider.hasError()) return provider.getError()

    return await this.oauthService.callback(provider, auth)
  }
}
