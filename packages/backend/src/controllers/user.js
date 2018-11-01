import { User, Confirmation } from "../models";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { log, email } from "../utils";
import jwt from "jsonwebtoken";
import config from "../config";

function UserController() { }

UserController.prototype.login = function (req, res) {
  if (!req.body) return res.sendStatus(400);
  User.findOne({
    $or: [
      { username: req.body.username.toLowerCase().trim() },
      { ehash: ehash(req.body.username.toLowerCase().trim()) }
    ]
  }, (err, user) => {
    if (err) return res.sendStatus(400);
    if(user === null) return res.sendStatus(401);
    console.log('user is', user.password);
    user.verifyPassword(req.body.password, (err, valid) => {
      if (err) return res.sendStatus(400);
      else if (valid) {
        log.info('login', { user, req });
        let account = user.account();
        let token = getToken(account);
        user.updateLoginTime(() => res.send({account,token}));
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
    let username = "user "+handle;
    console.log('confirmation is', confirmation);
    let user = new User({
      email: confirmation.data.email,
      initial: confirmation.data.email,
      ehash: ehash(confirmation.data.email.toLowerCase().trim()),
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
      res.send({account: user.account()});
    } else {
      return res.sendStatus(400);
    }
  });
}
//  readAccount (req, res) {
//    //console.log('test', req);
//    return res.sendStatus(200);//(req.user);
//  }
 // userController.readOwnProfile = (req, res) => { }
 // userController.readProfile = (req, res) => { }
 // userController.update = (req, res) => { }
 // userController.delete = (req, res) => { }

 // // Signup flow
UserController.prototype.signup = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  User.findOne({
    ehash: ehash(req.body.email.toLowerCase().trim())
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
 // userController.resetPassword = (req, res) => { }
 // userController.confirmChangedEmail = (req, res) => { }

 // // Other
 // userController.patronList = (req, res) => { }
 // userController.exportData = (req, res) => { }

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

const newHandle = () => {
	let handle = "";
  let possible = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 5; i++)
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

export default UserController;
