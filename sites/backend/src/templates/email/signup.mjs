import { replacements } from './shared/replacements.mjs'
import { buttonRow, closingRow, headingRow, lead1Row, wrap } from './shared/blocks.mjs'

export const signup = {
  html: wrap.html(`
  ${headingRow.html}
  ${lead1Row.html}
  ${buttonRow.html}
  ${closingRow.html}
`),
  text: wrap.text(`
{{{ heading }}}

{{{ textLead }}}

{{{ actionUrl }}}

{{{ closing }}}

{{{ greeting }}},
joost

PS: {{{ text-ps }}} : {{{ supportUrl }}}
`),
  replacements: {
    ...replacements,
    subject: '[FreeSewing] Here is your sign-up link for FreeSewing.org',
    heading: 'Join FreeSewing',
    lead: 'To create a FreeSewing account linked to this email address, click the big black rectangle below:',
    'text-lead':
      'To create a FreeSewing account linked to this email address, click the link below:',
    button: 'Create an account',
    closing: "That's all for now.",
  },
}
