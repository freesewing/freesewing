import freesewing from "freesewing";
import pluginBundle from "@freesewing/plugin-bundle";
import config from "../config/config";
import { version } from "../package.json";
import base from "./base";
import back from "./back";
import front from "./front";
import sleevecap from "./sleevecap";
import sleeve from "./sleeve";

export default class Brian extends freesewing.Pattern {
  constructor(settings = false) {
    super({ version: version, ...config }).with(pluginBundle);
    if (settings !== false) {
      for (let key of Object.keys(settings)) {
        this.settings[key] = settings[key];
      }
    }
  }

  _draft() {
    this.parts.base = this.draftBase(this.createPart());
    if (!this.needs("base", true)) this.parts.base.render = false;
    if (this.needs(["back", "front", "sleeve", "sleevecap"])) {
      this.parts.back = this.draftBack(this.createPart().copy(this.parts.base));
    }
    if (this.needs(["front", "sleeve", "sleevecap"])) {
      this.parts.front = this.draftFront(
        this.createPart().copy(this.parts.back)
      );
    }
    if (this.needs(["sleeve", "sleevecap"])) {
      this.parts.sleevecap = this.draftSleevecap(this.createPart());
      // Don't render sleevecap unless specifically requested
      if (!this.needs("sleevecap", true)) this.parts.sleevecap.render = false;
    }
    if (this.needs("sleeve")) {
      this.parts.sleeve = this.draftSleeve(
        this.createPart().copy(this.parts.sleevecap)
      );
    }

    return this;
  }

  draftBase(part) {
    return base.draft(part);
  }
  draftBack(part) {
    return back.draft(part);
  }
  draftFront(part) {
    return front.draft(part);
  }
  draftSleevecap(part) {
    return sleevecap.draft(part);
  }
  draftSleeve(part) {
    return sleeve.draft(part);
  }
}
