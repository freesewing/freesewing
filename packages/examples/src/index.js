import freesewing from '@freesewing/core'
import pluginBundle from '@freesewing/plugin-bundle'
import mirrorPlugin from '@freesewing/plugin-mirror'
import gorePlugin from '@freesewing/plugin-gore'
import config from '../config/'
// Path API
import draftPath_move from './path_move'
import draftPath_line from './path_line'
import draftPath_curve from './path_curve'
import draftPath__curve from './path__curve'
import draftPath_curve_ from './path_curve_'
import draftPath_close from './path_close'
import draftPath_ops from './path_ops'
import draftPath_attr from './path_attr'
import draftPath_clone from './path_clone'
import draftPath_divide from './path_divide'
import draftPath_edge from './path_edge'
import draftPath_end from './path_end'
import draftPath_intersects from './path_intersects'
import draftPath_intersectsx from './path_intersectsx'
import draftPath_intersectsy from './path_intersectsy'
import draftPath_join from './path_join'
import draftPath_length from './path_length'
import draftPath_offset from './path_offset'
import draftPath_reverse from './path_reverse'
import draftPath_shiftalong from './path_shiftalong'
import draftPath_shiftfractionalong from './path_shiftfractionalong'
import draftPath_split from './path_split'
import draftPath_start from './path_start'
import draftPath_translate from './path_translate'
import draftPath_trim from './path_trim'
// Plugins
import draftPlugin_banner from './plugin_banner'
import draftPlugin_bartack from './plugin_bartack'
import draftPlugin_bartackalong from './plugin_bartackalong'
import draftPlugin_bartackfractionalong from './plugin_bartackfractionalong'
import draftPlugin_buttons from './plugin_buttons'
import draftPlugin_cutonfold from './plugin_cutonfold'
import draftPlugin_dimension from './plugin_dimension'
import draftPlugin_gore from './plugin_gore'
import draftPlugin_grainline from './plugin_grainline'
import draftPlugin_logo from './plugin_logo'
import draftPlugin_mirror from './plugin_mirror'
import draftPlugin_round from './plugin_round'
import draftPlugin_sprinkle from './plugin_sprinkle'
import draftPlugin_scalebox from './plugin_scalebox'
import draftPlugin_title from './plugin_title'
// Point API
import draftPoint_angle from './point_angle'
import draftPoint_attr from './point_attr'
import draftPoint_clone from './point_clone'
import draftPoint_copy from './point_copy'
import draftPoint_dist from './point_dist'
import draftPoint_dx from './point_dx'
import draftPoint_dy from './point_dy'
import draftPoint_flipx from './point_flipx'
import draftPoint_flipy from './point_flipy'
import draftPoint_shift from './point_shift'
import draftPoint_shiftfractiontowards from './point_shiftfractiontowards'
import draftPoint_shifttowards from './point_shifttowards'
import draftPoint_shiftoutwards from './point_shiftoutwards'
import draftPoint_sitson from './point_sitson'
import draftPoint_sitsroughlyon from './point_sitsroughlyon'
import draftPoint_rotate from './point_rotate'
import draftPoint_translate from './point_translate'
// Utils API
import draftUtils_linesintersect from './utils_linesintersect'
import draftUtils_beamsintersect from './utils_beamsintersect'
import draftUtils_beamintersectsx from './utils_beamintersectsx'
import draftUtils_beamintersectsy from './utils_beamintersectsy'
import draftUtils_lineintersectscurve from './utils_lineintersectscurve'
import draftUtils_curvesintersect from './utils_curvesintersect'
import draftUtils_pointonbeam from './utils_pointonbeam'
import draftUtils_pointonline from './utils_pointonline'
import draftUtils_pointoncurve from './utils_pointoncurve'
import draftUtils_circlesintersect from './utils_circlesintersect'
import draftUtils_beamintersectscircle from './utils_beamintersectscircle'
import draftUtils_lineintersectscircle from './utils_lineintersectscircle'
import draftUtils_curveintersectsx from './utils_curveintersectsx'
import draftUtils_curveintersectsy from './utils_curveintersectsy'
import draftUtils_splitcurve from './utils_splitcurve'
// Various
import draftSettings_sa from './settings_sa'
import draftSnippet from './snippet'
import draftSnippet_attr from './snippet_attr'
import draftSnippet_clone from './snippet_clone'
import draftSnippets_bnotch from './snippets_bnotch'
import draftSnippets_notch from './snippets_notch'
import draftSnippets_button from './snippets_button'
import draftSnippets_buttonhole from './snippets_buttonhole'
import draftSnippets_buttonhole_start from './snippets_buttonhole-start'
import draftSnippets_buttonhole_end from './snippets_buttonhole-end'
import draftSnippets_snapsocket from './snippets_snapsocket'
import draftSnippets_snapstud from './snippets_snapstud'
import draftSnippets_logo from './snippets_logo'
// Docs illustrations
import draftDocs_overview from './docs_overview'
import draftDocs_coords from './docs_coords'

