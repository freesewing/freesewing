import { OidcController } from '../controllers/oidc.mjs'

const Oidc = new OidcController()

export function oidcRoutes(tools) {
  const { app } = tools

  // OIDC flow
  app.get('/interaction/:uid', (req, res) => Oidc.init(req, res, tools))

  // OIDC login
  app.post('/interaction/:uid/login', (req, res) => Oidc.login(req, res, tools))
}
