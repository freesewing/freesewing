import freesewing from "freesewing";
import Brian from "@freesewing/brian";
import pluginBundle from "@freesewing/plugin-bundle";
import config from "../config/config";
import { version } from "../package.json";
import back from "./back";
import front from "./front";

const Aaron = function(settings = false) {
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
Aaron.prototype = Object.create(freesewing.Pattern.prototype);
Aaron.prototype.constructor = Aaron;

// Draft method
Aaron.prototype._draft = function() {
  this.parts.base = this.draftBase(this.createPart());
  if (!this.needs("base", true)) this.parts.base.render = false;
  if (this.needs(["back", "front"])) {
    this.parts.front = this.draftFront(this.createPart().copy(this.parts.base));
  }
  if (this.needs(["back"])) {
    this.parts.back = this.draftBack(this.createPart().copy(this.parts.front));
  }

  return this;
};

// Per-part draft methods
Aaron.prototype.draftBase = function (part)  { return new Brian(this.settings).draftBase(part); }
Aaron.prototype.draftFront = function (part) { return front.draft(part); }
Aaron.prototype.draftBack = function (part)  { return back.draft(part); }

export default Aaron;
