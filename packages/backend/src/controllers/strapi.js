import axios from 'axios'
import config from '../config'
import asBuffer from 'data-uri-to-buffer'
import FormData from 'form-data'
import fs from 'fs'

const getToken = async () => {
  let result
  try {
    result = await axios.post(
      `${config.strapi.protocol}://${config.strapi.host}:${config.strapi.port}/auth/local`,
      {
        identifier: config.strapi.username,
        password: config.strapi.password
      }
    )
  }
  catch(err) {
    console.log('ERROR: Failed to load strapi token')
    return false
  }

  return result.data.jwt
}

const withToken = token => ({
  headers: {
    Authorization: `Bearer ${token}`,
  }
})

const ext = type => {
  switch (type.toLowerCase()) {
    case 'image/jpg':
    case 'image/jpeg':
      return 'jpg'
      break;
    case 'image/png':
      return 'png'
      break
    case 'image/webp':
      return 'webp'
      break
    default:
      return false
  }
}

const api = path => `${config.strapi.protocol}://${config.strapi.host}:${config.strapi.port}${path}`


// Uploads a picture to Strapi
const uploadPicture = async (img, name, token) => {
  const form = new FormData()
  const buff = asBuffer(img)
  const extention = ext(buff.type)
  if (!extention) return [false, {error: `Filetype ${buff.type} is not supported`}]

  // I hate you strapi, because this hack is the only way I can get your shitty upload to work
  const filename = `${config.strapi.tmp}/viaBackend.${extention}`
  const file = fs.createReadStream(filename)
  form.append('files', file)
  form.append('fileInfo', JSON.stringify({
    alternativeText: `The picture/avatar for maker ${name}`,
    caption: `Maker: ${name}`,
  }))

  let result
  try {
    result = await axios.post(
      api('/upload'),
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }
  catch (err) {
    console.log("ERROR: Failed to upload picture")
    return [false, {error: 'Upload failed'}]
  }

  return [true, result.data]
}

const validRequest = body => (
  body &&
  body.displayname &&
  body.about &&
  body.picture &&
  typeof body.displayname === 'string' &&
  typeof body.about === 'string' &&
  typeof body.picture === 'string'
)


// Creates a maker or author in Strapi
const createPerson = async (type, data, token) => {
  let result
  try {
    result = await axios.post(
      api(`/${type}s`),
      data,
      withToken(token)
    )
  }
  catch (err) {
    console.log("ERROR: Failed to create", type)
    return [false, {error: 'Creation failed'}]
  }

  return [true, result.data]

}
function StrapiController() {}

StrapiController.prototype.addPerson = async function(req, res, type) {
  if (!validRequest(req.body)) return res.sendStatus(400)
  const token = await getToken()
  const [upload, picture] = await uploadPicture(req.body.picture, req.body.displayname, token)
  if (!upload) return res.status(400).send(picture)

  const [create, person] = await createPerson(type, {
    picture: picture[0].id,
    displayname: req.body.displayname,
    about: req.body.about,
  }, token)
  if (!create) return res.status(400).send(person)

  return res.send(person)
}

export default StrapiController
