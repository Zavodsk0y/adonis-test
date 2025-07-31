// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { inject } from '@adonisjs/core'
import { ProductService } from '#services/product/product_service'

@inject()
export default class AddProductToCartController {
  constructor(protected productService: ProductService) {}

  /**
   * @handle
   * @tag Cart
   * @summary Add product to cart by its id
   * @paramPath id - Product's id - @type(number)
   * @responseBody 200 - {"product": "<Product>", "total": "15"}
   */
  async handle(ctx: HttpContext) {
    const product = await Product.findOrFail(ctx.params.id)

    return ctx.response
      .status(200)
      .json(await this.productService.addToCart(product, ctx.auth.user!))
  }
}
