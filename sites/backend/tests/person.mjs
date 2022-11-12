/*
  id        Int       @id @default(autoincrement())
  createdAt DateTime  @default(now())
  name      String    @default("")
  notes     String    @default("")
  user      User      @relation(fields: [userId], references: [id])
  userId    Int
  measies   String    @default("{}")
  Pattern   Pattern[]
  public    Boolean   @default(false)
*/

export const personTests = async (chai, config, expect, store) => {
  const data = {
    jwt: {
      name: 'Joost',
      notes: 'These are them notes',
      measies: {
        chest: 1000,
        neck: 420,
      },
      public: true,
    },
    key: {
      name: 'Sorcha',
      notes: 'These are also notes',
      measies: {
        chest: 930,
        neck: 360,
      },
      public: false,
    },
  }

  for (const auth of ['jwt', 'key']) {
    describe(`${store.icon('person', auth)} Person tests (${auth})`, () => {
      it(`${store.icon('person', auth)} Should create a new person (${auth})`, (done) => {
        chai
          .request(config.api)
          .post(`/people/${auth}`)
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
            console.log(res.body)
            expect(err === null).to.equal(true)
            expect(res.status).to.equal(201)
            expect(res.body.result).to.equal(`success`)
            for (const [key, val] of Object.entries(data[auth])) {
              expect(res.body.person[key]).to.equal(val)
            }
            done()
          })
      })
    })
  }
}
