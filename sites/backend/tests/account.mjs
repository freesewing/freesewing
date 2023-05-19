import { cat } from './cat.mjs'

export const accountTests = async (chai, config, expect, store) => {
  const data = {
    jwt: {
      bio: "I know it sounds funny but I just can't stand the pain",
      consent: 1,
      control: 4,
      github: 'sorchanidhubhghaill',
      imperial: true,
      language: 'es',
      newsletter: true,
    },
    key: {
      bio: "It's a long way to the top, if you wanna rock & roll",
      consent: 2,
      control: 3,
      github: 'joostdecock',
      imperial: true,
      language: 'de',
      newsletter: true,
    },
  }

  for (const auth in data) {
    describe(`${store.icon('user', auth)} Update account data (${auth})`, async function () {
      for (const [field, val] of Object.entries(data[auth])) {
        it(`${store.icon('user', auth)} Should update ${field} (${auth})`, (done) => {
          const body = {}
          body[field] = val
          chai
            .request(config.api)
            .patch(`/account/${auth}`)
            .set(
              'Authorization',
              auth === 'jwt'
                ? 'Bearer ' + store.account.token
                : 'Basic ' +
                    new Buffer(
                      `${store.account.apikey.key}:${store.account.apikey.secret}`
                    ).toString('base64')
            )
            .send(body)
            .end((err, res) => {
              expect(err === null).to.equal(true)
              expect(res.status).to.equal(200)
              expect(res.body.result).to.equal(`success`)
              expect(res.body.account[field]).to.equal(val)
              done()
            })
        })
      }

      // Update password - Check with sign in
      const password = store.randomString()
      it(`${store.icon('user', auth)} Should update the password (${auth})`, (done) => {
        const body = {}
        chai
          .request(config.api)
          .patch(`/account/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.account.token
              : 'Basic ' +
                  new Buffer(`${store.account.apikey.key}:${store.account.apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({ password })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            done()
          })
      })

      it(`${store.icon(
        'user',
        auth
      )} Should be able to sign in with the updated password (${auth})`, (done) => {
        const body = {}
        chai
          .request(config.api)
          .post(`/signin`)
          .send({
            username: store.account.username,
            password,
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            done()
          })
      })

      it(`${store.icon('user', auth)} Better restore the original password (${auth})`, (done) => {
        const body = {}
        chai
          .request(config.api)
          .patch(`/account/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.account.token
              : 'Basic ' +
                  new Buffer(`${store.account.apikey.key}:${store.account.apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({ password: store.account.password })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            done()
          })
      })

      it(`${store.icon(
        'user',
        auth
      )} Should be able to sign in with the original password (${auth})`, (done) => {
        const body = {}
        chai
          .request(config.api)
          .post(`/signin`)
          .send({
            username: store.account.username,
            password: store.account.password,
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            done()
          })
      })

      // Update username - Should also update lusername
      const username = store.randomString().toUpperCase()
      it(`${store.icon('user', auth)} Update username (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/account/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.account.token
              : 'Basic ' +
                  new Buffer(`${store.account.apikey.key}:${store.account.apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({ username })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(res.body.account.username).to.equal(username)
            expect(res.body.account.lusername).to.equal(username.toLowerCase())
            done()
          })
      })

      it(`${store.icon('user', auth)} Restore original username (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/account/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.account.token
              : 'Basic ' +
                  new Buffer(`${store.account.apikey.key}:${store.account.apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({ username: store.account.username })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(res.body.account.username).to.equal(store.account.username)
            expect(res.body.account.lusername).to.equal(store.account.username.toLowerCase())
            done()
          })
      })

      if (store.config.tests.includeSanity) {
        it(`${store.icon('user', auth)} Should update the account img (${auth})`, (done) => {
          chai
            .request(config.api)
            .patch(`/account/${auth}`)
            .set(
              'Authorization',
              auth === 'jwt'
                ? 'Bearer ' + store.account.token
                : 'Basic ' +
                    new Buffer(
                      `${store.account.apikey.key}:${store.account.apikey.secret}`
                    ).toString('base64')
            )
            .send({ img: cat })
            .end((err, res) => {
              expect(err === null).to.equal(true)
              expect(res.status).to.equal(200)
              expect(res.body.result).to.equal(`success`)
              expect(typeof res.body.account.img).to.equal('string')
              done()
            })
        }).timeout(5000)
      }

      let confirmation
      step(
        `${store.icon('user', auth)} Should update the account email address (${auth})`,
        (done) => {
          chai
            .request(config.api)
            .patch(`/account/${auth}`)
            .set(
              'Authorization',
              auth === 'jwt'
                ? 'Bearer ' + store.account.token
                : 'Basic ' +
                    new Buffer(
                      `${store.account.apikey.key}:${store.account.apikey.secret}`
                    ).toString('base64')
            )
            .send({
              email: `updating_${store.randomString()}@${store.config.tests.domain}`,
              test: true,
            })
            .end((err, res) => {
              expect(err === null).to.equal(true)
              expect(res.status).to.equal(200)
              expect(res.body.result).to.equal(`success`)
              expect(typeof res.body.account.img).to.equal('string')
              confirmation = res.body.confirmation
              done()
            })
        }
      )

      step(`${store.icon('user', auth)} Should confirm the email change (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/account/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.account.token
              : 'Basic ' +
                  new Buffer(`${store.account.apikey.key}:${store.account.apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({
            confirm: 'emailchange',
            confirmation,
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(typeof res.body.account.img).to.equal('string')
            confirmation = res.body.confirmation
            done()
          })
      })

      step(`${store.icon('user', auth)} Restore email address (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/account/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.account.token
              : 'Basic ' +
                  new Buffer(`${store.account.apikey.key}:${store.account.apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({
            email: store.account.email,
            test: true,
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(typeof res.body.account.img).to.equal('string')
            confirmation = res.body.confirmation
            done()
          })
      })

      step(
        `${store.icon('user', auth)} Should confirm the (restore) email change (${auth})`,
        (done) => {
          chai
            .request(config.api)
            .patch(`/account/${auth}`)
            .set(
              'Authorization',
              auth === 'jwt'
                ? 'Bearer ' + store.account.token
                : 'Basic ' +
                    new Buffer(
                      `${store.account.apikey.key}:${store.account.apikey.secret}`
                    ).toString('base64')
            )
            .send({
              confirm: 'emailchange',
              confirmation,
            })
            .end((err, res) => {
              expect(err === null).to.equal(true)
              expect(res.status).to.equal(200)
              expect(res.body.result).to.equal(`success`)
              expect(typeof res.body.account.img).to.equal('string')
              confirmation = res.body.confirmation
              done()
            })
        }
      )
    })
  }
}
