import { version } from "../package.json";

export default {
  name: "tamiko",
  version,
  measurements: [
    "shoulderToShoulder",
    "chestCircumference",
    "centerBackNeckToWaist",
    "naturalWaistToHip"
  ],
  parts: ["top"],
  options: {
    armholeDepthFactor: {
      pct: 50,
      min: 40,
      max: 60
    },
    chestEase: {
      pct: 2,
      min: 1,
      max: 20
    },
    flare: {
      deg: 15,
      min: -10,
      max: 30
    },
    lengthBonus: {
      pct: 13,
      min: 0,
      max: 60
    },
    shoulderseamLength: {
      pct: 10,
      min: 5,
      max: 25
    },
    shoulderSlope: {
      deg: 15,
      min: 0,
      max: 25
    }
  }
};
