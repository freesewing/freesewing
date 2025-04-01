import { replacements } from './shared/replacements.mjs'
import { closingRow, headingRow, preLeadRow, wrap } from './shared/blocks.mjs'

// aed = Account Exists but is Disabled
export const signupaed = {
  html: wrap.html(`
  ${headingRow.html}
  ${preLeadRow.html}
  ${closingRow.html}
`),
  text: wrap.text(`${headingRow.text}
{{ prelead }}
{{lead }}
${closingRow.text}
`),
  replacements: {
    ...replacements,
    subject: '[FreeSewing] Your account is marked as disabled',
    heading: 'Your FreeSewing account is disabled',
    preLead:
      'An account can become disabled when a user revokes consent, or (exceptionally) when an administrator disables it.',
    lead: 'In any case, the only way to re-enable a disabled account is to reach out to support.',
    closing: 'To contact support, you can reply to this email.',
  },
}
