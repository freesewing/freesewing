import Controller from "../controllers/auth";

const Auth = new Controller();

export default (app, passport) => {

  // Init Oauth
  app.post(
    "/oauth/init",
    Auth.initOauth
  );

  // Signup callback from Oauth provider
  app.get(
    '/callback/from/:provider',
    Auth.providerCallback
  );

  // Login after Oauth
  app.post(
    '/oauth/login',
    Auth.loginOauth
  );

}
