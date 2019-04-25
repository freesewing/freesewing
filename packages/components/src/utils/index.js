// Needed to use JSX
import React from "react";

export const smallestImperialStep = 0.396875;

export const roundMm = (val, units) => {
  if (units === "imperial") return Math.round(val * 1000000) / 1000000;
  else return Math.round(val * 10) / 10;
};

export const roundMmDown = (val, units) => {
  if (units === "imperial") return val - (val % smallestImperialStep);
  else return Math.floor(val * 10) / 10;
};

export const roundMmUp = (val, units) => {
  if (units === "imperial") return val - (val % 0.396875);
  else return Math.ceil(val * 10) / 10;
};

const formatImperial = (
  neg,
  inch,
  numo = false,
  deno = false,
  format = "html"
) => {
  if (format === "html") {
    if (numo)
      return (
        <span>
          {neg}
          {inch} <sup>{numo}</sup>/<sub>{deno}</sub>"
        </span>
      );
    else
      return (
        <span>
          {neg}
          {inch}"
        </span>
      );
  } else {
    if (numo) return neg + inch;
    else return neg + inch + " " + numo + "/" + deno;
  }
};

export const formatMm = (val, units, format = "html") => {
  val = roundMm(val);
  let H = format === "html" ? true : false;
  if (units === "imperial") {
    if (val == 0) return formatImperial("", 0, false, false, format);
    let negative = "";
    let inches = "";
    let rest = "";
    let fraction = val / 25.4;
    if (fraction < 0) {
      fraction = fraction * -1;
      negative = "-";
    }
    if (Math.abs(fraction) < 1) rest = fraction;
    else {
      inches = Math.floor(fraction);
      rest = fraction - inches;
    }
    let fraction128 = Math.round(rest * 128);
    if (fraction128 == 0) return formatImperial(negative, inches);
    if (fraction128 % 64 == 0)
      return formatImperial(negative, inches, fraction128 / 64, 2);
    if (fraction128 % 32 == 0)
      return formatImperial(negative, inches, fraction128 / 32, 4);
    if (fraction128 % 16 == 0)
      return formatImperial(negative, inches, fraction128 / 16, 8);
    if (fraction128 % 8 == 0)
      return formatImperial(negative, inches, fraction128 / 8, 16);
    if (fraction128 % 4 == 0)
      return formatImperial(negative, inches, fraction128 / 4, 32);
    if (fraction128 % 2 == 0)
      return formatImperial(negative, inches, fraction128 / 2, 64);
    return negative + fraction;
  } else {
    if (format === "html") return roundMm(val / 10) + "cm";
    else return roundMm(val / 10);
  }
};

export const defaultSa = {
  imperial: 15.875,
  metric: 10
};

export const sliderStep = {
  metric: 0.1,
  imperial: 0.396875
};

export const optionType = option => {
  if (typeof option === "object") {
    if (typeof option.pct !== "undefined") return "pct";
    if (typeof option.mm !== "undefined") return "mm";
    if (typeof option.deg !== "undefined") return "deg";
    if (typeof option.count !== "undefined") return "count";
    if (typeof option.bool !== "undefined") return "bool";
    if (typeof option.list !== "undefined") return "list";
    return "unknown";
  }

  return "constant";
};

export const defaultGist = {
  settings: {
    embed: true,
    sa: 0,
    complete: true,
    paperless: false,
    locale: "en",
    units: "metric",
    margin: 2,
    options: {}
  }
};

export const gistDefaults = (config, gist = { settings: {} }) => {
  let options = {};
  for (let option of Object.keys(config.options)) {
    if (
      typeof gist.options !== "undefined" &&
      typeof gist.options[option] !== undefined
    )
      options[option] = gist.options[option];
    else options[option] = optionDefault(config.options[option]);
  }
  delete gist.options;
  let settings = JSON.parse(JSON.stringify(defaultGist.settings));
  delete settings.locale;
  delete settings.units;
  for (let setting of Object.keys(settings)) {
    if (typeof gist.settings[setting] !== "undefined") {
      settings[setting] = gist.settings[setting];
    }
  }
  settings.options = options;

  return settings;
};

export const optionDefault = option => {
  let type = optionType(option);
  switch (optionType(option)) {
    case "constant":
      return option;
      break;
    case "list":
      return option.dflt;
      break;
    default:
      return option[type];
  }
};