// Create design
const Pattern = new freesewing.Design(config, [pluginBundle, gorePlugin, mirrorPlugin])

// Attach draft methods to prototype
let methods = {
  draftPath_move,
  draftPath_line,
  draftPath_curve,
  draftPath__curve,
  draftPath_curve_,
  draftPath_close,
  draftPath_ops,
  draftPath_attr,
  draftPath_clone,
  draftPath_divide,
  draftPath_edge,
  draftPath_end,
  draftPath_intersects,
  draftPath_intersectsx,
  draftPath_intersectsy,
  draftPath_join,
  draftPath_length,
  draftPath_offset,
  draftPath_reverse,
  draftPath_shiftalong,
  draftPath_shiftfractionalong,
  draftPath_split,
  draftPath_start,
  draftPath_translate,
  draftPath_trim,
  draftPlugin_banner,
  draftPlugin_bartack,
  draftPlugin_bartackalong,
  draftPlugin_bartackfractionalong,
  draftPlugin_buttons,
  draftPlugin_cutonfold,
  draftPlugin_dimension,
  draftPlugin_gore,
  draftPlugin_grainline,
  draftPlugin_logo,
  draftPlugin_mirror,
  draftPlugin_round,
  draftPlugin_scalebox,
  draftPlugin_sprinkle,
  draftPlugin_title,
  draftPoint_angle,
  draftPoint_attr,
  draftPoint_clone,
  draftPoint_copy,
  draftPoint_dist,
  draftPoint_dx,
  draftPoint_dy,
  draftPoint_flipx,
  draftPoint_flipy,
  draftPoint_shift,
  draftPoint_shiftfractiontowards,
  draftPoint_shifttowards,
  draftPoint_shiftoutwards,
  draftPoint_sitson,
  draftPoint_sitsroughlyon,
  draftPoint_rotate,
  draftPoint_translate,
  draftSettings_sa,
  draftSnippet,
  draftSnippet_attr,
  draftSnippet_clone,
  draftSnippets_bnotch,
  draftSnippets_notch,
  draftSnippets_button,
  draftSnippets_buttonhole,
  draftSnippets_buttonhole_start,
  draftSnippets_buttonhole_end,
  draftSnippets_snapsocket,
  draftSnippets_snapstud,
  draftSnippets_logo,
  draftUtils_linesintersect,
  draftUtils_beamsintersect,
  draftUtils_beamintersectsx,
  draftUtils_beamintersectsy,
  draftUtils_lineintersectscurve,
  draftUtils_curvesintersect,
  draftUtils_pointonbeam,
  draftUtils_pointonline,
  draftUtils_pointoncurve,
  draftUtils_circlesintersect,
  draftUtils_beamintersectscircle,
  draftUtils_lineintersectscircle,
  draftUtils_curveintersectsx,
  draftUtils_curveintersectsy,
  draftUtils_splitcurve,
  draftDocs_overview,
  draftDocs_coords,
}

for (let m of Object.keys(methods)) Pattern.prototype[m] = methods[m]

export default Pattern
