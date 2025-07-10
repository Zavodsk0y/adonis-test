import { readFile } from 'node:fs/promises'
import Breed from "#models/breed";

export default class BreedSeeder {
  async run() {
    const breedsData = await readFile('./json_data/breeds.json', 'utf-8')
    const breeds = JSON.parse(breedsData)

    await Breed.createMany(breeds)
  }
}
