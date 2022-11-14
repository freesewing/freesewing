import { emailChange, translations as emailChangeTranslations } from './emailchange.mjs'
import { goodbye, translations as goodbyeTranslations } from './goodbye.mjs'
import { loginLink, translations as loginLinkTranslations } from './loginlink.mjs'
import { newsletterSub, translations as newsletterSubTranslations } from './newslettersub.mjs'
import { passwordReset, translations as passwordResetTranslations } from './passwordreset.mjs'
import { signup, translations as signupTranslations } from './signup.mjs'

export const templates = {
  emailChange,
  goodbye,
  loginLink,
  newsletterSub,
  passwordReset,
  signup,
}

/*
 * This is not part of our i18n package for... reasons
 * It's not an accident, let's put it that way.
 */
export const translations = {
  emailChange: emailChangeTranslations,
  goodbye: goodbyeTranslations,
  loginLink: loginLinkTranslations,
  newsletterSub: newsletterSubTranslations,
  passwordReset: passwordResetTranslations,
  signup: signupTranslations,
}
