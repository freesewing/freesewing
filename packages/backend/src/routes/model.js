import Controller from "../controllers/model";

const Model = new Controller();

export default (app, passport) => {
  /* CRUD endpoints */
  app.post(
    '/model',
    passport.authenticate('jwt', {session: false }),
    Model.create
  ); // Create
  app.get('/model/:handle', Model.read); // Read
  app.put(
    '/model/:handle',
    passport.authenticate('jwt', {session: false }),
    Model.update
  ); // Update
  app.delete(
    '/model/:handle',
    passport.authenticate('jwt', { session: false }),
    Model.delete
  ); // Delete

  // Delete multiple
  app.post(
    '/remove/models',
    passport.authenticate('jwt', {session: false }),
    Model.deleteMultiple
  );

  // Clone model
  app.post('/clone/model/:handle', Model.clone);
}





