import cors from 'cors'
import http from 'passport-http'
import jwt from 'passport-jwt'
import { ApikeyModel } from './models/apikey.mjs'

function loadExpressMiddleware(app) {
  app.use(cors())
}

function loadPassportMiddleware(passport, tools) {
  passport.use(
    new http.BasicStrategy(async (key, secret, done) => {
      const Apikey = new ApikeyModel(tools)
      await Apikey.verify(key, secret)
      return Apikey.verified
        ? done(null, { ...Apikey.record, apikey: true, uid: Apikey.record.userId })
        : done(false)
    })
  )
  passport.use(
    new jwt.Strategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        ...tools.config.jwt,
      },
      (jwt_payload, done) => {
        return done(null, {
          ...jwt_payload,
          uid: jwt_payload._id,
          level: tools.config.roles.levels[jwt_payload.role] || 0,
        })
      }
    )
  )
}

export { loadExpressMiddleware, loadPassportMiddleware }
