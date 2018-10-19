import comment from "../controllers/comment";

export default (app) => {

/**********************************************
 *                                            *
 *             ANONYMOUS ROUTES               *
 *                                            *
 *********************************************/

  // Webhook: Reply to comment via email
  app.post('/webhook/comment/reply', comment.replyFromEmail);

  // Load page comments
  app.get('/comments/page/:page', comment.pageComments);

  // Load recent comments
  app.get('/comments/recent/:count', comment.recentComments);



/**********************************************
 *                                            *
 *           AUTHENTICATED ROUTES             *
 *                                            *
 *********************************************/

  /* CRUD endpoints */

  app.post('/comment', comment.create); // Create
  app.get('/comment/:id', comment.read); // Read
  app.put('/comment/:id', comment.update); // Update
  app.delete('/comment/:id', comment.delete); // Delete

}
