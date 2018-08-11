import freesewing from "freesewing";
import pluginCutonfold from "@freesewing/plugin-cutonfold";
import pluginGrainline from "@freesewing/plugin-grainline";
import pluginDimension from "@freesewing/plugin-dimension";
import pluginLogo from "@freesewing/plugin-logo";
import pluginTitle from "@freesewing/plugin-title";

import config from "../config/config";
import { version } from "../package.json";

import base from "./base";
import back from "./back";
import front from "./front";
import sleeve from "./sleeve";

var pattern = new freesewing.Pattern({ version: version, ...config })
  .with(pluginCutonfold)
  .with(pluginGrainline)
  .with(pluginDimension)
  .with(pluginLogo)
  .with(pluginTitle);

pattern.draft = function() {
  pattern.parts.base = this.draftBase();
  pattern.parts.back = this.draftBack();
  pattern.parts.front = this.draftFront();
  pattern.parts.sleeve = this.draftSleeve();

  return pattern;
};

pattern.draftBase = function(pattern = false) {
  if (pattern === false) pattern = this;
  return base.draft(pattern);
};

pattern.draftBack = function(pattern = false) {
  if (pattern === false) pattern = this;
  return back.draft(pattern);
};

pattern.draftFront = function(pattern = false) {
  if (pattern === false) pattern = this;
  return front.draft(pattern);
};

pattern.draftSleeve = function(pattern = false) {
  if (pattern === false) pattern = this;
  return sleeve.draft(pattern);
};
export default pattern;
