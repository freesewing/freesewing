import freesewing from "freesewing";
import cutonfold from "@freesewing/plugin-cutonfold";
import * as plugintitle from "@freesewing/plugin-title";
//import logo from "@freesewing/plugin-logo";
import config from "../config/config";
import back from "./back";
import { version } from "../package.json";
console.log("title is ", plugintitle);
var pattern = new freesewing.pattern({ version: version, ...config })
  .with(cutonfold)
  .with(plugintitle);
//  .with(logo)
//pattern.on("preRenderSvg", function(next) {
//  this.attributes.add(`freesewing:${name}`, version);
//  next();
//});

pattern.draft = function() {
  back.draft(pattern.parts.back);

  return pattern;
};

export default pattern;
