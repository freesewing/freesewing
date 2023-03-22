import { buttonRow, closingRow, headingRow, preLeadRow, wrap } from '../shared/blocks.mjs'
// Translations
import en from '../../../../public/locales/en/signup-aea.json' assert { type: 'json' }
import de from '../../../../public/locales/de/signup-aea.json' assert { type: 'json' }
import es from '../../../../public/locales/es/signup-aea.json' assert { type: 'json' }
import fr from '../../../../public/locales/fr/signup-aea.json' assert { type: 'json' }
import nl from '../../../../public/locales/nl/signup-aea.json' assert { type: 'json' }

// aea = Account Exists and is Active
export const signupaea = {
  html: wrap.html(`
  ${headingRow.html}
  ${preLeadRow.html}
  ${buttonRow.html}
  ${closingRow.html}
`),
  text: wrap.text(`
{{{ heading }}}

{{{ preLead }}}

{{{ textLead }}}

{{{ actionUrl }}}

{{{ closing }}}

{{{ greeting }}},
joost

PS: {{{ text-ps }}} : {{{ supportUrl }}}
`),
}

export const translations = { en, de, es, fr, nl }
