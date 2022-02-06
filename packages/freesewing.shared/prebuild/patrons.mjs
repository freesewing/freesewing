import path from 'path'
import fs from 'fs'
import axios from 'axios'

/*
 * Main method that does what needs doing
 */
export const prebuildPatrons = async(site) => {

  // Say hi
  console.log()
  console.log(`Prebuilding patron list for freesewing.${site}`)

  const patrons = await axios.get('https://backend.freesewing.org/patrons')
  if (patrons?.data) {
    const list = [
      ...patrons.data['2'].map(p => ({hande: p.handle, username: p.username, img: p.pictureUris.s })),
      ...patrons.data['4'].map(p => ({hande: p.handle, username: p.username, img: p.pictureUris.s })),
      ...patrons.data['8'].map(p => ({hande: p.handle, username: p.username, img: p.pictureUris.s })),
    ]

    // Write to json
    fs.writeFileSync(
      path.resolve('..', `freesewing.${site}`, 'prebuild', `patrons.js`),
      `export default ${JSON.stringify(list, null ,2)}`
    )
  }
}

