import freesewing from "freesewing";
import cutonfold from "@freesewing/plugin-cutonfold";
import title from "@freesewing/plugin-title";
import logo from "@freesewing/plugin-logo";
import config from "../config/config";
import back from "./back";
import { version } from "../package.json";
console.log("logo is", logo);
var pattern = new freesewing.pattern({ version: version, ...config })
  .with(cutonfold)
  .with(title)
  .with(logo);
//pattern.on("preRenderSvg", function(next) {
//  this.attributes.add(`freesewing:${name}`, version);
//  next();
//});

pattern.draft = function() {
  back.draft(pattern.parts.back);

  return pattern;
};

module.exports = pattern;
