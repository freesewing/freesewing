import { emailChange, translations as emailChangeTranslations } from './emailchange/index.mjs'
import { goodbye, translations as goodbyeTranslations } from './goodbye/index.mjs'
import { loginLink, translations as loginLinkTranslations } from './loginlink/index.mjs'
import { newsletterSub, translations as newsletterSubTranslations } from './newslettersub/index.mjs'
import { passwordReset, translations as passwordResetTranslations } from './passwordreset/index.mjs'
import { signup, translations as signupTranslations } from './signup/index.mjs'
import { signupAea, translations as signupAeaTranslations } from './signup-aea/index.mjs'
import { signupAed, translations as signupAedTranslations } from './signup-aed/index.mjs'
// Shared translations
import en from '../../../public/locales/en/shared.json' assert { type: 'json' }
import de from '../../../public/locales/de/shared.json' assert { type: 'json' }
import es from '../../../public/locales/es/shared.json' assert { type: 'json' }
import fr from '../../../public/locales/fr/shared.json' assert { type: 'json' }
import nl from '../../../public/locales/nl/shared.json' assert { type: 'json' }

export const templates = {
  emailChange,
  goodbye,
  loginLink,
  newsletterSub,
  passwordReset,
  signup,
  'signup-aea': signupAea,
  'signup-aed': signupAed,
}

export const translations = {
  emailChange: emailChangeTranslations,
  goodbye: goodbyeTranslations,
  loginLink: loginLinkTranslations,
  newsletterSub: newsletterSubTranslations,
  passwordReset: passwordResetTranslations,
  signup: signupTranslations,
  'signup-aea': signupAeaTranslations,
  'signup-aed': signupAedTranslations,
  shared: { en, de, es, fr, nl },
}
