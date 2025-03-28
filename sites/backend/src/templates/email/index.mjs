import { emailchange } from './emailchange.mjs'
import { goodbye } from './goodbye.mjs'
import { signinlink } from './signinlink.mjs'
import { passwordreset } from './passwordreset.mjs'
import { signup } from './signup.mjs'
import { signupaea } from './signup-aea.mjs'
import { signupaed } from './signup-aed.mjs'
import { nlsub } from './nlsub.mjs'
import { nlunsub } from './nlunsub.mjs'
import { nlsubact } from './nlsubact.mjs'
import { nlsubinact } from './nlsubinact.mjs'

/*
 * Everything is kept lowercase here because these key names are used in URLS
 */
export const templates = {
  emailchange,
  goodbye,
  signinlink,
  passwordreset,
  signup,
  'signup-aea': signupaea,
  'signup-aed': signupaed,
  nlsub,
  nlunsub,
  nlsubact,
  nlsubinact,
}
