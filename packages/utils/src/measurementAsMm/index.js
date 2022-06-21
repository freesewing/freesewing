const measurementAsMm = (value, units = "metric") => {
  if (typeof value === "number")
    return value * (units === "imperial" ? 25.4 : 10);

  if (value.endsWith('.'))
    return false;

  if (units === "metric") {
    value = Number(value);
    if (isNaN(value)) return false;
    return value * 10;
  } else {
    const imperialFractionToMm = value => {
      let chunks = value.trim().split("/");
      if (chunks.length !== 2 || chunks[1] === "") return false;
      let num = Number(chunks[0]);
      let denom = Number(chunks[1]);
      if (isNaN(num) || isNaN(denom)) return false;
      else return (num * 25.4) / denom;
    };
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
