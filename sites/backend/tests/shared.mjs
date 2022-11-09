export const setup = async function (config, store, chai) {
  const expect = chai.expect
  const icon = '🚀'

  // Shared state
  describe(`${icon} Initial setup of user accounts`, async function () {
    step(`${icon} Should signup new user ${store.account.email}`, (done) => {
      chai
        .request(config.api)
        .post('/signup')
        .send({
          email: store.account.email,
          language: store.account.language,
          unittest: true,
        })
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          expect(res.body.result).to.equal(`success`)
          expect(res.body.email).to.equal(store.account.email)
          store.account.confirmation = res.body.confirmation
          done()
        })
    })

    step(`${icon} Should confirm new user (${store.account.email})`, (done) => {
      chai
        .request(config.api)
        .post(`/confirm/signup/${store.account.confirmation}`)
        .send({ consent: 1 })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          expect(res.body.result).to.equal(`success`)
          expect(typeof res.body.token).to.equal(`string`)
          expect(typeof res.body.account.id).to.equal(`number`)
          store.account.token = res.body.token
          store.account.username = res.body.account.username
          store.account.userid = res.body.account.id
          done()
        })
    })

    step(`${icon} Should create API Key`, (done) => {
      chai
        .request(config.api)
        .post('/apikey/jwt')
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
          store.apikey = res.body.apikey
          done()
        })
    })

    step(`${store.icon('user')} Should set the initial password`, (done) => {
      chai
        .request(config.api)
        .put('/account/jwt')
        .set('Authorization', 'Bearer ' + store.account.token)
        .send({
          password: store.account.password,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          expect(res.body.result).to.equal(`success`)
          expect(res.body.account.email).to.equal(store.account.email)
          expect(res.body.account.username).to.equal(store.account.username)
          expect(res.body.account.lusername).to.equal(store.account.username.toLowerCase())
          expect(typeof res.body.account.id).to.equal(`number`)
          store.token = res.body.token
          done()
        })
    })
  })
}

export const teardown = async function (store) {
  console.log(store)
}
