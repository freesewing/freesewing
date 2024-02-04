import { InfoController } from '../controllers/info.mjs'

const Info = new InfoController()

export function infoRoutes(tools) {
  const { app } = tools

  // List statistics
  app.get('/info/stats', (req, res) => Info.getStats(req, res, tools))

  // List user count
  app.get('/info/users', (req, res) => Info.getUserCount(req, res, tools))
}
