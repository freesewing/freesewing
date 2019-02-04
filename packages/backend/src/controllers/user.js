import { User, Confirmation, Model, Draft } from "../models";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { log, email } from "../utils";
import jwt from "jsonwebtoken";
import config from "../config";
import formidable from "formidable";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import Zip from "jszip";
import rimraf from "rimraf";

function UserController() { }

UserController.prototype.login = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  User.findOne({
    $or: [
      { username: req.body.username.toLowerCase().trim() },
      { ehash: ehash(req.body.username) }
    ]
  }, (err, user) => {
    if (err) return res.sendStatus(400);
    if(user === null) return res.sendStatus(401);
    user.verifyPassword(req.body.password, (err, valid) => {
      if (err) return res.sendStatus(400);
      else if (valid) {
        if(user.status !== "active") res.sendStatus(403);
        log.info('login', { user, req });
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
            user.updateLoginTime(() => res.send({account, models, token}));
          });
        });
      } else {
        log.warning('wrongPassword', { user, req });
        return res.sendStatus(401);
      }
    });
  });
}

// CRUD basics

UserController.prototype.create = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  Confirmation.findById(req.body.id, (err, confirmation) => {
    if (err) return res.sendStatus(400);
    if(confirmation === null) return res.sendStatus(401);
    let handle = uniqueHandle();
    let username = "user-"+handle;
    let user = new User({
      email: confirmation.data.email,
      initial: confirmation.data.email,
      ehash: ehash(confirmation.data.email),
      handle,
      username,
      password: confirmation.data.password,
      consent: { profile: true },
      settings: { language: confirmation.data.language },
      time: {
        created: new Date(),
        login: new Date(),
      }
    });
    user.save(function (err) {
      if (err) {
        log.error('accountCreationFailed', user);
        console.log(err);
        return res.sendStatus(500);
      }
      let account = user.account();
      log.info('accountCreated', { handle: user.handle });
      let token = getToken(account);
      Confirmation.findByIdAndDelete(req.body.id, (err, confirmation) => {
        return res.send({account,token});
      });
    });
  });
}

UserController.prototype.readAccount = (req, res) => {
  if (!req.user._id) return res.sendStatus(400);
  User.findById(req.user._id, (err, user) => {
    if(user !== null) {
      log.info('ping', { user, req });
      const models ={};
      Model.find({user: user.handle}, (err, modelList) => {
        if(err) return res.sendStatus(400);
        for ( let model of modelList ) models[model.handle] = model.info();
        const drafts ={};
        Draft.find({user: user.handle}, (err, draftList) => {
          if(err) return res.sendStatus(400);
          for ( let draft of draftList ) drafts[draft.handle] = draft;
          res.send({account: user.account(), models, drafts});
        });
      });
    } else {
      return res.sendStatus(400);
    }
  });
}

UserController.prototype.readProfile = (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) return res.sendStatus(404);
    if(user === null) return res.sendStatus(404);
    else res.send({ profile: user.profile() });
  });
}

UserController.prototype.update = (req, res) => {
  var async = 0;
  if (!req.user._id) return res.sendStatus(400);
  User.findById(req.user._id, async (err, user) => {
    if(err || user === null) return res.sendStatus(400);
    let data = req.body;
    if(typeof data.settings !== 'undefined') {
      user.settings = {
        ...user.settings,
        ...data.settings
      }
    }
    if(typeof data.username === 'string') user.username = data.username;
    if(typeof data.bio === 'string') user.bio = data.bio;
    if(typeof data.social === 'object') {
      if(typeof data.social.github === 'string') user.social.github = data.social.github;
      if(typeof data.social.twitter === 'string') user.social.twitter = data.social.twitter;
      if(typeof data.social.instagram === 'string') user.social.instagram = data.social.instagram;
    }
    if(typeof data.consent === 'object') {
      user.consent = {
        ...user.consent,
        ...data.consent
      }
    }
    if(typeof data.avatar !== "undefined") {
      let type = imageTypeFromDataUri(data.avatar);
      saveAvatar(data.avatar, user.handle, type);
      user.avatar = user.handle+"."+type;
    }

    // Below are async ops, need to watch out when to save

    if(typeof data.newPassword === 'string' && typeof data.currentPassword === 'string') {
      user.verifyPassword(data.currentPassword, (err, valid) => {
        if (err) return res.sendStatus(400);
        else {
          if (!valid) return res.sendStatus(403);
          user.password = data.newPassword;
          return saveAndReturnAccount(res, user);
        }
      });
    }

    // Email change requires confirmation
    else if(typeof data.email === 'string' && data.email !== user.email) {
      if(typeof data.confirmation === 'string') {
        Confirmation.findById(req.body.confirmation, (err, confirmation) => {
          if (err) return res.sendStatus(400);
          if(confirmation === null) return res.sendStatus(401);
          if(confirmation.data.email.new === req.body.email) {
            user.ehash = ehash(req.body.email);
            user.email = req.body.email;
            return saveAndReturnAccount(res, user);
          } else return res.sendStatus(400);
        });
      } else {
        let confirmation = new Confirmation({
          type: "emailchange",
          data: {
            language: user.settings.language,
            email: {
              new: req.body.email,
              current: user.email
            }
          }
        });
        confirmation.save(function (err) {
          if (err) return res.sendStatus(500);
          log.info('emailchangeRequest', { newEmail: req.body.email, confirmation: confirmation._id });
          email.emailchange(req.body.email, user.email, user.settings.language, confirmation._id);
          return saveAndReturnAccount(res, user);
        });
      }
    }

    else return saveAndReturnAccount(res, user);
  });
}

