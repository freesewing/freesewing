export const bookmarkTests = async (chai, config, expect, store) => {
  const data = {
    jwt: {
      type: 'doc',
      title: 'This is the title',
      url: '/docs/foo/bar',
    },
    key: {
      type: 'set',
      title: 'This is the set',
      url: '/sets/12',
    },
  }
  store.bookmark = {
    jwt: {},
    key: {},
  }
  store.altbookmark = {
    jwt: {},
    key: {},
  }

  for (const auth of ['jwt', 'key']) {
    describe(`${store.icon('bookmark', auth)} Bookmark tests (${auth})`, () => {
      it(`${store.icon('bookmark', auth)} Should create a new bookmark (${auth})`, (done) => {
        chai
          .request(config.api)
          .post(`/bookmarks/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.account.token
              : 'Basic ' +
                  new Buffer(`${store.account.apikey.key}:${store.account.apikey.secret}`).toString(
                    'base64'
                  )
          )
          .send(data[auth])
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(201)
            expect(res.body.result).to.equal(`created`)
            for (const [key, val] of Object.entries(data[auth])) {
              expect(res.body.bookmark[key]).to.equal(val)
            }
            store.bookmark[auth] = res.body.bookmark
            done()
          })
      }).timeout(5000)

      for (const field of ['title', 'url']) {
        it(`${store.icon('bookmark', auth)} Should update the ${field} field (${auth})`, (done) => {
          const data = {}
          const val = store.bookmark[auth][field] + '_updated'
          data[field] = val
          chai
            .request(config.api)
            .patch(`/bookmarks/${store.bookmark[auth].id}/${auth}`)
            .set(
              'Authorization',
              auth === 'jwt'
                ? 'Bearer ' + store.account.token
                : 'Basic ' +
                    new Buffer(
                      `${store.account.apikey.key}:${store.account.apikey.secret}`
                    ).toString('base64')
            )
            .send(data)
            .end((err, res) => {
              expect(err === null).to.equal(true)
              expect(res.status).to.equal(200)
              expect(res.body.result).to.equal(`success`)
              expect(res.body.bookmark[field]).to.equal(val)
              done()
            })
        })
      }

      it(`${store.icon('bookmark', auth)} Should read a bookmark (${auth})`, (done) => {
        chai
          .request(config.api)
          .get(`/bookmarks/${store.bookmark[auth].id}/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.account.token
              : 'Basic ' +
                  new Buffer(`${store.account.apikey.key}:${store.account.apikey.secret}`).toString(
                    'base64'
                  )
          )
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(200)
            expect(res.body.result).to.equal(`success`)
            expect(typeof res.body.bookmark).to.equal('object')
            done()
          })
      })

      it(`${store.icon(
        'bookmark',
        auth
      )} Should not allow reading another user's bookmark (${auth})`, (done) => {
        chai
          .request(config.api)
          .get(`/bookmarks/${store.bookmark[auth].id}/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.altaccount.token
              : 'Basic ' +
                  new Buffer(
                    `${store.altaccount.apikey.key}:${store.altaccount.apikey.secret}`
                  ).toString('base64')
          )
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(403)
            expect(res.body.result).to.equal(`error`)
            expect(res.body.error).to.equal(`insufficientAccessLevel`)
            done()
          })
      })

      it(`${store.icon(
        'bookmark',
        auth
      )} Should not allow updating another user's bookmark (${auth})`, (done) => {
        chai
          .request(config.api)
          .patch(`/bookmarks/${store.bookmark[auth].id}/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.altaccount.token
              : 'Basic ' +
                  new Buffer(
                    `${store.altaccount.apikey.key}:${store.altaccount.apikey.secret}`
                  ).toString('base64')
          )
          .send({
            title: 'I have been taken over',
          })
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(403)
            expect(res.body.result).to.equal(`error`)
            expect(res.body.error).to.equal(`insufficientAccessLevel`)
            done()
          })
      })

      it(`${store.icon(
        'bookmark',
        auth
      )} Should not allow removing another user's bookmark (${auth})`, (done) => {
        chai
          .request(config.api)
          .delete(`/bookmarks/${store.bookmark[auth].id}/${auth}`)
          .set(
            'Authorization',
            auth === 'jwt'
              ? 'Bearer ' + store.altaccount.token
              : 'Basic ' +
                  new Buffer(
                    `${store.altaccount.apikey.key}:${store.altaccount.apikey.secret}`
                  ).toString('base64')
          )
          .end((err, res) => {
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(403)
            expect(res.body.result).to.equal(`error`)
            expect(res.body.error).to.equal(`insufficientAccessLevel`)
            done()
          })
      })
    })
  }
}
