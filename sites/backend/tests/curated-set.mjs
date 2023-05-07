import { cat } from './cat.mjs'
import { capitalize } from '../src/utils/index.mjs'

export const curatedSetTests = async (chai, config, expect, store) => {
  const data = {
    jwt: {
      nameDe: 'Beispielmessungen A',
      nameEn: 'Example measurements A',
      nameEs: 'Medidas de ejemplo A',
      nameFr: 'Mesures exemple A',
      nameNl: 'Voorbeel maten  A',
      notesDe: 'Das sind die Notizen A',
      notesEn: 'These are the notes A',
      notesEs: 'Estas son las notas A',
      notesFr: 'Ce sont les notes A',
      notesNl: 'Dit zijn de notities A',
      measies: {
        chest: 1000,
        neck: 420,
      },
    },
    key: {
      nameDe: 'Beispielmessungen B',
      nameEn: 'Example measurements B',
      nameEs: 'Medidas de ejemplo B',
      nameFr: 'Mesures exemple B',
      nameNl: 'Voorbeel maten B',
      notesDe: 'Das sind die Notizen B',
      notesEn: 'These are the notes B',
      notesEs: 'Estas son las notas B',
      notesFr: 'Ce sont les notes B',
      notesNl: 'Dit zijn de notities B',
      measies: {
        chest: 930,
        neck: 360,
      },
      img: cat,
    },
  }
  store.curatedSet = {
    jwt: {},
    key: {},
  }
  store.altset = {
    jwt: {},
    key: {},
  }

  for (const auth of ['jwt', 'key']) {
    describe(`${store.icon('set', auth)} Curated set tests (${auth})`, () => {
      it(`${store.icon('set', auth)} Should create a new curated set (${auth})`, (done) => {
        chai
          .request(config.api)
          .post(`/curated-sets/${auth}`)
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
              if (!['measies', 'img'].includes(key)) expect(res.body.curatedSet[key]).to.equal(val)
            }
            store.curatedSet[auth] = res.body.curatedSet
            done()
          })
      }).timeout(5000)

      for (const field of ['name', 'notes']) {
        for (const lang of config.languages) {
          const langField = field + capitalize(lang)
          it(`${store.icon(
            'set',
            auth
          )} Should update the ${langField} field (${auth})`, (done) => {
            const data = {}
            const val = store.curatedSet[auth][langField] + '_updated'
            data[langField] = val
            chai
              .request(config.api)
              .patch(`/curated-sets/${store.curatedSet[auth].id}/${auth}`)
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
                expect(res.body.set[langField]).to.equal(val)
                done()
              })
          })
        }
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
            .patch(`/curated-sets/${store.curatedSet[auth].id}/${auth}`)
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
          .patch(`/curated-sets/${store.curatedSet[auth].id}/${auth}`)
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
          .patch(`/curated-sets/${store.curatedSet[auth].id}/${auth}`)
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

      it(`${store.icon('set', auth)} Should clone a set (${auth})`, (done) => {
        chai
          .request(config.api)
          .post(`/curated-sets/${store.curatedSet[auth].id}/clone/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.account.token
              : 'Basic ' +
                  new Buffer(`${store.account.apikey.key}:${store.account.apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send({ language: 'nl' })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(201)
            expect(res.body.result).to.equal(`success`)
            expect(typeof res.body.error).to.equal(`undefined`)
            expect(typeof res.body.set.id).to.equal(`number`)
            expect(res.body.set.name).to.equal(store.curatedSet[auth].nameNl + '_updated')
            expect(res.body.set.notes).to.equal(store.curatedSet[auth].notesNl + '_updated')
            done()
          })
      })
    })
  }

  // Unauthenticated tests
  describe(`${store.icon('set')} Curated set tests (unauthenticated)`, () => {
    for (const auth of ['jwt', 'key']) {
      it(`${store.icon('set')} Should read a curated set created with ${auth}`, (done) => {
        chai
          .request(config.api)
          .get(`/curated-sets/${store.curatedSet[auth].id}`)
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(typeof res.body.curatedSet.measies).to.equal('object')
            done()
          })
      })

      it(`${store.icon('set')} Should read a curated set created with ${auth} as JSON`, (done) => {
        chai
          .request(config.api)
          .get(`/curated-sets/${store.curatedSet[auth].id}.json`)
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(typeof res.body.measurements).to.equal('object')
            done()
          })
      })

      it(`${store.icon('set')} Should read a curated set created with ${auth} as YAML`, (done) => {
        chai
          .request(config.api)
          .get(`/curated-sets/${store.curatedSet[auth].id}.yaml`)
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.text).to.include('FreeSewing')
            done()
          })
      })

      it(`${store.icon('set')} Should retrieve a list of curated sets`, (done) => {
        chai
          .request(config.api)
          .get(`/curated-sets`)
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal('success')
            done()
          })
      })

      it(`${store.icon('set')} Should retrieve a list of curated sets as JSON`, (done) => {
        chai
          .request(config.api)
          .get(`/curated-sets.json`)
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            done()
          })
      })

      it(`${store.icon('set')} Should retrieve a list of curated sets as YAML`, (done) => {
        chai
          .request(config.api)
          .get(`/curated-sets.yaml`)
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            done()
          })
      })
    }
  })
  //console.log(`/curated-sets/${store.curatedSet[auth].id}/${auth}`)
  //console.log({body: res.body, status: res.status})

  // TODO:
  // - Delete Curated set
}
