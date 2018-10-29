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
    user.verifyPassword(req.body.password, (err, valid) => {
      if (err) return res.sendStatus(400);
      else if (valid) {
        log.info('login', { user, req });
        let account = user.account();
        let token = jwt.sign({
          _id: account._id,
          handle: account.handle,
          aud: config.jwt.audience,
          iss: config.jwt.issuer,
        }, config.jwt.secretOrKey);
        user.updateLoginTime(() => res.send({account,token}));
      } else {
        log.warning('wrongPassword', { user, req });
        return res.sendStatus(401);
      }
    });
  });
}


// CRUD basics

//  create (req, res) { }
UserController.prototype.readAccount = function (req, res) {
  if (!req.user._id) return res.sendStatus(400);
  User.findById(req.user._id, (err, user) => {
    log.info('ping', { user, req });
    res.send({account: user.account()});
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
      bcrypt.hash(req.body.password, config.hashing.saltRounds, (err, hash) => {
        if (err) return res.sendStatus(500);
        let confirmation = new Confirmation({
          type: "signup",
          data: {
            language: req.body.language,
            email: req.body.email,
            password: hash
          }
        });
        confirmation.save(function (err) {
          if (err) return res.sendStatus(500);
          log.info('signupRequest', { email: req.body.email, confirmation: confirmation._id });
          email.signup(req.body.email, req.body.language, confirmation._id);
          return; res.sendStatus(200);
        });
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

export default UserController;
