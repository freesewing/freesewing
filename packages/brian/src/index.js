import freesewing from "freesewing";
import plugins from "@freesewing/plugin-bundle";
import config from "../config/config";
// Parts
import draftBase from "./base";
import draftBack from "./back";
import draftFront from "./front";
import draftSleevecap from "./sleevecap";
import draftSleeve from "./sleeve";

// Constructor
const Brian = function(settings) {
  freesewing.Pattern.call(this, config);
  this.use(plugins).apply(settings);

  return this;
};

// Set up inheritance
Brian.prototype = Object.create(freesewing.Pattern.prototype);
Brian.prototype.constructor = Brian;

// Attach per-part draft methods to prototype
Brian.prototype.draftBase = draftBase;
Brian.prototype.draftBack = draftBack;
Brian.prototype.draftFront = draftFront;
Brian.prototype.draftSleevecap = draftSleevecap;
Brian.prototype.draftSleeve = draftSleeve;

export default Brian;
