import { headingRow, wrap } from '../shared/blocks.mjs'
// Translations
import en from '../../../../public/locales/en/goodbye.json' assert { type: 'json' }
import de from '../../../../public/locales/de/goodbye.json' assert { type: 'json' }
import es from '../../../../public/locales/es/goodbye.json' assert { type: 'json' }
import fr from '../../../../public/locales/fr/goodbye.json' assert { type: 'json' }
import nl from '../../../../public/locales/nl/goodbye.json' assert { type: 'json' }

export const goodbye = {
  html: wrap.html(`
  ${headingRow.html}
  <tr>
    <td align="left" class="sm-p-15px" style="padding-top: 15px">
      <p style="margin: 0; font-size: 16px; line-height: 25px; color: #262626">
        {{ lead1 }}
        <br>
        {{ lead2 }}
        <br><br>
        {{ greeting }},
        <br>
        joost
        <br><br>
        <small>PS: {{ ps }}.</small>
      </p>
    </td>
  </tr>
`),
  text: wrap.text(`${headingRow.text}
{{lead1}}
{{lead2}}

{{greeting}}
joost

PS: {{ps}}`),
}

export const translations = { en, de, es, fr, nl }
