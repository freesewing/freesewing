export const userTests = async (config, store, chai) => {
  const expect = chai.expect
  const icon = '🧑'

  describe(`${icon} Signup flow and authentication`, async function () {
    it(`${icon} Should return 400 on signup without body`, function (done) {
      this.store = store
      chai
        .request(config.api)
        .post('/signup')
        .send()
        .end((err, res) => {
          expect(err === null).to.equal(true)
          expect(res.status).to.equal(400)
          expect(res.body.result).to.equal(`error`)
          expect(res.body.error).to.equal(`postBodyMissing`)
          done()
        })
    })

    const fields = {
      email: 'test@freesewing.dev',
      password: 'test',
      language: 'fr',
    }
    Object.keys(fields).map((key) => {
      it(`${icon} Should not allow signup without ${key}`, (done) => {
        chai
          .request(config.api)
          .post('/signup')
          .send(
            Object.fromEntries(
              Object.keys(fields)
                .filter((name) => name !== key)
                .map((name) => [name, fields[name]])
            )
          )
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(400)
            expect(res.type).to.equal('application/json')
            expect(res.charset).to.equal('utf-8')
            expect(res.body.result).to.equal(`error`)
            expect(res.body.error).to.equal(`${key}Missing`)
            done()
          })
      })
    })

    step(`${icon} Should fail to signup an existing email address`, (done) => {
      chai
        .request(config.api)
        .post('/signup')
        .send(fields)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          expect(res.body.result).to.equal(`error`)
          expect(res.body.error).to.equal('emailExists')
          done()
        })
    })

    step(`${icon} Should not login with the wrong password`, (done) => {
      chai
        .request(config.api)
        .post('/login')
        .send({
          username: store.account.username,
          password: store.account.username,
        })
        .end((err, res) => {
          expect(res.status).to.equal(401)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          expect(res.body.result).to.equal(`error`)
          expect(res.body.error).to.equal(`loginFailed`)
          done()
        })
    })

    step(`${icon} Should login with username and password`, (done) => {
      chai
        .request(config.api)
        .post('/login')
        .send({
          username: store.account.username,
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
          expect(typeof res.body.token).to.equal(`string`)
          expect(typeof res.body.account.id).to.equal(`number`)
          store.token = res.body.token
          done()
        })
    })

    step(`${icon} Should login with USERNAME and password`, (done) => {
      chai
        .request(config.api)
        .post('/login')
        .send({
          username: store.account.username.toUpperCase(),
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
          expect(typeof res.body.token).to.equal(`string`)
          expect(typeof res.body.account.id).to.equal(`number`)
          store.token = res.body.token
          done()
        })
    })

    step(`${icon} Should login with email and password`, (done) => {
      chai
        .request(config.api)
        .post('/login')
        .send({
          username: store.account.email,
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
          expect(typeof res.body.token).to.equal(`string`)
          expect(typeof res.body.account.id).to.equal(`number`)
          store.token = res.body.token
          done()
        })
    })

    step(`${icon} Should login with EMAIL and password`, (done) => {
      chai
        .request(config.api)
        .post('/login')
        .send({
          username: store.account.email.toUpperCase(),
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
          expect(typeof res.body.token).to.equal(`string`)
          expect(typeof res.body.account.id).to.equal(`number`)
          store.token = res.body.token
          done()
        })
    })

    step(`${icon} Should login with userid and password`, (done) => {
      chai
        .request(config.api)
        .post('/login')
        .send({
          username: store.account.userid,
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
          expect(typeof res.body.token).to.equal(`string`)
          expect(typeof res.body.account.id).to.equal(`number`)
          store.token = res.body.token
          done()
        })
    })

    step(`${icon} Should load account with JWT`, (done) => {
      chai
        .request(config.api)
        .get('/account/jwt')
        .set('Authorization', 'Bearer ' + store.token)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          expect(res.body.result).to.equal(`success`)
          expect(res.body.account.email).to.equal(store.account.email)
          expect(res.body.account.username).to.equal(store.account.username)
          expect(res.body.account.lusername).to.equal(store.account.username.toLowerCase())
          expect(typeof res.body.account.id).to.equal(`number`)
          done()
        })
    })

    step(`${icon} Should load account with JWT (whoami)`, (done) => {
      chai
        .request(config.api)
        .get('/whoami/jwt')
        .set('Authorization', 'Bearer ' + store.token)
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          expect(res.body.result).to.equal(`success`)
          expect(res.body.account.email).to.equal(store.account.email)
          expect(res.body.account.username).to.equal(store.account.username)
          expect(res.body.account.lusername).to.equal(store.account.username.toLowerCase())
          expect(typeof res.body.account.id).to.equal(`number`)
          done()
        })
    })
  })
}
