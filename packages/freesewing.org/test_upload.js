const fs = require('fs')
const path  = require('path')
const rdir  = require('recursive-readdir')
const matter = require("gray-matter")
const serialize = require('next-mdx-remote/serialize')
const axios = require('axios')
const FormData = require('form-data')

const strapi = 'https://posts.freesewing.org'

const upload = async (token) => {
  const data = new FormData
  const img = fs.readFileSync('/tmp/showcase/aaron-by-joost/showcase.jpg')
  data.append('files', img, 'example.jpg')
  let res
  try {
    res = await axios.post(
      `${strapi}/upload`,
      data,
      {
        headers: {
          ...data.getHeaders(),
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
    console.log(res.data)
    return
  }
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZWFjNTVjODQ0OGJmNTFkMGMyYWMyNCIsImlhdCI6MTYyNjUzOTc1OCwiZXhwIjoxNjI5MTMxNzU4fQ.QrcQsBb-NcNze8iNU3uQ7OJQj1E-zB-sSGpOFg-YIW8"

upload(token)


