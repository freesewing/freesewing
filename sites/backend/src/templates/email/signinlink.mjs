import { replacements } from './shared/replacements.mjs'
import { buttonRow, closingRow, headingRow, lead1Row, wrap } from './shared/blocks.mjs'

export const signinlink = {
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
    subject: '[FreeSewing] Your sign-in link',
    heading: 'A secret access link, just for you',
    lead: 'To sign in to FreeSewing, click the big black rectangle below:',
    'text-lead': 'To sign in to FreeSewing, click the link below:',
    button: 'Sign in',
    closing: 'Do not share this email, it really is just for you.',
  },
}
