import mongoose, { Schema } from "mongoose";
import bcrypt from 'mongoose-bcrypt';
import { email, log } from "../utils";
import encrypt from 'mongoose-encryption';
import config from "../config";
import path from "path";

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
    bcrypt: true
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
	email.goodbye(this.email, this.settings.language)
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
  decryptPostSave: true
});

UserSchema.methods.account = function() {
  let account = this.toObject();
  delete account.password;
  delete account.ehash;
  delete account.pepper;
  delete account.initial;
  delete account._ac;
  delete account._ct;
  account.pictureUris = {
    l: this.avatarUri(),
    m: this.avatarUri("m"),
    s: this.avatarUri("s"),
    xs: this.avatarUri("xs"),
  }

  return account;
}

UserSchema.methods.profile = function() {
  let account = this.toObject();
  delete account.password;
  delete account.ehash;
  delete account.pepper;
  delete account.email;
  delete account.consent;
  delete account.initial;
  delete account.role;
  delete account.status;
  delete account.handle;
  delete account.time.login;
  delete account.picture;
  delete account.__v;
  delete account._id;
  delete account._ac;
  delete account._ct;
  delete account._ct;
  account.pictureUris = {
    l: this.avatarUri(),
    m: this.avatarUri("m"),
    s: this.avatarUri("s"),
    xs: this.avatarUri("xs"),
  }

  return account;
}

UserSchema.methods.export = function() {
  let exported = this.toObject();
  delete exported.password;
  delete exported.ehash;
  delete exported.pepper;
  delete exported._ac;
  delete exported._ct;

  return exported;
}

UserSchema.methods.updateLoginTime = function(callback) {
  this.set({time: {login: new Date()}});
  this.save(function(err, user) {
    return callback();
  });
}

UserSchema.methods.storagePath = function() {
  return path.join(
    config.storage,
    this.handle.substring(0,1),
    this.handle
  );
}

UserSchema.methods.avatarUri = function(size = "l") {
  let prefix = (size === "l") ? "" : size+"-";
  return config.static
    +"/"
    +this.handle.substring(0,1)
    +"/"
    +this.handle
    +"/"
    +prefix
    +this.picture;
}

export default mongoose.model('User', UserSchema);
