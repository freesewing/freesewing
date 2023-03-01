import { buttonRow, closingRow, headingRow, lead1Row, wrap } from '../shared/blocks.mjs'
// Translations
import en from '../../../../public/locales/en/emailchange.json' assert { type: 'json' }
import de from '../../../../public/locales/de/emailchange.json' assert { type: 'json' }
import es from '../../../../public/locales/es/emailchange.json' assert { type: 'json' }
import fr from '../../../../public/locales/fr/emailchange.json' assert { type: 'json' }
import nl from '../../../../public/locales/nl/emailchange.json' assert { type: 'json' }

export const emailchange = {
  html: wrap.html(`
    ${headingRow.html}
    ${lead1Row.html}
    ${buttonRow.html}
    ${closingRow.html}
  `),
  text: wrap.text(`${headingRow.text}${lead1Row.text}${buttonRow.text}${closingRow.text}`),
}

export const translations = { en, de, es, fr, nl }
