import model from "../controllers/model";

export default (app) => {

/**********************************************
 *                                            *
 *             ANONYMOUS ROUTES               *
 *                                            *
 *********************************************/



/**********************************************
 *                                            *
 *           AUTHENTICATED ROUTES             *
 *                                            *
 *********************************************/

  /* CRUD endpoints */

  app.post('/model', model.create); // Create
  app.get('/model/:handle', model.read); // Read
  app.put('/model/:handle', model.update); // Update
  app.delete('/model/:handle', model.delete); // Delete

  // Clone model
  app.post('/clone/model/:handle', model.clone);
}





