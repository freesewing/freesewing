export const issueTests = async (chai, config, expect, store) => {
  describe(`${store.icon('issue')} Issue tests`, () => {
    it(`${store.icon('set')} Should create an issue`, (done) => {
      chai
        .request(config.api)
        .post(`/issues`)
        .send({
          title: '[test] This issue was created by a unit test',
          body: `This issue was created by a unit test. Feel free to close it or even delete it.`,
          assignees: ['joostdecock'],
          labels: [':test_tube: tests'],
        })
        .end((err, res) => {
          expect(err === null).to.equal(true)
          expect(res.status).to.equal(201)
          expect(res.body.result).to.equal(`created`)
          expect(res.body.issue.state).to.equal(`open`)
          done()
        })
    })
  })
}
