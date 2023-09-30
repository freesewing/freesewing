import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'

export const send = async ({
  to = ['joost@joost.at'],
  bcc = [],
  subject = false,
  html = false,
  text = false,
}) => {
  if (!subject || !html || !text) return console.log('No subject, html, or text provided')

  const us = 'Joost from FreeSewing <info@freesewing.org>'

  // Oh AWS your APIs are such a clusterfuck
  const client = new SESv2Client({ region: 'us-east-1' })

  // Via API
  const command = new SendEmailCommand({
    ConfigurationSetName: 'backend',
    Content: {
      Simple: {
        Body: {
          Text: {
            Charset: 'utf-8',
            Data: text,
          },
          Html: {
            Charset: 'utf-8',
            Data: html,
          },
        },
        Subject: {
          Charset: 'utf-8',
          Data: subject,
        },
      },
    },
    Destination: {
      ToAddresses: to,
      BccAddresses: bcc,
    },
    FromEmailAddress: us,
  })
  try {
    const result = await client.send(command)
    console.log(result)
  } catch (err) {
    console.log(err)
    return false
  }
}
