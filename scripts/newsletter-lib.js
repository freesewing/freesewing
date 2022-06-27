const fs = require('fs')
const axios = require('axios')
const unified = require('unified')
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const format = require('rehype-format')
const html = require('rehype-stringify')
const mustache = require('mustache')
const nodemailer = require('nodemailer')
const testers = require('./testers')

const backend = process.env.FS_BACKEND

const asHtml = async (text) => {
  let content = await unified().use(markdown).use(remark2rehype).use(format).use(html).process(text)

  return content.contents
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
  const template = fs.readFileSync(`${__dirname}/../templates/newsletter.html`, 'utf8')
  const text = fs.readFileSync(`${__dirname}/../newsletter/${process.env.NL_EDITION}/en.md`, 'utf8')
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
      let unsub = `${backend}unsubscribe/${sub.ehash}`
      inject.unsubscribe = unsub
      let body = mustache.render(template, inject)
      console.log(`${i}/${subs} Sending to ${sub.email}`)
      await smtp.sendMail({
        from: '"FreeSewing" <info@freesewing.org>',
        to: sub.email,
        subject: 'FreeSewing newsletter: Spring 2021',
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

module.exports = {
  sendTest,
  sendReal,
}
