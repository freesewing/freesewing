import { buttonRow, closingRow, headingRow, lead1Row, wrap } from '../shared/blocks.mjs'
// Translations
import en from '../../../../public/locales/en/signup.json' assert { type: 'json' }
import de from '../../../../public/locales/de/signup.json' assert { type: 'json' }
import es from '../../../../public/locales/es/signup.json' assert { type: 'json' }
import fr from '../../../../public/locales/fr/signup.json' assert { type: 'json' }
import nl from '../../../../public/locales/nl/signup.json' assert { type: 'json' }

export const signup = {
  html: wrap.html(`
  ${headingRow.html}
  ${lead1Row.html}
  ${buttonRow.html}
  ${closingRow.html}
`),
  text: wrap.text(`
{{{ heading }}}

{{{ textLead }}}

{{{ actionUrl }}}

{{{ closing }}}

{{{ greeting }}},
joost

PS: {{{ text-ps }}} : {{{ supportUrl }}}
`),
}

export const translations = { en, de, es, fr, nl }
