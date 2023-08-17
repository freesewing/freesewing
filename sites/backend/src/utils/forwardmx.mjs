import axios from 'axios'
import { Blob } from 'node:buffer'
import { log } from './log.mjs'
import { forwardmx as config } from '../config.mjs'

/*
 * Ok, so this API is kinda bonkers. It expects to
 * send the API key in the body, even for GET requests.
 * But then, it also accepts POST requests for the same
 * routes. So it's not exactly REST-ful but here we are.
 */

/*
 * Method that does the actual image upload to cloudflare
 * Use this for a new image that does not yet exist
 */
export async function storeImage(props, isTest = false) {
  if (isTest) return props.id || false

  const form = getFormData(props)
  let result
  try {
    result = await axios.post(config.api, form, { headers })
  } catch (err) {
    if (err.response.status == 409) {
      /*
       * Image already exists.
       * Cloudflare does not support udating the image,
       * so we need to delete it and upload again
       */
      try {
        log.warn(props.id, 'Called storeImage when replaceImage should have been used')
        await axios.delete(`${config.api}/${props.id}`)
        result = await axios.post(config.api, form, { headers })
      } catch (err) {
        console.log('Failed to replace image on cloudflare', err)
      }
    } else {
      console.log('Failed to upload image to cloudflare', err)
    }
  }

  return result.data?.result?.id ? result.data.result.id : false
}

/*
 * Method that does the actual image upload to cloudflare
 * Use this to replace an existing image
 */
export async function replaceImage(props, isTest = false) {
  if (isTest) return props.id || false
  const form = getFormData(props)
  // Ignore errors on delete, probably means the image does not exist
  try {
    await axios.delete(`${config.api}/${props.id}`)
  } catch (err) {
    // It's fine
    log.info(`Could not delete image ${props.id}`)
  }
  let result
  try {
    result = await axios.post(config.api, form, { headers })
  } catch (err) {
    console.log('Failed to replace image on cloudflare', err)
    console.log(err.response.data)
  }

  return result.data?.result?.id ? result.data.result.id : false
}

/*
 * Method that uploads an image to cloudflare
 * Use this to merely ensure the image exists (will fail silently if it does)
 */
export async function ensureImage(props, isTest = false) {
  if (isTest) return props.id || false
  const form = getFormData(props)
  try {
    await axios.post(config.api, form, { headers })
  } catch (err) {
    // It's fine
  }

  return props.id
}

/*
 * Method that removes an image fron cloudflare
 */
export async function removeImage(id) {
  try {
    await axios.delete(`${config.api}/${id}`, { headers })
  } catch (err) {
    return false
  }

  return true
}

/*
 * Method that imports and image from URL and does not bother waiting for the answer
 */
export async function importImage(props, isTest = false) {
  if (isTest) return props.id || false
  // Bypass slow ass upload when testing import
  if (!config.import) return `default-avatar`

  // Only upload user images for now
  if (props.id.slice(0, 5) !== 'user-') return `default-avatar`

  const form = getFormData(props)
  /*
   * The image may already exist, so swallow the error
   */
  try {
    await axios.post(config.api, form, { headers })
  } catch {
    // Do nothing
  }

  console.log('Imported img', props.id)

  return props.id
}

/*
 * Helper method to construct the form data for cloudflare
 */
function getFormData({
  id,
  metadata = {},
  url = false,
  b64 = false,
  blob = false,
  notPublic = false,
}) {
  const form = new FormData()
  form.append('id', id)
  form.append('metadata', JSON.stringify(metadata))
  // Handle base-64 encoded data
  if (b64) form.append('file', b64ToBlob(b64), id)
  // Handle binary data
  else if (blob) form.append('file', blob)
  // Handle URL-based upload
  else if (url) form.append('url', url)
  // Handle requireSignedURLs
  if (notPublic) form.append('requireSignedURLs', true)

  return form
}

/*
 * Helper method to turn a data-uri into binary data
 */
function b64ToBlob(dataUri) {
  return new Blob([new Buffer.from(dataUri.split(';base64,').pop(), 'base64')])
}
