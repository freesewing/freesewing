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
    lengthBonus: {
      pct: 0,
      min: -20,
      max: 60
    }
  }
};
