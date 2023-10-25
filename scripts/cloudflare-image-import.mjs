import axios from 'axios'
import path from 'path'
import { exec } from 'node:child_process'

/*
 * Set the Clouldflare access token in a
 * CLOUDFLARE_IMPORT_TOKEN
 * environment variable
 */
const TOKEN = process.env.CLOUDFLARE_IMPORT_TOKEN

// Headers to use
const headers = { Authorization: `Bearer ${TOKEN}` }

const folders = {
  blog: path.resolve('markdown', 'org', 'blog'),
  showcase: path.resolve('markdown', 'org', 'showcase'),
}

/*
 * Grab a list of all folders in a given folder
 * which gives us a list of all slugs
 */
const getSlugsFromFolder = async (folder) => {
  const result = await exec(`ls -1 ${folder}`)
  // Stdout is buffered, so we need to gather all of it
  let stdout = ''
  for await (const data of result.stdout) stdout += data

  return stdout.split('\n').filter((p) => p.length > 1)
}

/*
 * Grab the image URL from a blog/showcase markdown file
 */
const getImageFromMarkdown = async (file) => {
  const result = await exec(`grep ^image: ${file}`)
  // Stdout is buffered, so we need to gather all of it
  let stdout = ''
  for await (const data of result.stdout) stdout += data

  return stdout.split('\n')[0].split('image:')[1].trim().slice(1, -1)
}

/*
 * Helper method to grab all slugs from blog/showcase posts
 * And then extract all image URLs from them.
 */
const findImagesToMigrate = async () => {
  console.log('Finding images to migrate')
  // Construct id => imageUrl lookup table (lut)
  const lut = {}
  for (const type of Object.keys(folders)) {
    const slugs = await getSlugsFromFolder(folders[type])
    console.log(`Found ${slugs.length} ${type} images to migrate`)
    for (const slug of slugs) {
      lut[`${type}-${slug}`] = await getImageFromMarkdown(folders[type] + `/${slug}/en.md`)
    }
  }

  return lut
}

/*
 * Helper method to upload images to cloudflare with a preset ID
 * and a URL to load them from
 */
const uploadToCloudflare = async (id, url) => {
  const form = new FormData()
  form.append('id', id)
  form.append('url', url)
  try {
    await axios.post(
      'https://api.cloudflare.com/client/v4/accounts/edd96e8b19d1be5946c5f7983365bda4/images/v1',
      form,
      { headers }
    )
  } catch (err) {
    console.log(err.response.data)
  }

  return true
}

const images = await findImagesToMigrate()
const total = Object.keys(images).length
let i = 0
for (const [id, url] of Object.entries(images)) {
  i++
  console.log(`Uploading ${i}/${total} : ${id} -- ${url}`)
  await uploadToCloudflare(id, url)
}
