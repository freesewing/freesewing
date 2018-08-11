import freesewing from "freesewing";
import pluginBundle from "@freesewing/plugin-bundle";

import config from "../config/config";
import { version } from "../package.json";

import base from "./base";
import back from "./back";
import front from "./front";
import sleeve from "./sleeve";

var pattern = new freesewing.Pattern({ version: version, ...config }).with(
  pluginBundle
);

pattern.draft = function() {
  this.parts.base = this.draftBase(new pattern.Part());
  this.parts.back = this.draftBack(new pattern.Part().copy(this.parts.base));
  this.parts.front = this.draftFront(new pattern.Part().copy(this.parts.back));
  this.parts.sleeve = this.draftSleeve(new pattern.Part());

  return pattern;
};

pattern.draftBase = part => base.draft(part);
pattern.draftBack = part => back.draft(part);
pattern.draftFront = part => front.draft(part);
pattern.draftSleeve = part => sleeve.draft(part);

export default pattern;
