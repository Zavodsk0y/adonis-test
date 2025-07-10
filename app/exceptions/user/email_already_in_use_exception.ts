import { Exception } from '@adonisjs/core/exceptions'

export default class EmailAlreadyInUseException extends Exception {
  static status = 422
  static message = 'Email already in use'
}
