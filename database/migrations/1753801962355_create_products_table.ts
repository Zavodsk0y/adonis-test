import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name').notNullable()
      table.decimal('price').notNullable()
      table.text('description').nullable()
      table.string('image_path').nullable()
      table
        .enum('status', ['В ожидании', 'Активен', 'Приостановлен'], {
          useNative: true,
          enumName: 'product_status',
          existingType: false,
        })
        .defaultTo('В ожидании')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.raw('DROP TYPE IF EXISTS "product_status"')
    this.schema.dropTable(this.tableName)
  }
}
