import Controller from '../controllers/oauth.mjs'

const OAuth = new Controller()

export default (app, passport) => {
  // Oauth
  app.post('/oauth/init', OAuth.initOAuth)
  app.get('/oauth/callback/from/:provider', OAuth.providerCallback)
  app.post('/oauth/login', OAuth.loginOAuth)
}
