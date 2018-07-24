import * as freesewing from "freesewing";
import * as cutonfold from "@freesewing-plugins/macro-cutonfold";
import { config } from "../config/config";
import back from "./back";
import { version } from "../package.json";

var brian = new freesewing.pattern(config).with(cutonfold);
brian.on("preRenderSvg", function(next) {
  this.attributes.add("freesewing:brian", version);
  next();
});

brian.draft = function() {
  back.draft(brian.parts.back, brian.context);

  return brian;
};

export default brian;
