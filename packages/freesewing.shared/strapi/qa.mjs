/*
 * This tries to fix as many Strapi things as possible
 */
import { languages as allLanguages } from '../config/freesewing.mjs'

// What types of content to load
const content = {
  dev: ['blog', 'author'],
  org: ['blog', 'author', 'showcase', 'maker'],
}

// What languages to handle
const languages = {
  dev: ['en'],
  org: allLanguages,
}

/*
 * Main method that does what needs doing
 */
export const strapiQa = async () => {

  // Say hi
  console.log()
  console.log(`Running Strapi QA script`)


  for (const site in content) {
    console.log(`Processing content for FreeSewing.${site}`)
    const data = {}
    for (const type of content[site]) {
      data[type] = {}
      for (const lang of languages[site]) {
        console.log(`Loading ${type} content in language: ${lang}`)
        //data[type][lang] = getPosts(type, site, lang)
      }
    }
  }
}

strapiQa()
