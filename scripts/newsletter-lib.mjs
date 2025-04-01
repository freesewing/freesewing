import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import remarkFrontmatter from 'remark-frontmatter'
import mustache from 'mustache'
import { testers } from '../config/newsletter-testers.mjs'
import { fileURLToPath } from 'url'
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'

// Current working directory
const cwd = path.dirname(fileURLToPath(import.meta.url))

const backend = 'https://backend3.freesewing.org/'

const i18n = {
  en: {
    title: 'FreeSewing newsletter',
    support: 'Support FreeSewing: Become a patron',
    unsub1: 'You can unsubscribe at any time',
    unsub2: 'Or reply and tell us you want out',
  },
}

const asHtml = async (text) => {
  const content = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkSmartypants)
    .use(remarkFrontmatter, ['yaml'])
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(text)

  return content.value
}

const getSubscribers = async (test = true) => {
  if (test) return testers
  let res = await axios.get(`${backend}admin/subscribers/key`, {
    auth: {
      username: process.env.NL_API_KEY,
      password: process.env.NL_API_SECRET,
    },
  })
  if (res.data && res.data.subscribers) return res.data.subscribers
  else return false
}

const send = async (test = true) => {
  const us = 'FreeSewing <info@freesewing.org>'
  const template = fs.readFileSync(`${cwd}/../config/templates/newsletter.html`, 'utf8')
  const subscribers = await getSubscribers(test)

  // Oh AWS your APIs are such a clusterfuck
  const client = new SESv2Client({ region: 'us-east-1' })

  let i = 1
  for (const lang in subscribers) {
    let l = 1
    let edition
    try {
      edition = await axios.get(
        `https://raw.githubusercontent.com/freesewing/freesewing/refs/heads/v4/sites/org/newsletter/${process.env.NL_EDITION}/index.mdx`,
        'utf8'
      )
    } catch (err) {
      console.log(err)
      process.exit()
    }
    const text = edition.data
    const content = await asHtml(text)

    subscribers[lang].sort()
    let subs = subscribers[lang].length

    for (let sub of subscribers[lang]) {
      if (l > 0) {
        const unsubGet = `https://freesewing.org/newsletter/unsubscribe?x=${sub.ehash}`
        const unsubPost = `https://backend3.freesewing.org/ocunsub/${sub.ehash}`
        const body = mustache.render(template, {
          ...i18n.en,
          unsubscribe: unsubGet,
          content,
        })
        console.log(`[${lang}] ${l}/${subs} (${i}) Sending to ${sub.email}`)

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
                Data: i18n.en.title,
              },
              Headers: [
                {
                  Name: 'List-Unsubscribe',
                  Value: unsubPost,
                },
                {
                  Name: 'List-Unsubscribe-Post',
                  Value: 'List-Unsubscribe=One-Click',
                },
              ],
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
        try {
          await client.send(command)
        } catch (err) {
          console.log(err)
          return false
        }
      }
      i++
      l++
    }
  }
}

const sendTest = () => send(true)
const sendReal = () => send(false)

export { sendTest, sendReal }
