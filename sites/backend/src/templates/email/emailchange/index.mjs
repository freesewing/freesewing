import { buttonRow, closingRow, headingRow, lead1Row, wrap } from '../shared/blocks.mjs'
// Translations
import en from './en.json' assert { type: 'json' }
import de from './de.json' assert { type: 'json' }
import es from './es.json' assert { type: 'json' }
import fr from './fr.json' assert { type: 'json' }
import nl from './nl.json' assert { type: 'json' }
import uk from './uk.json' assert { type: 'json' }

export const emailchange = {
  html: wrap.html(`
    ${headingRow.html}
    ${lead1Row.html}
    ${buttonRow.html}
    ${closingRow.html}
  `),
  text: wrap.text(`${headingRow.text}${lead1Row.text}${buttonRow.text}${closingRow.text}`),
}

export const translations = { en, de, es, fr, nl, uk }
