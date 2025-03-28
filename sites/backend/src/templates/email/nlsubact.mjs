import { replacements } from './shared/replacements.mjs'
import { newsletterClosingRow, headingRow, lead1Row, wrap } from './shared/blocks.mjs'

export const nlsubact = {
  html: wrap.html(`
  ${headingRow.html}
  ${lead1Row.html}
  ${newsletterClosingRow.html}
`),
  text: wrap.text(`
${headingRow.text}
${lead1Row.text}
${newsletterClosingRow.text}
`),
  replacements: {
    ...replacements,
    subject: '[FreeSewing] You are already subscribed to our newsletter',
    heading: 'You are already subscribed',
    closing:
      'You (or someone else) tried to subscribe this email address to the FreeSewing newsletter just now. But you are already subscribed, so there is nothing to do here.',
    greeting: 'love,',
  },
}
