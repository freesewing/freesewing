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

  // Upload an image
  app.post('/images/jwt', passport.authenticate(...jwt), (req, res) =>
    Flow.uploadImage(req, res, tools)
  )
  app.post('/images/key', passport.authenticate(...bsc), (req, res) =>
    Flow.uploadImage(req, res, tools)
  )

  // Upload an image - anonymous route for support requests
  app.post('/images', (req, res) => Flow.uploadImage(req, res, tools, true))

  // Remove an image
  app.delete('/images/:id/jwt', passport.authenticate(...jwt), (req, res) =>
    Flow.removeImage(req, res, tools)
  )
  app.delete('/images/:id/key', passport.authenticate(...bsc), (req, res) =>
    Flow.removeImage(req, res, tools)
  )

  // Submit a pull request for a new showcase or blog post
  for (const type of ['blog', 'showcase']) {
    app.post(`/flows/pr/${type}/jwt`, passport.authenticate(...jwt), (req, res) =>
      Flow.createPostPr(req, res, tools, type)
    )
    app.post(`/flows/pr/${type}/key`, passport.authenticate(...bsc), (req, res) =>
      Flow.createPostPr(req, res, tools, type)
    )
  }

  // Create Issue - No auth needed
  app.post('/issues', (req, res) => Flow.createIssue(req, res, tools))

  // Create Discussion - No auth needed
  app.post('/discussions', (req, res) => Flow.createDiscussion(req, res, tools))

  // See if a showcase or blog slug is available
  for (const type of ['showcase', 'blog']) {
    app.get(`/slugs/${type}/:slug/jwt`, passport.authenticate(...jwt), (req, res) =>
      Flow.isSlugAvailable(req, res, tools, type)
    )
    app.get(`/slugs/${type}/:slug/key`, passport.authenticate(...bsc), (req, res) =>
      Flow.isSlugAvailable(req, res, tools, type)
    )
  }
}
