import smallestImperialStep from "../smallestImperialStep";

const roundMmDown = (val, units) => {
  if (units === "imperial") return val - (val % smallestImperialStep);
  else return Math.floor(val * 10) / 10;
};

export default roundMmDown;
