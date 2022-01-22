const patterns = {
  accessories: [
    'florence',
    'hortensia',
    'florent',
    'holmes',
  ],
  blocks: [
    'bella',
    'bent',
    'brian',
    'titan',
  ],
  garments: [
    'aaron',
    'albert',
    'bee',
    'benjamin',
    'breanna',
    'bruce',
    'carlita',
    'carlton',
    'cathrin',
    'charlie',
    'cornelius',
    'diana',
    'huey',
    'hugo',
    'jaeger',
    'lunetius',
    'paco',
    'penelope',
    'sandy',
    'shin',
    'simon',
    'simone',
    'sven',
    'tamiko',
    'teagan',
    'theo',
    'tiberius',
    'trayvon',
    'ursula',
    'wahid',
    'walburga',
    'waralee',
    'yuri',
  ],
  utilities: [
    'examples',
    'legend',
    'plugintest',
    'rendertest',
    'tutorial',
  ],
}

const navigation = {
  accessories: {
    __title: 'accessoryPatterns',
    __order: 'accessoryPatterns',
    __linktitle: 'accessoryPatterns',
    __slug: 'accessories',
  },
  blocks: {
    __title: 'blockPatterns',
    __order: 'blockPatterns',
    __linktitle: 'blockPatterns',
    __slug: 'blocks',
  },
  garments: {
    __title: 'garmentPatterns',
    __order: 'garmentPatterns',
    __linktitle: 'GarmentPatterns',
    __slug: 'garments',
  },
  utilities: {
    __title: 'utilityPatterns',
    __order: 'utilityPatterns',
    __linktitle: 'utilityPatterns',
    __slug: 'utilities',
  },
}
for (const type in patterns) {
  for (const design of patterns[type]) {
    navigation[type][design] = {
      __title: design,
      __order: design,
      __linktitle: design,
      __slug: `${type}/${design}`
    }
  }
}


const config = {
  monorepo: 'https://github.com/freesewing/freesewing',
  navigation,
  patterns,
}

export default config

