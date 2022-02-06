import smtp from './smtp'
//import sendgrid from './sendgrid'

const sendEmailWith = type => {
  const types = {
    smtp
    //sendgrid,
  }
  return types[type]
}

export default sendEmailWith