function imageTypeFromDataUri(uri) {
  let type = uri.split(';').shift();
  type = type.split('/').pop();

  return type;
}


function saveAndReturnAccount(res,user) {
  user.save(function (err, updatedUser) {
    if (err) {
      log.error('accountUpdateFailed', updatedUser);
      return res.sendStatus(500);
    }
    return res.send({ account: updatedUser.account() });
  })
}

function saveAvatar(picture, handle, type) {
  let b64 = picture.split(';base64,').pop();
  fs.mkdir(userStoragePath(handle), {recursive: true}, (err) => {
      if(err) log.error("mkdirFailed", err);
      let imgBuffer =  Buffer.from(b64, 'base64');
      for(let size of Object.keys(config.avatar.sizes)) {
        sharp(imgBuffer)
          .resize(config.avatar.sizes[size], config.avatar.sizes[size])
          .toFile(avatarPath(size, handle, type), (err, info) => {
            if(err) log.error("avatarNotSaved", err);
          });
      }
    });
}

function userStoragePath(handle) {
  return path.join(
      config.storage,
      handle.substring(0,1),
      handle);
}

function temporaryStoragePath(dir) {
  return path.join(
      config.storage,
      "tmp",
      dir);
}

function avatarPath(size, handle, ext, type="user") {
 let dir = userStoragePath(handle);
 if(size === "l") return path.join(dir, handle+"."+ext);
 else return path.join(dir, size+"-"+handle+"."+ext);
}

function imageType(contentType) {
  if (contentType === "image/png") return "png";
  if (contentType === "image/jpeg") return "jpg";
  if (contentType === "image/gif") return "gif";
  if (contentType === "image/bmp") return "bmp";
  if (contentType === "image/webp") return "webp";
}

UserController.prototype.isUsernameAvailable = (req, res) => {
  if (!req.user._id) return res.sendStatus(400);
  let username = req.body.username.toLowerCase().trim();
  if (username === "") return res.sendStatus(400);
  User.findOne({ username: username }, (err, user) => {
    if (err) return res.sendStatus(400);
    if(user === null) return res.sendStatus(200);
    if(user._id+"" === req.user._id) return res.sendStatus(200);
    else return res.sendStatus(400);
  });
}





// userController.delete = (req, res) => { }

 // // Signup flow
UserController.prototype.signup = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  User.findOne({
    ehash: ehash(req.body.email)
  }, (err, user) => {
    if (err) return res.sendStatus(500);
    if(user !== null) return res.status(400).send('userExists');
    else {
      let confirmation = new Confirmation({
        type: "signup",
        data: {
          language: req.body.language,
          email: req.body.email,
          password: req.body.password
        }
      });
      confirmation.save(function (err) {
        if (err) return res.sendStatus(500);
        log.info('signupRequest', { email: req.body.email, confirmation: confirmation._id });
        email.signup(req.body.email, req.body.language, confirmation._id);
        return res.sendStatus(200);
      });
    }
  });
}
 // userController.confirmSignupEmail = (req, res) => { }
 // userController.removeConfirmation = (req, res) => { }
 // userController.resendActivationEmail = (req, res) => { }

 // // Reset/recover/change email
 // userController.recoverPassword = (req, res) => { }
UserController.prototype.resetPassword = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  User.findOne({
    $or: [
      { username: req.body.username.toLowerCase().trim() },
      { ehash: ehash(req.body.username) }
    ]
  }, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    }
    if(user === null) return res.sendStatus(401);
    let confirmation = new Confirmation({
      type: "passwordreset",
      data: {
        handle: user.handle,
      }
    });
    confirmation.save(function (err) {
      if (err) return res.sendStatus(500);
      log.info('passwordresetRequest', { user: user.handle, confirmation: confirmation._id });
      email.passwordreset(user.email, user.settings.language, confirmation._id);
      return res.sendStatus(200);
    });
  });
}

