import admin from "../controllers/admin";

export default (app) => {

  // Impersonate user
  app.get('/admin/impersonate/:handle', admin.impersonate);

  /* User cRUD endpoints */
  app.get('/admin/user/{handle}', admin.readUser); // Read
  app.put('/admin/user/{handle}', admin.updateUser); // Update
  app.delete('/admin/user/{handle}', admin.deleteUser); // Delete

  // Find users
  app.get('/admin/find/users/:filter', admin.findUsers);
}





