import chai from 'chai'
import http from 'chai-http'
import { verifyConfig } from '../src/config.mjs'
import { randomString } from '../src/utils/crypto.mjs'

const config = verifyConfig()
const expect = chai.expect
chai.use(http)
const user = '🧑'

const store = {}
const data = {
  email: `test_${randomString()}@mailtrap.freesewing.dev`,
  language: 'en',
  password: 'One two one two, this is just a test',
}

describe(`${user} Signup flow and authentication`, () => {
  it(`${user} Should return 400 on signup without body`, (done) => {
    chai
      .request(config.api)
      .post('/signup')
      .send()
      .end((err, res) => {
        expect(err === null).to.equal(true)
        expect(res.status).to.equal(400)
        expect(res.body.result).to.equal(`error`)
        expect(res.body.error).to.equal(`postBodyMissing`)
        done()
      })
  })

  Object.keys(data).map((key) => {
    it(`${user} Should not allow signup without ${key}`, (done) => {
      chai
        .request(config.api)
        .post('/signup')
        .send(
          Object.fromEntries(
            Object.keys(data)
              .filter((name) => name !== key)
              .map((name) => [name, data[name]])
          )
        )
        .end((err, res) => {
          expect(err === null).to.equal(true)
          expect(res.status).to.equal(400)
          expect(res.type).to.equal('application/json')
          expect(res.charset).to.equal('utf-8')
          expect(res.body.result).to.equal(`error`)
          expect(res.body.error).to.equal(`${key}Missing`)
          done()
        })
    })
  })

  step(`${user} Should signup new user ${data.email}`, (done) => {
    chai
      .request(config.api)
      .post('/signup')
      .send({
        ...data,
        unittest: true,
      })
      .end((err, res) => {
        expect(res.status).to.equal(201)
        expect(res.type).to.equal('application/json')
        expect(res.charset).to.equal('utf-8')
        expect(res.body.result).to.equal(`success`)
        expect(res.body.email).to.equal(data.email)
        store.confirmation = res.body.confirmation
        done()
      })
  })

  step(`${user} Should confirm new user (${data.email})`, (done) => {
    chai
      .request(config.api)
      .post(`/confirm/signup/${store.confirmation}`)
      .send({ consent: 1 })
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('application/json')
        expect(res.charset).to.equal('utf-8')
        expect(res.body.result).to.equal(`success`)
        expect(typeof res.body.token).to.equal(`string`)
        expect(typeof res.body.account.id).to.equal(`number`)
        store.token = res.body.token
        store.username = res.body.account.username
        store.userid = res.body.account.id
        done()
      })
  })

  step(`${user} Should fail to signup an existing email address`, (done) => {
    chai
      .request(config.api)
      .post('/signup')
      .send(data)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        expect(res.type).to.equal('application/json')
        expect(res.charset).to.equal('utf-8')
        expect(res.body.result).to.equal(`error`)
        expect(res.body.error).to.equal('emailExists')
        done()
      })
  })

  step(`${user} Should not login with the wrong password`, (done) => {
    chai
      .request(config.api)
      .post('/login')
      .send({
        username: store.username,
        password: store.username,
      })
      .end((err, res) => {
        expect(res.status).to.equal(401)
        expect(res.type).to.equal('application/json')
        expect(res.charset).to.equal('utf-8')
        expect(res.body.result).to.equal(`error`)
        expect(res.body.error).to.equal(`loginFailed`)
        done()
      })
  })

  step(`${user} Should login with username and password`, (done) => {
    chai
      .request(config.api)
      .post('/login')
      .send({
        username: store.username,
        password: data.password,
      })
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('application/json')
        expect(res.charset).to.equal('utf-8')
        expect(res.body.result).to.equal(`success`)
        expect(res.body.account.email).to.equal(data.email)
        expect(res.body.account.username).to.equal(store.username)
        expect(res.body.account.lusername).to.equal(store.username.toLowerCase())
        expect(typeof res.body.token).to.equal(`string`)
        expect(typeof res.body.account.id).to.equal(`number`)
        store.token = res.body.token
        done()
      })
  })

  step(`${user} Should login with USERNAME and password`, (done) => {
    chai
      .request(config.api)
      .post('/login')
      .send({
        username: store.username.toUpperCase(),
        password: data.password,
      })
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('application/json')
        expect(res.charset).to.equal('utf-8')
        expect(res.body.result).to.equal(`success`)
        expect(res.body.account.email).to.equal(data.email)
        expect(res.body.account.username).to.equal(store.username)
        expect(res.body.account.lusername).to.equal(store.username.toLowerCase())
        expect(typeof res.body.token).to.equal(`string`)
        expect(typeof res.body.account.id).to.equal(`number`)
        store.token = res.body.token
        done()
      })
  })

  step(`${user} Should login with email and password`, (done) => {
    chai
      .request(config.api)
      .post('/login')
      .send({
        username: data.email,
        password: data.password,
      })
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('application/json')
        expect(res.charset).to.equal('utf-8')
        expect(res.body.result).to.equal(`success`)
        expect(res.body.account.email).to.equal(data.email)
        expect(res.body.account.username).to.equal(store.username)
        expect(res.body.account.lusername).to.equal(store.username.toLowerCase())
        expect(typeof res.body.token).to.equal(`string`)
        expect(typeof res.body.account.id).to.equal(`number`)
        store.token = res.body.token
        done()
      })
  })

  step(`${user} Should login with EMAIL and password`, (done) => {
    chai
      .request(config.api)
      .post('/login')
      .send({
        username: data.email.toUpperCase(),
        password: data.password,
      })
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('application/json')
        expect(res.charset).to.equal('utf-8')
        expect(res.body.result).to.equal(`success`)
        expect(res.body.account.email).to.equal(data.email)
        expect(res.body.account.username).to.equal(store.username)
        expect(res.body.account.lusername).to.equal(store.username.toLowerCase())
        expect(typeof res.body.token).to.equal(`string`)
        expect(typeof res.body.account.id).to.equal(`number`)
        store.token = res.body.token
        done()
      })
  })

  step(`${user} Should login with userid and password`, (done) => {
    chai
      .request(config.api)
      .post('/login')
      .send({
        username: store.userid,
        password: data.password,
      })
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('application/json')
        expect(res.charset).to.equal('utf-8')
        expect(res.body.result).to.equal(`success`)
        expect(res.body.account.email).to.equal(data.email)
        expect(res.body.account.username).to.equal(store.username)
        expect(res.body.account.lusername).to.equal(store.username.toLowerCase())
        expect(typeof res.body.token).to.equal(`string`)
        expect(typeof res.body.account.id).to.equal(`number`)
        store.token = res.body.token
        done()
      })
  })

  step(`${user} Should load account with JWT`, (done) => {
    chai
      .request(config.api)
      .get('/account/jwt')
      .set('Authorization', 'Bearer ' + store.token)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('application/json')
        expect(res.charset).to.equal('utf-8')
        expect(res.body.result).to.equal(`success`)
        expect(res.body.account.email).to.equal(data.email)
        expect(res.body.account.username).to.equal(store.username)
        expect(res.body.account.lusername).to.equal(store.username.toLowerCase())
        expect(typeof res.body.account.id).to.equal(`number`)
        done()
      })
  })

  step(`${user} Should load account with JWT (whoami)`, (done) => {
    chai
      .request(config.api)
      .get('/whoami/jwt')
      .set('Authorization', 'Bearer ' + store.token)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('application/json')
        expect(res.charset).to.equal('utf-8')
        expect(res.body.result).to.equal(`success`)
        expect(res.body.account.email).to.equal(data.email)
        expect(res.body.account.username).to.equal(store.username)
        expect(res.body.account.lusername).to.equal(store.username.toLowerCase())
        expect(typeof res.body.account.id).to.equal(`number`)
        done()
      })
  })

  step(`${user} Create API Key`, (done) => {
    chai
      .request(config.api)
      .post('/apikey/jwt')
      .set('Authorization', 'Bearer ' + store.token)
      .send({
        name: 'Test API key',
        level: 4,
        expiresIn: 60,
      })
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('application/json')
        expect(res.charset).to.equal('utf-8')
        expect(res.body.result).to.equal(`success`)
        expect(typeof res.body.apikey.key).to.equal('string')
        expect(typeof res.body.apikey.secret).to.equal('string')
        expect(typeof res.body.apikey.expiresAt).to.equal('string')
        expect(res.body.apikey.level).to.equal(4)
        store.apikey = res.body.apikey
        done()
      })
  })

  step(`${user} Read API Key with KEY (whoami)`, (done) => {
    chai
      .request(config.api)
      .get(`/whoami/key`)
      .auth(store.apikey.key, store.apikey.secret)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('application/json')
        expect(res.charset).to.equal('utf-8')
        expect(res.body.result).to.equal(`success`)
        const checks = ['key', 'level', 'expiresAt', 'name', 'userId']
        checks.forEach((i) => expect(res.body.apikey[i]).to.equal(store.apikey[i]))
        done()
      })
  })

  step(`${user} Read API Key with KEY`, (done) => {
    chai
      .request(config.api)
      .get(`/apikey/${store.apikey.key}/key`)
      .auth(store.apikey.key, store.apikey.secret)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('application/json')
        expect(res.charset).to.equal('utf-8')
        expect(res.body.result).to.equal(`success`)
        const checks = ['key', 'level', 'expiresAt', 'name', 'userId']
        checks.forEach((i) => expect(res.body.apikey[i]).to.equal(store.apikey[i]))
        done()
      })
  })

  step(`${user} Read API Key with JWT`, (done) => {
    chai
      .request(config.api)
      .get(`/apikey/${store.apikey.key}/jwt`)
      .set('Authorization', 'Bearer ' + store.token)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.type).to.equal('application/json')
        expect(res.charset).to.equal('utf-8')
        expect(res.body.result).to.equal(`success`)
        const checks = ['key', 'level', 'expiresAt', 'name', 'userId']
        checks.forEach((i) => expect(res.body.apikey[i]).to.equal(store.apikey[i]))
        done()
      })
  })
})
