import freesewing from "freesewing";
import pluginBundle from "@freesewing/plugin-bundle";

import config from "../config/config";
import { version } from "../package.json";

import base from "./base";
import back from "./back";
import front from "./front";
import sleevecap from "./sleevecap";
import sleeve from "./sleeve";

var pattern = new freesewing.Pattern({ version: version, ...config }).with(
  pluginBundle
);

pattern.draft = function() {
  this.parts.base = this.draftBase(new pattern.Part());
  if (!this.needs("base", true)) this.parts.base.render = false;
  if (this.needs(["back", "front", "sleeve", "sleevecap"])) {
    this.parts.back = this.draftBack(new pattern.Part().copy(this.parts.base));
  }
  if (this.needs(["front", "sleeve", "sleevecap"])) {
    this.parts.front = this.draftFront(
      new pattern.Part().copy(this.parts.back)
    );
  }
  if (this.needs(["sleeve", "sleevecap"])) {
    this.parts.sleevecap = this.draftSleevecap(new pattern.Part());
    // Don't render sleevecap unless specifically requested
    if (!this.needs("sleevecap", true)) this.parts.sleevecap.render = false;
  }
  if (this.needs("sleeve")) {
    this.parts.sleeve = this.draftSleeve(
      new pattern.Part().copy(this.parts.sleevecap)
    );
  }

  return pattern;
};

pattern.draftBase = part => base.draft(part);
pattern.draftBack = part => back.draft(part);
pattern.draftFront = part => front.draft(part);
pattern.draftSleevecap = part => sleevecap.draft(part);
pattern.draftSleeve = part => sleeve.draft(part);

export default pattern;
