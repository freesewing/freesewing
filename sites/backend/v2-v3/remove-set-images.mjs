import { cloudflareImages as config } from '../src/config.mjs'
import axios from 'axios'

const headers = { Authorization: `Bearer ${config.token}` }

const toRemove = []

const result = await axios.get(`${config.api}?page=1&per_page=10000`, { headers })

const images = result.data.result.images.map((i) => i.id).filter((id) => id.slice(0, 4) === 'set-')
const total = images.length
if (total > 0) {
  console.log(`${total} images to remove`)
  let i = 1
  for (const id of images) {
    console.log(`${i}/${total} : Removing ${id}`)
    await axios.delete(`${config.api}/${id}`, { headers })
    i++
  }
} else console.log('No images to remove')
