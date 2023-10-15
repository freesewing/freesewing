import { emailchange, translations as emailchangeTranslations } from './emailchange/index.mjs'
import { goodbye, translations as goodbyeTranslations } from './goodbye/index.mjs'
import { signinlink, translations as signinlinkTranslations } from './signinlink/index.mjs'
import { passwordreset, translations as passwordresetTranslations } from './passwordreset/index.mjs'
import { signup, translations as signupTranslations } from './signup/index.mjs'
import { signupaea, translations as signupaeaTranslations } from './signup-aea/index.mjs'
import { signupaed, translations as signupaedTranslations } from './signup-aed/index.mjs'
import { transinvite, translations as transinviteTranslations } from './transinvite/index.mjs'
import { langsuggest } from './langsuggest/index.mjs'
import { nlsub, translations as nlsubTranslations } from './nlsub/index.mjs'
import { nlsubact, translations as nlsubactTranslations } from './nlsubact/index.mjs'
import { nlsubinact, translations as nlsubinactTranslations } from './nlsubinact/index.mjs'
// Shared translations
import en from './en.json' assert { type: 'json' }
import de from './de.json' assert { type: 'json' }
import es from './es.json' assert { type: 'json' }
import fr from './fr.json' assert { type: 'json' }
import nl from './nl.json' assert { type: 'json' }
import uk from './uk.json' assert { type: 'json' }

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
  transinvite,
  langsuggest,
  nlsub,
  nlsubact,
  nlsubinact,
}

/*
 * Not all emails need translation
 */
const noTranslations = {
  en: {},
  de: {},
  es: {},
  fr: {},
  nl: {},
  uk: {},
}

export const translations = {
  emailchange: emailchangeTranslations,
  goodbye: goodbyeTranslations,
  signinlink: signinlinkTranslations,
  passwordreset: passwordresetTranslations,
  signup: signupTranslations,
  'signup-aea': signupaeaTranslations,
  'signup-aed': signupaedTranslations,
  transinvite: transinviteTranslations,
  langsuggest: noTranslations,
  nlsub: nlsubTranslations,
  nlsubact: nlsubactTranslations,
  nlsubinact: nlsubinactTranslations,
  shared: { en, de, es, fr, nl, uk },
}
