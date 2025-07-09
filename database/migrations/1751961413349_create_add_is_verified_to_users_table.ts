import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_verified').notNullable().defaultTo(false)
      table.string('email_token_confirmation').nullable()
    })
  }

  async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('is_verified')
      table.dropColumn('email_token_confirmation')
    })
  }
}
