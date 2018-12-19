import freesewing from "freesewing";
import Brian from "../../brian/dist";
import pluginBundle from "@freesewing/plugin-bundle";
import config from "../config/config";
import { version } from "../package.json";
import draftBack from "./back";
import draftFront from "./front";

const Aaron = function(settings = false) {
  freesewing.Pattern.call(this, { version: version, ...config });
  this.with(pluginBundle);
  if (settings !== false) this.mergeSettings(settings);

  return this;
};

// Setup inheritance
Aaron.prototype = Object.create(freesewing.Pattern.prototype);
Aaron.prototype.constructor = Aaron;

// Per-part draft methods
Aaron.prototype.draftBase = function (part) {
  // Getting the base part from Brian
  return new Brian(this.settings).draftBase(part);
}
Aaron.prototype.draftFront = part => draftFront(part);
Aaron.prototype.draftBack = part => draftBack(part);

export default Aaron;
