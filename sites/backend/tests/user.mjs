export const userTests = async (chai, config, expect, store) => {
  describe(`${store.icon('user')} Signup flow and authentication`, () => {
    it(`${store.icon('user')} Should return 400 on signup without body`, (done) => {
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
      language: 'fr',
    }
    Object.keys(fields).forEach((key) => {
      it(`${store.icon('user')} Should not allow signup without ${key}`, (done) => {
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

    /* eslint-disable */
    step(`${store.icon('user')} Should pretend to signup an existing email address`, (done) => {
      chai
        .request(config.api)
        .post('/signup')
        .send(fields)
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          expect(res.body.result).to.equal(`success`)
          expect(res.body.email).to.equal(fields.email)
          done()
        })
    })

    step(`${store.icon('user')} Should not sign in with the wrong password`, (done) => {
      chai
        .request(config.api)
        .post('/signin')
        .send({
          username: store.account.username,
          password: store.account.username,
        })
        .end((err, res) => {
          expect(res.status).to.equal(401)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          expect(res.body.result).to.equal(`error`)
          expect(res.body.error).to.equal(`signInFailed`)
          done()
        })
    })

    // Note that password was not set at account creation
    step(`${store.icon('user')} Should set the password`, (done) => {
      chai
        .request(config.api)
        .patch('/account/jwt')
        .set('Authorization', 'Bearer ' + store.account.token)
        .send({
          password: store.account.password,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          done()
        })
    })
    step(`${store.icon('user')} Should set the password (altaccount)`, (done) => {
      chai
        .request(config.api)
        .patch('/account/jwt')
        .set('Authorization', 'Bearer ' + store.altaccount.token)
        .send({
          password: store.altaccount.password,
        })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          done()
        })
    })

    step(`${store.icon('user')} Should sign in with username and password`, (done) => {
      chai
        .request(config.api)
        .post('/signin')
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

    step(`${store.icon('user')} Should sign in with USERNAME and password`, (done) => {
      chai
        .request(config.api)
        .post('/signin')
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

    step(`${store.icon('user')} Should sign in with email and password`, (done) => {
      chai
        .request(config.api)
        .post('/signin')
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

    step(`${store.icon('user')} Should signin with EMAIL and password`, (done) => {
      chai
        .request(config.api)
        .post('/signin')
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

    step(`${store.icon('user')} Should signin with id and password`, (done) => {
      chai
        .request(config.api)
        .post('/signin')
        .send({
          username: store.account.id,
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

    step(`${store.icon('user', 'jwt')} Should load account (jwt)`, (done) => {
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

    step(`${store.icon('user', 'jwt')} Should load account via whoami (jwt)`, (done) => {
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
  /* eslint-enable */

  describe(`${store.icon('user')} Check for available usernames`, () => {
    it(`${store.icon('user')} Should find a username is available`, (done) => {
      chai
        .request(config.api)
        .post(`/available/username/jwt`)
        .set('Authorization', 'Bearer ' + store.token)
        .send({
          username: 'haochi',
        })
        .end((err, res) => {
          expect(err === null).to.equal(true)
          expect(res.status).to.equal(404)
          done()
        })
    })
    it(`${store.icon('user')} Should find a username is not available`, (done) => {
      chai
        .request(config.api)
        .post(`/available/username/jwt`)
        .set('Authorization', 'Bearer ' + store.token)
        .send({
          username: store.account.username,
        })
        .end((err, res) => {
          expect(err === null).to.equal(true)
          expect(res.status).to.equal(200)
          expect(res.body.result).to.equal('success')
          expect(res.body.available).to.equal(false)
          expect(res.body.username).to.equal(store.account.username)
          done()
        })
    })
  })
}
