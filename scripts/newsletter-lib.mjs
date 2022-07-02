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
import { fileURLToPath } from 'url';

// Current working directory
const cwd = path.dirname(fileURLToPath(import.meta.url))


const backend = "https://backend.freesewing.org/"

const asHtml = async (text) => {
  const content = await unified().use(markdown).use(remark2rehype).use(format).use(html).process(text)

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
  const template = fs.readFileSync(`${cwd}/../config/templates/newsletter.html`, 'utf8')
  let edition
  try {
    edition = await axios.get(`https://posts.freesewing.org/newsletters?slug_eq=${process.env.NL_EDITION}`, 'utf8')
  } catch (err) {
    console.log(err)
    process.exit()
  }
  const text = edition.data[0].body

  const subscribers = await getSubscribers(test)
  const content = await asHtml(text)
  const inject = { content }
  const smtp = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  let i = 1
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
      await smtp.sendMail({
        from: '"FreeSewing" <info@freesewing.org>',
        to: sub.email,
        subject: 'FreeSewing newsletter: Summer 2022',
        headers: {
          Language: 'en',
          'List-Owner': 'joost@joost.at',
          'List-Subscribe': 'https://freesewing.org/community/newsletter/',
          'List-Unsubscribe': unsub,
        },
        text,
        html: body,
      })
    }
    i++
  }
}

const sendTest = () => send(true)
const sendReal = () => send(false)

export {
  sendTest,
  sendReal,
}
