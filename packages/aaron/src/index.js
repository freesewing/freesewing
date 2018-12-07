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
  }

  _draft() {
    this.parts.base = this.draftBase(new this.Part());
    if (!this.needs("base", true)) this.parts.base.render = false;
    if (this.needs(["back", "front"])) {
      this.parts.front = this.draftFront(new this.Part().copy(this.parts.base));
    }
    if (this.needs(["back"])) {
      this.parts.back = this.draftBack(new this.Part().copy(this.parts.front));
    }

    return this;
  };

  draftBase(part)  { return new Brian(this.settings).draftBase(part); }
  draftFront(part) { return front.draft(part); }
  draftBack(part)  { return back.draft(part); }
}
