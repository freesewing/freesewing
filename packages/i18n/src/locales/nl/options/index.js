import brian from "./brian.yml";
import aaron from "./aaron.yml";
import bent from "./bent.yml";
import bruce from "./bruce.yml";
import cathrin from "./cathrin.yml";
import hugo from "./hugo.yml";
import simon from "./simon.yml";
import sven from "./sven.yml";
import tamiko from "./tamiko.yml";
import trayvon from "./trayvon.yml";
import wahid from "./wahid.yml";

let patterns = {
  brian,
  aaron,
  bent,
  bruce,
  cathrin,
  hugo,
  simon,
  sven,
  tamiko,
  trayvon,
  wahid
};

let options = {};
let optionInheritance = {};

for (let pattern of Object.keys(patterns)) {
  options[pattern] = {};
  optionInheritance[pattern] = {};
  for (let option of Object.keys(patterns[pattern])) {
    let value = patterns[pattern][option];
    if (typeof value === "object") options[pattern][option] = value;
    else if (typeof value === "string") {
      if (typeof patterns[value][option].title === "undefined")
        throw new Error(
          `Option ${option} in pattern ${pattern} refers to pattern {value}, but it's not there`
        );
      options[pattern][option] = options[value][option];
      optionInheritance[pattern][option] = value;
    }
  }
}

export { options, optionInheritance };
