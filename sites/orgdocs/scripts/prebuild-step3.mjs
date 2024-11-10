import fs from 'fs'

const authors = [
  1, // joost
  132, // Wouter
  840, // Eleonore
  13050, // Karen
  19867, // Natalia
  20400, // Lex
  20650, // Bobgeorge
  28838, // Ben
  31287, // Laser
  31336, // Vili
]

const titles = {
  admin: 'FreeSewing Maintainer',
  user: 'FreeSewing User',
}

const userAsAuthor = (user) => ({
  name: user.profile.username,
  title: titles[user.profile.role],
  url: `https://freesewing.org/users/user?id=${user.profile.id}`,
  image_url: `https://imagedelivery.net/ouSuR9yY1bHt-fuAokSA5Q/uid-${user.profile.ihash}/public`,
  bio: user.profile.bio,
})

const loadUser = async (id) => {
  let result
  try {
    result = await fetch(`https://backend3.freesewing.org/users/${id}`)
  } catch (err) {
    console.warn(`Failed to load user with id ${id}`, err)
  }

  if (result) return await result.json()
}

async function prebuild() {
  const all = {}
  for (const author of authors) {
    const user = await loadUser(author)
    if (user.profile.id) all[user.profile.id] = userAsAuthor(user)
  }

  fs.writeFileSync(`./authors.json`, JSON.stringify(all, null, 2))
}

prebuild()
