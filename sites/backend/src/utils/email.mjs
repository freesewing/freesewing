import { templates, translations } from '../templates/email/index.mjs'
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
import mustache from 'mustache'
import { log } from './log.mjs'

/*
 * Exporting this closure that makes sure we have access to the
 * instantiated config
 */
export const mailer = (config) => ({
  email: {
    send: (params) => sendEmailViaAwsSes(config, params),
  },
})

/*
 * The code below handles delivery via AWS SES
 *
 * If you want to use another way to send email, change the mailer
 * assignment above to point to another method to deliver email
 */
async function sendEmailViaAwsSes(
  config,
  { template, to, cc = false, language = 'en', replacements = {} }
) {
  // Make sure we have what it takes
  if (!template || !to || typeof templates[template] === 'undefined') {
    log.warn(`Tried to email invalid template: ${template}`)
    return false
  }

  if (!cc) cc = []
  if (typeof cc === 'string') cc = [cc]
  if (Array.isArray(config.aws.ses.cc) && config.aws.ses.cc.length > 0)
    cc = [...new Set([...cc, ...config.aws.ses.cc])]

  log.info(`Emailing template ${template} to ${to}`)

  // Load template
  const { html, text } = templates[template]
  const replace = {
    website: `FreeSewing.org`,
    ...translations.shared[language],
    ...translations[template][language],
    ...replacements,
  }
  if (language !== 'en') replace.website += `/${language}`

  // IMHO the AWS apis are a complete clusterfuck
  const client = new SESv2Client({ region: config.aws.ses.region })
  const command = new SendEmailCommand({
    ConfigurationSetName: 'backend',
    Content: {
      Simple: {
        Body: {
          Text: {
            Charset: 'utf-8',
            Data: mustache.render(text, replace),
          },
          Html: {
            Charset: 'utf-8',
            Data: mustache.render(html, replace),
          },
        },
        Subject: {
          Charset: 'utf-8',
          Data: replace.subject,
        },
      },
    },
    Destination: {
      ToAddresses: [to],
      CcAddresses: cc,
      BccAddresses: config.aws.ses.bcc || [],
    },
    FeedbackForwardingEmailAddress: config.aws.ses.feedback,
    FromEmailAddress: config.aws.ses.from,
    ReplyToAddresses: config.aws.ses.replyTo || [],
  })
  let result
  try {
    result = await client.send(command)
  } catch (err) {
    console.log(err)
    return false
  }

  return result['$metadata']?.httpStatusCode === 200
}
