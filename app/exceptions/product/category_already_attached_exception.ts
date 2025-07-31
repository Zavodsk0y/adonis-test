import { Exception } from '@adonisjs/core/exceptions'

export default class CategoryAlreadyAttachedException extends Exception {
  static status = 422
  static message = 'This category already attached to this product.'
}
