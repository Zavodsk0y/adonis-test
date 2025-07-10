import { GithubDriver } from '@adonisjs/ally/drivers/github'
import User from '#models/user'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { GoogleDriver } from '@adonisjs/ally/drivers/google'

export class OauthService {
  async callback(ally: GithubDriver | GoogleDriver, auth: Authenticator<Authenticators>) {
    const { email, name, id: providerId } = await ally.user()

    const user = await User.firstOrCreate(
      { email },
      {
        email: email,
        fullName: name,
        provider: ally instanceof GoogleDriver ? 'google' : 'github',
        providerId: providerId,
        isVerified: true,
      }
    )

    const token = await auth.use('api').createToken(user)

    return {
      user,
      token,
    }
  }
}
