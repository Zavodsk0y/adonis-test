import vine from '@vinejs/vine'
import { userPasswordRegex, userFullNameRegex } from '#concerns/user_regexp'
import { Infer } from '@vinejs/vine/types'

/**
 * Validates the user's signup action
 */
export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    fullName: vine.string().trim().regex(userFullNameRegex),
    password: vine.string().trim().minLength(8).regex(userPasswordRegex),
  })
)

export const loginUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(8).regex(userPasswordRegex),
  })
)

export type CreateUserSchemaType = Infer<typeof createUserValidator>
export type LoginUserSchemaType = Infer<typeof loginUserValidator>
