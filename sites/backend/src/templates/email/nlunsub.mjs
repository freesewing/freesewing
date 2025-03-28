import { replacements } from './shared/replacements.mjs'
import { buttonRow, newsletterClosingRow, headingRow, lead1Row, wrap } from './shared/blocks.mjs'

export const nlunsub = {
  html: wrap.html(`
  ${headingRow.html}
  ${lead1Row.html}
  ${buttonRow.html}
  ${newsletterClosingRow.html}
`),
  text: wrap.text(`
${headingRow.text}
${lead1Row.text}
${buttonRow.text}
${newsletterClosingRow.text}
`),
  replacements: {
    ...replacements,
    subject: '[FreeSewing] Confirm you want to unsubscribe from our newsletter',
    heading: 'Please confirm you want to unsubscribe from our newsletter',
    lead: 'To confirm you want to unsubscribe from the FreeSewing newsletter, click the big rectangle below:',
    'text-lead':
      'To confirm you want to unsunscribe from the FreeSewing newsletter, click the link below:',
    button: 'Unsubscribe',
    closing:
      'You (or someone else) tried to unsubscribe this email address from the FreeSewing newsletter just now.',
    greeting: 'love,',
  },
}
