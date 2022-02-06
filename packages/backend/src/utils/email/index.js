import config from '../../config'
import { strings as i18n } from '@freesewing/i18n'
import templates from '../../templates'
import { createUrl } from '../'
import sendEmailWith from './relays'

const deliver = sendEmailWith(config.sendEmailWith)
const email = {}

const loadTemplate = (type, format, language='en') => {
  let template = templates.header[format] + templates[type][format] + templates.footer[format]
  let toTranslate = templates[type].i18n.concat(templates.footer.i18n)
  let from = []
  let to = []
  for (let key of toTranslate) {
    from.push(`__${key}__`)
    to.push(i18n[language]['email.' + key] || key)
  }
  for (let i = 0; i < from.length; i++) template = template.replace(from[i], to[i])

  return template
}

const replace = (text, from, to) => {
  for (const id in from) text = text.split(from[id]).join(to[id] || from[id])

  return text
}

email.signup = (recipient, language, id) => {
  let html = loadTemplate('signup', 'html', language)
  let text = loadTemplate('signup', 'text', language)
  let from = ['__signupActionLink__', '__headerOpeningLine__', '__hiddenIntro__', '__footerWhy__']
  let link = createUrl(language, `/confirm/signup/${id}`)
  let to = [
    link,
    i18n[language]['email.signupHeaderOpeningLine'],
    i18n[language]['email.signupHiddenIntro'],
    i18n[language]['email.signupWhy']
  ]
  html = replace(html, from, to)
  text = replace(text, from, to)
  let options = {
    from: `"${i18n[language]['email.joostFromFreesewing']}" <info@freesewing.org>`,
    to: recipient,
    subject: i18n[language]['email.signupSubject'],
    headers: {
      'X-Freesewing-Confirmation-ID': '' + id
    },
    text,
    html
  }
  deliver(options, (error, info) => {
    if (error) return console.log(error)
    console.log('Message sent', info)
  })
}

email.emailchange = (newAddress, currentAddress, language, id) => {
  let html = loadTemplate('emailchange', 'html', language)
  let text = loadTemplate('emailchange', 'text', language)
  let from = [
    '__emailchangeActionLink__',
    '__emailchangeActionText__',
    '__emailchangeTitle__',
    '__emailchangeCopy1__',
    '__headerOpeningLine__',
    '__hiddenIntro__',
    '__footerWhy__',
    '__questionsJustReply__',
    '__signature__'
  ]
  let to = [
    createUrl(language, `/confirm/email/${id}`),
    i18n[language]['email.emailchangeActionText'],
    i18n[language]['email.emailchangeTitle'],
    i18n[language]['email.emailchangeCopy1'],
    i18n[language]['email.emailchangeHeaderOpeningLine'],
    i18n[language]['email.emailchangeHiddenIntro'],
    i18n[language]['email.emailchangeWhy'],
    i18n[language]['email.questionsJustReply'],
    i18n[language]['email.signature'],
  ]
  html = replace(html, from, to)
  text = replace(text, from, to)

  let options = {
    from: `"${i18n[language]['email.joostFromFreesewing']}" <info@freesewing.org>`,
    to: newAddress,
    cc: currentAddress,
    subject: i18n[language]['email.emailchangeSubject'],
    headers: {
      'X-Freesewing-Confirmation-ID': '' + id
    },
    text,
    html
  }
  deliver(options, (error, info) => {
    if (error) return console.log(error)
    console.log('Message sent', info)
  })
}

email.passwordreset = (recipient, language, id) => {
  let html = loadTemplate('passwordreset', 'html', language)
  let text = loadTemplate('passwordreset', 'text', language)
  let from = [
    '__passwordresetActionLink__',
    '__headerOpeningLine__',
    '__hiddenIntro__',
    '__footerWhy__'
  ]
  let to = [
    createUrl(language, `/confirm/reset/${id}`),
    i18n[language]['email.passwordresetHeaderOpeningLine'],
    i18n[language]['email.passwordresetHiddenIntro'],
    i18n[language]['email.passwordresetWhy']
  ]
  html = replace(html, from, to)
  text = replace(text, from, to)

  let options = {
    from: `"${i18n[language]['email.joostFromFreesewing']}" <info@freesewing.org>`,
    to: recipient,
    subject: i18n[language]['email.passwordresetSubject'],
    headers: {
      'X-Freesewing-Confirmation-ID': '' + id
    },
    text,
    html
  }
  deliver(options, (error, info) => {
    if (error) return console.log(error)
    console.log('Message sent', info)
  })
}

email.goodbye = async (recipient, language) => {
  let html = loadTemplate('goodbye', 'html', language)
  let text = loadTemplate('goodbye', 'text', language)
  let from = ['__headerOpeningLine__', '__hiddenIntro__', '__footerWhy__']
  let to = [
    i18n[language]['email.goodbyeHeaderOpeningLine'],
    i18n[language]['email.goodbyeHiddenIntro'],
    i18n[language]['email.goodbyeWhy']
  ]
  html = replace(html, from, to)
  text = replace(text, from, to)

  let options = {
    from: `"${i18n[language]['email.joostFromFreesewing']}" <info@freesewing.org>`,
    to: recipient,
    subject: i18n[language]['email.goodbyeSubject'],
    text,
    html
  }
  deliver(options, (error, info) => {
    if (error) return console.log(error)
    console.log('Message sent', info)
  })
}

email.subscribe = async (recipient, token) => {
  let html = loadTemplate('newsletterSubscribe', 'html', 'en')
  let text = loadTemplate('newsletterSubscribe', 'text', 'en')
  let from = ['__hiddenIntro__', '__headerOpeningLine__', '__newsletterConfirmationLink__', '__footerWhy__']
  let to = [
    'Confirm your subscription to the FreeSewing newsletter',
    'Please confirm it was you who requested this',
    `https://backend.freesewing.org/newsletter/confirm/${token}`,
    `You received this email because somebody tried to subscribe ${recipient} to the FreeSewing newsletter`
  ]
  html = replace(html, from, to)
  text = replace(text, from, to)

  let options = {
    from: `"FreeSewing" <newsletter@freesewing.org>`,
    to: recipient,
    subject: 'Confirm your subscription to the FreeSewing newsletter',
    text,
    html
  }
  deliver(options, (error, info) => {
    if (error) return console.log(error)
    console.log('Message sent', info)
  })
}

email.newsletterWelcome = async (recipient, ehash) => {
  let html = loadTemplate('newsletterWelcome', 'html', 'en')
  let text = loadTemplate('newsletterWelcome', 'text', 'en')
  let from = ['__hiddenIntro__', '__headerOpeningLine__', '__newsletterUnsubscribeLink__', '__footerWhy__']
  let to = [
    'No action required; This is just an FYI',
    "You're in. Now what?",
    `https://backend.freesewing.org/newsletter/unsubscribe/${ehash}`,
    `You received this email because you subscribed to the FreeSewing newsletter`
  ]
  html = replace(html, from, to)
  text = replace(text, from, to)

  let options = {
    from: `"FreeSewing" <newsletter@freesewing.org>`,
    to: recipient,
    subject: 'Welcome to the FreeSewing newsletter',
    text,
    html
  }
  deliver(options, (error, info) => {
    if (error) return console.log(error)
    console.log('Message sent', info)
  })
}

export default email
