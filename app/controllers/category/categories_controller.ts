// import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import { CategoryService } from '#services/category/category_service'
import { HttpContext } from '@adonisjs/core/http'
import { createCategoryValidator } from '#validators/category/create_category'
import Category from '#models/category'

@inject()
export default class CategoriesController {
  constructor(protected categoryService: CategoryService) {}

  /**
   * @store
   * @tag Category
   * @requestBody <createCategoryValidator>
   * @responseBody 201 - <Category>
   */
  async store(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(createCategoryValidator)
    return ctx.response.status(201).json(await this.categoryService.create(payload))
  }

  /**
   * @index
   * @tag Category
   * @summary Get all categories
   * @responseBody 200 - <Category[]>
   */
  async index(ctx: HttpContext) {
    return ctx.response.status(200).json(await Category.all())
  }
}
