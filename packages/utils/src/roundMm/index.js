const roundMm = (val, units) => {
  if (units === "imperial") return Math.round(val * 1000000) / 1000000;
  else return Math.round(val * 10) / 10;
};

export default roundMm;
