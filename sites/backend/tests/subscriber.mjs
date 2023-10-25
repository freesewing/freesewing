export const subscriberTests = async (chai, config, expect, store) => {
  describe(`${store.icon('subscriber')} Subscriber tests`, () => {
    it(`${store.icon('subscriber')} Should not subscribe without an email address`, (done) => {
      const data = {
        language: 'nL',
        test: 'yes please',
      }
      chai
        .request(config.api)
        .post(`/subscriber`)
        .send(data)
        .end((err, res) => {
          expect(err === null).to.equal(true)
          expect(res.status).to.equal(400)
          expect(res.body.result).to.equal('error')
          expect(res.body.error).to.equal('emailMissing')
          done()
        })
    })

    it(`${store.icon('subscriber')} Should not subscribe without a language`, (done) => {
      const data = {
        email: 'joost@FREESEWING.dev',
        test: 'yes please',
      }
      chai
        .request(config.api)
        .post(`/subscriber`)
        .send(data)
        .end((err, res) => {
          expect(err === null).to.equal(true)
          expect(res.status).to.equal(400)
          expect(res.body.result).to.equal('error')
          expect(res.body.error).to.equal('languageMissing')
          done()
        })
    })

    it(`${store.icon('subscriber')} Should subscribe`, (done) => {
      const data = {
        email: 'joost@FREESEWING.dev',
        language: 'eN',
        test: 'yes please',
      }
      chai
        .request(config.api)
        .post(`/subscriber`)
        .send(data)
        .end((err, res) => {
          expect(err === null).to.equal(true)
          expect(res.status).to.equal(200)
          expect(res.body.result).to.equal('success')
          expect(res.body.data.email).to.equal(data.email.toLowerCase())
          expect(res.body.data.language).to.equal(data.language.toLowerCase())
          expect(typeof res.body.data.id).to.equal('string')
          expect(typeof res.body.data.ehash).to.equal('string')
          store.subscriber = res.body.data
          done()
        })
    })

    it(`${store.icon('subscriber')} Should confirm a subscription`, (done) => {
      chai
        .request(config.api)
        .put(`/subscriber`)
        .send({
          id: store.subscriber.id,
          ehash: store.subscriber.ehash,
        })
        .end((err, res) => {
          expect(err === null).to.equal(true)
          expect(res.status).to.equal(200)
          done()
        })
    })

    //it(`${store.icon('subscriber')} Should unsubscribe`, (done) => {
    //  chai
    //    .request(config.api)
    //    .delete(`/subscriber`)
    //    .send({
    //      id: store.subscriber.id,
    //      ehash: store.subscriber.ehash,
    //    })
    //    .end((err, res) => {
    //      expect(err === null).to.equal(true)
    //      expect(res.status).to.equal(200)
    //      done()
    //    })
    //})
  })
}
