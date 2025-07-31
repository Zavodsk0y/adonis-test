import { CreateCategorySchemaType } from '#validators/category/create_category'
import Category from '#models/category'

export class CategoryService {
  async create(data: CreateCategorySchemaType): Promise<Category> {
    return await Category.create(data)
  }
}
