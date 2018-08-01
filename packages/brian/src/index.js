import freesewing from "freesewing";
import cutonfold from "@freesewing/plugin-cutonfold";
import title from "@freesewing/plugin-title";
import logo from "@freesewing/plugin-logo";
import dimension from "@freesewing/plugin-dimension";
import config from "../config/config";
import back from "./back";
import { version } from "../package.json";

var pattern = new freesewing.pattern({ version: version, ...config })
  .with(cutonfold)
  .with(title)
  .with(logo)
  .with(dimension);

pattern.draft = function() {
  back.draft(pattern.parts.back);

  return pattern;
};

export default pattern;
