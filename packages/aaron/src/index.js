import freesewing from "freesewing";
import Brian from "../../brian/dist";
import plugins from "@freesewing/plugin-bundle";
import config from "../config";
// Parts
import draftBack from "./back";
import draftFront from "./front";

// Create pattern
const Aaron = freesewing.create(config, plugins);

// Per-part draft methods
Aaron.prototype.draftBase = function (part) {
  // Getting the base part from Brian
  return new Brian(this.settings).draftBase(part);
}
Aaron.prototype.draftFront = part => draftFront(part);
Aaron.prototype.draftBack = part => draftBack(part);

export default Aaron;
