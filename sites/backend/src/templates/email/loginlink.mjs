import { buttonRow, closingRow, headingRow, lead1Row, wrap } from './blocks.mjs'
import { translations as sharedTranslations } from './blocks.mjs'

/*
 * Used the following replacements:
 * - actionUrl
 * - heading
 * - lead
 * - button
 * - closing
 * - greeting
 * - ps-pre-link
 * - ps-link
 * - ps-post-link
 */
export const loginLink = {
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

export const translations = {}
