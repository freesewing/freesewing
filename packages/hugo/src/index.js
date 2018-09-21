import freesewing from "freesewing";
import brian from "@freesewing/brian";
import pluginBundle from "@freesewing/plugin-bundle";

import config from "../config/config";
import { version } from "../package.json";

import back from "./back";
import front from "./front";
import sleeve from "./sleeve";
import pocket from "./pocket";
import pocketFacing from "./pocketfacing";
import hoodSide from "./hoodside";
import hoodCenter from "./hoodcenter";
import waistband from "./waistband";
import cuff from "./cuff";

var pattern = new freesewing.Pattern({ version: version, ...config }).with(
  pluginBundle
);

pattern.draft = function() {
  // base from Brian
  this.parts.base = this.draftBase(new pattern.Part());
  if (this.needs(["front", "sleeve", "pocket", "pocketFacing"])) {
    this.parts.frontBase = this.draftFrontBase(
      new pattern.Part().copy(this.parts.base)
    );
    this.parts.front = this.draftFront(
      new pattern.Part().copy(this.parts.frontBase)
    );
  }
  if (this.needs(["back", "sleeve"])) {
    this.parts.backBase = this.draftBackBase(
      new pattern.Part().copy(this.parts.base)
    );
    this.parts.back = this.draftBack(
      new pattern.Part().copy(this.parts.backBase)
    );
  }
  if (this.needs(["sleeve"])) {
    let sleevecap = freesewing.patterns.brian.draftSleevecap(
      new pattern.Part()
    );
    this.parts.sleeveBase = this.draftSleeveBase(
      new pattern.Part().copy(sleevecap)
    );
    this.parts.sleeve = this.draftSleeve(
      new pattern.Part().copy(this.parts.sleeveBase)
    );
  }

  if (this.needs(["pocket"])) {
    this.parts.pocket = this.draftPocket(
      new pattern.Part().copy(this.parts.front)
    );
  }
  if (this.needs(["pocketFacing"])) {
    this.parts.pocketFacing = this.draftPocketFacing(
      new pattern.Part().copy(this.parts.pocket)
    );
  }

  if (this.needs(["hoodSide", "hoodCenter"])) {
    this.parts.hoodSide = this.draftHoodSide(new pattern.Part());
  }

  if (this.needs(["hoodCenter"])) {
    this.parts.hoodCenter = this.draftHoodCenter(new pattern.Part());
  }

  if (this.needs(["waistband"])) {
    this.parts.waistband = this.draftWaistband(new pattern.Part());
  }

  if (this.needs(["cuff"])) {
    this.parts.cuff = this.draftCuff(new pattern.Part());
  }

  // Don't render these unless specifically requested
  if (!this.needs("base", true)) this.parts.base.render = false;
  if (!this.needs("frontBase", true)) this.parts.frontBase.render = false;
  if (!this.needs("backBase", true)) this.parts.backBase.render = false;
  if (!this.needs("sleeveBase", true)) this.parts.sleeveBase.render = false;

  return pattern;
};

pattern.draftBase = function(part) {
  let complete = this.settings.complete;
  let paperless = this.settings.paperless;
  this.settings.complete = false;
  this.settings.paperless = false;
  let brianBase = freesewing.patterns.brian.draftBase(part);
  this.settings.complete = complete;
  this.settings.paperless = paperless;

  return brianBase;
};

pattern.draftFrontBase = function(part) {
  let complete = this.settings.complete;
  let paperless = this.settings.paperless;
  this.settings.complete = false;
  this.settings.paperless = false;
  let brianFront = freesewing.patterns.brian.draftFront(part);
  this.settings.complete = complete;
  this.settings.paperless = paperless;

  return brianFront;
};

pattern.draftBackBase = function(part) {
  let complete = this.settings.complete;
  let paperless = this.settings.paperless;
  this.settings.complete = false;
  this.settings.paperless = false;
  let brianBack = freesewing.patterns.brian.draftBack(part);
  this.settings.complete = complete;
  this.settings.paperless = paperless;

  return brianBack;
};

pattern.draftSleeveBase = function(part) {
  let complete = this.settings.complete;
  let paperless = this.settings.paperless;
  this.settings.complete = false;
  this.settings.paperless = false;
  let brianSleeve = freesewing.patterns.brian.draftSleeve(part);
  this.settings.complete = complete;
  this.settings.paperless = paperless;

  return brianSleeve;
};

pattern.draftFront = part => front.draft(part);
pattern.draftBack = part => back.draft(part);
pattern.draftSleeve = part => sleeve.draft(part);
pattern.draftPocket = part => pocket.draft(part);
pattern.draftPocketFacing = part => pocketFacing.draft(part);
pattern.draftHoodSide = part => hoodSide.draft(part);
pattern.draftHoodCenter = part => hoodCenter.draft(part);
pattern.draftWaistband = part => waistband.draft(part);
pattern.draftCuff = part => cuff.draft(part);

export default pattern;
