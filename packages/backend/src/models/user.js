import mongoose, { Schema } from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import { email, randomAvatar } from '../utils'
import encrypt from 'mongoose-encryption'
import config from '../config'
import path from 'path'
import fs from 'fs'
import { log } from '../utils'
import sharp from 'sharp'

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true
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
      enum: ['user', 'moderator', 'admin'],
      required: true,
      default: 'user'
    },
    patron: {
      type: Number,
      enum: [0, 2, 4, 8],
      default: 0
    },
    bio: {
      type: String,
      default: ''
    },
    picture: {
      type: String,
      trim: true,
      default: ''
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'blocked', 'frozen'],
      default: 'pending',
      required: true
    },
    password: {
      type: String,
      bcrypt: true
    },
    settings: {
      language: {
        type: String,
        default: 'en',
        enum: config.languages
      },
      units: {
        type: String,
        enum: ['metric', 'imperial'],
        default: 'metric'
      }
    },
    consent: {
      profile: {
        type: Boolean,
        default: false
      },
      measurements: {
        type: Boolean,
        default: false
      },
      openData: {
        type: Boolean,
        default: true
      }
    },
    time: {
      migrated: Date,
      login: Date,
      patron: Date
    },
    social: {
      twitter: String,
      instagram: String,
      github: String
    },
    newsletter: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
)

UserSchema.pre('remove', function(next) {
  email
    .goodbye(this.email, this.settings.language)
    .then(() => {
      next()
    })
    .catch(err => {
      logger.error(err)
      next()
    })
})

UserSchema.plugin(bcrypt)
UserSchema.index({ ehash: 1, username: 1, handle: 1 })

UserSchema.plugin(encrypt, {
  secret: config.encryption.key,
  encryptedFields: ['email', 'initial', 'social.twitter', 'social.instagram', 'social.github'],
  decryptPostSave: true
})

UserSchema.methods.account = function() {
  let account = this.toObject()
  delete account.password
  delete account.ehash
  delete account.pepper
  delete account.initial
  delete account._ac
  delete account._ct

  account.pictureUris = {
    l: this.avatarUri(),
    m: this.avatarUri('m'),
    s: this.avatarUri('s'),
    xs: this.avatarUri('xs')
  }

  return account
}

UserSchema.methods.profile = function() {
  let account = this.toObject()
  delete account.password
  delete account.ehash
  delete account.pepper
  delete account.email
  delete account.consent
  delete account.initial
  delete account.role
  delete account.status
  delete account.time
  delete account.picture
  delete account.__v
  delete account._id
  delete account._ac
  delete account._ct
  delete account._ct
  account.pictureUris = {
    l: this.avatarUri(),
    m: this.avatarUri('m'),
    s: this.avatarUri('s'),
    xs: this.avatarUri('xs')
  }

  return account
}

UserSchema.methods.adminProfile = function() {
  let account = this.toObject()
  delete account.password
  delete account.ehash
  delete account.pepper
  delete account.__v
  delete account._id
  delete account._ac
  delete account._ct
  delete account._ct
  account.pictureUris = {
    l: this.avatarUri(),
    m: this.avatarUri('m'),
    s: this.avatarUri('s'),
    xs: this.avatarUri('xs')
  }

  return account
}

UserSchema.methods.export = function() {
  let exported = this.toObject()
  delete exported.password
  delete exported.ehash
  delete exported.pepper
  delete exported._ac
  delete exported._ct

  return exported
}

UserSchema.methods.updateLoginTime = function(callback) {
  this.set({ time: { login: new Date() } })
  this.save(function(err, user) {
    return callback()
  })
}

UserSchema.methods.avatarName = function(size = 'l') {
  let prefix = size === 'l' ? '' : size + '-'
  if (this.picture.slice(-4).toLowerCase() === '.svg') prefix = ''

  return prefix + this.picture
}

UserSchema.methods.storagePath = function() {
  return path.join(config.storage, 'users', this.handle.substring(0, 1), this.handle)
}

UserSchema.methods.avatarUri = function(size = 'l') {
  if (!this.picture || this.picture.length < 5) return "https://freesewing.org/avatar.svg"
  return (
    config.static +
    '/users/' +
    this.handle.substring(0, 1) +
    '/' +
    this.handle +
    '/' +
    this.avatarName(size)
  )
}

UserSchema.methods.saveAvatar = function(picture) {
  let type = picture.split(';').shift()
  type = type.split('/').pop()
  this.picture = this.handle + '.' + type

  let dir = this.storagePath()
  let b64 = picture.split(';base64,').pop()
  fs.mkdir(dir, { recursive: true }, err => {
    if (err) log.error('mkdirFailed', err)
    let imgBuffer = Buffer.from(b64, 'base64')
    for (let size of Object.keys(config.avatar.sizes)) {
      sharp(imgBuffer)
        .resize(config.avatar.sizes[size], config.avatar.sizes[size])
        .toFile(path.join(dir, this.avatarName(size)), (err, info) => {
          if (err) log.error('avatarNotSaved', err)
        })
    }
  })
}

UserSchema.methods.createAvatar = function() {
  let dir = this.storagePath()
  fs.mkdirSync(dir, { recursive: true }, err => {
    if (err) console.log('mkdirFailed', dir, err)
    fs.writeFileSync(path.join(dir, this.handle) + '.svg', randomAvatar(), err => {
      if (err) console.log('writeFileFailed', dir, err)
    })
  })
}

export default mongoose.model('User', UserSchema)
