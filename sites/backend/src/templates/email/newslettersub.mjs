import { buttonRow, closingRow, headingRow, lead1Row, wrap } from './blocks.mjs'

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
export const newsletterSub = {
  html: wrap.html(`
  ${headingRow.html}
  ${lead1Row.html}
  ${buttonRow.html}
  ${closingRow.html}
`),
  text: wrap.text(`
${headingRow.text}
${lead1Row.text}
${buttonRow.text}
${closingRow.text}
`),
}
