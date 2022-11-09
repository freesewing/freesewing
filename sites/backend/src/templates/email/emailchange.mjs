import { buttonRow, closingRow, headingRow, lead1Row, wrap } from './blocks.mjs'
import { translations as sharedTranslations } from './blocks.mjs'

export const emailChange = {
  html: wrap.html(`
    ${headingRow.html}
    ${lead1Row.html}
    ${buttonRow.html}
    ${closingRow.html}
  `),
  text: wrap.text(`${headingRow.text}${lead1Row.text}${buttonRow.text}${closingRow.text}`),
}

export const translations = {
  en: {
    heading: 'Does this new E-mail address work?',
    lead: 'To confirm your new E-mail address, click the big black rectangle below:',
    button: 'Confirm E-mail change',
    closing: "That's all it takes.",
    greeting: 'love',
    'ps-pre-link': 'FreeSewing is free (duh), but please',
    'ps-link': 'become a patron',
    'ps-post-link': 'if you cxan afford it.',
    ...sharedTranslations.en,
  },
  // FIXME: Translate German
  de: {
    heading: 'Does this new E-mail address work?',
    lead: 'To confirm your new E-mail address, click the big black rectangle below:',
    button: 'Confirm E-mail change',
    closing: "That's all it takes.",
    greeting: 'love',
    'ps-pre-link': 'FreeSewing is free (duh), but please',
    'ps-link': 'become a patron',
    'ps-post-link': 'if you cxan afford it.',
    ...sharedTranslations.de,
  },
  // FIXME: Translate Spanish
  es: {
    heading: 'Does this new E-mail address work?',
    lead: 'To confirm your new E-mail address, click the big black rectangle below:',
    button: 'Confirm E-mail change',
    closing: "That's all it takes.",
    greeting: 'love',
    'ps-pre-link': 'FreeSewing is free (duh), but please',
    'ps-link': 'become a patron',
    'ps-post-link': 'if you cxan afford it.',
    ...sharedTranslations.es,
  },
  // FIXME: Translate French
  fr: {
    heading: 'Does this new E-mail address work?',
    lead: 'To confirm your new E-mail address, click the big black rectangle below:',
    button: 'Confirm E-mail change',
    closing: "That's all it takes.",
    greeting: 'love',
    'ps-pre-link': 'FreeSewing is free (duh), but please',
    'ps-link': 'become a patron',
    'ps-post-link': 'if you cxan afford it.',
    ...sharedTranslations.fr,
  },
  nl: {
    heading: 'Werkt dit E-mail adres?',
    lead: 'Om je E-mail wijziging te bevestigen moet je op de grote zwarte rechthoek hieronder te klikken:',
    button: 'Bevestig je E-mail wijziging',
    closing: 'Dat is al wat je moet doen.',
    greeting: 'liefs',
    'ps-pre-link': 'FreeSewing is gratis (echt), maar gelieve',
    'ps-link': 'ons werk te ondersteunen',
    'ps-post-link': 'als het even kan.',
    ...sharedTranslations.nl,
  },
}
