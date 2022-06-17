import mongoose, { Schema } from 'mongoose'
import config from '../config'
import fs from 'fs'
import { log, randomAvatar } from '../utils'
import path from 'path'
import sharp from 'sharp'

const PersonSchema = new Schema(
  {
    handle: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true
    },
    user: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    breasts: {
      type: Boolean,
      default: false
    },
    picture: {
      type: String,
      trim: true,
      default: ''
    },
    units: {
      type: String,
      enum: ['metric', 'imperial'],
      default: 'metric'
    },
    notes: {
      type: String,
      trim: true
    },
    measurements: {
      ankle: Number,
      biceps: Number,
      bustFront: Number,
      bustPointToUnderbust: Number,
      bustSpan: Number,
      chest: Number,
      crossSeam: Number,
      crossSeamFront: Number,
      crotchDepth: Number,
      head: Number,
      heel: Number,
      highBust: Number,
      highBustFront: Number,
      hips: Number,
      hpsToBust: Number,
      hpsToWaistBack: Number,
      hpsToWaistFront: Number,
      inseam: Number,
      knee: Number,
      neck: Number,
      seat: Number,
      seatBack: Number,
      shoulderSlope: Number,
      shoulderToElbow: Number,
      shoulderToShoulder: Number,
      shoulderToWrist: Number,
      underbust: Number,
      upperLeg: Number,
      waist: Number,
      waistBack: Number,
      waistToFloor: Number,
      waistToHips: Number,
      waistToKnee: Number,
      waistToSeat: Number,
      waistToUnderbust: Number,
      waistToUpperLeg: Number,
      wrist: Number,
    },
  },
  { timestamps: true }
)

PersonSchema.index({ user: 1, handle: 1 })

PersonSchema.methods.info = function() {
  let person = this.toObject()
  delete person.__v
  delete person._id
  person.pictureUris = {
    l: this.avatarUri(),
    m: this.avatarUri('m'),
    s: this.avatarUri('s'),
    xs: this.avatarUri('xs')
  }

  return person
}

PersonSchema.methods.avatarName = function(size = 'l') {
  let prefix = size === 'l' ? '' : size + '-'
  if (this.picture.slice(-4).toLowerCase() === '.svg') prefix = ''

  return prefix + this.picture
}

PersonSchema.methods.avatarUri = function(size = 'l') {
  return (
    config.static +
    '/users/' +
    this.user.substring(0, 1) +
    '/' +
    this.user +
    '/people/' +
    this.handle +
    '/' +
    this.avatarName(size)
  )
}

PersonSchema.methods.storagePath = function() {
  return (
    config.storage +
    '/users/' +
    this.user.substring(0, 1) +
    '/' +
    this.user +
    '/people/' +
    this.handle +
    '/'
  )
}

PersonSchema.methods.createAvatar = function() {
  let dir = this.storagePath()
  fs.mkdir(dir, { recursive: true }, err => {
    if (err) console.log('mkdirFailed', dir, err)
    fs.writeFile(path.join(dir, this.handle) + '.svg', randomAvatar(), err => {
      if (err) console.log('writeFileFailed', dir, err)
    })
  })
}

PersonSchema.methods.saveAvatar = function(picture) {
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

export default mongoose.model('Person', PersonSchema)
