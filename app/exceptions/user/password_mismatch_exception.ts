import { Exception } from '@adonisjs/core/exceptions'

export default class PasswordMismatchException extends Exception {
  static status = 422
  static message = 'Current password is incorrect'
}
