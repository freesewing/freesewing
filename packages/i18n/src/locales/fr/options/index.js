import brian from "./brian.yml";
import aaron from "./aaron.yml";
import bruce from "./bruce.yml";
import cathrin from "./cathrin.yml";
import hugo from "./hugo.yml";
import simon from "./simon.yml";

let patterns = {
  brian,
  aaron,
  bruce,
  cathrin,
  hugo,
  simon
};

let options = {};

for (let pattern of Object.keys(patterns)) {
  options[pattern] = {};
  for (let option of Object.keys(patterns[pattern])) {
    let value = patterns[pattern][option];
    if (typeof value === "object") options[pattern][option] = value;
    else if (typeof value === "string") {
      if (typeof patterns[value][option].title === "undefined")
        throw new Error(
          `Option ${option} in pattern ${pattern} refers to pattern {value}, but it's not there`
        );
      options[pattern][option] = options[value][option];
    }
  }
}

export default options;
