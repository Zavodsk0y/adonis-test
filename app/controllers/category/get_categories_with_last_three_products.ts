// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'

export default class GetCategoriesWithLastThreeProducts {
  /**
   * @handle
   * @tag Category
   * @summary Show categories and 3 last products of each
   * @responseBody 200 - <Category[]>.with(products)
   */
  async handle(ctx: HttpContext) {
    const categories = await Category.query().preload('products', (productsQuery) => {
      productsQuery.orderBy('created_at', 'desc').limit(3)
    })

    return ctx.response.status(200).json(categories)
  }
}
