import { Exception } from '@adonisjs/core/exceptions'

export default class CategoryIsNotAttachedToThisProductException extends Exception {
  static status = 422
  static message = "This category isn't attached to this product."
}
