import Controller from '../controllers/newsletter'

const Nws= new Controller()

export default (app, passport) => {
  // Email subscribe
  app.post('/newsletter/subscribe', (req, res) => Nws.subscribe(req, res, true))
  // Email unsubscribe
  app.post('/newsletter/unsubscribe', (req, res) => Nws.subscribe(req, res, false))
  app.get('/newsletter/confirm/:token', (req, res) => Nws.confirm(req, res))
  app.get('/newsletter/unsubscribe/:ehash', (req, res) => Nws.unsubscribe(req, res))
}
