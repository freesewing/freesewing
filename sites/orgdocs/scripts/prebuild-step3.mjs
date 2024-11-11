import fs from 'fs'

const authors = [
  1, // joost
  8, // reseved for anynymous users
  132, // Wouter
  292,
  433, // Paul
  840, // Eleonore
  1972, // Ferdi
  13050, // Karen
  19867, // Natalia
  20165, // Saber
  20400, // Lex
  20650, // Bobgeorge
  21873, // Starfirebird
  22007, // modern_dragon
  22141, // comixminx
  22693, // tuesday
  22708, // Starfetch
  23123, // Braveness
  23364, // Renee-mariposa
  23386, // Ramoth
  24546, // MagicantAce
  27042, // Guin
  27667, // Talatrix
  27669, // Gaelle
  28322, // Zag
  28514, // Halbmoki (thomas)
  28838, // Ben
  28890, // Jacques
  29576, // Ojensen
  29683, // JenBarb_
  31287, // Laser
  31336, // Vili
  31761, // JoshShabtaiCa
  31916, // dylanwhat
  32339, // lmunar
  32412, // petit_lutin
  33070, // Thrunic
  46488, // Nisaea
  47151, // iderias
  49445, // Galit
  50461, // Vlad
  50818, // RockerKitten
  61987, // posh tunic
  62144, // Tinker-Tim-The-Toolman-Taylor-Soldier-Spy
  64919, // paula_
  65187, // user-65187
  71794, // Karlo
  72337, // amaan hammadi
  73391, // user 73391
  83003, // AuxSuivants0
  83912, // GursMan123
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
