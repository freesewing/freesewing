import { replacements } from './shared/replacements.mjs'
import { buttonRow, closingRow, headingRow, preLeadRow, wrap } from './shared/blocks.mjs'

// aea = Account Exists and is Active
export const signupaea = {
  html: wrap.html(`
  ${headingRow.html}
  ${preLeadRow.html}
  ${buttonRow.html}
  ${closingRow.html}
`),
  text: wrap.text(`
{{{ heading }}}

{{{ preLead }}}

{{{ textLead }}}

{{{ actionUrl }}}

{{{ closing }}}

{{{ greeting }}},
joost

PS: {{{ text-ps }}} : {{{ supportUrl }}}
`),
  replacements: {
    ...replacements,
    subject: "[FreeSewing] No need to sign up, you're already in",
    heading: 'Welcome back to FreeSewing',
    preLead:
      'Someone (you?) tried to sign up with this email address. But we already have an active account tied to this email.',
    lead: 'To log in to your account, click the big black button below:',
    'text-lead': 'To log in to your account, click the link below:',
    button: 'Log in',
    closing: "That's all it takes.",
  },
}
