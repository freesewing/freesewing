import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  user: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true
  },
  page: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
    trim: true
  },
  comment: {
    type: String,
    trim: true
  },
  parent: Number,
  time: Date,
  status: {
    type: String,
    enum: ["active", "removed", "restricted"],
    default: "active"
  }
},{ timestamps: true });

CommentSchema.index({ id: 1, user: 1 , page: 1});

export default mongoose.model('Comment', CommentSchema);
