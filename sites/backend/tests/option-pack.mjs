import { cat } from './cat.mjs'
import { capitalize } from '../src/utils/index.mjs'

export const optionPackTests = async (chai, config, expect, store) => {
  const data = {
    jwt: {
      test: true,
      design: 'aaron',
      nameDe: 'Aaron options A',
      nameEn: 'Aaron options A',
      nameEs: 'Aaron options A',
      nameFr: 'Aaron options A',
      nameNl: 'Aaron options A',
      nameUk: 'Aaron options A',
      notesDe: 'Aaron notes A',
      notesEn: 'Aaron notes A',
      notesEs: 'Aaron notes A',
      notesFr: 'Aaron notes A',
      notesNl: 'Aaron notes A',
      notesUk: 'Aaron notes A',
      tagsDe: ['tagA', 'tagB'],
      tagsEn: ['tagA', 'tagB'],
      tagsEs: ['tagA', 'tagB'],
      tagsFr: ['tagA', 'tagB'],
      tagsNl: ['tagA', 'tagB'],
      tagsUk: ['tagA', 'tagB'],
      options: {
        backlineBend: 0.666,
        necklineBend: 0.8,
        necklineDrop: 0.33,
      },
    },
    key: {
      test: true,
      design: 'aaron',
      nameDe: 'Aaron options B',
      nameEn: 'Aaron options B',
      nameEs: 'Aaron options B',
      nameFr: 'Aaron options B',
      nameNl: 'Aaron options B',
      nameUk: 'Aaron options B',
      notesDe: 'Aaron notes B',
      notesEn: 'Aaron notes B',
      notesEs: 'Aaron notes B',
      notesFr: 'Aaron notes B',
      notesNl: 'Aaron notes B',
      notesUk: 'Aaron notes B',
      tagsDe: ['tagA', 'tagB'],
      tagsEn: ['tagA', 'tagB'],
      tagsEs: ['tagA', 'tagB'],
      tagsFr: ['tagA', 'tagB'],
      tagsNl: ['tagA', 'tagB'],
      tagsUk: ['tagA', 'tagB'],
      options: {
        backlineBend: 0.444,
        necklineBend: 0.7,
        necklineDrop: 0.4,
      },
      img: cat,
    },
  }
  store.apack = {
    jwt: {},
    key: {},
  }
  store.bpack = {
    jwt: {},
    key: {},
  }

  const auths = ['jwt', 'key']

  for (const auth of auths) {
    describe(`${store.icon('opack', auth)} Option pack tests (${auth})`, () => {
      it(`${store.icon('opack', auth)} Should create a new option pack (${auth})`, (done) => {
        chai
          .request(config.api)
          .post(`/option-packs/${auth}`)
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
            expect(res.body.result).to.equal(`created`)
            for (const [key, val] of Object.entries(data[auth])) {
              if (!['options', 'img', 'test'].includes(key)) {
                expect(JSON.stringify(res.body.optionPack[key])).to.equal(JSON.stringify(val))
              }
            }
            store.apack[auth] = res.body.optionPack
            done()
          })
      }).timeout(5000)

      for (const field of ['name', 'notes']) {
        for (const lang of config.languages) {
          const langField = field + capitalize(lang)
          it(`${store.icon(
            'opack',
            auth
          )} Should update the ${langField} field (${auth})`, (done) => {
            const data = {}
            const val = store.apack[auth][langField] + '_updated'
            data[langField] = val
            chai
              .request(config.api)
              .patch(`/option-packs/${store.apack[auth].id}/${auth}`)
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
                expect(res.body.optionPack[langField]).to.equal(val)
                done()
              })
          })
        }
      }

      for (const field of ['backlineBend', 'necklineBend', 'necklineDrop']) {
        it(`${store.icon('opack', auth)} Should update the ${field} option (${auth})`, (done) => {
          const data = { options: {} }
          const val = Math.random()
          data.options[field] = val
          chai
            .request(config.api)
            .patch(`/option-packs/${store.apack[auth].id}/${auth}`)
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
              expect(res.body.optionPack.options[field]).to.equal(val)
              done()
            })
        })
      }

      it(`${store.icon('opack', auth)} Should clear an option (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/option-packs/${store.apack[auth].id}/${auth}`)
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
            options: {
              necklineDrop: null,
            },
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(typeof res.body.optionPack.options.necklineDrop).to.equal('undefined')
            done()
          })
      })

      it(`${store.icon('opack', auth)} Should suggest an option pack (${auth})`, (done) => {
        chai
          .request(config.api)
          .post(`/option-packs/suggest/${auth}`)
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
            design: 'aaron',
            notes: 'These are the notes',
            options: {
              foo: 'bar',
            },
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(typeof res.body.error).to.equal(`undefined`)
            expect(typeof res.body.submission).to.equal(`object`)
            expect(res.body.submission.type).to.equal('opack')
            expect(typeof res.body.submission.id).to.equal('string')
            done()
          })
      })
    })
  }

  // Unauthenticated tests
  describe(`${store.icon('opack')} Option pack tests (unauthenticated)`, () => {
    for (const auth of auths) {
      it(`${store.icon('opack')} Should read an option pack created with ${auth}`, (done) => {
        chai
          .request(config.api)
          .get(`/option-packs/${store.apack[auth].id}`)
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(typeof res.body.optionPack.options).to.equal('object')
            done()
          })
      })

      it(`${store.icon(
        'opack'
      )} Should read an option pack created with ${auth} as JSON`, (done) => {
        chai
          .request(config.api)
          .get(`/option-packs/${store.apack[auth].id}.json`)
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(typeof res.body.options).to.equal('object')
            done()
          })
      })

      it(`${store.icon(
        'opack'
      )} Should read an option pack created with ${auth} as YAML`, (done) => {
        chai
          .request(config.api)
          .get(`/option-packs/${store.apack[auth].id}.yaml`)
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.text).to.include('FreeSewing')
            done()
          })
      })

      it(`${store.icon('opack')} Should retrieve a list of option packs`, (done) => {
        chai
          .request(config.api)
          .get(`/option-packs`)
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal('success')
            done()
          })
      })

      it(`${store.icon('opack')} Should retrieve a list of option packs as JSON`, (done) => {
        chai
          .request(config.api)
          .get(`/option-packs.json`)
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            done()
          })
      })

      it(`${store.icon('opack')} Should retrieve a list of options packs as YAML`, (done) => {
        chai
          .request(config.api)
          .get(`/option-packs.yaml`)
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            done()
          })
      })
    }
  })

  for (const auth of auths) {
    describe(`${store.icon('opack', auth)} Option pack removal tests (${auth})`, () => {
      it(`${store.icon('opack', auth)} Should remove an option pack (${auth})`, (done) => {
        chai
          .request(config.api)
          .delete(`/option-packs/${store.apack[auth].id}/${auth}`)
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
            expect(res.status).to.equal(204)
            done()
          })
      }).timeout(5000)
    })
  }
}
