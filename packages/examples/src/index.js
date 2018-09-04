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
import pathEdge from "./path.edge";
import pathTrim from "./path.trim";
import pathIntersectsX from "./path.intersectsx";
import pathIntersectsY from "./path.intersectsy";
import pathIntersects from "./path.intersects";
import pathDivide from "./path.divide";
import pathSplit from "./path.split";

import utilsLinesIntersect from "./utils.linesintersect";
import utilsBeamsIntersect from "./utils.beamsintersect";
import utilsBeamIntersectsX from "./utils.beamintersectsx";
import utilsBeamIntersectsY from "./utils.beamintersectsy";
import utilsLineIntersectsCurve from "./utils.lineintersectscurve";
import utilsCurvesIntersect from "./utils.curvesintersect";
import utilsPointOnBeam from "./utils.pointonbeam";
import utilsPointOnLine from "./utils.pointonline";
import utilsPointOnCurve from "./utils.pointoncurve";
import utilsCirclesIntersect from "./utils.circlesintersect";
import utilsBeamIntersectsCircle from "./utils.beamintersectscircle";
import utilsLineIntersectsCircle from "./utils.lineintersectscircle";

import pluginGrainline from "./plugin.grainline";
import pluginCutonfold from "./plugin.cutonfold";
import pluginDimension from "./plugin.dimension";
import pluginLogo from "./plugin.logo";
import pluginTitle from "./plugin.title";
import pluginScalebox from "./plugin.scalebox";

import settingsSa from "./settings.sa";

var pattern = new freesewing.Pattern({ version: version, ...config }).with(
  pluginBundle
);

