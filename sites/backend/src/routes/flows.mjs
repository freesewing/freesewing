import { FlowsController } from '../controllers/flows.mjs'

const Flow = new FlowsController()
const jwt = ['jwt', { session: false }]
const bsc = ['basic', { session: false }]

export function flowsRoutes(tools) {
  const { app, passport } = tools

  // Send a translator invite
  app.post('/flows/translator-invite/jwt', passport.authenticate(...jwt), (req, res) =>
    Flow.sendTranslatorInvite(req, res, tools)
  )
  app.post('/flows/translator-invite/key', passport.authenticate(...bsc), (req, res) =>
    Flow.sendTranslatorInvite(req, res, tools)
  )

  // Send a language suggestion (to add a new language)
  app.post('/flows/language-suggestion/jwt', passport.authenticate(...jwt), (req, res) =>
    Flow.sendLanguageSuggestion(req, res, tools)
  )
  app.post('/flows/language-suggestion/key', passport.authenticate(...bsc), (req, res) =>
    Flow.sendLanguageSuggestion(req, res, tools)
  )
}
