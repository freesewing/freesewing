import { Design } from '@freesewing/core'
import { pluginBundle } from '@freesewing/plugin-bundle'
import { gorePlugin } from '@freesewing/plugin-gore'
import { data } from '../data.mjs'
import config from '../config/'

// Path API
import {
  path__curve,
  path_attr,
  path_move,
  path_line,
  path_curve,
  path_curve_,
  path_close,
  path_ops,
  path_clone,
  path_divide,
  path_edge,
  path_end,
  path_intersects,
  path_intersectsx,
  path_intersectsy,
  path_join,
  path_length,
  path_noop,
  path_offset,
  path_reverse,
  path_shiftalong,
  path_shiftfractionalong,
  path_split,
  path_start,
  path_translate,
  path_trim,
} from './path.mjs'

// Point API
import {
  point_angle,
  point_attr,
  point_clone,
  point_copy,
  point_dist,
  point_dx,
  point_dy,
  point_flipx,
  point_flipy,
  point_shift,
  point_shiftfractiontowards,
  point_shifttowards,
  point_shiftoutwards,
  point_sitson,
  point_sitsroughlyon,
  point_rotate,
  point_translate,
} from './point.mjs'

// Snippet API
import { snippet, snippet_attr, snippet_clone } from './snippet.mjs'

// Utils API
import {
  utils_linesintersect,
  utils_beamsintersect,
  utils_beamintersectsx,
  utils_beamintersectsy,
  utils_lineintersectscurve,
  utils_curvesintersect,
  utils_pointonbeam,
  utils_pointonline,
  utils_pointoncurve ,
  utils_circlesintersect,
  utils_beamintersectscircle,
  utils_lineintersectscircle,
  utils_curveintersectsx,
  utils_curveintersectsy,
  utils_splitcurve,
} from './utils.mjs'

// Plugins
import {
  plugin_banner,
  plugin_bartack,
  plugin_bartackalong,
  plugin_bartackfractionalong,
  plugin_buttons,
  plugin_cutonfold,
  plugin_dimension,
  plugin_gore,
  plugin_grainline,
  plugin_logo,
  plugin_mirror,
  plugin_notches,
  plugin_round,
  plugin_sprinkle,
  plugin_scalebox,
  plugin_title,
} from './plugins.mjs'

// Snippets
import {
  snippet_bnotch,
  snippet_notch,
  snippet_button,
  snippet_buttonhole,
  snippet_buttonholestart,
  snippet_buttonholeend,
  snippet_snapsocket,
  snippet_snapstud,
  snippet_logo,
} from './snippets.mjs'

// Settings
import { settings_sa } from './settings.mjs'

// Docs illustrations
import { docs_coords, docs_overview } from './docs.mjs'


// Setup our new design
const Examples = new Design({
  data,
  parts: [

    // Path API
    path__curve,
    path_attr,
    path_move,
    path_line,
    path_curve,
    path_curve_,
    path_close,
    path_ops,
    path_clone,
    path_divide,
    path_edge,
    path_end,
    path_intersects,
    path_intersectsx,
    path_intersectsy,
    path_join,
    path_length,
    path_noop,
    path_offset,
    path_reverse,
    path_shiftalong,
    path_shiftfractionalong,
    path_split,
    path_start,
    path_translate,
    path_trim,

    // Point API
    point_angle,
    point_attr,
    point_clone,
    point_copy,
    point_dist,
    point_dx,
    point_dy,
    point_flipx,
    point_flipy,
    point_shift,
    point_shiftfractiontowards,
    point_shifttowards,
    point_shiftoutwards,
    point_sitson,
    point_sitsroughlyon,
    point_rotate,
    point_translate,

    // Snippet API
    snippet,
    snippet_attr,
    snippet_clone,

    // Utils API
    utils_linesintersect,
    utils_beamsintersect,
    utils_beamintersectsx,
    utils_beamintersectsy,
    utils_lineintersectscurve,
    utils_curvesintersect,
    utils_pointonbeam,
    utils_pointonline,
    utils_pointoncurve ,
    utils_circlesintersect,
    utils_beamintersectscircle,
    utils_lineintersectscircle,
    utils_curveintersectsx,
    utils_curveintersectsy,
    utils_splitcurve,

    // Plugins
    plugin_banner,
    plugin_bartack,
    plugin_bartackalong,
    plugin_bartackfractionalong,
    plugin_buttons,
    plugin_cutonfold,
    plugin_dimension,
    plugin_gore,
    plugin_grainline,
    plugin_logo,
    plugin_mirror,
    plugin_notches,
    plugin_round,
    plugin_sprinkle,
    plugin_scalebox,
    plugin_title,

    //   Snippets
    snippet_bnotch,
    snippet_notch,
    snippet_button,
    snippet_buttonhole,
    snippet_buttonholestart,
    snippet_buttonholeend,
    snippet_snapsocket,
    snippet_snapstud,
    snippet_logo,
  ],
  plugins: [ pluginBundle, gorePlugin ],
})

// Named exports
export {
  // Path API
  path__curve,
  path_attr,
  path_move,
  path_line,
  path_curve,
  path_curve_,
  path_close,
  path_ops,
  path_clone,
  path_divide,
  path_edge,
  path_end,
  path_intersects,
  path_intersectsx,
  path_intersectsy,
  path_join,
  path_length,
  path_noop,
  path_offset,
  path_reverse,
  path_shiftalong,
  path_shiftfractionalong,
  path_split,
  path_start,
  path_translate,
  path_trim,

  // Point API
  point_angle,
  point_attr,
  point_clone,
  point_copy,
  point_dist,
  point_dx,
  point_dy,
  point_flipx,
  point_flipy,
  point_shift,
  point_shiftfractiontowards,
  point_shifttowards,
  point_shiftoutwards,
  point_sitson,
  point_sitsroughlyon,
  point_rotate,
  point_translate,

  // Snippet API
  snippet,
  snippet_attr,
  snippet_clone,

  // Utils API
  utils_linesintersect,
  utils_beamsintersect,
  utils_beamintersectsx,
  utils_beamintersectsy,
  utils_lineintersectscurve,
  utils_curvesintersect,
  utils_pointonbeam,
  utils_pointonline,
  utils_pointoncurve ,
  utils_circlesintersect,
  utils_beamintersectscircle,
  utils_lineintersectscircle,
  utils_curveintersectsx,
  utils_curveintersectsy,
  utils_splitcurve,

  // Plugins
  plugin_banner,
  plugin_bartack,
  plugin_bartackalong,
  plugin_bartackfractionalong,
  plugin_buttons,
  plugin_cutonfold,
  plugin_dimension,
  plugin_gore,
  plugin_grainline,
  plugin_logo,
  plugin_mirror,
  plugin_notches,
  plugin_round,
  plugin_sprinkle,
  plugin_scalebox,
  plugin_title,

  //   Snippets
  snippet_bnotch,
  snippet_notch,
  snippet_button,
  snippet_buttonhole,
  snippet_buttonholestart,
  snippet_buttonholeend,
  snippet_snapsocket,
  snippet_snapstud,
  snippet_logo,
  Examples
}

