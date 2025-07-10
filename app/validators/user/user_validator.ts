import vine from '@vinejs/vine'
import { userPasswordRegex, userFullNameRegex } from '#concerns/user_regexp'
import { Infer } from '@vinejs/vine/types'

/**
 * Validates the user's signup action
 */
export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().unique({ table: 'user', column: 'email' }),
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

export const changeFullNameValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().regex(userFullNameRegex),
  })
)

export const changeEmailValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().unique({ table: 'user', column: 'email' }),
  })
)

export const changePasswordValidator = vine.compile(
  vine.object({
    old_password: vine.string(),
    new_password: vine.string().trim().regex(userPasswordRegex),
  })
)

export type CreateUserSchemaType = Infer<typeof createUserValidator>
export type LoginUserSchemaType = Infer<typeof loginUserValidator>
export type ChangeFullNameSchemaType = Infer<typeof changeFullNameValidator>
export type ChangeEmailSchemaType = Infer<typeof changeEmailValidator>
export type ChangePasswordSchemaType = Infer<typeof changePasswordValidator>
