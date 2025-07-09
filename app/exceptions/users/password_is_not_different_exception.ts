import { Exception } from '@adonisjs/core/exceptions'

export default class PasswordIsNotDifferentException extends Exception {
  static status = 422
  static message = 'New password must be different'
}
