// Dependencies
import express from 'express'
import chalk from 'chalk'
import { PrismaClient } from '@prisma/client'
import passport from 'passport'
import path from 'node:path'
import { fileURLToPath } from 'url'
// Routes
import { routes } from './routes/index.mjs'
// Config
import { verifyConfig } from './config.mjs'
// Middleware
import { loadExpressMiddleware, loadPassportMiddleware } from './middleware.mjs'
// Encryption
import { encryption } from './utils/crypto.mjs'
// Multi-Factor Authentication (MFA)
import { mfa } from './utils/mfa.mjs'
// OIDC Provider
import { loadOidcProvider } from './utils/oidc-provider.mjs'
// Role-Based Access Control (RBAC)
import { rbac } from './utils/rbac.mjs'
// Email
import { mailer } from './utils/email.mjs'
// Swagger
import swaggerUi from 'swagger-ui-express'
import { openapi } from '../openapi/index.mjs'
// Catch-all page
import { html as catchAll } from './html/catch-all.mjs'

// Bootstrap
const config = verifyConfig()
const prisma = new PrismaClient()
const app = express()
app.use(express.json({ limit: '12mb' })) // Required for img upload
app.use(express.urlencoded({ extended: false })) // Form submission for OIDC
app.use(express.static('public'))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi))

const tools = {
  app,
  passport,
  prisma,
  ...encryption(config.encryption.key),
  ...mfa(config.mfa),
  ...mailer(config),
  ...rbac(config.roles),
  config,
}

// Load middleware
loadExpressMiddleware(app)
loadPassportMiddleware(passport, tools)

// Load routes
for (const type in routes) routes[type](tools)

// Load OIDC provider
loadOidcProvider(tools)

app.get('/', async (req, res) => res.set('Content-Type', 'text/html').status(200).send(catchAll))

// Start listening for requests
app.listen(config.port, (err) => {
  if (err) console.error(chalk.red('Error occured'), err)
  if (process.env.NODE_ENV === 'development') console.log(chalk.yellow('> in development'))
  console.log(chalk.green(`🚀  REST API ready, listening on ${config.api}`))
})
