import freesewing from "freesewing";
import plugins from "@freesewing/plugin-bundle";
import buttons from "@freesewing/plugin-buttons";
import bust from "@freesewing/plugin-bust";
import Bent from "@freesewing/bent";
import Carlton from "@freesewing/carlton";
import config from "../config";
// Parts
import draftFront from "./front";
import draftSide from "./side";

// Create new design
const Carlita = new freesewing.Design(config, [plugins, buttons, bust]);

let fromBent = ["Base", "Front", "Back", "Sleeve", "TopSleeve", "UnderSleeve"];

// Attach draft methods from Bent to prototype
for (let m of fromBent) {
  Carlita.prototype["draftBent" + m] = function(part) {
    return new Bent(this.settings)["draft" + m](part);
  };
}

// Attach draft methods from Carlton to prototype
for (let m of [
  "draftBack",
  "draftTail",
  "draftTopSleeve",
  "draftUnderSleeve",
  "draftBelt",
  "draftCollarStand",
  "draftCollar",
  "draftCuffFacing",
  "draftPocket",
  "draftPocketFlap",
  "draftPocketLining",
  "draftChestPocketWelt",
  "draftChestPocketBag",
  "draftInnerPocketWelt",
  "draftInnerPocketBag",
  "draftInnerPocketTab"
]) {
  Carlita.prototype[m] = function(part) {
    return new Carlton(this.settings)[m](part);
  };
}

Carlita.prototype.draftCarltonFront = function(part) {
  return new Carlton(this.settings).draftFront(part);
};

// Attach own draft methods to prototype
Carlita.prototype.draftFront = draftFront;
Carlita.prototype.draftSide = draftSide;

export default Carlita;
