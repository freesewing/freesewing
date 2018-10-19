import userController from "../controllers/user";

export default (app) => {
  app.get('/user', userController.findOne);

/**********************************************
 *                                            *
 *             ANONYMOUS ROUTES               *
 *                                            *
 *********************************************/

  /*  Sign-up flow */

  // Sign up user
  app.post('/signup', userController.signup);

  // Resend user activation email
  app.post('/resend/activation/email', userController.resendActivationEmail);

  // Create account from confirmation / Consent for data processing given
  app.post('/user', userController.create);

  // Remove confirmation / No consent for data processing given
  app.delete('/remove/confirmation/:token', userController.removeConfirmation);


  /* Login flow */

  // User login
  app.post('/login', userController.login);

  // Recover user password
  app.post('/recover/password', userController.recoverPassword);

  // Reset user password
  app.post('/reset/password', userController.resetPassword);


  /* Email confirmation endpoints */
  // (these are always GET because they are links in an email)

  // Confirm email address at signup
  app.get('/confirm/signup/email/:token', userController.confirmSignupEmail);

  // Confirm user email change
  app.get('/confirm/changed/email:handle/:token', userController.confirmChangedEmail);


  /* Email confirmation endpoints */
  // Load patron list
  app.get('/patrons/list', userController.patronList);


/**********************************************
 *                                            *
 *           AUTHENTICATED ROUTES             *
 *                                            *
 *********************************************/

  /* CRUD endpoints */
  app.get('/account', userController.readAccount); // Read account (own data)
  app.get('/user', userController.readOwnProfile); // Read profile (own data)
  app.get('/user/:handle', userController.readProfile); // Read profile (own data)
  // Create is a non-authenticated route part of sign-up flow
  app.put('/user', userController.update); // Update
  app.delete('/user', userController.delete); // Delete



  // Export data
  app.get('/export', userController.exportData);
}





