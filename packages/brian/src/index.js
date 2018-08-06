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
  pattern.parts.base = base.draft(pattern);
  pattern.parts.back = back.draft(pattern);
  pattern.parts.front = front.draft(pattern);
  pattern.parts.sleeve = sleeve.draft(pattern);

  return pattern;
};

export default pattern;
