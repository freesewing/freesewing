import fs from 'fs'

const authors = [
  1, // joost
  132, // Wouter
  840, // Eleonore
  13050, // Karen
  19867, // Natalia
  20400, // Lex
  20650, // Bobgeorge
  22007,
  28838, // Ben
  31287, // Laser
  31336, // Vili
  33070,

  8,
  433,
  1972,
  20165,
  21873,
  22007,
  22141,
  22693,
  22708,
  23123,
  23364,
  23386,
  24546,
  27042,
  27667,
  27669,
  28322,
  28514,
  28890,
  29576,
  29683,
  31761,
  31916,
  32339,
  32412,
  46488,
  47151,
  49445,
  50461,
  50818,
  61987,
  62144,
  64919,
  65187,
  71794,
  72337,
  73391,
  77515,
  83003,
  83912,
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
