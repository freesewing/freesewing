module.exports = function tests(store, config, chai) {
  const email = Date.now() + config.user.email

  describe(`Language-specific User controller signup routes`, () => {
    for (let lang in config.languages) {
      store[lang] = {
        email: lang + email,
        password: 'test'
      }

      it(config.languages[lang] + '  => should create a pending signup', done => {
        chai
          .request(config.backend)
          .post('/signup')
          .send({
            email: store[lang].email,
            password: store[lang].password,
            language: lang
          })
          .end((err, res) => {
            res.should.have.status(200)
            res.text.should.equal('OK')
            done()
          })
      })

      it(config.languages[lang] + '  => should detect a pre-existing signup', done => {
        chai
          .request(config.backend)
          .post('/signup')
          .send({
            email: store[lang].email,
            password: store[lang].password,
            language: lang
          })
          .end((err, res) => {
            res.should.have.status(400)
            res.text.should.equal('userExists')
            done()
          })
      })
    }
  })

  describe(`Send out emails for other tests that rely on email delivery`, () => {
    it('should fetch the JWT token for test_user', done => {
      chai
        .request(config.backend)
        .post('/login')
        .send({
          username: config.user.username,
          password: config.user.password
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          store.emailChange = { token: data.token }
          done()
        })
    })

    it('should trigger the email change confirmation email', done => {
      chai
        .request(config.backend)
        .put('/account')
        .set('Authorization', 'Bearer ' + store.emailChange.token)
        .send({
          email: config.user.changedEmail
        })
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })

  describe(`Take a ${config.sleep} second power nap while we wait for the emails to be delivered`, () => {
    it(`should sleep for ${config.sleep} seconds to allow the emails to arrive`, done => {
      console.log('\n    😴  \n')
      setTimeout(() => {
        done()
      }, config.sleep * 1000)
    }).timeout(config.sleep * 1010)

    for (let lang in config.languages) {
      it(
        config.languages[lang] + '  => should have sent out an email to the signup email address',
        done => {
          let url = `/api/v2/search?kind=to&query=${lang}${email}`
          chai
            .request(config.mailhog)
            .get(url)
            .end((err, res) => {
              res.should.have.status(200)
              let data = JSON.parse(res.text)
              data.total.should.equal(1)
              let message = data.items[0]
              message.From.Mailbox.should.equal('info')
              message.From.Domain.should.equal('freesewing.org')
              message.Content.Headers.Subject[0].should.equal(
                config.strings[lang]['email.signupSubject']
              )
              store[lang].confirmation = message.Content.Headers[
                'X-Freesewing-Confirmation-ID'
              ].pop()
              done()
            })
        }
      )

      it(
        config.languages[lang] +
          '  => should not activate the pending confirmation without consent',
        done => {
          chai
            .request(config.backend)
            .post('/account')
            .send({
              id: store[lang].confirmation
            })
            .end((err, res) => {
              res.should.have.status(400)
              res.text.should.equal('consentRequired')
              done()
            })
        }
      )

      it(config.languages[lang] + '  => should activate the pending confirmation', done => {
        chai
          .request(config.backend)
          .post('/account')
          .send({
            id: store[lang].confirmation,
            consent: {
              profile: true
            }
          })
          .end((err, res) => {
            res.should.have.status(200)
            let data = JSON.parse(res.text)
            data.account.settings.language.should.equal(lang)
            data.account.settings.units.should.equal('metric')
            data.account.handle.should.be.a('string')
            data.account.role.should.equal('user')
            data.account.patron.should.equal(0)
            data.account.bio.should.equal('')
            data.account.username.should.equal('user-' + data.account.handle)
            data.account.__v.should.equal(0)
            data.account.email.should.equal(lang + email)
            data.account.pictureUris.xs
              .split('/')
              .pop()
              .should.equal(data.account.handle + '.svg')
            data.token.should.be.a('string')
            store[lang].token = data.token
            store[lang].username = data.account.username
            store[lang].handle = data.account.handle
            done()
          })
      })
    }

    it('should have sent out an email to confirm the email change', done => {
      chai
        .request(config.mailhog)
        .get(`/api/v2/search?kind=to&query=${config.user.changedEmail}`)
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          let message = data.items[0]
          message.From.Mailbox.should.equal('info')
          message.From.Domain.should.equal('freesewing.org')
          config.user.confirmation = message.Content.Headers['X-Freesewing-Confirmation-ID'].pop()
          done()
        })
    })
  })

  /*
  describe(`Other tests that depend on emails we sent out`, () => {

    it('should update the confirmed account email address', (done) => {
      chai.request(config.backend)
        .post('/confirm/changed/email')
        .set('Authorization', 'Bearer '+store.emailChange.token)
        .send({
          id: config.user.confirmation,
        })
        .end((err, res) => {
          let data = JSON.parse(res.text);
          res.should.have.status(200);
          res.data.account.email.should.equal(config.user.changedEmail);
          done();
        });
    })

  });

  */
}
