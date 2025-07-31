// import type { HttpContext } from '@adonisjs/core/http'

import { createProductValidator } from '#validators/product/create_product'
import { inject } from '@adonisjs/core'
import { ProductService } from '#services/product/product_service'
import { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { ProductStatus } from '#enums/product_status_enum'

@inject()
export default class ProductsController {
  constructor(protected productService: ProductService) {}

  /**
   * @store
   * @tag Product
   * @requestBody <createProductValidator>
   * @responseBody 201 - <Product>
   */
  async store(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(createProductValidator)
    return ctx.response.status(201).json(await this.productService.create(payload))
  }

  /**
   * @index
   * @tag Product
   * @summary Get all active products in system
   * @paramQuery page - the Page number - @type(number)
   * @responseBody 200 - <Product[]>.with(categories).exclude(product_id, is_pending, is_active, is_suspended, async_update_status).paginated()
   */
  async index(ctx: HttpContext) {
    const page = ctx.request.input('page', 1)
    return await Product.query()
      .where('status', ProductStatus.ACTIVE)
      .preload('categories')
      .paginate(page, 10)
  }

  /**
   * @show
   * @tag Product
   * @summary Get product by id
   * @paramPath id - Product's id - @type(number)
   * @responseBody 200 - <Product>.exclude(product_id, is_pending, is_active, is_suspended, async_update_status)
   */
  async show(ctx: HttpContext) {
    const product = await Product.findOrFail(ctx.params.id)
    await product.load('categories')
    return ctx.response.status(200).json(product)
  }
}
