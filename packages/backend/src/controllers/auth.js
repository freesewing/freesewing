import { User, Model, Draft, Confirmation } from "../models";
import { getHash, getToken, getHandle, createHandle, imageType, saveAvatarFromBase64 } from "../utils";
import config from "../config";
import queryString from "query-string";
import axios from "axios";
import { log } from "../utils";

/** This is essentially part of the user controller, but
 *  it seemed best to keep all this authentication stuff
 *  somewhat apart
 */

function AuthController() { }

AuthController.prototype.initOauth = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  let confirmation = new Confirmation({
    type: "oauth",
    data: {
      language: req.body.language,
      strategy: req.body.strategy,
    }
  });
  confirmation.save(function (err) {
    if (err) return res.sendStatus(500);
    return res.send({ state: confirmation._id });
  });
}

AuthController.prototype.loginOauth = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  Confirmation.findById(req.body.confirmation, (err, confirmation) => {
    if (err) return res.sendStatus(400);
    if (confirmation === null) return res.sendStatus(401);
    if (String(confirmation._id) !== String(req.body.confirmation)) return res.sendStatus(401);
    if (String(confirmation.data.validation) !== String(req.body.validation)) return res.sendStatus(401);
    let signup = confirmation.data.signup;
    User.findOne({ handle: confirmation.data.handle }, (err, user) => {
      if (err) return res.sendStatus(400);
      if(user === null) return res.sendStatus(401);

      if(user.status !== "active") res.sendStatus(403);
      let account = user.account();
      let token = getToken(account);
      let models = {};
      Model.find({user: user.handle}, (err, modelList) => {
        if(err) return res.sendStatus(400);
        for ( let model of modelList ) models[model.handle] = model;
        let drafts = {};
        Draft.find({user: user.handle}, (err, draftList) => {
          if(err) return res.sendStatus(400);
          for ( let draft of draftList ) drafts[draft.handle] = draft;
          confirmation.remove((err) => {
            if(err !== null) return res.sendStatus(500);
            user.updateLoginTime(() => res.send({account, models, token, signup}));
          });
        });
      });
    });
  });
}

AuthController.prototype.callbackFromGithub = function (req, res) {
  let language;
  let conf = config.authentication.github;

  // Is this a follow-up on an Oauth init?
  Confirmation.findById(req.query.state, (err, confirmation) => {
    if (err) return res.sendStatus(400);
    if (confirmation === null) return res.sendStatus(401);
    if (String(confirmation._id) !== String(req.query.state)) return res.sendStatus(401);
    if (confirmation.data.strategy !== "github") return res.sendStatus(401);

    language = confirmation.data.language;
    // Fetch access token from Github
    // Fetch user info from Github
    const github = axios.create({
      baseURL: "https://github.com",
      timeout: 5000
    });

    github.post("/login/oauth/access_token", {
      client_id: conf.clientId,
      client_secret: conf.clientSecret,
      code: req.query.code,
      accent: "json"
    }).then(result => {
      if (result.status !== 200) return res.sendStatus(401);
      let token = queryString.parse(result.data).access_token;
      const api = axios.create({
        baseURL: "",
        timeout: 5000
      });
      const headers = token => ({
        headers: {
          Authorization: "Bearer " + token,
        }
      });
      api.get("https://api.github.com/user", headers(token)).then(result => {
        User.findOne({ ehash: getHash(result.data.email) }, (err, user) => {
          if (err) return res.sendStatus(400);
          if(user === null) {
            // New user: signup
            let handle = getHandle();
            api.get(result.data.avatar_url, { responseType: 'arraybuffer' }).then(avatar => {
              let type = imageType(avatar.headers["content-type"]);
              saveAvatarFromBase64(new Buffer(avatar.data, 'binary').toString('base64'), handle, type);
              let user = new User({
                picture: handle + "." + type,
                email: result.data.email,
                initial: result.data.email,
                ehash: getHash(result.data.email),
                handle,
                username: result.data.login,
                settings: { language: language },
                social: { github: result.data.login },
                bio: result.data.bio,
                time: {
                  created: new Date(),
                  login: new Date(),
                }
              });
              user.save(function (err) {
                if (err) return res.sendStatus(500);
                let validation = createHandle(20);
                confirmation.data.handle = user.handle;
                confirmation.data.validation = validation;
                confirmation.data.signup = true;
                confirmation.save(function (err) {
                  if (err) return res.sendStatus(500);
                  return res.redirect(config.website+"/"+language+"/login/callback/"+confirmation._id+"/"+validation);
                });
              });
            });
          } else {
            // Existing user
            if(user.status !== "active") res.sendStatus(403);
            if(user.bio === "") user.bio = result.data.bio;
            user.social.github = result.data.login;
            user.save(function (err) {
              let validation = createHandle(20);
              confirmation.data.handle = user.handle;
              confirmation.data.validation = validation;
              confirmation.data.signup = false;
              confirmation.save(function (err) {
                if (err) return res.sendStatus(500);
                return res.redirect(config.website+"/"+language+"/login/callback/"+confirmation._id+"/"+validation);
              });
            });
          }
        });
      }).catch(err => res.sendStatus(401));
    }).catch(err => res.sendStatus(401));
  });
}

export default AuthController;
