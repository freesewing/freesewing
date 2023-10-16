import path from 'path'
import { readFile, writeFile } from 'node:fs/promises'

/*
 * Prebuilds the list of all contributors
 */
export const prebuildContributors = async (store, mock = false) => {
  if (mock) return (store.contributors = mockedData)

  /*
   * Read from all-contributors configuration file
   */
  const contributorsFile = await readFile(path.resolve('..', '..', '.all-contributorsrc'), 'utf-8')

  /*
   * Parse as JSON and get contributors list
   */
  const { contributors } = JSON.parse(contributorsFile)

  /*
   * Update the store
   */
  store.contributors = contributors

  /*
   * Write out prebuild results
   */
  return await writeFile(
    path.resolve('..', store.site, 'prebuild', `allcontributors.js`),
    `export default ${JSON.stringify(contributors, null, 2)}`
  )
}

/*
 * In development, we return this mocked data to speed things up
 */
const mockedData = [
  {
    login: 'joostdecock',
    name: 'Joost De Cock',
    avatar_url: 'https://avatars.githubusercontent.com/u/1708494?v=4',
    profile: 'https://joost.at/',
    contributions: ['maintenance'],
  },
]
