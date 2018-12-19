import freesewing from "freesewing";
import pluginBundle from "@freesewing/plugin-bundle";
import config from "../config/config";
import { version } from "../package.json";
// Parts
import draftBack from "./back";
import draftSide from "./side";
import draftFront from "./front";
import draftInset from "./inset";

// Constructor boilerplate
const Bruce = function(settings = false) {
  freesewing.Pattern.call(this, { version: version, ...config });
  this.with(pluginBundle);
  if (settings !== false) this.mergeSettings(settings);

  return this;
};

// Inheritance boilerplate
Bruce.prototype = Object.create(freesewing.Pattern.prototype);
Bruce.prototype.constructor = Bruce;


// Attach per-part draft methods to prototype
Bruce.prototype.draftBack = part => draftBack(part);
Bruce.prototype.draftSide = part => draftSide(part);
Bruce.prototype.draftInset = part => draftInset(part);
Bruce.prototype.draftFront = part => draftFront(part);

export default Bruce;
