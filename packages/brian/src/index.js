import freesewing from "freesewing";
import pluginBundle from "@freesewing/plugin-bundle";
import config from "../config/config";
import { version } from "../package.json";
import base from "./base";
import back from "./back";
import front from "./front";
import sleevecap from "./sleevecap";
import sleeve from "./sleeve";

const Brian = function(settings = false) {
  // Make this a new freesewing.Pattern instance
  freesewing.Pattern.call(this, { version: version, ...config });
  // Load plugins
  this.with(pluginBundle);
  // Inject settings passed to the constructor
  if (settings !== false) {
    for (let key of Object.keys(settings)) {
      this.settings[key] = settings[key];
    }
  }

  return this;
};

// Setup inheritance
Brian.prototype = Object.create(freesewing.Pattern.prototype);
Brian.prototype.constructor = Brian;

// Draft method
Brian.prototype._draft = function() {
  this.parts.base = this.draftBase(this.createPart());
  if (!this.needs("base", true)) this.parts.base.render = false;
  if (this.needs(["back", "front", "sleeve", "sleevecap"])) {
    this.parts.back = this.draftBack(this.createPart().copy(this.parts.base));
  }
  if (this.needs(["front", "sleeve", "sleevecap"])) {
    this.parts.front = this.draftFront(this.createPart().copy(this.parts.back));
  }
  if (this.needs(["sleeve", "sleevecap"])) {
    this.parts.sleevecap = this.draftSleevecap(this.createPart());
    // Don't render sleevecap unless specifically requested
    if (!this.needs("sleevecap", true)) this.parts.sleevecap.render = false;
  }
  if (this.needs("sleeve")) {
    this.parts.sleeve = this.draftSleeve(
      this.createPart().copy(this.parts.sleevecap)
    );
  }

  return this;
};

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
