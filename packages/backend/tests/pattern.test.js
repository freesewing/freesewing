module.exports = function tests(store, config, chai) {
  describe('Pattern endpoints', () => {
    it('should create a pattern', done => {
      chai
        .request(config.backend)
        .post('/patterns')
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          name: 'Test pattern',
          person: 'Someone',
          notes: 'Some notes',
          data: {
            test: 'value'
          }
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.name.should.equal('Test pattern')
          data.notes.should.equal('Some notes')
          data.data.test.should.equal('value')
          config.user.pattern = data.handle
          done()
        })
    })

    it('should update the pattern name', done => {
      chai
        .request(config.backend)
        .put('/patterns/' + config.user.pattern)
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          name: 'New name'
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.name.should.equal('New name')
          data.handle.should.equal(config.user.pattern)
          done()
        })
    })

    it('should update the pattern notes', done => {
      chai
        .request(config.backend)
        .put('/patterns/' + config.user.pattern)
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          notes: 'These are the notes'
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.notes.should.equal('These are the notes')
          data.handle.should.equal(config.user.pattern)
          done()
        })
    })

    it('should load the pattern data without authentication', done => {
      chai
        .request(config.backend)
        .get('/patterns/' + config.user.pattern)
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.notes.should.equal('These are the notes')
          data.handle.should.equal(config.user.pattern)
          done()
        })
    })

    it('should delete the pattern', done => {
      chai
        .request(config.backend)
        .delete('/patterns/' + config.user.pattern)
        .set('Authorization', 'Bearer ' + config.user.token)
        .end((err, res) => {
          res.should.have.status(204)
          done()
        })
    })

    it('should no longer have this pattern', done => {
      chai
        .request(config.backend)
        .get('/patterns/' + config.user.pattern)
        .set('Authorization', 'Bearer ' + config.user.token)
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })
}
