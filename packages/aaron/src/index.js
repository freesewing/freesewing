import freesewing from "freesewing";
import Brian from "../../brian/dist";
import plugins from "@freesewing/plugin-bundle";
import config from "../config";
// Parts
import draftBack from "./back";
import draftFront from "./front";

const Aaron = function(settings) {
  freesewing.Pattern.call(this, config);
  this
    .use(plugins)
    .apply(settings);

  return this;
};

// Set up inheritance
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
