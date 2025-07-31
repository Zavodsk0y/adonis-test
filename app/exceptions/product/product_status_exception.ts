import { Exception } from '@adonisjs/core/exceptions'

export default class ProductStatusException extends Exception {
  static status = 422
  static message = 'Product status is not valid.'
}
