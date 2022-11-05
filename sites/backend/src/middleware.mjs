//import bodyParser from 'body-parser'
import cors from 'cors'
import http from 'passport-http'
import jwt from 'passport-jwt'
import { ApikeyModel } from './models/apikey.mjs'

function loadExpressMiddleware(app) {
  // FIXME: Is this still needed in FreeSewing v3?
  //app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())
}

function loadPassportMiddleware(passport, tools) {
  passport.use(
    new http.BasicStrategy(async (key, secret, done) => {
      const Apikey = new ApikeyModel(tools)
      await Apikey.verify(key, secret)
      return Apikey.verified ? done(null, { ...Apikey.record, apikey: true }) : done(false)
    })
  )
  passport.use(
    new jwt.Strategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        ...tools.config.jwt,
      },
      (jwt_payload, done) => {
        return done(null, jwt_payload)
      }
    )
  )
}

export { loadExpressMiddleware, loadPassportMiddleware }
