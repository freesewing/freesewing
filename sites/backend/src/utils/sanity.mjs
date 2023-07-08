import axios from 'axios'
import { sanity as config } from '../config.mjs'

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
export const setUserAvatar = async (id, data) => setAvatar('user', id, data)
export const setSetAvatar = async (id, data) => setAvatar('set', id, data)
export const setPatternAvatar = async (id, data) => setAvatar('pattern', id, data)
export async function setAvatar(type, id, data) {
  // Step 1: Upload the image as asset
  const [contentType, binary] = b64ToBinaryWithType(data)
  if (contentType) {
    const img = await axios.post(`${config.api}/assets/images/${config.dataset}`, binary, {
      headers: {
        ...headers,
        'Content-Type': 'contentType',
      },
    })
    if (!img.data?.document?._id) return false // Upload failed

    // Step 2, update the document
    await axios.post(
      `${config.api}/data/mutate/${config.dataset}`,
      {
        mutations: [
          {
            createOrReplace: {
              _id: `${type}-${id}`,
              _type: `${type}img`,
              recordid: id,
            },
          },
          {
            patch: {
              id: `${type}-${id}`,
              set: {
                'img.asset': {
                  _ref: img.data.document.id,
                  _type: 'reference',
                },
              },
            },
          },
        ],
      },
      { headers }
    )

    return {
      id: img.data.document._id,
      url: img.data.document.url,
    }
  }
  return false
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
