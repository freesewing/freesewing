import aaron from "@freesewing/aaron";
import brian from "@freesewing/brian";
import bruce from "@freesewing/bruce";
import cathrin from "@freesewing/cathrin";
import hugo from "@freesewing/hugo";
import info from "./info";

export const patterns = {
  aaron,
  brian,
  //  bruce,
  //  cathrin,
  //  hugo,
  Aaron: aaron,
  Brian: brian
  // Bruce: bruce,
  // Cathrin: cathrin,
  // Hugo: hugo
};

//export const patternList = ["aaron", "brian", "bruce", "cathrin", "hugo"];
export const patternList = ["aaron", "brian"];

let list = [];
for (let p of patternList) {
  let pattern = new patterns[p]();
  for (let m of pattern.config.measurements) list.push(m);
  info[p].measurements = pattern.config.measurements;
  info[p].options = [];
  for (let o of Object.keys(pattern.config.options)) {
    if (typeof pattern.config.options[o] === "object") info[p].options.push(o);
  }
}

export const patternInfo = info;

export const measurementList = list.filter(function(value, index, self) {
  return self.indexOf(value) === index;
});
