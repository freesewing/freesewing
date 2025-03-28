import { replacements } from './shared/replacements.mjs'
import { buttonRow, newsletterClosingRow, headingRow, lead1Row, wrap } from './shared/blocks.mjs'

export const nlsub = {
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
    subject: '[FreeSewing] Confirm your newsletter subscription',
    heading: 'Please confirm your newsletter subscription',
    lead: 'To confirm your subscription to the FreeSewing newsletter, click the big rectangle below:',
    'text-lead': 'To confirm your subscription to the FreeSewing newsletter, click the link below:',
    button: 'Confirm subscription',
    closing:
      'You (or someone else) tried to subscribe this email address to the FreeSewing newsletter just now.',
    greeting: 'love,',
  },
}