UserController.prototype.setPassword = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  Confirmation.findById(req.body.confirmation, (err, confirmation) => {
    if (err) return res.sendStatus(400);
    if(confirmation === null) return res.sendStatus(401);
      User.findOne({ handle: req.body.handle }, (err, user) => {
        if (err) return res.sendStatus(400);
        if(user === null) return res.sendStatus(401);
        if(confirmation.type === 'passwordreset' && confirmation.data.handle === user.handle) {
          user.password = req.body.password;
          user.save(function (err) {
            log.info('passwordSet', { user, req });
            let account = user.account();
            let token = getToken(account);
            user.updateLoginTime(() => res.send({account,token}));
          })
        } else return res.sendStatus(401);
    })
  })

  return;
}


// userController.confirmChangedEmail = (req, res) => { }

 // // Other
 // userController.patronList = (req, res) => { }

UserController.prototype.export = (req, res) => {
  if (!req.user._id) return res.sendStatus(400);
  User.findById(req.user._id, (err, user) => {
    if(user === null) return res.sendStatus(400);
    let dir = createTempDir();
    if(!dir) return res.sendStatus(500);
    let zip = new Zip();
    zip.file("account.json", JSON.stringify(user.export(), null, 2));
    loadAvatar(user).then( avatar => {
      if(avatar) zip.file(user.picture, data);
      zip.generateAsync({
        type: "uint8array",
        comment: "freesewing.org",
        streamFiles: true
		  }).then(function(data) {
        let file = path.join(dir, "export.zip");
        fs.writeFile(file, data, (err) => {
          log.info('dataExport', { user, req });
          return res.send({export: uri(file)});
        });
      });
    });
  });
}

const loadAvatar = async user => {
  if(user.picture) await fs.readFile(path.join(user.storagePath(), user.picture), (err, data) => data);
  else return false;
}

/** restrict processing of data, aka freeze account */
UserController.prototype.restrict = (req, res) => {
  if (!req.user._id) return res.sendStatus(400);
  User.findById(req.user._id, (err, user) => {
    if(user === null) return res.sendStatus(400);
      user.status = "frozen";
      user.save(function (err) {
        if (err) {
          log.error('accountFreezeFailed', user);
          return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
  });
}

/** Remove account */
UserController.prototype.remove = (req, res) => {
  if (!req.user._id) return res.sendStatus(400);
  User.findById(req.user._id, (err, user) => {
    if(user === null) return res.sendStatus(400);
    rimraf(user.storagePath(), (err) => {
      if(err) {
        console.log('rimraf', err);
        log.error('accountRemovalFailed', {err, user, req});
        return res.sendStatus(500);
      }
      user.remove((err, usr) => {
        if(err !== null) {
          log.error('accountRemovalFailed', {err, user, req});
          return res.sendStatus(500);
        } else return res.sendStatus(200);
      });
    });
  });
}

const getToken = (account) => {
  return jwt.sign({
    _id: account._id,
    handle: account.handle,
    aud: config.jwt.audience,
    iss: config.jwt.issuer,
  }, config.jwt.secretOrKey);
}

const clean = (email) => email.toLowerCase().trim();

const ehash = (email) => {
  let hash = crypto.createHash("sha256");
  hash.update(clean(email));
  return hash.digest("hex");
}

const passwordMatches = async (password, hash) => {
  let match = await bcrypt.compare(password, hash);

  return match;
}

const newHandle = (length = 5) => {
	let handle = "";
  let possible = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < length; i++)
    handle += possible.charAt(Math.floor(Math.random() * possible.length));

  return handle;
}

const uniqueHandle = () => {
  let handle, exists;
  do {
    exists = false;
    handle = newHandle();
    User.findOne({ handle: handle }, (err, user) => {
      if(user !== null) exists = true;
    });
  } while (exists !== false);

  return handle;
}

const createTempDir = () => {
  let path = temporaryStoragePath(newHandle(10));
  fs.mkdir(path, {recursive: true}, (err) => {
    if(err) {
      log.error("mkdirFailed", err);
      path = false;
    }
  });

  return path;
}

const uri = path => config.static+path.substring(config.storage.length);

const loadModels = user => {
  const models ={};
  Model.find({user: user.handle}, (err, modelList) => {
    if(err) console.log('models err', err, models);
    for ( let model of modelList ) models[model.user] = model;
    return models;
  });
}

export default UserController;
