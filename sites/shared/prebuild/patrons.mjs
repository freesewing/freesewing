import path from 'path'
import fs from 'fs'
import axios from 'axios'

export const prebuildPatrons = async (store, mock = false) => {
  if (mock) return (store.patrons = mockedData)

  let patrons
  try {
    // FIXME: Adapt this when the v3 backend is production-ready
    patrons = await axios.get('https://backend.freesewing.org/patrons')
  } catch (err) {
    console.log(`⚠️  Failed to load patron list`)
  }

  const list = patrons?.data
    ? [
        ...patrons.data['2'].map((p) => ({
          hande: p.handle,
          username: p.username,
          img: p.pictureUris.s,
        })),
        ...patrons.data['4'].map((p) => ({
          hande: p.handle,
          username: p.username,
          img: p.pictureUris.s,
        })),
        ...patrons.data['8'].map((p) => ({
          hande: p.handle,
          username: p.username,
          img: p.pictureUris.s,
        })),
      ]
    : []

  // Write to json
  fs.writeFileSync(
    path.resolve('..', store.site, 'prebuild', `patrons.js`),
    `export default ${JSON.stringify(list, null, 2)}`
  )

  store.patrons = list
}

/*
 * In development, we return this mocked data to speed things up
 */
const mockedData = [
  {
    hande: 'xdpug',
    username: 'wouter.vdub',
    img: 'https://static.freesewing.org/users/x/xdpug/s-xdpug.jpg',
  },
]
