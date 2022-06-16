import mongoose, { Schema } from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import encrypt from 'mongoose-encryption'
import config from '../config'

const NewsletterSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
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
  data: {}
})

NewsletterSchema.plugin(bcrypt)

NewsletterSchema.index({ ehash: 1 })

NewsletterSchema.plugin(encrypt, {
  secret: config.encryption.key,
  encryptedFields: ['email'],
  decryptPostSave: false
})

export default mongoose.model('Newsletter', NewsletterSchema)
