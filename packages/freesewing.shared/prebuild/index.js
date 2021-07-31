const mdxPrebuild = require('./mdx')
const strapiPrebuild = require('./strapi')
const treePrebuild = require('./tree')
const i18nPrebuild = require('./i18n')

const folder = [__dirname, '..', '..', `freesewing.${process.env.SITE}`, 'prebuild']

const prebuild = async () => {
  const mdx = await mdxPrebuild(folder)
  const strapi = await strapiPrebuild(folder)
  const i18n = (process.env.SITE === 'org') ? i18nPrebuild(folder) : false
  const tree = await treePrebuild(folder, mdx, strapi, i18n)
}

prebuild()

