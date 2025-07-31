import Product from '#models/product'
import ProductStatusException from '#exceptions/product/product_status_exception'
import { ProductStatus } from '#enums/product_status_enum'

export default class SuspendedToActive {
  public static async execute(product: Product) {
    if (!product.isSuspended()) throw ProductStatusException

    await product.merge({ status: ProductStatus.ACTIVE }).save()

    return product
  }
}
