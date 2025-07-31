import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Product from '#models/product'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column({ serializeAs: null })
  declare productId: number

  @manyToMany(() => Product, {
    pivotTable: 'category_product',
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'category_id',
    pivotRelatedForeignKey: 'product_id',
  })
  declare products: ManyToMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
