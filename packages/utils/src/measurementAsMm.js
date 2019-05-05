const measurementAsMm = (value, units = "metric") => {
  if (typeof value === "number")
    return value * (units === "imperial" ? 25.4 : 10);
  if (units === "metric") {
    value = Number(value);
    if (isNaN(value)) return false;
    return value * (units === "imperial" ? 25.4 : 10);
  } else {
    let chunks = value.split(" ");
    if (chunks.length === 1) {
      let val = chunks[0];
      if (!isNaN(Number(val))) return Number(val) * 25.4;
      else return imperialFractionToMm(val);
    } else if (chunks.length === 2) {
      let inches = Number(chunks[0]);
      if (isNaN(inches)) return false;
      let fraction = imperialFractionToMm(chunks[1]);
      if (fraction === false) return false;
      return inches * 25.4 + fraction;
    }
  }
  return false;
};

export default measurementAsMm;
