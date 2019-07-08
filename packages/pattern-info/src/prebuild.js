const path = require("path");
const fse = require("fs-extra");
const patterns = require("@freesewing/patterns");

const patternOptions = config => {
  let all = [];
  let groups = config.optionGroups;
  for (let group of Object.keys(groups)) {
    for (let option of groups[group]) {
      if (typeof option === "string") all.push(option);
      else {
        for (let subgroup of Object.keys(option)) {
          for (let suboption of option[subgroup]) all.push(suboption);
        }
      }
    }
  }

  return all;
};

const patternParts = config => {
  let parts = {};
  if (config.parts) {
    for (let p of config.parts) parts[p] = p;
  }
  if (config.dependencies) {
    for (let p of Object.keys(config.dependencies)) {
      parts[p] = p;
      if (typeof config.dependencies[p] === "string") {
        parts[config.dependencies[p]] = config.dependencies[p];
      } else {
        for (let d of config.dependencies[p]) parts[d] = d;
      }
    }
  }
  if (config.inject) {
    for (let p of Object.keys(config.inject)) {
      parts[p] = p;
      parts[config.inject[p]] = config.inject[p];
    }
  }
  if (config.hide) {
    for (let p of config.hide) delete parts[p];
  }

  return Object.keys(parts);
};

let options = {};
let optionGroups = {};
let parts = {};
let measurements = {};
let versions = {};
for (let pattern of Object.keys(patterns)) {
  //console.log(pattern);
  let instance = new patterns[pattern]();
  let p = pattern.toLowerCase();
  options[p] = patternOptions(instance.config);
  optionGroups[p] = instance.config.optionGroups;
  parts[p] = patternParts(instance.config);
  measurements[p] = instance.config.measurements;
  versions[p] = instance.config.version;
}

fse.writeFileSync(
  path.join(".", "src", "prebuild", "options.js"),
  "module.exports = " + JSON.stringify(options) + "\n"
);
fse.writeFileSync(
  path.join(".", "src", "prebuild", "option-groups.js"),
  "module.exports = " + JSON.stringify(optionGroups) + "\n"
);
fse.writeFileSync(
  path.join(".", "src", "prebuild", "parts.js"),
  "module.exports = " + JSON.stringify(parts) + "\n"
);
fse.writeFileSync(
  path.join(".", "src", "prebuild", "measurements.js"),
  "module.exports = " + JSON.stringify(measurements) + "\n"
);
fse.writeFileSync(
  path.join(".", "src", "prebuild", "versions.js"),
  "module.exports = " + JSON.stringify(versions) + "\n"
);
