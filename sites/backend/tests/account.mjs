export const accountTests = async (chai, config, expect, store) => {
  /*
  consent       Int       @default(0)
  data          String    @default("{}")
  ehash         String    @unique
  email         String
  newsletter    Boolean   @default(false)
  password      String
  username      String
  lusername     String    @unique
  */

  describe(`${store.icon('user')} Update account data`, async function () {
    it(`${store.icon('user')} Should update consent to 3 (jwt)`, (done) => {
      chai
        .request(config.api)
        .put('/account/jwt')
        .set('Authorization', 'Bearer ' + store.account.token)
        .send({
          consent: 3,
          data: {
            banana: 'Sure',
          },
          newsletter: true,
          password: 'Something new',
          username: 'new',
        })
        .end((err, res) => {
          expect(err === null).to.equal(true)
          expect(res.status).to.equal(200)
          expect(res.body.result).to.equal(`success`)
          done()
        })
    })
  })
}
