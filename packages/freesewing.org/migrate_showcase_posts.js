const fs = require('fs')
const path  = require('path')
const rdir  = require('recursive-readdir')
const matter = require("gray-matter")
const serialize = require('next-mdx-remote/serialize')
const axios = require('axios')
const uploads = require('./uploads')

const strapi = 'https://posts.freesewing.org'
const bot = 'bot@freesewing.org'

const mdxPath = () => '/tmp/showcase'
const loadMdxFile = (slug, language='en') => fs.readFileSync(`/tmp/${slug}/${language}.md`)


const getFiles = async (path) => {
  let files
  try {
    files = await rdir(path)
  }
  catch (err) {
    console.log(err)
    return false
  }

  return files
}

const getImages = async (slug) => {
  let files
  const images = []
  try {
    files = await rdir('/tmp/'+slug)
  }
  catch (err) {
    console.log(err)
    return false
  }
  for (let file of files) {
    if (file.slice(-4) === '.jpg') images.push(file)
    else if (file.slice(-5) === '.jpeg') images.push(file)
    else if (file.slice(-3) !== '.md') console.log(slug, file)
  }

  return images
}


const filesAbsToRel = (files, language) => {
  const relFiles = []
  for (const file of files) {
    if (file.slice(-6) === `/${language}.md`) {
      relFiles.push(file.slice(5, -6))
    }
  }

  return relFiles
}

const getMdxPaths = async (language='de') => {
  const absFiles = await getFiles(mdxPath())
  const relFiles = filesAbsToRel(absFiles, language)

  return relFiles
}

const getFrontmatter = slug => {
  const { content, data } = matter(rawMdx)

}

const getPageList = (paths, folder='dev', language='de', preHook=false, postHook=false) => {
  const allPaths = preHook
    ? preHook(paths)
    : [...paths]
  const list = {}
  allPaths.sort()
  for (const path of allPaths) {
    const { content, data } = matter(loadMdxFile(path, folder, language))
    list[path] = {
      path,
      frontmatter: data,
      order: `${data?.order || ''}${data.title || path}`,
      offspring: []
    }
    if (path.indexOf('/') !== -1) {
      const up = path.split('/').slice(0, -1).join('/')
      if (list[up]) {
        list[up].offspring.push(path)
        list[path].up = up
      }
    }
  }

  return postHook
    ? postHook(list)
    : list
}

const postBody = (post, images) => {
  let body = post.body
  for (const image of images) {
    let url = uploads[post.slug][path.basename(image)][0].url
    body = body.replace(`](${path.basename(image)})`, `](https://posts.freesewing.org${url})`)
  }

  return body
}

const publishPost = async (post, token) => {
  const images = await getImages(post.slug)
  const data = {
    title: post.title,
    body: postBody(post, images),
    date: post.date,
    slug: post.slug.split('/').pop(),
    caption: post.caption,
    design1: post.patterns[0],
    image: uploads[post.slug][post.img]
  }
  if (post.patterns[1]) data.design2 = post.patterns[1]
  if (post.patterns[2]) data.design3 = post.patterns[2]
  if (post.patterns[3]) console.log('POST WITH 4 DESIGNS', post)
  try {
    const res = await axios.post(
      `${strapi}/showcaseposts`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }
  catch (err) {
    console.log(err)
    console.log(err.response.data.data.errors)
  }
  finally {
    return
  }
}

const getToken = async () => {
  let res
  try {
    await axios.post(`${strapi}/auth/local`, {
      identifier: bot,
      password: process.env.STRAPI_BOT_PASSWORD
    })
  }
  catch (err) {
    console.log(err)
  }
  finally {
    return res.data
      ? res.data
      : false
  }
}

const migratePosts = async (language, token) => {
  const props = {}
  const posts = []
  props.paths = await getMdxPaths(language)
  props.pages = getPageList(props.paths, language)
  for (const page of Object.values(props.pages)) {
    const rawMdx = loadMdxFile(page.path, language)
    const { content, data } = matter(rawMdx)
    posts.push({
      slug: page.path,
      ...data,
      body: content
    })
  }

  for (const post of posts) {
    if (post.slug && post.slug !== 'showcase') {
      console.log('Publishing:', post.slug)
      await publishPost(post, token)
    }
  }

  return
}


//getToken().then(token => {
//  console.log(token)
//  migratePosts('org/blog', 'en', token)
//})
//
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWFjNTVjODQ0OGJmNTFkMGMyYWMyNCIsImlhdCI6MTYyNjUzOTc1OCwiZXhwIjoxNjI5MTMxNzU4fQ.QrcQsBb-NcNze8iNU3uQ7OJQj1E-zB-sSGpOFg-YIW8"

migratePosts('en', token)


