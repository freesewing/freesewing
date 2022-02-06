module.exports = function tests(store, config, chai) {
  describe('Non language-specific User controller signup routes', () => {
    it('should not create signup without email address', done => {
      chai
        .request(config.backend)
        .post('/signup')
        .send({
          password: config.user.password,
          language: 'en'
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.text.should.equal('emailMissing')
          done()
        })
    })

    it('should not create signup without password', done => {
      chai
        .request(config.backend)
        .post('/signup')
        .send({
          email: config.user.email,
          language: 'en'
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.text.should.equal('passwordMissing')
          done()
        })
    })

    it('should not create signup without language', done => {
      chai
        .request(config.backend)
        .post('/signup')
        .send({
          email: config.user.email,
          password: config.user.password
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.text.should.equal('languageMissing')
          done()
        })
    })
  })

  describe('Login/Logout and session handling', () => {
    it('should login with the username', done => {
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
          data.account.username.should.equal(config.user.username)
          data.token.should.be.a('string')
          config.user.token = data.token
          done()
        })
    })

    it('should login with the email address', done => {
      chai
        .request(config.backend)
        .post('/login')
        .send({
          username: config.user.email,
          password: config.user.password
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.account.username.should.equal(config.user.username)
          data.token.should.be.a('string')
          done()
        })
    })

    it('should load account with JSON Web Token', done => {
      chai
        .request(config.backend)
        .get('/account')
        .set('Authorization', 'Bearer ' + config.user.token)
        .end((err, res) => {
          if (err) console.log(err)
          let data = JSON.parse(res.text)
          res.should.have.status(200)
          data.account.username.should.equal(config.user.username)
          // Enable this once cleanup is implemented
          //Object.keys(data.recipes).length.should.equal(0)
          //Object.keys(data.people).length.should.equal(0)
          done()
        })
    })
  })

  describe('Account management', () => {
    it('should update the account avatar', done => {
      chai
        .request(config.backend)
        .put('/account')
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          avatar: config.avatar
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.account.pictureUris.l.slice(-4).should.equal('.png')
          done()
        })
    })
    it('should update the account username', done => {
      chai
        .request(config.backend)
        .put('/account')
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          username: config.user.username + '_updated'
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.account.username.should.equal(config.user.username + '_updated')
          done()
        })
    })

    it('should restore the account username', done => {
      chai
        .request(config.backend)
        .put('/account')
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          username: config.user.username
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.account.username.should.equal(config.user.username)
          done()
        })
    })

    it('should not update the account username if that username is taken', done => {
      chai
        .request(config.backend)
        .put('/account')
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          username: 'admin'
        })
        .end((err, res) => {
          res.should.have.status(400)
          res.text.should.equal('usernameTaken')
          done()
        })
    })

    it('should update the account bio', done => {
      let bio = 'This is the test bio '
      chai
        .request(config.backend)
        .put('/account')
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          bio: bio
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.account.bio.should.equal(bio)
          done()
        })
    })

    it('should update the account language', done => {
      chai
        .request(config.backend)
        .put('/account')
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          settings: {
            language: 'nl'
          }
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.account.settings.language.should.equal('nl')
          done()
        })
    })

    it('should update the account units', done => {
      chai
        .request(config.backend)
        .put('/account')
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          settings: {
            units: 'imperial'
          }
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.account.settings.units.should.equal('imperial')
          done()
        })
    })

    for (let network of ['github', 'twitter', 'instagram']) {
      it(`should update the account's ${network} username`, done => {
        let data = { social: {} }
        data.social[network] = network
        chai
          .request(config.backend)
          .put('/account')
          .set('Authorization', 'Bearer ' + config.user.token)
          .send(data)
          .end((err, res) => {
            res.should.have.status(200)
            JSON.parse(res.text).account.social[network].should.equal(network)
            done()
          })
      })
    }

    it('should update the account password', done => {
      chai
        .request(config.backend)
        .put('/account')
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          password: 'changeme'
        })
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

    it('should login with the new password', done => {
      chai
        .request(config.backend)
        .post('/login')
        .send({
          username: config.user.username,
          password: 'changeme'
        })
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

    it('should restore the account password', done => {
      chai
        .request(config.backend)
        .put('/account')
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          password: config.user.password
        })
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })

  describe('Other user endpoints', () => {
    it("should load a user's profile", done => {
      chai
        .request(config.backend)
        .get('/users/admin')
        .set('Authorization', 'Bearer ' + config.user.token)
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.username.should.equal('admin')
          done()
        })
    })

    it('should confirm that a username is available', done => {
      chai
        .request(config.backend)
        .post('/available/username')
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          username: Date.now() + '  ' + Date.now()
        })
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

    it('should confirm that a username is not available', done => {
      chai
        .request(config.backend)
        .post('/available/username')
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          username: 'admin'
        })
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })

    it('should load the patron list', done => {
      chai
        .request(config.backend)
        .get('/patrons')
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data['2'].should.be.an('array')
          data['4'].should.be.an('array')
          data['8'].should.be.an('array')
          done()
        })
    })

    it('should export the user data', done => {
      chai
        .request(config.backend)
        .get('/account/export')
        .set('Authorization', 'Bearer ' + config.user.token)
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.export.should.be.a('string')
          store.exportLink = data.export
          done()
        })
    })
  })
}
