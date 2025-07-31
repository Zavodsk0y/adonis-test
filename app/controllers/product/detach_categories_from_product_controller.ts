// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { inject } from '@adonisjs/core'
import { ProductService } from '#services/product/product_service'
import { attachCategoriesValidator } from '#validators/product/attach_categories'

@inject()
export default class AddProductToCartController {
  constructor(protected productService: ProductService) {}

  /**
   * @handle
   * @tag Product
   * @summary Detach categories (ids) from product
   * @paramPath id - Product's id - @type(number)
   * @requestBody <attachCategoriesValidator>
   * @responseBody 200 - <Product>.with(categories)
   */
  async handle(ctx: HttpContext) {
    const product = await Product.findOrFail(ctx.params.id)
    const categories = await ctx.request.validateUsing(attachCategoriesValidator)

    return ctx.response
      .status(200)
      .json(await this.productService.detachCategories(product, categories.categories))
  }
}
