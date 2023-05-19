import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import format from 'rehype-format'
import html from 'rehype-stringify'
import mustache from 'mustache'
import nodemailer from 'nodemailer'
import { testers } from '../config/newsletter-testers.mjs'
import { fileURLToPath } from 'url'
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'

// Current working directory
const cwd = path.dirname(fileURLToPath(import.meta.url))

const backend = 'https://backend.freesewing.org/'

const asHtml = async (text) => {
  const content = await unified()
    .use(markdown)
    .use(remark2rehype)
    .use(format)
    .use(html)
    .process(text)

  return content.value
}

const getToken = async () => {
  let res = await axios.post(`${backend}login`, {
    username: process.env.FS_USER,
    password: process.env.FS_PASSWORD,
  })
  if (res.data) return res.data.token
  else if (res.err) return console.log(err)
}

const getSubscribers = async (test = true) => {
  if (test) return testers
  let token = await getToken()
  let res = await axios.get(`${backend}admin/subscribers`, {
    headers: { Authorization: 'Bearer ' + token },
  })
  if (res.data) return res.data
  else return false
}

const send = async (test = true) => {
  const us = 'FreeSewing <info@freesewing.org>'
  const template = fs.readFileSync(`${cwd}/../config/templates/newsletter.html`, 'utf8')
  let edition
  try {
    edition = await axios.get(
      `https://posts.freesewing.org/newsletters?slug_eq=${process.env.NL_EDITION}`,
      'utf8'
    )
  } catch (err) {
    console.log(err)
    process.exit()
  }
  const text = edition.data[0].body

  const subscribers = await getSubscribers(test)
  const content = await asHtml(text)
  const inject = { content }

  // Oh AWS your APIs are such a clusterfuck
  const client = new SESv2Client({ region: 'us-east-1' })

  let i = 1
  subscribers.sort()
  let subs = subscribers.length
  for (let sub of subscribers) {
    // If your SMTP relay start rate-limiting midway through
    // you can use this if loop to start just after the last
    // successful delivery
    if (i > 0) {
      let unsub = `${backend}newsletter/unsubscribe/${sub.ehash}`
      inject.unsubscribe = unsub
      let body = mustache.render(template, inject)
      console.log(`${i}/${subs} Sending to ${sub.email}`)

      // Via API
      const command = new SendEmailCommand({
        ConfigurationSetName: 'Newsletter',
        Content: {
          Simple: {
            Body: {
              Text: {
                Charset: 'utf-8',
                Data: text,
              },
              Html: {
                Charset: 'utf-8',
                Data: body,
              },
            },
            Subject: {
              Charset: 'utf-8',
              Data: 'FreeSewing newsletter: Spring 2023',
            },
          },
        },
        Destination: {
          ToAddresses: [sub.email],
        },
        //FeedbackForwardingEmailAddress: us,
        FromEmailAddress: us,
        //FromEmailAddressIdentityArn: "arn:aws:ses:us-east-1:550348293871:identity/freesewing.org",
        //ReplyToAddresses: us,
      })
      let result
      try {
        await client.send(command)
      } catch (err) {
        console.log(err)
        return false
      }
    }
    i++
  }
}

const sendTest = () => send(true)
const sendReal = () => send(false)

export { sendTest, sendReal }
