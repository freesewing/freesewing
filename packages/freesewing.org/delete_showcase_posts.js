const fs = require('fs')
const path  = require('path')
const rdir  = require('recursive-readdir')
const matter = require("gray-matter")
const serialize = require('next-mdx-remote/serialize')
const axios = require('axios')
const FormData = require('form-data')

const strapi = 'https://posts.freesewing.org'
const bot = 'bot@freesewing.org'

const getPosts = async (lang) => {
  const res = await axios.get(`${strapi}/showcaseposts?_locale=${lang}`)
  return res.data
}


const deletePost = async (id, token) => {
  try {
    const res = await axios.delete(
      `${strapi}/showcaseposts/${id}`,
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

const deletePosts = async (language, token) => {
  const posts = await getPosts(language)
  for (const post of Object.values(posts)) {
    console.log(`Deleting ${post.slug}`)
    await deletePost(post.id, token)
  }

  return
}


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWFjNTVjODQ0OGJmNTFkMGMyYWMyNCIsImlhdCI6MTYyNjUzOTc1OCwiZXhwIjoxNjI5MTMxNzU4fQ.QrcQsBb-NcNze8iNU3uQ7OJQj1E-zB-sSGpOFg-YIW8"

deletePosts('en', token)


