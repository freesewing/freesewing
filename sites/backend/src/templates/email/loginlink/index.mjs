import { buttonRow, closingRow, headingRow, wrap } from '../shared/blocks.mjs'
// Translations
import en from '../../../../public/locales/en/loginlink.json' assert { type: 'json' }
import de from '../../../../public/locales/de/loginlink.json' assert { type: 'json' }
import es from '../../../../public/locales/es/loginlink.json' assert { type: 'json' }
import fr from '../../../../public/locales/fr/loginlink.json' assert { type: 'json' }
import nl from '../../../../public/locales/nl/loginlink.json' assert { type: 'json' }

export const loginlink = {
  html: wrap.html(`
  ${headingRow}
  <tr>
    <td align="left" class="sm-p-15px" style="padding-top: 15px">
      <p style="margin: 0; font-size: 16px; line-height: 25px; color: #262626">
        {{ prelead }}
        <br>
        <br>
        <a href="__URL__" target="_blank" style="text-decoration: none; color: #262626">
          <b>{{ lead }}:</b>
        </a>
      </p>
    </td>
  </tr>
  ${buttonRow.text}
  ${closingRow.text}
`),
  text: wrap.text(`${headingRow.text}
{{ prelead }}
{{lead }}
${buttonRow.text}
${closingRow.text}
`),
}

export const translations = { en, de, es, fr, nl }
