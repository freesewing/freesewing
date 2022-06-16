import mongoose, { Schema } from 'mongoose'

const PatternSchema = new Schema(
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
    person: {
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
    created: Date,
    notes: {
      type: String,
      trim: true
    },
    data: {}
  },
  { timestamps: true }
)

PatternSchema.index({ user: 1, handle: 1 })

PatternSchema.methods.info = function() {
  return this.toObject()
}

PatternSchema.methods.export = function() {
  let pattern = this.toObject()
  for (let field of ['__v', '_id', '_v', 'created']) delete pattern[field]

  return pattern
}

PatternSchema.methods.anonymize = function() {
  let pattern = this.toObject()
  for (let field of ['__v', '_id', 'user', 'createdAt', 'updatedAt', '_v']) delete pattern[field]

  return pattern
}

export default mongoose.model('Pattern', PatternSchema)
