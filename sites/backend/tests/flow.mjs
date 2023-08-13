import { cat } from './cat.mjs'
import { capitalize } from '../src/utils/index.mjs'

export const flowTests = async (chai, config, expect, store) => {
  const auths = ['jwt', 'key']

  for (const auth of auths) {
    describe(`${store.icon('flow', auth)} Flow tests (${auth})`, () => {
      it(`${store.icon('set', auth)} Should request a translator invite (${auth})`, (done) => {
        chai
          .request(config.api)
          .post(`/flows/translator-invite/${auth}`)
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
            language: 'nl',
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            done()
          })
      })

      it(`${store.icon('set', auth)} Should suggest a new language (${auth})`, (done) => {
        chai
          .request(config.api)
          .post(`/flows/language-suggestion/${auth}`)
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
            language: 'cn',
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
