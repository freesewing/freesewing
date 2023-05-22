import { authenticator } from '@otplib/preset-default'

export const mfaTests = async (chai, config, expect, store) => {
  const secret = {
    jwt: store.account,
    key: store.altaccount,
  }

  for (const auth in secret) {
    describe(`${store.icon('mfa', auth)} Setup Multi-Factor Authentication (MFA) (${auth})`, () => {
      it(`${store.icon('mfa')} Should return 400 on MFA enable without proper value`, (done) => {
        chai
          .request(config.api)
          .post(`/account/mfa/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + secret[auth].token
              : 'Basic ' +
                  new Buffer(`${secret[auth].apikey.key}:${secret[auth].apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({ mfa: 'yes' })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(400)
            expect(res.body.result).to.equal(`error`)
            expect(res.body.error).to.equal(`invalidMfaSetting`)
            done()
          })
      })

      it(`${store.icon('mfa', auth)} Should return MFA secret and QR code`, (done) => {
        chai
          .request(config.api)
          .post(`/account/mfa/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + secret[auth].token
              : 'Basic ' +
                  new Buffer(`${secret[auth].apikey.key}:${secret[auth].apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({ mfa: true })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(typeof res.body.mfa.secret).to.equal(`string`)
            expect(typeof res.body.mfa.otpauth).to.equal(`string`)
            expect(typeof res.body.mfa.qrcode).to.equal(`string`)
            secret[auth].mfaSecret = res.body.mfa.secret
            done()
          })
      })

      it(`${store.icon('mfa', auth)} Should enable MFA after validating the token`, (done) => {
        chai
          .request(config.api)
          .post(`/account/mfa/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + secret[auth].token
              : 'Basic ' +
                  new Buffer(`${secret[auth].apikey.key}:${secret[auth].apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({
            mfa: true,
            secret: secret[auth].mfaSecret,
            token: authenticator.generate(secret[auth].mfaSecret),
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            done()
          })
      })

      it(`${store.icon('mfa', auth)} Should not request MFA when it's already active`, (done) => {
        chai
          .request(config.api)
          .post(`/account/mfa/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + secret[auth].token
              : 'Basic ' +
                  new Buffer(`${secret[auth].apikey.key}:${secret[auth].apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({ mfa: true })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(400)
            expect(res.body.result).to.equal(`error`)
            expect(res.body.error).to.equal(`mfaActive`)
            done()
          })
      })

      it(`${store.icon('mfa', auth)} Should not enable MFA when it's already active`, (done) => {
        chai
          .request(config.api)
          .post(`/account/mfa/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + secret[auth].token
              : 'Basic ' +
                  new Buffer(`${secret[auth].apikey.key}:${secret[auth].apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({
            mfa: true,
            secret: secret[auth].mfaSecret,
            token: authenticator.generate(secret[auth].mfaSecret),
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(400)
            expect(res.body.result).to.equal(`error`)
            expect(res.body.error).to.equal(`mfaActive`)
            done()
          })
      })

      it(`${store.icon('mfa', auth)} Should not sign in with username/password only`, (done) => {
        chai
          .request(config.api)
          .post('/signin')
          .send({
            username: secret[auth].username,
            password: secret[auth].password,
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(403)
            expect(res.body.result).to.equal('error')
            expect(res.body.error).to.equal('mfaTokenRequired')
            done()
          })
      })

      it(`${store.icon('mfa')} Should sign in with username/password/token`, (done) => {
        chai
          .request(config.api)
          .post('/signin')
          .send({
            username: secret[auth].username,
            password: secret[auth].password,
            token: authenticator.generate(secret[auth].mfaSecret),
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal('success')
            //expect(res.body.account.mfaEnabled).to.equal(true)
            done()
          })
      })

      it(`${store.icon('mfa')} Should not sign in with a wrong token`, (done) => {
        chai
          .request(config.api)
          .post('/signin')
          .send({
            username: secret[auth].username,
            password: secret[auth].password,
            token: '1234',
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(401)
            expect(res.body.result).to.equal('error')
            expect(res.body.error).to.equal('signInFailed')
            done()
          })
      })

      it(`${store.icon('mfa', auth)} Should disable MFA`, (done) => {
        chai
          .request(config.api)
          .post(`/account/mfa/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + secret[auth].token
              : 'Basic ' +
                  new Buffer(`${secret[auth].apikey.key}:${secret[auth].apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({
            mfa: false,
            password: secret[auth].password,
            token: authenticator.generate(secret[auth].mfaSecret),
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            done()
          })
      })
    })
  }
}
