import mongoose, { Schema } from "mongoose";

const ModelSchema = new Schema({
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
  picture: String,
  units: {
    type: String,
    enum: ["metric", "imperial"],
    default: "metric"
  },
  created: Date,
  notes: {
    type: String,
    trim: true
  },
  measurements: {
    acrossBack: Number,
    bicepsCircumference: Number,
    bustSpan: Number,
    centerBackNeckToWaist: Number,
    chestCircumference: Number,
    headCircumference: Number,
    highBust: Number,
    highPointShoulderToBust: Number,
    hipsCircumference: Number,
    hipsToUpperLeg: Number,
    inseam: Number,
    naturalWaist: Number,
    naturalWaistToFloor: Number,
    naturalWaistToHip: Number,
    naturalWaistToKnee: Number,
    naturalWaistToSeat: Number,
    naturalWaistToUnderbust: Number,
    neckCircumference: Number,
    seatCircumference: Number,
    seatDepth: Number,
    shoulderSlope: Number,
    shoulderToElbow: Number,
    shoulderToShoulder: Number,
    shoulderToWrist: Number,
    underBust: Number,
    upperLegCircumference: Number,
    wristCircumference: Number
  }
},{ timestamps: true });

ModelSchema.index({ user: 1 , handle: 1});

export default mongoose.model('Model', ModelSchema);
