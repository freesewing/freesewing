import { cat } from './cat.mjs'

export const patternTests = async (chai, config, expect, store) => {
  store.account.patterns = {}
  for (const auth of ['jwt', 'key']) {
    describe(`${store.icon('pattern', auth)} Pattern tests (${auth})`, () => {
      it(`${store.icon('pattern', auth)} Should create a new pattern (${auth})`, (done) => {
        chai
          .request(config.api)
          .post(`/patterns/${auth}`)
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
            test: true,
            design: 'aaron',
            settings: {
              sa: 5,
              measurements: store.account.sets.her.measurements,
            },
            name: 'Just a test',
            notes: 'These are my notes',
            public: true,
            set: store.account.sets.her.id,
            data: {
              some: 'value',
            },
            img: cat,
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(201)
            expect(res.body.result).to.equal(`created`)
            expect(typeof res.body.pattern?.id).to.equal('number')
            expect(res.body.pattern.userId).to.equal(store.account.id)
            expect(res.body.pattern.setId).to.equal(store.account.sets.her.id)
            expect(res.body.pattern.design).to.equal('aaron')
            expect(res.body.pattern.public).to.equal(true)
            store.account.patterns[auth] = res.body.pattern
            done()
          })
      }).timeout(5000)

      for (const field of ['name', 'notes']) {
        it(`${store.icon('pattern', auth)} Should update the ${field} field (${auth})`, (done) => {
          const data = {}
          const val = store.account.patterns[auth][field] + '_updated'
          data[field] = val
          chai
            .request(config.api)
            .patch(`/patterns/${store.account.patterns[auth].id}/${auth}`)
            .set(
              'Authorization',
              auth === 'jwt'
                ? 'Bearer ' + store.account.token
                : 'Basic ' +
                    new Buffer(
                      `${store.account.apikey.key}:${store.account.apikey.secret}`
                    ).toString('base64')
            )
            .send(data)
            .end((err, res) => {
              expect(err === null).to.equal(true)
              expect(res.status).to.equal(200)
              expect(res.body.result).to.equal(`success`)
              expect(res.body.pattern[field]).to.equal(val)
              done()
            })
        })
      }

      it(`${store.icon('pattern', auth)} Should update the public field (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/patterns/${store.account.patterns[auth].id}/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.account.token
              : 'Basic ' +
                  new Buffer(`${store.account.apikey.key}:${store.account.apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({ public: true })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(res.body.pattern.public).to.equal(true)
            done()
          })
      })

      it(`${store.icon('pattern', auth)} Should not update the design field (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/patterns/${store.account.patterns[auth].id}/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.account.token
              : 'Basic ' +
                  new Buffer(`${store.account.apikey.key}:${store.account.apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({ design: 'updated' })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(res.body.pattern.design).to.equal('aaron')
            done()
          })
      })

      it(`${store.icon('pattern', auth)} Should not update the set field (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/patterns/${store.account.patterns[auth].id}/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.account.token
              : 'Basic ' +
                  new Buffer(`${store.account.apikey.key}:${store.account.apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({ set: 1 })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(res.body.pattern.setId).to.equal(store.account.sets.her.id)
            done()
          })
      })

      for (const field of ['data', 'settings']) {
        it(`${store.icon('pattern', auth)} Should update the ${field} field (${auth})`, (done) => {
          const data = {}
          data[field] = { test: { value: 'hello' } }
          chai
            .request(config.api)
            .patch(`/patterns/${store.account.patterns[auth].id}/${auth}`)
            .set(
              'Authorization',
              auth === 'jwt'
                ? 'Bearer ' + store.account.token
                : 'Basic ' +
                    new Buffer(
                      `${store.account.apikey.key}:${store.account.apikey.secret}`
                    ).toString('base64')
            )
            .send(data)
            .end((err, res) => {
              expect(err === null).to.equal(true)
              expect(res.status).to.equal(200)
              expect(res.body.result).to.equal(`success`)
              expect(res.body.pattern[field].test.value).to.equal('hello')
              done()
            })
        })
      }

      it(`${store.icon('pattern', auth)} Should read a pattern (${auth})`, (done) => {
        chai
          .request(config.api)
          .get(`/patterns/${store.account.patterns[auth].id}/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.account.token
              : 'Basic ' +
                  new Buffer(`${store.account.apikey.key}:${store.account.apikey.secret}`).toString(
                    'base64'
                  )
          )
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(res.body.pattern.data.test.value).to.equal('hello')
            done()
          })
      })

      it(`${store.icon(
        'pattern',
        auth
      )} Should not allow reading another user's pattern (${auth})`, (done) => {
        chai
          .request(config.api)
          .get(`/patterns/${store.account.patterns[auth].id}/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.altaccount.token
              : 'Basic ' +
                  new Buffer(
                    `${store.altaccount.apikey.key}:${store.altaccount.apikey.secret}`
                  ).toString('base64')
          )
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(403)
            expect(res.body.result).to.equal(`error`)
            expect(res.body.error).to.equal(`insufficientAccessLevel`)
            done()
          })
      })

      it(`${store.icon(
        'pattern',
        auth
      )} Should not allow updating another user's pattern (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/patterns/${store.account.patterns[auth].id}/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.altaccount.token
              : 'Basic ' +
                  new Buffer(
                    `${store.altaccount.apikey.key}:${store.altaccount.apikey.secret}`
                  ).toString('base64')
          )
          .send({
            name: 'I have been taken over',
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(403)
            expect(res.body.result).to.equal(`error`)
            expect(res.body.error).to.equal(`insufficientAccessLevel`)
            done()
          })
      })

      it(`${store.icon(
        'pattern',
        auth
      )} Should not allow removing another user's pattern (${auth})`, (done) => {
        chai
          .request(config.api)
          .delete(`/patterns/${store.account.patterns[auth].id}/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.altaccount.token
              : 'Basic ' +
                  new Buffer(
                    `${store.altaccount.apikey.key}:${store.altaccount.apikey.secret}`
                  ).toString('base64')
          )
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(403)
            expect(res.body.result).to.equal(`error`)
            expect(res.body.error).to.equal(`insufficientAccessLevel`)
            done()
          })
      })
    })
  }
}
