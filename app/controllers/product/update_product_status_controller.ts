// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

export default class UpdateProductStatusController {
  /**
   * @handle
   * @tag Product
   * @paramPath id - Product's id - @type(string) @required
   * @summary Update status of product
   * @description Here we have implementation of product's status transitions. All the way: Pending -> Active -> Suspended, Suspended -> Active
   * @responseBody 200 - {"message": "Product status changed successfully", "user": "<Product>"}
   */
  async handle(ctx: HttpContext) {
    const product = await Product.findOrFail(ctx.params.id)
    await product.updateStatus()

    return ctx.response
      .status(200)
      .json({ message: 'Product status changed successfully', product })
  }
}
