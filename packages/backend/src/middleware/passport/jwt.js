import jwt from 'passport-jwt'
import config from '../../config'

const options = {
  jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  ...config.jwt
}

export default passport => {
  passport.use(
    new jwt.Strategy(options, (jwt_payload, done) => {
      return done(null, jwt_payload)
    })
  )
}
