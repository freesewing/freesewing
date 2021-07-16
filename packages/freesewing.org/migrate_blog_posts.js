const fs = require('fs')
const path  = require('path')
const rdir  = require('recursive-readdir')
const matter = require("gray-matter")
const serialize = require('next-mdx-remote/serialize')
const axios = require('axios')

const strapi = 'https://posts.freesewing.org'
const bot = 'bot@freesewing.org'

const mdxPath = folder => path.resolve(__dirname, `../../markdown/${folder}/`)
const loadMdxFile = (slug, folder='dev', language='en') => fs.readFileSync(`${mdxPath(folder)}/${slug}/${language}.md`)


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

const filesAbsToRel = (files, folder, language) => {
  const relFiles = []
  for (const file of files) {
    if (file.slice(-6) === `/${language}.md`) {
      relFiles.push(file.split(`markdown/${folder}`).pop().slice(1, -6))
    }
  }

  // Keep ui files out of it
  return relFiles.filter(slug => slug.slice(0,3) !== 'ui/')
}

const getMdxPaths = async (folder='dev', language='en') => {
  const absFiles = await getFiles(mdxPath(folder))
  const relFiles = filesAbsToRel(absFiles, folder, language)

  return relFiles
}

const getFrontmatter = slug => {
  const { content, data } = matter(rawMdx)

}

const getPageList = (paths, folder='dev', language='en', preHook=false, postHook=false) => {
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

const publishPost = async (post, token) => {
  try {
    await axios.post(
      `${strapi}/blogposts`,
      {
        title: post.title,
        linktitle: post.linktitle || post.title,
        body: post.body,
        date: post.date,
        slug: post.slug,
        image: post.image,
        caption: post.caption || post.image,
        site: '60ead4d970e8d35a6d089f9c',
        author: '60eae49cdb32b45d5c4d6d93',
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }
  catch (err) {
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

const migratePosts = async (folder, language, token) => {
  const props = {}
  const posts = []
  props.paths = await getMdxPaths(folder, language)
  props.pages = getPageList(props.paths, folder, language)
  for (const page of Object.values(props.pages)) {
    const rawMdx = loadMdxFile(page.path, folder, language)
    const { content, data } = matter(rawMdx)
    posts.push({
      slug: page.path,
      ...data,
      body: content
    })
  }

  for (const post of posts) {
    if (post.slug) {
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
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjE2YTZmMmY4MWMwMzIzOTM2NjVlZiIsImlhdCI6MTYyNjQzNDk1NiwiZXhwIjoxNjI5MDI2OTU2fQ.7eEXH4-uW9KKXBu3d-vOMiDYIlu7aPO8pP-FhyowbyQ'

const author = {
  _id: "60eae49cdb32b45d5c4d6d93",
}
migratePosts('org/blog', 'en', token)


