import mongoose, { Schema } from "mongoose";

const DraftSchema = new Schema({
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
  created: Date,
  notes: {
    type: String,
    trim: true
  },
  gist: {},
},{ timestamps: true });

DraftSchema.index({ user: 1 , handle: 1});

DraftSchema.methods.info = function() {
  return this.toObject();
}

DraftSchema.methods.asGist = function() {
  let draft = this.toObject();
  for(let field of ["_id", "user", "createdAt", "updatedAt", "_v"])
    delete draft[field];

  return draft;
}

export default mongoose.model('Draft', DraftSchema);
