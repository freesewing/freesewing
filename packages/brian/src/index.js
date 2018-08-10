import freesewing from "freesewing";
import pluginCutonfold from "@freesewing/plugin-cutonfold";
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

pattern.draftBase = function() {
  return base.draft(this);
};

pattern.draftBack = function() {
  return back.draft(this);
};

pattern.draftFront = function() {
  return front.draft(this);
};

pattern.draftSleeve = function() {
  return sleeve.draft(this);
};
export default pattern;
