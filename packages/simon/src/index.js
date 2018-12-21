import freesewing from "freesewing";
import Brian from "@freesewing/brian";
import pluginBundle from "@freesewing/plugin-bundle";
import config from "../config/config";
import { version } from "../package.json";
// Parts
import draftBack from "./back";
import draftFront from "./front";
//import draftSleevecap from "./sleevecap";
//import draftSleeve from "./sleeve";
//    backBlock: ".Back block"
//    frontBlock: ".Front block"
//    sleeveBlock: ".Sleeve block"
//    block: ".Block"
//    frontAndBackBlock: ".Front and back block"
//    frontRight: "Front right"
//    frontLeft: "Front left"
//    buttonPlacket: "Button placket."
//    buttonholePlacket: "Buttonhole placket."
//    yoke: "Yoke"
//    back: "Back"
//    sleeve: "Sleeve"
//    collarStand: "Collar stand"
//    collar: "Collar"
//    undercollar: "Undercollar"
//    sleevePlacketUnderlap: "Sleeve placket underlap"
//    sleevePlacketOverlap: "Sleeve placket overlap"
//    barrelCuff: "Barrel cuff"
//    frenchCuff: "French cuff"

// Constructor boilerplate
const Simon = function(settings = false) {
  freesewing.Pattern.call(this, { version: version, ...config });
  this.with(pluginBundle);
  if (settings !== false) this.mergeSettings(settings);

  return this;
};

// Inheritance boilerplate
Simon.prototype = Object.create(freesewing.Pattern.prototype);
Simon.prototype.constructor = Simon;

// Attach per-part draft methods to prototype
Simon.prototype.draftBase = function (part) {
  return new Brian(this.settings).draftBase(part);
}
Simon.prototype.draftFrontBase = function (part) {
  return new Brian(this.settings).draftFront(part);
}
Simon.prototype.draftBackBase = function (part) {
  return new Brian(this.settings).draftBack(part);
}
Simon.prototype.draftBack = draftBack;
Simon.prototype.draftFront = draftFront;



//Brian.prototype.draftFront = draftFront;
//Brian.prototype.draftSleevecap = draftSleevecap;
//Brian.prototype.draftSleeve = draftSleeve;

export default Simon;
