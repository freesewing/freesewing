import { closingRow, headingRow, preLeadRow, wrap } from '../shared/blocks.mjs'
// Translations
import en from './en.json' assert { type: 'json' }
import de from './de.json' assert { type: 'json' }
import es from './es.json' assert { type: 'json' }
import fr from './fr.json' assert { type: 'json' }
import nl from './nl.json' assert { type: 'json' }
import uk from './uk.json' assert { type: 'json' }

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

export const translations = { en, de, es, fr, nl, uk }
