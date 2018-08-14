import freesewing from "freesewing";
import pluginBundle from "@freesewing/plugin-bundle";

import config from "../config/config";
import { version } from "../package.json";

import pointAttr from "./point.attr";
import pointDist from "./point.dist";
import pointDx from "./point.dx";
import pointDy from "./point.dy";
import pointAngle from "./point.angle";
import pointRotate from "./point.rotate";
import pointCopy from "./point.copy";
import pointFlipX from "./point.flipx";
import pointFlipY from "./point.flipy";
import pointShift from "./point.shift";
import pointShiftTowards from "./point.shifttowards";
import pointShiftFractionTowards from "./point.shiftfractiontowards";
import pointShiftOutwards from "./point.shiftoutwards";
import pointSitsOn from "./point.sitson";
import pointClone from "./point.clone";

import pathOps from "./path.ops";
import pathAttr from "./path.attr";
import pathOffset from "./path.offset";
import pathLength from "./path.length";
import pathStart from "./path.start";
import pathEnd from "./path.end";
import pathClone from "./path.clone";
import pathJoin from "./path.join";
import pathReverse from "./path.reverse";
import pathShiftAlong from "./path.shiftalong";
import pathShiftFractionAlong from "./path.shiftfractionalong";

import utilsLinesCross from "./utils.linescross";
import utilsBeamsCross from "./utils.beamscross";
import utilsBeamCrossesX from "./utils.beamcrossesx";
import utilsBeamCrossesY from "./utils.beamcrossesy";

var pattern = new freesewing.Pattern({ version: version, ...config }).with(
  pluginBundle
);

pattern.draft = function() {
  this.parts.pointAttr = this.draftPointAttr(new pattern.Part());
  this.parts.pointDist = this.draftPointDist(new pattern.Part());
  this.parts.pointDx = this.draftPointDx(new pattern.Part());
  this.parts.pointDy = this.draftPointDy(new pattern.Part());
  this.parts.pointAngle = this.draftPointAngle(new pattern.Part());
  this.parts.pointRotate = this.draftPointRotate(new pattern.Part());
  this.parts.pointCopy = this.draftPointCopy(new pattern.Part());
  this.parts.pointFlipX = this.draftPointFlipX(new pattern.Part());
  this.parts.pointFlipY = this.draftPointFlipY(new pattern.Part());
  this.parts.pointShift = this.draftPointShift(new pattern.Part());
  this.parts.pointShiftTowards = this.draftPointShiftTowards(new pattern.Part());
  this.parts.pointShiftFractionTowards = this.draftPointShiftFractionTowards(new pattern.Part());
  this.parts.pointShiftOutwards = this.draftPointShiftOutwards(new pattern.Part());
  this.parts.pointSitsOn = this.draftPointSitsOn(new pattern.Part());
  this.parts.pointClone = this.draftPointClone(new pattern.Part());

  this.parts.pathOps = this.draftPathOps(new pattern.Part());
  this.parts.pathAttr = this.draftPathAttr(new pattern.Part());
  this.parts.pathOffset = this.draftPathOffset(new pattern.Part());
  this.parts.pathLength = this.draftPathLength(new pattern.Part());
  this.parts.pathStart = this.draftPathStart(new pattern.Part());
  this.parts.pathEnd = this.draftPathEnd(new pattern.Part());
  this.parts.pathClone = this.draftPathClone(new pattern.Part());
  this.parts.pathJoin = this.draftPathJoin(new pattern.Part());
  this.parts.pathReverse = this.draftPathReverse(new pattern.Part());
  this.parts.pathShiftAlong = this.draftPathShiftAlong(new pattern.Part());
  this.parts.pathShiftFractionAlong = this.draftPathShiftFractionAlong(new pattern.Part());

  this.parts.utilsLinesCross = this.draftUtilsLinesCross(new pattern.Part());
  this.parts.utilsBeamsCross = this.draftUtilsBeamsCross(new pattern.Part());
  this.parts.utilsBeamCrossesX = this.draftUtilsBeamCrossesX(new pattern.Part());
  this.parts.utilsbeamCrossesY = this.draftUtilsBeamCrossesY(new pattern.Part());

  return pattern;
};

pattern.draftPointAttr = part => pointAttr.draft(part);
pattern.draftPointDist = part => pointDist.draft(part);
pattern.draftPointDx = part => pointDx.draft(part);
pattern.draftPointDy = part => pointDy.draft(part);
pattern.draftPointAngle = part => pointAngle.draft(part);
pattern.draftPointRotate = part => pointRotate.draft(part);
pattern.draftPointCopy = part => pointCopy.draft(part);
pattern.draftPointFlipX = part => pointFlipX.draft(part);
pattern.draftPointFlipY = part => pointFlipY.draft(part);
pattern.draftPointShift = part => pointShift.draft(part);
pattern.draftPointShiftTowards = part => pointShiftTowards.draft(part);
pattern.draftPointShiftFractionTowards = part => pointShiftFractionTowards.draft(part);
pattern.draftPointShiftOutwards = part => pointShiftOutwards.draft(part);
pattern.draftPointSitsOn = part => pointSitsOn.draft(part);
pattern.draftPointClone = part => pointClone.draft(part);

pattern.draftPathOps = part => pathOps.draft(part);
pattern.draftPathAttr = part => pathAttr.draft(part);
pattern.draftPathOffset = part => pathOffset.draft(part);
pattern.draftPathLength = part => pathLength.draft(part);
pattern.draftPathStart = part => pathStart.draft(part);
pattern.draftPathEnd = part => pathEnd.draft(part);
pattern.draftPathClone = part => pathClone.draft(part);
pattern.draftPathJoin = part => pathJoin.draft(part);
pattern.draftPathReverse = part => pathReverse.draft(part);
pattern.draftPathShiftAlong = part => pathShiftAlong.draft(part);
pattern.draftPathShiftFractionAlong = part => pathShiftFractionAlong.draft(part);

pattern.draftUtilsLinesCross = part => utilsLinesCross.draft(part);
pattern.draftUtilsBeamsCross = part => utilsBeamsCross.draft(part);
pattern.draftUtilsBeamCrossesX = part => utilsBeamCrossesX.draft(part);
pattern.draftUtilsBeamCrossesY = part => utilsBeamCrossesY.draft(part);

// Add custom snippet
pattern.on('preRender', function(next) {
  this.defs += `
<g id="x">
  <path d="M -1.1 -1.1 L 1.1 1.1 M 1.1 -1.1 L -1.1 1.1" class="note"></path>
  <circle cy="0" cx="0" r="1.8" class="note"></circle>
</g>
`;
  next();

});

export default pattern;
