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

var pattern = new freesewing.Pattern({ version: version, ...config })
  .with(pluginCutonfold)
  .with(pluginDimension)
  .with(pluginLogo)
  .with(pluginTitle);

pattern.draft = function() {
  pattern.parts.base = base.draft(pattern);
  pattern.parts.back = back.draft(pattern);
  pattern.parts.front = front.draft(pattern);
  // Clone back
  //pattern.parts.front = pattern.parts.back.clone(pattern.parts.front.id);
  // Draft front
  //front.draft(pattern.parts.front);

  return pattern;
};

export default pattern;
