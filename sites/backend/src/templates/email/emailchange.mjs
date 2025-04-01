import { replacements } from './shared/replacements.mjs'
import { buttonRow, closingRow, headingRow, lead1Row, wrap } from './shared/blocks.mjs'

export const emailchange = {
  html: wrap.html(`
    ${headingRow.html}
    ${lead1Row.html}
    ${buttonRow.html}
    ${closingRow.html}
  `),
  text: wrap.text(`${headingRow.text}${lead1Row.text}${buttonRow.text}${closingRow.text}`),
  replacements: {
    ...replacements,
    subject: '[FreeSewing] Confirm your new E-mail address',
    heading: 'Does this new E-mail address work?',
    lead: 'To confirm your new E-mail address, click the big black rectangle below:',
    'text-lead': 'To confirm your new E-mail address, click the link below:',
    button: 'Confirm E-mail change',
    closing: "That's all it takes.",
  },
}
