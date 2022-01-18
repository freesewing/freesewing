import path from 'path'
import fs from 'fs'

/*
 * Main method that does what needs doing
 */
export const prebuildContributors = async(site) => {

  // Say hi
  console.log()
  console.log(`Prebuilding contributor list for freesewing.${site}`)

  // Read from rc file
  const contributors = JSON.parse(fs.readFileSync(
    path.resolve('..', '..', '.all-contributorsrc'),
    'utf-8'
  ))

  // Write to json
  fs.writeFileSync(
    path.resolve('..', `freesewing.${site}`, 'prebuild', `allcontributors.js`),
    `export default ${JSON.stringify(contributors.contributors, null ,2)}`
  )
}

