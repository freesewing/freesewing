//import bodyParser from 'body-parser'
import cors from 'cors'
import jwt from 'passport-jwt'

function loadExpressMiddleware(app) {
  // FIXME: Is this still needed in FreeSewing v3?
  //app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())
}

function loadPassportMiddleware(passport, config) {
  passport.use(
    new jwt.Strategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        ...config.jwt,
      },
      (jwt_payload, done) => {
        return done(null, jwt_payload)
      }
    )
  )
}

export { loadExpressMiddleware, loadPassportMiddleware }
