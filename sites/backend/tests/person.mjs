import { cat } from './cat.mjs'

export const personTests = async (chai, config, expect, store) => {
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
  store.person = {
    jwt: {},
    key: {},
  }
  store.altperson = {
    jwt: {},
    key: {},
  }

  for (const auth of ['jwt', 'key']) {
    describe(`${store.icon('person', auth)} Person tests (${auth})`, () => {
      step(`${store.icon('person', auth)} Should create a new person (${auth})`, (done) => {
        chai
          .request(config.api)
          .post(`/people/${auth}`)
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
                expect(res.body.person[key]).to.equal(val)
            }
            store.person[auth] = res.body.person
            done()
          })
      }).timeout(5000)

      for (const field of ['name', 'notes']) {
        it(`${store.icon('person', auth)} Should update the ${field} field (${auth})`, (done) => {
          const data = {}
          const val = store.person[auth][field] + '_updated'
          data[field] = val
          chai
            .request(config.api)
            .patch(`/people/${store.person[auth].id}/${auth}`)
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
              expect(res.body.person[field]).to.equal(val)
              done()
            })
        })
      }

      for (const field of ['imperial', 'public']) {
        it(`${store.icon('person', auth)} Should update the ${field} field (${auth})`, (done) => {
          const data = {}
          const val = !store.person[auth][field]
          data[field] = val
          chai
            .request(config.api)
            .patch(`/people/${store.person[auth].id}/${auth}`)
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
              expect(res.body.person[field]).to.equal(val)
              store.person[auth][field] = val
              done()
            })
        })
      }

      for (const field of ['chest', 'neck', 'ankle']) {
        it(`${store.icon(
          'person',
          auth
        )} Should update the ${field} measurement (${auth})`, (done) => {
          const data = { measies: {} }
          const val = Math.ceil(Math.random() * 1000)
          data.measies[field] = val
          chai
            .request(config.api)
            .patch(`/people/${store.person[auth].id}/${auth}`)
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
              expect(res.body.person.measies[field]).to.equal(val)
              done()
            })
        })
      }

      it(`${store.icon(
        'person',
        auth
      )} Should not set an non-existing measurement (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/people/${store.person[auth].id}/${auth}`)
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
            expect(res.body.person.measies.ankle).to.equal(320)
            expect(typeof res.body.person.measies.potatoe).to.equal('undefined')
            done()
          })
      })

      it(`${store.icon('person', auth)} Should clear a measurement (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/people/${store.person[auth].id}/${auth}`)
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
            expect(typeof res.body.person.measies.chest).to.equal('undefined')
            done()
          })
      })

      it(`${store.icon('person', auth)} Should read a person (${auth})`, (done) => {
        chai
          .request(config.api)
          .get(`/people/${store.person[auth].id}/${auth}`)
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
            expect(typeof res.body.person.measies).to.equal('object')
            done()
          })
      })

      it(`${store.icon(
        'person',
        auth
      )} Should not allow reading another user's person (${auth})`, (done) => {
        chai
          .request(config.api)
          .get(`/people/${store.person[auth].id}/${auth}`)
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
        'person',
        auth
      )} Should not allow updating another user's person (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/people/${store.person[auth].id}/${auth}`)
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
        'person',
        auth
      )} Should not allow removing another user's person (${auth})`, (done) => {
        chai
          .request(config.api)
          .delete(`/people/${store.person[auth].id}/${auth}`)
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

      it(`${store.icon('person', auth)} Should clone a person (${auth})`, (done) => {
        chai
          .request(config.api)
          .post(`/people/${store.person[auth].id}/clone/${auth}`)
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
            expect(typeof res.body.person.id).to.equal(`number`)
            done()
          })
      })

      it(`${store.icon(
        'person',
        auth
      )} Should (not) clone a public person across accounts (${auth})`, (done) => {
        chai
          .request(config.api)
          .post(`/people/${store.person[auth].id}/clone/${auth}`)
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
            if (store.person[auth].public) {
              expect(err === null).to.equal(true)
              expect(res.status).to.equal(200)
              expect(res.body.result).to.equal(`success`)
              expect(typeof res.body.error).to.equal(`undefined`)
              expect(typeof res.body.person.id).to.equal(`number`)
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
      // - Clone person
      // - Clone person accross accounts of they are public
    })
  }
}
