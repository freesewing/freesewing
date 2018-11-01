import Controller from "../controllers/user";

const User = new Controller();

export default (app, passport) => {
  //app.get('/user', userController.findOne);

/**********************************************
 *                                            *
 *             ANONYMOUS ROUTES               *
 *                                            *
 *********************************************/

  /*  Sign-up flow */

  // Sign up user
  app.post('/signup', User.signup);

  // Create account from confirmation / Consent for data processing given
  app.post('/user', User.create);

  // Remove confirmation / No consent for data processing given
  //app.delete('/remove/confirmation/:token', userController.removeConfirmation);


  /* Login flow */

  // User login
  app.post('/login', User.login);

  // Recover user password
  //app.post('/recover/password', userController.recoverPassword);

  // Reset user password
  //app.post('/reset/password', userController.resetPassword);


  /* Email confirmation endpoints */
  // (these are always GET because they are links in an email)

  // Confirm email address at signup
  //app.get('/confirm/signup/email/:token', userController.confirmSignupEmail);

  // Confirm user email change
  //app.get('/confirm/changed/email:handle/:token', userController.confirmChangedEmail);


  /* Email confirmation endpoints */
  // Load patron list
  //app.get('/patrons/list', userController.patronList);


/**********************************************
 *                                            *
 *           AUTHENTICATED ROUTES             *
 *                                            *
 *********************************************/

  /* CRUD endpoints */
  app.get('/account', passport.authenticate('jwt', { session: false }), User.readAccount); // Read account (own data)
  //app.get('/account', function(req, res,next) {
  //    passport.authenticate('jwt', function(err, user, info) {
  //      console.log('In authenticate callback, arguments should be (err, user, info)', arguments);
  //      return next(res.send({error: err, user: user, info: info}));
  //    })(req, res, next)
  //});

  //app.get('/user', userController.readOwnProfile); // Read profile (own data)
  //app.get('/user/:handle', userController.readProfile); // Read profile (other user's data)
  // Create is a non-authenticated route part of sign-up flow
  //app.put('/user', userController.update); // Update
  //app.delete('/user', userController.delete); // Delete

  // Export data
  //app.get('/export', userController.exportData);
}





