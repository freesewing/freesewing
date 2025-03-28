import { replacements } from './shared/replacements.mjs'
import { headingRow, wrap } from './shared/blocks.mjs'

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
  replacements: {
    ...replacements,
    subject: '[FreeSewing] Farewell',
    heading: 'FIXME',
    lead: 'fixme',
    'text-lead': 'fixme',
    closing: 'fixme',
  },
}
