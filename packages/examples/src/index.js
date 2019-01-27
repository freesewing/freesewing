import freesewing from "freesewing";
import plugins from "@freesewing/plugin-bundle";

import config from "../config/";
import { version } from "../package.json";

import draftPath_attr from "./path_attr";
import draftPath_clone from "./path_clone";
import draftPath_divide from "./path_divide";
import draftPath_edge from "./path_edge";
import draftPath_end from "./path_end";
import draftPath_intersects from "./path_intersects";
import draftPath_intersectsx from "./path_intersectsx";
import draftPath_intersectsy from "./path_intersectsy";
import draftPath_join from "./path_join";
import draftPath_length from "./path_length";
import draftPath_offset from "./path_offset";
import draftPath_ops from "./path_ops";
import draftPath_reverse from "./path_reverse";
import draftPath_shiftalong from "./path_shiftalong";
import draftPath_shiftfractionalong from "./path_shiftfractionalong";
import draftPath_split from "./path_split";
import draftPath_start from "./path_start";
import draftPath_translate from "./path_translate";
import draftPath_trim from "./path_trim";

import draftPlugin_cutonfold from "./plugin_cutonfold";
import draftPlugin_dimension from "./plugin_dimension";
import draftPlugin_grainline from "./plugin_grainline";
import draftPlugin_logo from "./plugin_logo";
import draftPlugin_scalebox from "./plugin_scalebox";
import draftPlugin_title from "./plugin_title";

import draftPoint_angle from "./point_angle";
import draftPoint_attr from "./point_attr";
import draftPoint_clone from "./point_clone";
import draftPoint_copy from "./point_copy";
import draftPoint_dist from "./point_dist";
import draftPoint_dx from "./point_dx";
import draftPoint_dy from "./point_dy";
import draftPoint_flipx from "./point_flipx";
import draftPoint_flipy from "./point_flipy";
import draftPoint_shift from "./point_shift";
import draftPoint_shiftfractiontowards from "./point_shiftfractiontowards";
import draftPoint_shifttowards from "./point_shifttowards";
import draftPoint_shiftoutwards from "./point_shiftoutwards";
import draftPoint_sitson from "./point_sitson";
import draftPoint_rotate from "./point_rotate";
import draftPoint_translate from "./point_translate";

import draftUtils_linesintersect from "./utils_linesintersect";
import draftUtils_beamsintersect from "./utils_beamsintersect";
import draftUtils_beamintersectsx from "./utils_beamintersectsx";
import draftUtils_beamintersectsy from "./utils_beamintersectsy";
import draftUtils_lineintersectscurve from "./utils_lineintersectscurve";
import draftUtils_curvesintersect from "./utils_curvesintersect";
import draftUtils_pointonbeam from "./utils_pointonbeam";
import draftUtils_pointonline from "./utils_pointonline";
import draftUtils_pointoncurve from "./utils_pointoncurve";
import draftUtils_circlesintersect from "./utils_circlesintersect";
import draftUtils_beamintersectscircle from "./utils_beamintersectscircle";
import draftUtils_lineintersectscircle from "./utils_lineintersectscircle";

import draftSettings_sa from "./settings_sa";

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
Examples.prototype.draftPoint_attr = draftPoint_attr;

Examples.prototype.draftPath_attr = draftPath_attr;
Examples.prototype.draftPath_clone = draftPath_clone;
Examples.prototype.draftPath_divide = draftPath_divide;
Examples.prototype.draftPath_edge = draftPath_edge;
Examples.prototype.draftPath_end = draftPath_end;
Examples.prototype.draftPath_intersects = draftPath_intersects;
Examples.prototype.draftPath_intersectsx = draftPath_intersectsy;
Examples.prototype.draftPath_intersectsy = draftPath_intersectsy;
Examples.prototype.draftPath_join = draftPath_join;
Examples.prototype.draftPath_length = draftPath_length;
Examples.prototype.draftPath_offset = draftPath_offset;
Examples.prototype.draftPath_ops = draftPath_ops;
Examples.prototype.draftPath_reverse = draftPath_reverse;
Examples.prototype.draftPath_shiftalong = draftPath_shiftalong;
Examples.prototype.draftPath_shiftfractionalong = draftPath_shiftfractionalong;
Examples.prototype.draftPath_split = draftPath_split;
Examples.prototype.draftPath_start = draftPath_start;
Examples.prototype.draftPath_translate = draftPath_translate;
Examples.prototype.draftPath_trim = draftPath_trim;

Examples.prototype.draftPlugin_cutonfold = draftPlugin_cutonfold;
Examples.prototype.draftPlugin_dimension = draftPlugin_dimension;
Examples.prototype.draftPlugin_grainline = draftPlugin_grainline;
Examples.prototype.draftPlugin_logo = draftPlugin_logo;
Examples.prototype.draftPlugin_scalebox = draftPlugin_scalebox;
Examples.prototype.draftPlugin_title = draftPlugin_title;

Examples.prototype.draftPoint_angle = draftPoint_angle;
Examples.prototype.draftPoint_attr = draftPoint_attr;
Examples.prototype.draftPoint_clone = draftPoint_clone;
Examples.prototype.draftPoint_copy = draftPoint_copy;
Examples.prototype.draftPoint_dist = draftPoint_dist;
Examples.prototype.draftPoint_dx = draftPoint_dx;
Examples.prototype.draftPoint_dy = draftPoint_dy;
Examples.prototype.draftPoint_flipx = draftPoint_flipx;
Examples.prototype.draftPoint_flipy = draftPoint_flipy;
Examples.prototype.draftPoint_shift = draftPoint_shift;
Examples.prototype.draftPoint_shiftfractiontowards = draftPoint_shiftfractiontowards;
Examples.prototype.draftPoint_shifttowards = draftPoint_shifttowards;
Examples.prototype.draftPoint_shiftoutwards = draftPoint_shiftoutwards;
Examples.prototype.draftPoint_sitson = draftPoint_sitson;
Examples.prototype.draftPoint_rotate = draftPoint_rotate;
Examples.prototype.draftPoint_translate = draftPoint_translate;

Examples.prototype.draftSettings_sa = draftSettings_sa;

Examples.prototype.draftUtils_linesintersect = draftUtils_linesintersect;
Examples.prototype.draftUtils_beamsintersect = draftUtils_beamsintersect;
Examples.prototype.draftUtils_beamintersectsx = draftUtils_beamintersectsx;
Examples.prototype.draftUtils_beamintersectsy = draftUtils_beamintersectsy;
Examples.prototype.draftUtils_lineintersectscurve = draftUtils_lineintersectscurve;
Examples.prototype.draftUtils_curvesintersect = draftUtils_curvesintersect;
Examples.prototype.draftUtils_pointonbeam = draftUtils_pointonbeam;
Examples.prototype.draftUtils_pointonline = draftUtils_pointonline;
Examples.prototype.draftUtils_pointoncurve = draftUtils_pointoncurve;
Examples.prototype.draftUtils_circlesintersect = draftUtils_circlesintersect;
Examples.prototype.draftUtils_beamintersectscircle = draftUtils_beamintersectscircle;
Examples.prototype.draftUtils_lineintersectscircle = draftUtils_lineintersectscircle;

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
