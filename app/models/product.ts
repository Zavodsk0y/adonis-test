import { DateTime } from 'luxon'
import { BaseModel, column, computed, manyToMany } from '@adonisjs/lucid/orm'
import Category from '#models/category'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import PendingToActive from '#transitions/product/pending_to_active'
import ActiveToSuspended from '#transitions/product/active_to_suspended'
import SuspendedToActive from '#transitions/product/suspended_to_active'
import User from '#models/user'
import { ProductStatus } from '#enums/product_status_enum'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare price: number

  @column()
  declare description: string | null

  @column()
  // @enum(Активен, В ожидании, Приостановлен)
  declare status: ProductStatus

  @column()
  declare imagePath: string

  @manyToMany(() => Category, {
    localKey: 'id',
    pivotForeignKey: 'product_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'category_id',
    pivotTable: 'category_product',
  })
  declare categories: ManyToMany<typeof Category>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'product_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'cart_items',
  })
  declare inCartOfUsers: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @computed({ serializeAs: null })
  public isActive() {
    return this.status === ProductStatus.ACTIVE
  }

  @computed({ serializeAs: null })
  public isPending() {
    return this.status === ProductStatus.PENDING
  }

  @computed({ serializeAs: null })
  public isSuspended() {
    return this.status === ProductStatus.SUSPENDED
  }

  @computed({ serializeAs: null })
  public async updateStatus() {
    switch (this.status) {
      case ProductStatus.PENDING:
        await PendingToActive.execute(this)
        break
      case ProductStatus.ACTIVE:
        await ActiveToSuspended.execute(this)
        break
      case ProductStatus.SUSPENDED:
        await SuspendedToActive.execute(this)
        break
    }
  }
}
