import sendgrid from '@sendgrid/mail'
import config from '../../config'

sendgrid.setApiKey(config.sendgrid)

const deliver = (data, callback) => {
  sendgrid.send(data).then(result => {
    // FIXME: This is obviously nonsense
    if (result[0].statusCode === 202)
      callback(false, {
        from: data.from,
        to: data.to,
        subject: data.subject
      })
    else callback(true, 'Sending via SendGridfailed')
  })
}

export default deliver
