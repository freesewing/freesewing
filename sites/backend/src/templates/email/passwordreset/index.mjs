import { buttonRow, closingRow, headingRow, wrap } from '../shared/blocks.mjs'
// Translations
import en from '../../../../public/locales/en/passwordreset.json' assert { type: 'json' }
import de from '../../../../public/locales/de/passwordreset.json' assert { type: 'json' }
import es from '../../../../public/locales/es/passwordreset.json' assert { type: 'json' }
import fr from '../../../../public/locales/fr/passwordreset.json' assert { type: 'json' }
import nl from '../../../../public/locales/nl/passwordreset.json' assert { type: 'json' }

export const passwordreset = {
  html: wrap.html(`
  ${headingRow.html}
  <tr>
    <td align="left" class="sm-p-15px" style="padding-top: 15px">
      <p style="margin: 0; font-size: 16px; line-height: 25px; color: #262626">
        You forgot your FreeSewing password and that's fine.
        <br>
        <br>
        <a href="__URL__" target="_blank" style="text-decoration: none; color: #262626">
          <b>To re-gain access to your account, click the big black rectangle below:</b>
        </a>
      </p>
    </td>
  </tr>
  ${buttonRow.html}
  ${closingRow.html}
`),
  test: wrap.text(`${headingRow.text}
You forgot your FreeSewing password and that's fine.

To re-gain access to your account, click the link below:

${buttonRow.text}
${closingRow.text}
`),
}

export const translations = { en, de, es, fr, nl }
