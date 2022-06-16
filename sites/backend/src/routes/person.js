import Controller from '../controllers/person'

const Person = new Controller()

export default (app, passport) => {
  app.post('/people', passport.authenticate('jwt', { session: false }), Person.create) // Create
  app.get('/people/:handle', passport.authenticate('jwt', { session: false }), Person.read) // Read
  app.put('/people/:handle', passport.authenticate('jwt', { session: false }), Person.update) // Update
  app.delete('/people/:handle', passport.authenticate('jwt', { session: false }), Person.delete) // Delete
}
