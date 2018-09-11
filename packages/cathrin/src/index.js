import freesewing from "freesewing";
import pluginBundle from "@freesewing/plugin-bundle";

import config from "../config/config";
import { version } from "../package.json";

import base from "./base";
import panels from "./panels";

import panel1 from "./panel1";
import panel2 from "./panel2";
import panel3 from "./panel3";
import panel4 from "./panel4";
import panel5 from "./panel5";
import panel6 from "./panel6";

//import corset from "./corset";

var pattern = new freesewing.Pattern({ version: version, ...config })
  .with(pluginBundle);

pattern.draft = function() {
  this.parts.base = this.draftBase(new pattern.Part());
  if (!this.needs("base", true)) this.parts.base.render = false;

  if(this.needs("panels")) this.parts.panels = this.draftPanels(new pattern.Part().copy(this.parts.base));
  if (!this.needs("panels", true)) this.parts.panels.render = false;

  if (this.needs("panel1"))
    this.parts.panel1 = this.draftPanel1(new pattern.Part().copy(this.parts.panels));

  if (this.needs("panel2"))
    this.parts.panel2 = this.draftPanel2(new pattern.Part().copy(this.parts.panels));

  if (this.needs("panel3"))
    this.parts.panel3 = this.draftPanel3(new pattern.Part().copy(this.parts.panels));

  if (this.needs("panel4"))
    this.parts.panel4 = this.draftPanel4(new pattern.Part().copy(this.parts.panels));

  if (this.needs("panel5"))
    this.parts.panel5 = this.draftPanel5(new pattern.Part().copy(this.parts.panels));

  if (this.needs("panel6"))
    this.parts.panel6 = this.draftPanel6(new pattern.Part().copy(this.parts.panels));

  return pattern;
};

pattern.draftBase = part => base.draft(part);
pattern.draftPanels = part => panels.draft(part);
pattern.draftPanel1 = part => panel1.draft(part);
pattern.draftPanel2 = part => panel2.draft(part);
pattern.draftPanel3 = part => panel3.draft(part);
pattern.draftPanel4 = part => panel4.draft(part);
pattern.draftPanel5 = part => panel5.draft(part);
pattern.draftPanel6 = part => panel6.draft(part);

export default pattern;
