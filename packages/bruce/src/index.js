import freesewing from "freesewing";
import plugins from "@freesewing/plugin-bundle";
import config from "../config/config";
// Parts
import draftBack from "./back";
import draftSide from "./side";
import draftFront from "./front";
import draftInset from "./inset";

// Constructor
const Bruce = function(settings) {
  freesewing.Pattern.call(this, config);
  this
    .use(plugins)
    .apply(settings);

  return this;
};

// Set up inheritance
Bruce.prototype = Object.create(freesewing.Pattern.prototype);
Bruce.prototype.constructor = Bruce;

// Attach per-part draft methods to prototype
Bruce.prototype.draftBack = part => draftBack(part);
Bruce.prototype.draftSide = part => draftSide(part);
Bruce.prototype.draftInset = part => draftInset(part);
Bruce.prototype.draftFront = part => draftFront(part);

export default Bruce;
