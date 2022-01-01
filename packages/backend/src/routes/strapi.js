import Controller from '../controllers/strapi'

const Strapi= new Controller()

export default (app, passport) => {
  // Email subscribe
  app.post('/strapi/maker', (req, res) => Strapi.addPerson(req, res, 'maker'))
  app.post('/strapi/author', (req, res) => Strapi.addPerson(req, res, 'author'))
}
