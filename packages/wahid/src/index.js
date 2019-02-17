import freesewing from "freesewing";
import Brian from "@freesewing/brian";
import plugins from "@freesewing/plugin-bundle";
import round from "@freesewing/plugin-round";
import buttons from "@freesewing/plugin-buttons";
import config from "../config";
// Parts
import draftFront from "./front";

// Create pattern
const Wahid = new freesewing.Design(config, [plugins, round, buttons]);

// Parts we're getting from Brian
Wahid.prototype.draftBase = function(part) {
  return new Brian(this.settings).draftBase(part);
};
Wahid.prototype.draftBackBlock = function(part) {
  return new Brian(this.settings).draftBack(part);
};
Wahid.prototype.draftFrontBlock = function(part) {
  return new Brian(this.settings).draftFront(part);
};

// Per-part draft methods
Wahid.prototype.draftFront = part => draftFront(part);

export default Wahid;
