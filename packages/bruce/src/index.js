import freesewing from "freesewing";
import pluginBundle from "@freesewing/plugin-bundle";

import config from "../config/config";
import { version } from "../package.json";

import back from "./back";
import side from "./side";
import front from "./front";
import inset from "./inset";

var pattern = new freesewing.Pattern({ version: version, ...config }).with(
  pluginBundle
);

pattern.draft = function() {
  if(this.needs(['back', 'side', 'front'])) this.parts.back = this.draftBack(new pattern.Part());
  if(this.needs('side')) this.parts.side = this.draftSide(new pattern.Part());
  if(this.needs(['inset','front'])) this.parts.inset = this.draftInset(new pattern.Part());

  if(this.needs(['front'])) this.parts.front = this.draftFront(new pattern.Part());
  // Reset store to prevent sampling re-using the same values
  pattern.store.set('init', false);

  return pattern;
};

pattern.draftBack = part => back.draft(part);
pattern.draftSide = part => side.draft(part);
pattern.draftInset = part => inset.draft(part);


pattern.draftFront = part => front.draft(part);

export default pattern;
