import freesewing from "freesewing";
import plugins from "@freesewing/plugin-bundle";

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
import pointTranslate from "./point.translate";
import pointSitsOn from "./point.sitson";
import pointClone from "./point.clone";

import draftPathAttr from "./pathAttr";

import pathOps from "./path.ops";
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
import pathTranslate from "./path.translate";

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

// Constructor
const Examples = function(settings) {
  freesewing.Pattern.call(this, config);
  this.use(plugins).apply(settings);

  return this;
};

// Set up inheritance
Examples.prototype = Object.create(freesewing.Pattern.prototype);
Examples.prototype.constructor = Examples;

// Attach per-part draft methods to prototype
Examples.prototype.draftPathAttr = draftPathAttr;

// Add custom snippet
//pattern.on("preRender", function(next) {
//  this.defs += `
//<g id="x">
//  <path d="M -1.1 -1.1 L 1.1 1.1 M 1.1 -1.1 L -1.1 1.1" class="note"></path>
//  <circle cy="0" cx="0" r="1.8" class="note"></circle>
//</g>
//`;
//  next();
//});

export default Examples;
