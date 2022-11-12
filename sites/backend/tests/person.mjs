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
            .put(`/people/${store.person[auth].id}/${auth}`)
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
          const val = false
          data[field] = val
          chai
            .request(config.api)
            .put(`/people/${store.person[auth].id}/${auth}`)
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
            .put(`/people/${store.person[auth].id}/${auth}`)
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
    })

    // TODO:
    // - Add non-existing measurement
    // - Clear measurement
    // - List/get person
    // - Clone person
    // - Clone person accross accounts of they are public
  }
}
