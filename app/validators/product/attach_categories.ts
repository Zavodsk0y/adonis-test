import vine from '@vinejs/vine'

export const attachCategoriesValidator = vine.compile(
  vine.object({
    categories: vine
      .array(vine.number().positive().exists({ table: 'categories', column: 'id' }))
      .notEmpty(),
  })
)
