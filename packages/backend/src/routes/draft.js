import Controller from "../controllers/draft";

const Draft = new Controller();

export default (app, passport) => {

/**********************************************
 *                                            *
 *             ANONYMOUS ROUTES               *
 *                                            *
 *********************************************/

  // Load shared draft/gist
  app.get('/gist/:handle', Draft.readGist);


/**********************************************
 *                                            *
 *           AUTHENTICATED ROUTES             *
 *                                            *
 *********************************************/

  /* CRUD endpoints */

  app.post('/draft', passport.authenticate('jwt', { session: false }), Draft.create); // Create
  app.get('/draft/:handle', passport.authenticate('jwt', { session: false }), Draft.read); // Read
  app.put('/draft/:handle', passport.authenticate('jwt', { session: false }), Draft.update); // Update
  app.delete('/draft/:handle', passport.authenticate('jwt', { session: false }), Draft.delete); // Delete

  // Delete multiple
  app.post(
    '/remove/drafts',
    passport.authenticate('jwt', {session: false }),
    Draft.deleteMultiple
  );
}





