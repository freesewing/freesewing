import { User } from "../models";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { log } from "../utils";

const userController = {};

// Login
userController.login = (req, res) => {
  if (!req.body) return res.sendStatus(400);
  User.findOne({
    $or: [
      { username: req.body.username },
      { ehash: ehash(req.body.username) }
    ]
  }, (err, user) => {
    if (err) return res.sendStatus(400);
    if(user === null) return res.sendStatus(401);
    user.verifyPassword(req.body.password, (err, valid) => {
      if (err) return res.sendStatus(400);
      else if (valid) {
        log.info('login', { user, req });
        user.updateLoginTime(() => res.send(user.account()));
      } else {
        log.warning('wrongPassword', { user, req });
        return res.sendStatus(401);
      }
    });
  });
}

// CRUD basics
userController.create = (req, res) => { }
userController.readAccount = (req, res) => { }
userController.readOwnProfile = (req, res) => { }
userController.readProfile = (req, res) => { }
userController.update = (req, res) => { }
userController.delete = (req, res) => { }

// Signup flow
userController.signup = (req, res) => { }
userController.confirmSignupEmail = (req, res) => { }
userController.removeConfirmation = (req, res) => { }
userController.resendActivationEmail = (req, res) => { }

// Reset/recover/change email
userController.recoverPassword = (req, res) => { }
userController.resetPassword = (req, res) => { }
userController.confirmChangedEmail = (req, res) => { }

// Other
userController.patronList = (req, res) => { }
userController.exportData = (req, res) => { }


userController.findOne = (req, res) => {
  User.find({"username":"joost"})
  .then( users => {
    res.send(users);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "An error occurred."
    });
  });
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

export default userController;
