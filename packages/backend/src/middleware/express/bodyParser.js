import bodyParser from 'body-parser'

export default app => {
  app.use(bodyParser.json({ limit: '20mb' }))
  app.use(bodyParser.urlencoded({ extended: true }))
}
