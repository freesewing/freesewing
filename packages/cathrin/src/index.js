import freesewing from "freesewing";
import pluginBundle from "@freesewing/plugin-bundle";
import config from "../config/config";
import { version } from "../package.json";
//Parts
import draftBase from "./base";
import draftPanels from "./panels";
import draftPanel1 from "./panel1";
import draftPanel2 from "./panel2";
import draftPanel3 from "./panel3";
import draftPanel4 from "./panel4";
import draftPanel5 from "./panel5";
import draftPanel6 from "./panel6";

// Constructor boilerplate
const Cathrin = function(settings = false) {
  freesewing.Pattern.call(this, { version: version, ...config });
  this.with(pluginBundle);
  if (settings !== false) this.mergeSettings(settings);

  return this;
};

// Inheritance boilerplate
Cathrin.prototype = Object.create(freesewing.Pattern.prototype);
Cathrin.prototype.constructor = Cathrin;

// Attach per-part draft methods to prototype
Cathrin.prototype.draftBase = draftBase;
Cathrin.prototype.draftPanels = draftPanels;
Cathrin.prototype.draftPanel1 = draftPanel1;
Cathrin.prototype.draftPanel2 = draftPanel2;
Cathrin.prototype.draftPanel3 = draftPanel3;
Cathrin.prototype.draftPanel4 = draftPanel4;
Cathrin.prototype.draftPanel5 = draftPanel5;
Cathrin.prototype.draftPanel6 = draftPanel6;

export default Cathrin;
