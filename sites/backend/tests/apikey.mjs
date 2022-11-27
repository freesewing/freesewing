export const apikeyTests = async (chai, config, expect, store) => {
  describe(`${store.icon('key')} API Key create/read/delete`, () => {
    step(`${store.icon('key', 'jwt')} Create API Key (jwt)`, (done) => {
      chai
        .request(config.api)
        .post('/apikeys/jwt')
        .set('Authorization', 'Bearer ' + store.account.token)
        .send({
          name: 'Test API key',
          level: 4,
          expiresIn: 60,
        })
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          expect(res.body.result).to.equal(`created`)
          expect(typeof res.body.apikey.key).to.equal('string')
          expect(typeof res.body.apikey.secret).to.equal('string')
          expect(typeof res.body.apikey.expiresAt).to.equal('string')
          expect(res.body.apikey.level).to.equal(4)
          store.apikey1 = res.body.apikey
          done()
        })
    })

    step(`${store.icon('key', 'key')} Create API Key (key)`, (done) => {
      chai
        .request(config.api)
        .post('/apikeys/key')
        .auth(store.apikey1.key, store.apikey1.secret)
        .send({
          name: 'Test API key with key',
          level: 4,
          expiresIn: 60,
        })
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          expect(res.body.result).to.equal(`created`)
          expect(typeof res.body.apikey.key).to.equal('string')
          expect(typeof res.body.apikey.secret).to.equal('string')
          expect(typeof res.body.apikey.expiresAt).to.equal('string')
          expect(res.body.apikey.level).to.equal(4)
          store.apikey2 = res.body.apikey
          done()
        })
    })

    step(`${store.icon('key', 'key')} Read API key via whoami (key)`, (done) => {
      chai
        .request(config.api)
        .get(`/whoami/key`)
        .auth(store.apikey1.key, store.apikey1.secret)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          expect(res.body.result).to.equal(`success`)
          const checks = ['key', 'level', 'expiresAt', 'name', 'userId']
          checks.forEach((i) => expect(res.body.apikey[i]).to.equal(store.apikey1[i]))
          done()
        })
    })

    step(`${store.icon('key', 'key')} Read API key (key)`, (done) => {
      chai
        .request(config.api)
        .get(`/apikeys/${store.apikey1.key}/key`)
        .auth(store.apikey2.key, store.apikey2.secret)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          expect(res.body.result).to.equal(`success`)
          const checks = ['key', 'level', 'expiresAt', 'name', 'userId']
          checks.forEach((i) => expect(res.body.apikey[i]).to.equal(store.apikey1[i]))
          done()
        })
    })

    step(`${store.icon('key', 'jwt')} Read API key (jwt)`, (done) => {
      chai
        .request(config.api)
        .get(`/apikeys/${store.apikey2.key}/jwt`)
        .set('Authorization', 'Bearer ' + store.account.token)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          expect(res.body.result).to.equal(`success`)
          const checks = ['key', 'level', 'expiresAt', 'name', 'userId']
          checks.forEach((i) => expect(res.body.apikey[i]).to.equal(store.apikey2[i]))
          done()
        })
    })

    step(`${store.icon('key', 'key')} Remove API key (key)`, (done) => {
      chai
        .request(config.api)
        .delete(`/apikeys/${store.apikey2.key}/key`)
        .auth(store.apikey2.key, store.apikey2.secret)
        .end((err, res) => {
          expect(res.status).to.equal(204)
          done()
        })
    })

    step(`${store.icon('key', 'jwt')} Remove API key (jwt)`, (done) => {
      chai
        .request(config.api)
        .delete(`/apikeys/${store.apikey1.key}/jwt`)
        .set('Authorization', 'Bearer ' + store.account.token)
        .end((err, res) => {
          expect(res.status).to.equal(204)
          done()
        })
    })
  })
}
