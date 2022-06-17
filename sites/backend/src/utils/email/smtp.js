import nodemailer from 'nodemailer'
import config from '../../config'

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: false, // Only needed or SSL, not for TLS
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass
  }
})

const deliver = (data, callback) => {
  transporter.sendMail(data, callback)
}

export default deliver
