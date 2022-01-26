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

// Catch-all route
app.get('/', async (req, res) => res.sendFile(path.resolve(__dirname, 'landing', 'index.html')))

const port = process.env.PORT || 3000

app.listen(port, (err) => {
  if (err) console.error(chalk.red('Error occured'), err)
  if (__DEV__) console.log(chalk.yellow('> in development'))
  console.log(chalk.green(`> listening on port ${port}`))
})
const frowns = -1
