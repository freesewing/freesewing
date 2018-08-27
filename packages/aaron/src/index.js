import freesewing from "freesewing";
import brian from "@freesewing/brian";
import pluginBundle from "@freesewing/plugin-bundle";

import config from "../config/config";
import { version } from "../package.json";

import back from "./back";
import front from "./front";

var pattern = new freesewing.Pattern({ version: version, ...config })
  .with(pluginBundle);

pattern.draft = function() {
  this.parts.base = this.draftBase(new pattern.Part());
  if (!this.needs("base", true)) this.parts.base.render = false;
  if (this.needs(["back", "front"])) {
    this.parts.front = this.draftFront(new pattern.Part().copy(this.parts.base));
  }
  if (this.needs(["back"])) {
    this.parts.back = this.draftBack(new pattern.Part().copy(this.parts.front));
  }

  return pattern;
};

pattern.draftBase = part => freesewing.patterns.brian.draftBase(part);
pattern.draftFront = part => front.draft(part);
pattern.draftBack = part => back.draft(part);

export default pattern;
