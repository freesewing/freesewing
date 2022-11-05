import { buttonRow, closingRow, headingRow, lead1Row, wrap } from './blocks.mjs'
import { translations as sharedTranslations } from './blocks.mjs'

/*
 * Used the following replacements:
 * - actionUrl
 * - heading
 * - lead
 * - button
 * - closing
 * - greeting
 * - ps-pre-link
 * - ps-link
 * - ps-post-link
 */
export const signup = {
  html: wrap.html(`
  ${headingRow.html}
  ${lead1Row.html}
  ${buttonRow.html}
  ${closingRow.html}
`),
  text: wrap.text(`
  ${headingRow.text}
  ${lead1Row.text}
  ${buttonRow.text}
  ${closingRow.text}
`),
}

export const translations = {
  en: {
    subject: '[FreeSewing] Confirm your E-mail address to activate your account',
    heading: 'Welcome to FreeSewing',
    lead: 'To activate your account, click the big black rectangle below:',
    button: 'Activate account',
    closing: "That's all for now.",
    greeting: 'love',
    'ps-pre-link': 'FreeSewing is free (duh), but please',
    'ps-link': 'become a patron',
    'ps-post-link': 'if you cxan afford it.',
    ...sharedTranslations.en,
  },
  // FIXME: Translate German
  de: {
    subject: '[FreeSewing] Confirm your E-mail address to activate your account',
    heading: 'Welcome to FreeSewing',
    lead: 'To activate your account, click the big black rectangle below:',
    button: 'Activate account',
    closing: "That's all for now.",
    greeting: 'love',
    'ps-pre-link': 'FreeSewing is free (duh), but please',
    'ps-link': 'become a patron',
    'ps-post-link': 'if you cxan afford it.',
    ...sharedTranslations.de,
  },
  // FIXME: Translate Spanish
  es: {
    subject: '[FreeSewing] Confirm your E-mail address to activate your account',
    heading: 'Welcome to FreeSewing',
    lead: 'To activate your account, click the big black rectangle below:',
    button: 'Activate account',
    closing: "That's all for now.",
    greeting: 'love',
    'ps-pre-link': 'FreeSewing is free (duh), but please',
    'ps-link': 'become a patron',
    'ps-post-link': 'if you cxan afford it.',
    ...sharedTranslations.es,
  },
  // FIXME: Translate French
  fr: {
    subject: '[FreeSewing] Confirm your E-mail address to activate your account',
    heading: 'Welcome to FreeSewing',
    lead: 'To activate your account, click the big black rectangle below:',
    button: 'Activate account',
    closing: "That's all for now.",
    greeting: 'love',
    'ps-pre-link': 'FreeSewing is free (duh), but please',
    'ps-link': 'become a patron',
    'ps-post-link': 'if you can afford it.',
    ...sharedTranslations.fr,
  },
  nl: {
    subject: '[FreeSewing] Bevestig je E-mail adres om je account te activeren',
    heading: 'Welkom bij FreeSewing',
    lead: 'Om je account te activeren moet je op de grote zwarte rechthoek hieronder te klikken:',
    button: 'Account activeren',
    closing: 'Daarmee is dat ook weer geregeld.',
    greeting: 'liefs',
    'ps-pre-link': 'FreeSewing is gratis (echt), maar gelieve',
    'ps-link': 'ons werk te ondersteunen',
    'ps-post-link': 'als het even kan.',
    ...sharedTranslations.nl,
  },
}
