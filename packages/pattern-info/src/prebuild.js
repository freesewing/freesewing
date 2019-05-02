const path = require("path");
const fse = require("fs-extra");
const patterns = require("@freesewing/patterns");

const patternOptions = pattern => {
  let all = [];
  let groups = pattern.optionGroups;
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

let options = {};
let optionGroups = {};
let versions = {};
for (let pattern of Object.keys(patterns)) {
  let instance = new patterns[pattern]();
  let p = pattern.toLowerCase();
  options[p] = patternOptions(instance.config);
  optionGroups[p] = instance.config.optionGroups;
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
  path.join(".", "src", "prebuild", "versions.js"),
  "module.exports = " + JSON.stringify(versions) + "\n"
);
