import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().unique({ table: 'categories', column: 'name' }),
  })
)

export type CreateCategorySchemaType = Infer<typeof createCategoryValidator>
