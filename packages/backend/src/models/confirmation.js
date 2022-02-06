import mongoose, { Schema } from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import encrypt from 'mongoose-encryption'
import config from '../config'

const ConfirmationSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['signup', 'emailchange', 'passwordreset', 'oauth', 'newsletter'],
    required: true
  },
  data: {}
})

ConfirmationSchema.plugin(bcrypt)

ConfirmationSchema.plugin(encrypt, {
  secret: config.encryption.key,
  encryptedFields: ['data'],
  decryptPostSave: false
})

export default mongoose.model('Confirmation', ConfirmationSchema)
