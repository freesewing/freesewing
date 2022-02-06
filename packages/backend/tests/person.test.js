module.exports = function tests(store, config, chai) {
  const should = chai.should()

  describe('Person endpoints', () => {
    it('should create a person', done => {
      chai
        .request(config.backend)
        .post('/people')
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          name: 'Test person',
          units: 'imperial',
          breasts: true
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.person.breasts.should.be.true
          data.person.units.should.equal('imperial')
          data.person.name.should.equal('Test person')
          data.person.pictureUris.xs
            .split('/')
            .pop()
            .should.equal(data.person.handle + '.svg')
          config.user.person = data.person.handle
          done()
        })
    })

    it('should update the person name', done => {
      chai
        .request(config.backend)
        .put('/people/' + config.user.person)
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          name: 'New person name'
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.person.name.should.equal('New person name')
          data.person.handle.should.equal(config.user.person)
          done()
        })
    })

    it('should update the person chest', done => {
      chai
        .request(config.backend)
        .put('/people/' + config.user.person)
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          breasts: 'false'
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.person.breasts.should.be.false
          data.person.handle.should.equal(config.user.person)
          done()
        })
    })

    it('should update the person units', done => {
      chai
        .request(config.backend)
        .put('/people/' + config.user.person)
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          units: 'metric'
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.person.units.should.equal('metric')
          data.person.handle.should.equal(config.user.person)
          done()
        })
    })

    it('should update the person notes', done => {
      chai
        .request(config.backend)
        .put('/people/' + config.user.person)
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          notes: 'These are the notes'
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.person.notes.should.equal('These are the notes')
          data.person.handle.should.equal(config.user.person)
          done()
        })
    })

    it('should update the person measurements', done => {
      chai
        .request(config.backend)
        .put('/people/' + config.user.person)
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          measurements: {
            shoulderToShoulder: 456,
            neck: 345
          }
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.person.measurements.shoulderToShoulder.should.equal(456)
          data.person.measurements.neck.should.equal(345)
          data.person.handle.should.equal(config.user.person)
          done()
        })
    })

    it('should not set a non-existing measurement', done => {
      chai
        .request(config.backend)
        .put('/people/' + config.user.person)
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          measurements: {
            hairLength: 12
          }
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          should.not.exist(data.person.measurements.hairLength)
          data.person.measurements.shoulderToShoulder.should.equal(456)
          data.person.measurements.neck.should.equal(345)
          data.person.handle.should.equal(config.user.person)
          done()
        })
    })

    it('should update the person avatar', done => {
      chai
        .request(config.backend)
        .put('/people/' + config.user.person)
        .set('Authorization', 'Bearer ' + config.user.token)
        .send({
          picture: config.avatar
        })
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.person.measurements.shoulderToShoulder.should.equal(456)
          data.person.measurements.neck.should.equal(345)
          data.person.handle.should.equal(config.user.person)
          done()
        })
    })

    it('should load the person data', done => {
      chai
        .request(config.backend)
        .get('/people/' + config.user.person)
        .set('Authorization', 'Bearer ' + config.user.token)
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          data.person.measurements.shoulderToShoulder.should.equal(456)
          data.person.measurements.neck.should.equal(345)
          data.person.handle.should.equal(config.user.person)
          done()
        })
    })

    it('should delete the person', done => {
      chai
        .request(config.backend)
        .delete('/people/' + config.user.person)
        .set('Authorization', 'Bearer ' + config.user.token)
        .end((err, res) => {
          res.should.have.status(204)
          done()
        })
    })

    it('should no longer have this person', done => {
      chai
        .request(config.backend)
        .get('/people/' + config.user.person)
        .set('Authorization', 'Bearer ' + config.user.token)
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })
}
