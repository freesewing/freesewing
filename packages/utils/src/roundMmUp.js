import smallestImperialStep from "./smallestImperialStep";

const roundMmUp = (val, units) => {
  if (units === "imperial")
    return val - (val % smallestImperialStep);
  else
    return Math.ceil(val * 10) / 10;
};

export default roundMmUp;
