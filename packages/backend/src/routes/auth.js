import Controller from "../controllers/auth";

const Auth = new Controller();

export default (app, passport) => {

  // Init Oauth
  app.post(
    "/oauth/init",
    Auth.initOauth
  );

  // Login after Oauth
  app.post(
    '/oauth/login',
    Auth.loginOauth
  );


  // Signup via Github
  app.get(
    "/signup/with/github",
    passport.authenticate('github', { failureRedirect: "/signup" }),
    function(req, res) {}
  );

  // Signup callback from Github
  app.get(
    '/callback/from/github',
    Auth.callbackFromGithub
  );

}
