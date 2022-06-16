import Controller from '../controllers/auth'

const Auth = new Controller()

export default (app, passport) => {
  // Oauth
  app.post('/oauth/init', Auth.initOauth)
  app.get('/oauth/callback/from/:provider', Auth.providerCallback)
  app.post('/oauth/login', Auth.loginOauth)
}