pattern.draft = function() {
  if (this.needs('pointAttr')) this.parts.pointAttr = this.draftPointAttr(new pattern.Part());
  if (this.needs('pointDist')) this.parts.pointDist = this.draftPointDist(new pattern.Part());
  if (this.needs('pointDx')) this.parts.pointDx = this.draftPointDx(new pattern.Part());
  if (this.needs('pointDy')) this.parts.pointDy = this.draftPointDy(new pattern.Part());
  if (this.needs('pointAngle')) this.parts.pointAngle = this.draftPointAngle(new pattern.Part());
  if (this.needs('pointRotate')) this.parts.pointRotate = this.draftPointRotate(new pattern.Part());
  if (this.needs('pointCopy')) this.parts.pointCopy = this.draftPointCopy(new pattern.Part());
  if (this.needs('pointFlipX')) this.parts.pointFlipX = this.draftPointFlipX(new pattern.Part());
  if (this.needs('pointFlipY')) this.parts.pointFlipY = this.draftPointFlipY(new pattern.Part());
  if (this.needs('pointShift')) this.parts.pointShift = this.draftPointShift(new pattern.Part());
  if (this.needs('pointShiftTowards')) this.parts.pointShiftTowards = this.draftPointShiftTowards(new pattern.Part());
  if (this.needs('pointShiftFractionTowards')) this.parts.pointShiftFractionTowards = this.draftPointShiftFractionTowards(new pattern.Part());
  if (this.needs('pointShiftOutwards')) this.parts.pointShiftOutwards = this.draftPointShiftOutwards(new pattern.Part());
  if (this.needs('pointSitsOn')) this.parts.pointSitsOn = this.draftPointSitsOn(new pattern.Part());
  if (this.needs('pointClone')) this.parts.pointClone = this.draftPointClone(new pattern.Part());

  if (this.needs('pathOps')) this.parts.pathOps = this.draftPathOps(new pattern.Part());
  if (this.needs('pathAttr')) this.parts.pathAttr = this.draftPathAttr(new pattern.Part());
  if (this.needs('pathOffset')) this.parts.pathOffset = this.draftPathOffset(new pattern.Part());
  if (this.needs('pathLength')) this.parts.pathLength = this.draftPathLength(new pattern.Part());
  if (this.needs('pathStart')) this.parts.pathStart = this.draftPathStart(new pattern.Part());
  if (this.needs('pathEnd')) this.parts.pathEnd = this.draftPathEnd(new pattern.Part());
  if (this.needs('pathClone')) this.parts.pathClone = this.draftPathClone(new pattern.Part());
  if (this.needs('pathJoin')) this.parts.pathJoin = this.draftPathJoin(new pattern.Part());
  if (this.needs('pathReverse')) this.parts.pathReverse = this.draftPathReverse(new pattern.Part());
  if (this.needs('pathShiftAlong')) this.parts.pathShiftAlong = this.draftPathShiftAlong(new pattern.Part());
  if (this.needs('pathShiftFractionAlong')) this.parts.pathShiftFractionAlong = this.draftPathShiftFractionAlong(new pattern.Part());
  if (this.needs('pathEdge')) this.parts.pathEdge = this.draftPathEdge(new pattern.Part());
  if (this.needs('pathTrim')) this.parts.pathTrim = this.draftPathTrim(new pattern.Part());
  if (this.needs('pathIntersectsX')) this.parts.pathIntersectsX = this.draftPathIntersectsX(new pattern.Part());
  if (this.needs('pathIntersectsY')) this.parts.pathIntersectsY = this.draftPathIntersectsY(new pattern.Part());
  if (this.needs('pathIntersects')) this.parts.pathIntersects = this.draftPathIntersects(new pattern.Part());
  if (this.needs('pathDivide')) this.parts.pathDivide = this.draftPathDivide(new pattern.Part());
  if (this.needs('pathSplit')) this.parts.pathSplit = this.draftPathSplit(new pattern.Part());

  if (this.needs('utilsLinesIntersect')) this.parts.utilsLinesIntersect = this.draftUtilsLinesIntersect(new pattern.Part());
  if (this.needs('utilsBeamsIntersect')) this.parts.utilsBeamsIntersect = this.draftUtilsBeamsIntersect(new pattern.Part());
  if (this.needs('utilsBeamIntersectsX')) this.parts.utilsBeamIntersectsX = this.draftUtilsBeamIntersectsX(new pattern.Part());
  if (this.needs('utilsBeamIntersectsY')) this.parts.utilsBeamIntersectsY = this.draftUtilsBeamIntersectsY(new pattern.Part());
  if (this.needs('utilsLineIntersectsCurve')) this.parts.utilsLineIntersectsCurve = this.draftUtilsLineIntersectsCurve(new pattern.Part());
  if (this.needs('utilsCurvesIntersect')) this.parts.utilsCurvesIntersect = this.draftUtilsCurvesIntersect(new pattern.Part());
  if (this.needs('utilsPointOnLine')) this.parts.utilsPointOnLine = this.draftUtilsPointOnLine(new pattern.Part());
  if (this.needs('utilsPointOnBeam')) this.parts.utilsPointOnBeam = this.draftUtilsPointOnBeam(new pattern.Part());
  if (this.needs('utilsPointOnCurve')) this.parts.utilsPointOnCurve = this.draftUtilsPointOnCurve(new pattern.Part());
  if (this.needs('utilsCirclesIntersect')) this.parts.utilsCirclesIntersect = this.draftUtilsCirclesIntersect(new pattern.Part());
  if (this.needs('utilsBeamIntersectsCircle')) this.parts.utilsBeamIntersectsCircle = this.draftUtilsBeamIntersectsCircle(new pattern.Part());
  if (this.needs('utilsLineIntersectsCircle')) this.parts.utilsLineIntersectsCircle = this.draftUtilsLineIntersectsCircle(new pattern.Part());

  if (this.needs('pluginGrainline')) this.parts.pluginGrainline = this.draftPluginGrainline(new pattern.Part());
  if (this.needs('pluginCutonfold')) this.parts.pluginCutonfold = this.draftPluginCutonfold(new pattern.Part());
  if (this.needs('pluginDimension')) this.parts.pluginDimension = this.draftPluginDimension(new pattern.Part());
  if (this.needs('pluginLogo')) this.parts.pluginLogo = this.draftPluginLogo(new pattern.Part());
  if (this.needs('pluginTitle')) this.parts.pluginTitle = this.draftPluginTitle(new pattern.Part());
  if (this.needs('pluginScalebox')) this.parts.pluginScalebox = this.draftPluginScalebox(new pattern.Part());

  if (this.needs('settingsSa')) this.parts.settingsSa = this.draftSettingsSa(new pattern.Part());
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
pattern.draftPathEdge = part => pathEdge.draft(part);
pattern.draftPathTrim = part => pathTrim.draft(part);
pattern.draftPathIntersectsX = part => pathIntersectsX.draft(part);
pattern.draftPathIntersectsY = part => pathIntersectsY.draft(part);
pattern.draftPathIntersects = part => pathIntersects.draft(part);
pattern.draftPathDivide = part => pathDivide.draft(part);
pattern.draftPathSplit = part => pathSplit.draft(part);

pattern.draftUtilsLinesIntersect = part => utilsLinesIntersect.draft(part);
pattern.draftUtilsBeamsIntersect = part => utilsBeamsIntersect.draft(part);
pattern.draftUtilsBeamIntersectsX = part => utilsBeamIntersectsX.draft(part);
pattern.draftUtilsBeamIntersectsY = part => utilsBeamIntersectsY.draft(part);
pattern.draftUtilsLineIntersectsCurve = part => utilsLineIntersectsCurve.draft(part);
pattern.draftUtilsCurvesIntersect = part => utilsCurvesIntersect.draft(part);
pattern.draftUtilsPointOnBeam = part => utilsPointOnBeam.draft(part);
pattern.draftUtilsPointOnLine = part => utilsPointOnLine.draft(part);
pattern.draftUtilsPointOnCurve = part => utilsPointOnCurve.draft(part);
pattern.draftUtilsCirclesIntersect = part => utilsCirclesIntersect.draft(part);
pattern.draftUtilsBeamIntersectsCircle = part => utilsBeamIntersectsCircle.draft(part);
pattern.draftUtilsLineIntersectsCircle = part => utilsLineIntersectsCircle.draft(part);

pattern.draftPluginGrainline = part => pluginGrainline.draft(part);
pattern.draftPluginCutonfold = part => pluginCutonfold.draft(part);
pattern.draftPluginDimension = part => pluginDimension.draft(part);
pattern.draftPluginLogo = part => pluginLogo.draft(part);
pattern.draftPluginTitle = part => pluginTitle.draft(part);
pattern.draftPluginScalebox = part => pluginScalebox.draft(part);

pattern.draftSettingsSa = part => settingsSa.draft(part);

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
