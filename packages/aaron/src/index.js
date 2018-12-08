import freesewing from "freesewing";
import Brian from "@freesewing/brian";
import pluginBundle from "@freesewing/plugin-bundle";

import config from "../config/config";
import { version } from "../package.json";

import back from "./back";
import front from "./front";

export default class Aaron extends freesewing.Pattern {

  constructor(settings = false) {
    super({ version: version, ...config }).with(pluginBundle);
    if(settings !== false) {
      for (let key of Object.keys(settings)) this.settings[key] = settings[key];
    }
    this.Part.prototype.context = this.context;
  }

  _draft() {
    this.parts.base = this.draftBase(this.createPart());
    if (!this.needs("base", true)) this.parts.base.render = false;
    if (this.needs(["back", "front"])) {
      this.parts.front = this.draftFront(this.createPart().copy(this.parts.base));
    }
    if (this.needs(["back"])) {
      this.parts.back = this.draftBack(this.createPart().copy(this.parts.front));
    }

    return this;
  };

  draftBase(part)  { return new Brian(this.settings).draftBase(part); }
  draftFront(part) { return front.draft(part); }
  draftBack(part)  { return back.draft(part); }
}
