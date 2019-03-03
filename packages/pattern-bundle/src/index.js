import Aaron from "@freesewing/aaron";
import Bent from "@freesewing/bent";
import Brian from "@freesewing/brian";
import Bruce from "@freesewing/bruce";
import Cathrin from "@freesewing/cathrin";
import Huey from "@freesewing/huey";
import Hugo from "@freesewing/hugo";
import Simon from "@freesewing/simon";
import Sven from "@freesewing/sven";
import Tamiko from "@freesewing/tamiko";
import Trayvon from "@freesewing/trayvon";
import Wahid from "@freesewing/wahid";
import info from "./info";

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);
const uncapitalize = string => string.charAt(0).toLowerCase() + string.slice(1);

export const patterns = {
  Aaron,
  Bent,
  Brian,
  Bruce,
  Cathrin,
  Huey,
  Hugo,
  Simon,
  Sven,
  Tamiko,
  Trayvon,
  Wahid
};

export const patternList = Object.keys(patterns).map(p => uncapitalize(p));
let list = [];
for (let p of patternList) {
  let pattern = new patterns[(capitalize(p))]();
  for (let m of pattern.config.measurements) list.push(m);
  info[p].version = pattern.config.version;
  info[p].measurements = pattern.config.measurements;
  info[p].options = [];
  for (let o of Object.keys(pattern.config.options)) {
    if (typeof pattern.config.options[o] === "object") info[p].options.push(o);
  }
  info[p].config = pattern.config;
}

export const patternInfo = info;

export const measurementList = list.filter(function(value, index, self) {
  return self.indexOf(value) === index;
});

export const measurementsForBreasts = ["naturalWaistToUnderbust", "underbust"];
