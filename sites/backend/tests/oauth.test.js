module.exports = function tests(store, config, chai) {

  describe('Oauth via Github', () => {
    it('should trigger Oauth via Github', done => {
      chai
        .request(config.backend)
        .post('/oauth/init')
        .send({
          provider: 'github',
          language: 'en'
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.state.should.be.a('string')
          config.oauth.github.state = data.state
          done()
        })
    })

    it('should trigger Oauth via Google', done => {
      chai
        .request(config.backend)
        .post('/oauth/init')
        .send({
          provider: 'github',
          language: 'en'
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.state.should.be.a('string')
          config.oauth.google.state = data.state
          done()
        })
    })

    // FIXME: Test the rest of the Oauth flow (perhaps easier to do from the frontend)
  })
}
