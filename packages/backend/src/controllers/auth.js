import { User, Person, Pattern, Confirmation } from '../models'
import {
  createUrl,
  getHash,
  getToken,
  getHandle,
  createHandle,
  imageType,
  saveAvatarFromBase64
} from '../utils'
import config from '../config'
import queryString from 'query-string'
import axios from 'axios'

/** This is essentially part of the user controller, but
 *  it seemed best to keep all this authentication stuff
 *  somewhat apart
 */

function AuthController() {}

AuthController.prototype.initOauth = function(req, res) {
  if (!req.body) return res.sendStatus(400)
  let confirmation = new Confirmation({
    type: 'oauth',
    data: {
      language: req.body.language,
      provider: req.body.provider
    }
  })
  confirmation.save(function(err) {
    if (err) return res.sendStatus(500)
    return res.send({ state: confirmation._id })
  })
}

AuthController.prototype.loginOauth = function(req, res) {
  if (!req.body) return res.sendStatus(400)
  Confirmation.findById(req.body.confirmation, (err, confirmation) => {
    if (err) return res.sendStatus(400)
    if (confirmation === null) return res.sendStatus(401)
    if (String(confirmation.data.validation) !== String(req.body.validation))
      return res.sendStatus(401)
    let signup = confirmation.data.signup
    User.findOne({ handle: confirmation.data.handle }, (err, user) => {
      if (err) return res.sendStatus(400)
      if (user === null) return res.sendStatus(401)

      if (user.status !== 'active') return res.sendStatus(403)
      let account = user.account()
      let token = getToken(account)
      let people = {}
      Person.find({ user: user.handle }, (err, personList) => {
        if (err) return res.sendStatus(400)
        for (let person of personList) people[person.handle] = person
        let patterns = {}
        Pattern.find({ user: user.handle }, (err, patternList) => {
          if (err) return res.sendStatus(400)
          for (let pattern of patternList) patterns[pattern.handle] = pattern
          confirmation.remove(err => {
            if (err !== null) return res.sendStatus(500)
            user.updateLoginTime(() => res.send({ account, people, token, signup }))
          })
        })
      })
    })
  })
}

AuthController.prototype.providerCallback = function(req, res) {
  let language, token, email, avatarUri, username
  let provider = req.params.provider
  let conf = config.oauth[provider]
  let signup = false

  // Verify state
  Confirmation.findById(req.query.state, (err, confirmation) => {
    if (err) return res.sendStatus(400)
    if (confirmation === null) return res.sendStatus(401)
    if (String(confirmation._id) !== String(req.query.state)) return res.sendStatus(401)
    if (confirmation.data.provider !== provider) return res.sendStatus(401)

    language = confirmation.data.language
    // Get access token
    const go = axios.create({ baseURL: '', timeout: 5000 })
    go.post(conf.tokenUri, {
      client_id: conf.clientId,
      client_secret: conf.clientSecret,
      code: req.query.code,
      accept: 'json',
      grant_type: 'authorization_code',
      redirect_uri: config.api + '/oauth/callback/from/' + provider
    })
      .then(result => {
        if (result.status !== 200) return res.sendStatus(401)
        if (provider === 'github') token = queryString.parse(result.data).access_token
        else if (provider === 'google') token = result.data.access_token
        // Contact API for user info
        const headers = token => ({ headers: { Authorization: 'Bearer ' + token } })
        go.get(conf.dataUri, headers(token))
          .then(async result => {
            if (provider === 'github') {
              email = await getGithubEmail(result.data.email, go, conf.emailUri, headers(token)),
              avatarUri = result.data.avatar_url
              username = result.data.login
            } else if (provider === 'google') {
              for (let address of result.data.emailAddresses) {
                if (address.metadata.primary === true) email = address.value
              }
              for (let photo of result.data.photos) {
                if (photo.metadata.primary === true) avatarUri = photo.url
              }
              for (let name of result.data.names) {
                if (name.metadata.primary === true) username = name.displayName
              }
            }
            User.findOne({ ehash: getHash(email) }, (err, user) => {
              if (err) return res.sendStatus(400)
              if (user === null) {
                // New user: signup
                signup = true
                let handle = getHandle()
                go.get(avatarUri, { responseType: 'arraybuffer' }).then(avatar => {
                  let type = imageType(avatar.headers['content-type'])
                  saveAvatarFromBase64(
                    new Buffer(avatar.data, 'binary').toString('base64'),
                    handle,
                    type
                  )
                  let userData = {
                    picture: handle + '.' + type,
                    email: email,
                    initial: email,
                    ehash: getHash(email),
                    handle,
                    username: username,
                    settings: { language: language },
                    social: {
                      github: '',
                      twitter: '',
                      instagram: '',
                    },
                    time: {
                      created: new Date(),
                      login: new Date()
                    }
                  }
                  if (provider === 'github') {
                    userData.social.github = result.data.login
                    userData.bio = result.data.bio
                  }
                  let user = new User(userData)
                  user.save(function(err) {
                    if (err) return res.sendStatus(500)
                    let validation = createHandle(20)
                    confirmation.data.handle = user.handle
                    confirmation.data.validation = validation
                    confirmation.data.signup = true
                    confirmation.save(function(err) {
                      if (err) return res.sendStatus(500)
                      return res.redirect(
                        createUrl(
                          language,
                          signup
                            ? '/confirm/signup/' + req.query.state + '/'
                            : '/login/callback/' + confirmation._id + '/' + validation
                        )
                      )
                    })
                  })
                })
              } else {
                // Existing user
                if (provider === 'github') {
                  if (user.bio === '') user.bio = result.data.bio
                  user.social.github = result.data.login
                }
                user.save(function(err) {
                  let validation = createHandle(20)
                  confirmation.data.handle = user.handle
                  confirmation.data.validation = validation
                  confirmation.data.signup = false
                  confirmation.save(function(err) {
                    if (err) return res.sendStatus(500)
                    return res.redirect(
                      // Watch out for pending users
                      createUrl(language, (user.status === 'pending')
                        ? '/confirm/signup/' + req.query.state + '/'
                        : '/login/callback/' + confirmation._id + '/' + validation
                      )
                    )
                  })
                })
              }
            })
          })
          .catch(err => {
            console.log('api token error', err)
            res.sendStatus(401)
          })
      })
      .catch(err => {
        console.log('post token error', err)
        res.sendStatus(401)
      })
  })
}

/*
* Github does not always return the email address
* See https://github.com/freesewing/backend/issues/162
*/
const getGithubEmail = async (email, client, uri, headers) => {
  if (email === null) {
    return client.get(uri, headers)
      .then(result => {
        for (let e of result.data) {
          if (e.primary) return e.email
        }
      })
  }
  else return email
}


export default AuthController
