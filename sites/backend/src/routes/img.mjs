import { ImgController } from '../controllers/img.mjs'

const Img = new ImgController()

export function imgRoutes(tools) {
  const { app } = tools

  // Generate an image
  app.post('/img', (req, res) => Img.generate(req, res, tools))
}
