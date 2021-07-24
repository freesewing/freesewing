const mdxPrebuild = require('./mdx')
const strapiPrebuild = require('./strapi')
const treePrebuild = require('./tree')

const folder = [__dirname, '..', '..', `freesewing.${process.env.SITE}`, 'prebuild']

const prebuild = async () => {
  const mdx = await mdxPrebuild(folder)
  const strapi = await strapiPrebuild(folder)
  const tree = await treePrebuild(folder, mdx, strapi)
}

prebuild()

