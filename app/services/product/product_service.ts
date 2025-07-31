import { CreateProductSchemaType } from '#validators/product/create_product'
import Product from '#models/product'
import drive from '@adonisjs/drive/services/main'
import User from '#models/user'
import CategoryAlreadyAttachedException from '#exceptions/product/category_already_attached_exception'
import CategoryIsNotAttachedToThisProductException from '#exceptions/product/category_is_not_attached_to_this_product_exception'

export class ProductService {
  async create(data: CreateProductSchemaType) {
    const { image, categories, ...productData } = data

    const disk = drive.use('s3')

    const fileName = `uploads/${Date.now()}-${image.clientName}`
    await disk.put(fileName, image.tmpPath!)

    const url = await disk.getUrl(fileName)

    const product = await Product.create(productData)
    await product.merge({ imagePath: url }).save()

    if (categories && categories.length > 0) await product.related('categories').attach(categories)

    await product.load('categories')

    return { product }
  }

  async addToCart(product: Product, user: User) {
    await user.related('cartItems').attach([product.id])
    await user.loadCount('cartItems')

    return { product, total: user.$extras.cartItems_count }
  }

  async attachCategories(product: Product, categoryIds: number[]) {
    const categories = await product.related('categories').query().select('id')
    const existingCategories = categories.map((category) => category.id)

    const duplicates = categoryIds.filter((categoryId) => existingCategories.includes(categoryId))

    if (duplicates.length > 0) throw new CategoryAlreadyAttachedException()

    await product.related('categories').attach(categoryIds)
    await product.load('categories')

    return product
  }

  async detachCategories(product: Product, categoryIds: number[]) {
    const currentCategories = await product.related('categories').query().select('id')

    const currentCategoryIds = currentCategories.map((category) => category.id)

    const detachableIds = categoryIds.filter((id) => currentCategoryIds.includes(id))

    if (detachableIds.length === 0) throw new CategoryIsNotAttachedToThisProductException()

    await product.related('categories').detach(categoryIds)
    await product.load('categories')

    return product
  }
}
