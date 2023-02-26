import { cat } from './cat.mjs'

export const setTests = async (chai, config, expect, store) => {
  const data = {
    jwt: {
      name: 'Joost',
      notes: 'These are them notes',
      measies: {
        chest: 1000,
        neck: 420,
      },
      public: true,
      unittest: true,
      imperial: true,
    },
    key: {
      name: 'Sorcha',
      notes: 'These are also notes',
      measies: {
        chest: 930,
        neck: 360,
      },
      public: false,
      img: cat,
      unittest: true,
      imperial: false,
    },
  }
  store.set = {
    jwt: {},
    key: {},
  }
  store.altset = {
    jwt: {},
    key: {},
  }

  for (const auth of ['jwt', 'key']) {
    describe(`${store.icon('set', auth)} Set tests (${auth})`, () => {
      it(`${store.icon('set', auth)} Should create a new set (${auth})`, (done) => {
        chai
          .request(config.api)
          .post(`/sets/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.account.token
              : 'Basic ' +
                  new Buffer(`${store.account.apikey.key}:${store.account.apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send(data[auth])
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(201)
            expect(res.body.result).to.equal(`success`)
            for (const [key, val] of Object.entries(data[auth])) {
              if (!['measies', 'img', 'unittest'].includes(key))
                expect(res.body.set[key]).to.equal(val)
            }
            store.set[auth] = res.body.set
            done()
          })
      }).timeout(5000)

      for (const field of ['name', 'notes']) {
        it(`${store.icon('set', auth)} Should update the ${field} field (${auth})`, (done) => {
          const data = {}
          const val = store.set[auth][field] + '_updated'
          data[field] = val
          chai
            .request(config.api)
            .patch(`/sets/${store.set[auth].id}/${auth}`)
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
              expect(res.body.set[field]).to.equal(val)
              done()
            })
        })
      }

      for (const field of ['imperial', 'public']) {
        it(`${store.icon('set', auth)} Should update the ${field} field (${auth})`, (done) => {
          const data = {}
          const val = !store.set[auth][field]
          data[field] = val
          chai
            .request(config.api)
            .patch(`/sets/${store.set[auth].id}/${auth}`)
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
              expect(res.body.set[field]).to.equal(val)
              store.set[auth][field] = val
              done()
            })
        })
      }

      for (const field of ['chest', 'neck', 'ankle']) {
        it(`${store.icon(
          'set',
          auth
        )} Should update the ${field} measurement (${auth})`, (done) => {
          const data = { measies: {} }
          const val = Math.ceil(Math.random() * 1000)
          data.measies[field] = val
          chai
            .request(config.api)
            .patch(`/sets/${store.set[auth].id}/${auth}`)
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
              expect(res.body.set.measies[field]).to.equal(val)
              done()
            })
        })
      }

      it(`${store.icon(
        'set',
        auth
      )} Should not set an non-existing measurement (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/sets/${store.set[auth].id}/${auth}`)
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
            measies: {
              ankle: 320,
              potatoe: 12,
            },
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(res.body.set.measies.ankle).to.equal(320)
            expect(typeof res.body.set.measies.potatoe).to.equal('undefined')
            done()
          })
      })

      it(`${store.icon('set', auth)} Should clear a measurement (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/sets/${store.set[auth].id}/${auth}`)
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
            measies: {
              chest: null,
            },
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(typeof res.body.set.measies.chest).to.equal('undefined')
            done()
          })
      })

      it(`${store.icon('set', auth)} Should read a set (${auth})`, (done) => {
        chai
          .request(config.api)
          .get(`/sets/${store.set[auth].id}/${auth}`)
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
            expect(typeof res.body.set.measies).to.equal('object')
            done()
          })
      })

      it(`${store.icon(
        'set',
        auth
      )} Should not allow reading another user's set (${auth})`, (done) => {
        chai
          .request(config.api)
          .get(`/sets/${store.set[auth].id}/${auth}`)
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
        'set',
        auth
      )} Should not allow updating another user's set (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/sets/${store.set[auth].id}/${auth}`)
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
            bio: 'I have been taken over',
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
        'set',
        auth
      )} Should not allow removing another user's set (${auth})`, (done) => {
        chai
          .request(config.api)
          .delete(`/sets/${store.set[auth].id}/${auth}`)
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

      it(`${store.icon('set', auth)} Should clone a set (${auth})`, (done) => {
        chai
          .request(config.api)
          .post(`/sets/${store.set[auth].id}/clone/${auth}`)
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
            expect(typeof res.body.error).to.equal(`undefined`)
            expect(typeof res.body.set.id).to.equal(`number`)
            done()
          })
      })

      it(`${store.icon(
        'set',
        auth
      )} Should (not) clone a public set across accounts (${auth})`, (done) => {
        chai
          .request(config.api)
          .post(`/sets/${store.set[auth].id}/clone/${auth}`)
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
            if (store.set[auth].public) {
              expect(err === null).to.equal(true)
              expect(res.status).to.equal(200)
              expect(res.body.result).to.equal(`success`)
              expect(typeof res.body.error).to.equal(`undefined`)
              expect(typeof res.body.set.id).to.equal(`number`)
            } else {
              expect(err === null).to.equal(true)
              expect(res.status).to.equal(403)
              expect(res.body.result).to.equal(`error`)
              expect(res.body.error).to.equal(`insufficientAccessLevel`)
            }
            done()
          })
      })

      // TODO:
      // - Clone set
      // - Clone set accross accounts of they are public
    })
  }
}
