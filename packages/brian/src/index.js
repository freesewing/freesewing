import freesewing from "freesewing";
import pluginBundle from "@freesewing/plugin-bundle";
import config from "../config/config";
import { version } from "../package.json";
// Parts
import draftBase from "./base";
import draftBack from "./back";
import draftFront from "./front";
import draftSleevecap from "./sleevecap";
import draftSleeve from "./sleeve";

// Constructor boilerplate
const Brian = function(settings = false) {
  freesewing.Pattern.call(this, { version: version, ...config });
  this.use(pluginBundle);
  if (settings !== false) this.mergeSettings(settings);

  return this;
};

// Inheritance boilerplate
Brian.prototype = Object.create(freesewing.Pattern.prototype);
Brian.prototype.constructor = Brian;

// Attach per-part draft methods to prototype
Brian.prototype.draftBase = draftBase;
Brian.prototype.draftBack = draftBack;
Brian.prototype.draftFront = draftFront;
Brian.prototype.draftSleevecap = draftSleevecap;
Brian.prototype.draftSleeve = draftSleeve;

export default Brian;
