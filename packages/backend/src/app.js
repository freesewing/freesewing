import './env'
import express from 'express'
import mongoose from 'mongoose'
import config from './config/index'
import chalk from 'chalk'
import passport from 'passport'
import verifyConfig from './config/verify'
import expressMiddleware from './middleware/express'
import passportMiddleware from './middleware/passport'
import routes from './routes'
import path from 'path'
import fs from 'fs'

export const connectToDb = () => {
  // Connecting to the database
  mongoose.Promise = global.Promise
  mongoose
    .connect(config.db.uri, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log(chalk.green('Successfully connected to the database'))
    })
    .catch((err) => {
      console.log(chalk.red('Could not connect to the database. Exiting now...'), err)
      process.exit()
    })
};

export const startApp = () => {
  // Verify configuration
  verifyConfig(config, chalk)

  // Start Express
  const app = express()

  // Load Express middleware
  for (let type of Object.keys(expressMiddleware)) expressMiddleware[type](app)

  // Load Passport middleware
  for (let type of Object.keys(passportMiddleware)) passportMiddleware[type](passport)

  // Load routes
  for (let type of Object.keys(routes)) routes[type](app, passport)

  // Catch-all route (Load index.html once instead of at every request)
  const index = fs.readFileSync(path.resolve(__dirname, 'landing', 'index.html'))
  app.get('/', async (req, res) => res
    .set('Content-Type', 'text/html')
    .status(200)
    .send(index)
  )

  const port = process.env.PORT || 3000

  app.listen(port, (err) => {
    if (err) console.error(chalk.red('Error occured'), err)
    if (process.env.NODE_ENV === 'development') console.log(chalk.yellow('> in development'))
    console.log(chalk.green(`> listening on port ${port}`))
  })

  return app;
};

