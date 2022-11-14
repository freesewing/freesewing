import { templates, translations } from '../templates/email/index.mjs'
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
import mustache from 'mustache'

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
async function sendEmailViaAwsSes(config, { template, to, language = 'en', replacements = {} }) {
  // Make sure we have what it takes
  if (!template || !to || typeof templates[template] === 'undefined') return false

  // Load template
  const { html, text } = templates[template]
  const replace = {
    ...translations[template][language],
    ...replacements,
  }

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
      CcAddresses: config.aws.ses.cc || [],
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
