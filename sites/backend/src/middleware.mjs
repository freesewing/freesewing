import cors from 'cors'
import http from 'passport-http'
import jwt from 'passport-jwt'
import { ApikeyModel } from './models/apikey.mjs'
import { UserModel } from './models/user.mjs'

/*
 * In v2 we ended up with a bug where we did not properly track the last login
 * So in v3 we switch to `lastSeen` and every authenticated API call we update
 * this field. It's a bit of a perf hit to write to the database on ever API call
 * but it's worth it to actually know which accounts are used and which are not.
 */
async function updateLastSeen(uid, tools) {
  const User = new UserModel(tools)
  await User.seen(uid)
}

function loadExpressMiddleware(app) {
  app.use(cors())
}

function loadPassportMiddleware(passport, tools) {
  passport.use(
    new http.BasicStrategy(async (key, secret, done) => {
      const Apikey = new ApikeyModel(tools)
      await Apikey.verify(key, secret)
      /*
       * Update lastSeen field
       */
      if (Apikey.verified) await updateLastSeen(Apikey.record.userId, tools)

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
      async (jwt_payload, done) => {
        /*
         * Update lastSeen field
         */
        await updateLastSeen(jwt_payload._id, tools)

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
