import { BaseSeeder } from '@adonisjs/lucid/seeders'
import BreedGroup from "#models/breed_group";

export default class extends BaseSeeder {
  async run() {
    await BreedGroup.createMany([
      {
        name: 'Mixed Breed Dogs'
      },
      {
        name: 'Companion Dogs'
      },
      {
        name: 'Hound Dogs'
      },
      {
        name: 'Terrier Dogs'
      },
      {
        name: 'Working Dogs'
      },
      {
        name: 'Sporting Dogs'
      },
      {
        name: 'Herding Dogs'
      },
      {
        name: 'Hybrid Dogs'
      },
    ])
  }
}
