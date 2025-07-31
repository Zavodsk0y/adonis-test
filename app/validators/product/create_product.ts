import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    price: vine.number().positive(),
    description: vine.string().trim().nullable(),
    image: vine.file({
      size: '4mb',
      extnames: ['jpg', 'jpeg', 'png', 'svg'],
    }),
    categories: vine.array(vine.number().positive()).nullable(),
  })
)

export type CreateProductSchemaType = Infer<typeof createProductValidator>
