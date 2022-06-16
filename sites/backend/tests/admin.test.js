module.exports = function tests(store, config, chai) {
  describe('Admin routes', () => {
    it('should login ad admin', done => {
      chai
        .request(config.backend)
        .post('/login')
        .send({
          username: 'admin',
          password: 'admin'
        })
        .end((err, res) => {
          console.log(res)
          res.should.have.status(200)
          done()
        })
    })

    it('should load a user account', done => {
      chai
        .request(config.backend)
        .get('/admin/users/rracx')
        .set('Authorization', 'Bearer ' + config.user.token)
        .end((err, res) => {
          res.should.have.status(200)
          let data = JSON.parse(res.text)
          console.log(data)
          done()
        })
    })
  })
}
