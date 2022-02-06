import Controller from '../controllers/pattern'

const Pattern = new Controller()

export default (app, passport) => {
  app.get('/patterns/:handle', Pattern.read) // Anomymous read
  app.post('/patterns', passport.authenticate('jwt', { session: false }), Pattern.create) // Create
  app.put('/patterns/:handle', passport.authenticate('jwt', { session: false }), Pattern.update) // Update
  app.delete('/patterns/:handle', passport.authenticate('jwt', { session: false }), Pattern.delete) // Delete
}
