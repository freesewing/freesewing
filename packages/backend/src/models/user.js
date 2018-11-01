import mongoose, { Schema } from "mongoose";
import bcrypt from 'mongoose-bcrypt';
import { email, log } from "../utils";
import encrypt from 'mongoose-encryption';
import config from "../config";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  ehash: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  initial: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  handle: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
    unique: true
  },
  role: {
    type: String,
    enum: ["user", "moderator", "admin"],
    required: true,
    default: "user"
  },
  patron: {
    type: Number,
    enum: [0, 2, 4, 8],
    default: 0
  },
  bio: {
    type: String,
    default: ""
  },
  picture: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["active", "blocked", "frozen"],
    default: "active",
    required: true
  },
  password: {
    type: String,
    required: true
  },
  settings: {
    language: {
      type: String,
      default: "en",
      enum: config.languages,
    },
    units: {
      type: String,
      enum: ["metric", "imperial"],
      default: "metric"
    }
  },
  consent: {
    profile: {
      type: Boolean,
      default: false
    },
    model: {
      type: Boolean,
      default: false
    },
    openData: {
      type: Boolean,
      default: true
    }
  },
  time: {
    created: Date,
    migrated: Date,
    login: Date,
    patron: Date
  },
  social: {
    twitter: String,
    instagram: String,
    github: String
  }
},{ timestamps: true });

UserSchema.pre('remove', function(next) {
	mailer({
		type: 'goodbye',
		email: this.email
	})
	.then(() => { next(); })
	.catch(err => {
		logger.error(err);
		next();
	});
});

UserSchema.plugin(bcrypt);
UserSchema.index({ ehash: 1, username: 1 , handle: 1});

UserSchema.plugin(encrypt, {
  secret: config.encryption.key,
  encryptedFields: [
    'email',
    'initial',
    'social.twitter',
    'social.instagram',
    'social.github'
  ],
  decryptPostSave: false
});

UserSchema.methods.account = function() {
  let account = this.toObject();
  delete account.password;
  delete account.ehash;
  delete account.pepper;
  delete account.initial;
  delete account._ac;
  delete account._ct;

  return account;
}

UserSchema.methods.updateLoginTime = function(callback) {
  this.set({time: {login: new Date()}});
  this.save(function(err, user) {
    return callback();
  });
}

export default mongoose.model('User', UserSchema);
