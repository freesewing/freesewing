import freesewing from "freesewing";
import pluginBundle from "@freesewing/plugin-bundle";
import config from "../config/config";
import { version } from "../package.json";
import base from "./base";
import back from "./back";
import front from "./front";
import sleevecap from "./sleevecap";
import sleeve from "./sleeve";

// Constructor boilerplate
const Brian = function(settings = false) {
  freesewing.Pattern.call(this, { version: version, ...config });
  this.with(pluginBundle);
  if (settings !== false) this.mergeSettings(settings);

  return this;
};

// Inheritance boilerplate
Brian.prototype = Object.create(freesewing.Pattern.prototype);
Brian.prototype.constructor = Brian;

// Per-part draft methods
Brian.prototype.draftBase = function(part) {
  return base.draft(part);
};
Brian.prototype.draftBack = function(part) {
  return back.draft(part);
};
Brian.prototype.draftFront = function(part) {
  return front.draft(part);
};
Brian.prototype.draftSleevecap = function(part) {
  return sleevecap.draft(part);
};
Brian.prototype.draftSleeve = function(part) {
  return sleeve.draft(part);
};

export default Brian;
