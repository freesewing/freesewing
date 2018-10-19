import draft from "../controllers/draft";

export default (app) => {

/**********************************************
 *                                            *
 *             ANONYMOUS ROUTES               *
 *                                            *
 *********************************************/

  // Load shared draft
  app.get('/shared/draft/:handle', draft.readShared);


/**********************************************
 *                                            *
 *           AUTHENTICATED ROUTES             *
 *                                            *
 *********************************************/

  /* CRUD endpoints */

  app.post('/draft', draft.create); // Create
  app.get('/draft/:handle', draft.read); // Read
  app.put('/draft/:handle', draft.update); // Update
  app.delete('/draft/:handle', draft.delete); // Delete
}





