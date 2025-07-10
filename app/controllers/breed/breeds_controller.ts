// import type { HttpContext } from '@adonisjs/core/http'

import Breed from '#models/breed'

export default class BreedsController {
  index() {
    return Breed.query().preload('breedGroup')
  }
}
