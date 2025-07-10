import factory from '@adonisjs/lucid/factories'
import Breed from '#models/breed'

export const BreedFactory = factory
  .define(Breed, async () => {
    return {}
  })
  .build()
