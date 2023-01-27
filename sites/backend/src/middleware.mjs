import cors from 'cors'
import http from 'passport-http'
import jwt from 'passport-jwt'
import { ApikeyModel } from './models/apikey.mjs'

const levelFromRole = (role) => {
  if (role === 'user') return 4
  if (role === 'bughunter') return 5
  if (role === 'support') return 6
  if (role === 'admin') return 8

  return 0
}

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
          level: levelFromRole(jwt_payload.role),
        })
      }
    )
  )
}

export { loadExpressMiddleware, loadPassportMiddleware }
