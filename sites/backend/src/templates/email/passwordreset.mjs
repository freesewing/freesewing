import { replacements } from './shared/replacements.mjs'
import { buttonRow, closingRow, headingRow, wrap } from './shared/blocks.mjs'

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
  replacements: {
    ...replacements,
    subject: '[FreeSewing] passwordreset fixme',
    heading: 'FIXME',
    lead: 'fixme',
    'text-lead': 'fixme',
    closing: 'fixme',
  },
}
