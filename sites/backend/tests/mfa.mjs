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
    })
  }

  describe(`${store.icon('mfa')} Multi-Factor Authentication (MFA) login flow`, () => {
    it(`${store.icon('mfa')} Should not login with username/password only`, (done) => {
      chai
        .request(config.api)
        .post('/login')
        .send({
          username: store.account.username,
          password: store.account.password,
        })
        .end((err, res) => {
          expect(err === null).to.equal(true)
          expect(res.status).to.equal(200)
          expect(res.body.result).to.equal('success')
          expect(res.body.note).to.equal('mfaTokenRequired')
          done()
        })
    })
  })
}
