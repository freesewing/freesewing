import axios from 'axios'
import { sanity as config } from '../config.mjs'
import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: config.project,
  dataset: config.dataset,
  useCdn: true, // Set to false to bypass cache
  apiVersion: config.version,
  token: config.token,
})

// We'll use this a bunch
const headers = { Authorization: `Bearer ${config.token}` }

/*
 * Turns a sanity asset _ref into an image URL
 */
function imageUrl(ref) {
  return `https://cdn.sanity.io/images/${config.project}/${config.dataset}/${ref.slice(6)}`
}

/*
 * Retrieval of avatar images from the Sanity API
 */
export const getUserAvatar = async (id) => getAvatar('user', id)
export const getSetAvatar = async (id) => getAvatar('set', id)
async function getAvatar(type, id) {
  const url =
    `${config.api}/data/query/${config.dataset}?query=` +
    encodeURIComponent(`*[_type=='${type}img' && recordid==${id}]{ img }`)
  const result = await axios.get(url, { headers })
  if (result.data?.result && Array.isArray(result.data.result) && result.data.result.length === 1) {
    return imageUrl(result.data.result[0].img.asset._ref)
  }

  return false
}

/*
 * Uploads an image to sanity
 */
export const setUserAvatar = async (id, data, title) => setAvatar('user', id, data, title)
export const setSetAvatar = async (id, data, title) => setAvatar('set', id, data, title)
export const setPatternAvatar = async (id, data, title) => setAvatar('pattern', id, data, title)
export async function setAvatar(type, id, data, title) {
  // Step 1: Upload the image as asset
  const [contentType, binary] = Array.isArray(data) ? data : b64ToBinaryWithType(data)
  if (!contentType) return ''

  const imgDocument = await sanity.assets.upload('image', binary, {
    contentType,
    filename: `${type}.${contentType.split('/').pop()}`,
  })
  const document = await sanity.createOrReplace({
    _id: `${type}-${id}`,
    _type: `${type}img`,
    title: title,
    recordid: id,
    img: {
      asset: {
        _ref: imgDocument._id,
        _type: 'reference',
      },
    },
  })

  return document._id
}

/*
 * Helper method to turn a data-uri into binary data + content type
 */
function b64ToBinaryWithType(dataUri) {
  let type = false
  const [start, data] = dataUri.split(';base64,')
  if (start.includes('image/png')) type = 'image/png'
  else if (start.includes('image/jpg')) type = 'image/jpeg'
  else if (start.includes('image/jpeg')) type = 'image/jpeg'

  return [type, new Buffer.from(data, 'base64')]
}

/*
 * Helper method to download an image
 * Used in import only, thus ok for removal post v3 release
 */
export const downloadImage = async (url) => {
  let result
  try {
    result = await axios.get(url, { responseType: 'arraybuffer' })
  } catch (err) {
    console.log(`Could not download from ${url}`, err, result)
  }

  // Returning [contentType, data]
  return [result.headers['content-type'], Buffer.from(result.data, 'binary')]
}
