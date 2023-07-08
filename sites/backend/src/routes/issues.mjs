import { IssuesController } from '../controllers/issues.mjs'

const Issues = new IssuesController()

export function issuesRoutes(tools) {
  const { app } = tools

  // Create Issue - No auth needed
  app.post('/issues', (req, res) => Issues.create(req, res, tools))
}
