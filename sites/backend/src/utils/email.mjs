import axios from 'axios'
import { templates } from '../templates/email.mjs'
// FIXME: Update this after we re-structure the i18n package
import en from '../../../../packages/i18n/dist/en/email.mjs'
import nl from '../../../../packages/i18n/dist/en/email.mjs'
import fr from '../../../../packages/i18n/dist/en/email.mjs'
import es from '../../../../packages/i18n/dist/en/email.mjs'
import de from '../../../../packages/i18n/dist/en/email.mjs'
import { i18nUrl } from './index.mjs'
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2"

const i18n = { en, nl, fr, es, de }

export const emailTemplate = {
  signup: (to, language, uuid) => [
    i18n[language].signupTitle,
    templates.signup(
      i18n[language],
      to,
      i18nUrl(language, `/confirm/signup/${uuid}`)
    )],
  emailChange: (to, cc, language, uuid) => [
  ]
}

emailTemplate.emailchange = (newAddress, currentAddress, language, id) => {
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
    '__signature__',
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
      'X-Freesewing-Confirmation-ID': '' + id,
    },
    text,
    html,
  }
  deliver(options, (error, info) => {
    if (error) return console.log(error)
    console.log('Message sent', info)
  })
}

emailTemplate.passwordreset = (recipient, language, id) => {
  let html = loadTemplate('passwordreset', 'html', language)
  let text = loadTemplate('passwordreset', 'text', language)
  let from = [
    '__passwordresetActionLink__',
    '__headerOpeningLine__',
    '__hiddenIntro__',
    '__footerWhy__',
  ]
  let to = [
    createUrl(language, `/confirm/reset/${id}`),
    i18n[language]['email.passwordresetHeaderOpeningLine'],
    i18n[language]['email.passwordresetHiddenIntro'],
    i18n[language]['email.passwordresetWhy'],
  ]
  html = replace(html, from, to)
  text = replace(text, from, to)

  let options = {
    from: `"${i18n[language]['email.joostFromFreesewing']}" <info@freesewing.org>`,
    to: recipient,
    subject: i18n[language]['email.passwordresetSubject'],
    headers: {
      'X-Freesewing-Confirmation-ID': '' + id,
    },
    text,
    html,
  }
  deliver(options, (error, info) => {
    if (error) return console.log(error)
    console.log('Message sent', info)
  })
}

emailTemplate.goodbye = async (recipient, language) => {
  let html = loadTemplate('goodbye', 'html', language)
  let text = loadTemplate('goodbye', 'text', language)
  let from = ['__headerOpeningLine__', '__hiddenIntro__', '__footerWhy__']
  let to = [
    i18n[language]['email.goodbyeHeaderOpeningLine'],
    i18n[language]['email.goodbyeHiddenIntro'],
    i18n[language]['email.goodbyeWhy'],
  ]
  html = replace(html, from, to)
  text = replace(text, from, to)

  let options = {
    from: `"${i18n[language]['email.joostFromFreesewing']}" <info@freesewing.org>`,
    to: recipient,
    subject: i18n[language]['email.goodbyeSubject'],
    text,
    html,
  }
  deliver(options, (error, info) => {
    if (error) return console.log(error)
    console.log('Message sent', info)
  })
}

emailTemplate.subscribe = async (recipient, token) => {
  let html = loadTemplate('newsletterSubscribe', 'html', 'en')
  let text = loadTemplate('newsletterSubscribe', 'text', 'en')
  let from = [
    '__hiddenIntro__',
    '__headerOpeningLine__',
    '__newsletterConfirmationLink__',
    '__footerWhy__',
  ]
  let to = [
    'Confirm your subscription to the FreeSewing newsletter',
    'Please confirm it was you who requested this',
    `https://backend.freesewing.org/newsletter/confirm/${token}`,
    `You received this email because somebody tried to subscribe ${recipient} to the FreeSewing newsletter`,
  ]
  html = replace(html, from, to)
  text = replace(text, from, to)

  let options = {
    from: `"FreeSewing" <newsletter@freesewing.org>`,
    to: recipient,
    subject: 'Confirm your subscription to the FreeSewing newsletter',
    text,
    html,
  }
  deliver(options, (error, info) => {
    if (error) return console.log(error)
    console.log('Message sent', info)
  })
}

emailTemplate.newsletterWelcome = async (recipient, ehash) => {
  let html = loadTemplate('newsletterWelcome', 'html', 'en')
  let text = loadTemplate('newsletterWelcome', 'text', 'en')
  let from = [
    '__hiddenIntro__',
    '__headerOpeningLine__',
    '__newsletterUnsubscribeLink__',
    '__footerWhy__',
  ]
  let to = [
    'No action required; This is just an FYI',
    "You're in. Now what?",
    `https://backend.freesewing.org/newsletter/unsubscribe/${ehash}`,
    `You received this email because you subscribed to the FreeSewing newsletter`,
  ]
  html = replace(html, from, to)
  text = replace(text, from, to)

  let options = {
    from: `"FreeSewing" <newsletter@freesewing.org>`,
    to: recipient,
    subject: 'Welcome to the FreeSewing newsletter',
    text,
    html,
  }
  deliver(options, (error, info) => {
    if (error) return console.log(error)
    console.log('Message sent', info)
  })
}


/*
 * Exporting this closure that makes sure we have access to the
 * instantiated config
 */
export const mailer = (config) => ({
  email: {
    send: (...params) => sendEmailViaAwsSes(config, ...params),
  }
})

/*
 * The code below handles delivery via AWS SES
 *
 * If you want to use another way to send email, change the mailer
 * assignment above to point to another method to deliver email
 */
async function sendEmailViaAwsSes(config, to, subject, text) {
  // IMHO the AWS apis are a complete clusterfuck
  // can't even use them without their garbage SDK
  const Charset = 'utf-8'
  const client = new SESv2Client({ region: config.aws.ses.region })
  const command = new SendEmailCommand({
    ConfigurationSetName: 'backend',
    Content: {
      Simple: {
        Body: {
          Text: { Charset, Data: text },
        },
        Subject: { Charset, Data: subject },
      },
    },
    Destination: {
      ToAddresses: [ to ],
      BccAddresses: [ 'tracking@freesewing.org' ],
    },
    FeedbackForwardingEmailAddress: 'bounce@freesewing.org',
    FromEmailAddress: 'info@freesewing.org',
    ReplyToAddresses: [ 'info@freesewing.org' ],
  })
  const result = await client.send(command)

  return (result['$metadata']?.httpStatusCode === 200)
}


