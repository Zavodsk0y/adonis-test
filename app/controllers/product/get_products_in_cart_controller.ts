// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'

export default class GetProductsInCartController {
  /**
   * @handle
   * @tag Cart
   * @summary Show products in user's cart
   * @responseBody 200 - <Product[]>.with(categories).exclude(productId)
   */
  async handle(ctx: HttpContext) {
    const cartWithProducts = await ctx.auth
      .user!.related('cartItems')
      .query()
      .preload('categories')
      .exec()

    return ctx.response.status(200).json(cartWithProducts)
  }
}
