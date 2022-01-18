import { Newsletter, Confirmation, User } from '../models'
import {
  log,
  email,
  ehash,
} from '../utils'
import path from 'path'

const bail = (res, page='index') => res.sendFile(path.resolve(__dirname, '..', 'landing', `${page}.html`))

function NewsletterController() {}

NewsletterController.prototype.subscribe = function(req, res, subscribe=true) {
  if (!req.body || !req.body.email) return res.sendStatus(400)
  let confirmation = new Confirmation({
    type: 'newsletter',
    data: { email: req.body.email }
  })
  confirmation.save(function(err) {
    if (err) return res.sendStatus(500)
    log.info('newsletterSubscription', {
      email: req.body.email,
      confirmation: confirmation._id
    })
    email.subscribe(req.body.email, confirmation._id)
    return res.send({status: 'subscribed'})
  })
}

NewsletterController.prototype.confirm = function(req, res, subscribe=true) {
  if (!req.params.token) return bail(res, 'invalid')
  Confirmation.findById(req.params.token, (err, confirmation) => {
    if (err) return bail(res)
    if (confirmation === null) return bail(res)
    Newsletter.findOne(
      {
        ehash: ehash(confirmation.data.email)
      },
      (err, reader) => {
        if (err) return bail(res)
        // Already exists?
        if (reader !== null) return bail(res, 'already-subscribed')
        let hash = ehash(confirmation.data.email)

        let sub = new Newsletter({
          email: confirmation.data.email,
          ehash: hash,
          time: {
            created: new Date()
          }
        })
        sub.save(function(err) {
          if (err) {
            log.error('newsletterSubscriptionFailed', sub)
            console.log(err)
            return res.sendStatus(500)
          } else {
            console.log(`Subscribed ${reader.email} to the newsletter`)
            email.newsletterWelcome(confirmation.data.email, hash)

            return bail(res, 'subscribe')
          }
        })
      })
  })
}

NewsletterController.prototype.unsubscribe = function(req, res) {
  if (!req.params.ehash) return bail(res, 'invalid')

  Newsletter.findOne({ ehash: req.params.ehash }, (err, reader) => {
    if (reader) {
      Newsletter.deleteOne({id: reader.id}, (err, result) => {
        if (!err) {
          console.log(`Unsubscribed ${reader.email} from the newsletter`)
          return bail(res, 'unsubscribe')
        }
        else return bail(res, 'oops')
      })
    } else {
      User.findOne({ ehash: req.params.ehash }, (err, user) => {
        if (user) {
          user.newsletter = false
          user.save(function(err, updatedUser) {
            if (err) {
              log.error('accountUpdateFailed', err)
              return res.sendStatus(500)
            } else return bail(res, 'unsubscribe')
          })
        }
        else return bail(res, 'oops')
      })
    }
  })
}

export default NewsletterController
