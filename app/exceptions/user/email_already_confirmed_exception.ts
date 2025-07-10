import { Exception } from '@adonisjs/core/exceptions'

export default class EmailAlreadyConfirmedException extends Exception {
  static status = 400
  static message = 'Email already confirmed'
}
