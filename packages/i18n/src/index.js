import en from './locales/en'
import de from './locales/de'
import es from './locales/es'
import fr from './locales/fr'
import nl from './locales/nl'

const languageCodes = ['en', 'de', 'es', 'fr', 'nl']
const imports = { en, de, es, fr, nl }

const plugin = {}
const jargon = {}
const strings = {}
const languages = {}

for (let l of languageCodes) {
  strings[l] = imports[l].strings
  jargon[l] = imports[l].jargon
  plugin[l] = imports[l].plugin
  languages[l] = strings[l]['i18n.' + l]
}

export { strings, languages, plugin, jargon, en, de, es, fr, nl }
