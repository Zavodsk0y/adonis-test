import { BaseMail } from '@adonisjs/mail'
import User from '#models/user'
import env from '#start/env'

export default class VerifyEmailNotification extends BaseMail {
  constructor(private user: User) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    const verificationUrl = `${env.get('APP_URL')}/verify-email/${this.user.emailTokenConfirmation}`
    console.log(verificationUrl)

    this.message.to(this.user.email)
    this.message.from('zimniyvolk5@gmail.com')
    this.subject = 'Verify email notification'
    this.message.html(`
        <h2>Hello ${this.user.fullName}!</h2>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">Verify Email Address</a>
        <p>If you did not create an account, no further action is required.</p>
        <p>If you can't click on link, copy and paste: ${verificationUrl}</p>
      `)
  }
}
