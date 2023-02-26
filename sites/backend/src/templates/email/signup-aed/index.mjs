import { closingRow, headingRow, preLeadRow, wrap } from '../shared/blocks.mjs'
// Translations
import en from '../../../../public/locales/en/signup-aed.json' assert { type: 'json' }
import de from '../../../../public/locales/de/signup-aed.json' assert { type: 'json' }
import es from '../../../../public/locales/es/signup-aed.json' assert { type: 'json' }
import fr from '../../../../public/locales/fr/signup-aed.json' assert { type: 'json' }
import nl from '../../../../public/locales/nl/signup-aed.json' assert { type: 'json' }

// aed = Account Exists but is Disabled
export const signupaed = {
  html: wrap.html(`
  ${headingRow.html}
  ${preLeadRow.html}
  ${closingRow.html}
`),
  text: wrap.text(`${headingRow.text}
{{ prelead }}
{{lead }}
${closingRow.text}
`),
}

export const translations = { en, de, es, fr, nl }
