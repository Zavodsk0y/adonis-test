import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import BreedGroup from '#models/breed_group'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { CherryPick, ModelObject } from '@adonisjs/lucid/types/model'

export default class Breed extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ serializeAs: null })
  declare breedGroupId: number

  @belongsTo(() => BreedGroup)
  declare breedGroup: BelongsTo<typeof BreedGroup>

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  public serialize(cherryPick?: CherryPick): ModelObject {
    const serialized = super.serialize(cherryPick)
    serialized.breedGroup = serialized.breedGroup ? serialized.breedGroup.name : null
    return serialized
  }
}
