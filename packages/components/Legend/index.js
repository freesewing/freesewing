/**
 * @freesewing/components/Legend | v2.7.0-beta.1
 * A collection of React components for FreeSewing web UIs
 * (c) 2020 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */ 'use strict'
function _interopDefault(t) {
  return t && 'object' == typeof t && 'default' in t ? t['default'] : t
}
var React = _interopDefault(require('react')),
  freesewing = _interopDefault(require('@freesewing/core')),
  i18n = require('@freesewing/i18n')
function _defineProperty(t, e, a) {
  return (
    e in t
      ? Object.defineProperty(t, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
      : (t[e] = a),
    t
  )
}
function ownKeys(t, e) {
  var a = Object.keys(t)
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t)
    e &&
      (s = s.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })),
      a.push.apply(a, s)
  }
  return a
}
function _objectSpread2(t) {
  for (var s, n = 1; n < arguments.length; n++)
    (s = null == arguments[n] ? {} : arguments[n]),
      n % 2
        ? ownKeys(Object(s), !0).forEach(function (e) {
            _defineProperty(t, e, s[e])
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(s))
        : ownKeys(Object(s)).forEach(function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(s, e))
          })
  return t
}
var markers =
    '\n<marker orient="auto" refY="0.0" refX="0.0" id="cutonfoldFrom" style="overflow:visible;" >\n\t<path class="note fill-note" d="M 0,0 L 12,-4 C 10,-2 10,2  12, 4 z" />\n</marker>\n<marker orient="auto" refY="0.0" refX="0.0" id="cutonfoldTo" style="overflow:visible;" >\n\t<path class="note fill-note" d="M 0,0 L -12,-4 C -10,-2 -10,2  -12, 4 z" />\n</marker>\n',
  version = '2.7.0-beta.0',
  index = {
    name: '@freesewing/plugin-cutonfold',
    version: '2.7.0-beta.0',
    hooks: {
      preRender: function (t) {
        !1 === t.attributes.get('freesewing:plugin-cutonfold') &&
          (t.attributes.set('freesewing:plugin-cutonfold', version), (t.defs += markers))
      }
    },
    macros: {
      cutonfold: function (t) {
        if (!1 === t)
          return (
            delete this.points.cutonfoldFrom,
            delete this.points.cutonfoldTo,
            delete this.points.cutonfoldVia1,
            delete this.points.cutonfoldVia2,
            delete this.paths.cutonfold,
            !0
          )
        var a = this.points
        ;(t = _objectSpread2({ offset: 15, margin: 5, prefix: '' }, t)),
          (a['cutonfoldFrom' + t.prefix] = t.from.shiftFractionTowards(t.to, t.margin / 100)),
          (a['cutonfoldTo' + t.prefix] = t.to.shiftFractionTowards(t.from, t.margin / 100)),
          (a['cutonfoldVia1' + t.prefix] = a['cutonfoldFrom' + t.prefix]
            .shiftTowards(t.from, t.offset)
            .rotate(-90, a['cutonfoldFrom' + t.prefix])),
          (a['cutonfoldVia2' + t.prefix] = a['cutonfoldTo' + t.prefix]
            .shiftTowards(t.to, t.offset)
            .rotate(90, a['cutonfoldTo' + t.prefix]))
        var e = t.grainline ? 'cutOnFoldAndGrainline' : 'cutOnFold'
        this.paths['cutonfold' + t.prefix] = new this.Path()
          .move(a['cutonfoldFrom' + t.prefix])
          .line(a['cutonfoldVia1' + t.prefix])
          .line(a['cutonfoldVia2' + t.prefix])
          .line(a['cutonfoldTo' + t.prefix])
          .attr('class', 'note')
          .attr('marker-start', 'url(#cutonfoldFrom)')
          .attr('marker-end', 'url(#cutonfoldTo)')
          .attr('data-text', e)
          .attr('data-text-class', 'center fill-note')
      }
    }
  },
  markers$1 =
    '\n<marker orient="auto" refY="0.0" refX="0.0" id="dimensionFrom" style="overflow:visible;"><path class="mark fill-mark" d="M 0,0 L 12,-4 C 10,-2 10,2  12, 4 z" /></marker>\n<marker orient="auto" refY="0.0" refX="0.0" id="dimensionTo" style="overflow:visible;" ><path class="mark fill-mark" d="M 0,0 L -12,-4 C -10,-2 -10,2  -12, 4 z" /></marker>\n',
  name$1 = '@freesewing/plugin-dimension',
  version$1 = '2.7.0-beta.0'
function drawDimension(t, e, a, s) {
  var n = new s.Path()
    .move(t)
    .line(e)
    .attr('class', 'mark')
    .attr('data-text', a.text || s.units(t.dist(e)))
    .attr('data-text-class', 'fill-mark center')
  return (
    a.noStartMarker || n.attributes.set('marker-start', 'url(#dimensionFrom)'),
    a.noEndMarker || n.attributes.set('marker-end', 'url(#dimensionTo)'),
    n
  )
}
function drawLeader(t, e, a, s) {
  t.paths[s] = new t.Path().move(e).line(a).attr('class', 'mark dotted')
}
function hleader(t, e, a, s) {
  var n
  return (
    'undefined' == typeof t.y || t[e].y === t.y
      ? (n = t[e])
      : ((n = new a.Point(t[e].x, t.y)), drawLeader(a, t[e], n, s)),
    n
  )
}
function vleader(t, e, a, s) {
  var n
  return (
    'undefined' == typeof t.x || t[e].x === t.x
      ? (n = t[e])
      : ((n = new a.Point(t.x, t[e].y)), drawLeader(a, t[e], n, s)),
    n
  )
}
function lleader(t, e, a, s) {
  var n, r, o
  return (
    'from' === e ? ((r = 1), (o = 'to')) : ((r = -1), (o = 'from')),
    'undefined' == typeof t.d
      ? (n = t[e])
      : ((n = t[e].shiftTowards(t[o], t.d).rotate(90 * r, t[e])), drawLeader(a, t[e], n, s)),
    n
  )
}
var index$1 = {
    name: '@freesewing/plugin-dimension',
    version: '2.7.0-beta.0',
    hooks: {
      preRender: function (t) {
        !1 === t.attributes.get('freesewing:plugin-dimension') &&
          (t.attributes.set('freesewing:plugin-dimension', version$1), (t.defs += markers$1))
      }
    },
    macros: {
      hd: function (t) {
        var e = this.getId(),
          a = hleader(t, 'from', this, e + '_ls'),
          s = hleader(t, 'to', this, e + '_le')
        this.paths[e] = drawDimension(a, s, t, this)
      },
      vd: function (t) {
        var e = this.getId(),
          a = vleader(t, 'from', this, e + '_ls'),
          s = vleader(t, 'to', this, e + '_le')
        this.paths[e] = drawDimension(a, s, t, this)
      },
      ld: function (t) {
        var e = this.getId(),
          a = lleader(t, 'from', this, e + '_ls'),
          s = lleader(t, 'to', this, e + '_le')
        this.paths[e] = drawDimension(a, s, t, this)
      },
      pd: function (t) {
        var e = t.path
            .offset(t.d)
            .attr('class', 'mark')
            .attr('marker-start', 'url(#dimensionFrom)')
            .attr('marker-end', 'url(#dimensionTo)')
            .attr('data-text', t.text || this.units(t.path.length()))
            .attr('data-text-class', 'fill-mark center'),
          a = this.getId()
        drawLeader(this, t.path.start(), e.start(), a + '_ls'),
          drawLeader(this, t.path.end(), e.end(), a + '_le'),
          (this.paths[a] = e)
      }
    }
  },
  markers$2 =
    '\n<marker orient="auto" refY="0.0" refX="0.0" id="grainlineFrom" style="overflow:visible;" >\n\t<path class="note fill-note" d="M 0,0 L 12,-4 C 10,-2 10,2  12, 4 z" />\n</marker>\n<marker orient="auto" refY="0.0" refX="0.0" id="grainlineTo" style="overflow:visible;" >\n\t<path class="note fill-note" d="M 0,0 L -12,-4 C -10,-2 -10,2  -12, 4 z" />\n</marker>\n',
  name$2 = '@freesewing/plugin-grainline',
  version$2 = '2.7.0-beta.0',
  index$2 = {
    name: '@freesewing/plugin-grainline',
    version: '2.7.0-beta.0',
    hooks: {
      preRender: function (t) {
        !1 === t.attributes.get('freesewing:plugin-grainline') &&
          (t.attributes.set('freesewing:plugin-grainline', version$2), (t.defs += markers$2))
      }
    },
    macros: {
      grainline: function (t) {
        if (!1 === t)
          return (
            delete this.points.grainlineFrom,
            delete this.points.grainlineTo,
            delete this.paths.grainline,
            !0
          )
        var e = this.points
        ;(e.grainlineFrom = t.from.shiftFractionTowards(t.to, 0.05)),
          (e.grainlineTo = t.to.shiftFractionTowards(t.from, 0.05)),
          (this.paths.grainline = new this.Path()
            .move(e.grainlineFrom)
            .line(e.grainlineTo)
            .attr('class', 'note')
            .attr('marker-start', 'url(#grainlineFrom)')
            .attr('marker-end', 'url(#grainlineTo)')
            .attr('data-text', 'grainline')
            .attr('data-text-class', 'center fill-note'))
      }
    }
  },
  logo =
    '<g id="logo" transform="translate(-23 -36)"><path class="logo" stroke="none" fill="#000" d="M 35.222,0 C 34.233,0.703 34.284,0.613 33.485,0.874 31.653,1.473 29.896,1.144 27.811,0.97 27.184,0.9 26.562,0.859 25.955,0.855 22.89,0.834 20.287,1.733 19.794,4.243 18.885,4.794 18.049,5.461 17.221,6.129 15.453,7.524 14.122,9.229 13.214,11.284 11.974,14.319 13.094,17.576 13.649,20.652 13.781,21.372 13.919,22.058 13.993,22.323 14.098,22.696 14.283,23.052 14.484,23.372 14.531,23.38 14.779,22.998 14.838,22.829 14.924,22.583 14.915,22.188 14.821,21.848 14.613,21.083 14.415,20.462 14.398,20.15 14.368,19.564 14.482,19.023 14.696,18.755 14.772,18.66 14.946,19.15 14.901,19.332 14.848,19.551 14.808,19.926 14.825,20.099 14.872,20.685 14.958,21.312 15.065,21.86 15.202,22.567 15.261,23.021 15.236,23.197 15.218,23.325 15.158,23.454 14.928,23.85 14.728,24.197 14.624,24.478 14.608,24.726 14.591,24.968 14.664,25.573 14.732,25.721 14.831,25.952 15.129,26.195 15.389,26.255 15.638,26.35 15.763,26.547 15.891,26.768 16.202,27.361 16.442,28.083 16.68,29.171 16.796,29.692 16.893,30.157 16.924,30.401 15.004,30.403 12.545,30.404 10.305,30.404 9.551,30.416 8.189,30.062 6.94,29.98 6.759,28.026 5.901,25.756 4.433,25.624 3.431,25.533 2.6,25.914 1.897,27.497 L 1.917,27.582 C 2.332,27.235 2.77,26.174 4.348,26.247 5.56,26.302 5.964,28.596 6.084,29.976 5.346,30.03 4.718,30.257 4.39,30.824 L 4.383,30.824 C 4.383,30.825 4.383,30.827 4.386,30.829 4.383,30.831 4.383,30.833 4.383,30.835 L 4.39,30.835 C 4.728,31.416 5.379,31.641 6.144,31.686 6.655,46.136 20.238,48 23.95,48 37.798,48 42.646,38.59 43.375,34.863 43.716,36.451 42.642,38.474 42.385,39.967 45.306,36.59 44.778,33.343 44.244,30.077 44.688,30.605 45.289,30.932 46.104,30.751 45.523,30.363 44.735,30.635 44.263,28.998 44.057,28.291 43.879,27.761 43.702,27.316 43.32,25.883 42.778,24.514 42.112,23.18 41.55,21.733 41.921,20.795 41.865,19.553 42.876,22.887 43.508,23.774 44.688,24.123 41.72,20.547 42.736,15.01 41.059,10.068 41.818,10.514 42.684,10.648 43.606,10.103 42.714,9.849 41.824,10.52 40.544,8.639 39.463,6.536 37.897,4.983 35.997,3.613 34.979,2.949 33.849,2.503 32.713,2.089 33.87,1.799 35.162,0.769 35.222,0 z M 33.281,11.107 C 34.805,11.663 36.485,13.775 36.466,15.847 L 36.466,15.933 36.466,15.963 C 36.425,18.777 35.146,20.29 35.2,22.164 35.269,24.371 36.219,25.141 36.408,25.509 36.084,24.148 35.894,22.436 36.322,21.08 36.872,19.336 37.427,17.892 37.387,16.526 37.367,16.206 37.231,15.009 37.14,14.479 38.774,16.837 36.786,20.266 37.358,22.51 38.352,26.419 42.807,26.913 41.481,34.789 40.314,41.713 32.318,46.968 24.122,46.968 18.046,46.968 7.517,43.605 6.997,31.676 8.232,31.588 9.56,31.244 10.305,31.256 12.557,31.256 15.129,31.257 17.067,31.258 17.431,32.9 17.704,33.296 19.085,34.39 20.621,35.598 20.979,35.745 23.251,35.767 25.524,35.79 26.198,35.303 28.403,33.217 28.879,32.659 29.085,31.928 29.316,31.241 31.584,31.22 33.238,31.18 34.865,31.104 36.522,31.029 36.756,31.104 39.426,30.829 36.756,30.554 36.522,30.629 34.865,30.553 33.281,30.481 31.677,30.44 29.508,30.42 29.69,29.603 29.95,28.805 30.227,28.016 30.398,27.551 30.599,27.098 30.805,26.647 L 31.03,26.577 C 31.464,26.423 31.848,26.093 32.001,25.647 32.198,25.056 32.058,24.392 31.677,23.909 31.546,23.728 31.383,23.497 31.316,23.395 31.115,23.077 31.11,22.9 31.28,21.718 31.423,20.728 31.439,20.21 31.34,19.708 31.32,19.421 31.318,18.831 31.309,18.672 31.385,18.714 31.55,19.09 31.717,19.599 31.883,20.11 31.91,20.216 31.948,20.651 31.99,21.145 31.805,21.511 31.653,22.248 31.577,22.628 31.51,22.981 31.51,23.029 31.51,23.08 31.546,23.188 31.584,23.272 31.673,23.46 31.84,23.724 31.871,23.724 32.416,23.123 32.736,22.381 33.021,21.628 33.321,20.776 33.409,19.872 33.619,18.995 33.789,18.231 33.985,17.466 34.046,16.682 34.169,15.152 34.097,14.072 33.759,12.478 33.678,12.118 33.444,11.431 33.281,11.107 z M 27.921,18.644 C 28.506,18.637 29.085,18.708 29.636,18.867 30.385,19.154 30.49,19.823 30.628,20.574 30.705,21.054 30.702,21.399 30.615,21.963 30.554,22.781 30.229,23.414 29.519,23.859 28.448,24.057 27.303,24.248 26.395,23.539 25.633,22.489 25.174,21.162 25.349,19.868 25.46,19.337 25.707,19.061 26.215,18.896 26.762,18.739 27.341,18.653 27.921,18.644 z M 19.038,18.739 C 19.585,18.734 20.138,18.792 20.442,18.986 21.747,19.869 21.328,21.306 20.812,22.567 20.061,24.218 18.437,24.157 16.863,24.144 15.992,23.889 15.912,23.175 15.786,22.412 15.678,21.675 15.448,20.885 15.64,20.144 16.133,18.952 17.935,18.815 19.038,18.739 z M 38.941,18.945 C 38.948,22.118 39.49,23.677 40.578,25.924 39.937,24.701 39.021,24.005 38.68,22.543 38.028,19.72 38.731,19.878 38.941,18.945 z M 23.128,21.243 C 23.3,21.417 23.383,21.657 23.532,21.848 23.647,21.651 23.765,21.455 23.913,21.28 23.99,21.282 24.084,21.434 24.169,21.706 24.533,22.712 24.604,23.819 25.076,24.786 25.517,25.486 24.915,25.894 24.254,25.926 23.772,25.925 23.568,25.596 23.285,25.27 23.212,25.483 23.073,25.62 22.907,25.764 22.485,26.118 21.658,25.987 21.53,25.429 21.7,24.363 22.243,23.384 22.599,22.362 22.776,21.989 22.778,21.703 23.128,21.243 z M 16.936,26.628 C 17.149,26.628 17.734,27.025 17.853,27.249 17.935,27.398 18.122,27.978 18.135,28.119 18.156,28.287 18.105,28.685 18.053,28.793 18.015,28.87 17.986,28.881 17.942,28.831 17.905,28.789 17.415,27.849 17.102,27.227 16.856,26.729 16.83,26.628 16.936,26.628 z M 29.158,26.939 C 29.166,26.94 29.178,26.943 29.189,26.946 29.255,26.973 29.209,27.207 28.961,28.057 28.914,28.313 28.8,28.515 28.633,28.683 28.578,28.683 28.553,28.619 28.467,28.264 28.394,27.961 28.386,27.691 28.437,27.449 28.525,27.146 28.881,27.053 29.158,26.939 z M 27.675,28.792 C 27.696,28.788 27.716,28.799 27.742,28.82 27.832,28.883 27.845,29.049 27.785,29.374 27.712,29.792 27.696,29.838 27.588,29.881 27.541,29.902 27.457,29.917 27.401,29.917 27.3,29.899 27.274,29.817 27.298,29.693 27.298,29.433 27.374,29.207 27.546,28.94 27.611,28.84 27.644,28.797 27.675,28.792 z M 19.042,28.811 C 19.111,28.811 19.319,28.961 19.396,29.065 19.482,29.175 19.58,29.83 19.525,29.943 19.462,30.085 19.154,30.014 19.069,29.837 19.017,29.731 18.894,29.159 18.894,29.023 18.894,28.897 18.955,28.811 19.042,28.811 z M 26.933,28.984 C 27.017,29.104 27.039,29.258 27.021,29.596 L 27.004,29.904 26.916,29.992 C 26.863,30.041 26.773,30.101 26.719,30.126 26.6,30.182 26.509,30.187 26.492,30.142 26.472,30.082 26.506,29.7 26.543,29.571 26.586,29.438 26.779,29.041 26.843,28.957 26.872,28.88 26.906,28.976 26.933,28.984 z M 21.912,28.966 C 22.093,29.012 22.173,29.175 22.272,29.323 L 22.339,29.455 22.245,29.782 C 22.195,29.962 22.142,30.124 22.126,30.142 22.108,30.162 22.041,30.172 21.942,30.171 21.678,30.164 21.648,30.153 21.577,30.045 L 21.511,29.947 21.567,29.672 C 21.648,29.276 21.687,29.157 21.777,29.055 21.824,29 21.871,28.97 21.912,28.966 z M 20.241,29.249 20.39,29.398 20.415,29.735 C 20.428,29.919 20.434,30.09 20.424,30.111 20.415,30.14 20.361,30.148 20.194,30.148 L 19.977,30.148 C 19.861,30.021 19.825,29.866 19.776,29.706 19.662,29.225 19.662,29.006 19.78,28.977 19.973,28.989 20.1,29.129 20.241,29.249 z M 26.041,29.018 C 26.277,29.081 26.23,29.456 26.229,29.724 26.211,30.158 26.194,30.248 26.138,30.304 26.041,30.401 25.771,30.347 25.64,30.203 25.597,30.151 25.593,30.135 25.627,29.924 25.666,29.667 25.716,29.507 25.827,29.287 25.908,29.129 25.984,29.03 26.041,29.018 z M 20.715,29.038 C 20.728,29.037 20.749,29.038 20.769,29.04 20.919,29.052 21.059,29.15 21.183,29.33 L 21.283,29.477 C 21.292,29.718 21.283,29.972 21.24,30.196 21.214,30.209 21.106,30.229 21,30.239 20.816,30.256 20.799,30.252 20.735,30.196 20.646,30.12 20.621,29.979 20.599,29.511 20.586,29.129 20.595,29.044 20.715,29.038 z M 22.984,29.118 C 23.145,29.152 23.247,29.238 23.292,29.379 23.328,29.5 23.35,30.177 23.315,30.224 23.303,30.244 23.227,30.269 23.14,30.28 22.816,30.321 22.53,30.29 22.502,30.213 22.466,30.125 22.707,29.253 22.796,29.145 22.834,29.061 22.926,29.126 22.984,29.118 z M 25.082,29.124 C 25.153,29.117 25.229,29.185 25.303,29.33 25.363,29.451 25.372,29.493 25.372,29.764 25.372,29.98 25.359,30.073 25.336,30.093 25.316,30.109 25.235,30.138 25.149,30.16 24.999,30.199 24.966,30.203 24.919,30.187 L 24.694,30.146 24.711,30.012 C 24.727,29.837 24.842,29.449 24.923,29.281 24.971,29.181 25.026,29.131 25.082,29.124 z M 24.104,29.127 C 24.151,29.125 24.173,29.136 24.203,29.169 24.274,29.253 24.364,29.501 24.421,29.766 24.497,30.139 24.497,30.138 24.334,30.187 24.263,30.209 24.113,30.232 24.006,30.238 23.653,30.256 23.626,30.235 23.669,29.923 23.703,29.645 23.84,29.207 23.899,29.175 23.963,29.141 24.037,29.142 24.104,29.127 z M 6.111,30.536 C 6.114,30.535 6.118,30.536 6.118,30.536 6.127,30.731 6.127,30.928 6.131,31.124 5.636,31.086 5.272,30.968 5.272,30.829 5.272,30.692 5.623,30.575 6.111,30.536 z M 6.976,30.553 C 7.377,30.603 7.654,30.708 7.649,30.829 7.649,30.951 7.381,31.055 6.983,31.104 6.979,30.921 6.979,30.737 6.976,30.553 z M 25.702,31.086 C 25.736,31.083 25.751,31.08 25.803,31.085 26.011,31.106 26.041,31.119 26.041,31.189 26.041,31.281 25.883,31.558 25.776,31.654 25.726,31.702 25.657,31.742 25.633,31.742 25.513,31.742 25.443,31.489 25.499,31.256 25.533,31.13 25.595,31.091 25.702,31.086 z M 24.947,31.169 C 25.04,31.161 25.13,31.186 25.22,31.198 25.194,31.461 25.076,31.676 24.857,31.819 24.803,31.819 24.776,31.716 24.776,31.491 24.776,31.223 24.79,31.172 24.947,31.169 z M 24.119,31.266 C 24.312,31.266 24.482,31.275 24.49,31.286 24.526,31.32 24.422,31.578 24.269,31.84 24.138,32.073 24.119,32.09 24.038,32.096 23.72,32.06 23.729,31.687 23.68,31.431 23.68,31.279 23.714,31.266 24.119,31.266 z M 21.11,31.295 C 21.331,31.299 21.417,31.332 21.417,31.417 21.417,31.525 21.335,31.74 21.288,31.767 21.217,31.806 21.211,31.804 21.071,31.658 20.85,31.41 20.825,31.364 21.11,31.295 z M 22.174,31.306 C 22.178,31.312 22.221,31.39 22.264,31.478 22.358,31.661 22.365,31.741 22.298,31.802 22.14,31.892 22.107,31.841 21.964,31.75 21.798,31.593 21.667,31.382 21.71,31.338 21.858,31.285 22.021,31.305 22.174,31.306 z M 22.596,31.311 22.991,31.318 C 23.145,31.318 23.278,31.326 23.285,31.338 23.312,31.362 23.225,31.876 23.178,31.992 23.124,32.122 22.935,32.123 22.837,31.969 22.697,31.748 22.605,31.562 22.602,31.434 L 22.596,31.311 z" /></g>',
  name$3 = '@freesewing/plugin-logo',
  version$3 = '2.7.0-beta.0',
  index$3 = {
    name: '@freesewing/plugin-logo',
    version: '2.7.0-beta.0',
    hooks: {
      preRender: function (t) {
        !1 === t.attributes.get('freesewing:plugin-logo') &&
          (t.attributes.set('freesewing:plugin-logo', version$3), (t.defs += logo))
      }
    }
  }
function _defineProperty$1(t, e, a) {
  return (
    e in t
      ? Object.defineProperty(t, e, { value: a, enumerable: !0, configurable: !0, writable: !0 })
      : (t[e] = a),
    t
  )
}
function ownKeys$1(t, e) {
  var a = Object.keys(t)
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t)
    e &&
      (s = s.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })),
      a.push.apply(a, s)
  }
  return a
}
function _objectSpread2$1(t) {
  for (var s, n = 1; n < arguments.length; n++)
    (s = null == arguments[n] ? {} : arguments[n]),
      n % 2
        ? ownKeys$1(Object(s), !0).forEach(function (e) {
            _defineProperty$1(t, e, s[e])
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(s))
        : ownKeys$1(Object(s)).forEach(function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(s, e))
          })
  return t
}
var style = `text.title-nr{font-size:24pt;font-weight:700;text-anchor:middle;dominant-baseline:reset-size}text.title-name{font-size:7pt;font-weight:500;text-anchor:middle;dominant-baseline:reset-size}text.title-pattern{font-size:4pt;font-weight:500;dominant-baseline:reset-size;text-anchor:middle;font-style:italic}`,
  version$4 = '2.7.0-beta.0',
  index$4 = {
    name: '@freesewing/plugin-title',
    version: '2.7.0-beta.0',
    hooks: {
      preRender: function (t) {
        !1 === t.attributes.get('freesewing:plugin-title') &&
          (t.attributes.set('freesewing:plugin-title', version$4), (t.style += style))
      }
    },
    macros: {
      title: function (t) {
        const e = function (e) {
          let a = e.x - t.scale * e.x,
            s = e.y - t.scale * e.y
          return `matrix(${t.scale}, 0, 0, ${t.scale}, ${a}, ${s}) rotate(${t.rotation} ${e.x} ${e.y})`
        }
        t = _objectSpread2$1({}, { scale: 1, rotation: 0 }, {}, t)
        let a = !0
        t.append && (a = !1)
        let s = ''
        t.prefix && (s = t.prefix),
          (this.points[`_${s}_titleNr`] = t.at
            .clone()
            .attr('data-text', t.nr, a)
            .attr('data-text-class', 'title-nr note fill-note')
            .attr('data-text-transform', e(t.at)))
        let n = 10
        t.title &&
          ((this.points[`_${s}_titleName`] = t.at
            .shift(-90 - t.rotation, 13 * t.scale)
            .attr('data-text', t.title)
            .attr('data-text-class', 'title-name')
            .attr('data-text-transform', e(t.at.shift(-90 - t.rotation, 13 * t.scale)))),
          (n += 10)),
          (this.points[`_${s}_titlePattern`] = t.at
            .shift(-90 - t.rotation, n * t.scale)
            .attr('data-text', this.context.config.name)
            .attr('data-text', 'v' + this.context.config.version)
            .attr('data-text-class', 'title-pattern fill-note')
            .attr('data-text-transform', e(t.at.shift(-90 - t.rotation, n * t.scale)))),
          this.context.settings.metadata &&
            this.context.settings.metadata.for &&
            ((n += 8),
            (this.points[`_${s}_titleFor`] = t.at
              .shift(-90 - t.rotation, n * t.scale)
              .attr('data-text', '( ' + this.context.settings.metadata.for + ' )')
              .attr('data-text-class', 'title-pattern')
              .attr('data-text-transform', e(t.at.shift(-90 - t.rotation, n * t.scale)))))
      }
    }
  }
function _unsupportedIterableToArray(t, e) {
  if (t) {
    if ('string' == typeof t) return _arrayLikeToArray(t, e)
    var a = Object.prototype.toString.call(t).slice(8, -1)
    return (
      'Object' === a && t.constructor && (a = t.constructor.name),
      'Map' === a || 'Set' === a
        ? Array.from(a)
        : 'Arguments' === a || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
        ? _arrayLikeToArray(t, e)
        : void 0
    )
  }
}
function _arrayLikeToArray(t, e) {
  ;(null == e || e > t.length) && (e = t.length)
  for (var s = 0, n = Array(e); s < e; s++) n[s] = t[s]
  return n
}
function _createForOfIteratorHelper(t) {
  if ('undefined' == typeof Symbol || null == t[Symbol.iterator]) {
    if (Array.isArray(t) || (t = _unsupportedIterableToArray(t))) {
      var a = 0,
        s = function () {}
      return {
        s: s,
        n: function () {
          return a >= t.length ? { done: !0 } : { done: !1, value: t[a++] }
        },
        e: function (t) {
          throw t
        },
        f: s
      }
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }
  var n,
    r,
    o = !0,
    d = !1
  return {
    s: function () {
      n = t[Symbol.iterator]()
    },
    n: function () {
      var t = n.next()
      return (o = t.done), t
    },
    e: function (t) {
      ;(d = !0), (r = t)
    },
    f: function () {
      try {
        o || null == n.return || n.return()
      } finally {
        if (d) throw r
      }
    }
  }
}
var version$5 = '2.7.0-beta.0',
  index$5 = {
    name: '@freesewing/plugin-scalebox',
    version: '2.7.0-beta.0',
    hooks: {
      preRender: function (t) {
        t.attributes.set('freesewing:plugin-scalebox', version$5)
      }
    },
    macros: {
      scalebox: function (e) {
        if (!1 === e) {
          for (
            var n,
              o = 0,
              l = [
                '__scaleboxMetricTopLeft',
                '__scaleboxMetricTopRight',
                '__scaleboxMetricBottomRight',
                '__scaleboxMetricBottomLeft',
                '__scaleboxImperialTopLeft',
                '__scaleboxImperialTopRight',
                '__scaleboxImperialBottomRight',
                '__scaleboxImperialBottomLeft',
                '__scaleboxLead',
                '__scaleboxTitle',
                '__scaleboxText',
                '__scaleboxLink',
                '__scaleboxMetric',
                '__scaleboxImperial'
              ];
            o < l.length;
            o++
          )
            (n = l[o]), delete this.points[n]
          for (var c, x = 0, f = ['__scaleboxMetric', '__scaleboxImperial']; x < f.length; x++)
            (c = f[x]), delete this.paths[c]
          return !0
        }
        if (
          ((this.points.__scaleboxMetricTopLeft = new this.Point(e.at.x - 50, e.at.y - 25)),
          (this.points.__scaleboxMetricTopRight = new this.Point(e.at.x + 50, e.at.y - 25)),
          (this.points.__scaleboxMetricBottomLeft = new this.Point(e.at.x - 50, e.at.y + 25)),
          (this.points.__scaleboxMetricBottomRight = new this.Point(e.at.x + 50, e.at.y + 25)),
          (this.points.__scaleboxImperialTopLeft = new this.Point(e.at.x - 50.8, e.at.y - 25.4)),
          (this.points.__scaleboxImperialTopRight = new this.Point(e.at.x + 50.8, e.at.y - 25.4)),
          (this.points.__scaleboxImperialBottomLeft = new this.Point(e.at.x - 50.8, e.at.y + 25.4)),
          (this.points.__scaleboxImperialBottomRight = new this.Point(
            e.at.x + 50.8,
            e.at.y + 25.4
          )),
          (this.points.__scaleboxLead = new this.Point(e.at.x - 45, e.at.y - 15)),
          (this.points.__scaleboxTitle = this.points.__scaleboxLead.shift(-90, 10)),
          (this.points.__scaleboxText = this.points.__scaleboxTitle.shift(-90, 8)),
          (this.points.__scaleboxLink = this.points.__scaleboxText.shift(-90, 8)),
          (this.points.__scaleboxMetric = new this.Point(e.at.x, e.at.y + 20)),
          (this.points.__scaleboxImperial = new this.Point(e.at.x, e.at.y + 24)),
          e.rotate)
        ) {
          for (
            var s,
              h = [
                '__scaleboxMetricTopLeft',
                '__scaleboxMetricTopRight',
                '__scaleboxMetricBottomLeft',
                '__scaleboxMetricBottomRight',
                '__scaleboxImperialTopLeft',
                '__scaleboxImperialTopRight',
                '__scaleboxImperialBottomLeft',
                '__scaleboxImperialBottomRight',
                '__scaleboxLead',
                '__scaleboxTitle',
                '__scaleboxText',
                '__scaleboxLink',
                '__scaleboxMetric',
                '__scaleboxImperial'
              ],
              t = 0,
              b = h;
            t < b.length;
            t++
          )
            (s = b[t]), (this.points[s] = this.points[s].rotate(e.rotate, e.at))
          var u,
            y = _createForOfIteratorHelper(h.slice(8))
          try {
            for (y.s(); !(u = y.n()).done; ) {
              var L = u.value
              this.points[L].attributes.set(
                'data-text-transform',
                'rotate('
                  .concat(-1 * e.rotate, ', ')
                  .concat(this.points[L].x, ', ')
                  .concat(this.points[L].y, ')')
              )
            }
          } catch (t) {
            y.e(t)
          } finally {
            y.f()
          }
        }
        ;(this.paths.__scaleboxImperial = new this.Path()
          .attr('class', 'scalebox imperial')
          .move(this.points.__scaleboxImperialTopLeft)
          .line(this.points.__scaleboxImperialBottomLeft)
          .line(this.points.__scaleboxImperialBottomRight)
          .line(this.points.__scaleboxImperialTopRight)
          .close()),
          (this.paths.__scaleboxMetric = new this.Path()
            .attr('class', 'scalebox metric')
            .move(this.points.__scaleboxMetricTopLeft)
            .line(this.points.__scaleboxMetricBottomLeft)
            .line(this.points.__scaleboxMetricBottomRight)
            .line(this.points.__scaleboxMetricTopRight)
            .close()),
          (this.points.__scaleboxLead = this.points.__scaleboxLead
            .attr('data-text', e.lead || 'freesewing')
            .attr('data-text-class', 'text-sm')),
          e.title
            ? this.points.__scaleboxTitle.attributes.set('data-text', e.title)
            : (this.points.__scaleboxTitle = this.points.__scaleboxTitle
                .attr('data-text', this.context.config.name)
                .attr('data-text', 'v' + this.context.config.version)),
          this.points.__scaleboxTitle.attributes.add('data-text-class', 'text-lg'),
          'string' == typeof e.text
            ? this.points.__scaleboxText.attr('data-text', e.text)
            : (this.points.__scaleboxText
                .attr('data-text', 'freesewingIsMadeByJoostDeCockAndContributors')
                .attr('data-text', '\n')
                .attr('data-text', 'withTheFinancialSupportOfOurPatrons'),
              (this.points.__scaleboxLink = this.points.__scaleboxLink
                .attr('data-text', 'freesewing.org/patrons/join')
                .attr('data-text-class', 'text-xs fill-note'))),
          this.points.__scaleboxText
            .attr('data-text-class', 'text-xs')
            .attr('data-text-lineheight', 4),
          (this.points.__scaleboxMetric = this.points.__scaleboxMetric
            .attr('data-text', 'theWhiteInsideOfThisBoxShouldMeasure')
            .attr('data-text', '10cm')
            .attr('data-text', 'x')
            .attr('data-text', '5cm')
            .attr('data-text-class', 'text-xs center')),
          (this.points.__scaleboxImperial = this.points.__scaleboxImperial
            .attr('data-text', 'theBlackOutsideOfThisBoxShouldMeasure')
            .attr('data-text', '4"')
            .attr('data-text', 'x')
            .attr('data-text', '2"')
            .attr('data-text-class', 'text-xs center '))
      }
    }
  },
  version$6 = '2.7.0-beta.0',
  index$6 = {
    name: '@freesewing/plugin-round',
    version: '2.7.0-beta.0',
    hooks: {
      preRender: function (t) {
        !1 === t.attributes.get('freesewing:plugin-round') &&
          t.attributes.set('freesewing:plugin-round', version$6)
      }
    },
    macros: {
      round: function (t) {
        var s = Math.round,
          a = 0.55191502449,
          r = t.from,
          o = t.to,
          l = t.via,
          e = t.radius,
          c = t.prefix,
          n = r.angle(l),
          d = l.angle(o)
        0 != (s(n) - s(d)) % 90 &&
          console.log('Warning: The round macro only handles 90 degree angles correctly.')
        var i = r.dist(l),
          p = o.dist(l)
        ;(e > i || e > p || 'undefined' == typeof e) && (e = i > p ? p : i),
          (this.points[c + 'Start'] = l.shiftTowards(r, e)),
          (this.points[c + 'Cp1'] = l.shiftTowards(r, e * (1 - a))),
          (this.points[c + 'Cp2'] = l.shiftTowards(o, e * (1 - a))),
          (this.points[c + 'End'] = l.shiftTowards(o, e)),
          (this.paths[c + 'Rounded'] = new this.Path()
            .move(this.points[c + 'Start'])
            .curve(this.points[c + 'Cp1'], this.points[c + 'Cp2'], this.points[c + 'End'])
            .attr('class', t['class'] ? t['class'] : '')),
          (this.paths[c + 'Rounded'].render = !!('undefined' != typeof t.render && t.render))
      }
    }
  }
function _unsupportedIterableToArray$1(t, e) {
  if (t) {
    if ('string' == typeof t) return _arrayLikeToArray$1(t, e)
    var a = Object.prototype.toString.call(t).slice(8, -1)
    return (
      'Object' === a && t.constructor && (a = t.constructor.name),
      'Map' === a || 'Set' === a
        ? Array.from(a)
        : 'Arguments' === a || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
        ? _arrayLikeToArray$1(t, e)
        : void 0
    )
  }
}
function _arrayLikeToArray$1(t, e) {
  ;(null == e || e > t.length) && (e = t.length)
  for (var s = 0, n = Array(e); s < e; s++) n[s] = t[s]
  return n
}
function _createForOfIteratorHelper$1(t) {
  if ('undefined' == typeof Symbol || null == t[Symbol.iterator]) {
    if (Array.isArray(t) || (t = _unsupportedIterableToArray$1(t))) {
      var a = 0,
        s = function () {}
      return {
        s: s,
        n: function () {
          return a >= t.length ? { done: !0 } : { done: !1, value: t[a++] }
        },
        e: function (t) {
          throw t
        },
        f: s
      }
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }
  var n,
    r,
    o = !0,
    d = !1
  return {
    s: function () {
      n = t[Symbol.iterator]()
    },
    n: function () {
      var t = n.next()
      return (o = t.done), t
    },
    e: function (t) {
      ;(d = !0), (r = t)
    },
    f: function () {
      try {
        o || null == n.return || n.return()
      } finally {
        if (d) throw r
      }
    }
  }
}
var version$7 = '2.7.0-beta.0',
  index$7 = {
    name: '@freesewing/plugin-sprinkle',
    version: '2.7.0-beta.0',
    hooks: {
      preRender: function (t) {
        !1 === t.attributes.get('freesewing:plugin-sprinkle') &&
          t.attributes.set('freesewing:plugin-sprinkle', version$7)
      }
    },
    macros: {
      sprinkle: function (t) {
        var e,
          s = _createForOfIteratorHelper$1(t.on)
        try {
          for (s.s(); !(e = s.n()).done; ) {
            var n = e.value
            this.snippets[n + '-' + t.snippet] = new this.Snippet(t.snippet, this.points[n])
          }
        } catch (t) {
          s.e(t)
        } finally {
          s.f()
        }
      }
    }
  },
  version$8 = '2.7.0-beta.0',
  index$8 = {
    name: '@freesewing/plugin-measurements',
    version: '2.7.0-beta.0',
    hooks: {
      preDraft: function ({ settings: t }) {
        'undefined' != typeof t.measurements.seatBack &&
          'undefined' != typeof t.measurements.seat &&
          ((t.measurements.seatFront = t.measurements.seat - t.measurements.seatBack),
          (t.measurements.seatBackArc = t.measurements.seatBack / 2),
          (t.measurements.seatFrontArc = t.measurements.seatFront / 2)),
          'undefined' != typeof t.measurements.waist &&
            'undefined' != typeof t.measurements.waistBack &&
            ((t.measurements.waistBackArc = t.measurements.waistBack / 2),
            (t.measurements.waistFrontArc = (t.measurements.waist - t.measurements.waistBack) / 2)),
          'undefined' != typeof t.measurements.crossSeam &&
            'undefined' != typeof t.measurements.crossSeamFront &&
            (t.measurements.crossSeamBack =
              t.measurements.crossSeam - t.measurements.crossSeamFront)
      }
    }
  },
  name$5 = '@freesewing/plugin-bundle',
  version$9 = '2.7.0-beta.0'
let bundle = [index, index$1, index$2, index$3, index$4, index$5, index$6, index$7, index$8]
function bundleHooks() {
  let t = {}
  for (let e of bundle)
    for (let a in e.hooks) {
      'undefined' == typeof t[a] && (t[a] = [])
      let s = e.hooks[a]
      if ('function' == typeof s) t[a].push(s)
      else if ('object' == typeof s) for (let e of s) t[a].push(e)
    }
  return t
}
function bundleMacros() {
  let t = {}
  for (let e of bundle) for (let a in e.macros) t[a] = e.macros[a]
  return t
}
var index$9 = {
    name: '@freesewing/plugin-bundle',
    version: '2.7.0-beta.0',
    hooks: bundleHooks(),
    macros: bundleMacros()
  },
  button =
    '<g id="button"><circle cx="0" cy="0" r="3.4" style="stroke:#000000;fill:none;stroke-width:1;"/><circle cx="-1" cy="-1" r="0.5" style="stroke:none;fill:#000000;"/><circle cx="1" cy="-1" r="0.5" style="stroke:none;fill:#000000;" /><circle cx="1" cy="1" r="0.5" style="stroke:none;fill:#000000;" /><circle cx="-1" cy="1" r="0.5" style="stroke:none;fill:#000000;" /></g>',
  buttonhole =
    '<g id="buttonhole"><path style="fill:none;stroke:#000000;" d="M -1,-5 L 1,-5 L 1,5 L -1,5 z" /><path style="fill:#000000;stroke:none;" d="M -1,-5 L 1,-5 L 1,-4 L -1,-4 z M -1,5 L 1,5 L 1,4 L -1,4 z" /></g>',
  snaps =
    '<radialGradient id="snap-stud-grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"><stop offset="30%" style="stop-color:rgb(235,235,235); stop-opacity:1"/><stop offset="80%" style="stop-color:rgb(100,100,100);stop-opacity:1" /></radialGradient><g id="snap-stud" ><circle id="snap-stud-circle-edge" cx="0" cy="0" r="3.4" style="stroke:#666;fill:#dddddd;stroke-width:0.3;" /><circle id="snap-stud-circle-middle" cx="0" cy="0" r="1.8" style="stroke:none;fill:url(#snap-stud-grad);"/><path style="fill:none;stroke:#666; stroke-width:0.2;" d="M -2,0 L -3,0 M 2,0 L 3,0 M 0,2 L 0,3 M 0,-2 L 0,-3 M 1.5,1.5 L 2.1,2.1 M -1.5,1.5 L -2.1,2.1 M -1.5,-1.5 L -2.1,-2.1 M 1.5,-1.5 L 2.1,-2.1" id="snap-stud-lines"/></g><g id="snap-socket"><circle id="snap-socket-circle-edge" cx="0" cy="0" r="3.4" style="stroke:#666;fill:#bbbbbb;stroke-width:0.3;"/><circle id="snap-socket-circle-middle" cx="0" cy="0" r="2" style="stroke:#666;fill:#dddddd; stroke-width:0.4;"/><path style="fill:none;stroke:#666; stroke-width:0.5;" d="M -1.7,-1 L -1.7,1 M 1.7,-1 L 1.7,1" id="snap-socket-lines" /></g>',
  name = '@freesewing/plugin-buttons',
  version$a = '2.7.0-beta.1',
  index$a = {
    name: name,
    version: version$a,
    hooks: {
      preRender: function (t) {
        !1 === t.attributes.get('freesewing:plugin-buttons') &&
          t.attributes.set('freesewing:plugin-buttons', version$a),
          (t.defs += button + buttonhole + snaps)
      }
    }
  },
  config = {
    name: 'legend',
    version: '2.7.0-beta.0',
    design: 'Joost De Cock',
    code: 'Joost De Cock',
    department: 'accessories',
    type: 'pattern',
    difficulty: 1,
    tags: ['documentation'],
    optionGroups: { fit: ['fixme'] },
    measurements: [],
    parts: [
      'fabricLines',
      'saLines',
      'otherLines',
      'sa',
      'logo',
      'notches',
      'buttons',
      'snaps',
      'cutonfold',
      'grainline',
      'dimension',
      'title',
      'scalebox',
      'lineWidths',
      'lineStrokes',
      'sizes'
    ],
    options: { focus: '', fixme: { pct: 50, min: 0, max: 100 } }
  }
function box(t, e = 100, a = 50) {
  return (
    (t.paths.box = new t.Path()
      .move(new t.Point(0, 0))
      .line(new t.Point(e, a))
      .attr('class', 'hidden')),
    t
  )
}
function drawLine(t, a, s) {
  let { points: n, Point: r, paths: e, Path: o } = t.shorthand()
  return (
    (n[`${s}From`] = new r(10, a)),
    (n[`${s}To`] = new r(110, a)),
    (e[s] = new o()
      .move(n[`${s}From`])
      .line(n[`${s}To`])
      .attr('class', s)
      .attr('data-text', s)
      .attr('data-text-class', 'center')),
    t
  )
}
const fabricTypes = ['fabric', 'lining', 'canvas', 'interfacing', 'various'],
  lineTypes = ['note', 'mark', 'contrast', 'help'],
  lineWidths = ['stroke-xs', 'stroke-sm', 'default', 'stroke-lg', 'stroke-xl', 'stroke-xxl'],
  lineStrokes = ['dotted', 'dashed', 'lashed']
var draftFabricLines = (t) => {
    let e = 10
    for (const a of fabricTypes) drawLine(t, e, a), (e += 15)
    return box(t, 120, 65)
  },
  draftSaLines = (t) => {
    let e = 10
    for (const a of fabricTypes) drawLine(t, e, a + ' sa'), (e += 15)
    return box(t, 120, 65)
  },
  draftOtherLines = (t) => {
    let { points: s, Point: n, paths: r, Path: o, snippets: e, Snippet: a } = t.shorthand()
    const l = (t, e) => {
      ;(s[`${e}From`] = new n(10, t)),
        (s[`${e}To`] = new n(d, t)),
        (r[e] = new o()
          .move(s[`${e}From`])
          .line(s[`${e}To`])
          .attr('class', e)
          .attr('data-text', e)
          .attr('data-text-class', 'center'))
    }
    let c = 10,
      d = 110
    for (const e of lineTypes) l(c, e), (c += 15)
    return box(t, 120, 65)
  },
  draftSa = (t) => {
    const { points: a, Point: s, paths: n, Path: r } = t.shorthand()
    return (
      (a.a = new s(10, 40)),
      (a.aCp = new s(40, 40)),
      (a.b = new s(69.5, 10)),
      (a.c = new s(110, 50)),
      (n.a = new r()
        .move(a.a)
        .curve_(a.aCp, a.b)
        .line(a.c)
        .attr('class', 'fabric')
        .attr('data-text', 'seam')),
      (n.sa = n.a.offset(-10).attr('class', 'fabric sa').attr('data-text', 'seamAllowance')),
      box(t, 120, 60)
    )
  },
  draftNotches = (t) => {
    const { points: a, Point: s, snippets: n, Snippet: r } = t.shorthand()
    return (
      (a.a = new s(30, 10)),
      (a.atxt = new s(30, 20).attr('data-text', 'notch').attr('data-text-class', 'center')),
      (n.a = new r('notch', a.a)),
      (a.b = new s(80, 10)),
      (a.btxt = new s(80, 20).attr('data-text', 'bnotch').attr('data-text-class', 'center')),
      (n.b = new r('bnotch', a.b)),
      box(t, 120, 30)
    )
  },
  draftButtons = (t) => {
    const { points: a, Point: s, snippets: n, Snippet: r } = t.shorthand()
    return (
      (a.a = new s(30, 10)),
      (a.atxt = new s(30, 20).attr('data-text', 'button').attr('data-text-class', 'center')),
      (n.a = new r('button', a.a)),
      (a.b = new s(80, 10)),
      (a.btxt = new s(80, 20).attr('data-text', 'buttonhole').attr('data-text-class', 'center')),
      (n.b = new r('buttonhole', a.b).attr('data-rotate', 90)),
      box(t, 120, 30)
    )
  },
  draftSnaps = (t) => {
    const { points: a, Point: s, snippets: n, Snippet: r } = t.shorthand()
    return (
      (a.a = new s(30, 10)),
      (a.atxt = new s(30, 20).attr('data-text', 'snap-stud').attr('data-text-class', 'center')),
      (n.a = new r('snap-stud', a.a)),
      (a.b = new s(80, 10)),
      (a.btxt = new s(80, 20).attr('data-text', 'snap-socket').attr('data-text-class', 'center')),
      (n.b = new r('snap-socket', a.b).attr('data-rotate', 90)),
      box(t, 120, 30)
    )
  },
  draftLogo = (t) => {
    const { points: a, Point: s, snippets: n, Snippet: r } = t.shorthand()
    return (
      (a.a = new s(50, 40)),
      (a.atxt = new s(30, 20).attr('data-text', 'logo').attr('data-text-class', 'center')),
      (n.a = new r('logo', a.a)),
      box(t, 100, 60)
    )
  },
  draftCutonfold = (t) => {
    const { points: e, Point: a, macro: s } = t.shorthand()
    return (
      (e.a = new a(10, 20)),
      (e.b = new a(90, 20)),
      s('cutonfold', { from: e.a, to: e.b }),
      box(t, 100, 25)
    )
  },
  draftGrainline = (t) => {
    const { points: e, Point: a, macro: s } = t.shorthand()
    return (
      (e.a = new a(10, 20)),
      (e.b = new a(90, 20)),
      s('grainline', { from: e.a, to: e.b }),
      box(t, 100, 25)
    )
  },
  draftDimension = (t) => {
    const { points: e, Point: a, macro: s } = t.shorthand()
    return (
      (e.a = new a(10, 20)), (e.b = new a(90, 20)), s('ld', { from: e.a, to: e.b }), box(t, 100, 25)
    )
  },
  draftTitle = (t) => {
    const { points: e, Point: a, macro: s } = t.shorthand()
    return (
      (e.a = new a(30, 30)), s('title', { at: e.a, nr: 1, title: 'Part name' }), box(t, 100, 65)
    )
  },
  draftScalebox = (t) => {
    const { points: e, Point: a, macro: s } = t.shorthand()
    return (e.a = new a(55, 25)), s('scalebox', { at: e.a }), box(t, 110, 55)
  },
  draftLineWidths = (t) => {
    let e = 10
    for (const a of lineWidths) drawLine(t, e, a), (e += 15)
    return box(t, 120, 95)
  },
  draftLineStrokes = (t) => {
    let e = 10
    for (const a of lineStrokes) drawLine(t, e, a), (e += 15)
    return box(t, 120, 50)
  },
  draftSizes = (t) => {
    const { points: a, Point: s, paths: n, Path: r } = t.shorthand()
    return (
      (a.xxxs1 = new s(0, 10)),
      (a.xxxs2 = new s(10, 10)),
      (n.xxxs = new r()
        .move(a.xxxs1)
        .line(a.xxxs2)
        .attr('class', 'size-3XS')
        .attr('data-text', '3XS')
        .attr('data-text-class', 'center text-xs')),
      (a.xxs1 = new s(12, 10)),
      (a.xxs2 = new s(22, 10)),
      (n.xxs = new r()
        .move(a.xxs1)
        .line(a.xxs2)
        .attr('class', 'size-2XS')
        .attr('data-text', '2XS')
        .attr('data-text-class', 'center text-xs')),
      (a.xs1 = new s(24, 10)),
      (a.xs2 = new s(34, 10)),
      (n.xs = new r()
        .move(a.xs1)
        .line(a.xs2)
        .attr('class', 'size-XS')
        .attr('data-text', 'XS')
        .attr('data-text-class', 'center text-xs')),
      (a.s1 = new s(36, 10)),
      (a.s2 = new s(46, 10)),
      (n.s = new r()
        .move(a.s1)
        .line(a.s2)
        .attr('class', 'size-S')
        .attr('data-text', 'S')
        .attr('data-text-class', 'center text-xs')),
      (a.m1 = new s(48, 10)),
      (a.m2 = new s(58, 10)),
      (n.m = new r()
        .move(a.m1)
        .line(a.m2)
        .attr('class', 'size-M')
        .attr('data-text', 'M')
        .attr('data-text-class', 'center text-xs')),
      (a.l1 = new s(60, 10)),
      (a.l2 = new s(70, 10)),
      (n.l = new r()
        .move(a.l1)
        .line(a.l2)
        .attr('class', 'size-L')
        .attr('data-text', 'L')
        .attr('data-text-class', 'center text-xs')),
      (a.xl1 = new s(72, 10)),
      (a.xl2 = new s(82, 10)),
      (n.xl = new r()
        .move(a.xl1)
        .line(a.xl2)
        .attr('class', 'size-XL')
        .attr('data-text', 'XL')
        .attr('data-text-class', 'center text-xs')),
      (a.xxl1 = new s(84, 10)),
      (a.xxl2 = new s(96, 10)),
      (n.xxl = new r()
        .move(a.xxl1)
        .line(a.xxl2)
        .attr('class', 'size-2XL')
        .attr('data-text', '2XL')
        .attr('data-text-class', 'center text-xs')),
      (a.xxxl1 = new s(98, 10)),
      (a.xxxl2 = new s(108, 10)),
      (n.xxxl = new r()
        .move(a.xxxl1)
        .line(a.xxxl2)
        .attr('class', 'size-3XL')
        .attr('data-text', '3XL')
        .attr('data-text-class', 'center text-xs')),
      (a.xxxxl1 = new s(110, 10)),
      (a.xxxxl2 = new s(120, 10)),
      (n.xxxxl = new r()
        .move(a.xxxxl1)
        .line(a.xxxxl2)
        .attr('class', 'size-4XL')
        .attr('data-text', '4XL')
        .attr('data-text-class', 'center text-xs')),
      (a.m2m1 = new s(0, 17)),
      (a.m2m2 = new s(120, 17)),
      (n.m2m = new r()
        .move(a.m2m1)
        .line(a.m2m2)
        .attr('class', 'made-to-measure')
        .attr('data-text', 'madeToMeasure')
        .attr('data-text-class', 'center text-xs')),
      box(t, 120, 20)
    )
  }
const Pattern = new freesewing.Design(config, [index$9, index$a])
let methods = {
  draftFabricLines,
  draftSaLines,
  draftOtherLines,
  draftSa,
  draftLogo,
  draftButtons,
  draftSnaps,
  draftNotches,
  draftCutonfold,
  draftGrainline,
  draftDimension,
  draftTitle,
  draftScalebox,
  draftLineWidths,
  draftLineStrokes,
  draftSizes
}
for (let t of Object.keys(methods)) Pattern.prototype[t] = methods[t]
var Svg = function (t) {
  var e = t.embed,
    a = t.design,
    s = t.language,
    n = void 0 === s ? 'en' : s,
    r = t.className,
    o = void 0 === r ? 'freesewing draft' : r,
    i = t.style,
    l = void 0 === i ? {} : i,
    c = t.viewBox,
    d = t.width,
    p = t.height,
    m = t.children,
    x = {
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:svg': 'http://www.w3.org/2000/svg',
      xmlnsXlink: 'http://www.w3.org/1999/xlink',
      xmlLang: n,
      viewBox: (void 0 !== c && c) || '0 0 '.concat(d, ' ').concat(p),
      className: o,
      style: l
    }
  return (
    void 0 === e || e || ((x.width = d + 'mm'), (x.height = p + 'mm')),
    void 0 !== a && a && (x.className += ' design'),
    React.createElement('svg', x, m)
  )
}
function _extends() {
  return (
    (_extends =
      Object.assign ||
      function (t) {
        for (var e, a = 1; a < arguments.length; a++)
          for (var s in ((e = arguments[a]), e))
            Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s])
        return t
      }),
    _extends.apply(this, arguments)
  )
}
function _unsupportedIterableToArray$2(t, e) {
  if (t) {
    if ('string' == typeof t) return _arrayLikeToArray$2(t, e)
    var a = Object.prototype.toString.call(t).slice(8, -1)
    return (
      'Object' === a && t.constructor && (a = t.constructor.name),
      'Map' === a || 'Set' === a
        ? Array.from(a)
        : 'Arguments' === a || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)
        ? _arrayLikeToArray$2(t, e)
        : void 0
    )
  }
}
function _arrayLikeToArray$2(t, e) {
  ;(null == e || e > t.length) && (e = t.length)
  for (var a = 0, s = Array(e); a < e; a++) s[a] = t[a]
  return s
}
function _createForOfIteratorHelper$2(t) {
  if ('undefined' == typeof Symbol || null == t[Symbol.iterator]) {
    if (Array.isArray(t) || (t = _unsupportedIterableToArray$2(t))) {
      var e = 0,
        a = function () {}
      return {
        s: a,
        n: function () {
          return e >= t.length ? { done: !0 } : { done: !1, value: t[e++] }
        },
        e: function (t) {
          throw t
        },
        f: a
      }
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }
  var s,
    n,
    r = !0,
    l = !1
  return {
    s: function () {
      s = t[Symbol.iterator]()
    },
    n: function () {
      var t = s.next()
      return (r = t.done), t
    },
    e: function (t) {
      ;(l = !0), (n = t)
    },
    f: function () {
      try {
        r || null == s.return || s.return()
      } finally {
        if (l) throw n
      }
    }
  }
}
var Markers = function () {
    var t = { orient: 'auto', refX: '0.0', refY: '0.0', style: { overflow: 'visible' } },
      e = { d: 'M 0,0 L 12,-4 C 10,-2 10,2  12, 4 z' },
      a = { d: 'M 0,0 L -12,-4 C -10,-2 -10,2  -12, 4 z' },
      s = { grainline: 'note', cutonfold: 'note', dimension: 'mark' },
      n = []
    for (var r in s)
      n.push(
        React.createElement(
          'marker',
          _extends({ id: r + 'From', key: r + '-from' }, t),
          React.createElement('path', _extends({ className: s[r] + ' fill-' + s[r] }, e))
        )
      ),
        n.push(
          React.createElement(
            'marker',
            _extends({ id: r + 'To', key: r + '-to' }, t),
            React.createElement('path', _extends({ className: s[r] + ' fill-' + s[r] }, a))
          )
        )
    return n
  },
  logoPathString =
    'M 35.222,0 C 34.233,0.703 34.284,0.613 33.485,0.874 31.653,1.473 29.896,1.144 27.811,0.97 27.184,0.9 26.562,0.859 25.955,0.855 22.89,0.834 20.287,1.733 19.794,4.243 18.885,4.794 18.049,5.461 17.221,6.129 15.453,7.524 14.122,9.229 13.214,11.284 11.974,14.319 13.094,17.576 13.649,20.652 13.781,21.372 13.919,22.058 13.993,22.323 14.098,22.696 14.283,23.052 14.484,23.372 14.531,23.38 14.779,22.998 14.838,22.829 14.924,22.583 14.915,22.188 14.821,21.848 14.613,21.083 14.415,20.462 14.398,20.15 14.368,19.564 14.482,19.023 14.696,18.755 14.772,18.66 14.946,19.15 14.901,19.332 14.848,19.551 14.808,19.926 14.825,20.099 14.872,20.685 14.958,21.312 15.065,21.86 15.202,22.567 15.261,23.021 15.236,23.197 15.218,23.325 15.158,23.454 14.928,23.85 14.728,24.197 14.624,24.478 14.608,24.726 14.591,24.968 14.664,25.573 14.732,25.721 14.831,25.952 15.129,26.195 15.389,26.255 15.638,26.35 15.763,26.547 15.891,26.768 16.202,27.361 16.442,28.083 16.68,29.171 16.796,29.692 16.893,30.157 16.924,30.401 15.004,30.403 12.545,30.404 10.305,30.404 9.551,30.416 8.189,30.062 6.94,29.98 6.759,28.026 5.901,25.756 4.433,25.624 3.431,25.533 2.6,25.914 1.897,27.497 L 1.917,27.582 C 2.332,27.235 2.77,26.174 4.348,26.247 5.56,26.302 5.964,28.596 6.084,29.976 5.346,30.03 4.718,30.257 4.39,30.824 L 4.383,30.824 C 4.383,30.825 4.383,30.827 4.386,30.829 4.383,30.831 4.383,30.833 4.383,30.835 L 4.39,30.835 C 4.728,31.416 5.379,31.641 6.144,31.686 6.655,46.136 20.238,48 23.95,48 37.798,48 42.646,38.59 43.375,34.863 43.716,36.451 42.642,38.474 42.385,39.967 45.306,36.59 44.778,33.343 44.244,30.077 44.688,30.605 45.289,30.932 46.104,30.751 45.523,30.363 44.735,30.635 44.263,28.998 44.057,28.291 43.879,27.761 43.702,27.316 43.32,25.883 42.778,24.514 42.112,23.18 41.55,21.733 41.921,20.795 41.865,19.553 42.876,22.887 43.508,23.774 44.688,24.123 41.72,20.547 42.736,15.01 41.059,10.068 41.818,10.514 42.684,10.648 43.606,10.103 42.714,9.849 41.824,10.52 40.544,8.639 39.463,6.536 37.897,4.983 35.997,3.613 34.979,2.949 33.849,2.503 32.713,2.089 33.87,1.799 35.162,0.769 35.222,0 z M 33.281,11.107 C 34.805,11.663 36.485,13.775 36.466,15.847 L 36.466,15.933 36.466,15.963 C 36.425,18.777 35.146,20.29 35.2,22.164 35.269,24.371 36.219,25.141 36.408,25.509 36.084,24.148 35.894,22.436 36.322,21.08 36.872,19.336 37.427,17.892 37.387,16.526 37.367,16.206 37.231,15.009 37.14,14.479 38.774,16.837 36.786,20.266 37.358,22.51 38.352,26.419 42.807,26.913 41.481,34.789 40.314,41.713 32.318,46.968 24.122,46.968 18.046,46.968 7.517,43.605 6.997,31.676 8.232,31.588 9.56,31.244 10.305,31.256 12.557,31.256 15.129,31.257 17.067,31.258 17.431,32.9 17.704,33.296 19.085,34.39 20.621,35.598 20.979,35.745 23.251,35.767 25.524,35.79 26.198,35.303 28.403,33.217 28.879,32.659 29.085,31.928 29.316,31.241 31.584,31.22 33.238,31.18 34.865,31.104 36.522,31.029 36.756,31.104 39.426,30.829 36.756,30.554 36.522,30.629 34.865,30.553 33.281,30.481 31.677,30.44 29.508,30.42 29.69,29.603 29.95,28.805 30.227,28.016 30.398,27.551 30.599,27.098 30.805,26.647 L 31.03,26.577 C 31.464,26.423 31.848,26.093 32.001,25.647 32.198,25.056 32.058,24.392 31.677,23.909 31.546,23.728 31.383,23.497 31.316,23.395 31.115,23.077 31.11,22.9 31.28,21.718 31.423,20.728 31.439,20.21 31.34,19.708 31.32,19.421 31.318,18.831 31.309,18.672 31.385,18.714 31.55,19.09 31.717,19.599 31.883,20.11 31.91,20.216 31.948,20.651 31.99,21.145 31.805,21.511 31.653,22.248 31.577,22.628 31.51,22.981 31.51,23.029 31.51,23.08 31.546,23.188 31.584,23.272 31.673,23.46 31.84,23.724 31.871,23.724 32.416,23.123 32.736,22.381 33.021,21.628 33.321,20.776 33.409,19.872 33.619,18.995 33.789,18.231 33.985,17.466 34.046,16.682 34.169,15.152 34.097,14.072 33.759,12.478 33.678,12.118 33.444,11.431 33.281,11.107 z M 27.921,18.644 C 28.506,18.637 29.085,18.708 29.636,18.867 30.385,19.154 30.49,19.823 30.628,20.574 30.705,21.054 30.702,21.399 30.615,21.963 30.554,22.781 30.229,23.414 29.519,23.859 28.448,24.057 27.303,24.248 26.395,23.539 25.633,22.489 25.174,21.162 25.349,19.868 25.46,19.337 25.707,19.061 26.215,18.896 26.762,18.739 27.341,18.653 27.921,18.644 z M 19.038,18.739 C 19.585,18.734 20.138,18.792 20.442,18.986 21.747,19.869 21.328,21.306 20.812,22.567 20.061,24.218 18.437,24.157 16.863,24.144 15.992,23.889 15.912,23.175 15.786,22.412 15.678,21.675 15.448,20.885 15.64,20.144 16.133,18.952 17.935,18.815 19.038,18.739 z M 38.941,18.945 C 38.948,22.118 39.49,23.677 40.578,25.924 39.937,24.701 39.021,24.005 38.68,22.543 38.028,19.72 38.731,19.878 38.941,18.945 z M 23.128,21.243 C 23.3,21.417 23.383,21.657 23.532,21.848 23.647,21.651 23.765,21.455 23.913,21.28 23.99,21.282 24.084,21.434 24.169,21.706 24.533,22.712 24.604,23.819 25.076,24.786 25.517,25.486 24.915,25.894 24.254,25.926 23.772,25.925 23.568,25.596 23.285,25.27 23.212,25.483 23.073,25.62 22.907,25.764 22.485,26.118 21.658,25.987 21.53,25.429 21.7,24.363 22.243,23.384 22.599,22.362 22.776,21.989 22.778,21.703 23.128,21.243 z M 16.936,26.628 C 17.149,26.628 17.734,27.025 17.853,27.249 17.935,27.398 18.122,27.978 18.135,28.119 18.156,28.287 18.105,28.685 18.053,28.793 18.015,28.87 17.986,28.881 17.942,28.831 17.905,28.789 17.415,27.849 17.102,27.227 16.856,26.729 16.83,26.628 16.936,26.628 z M 29.158,26.939 C 29.166,26.94 29.178,26.943 29.189,26.946 29.255,26.973 29.209,27.207 28.961,28.057 28.914,28.313 28.8,28.515 28.633,28.683 28.578,28.683 28.553,28.619 28.467,28.264 28.394,27.961 28.386,27.691 28.437,27.449 28.525,27.146 28.881,27.053 29.158,26.939 z M 27.675,28.792 C 27.696,28.788 27.716,28.799 27.742,28.82 27.832,28.883 27.845,29.049 27.785,29.374 27.712,29.792 27.696,29.838 27.588,29.881 27.541,29.902 27.457,29.917 27.401,29.917 27.3,29.899 27.274,29.817 27.298,29.693 27.298,29.433 27.374,29.207 27.546,28.94 27.611,28.84 27.644,28.797 27.675,28.792 z M 19.042,28.811 C 19.111,28.811 19.319,28.961 19.396,29.065 19.482,29.175 19.58,29.83 19.525,29.943 19.462,30.085 19.154,30.014 19.069,29.837 19.017,29.731 18.894,29.159 18.894,29.023 18.894,28.897 18.955,28.811 19.042,28.811 z M 26.933,28.984 C 27.017,29.104 27.039,29.258 27.021,29.596 L 27.004,29.904 26.916,29.992 C 26.863,30.041 26.773,30.101 26.719,30.126 26.6,30.182 26.509,30.187 26.492,30.142 26.472,30.082 26.506,29.7 26.543,29.571 26.586,29.438 26.779,29.041 26.843,28.957 26.872,28.88 26.906,28.976 26.933,28.984 z M 21.912,28.966 C 22.093,29.012 22.173,29.175 22.272,29.323 L 22.339,29.455 22.245,29.782 C 22.195,29.962 22.142,30.124 22.126,30.142 22.108,30.162 22.041,30.172 21.942,30.171 21.678,30.164 21.648,30.153 21.577,30.045 L 21.511,29.947 21.567,29.672 C 21.648,29.276 21.687,29.157 21.777,29.055 21.824,29 21.871,28.97 21.912,28.966 z M 20.241,29.249 20.39,29.398 20.415,29.735 C 20.428,29.919 20.434,30.09 20.424,30.111 20.415,30.14 20.361,30.148 20.194,30.148 L 19.977,30.148 C 19.861,30.021 19.825,29.866 19.776,29.706 19.662,29.225 19.662,29.006 19.78,28.977 19.973,28.989 20.1,29.129 20.241,29.249 z M 26.041,29.018 C 26.277,29.081 26.23,29.456 26.229,29.724 26.211,30.158 26.194,30.248 26.138,30.304 26.041,30.401 25.771,30.347 25.64,30.203 25.597,30.151 25.593,30.135 25.627,29.924 25.666,29.667 25.716,29.507 25.827,29.287 25.908,29.129 25.984,29.03 26.041,29.018 z M 20.715,29.038 C 20.728,29.037 20.749,29.038 20.769,29.04 20.919,29.052 21.059,29.15 21.183,29.33 L 21.283,29.477 C 21.292,29.718 21.283,29.972 21.24,30.196 21.214,30.209 21.106,30.229 21,30.239 20.816,30.256 20.799,30.252 20.735,30.196 20.646,30.12 20.621,29.979 20.599,29.511 20.586,29.129 20.595,29.044 20.715,29.038 z M 22.984,29.118 C 23.145,29.152 23.247,29.238 23.292,29.379 23.328,29.5 23.35,30.177 23.315,30.224 23.303,30.244 23.227,30.269 23.14,30.28 22.816,30.321 22.53,30.29 22.502,30.213 22.466,30.125 22.707,29.253 22.796,29.145 22.834,29.061 22.926,29.126 22.984,29.118 z M 25.082,29.124 C 25.153,29.117 25.229,29.185 25.303,29.33 25.363,29.451 25.372,29.493 25.372,29.764 25.372,29.98 25.359,30.073 25.336,30.093 25.316,30.109 25.235,30.138 25.149,30.16 24.999,30.199 24.966,30.203 24.919,30.187 L 24.694,30.146 24.711,30.012 C 24.727,29.837 24.842,29.449 24.923,29.281 24.971,29.181 25.026,29.131 25.082,29.124 z M 24.104,29.127 C 24.151,29.125 24.173,29.136 24.203,29.169 24.274,29.253 24.364,29.501 24.421,29.766 24.497,30.139 24.497,30.138 24.334,30.187 24.263,30.209 24.113,30.232 24.006,30.238 23.653,30.256 23.626,30.235 23.669,29.923 23.703,29.645 23.84,29.207 23.899,29.175 23.963,29.141 24.037,29.142 24.104,29.127 z M 6.111,30.536 C 6.114,30.535 6.118,30.536 6.118,30.536 6.127,30.731 6.127,30.928 6.131,31.124 5.636,31.086 5.272,30.968 5.272,30.829 5.272,30.692 5.623,30.575 6.111,30.536 z M 6.976,30.553 C 7.377,30.603 7.654,30.708 7.649,30.829 7.649,30.951 7.381,31.055 6.983,31.104 6.979,30.921 6.979,30.737 6.976,30.553 z M 25.702,31.086 C 25.736,31.083 25.751,31.08 25.803,31.085 26.011,31.106 26.041,31.119 26.041,31.189 26.041,31.281 25.883,31.558 25.776,31.654 25.726,31.702 25.657,31.742 25.633,31.742 25.513,31.742 25.443,31.489 25.499,31.256 25.533,31.13 25.595,31.091 25.702,31.086 z M 24.947,31.169 C 25.04,31.161 25.13,31.186 25.22,31.198 25.194,31.461 25.076,31.676 24.857,31.819 24.803,31.819 24.776,31.716 24.776,31.491 24.776,31.223 24.79,31.172 24.947,31.169 z M 24.119,31.266 C 24.312,31.266 24.482,31.275 24.49,31.286 24.526,31.32 24.422,31.578 24.269,31.84 24.138,32.073 24.119,32.09 24.038,32.096 23.72,32.06 23.729,31.687 23.68,31.431 23.68,31.279 23.714,31.266 24.119,31.266 z M 21.11,31.295 C 21.331,31.299 21.417,31.332 21.417,31.417 21.417,31.525 21.335,31.74 21.288,31.767 21.217,31.806 21.211,31.804 21.071,31.658 20.85,31.41 20.825,31.364 21.11,31.295 z M 22.174,31.306 C 22.178,31.312 22.221,31.39 22.264,31.478 22.358,31.661 22.365,31.741 22.298,31.802 22.14,31.892 22.107,31.841 21.964,31.75 21.798,31.593 21.667,31.382 21.71,31.338 21.858,31.285 22.021,31.305 22.174,31.306 z M 22.596,31.311 22.991,31.318 C 23.145,31.318 23.278,31.326 23.285,31.338 23.312,31.362 23.225,31.876 23.178,31.992 23.124,32.122 22.935,32.123 22.837,31.969 22.697,31.748 22.605,31.562 22.602,31.434 L 22.596,31.311 z',
  Snippets = function () {
    var t = { fill: 'currentColor', stroke: 'none' },
      e = { fill: 'none', stroke: 'currentColor' }
    return [
      React.createElement(
        'g',
        { id: 'notch', className: 'snippet notch', key: 'notch' },
        React.createElement('circle', _extends({ cy: '0', cx: '0', r: '1.4' }, t)),
        React.createElement('circle', _extends({ cy: '0', cx: '0', r: '2.8' }, e))
      ),
      React.createElement(
        'g',
        { id: 'bnotch', className: 'snippet bnotch', key: 'bnotch' },
        React.createElement(
          'path',
          _extends({ d: 'M -1.1 -1.1 L 1.1 1.1 M 1.1 -1.1 L -1.1 1.1' }, e)
        ),
        React.createElement('circle', _extends({ cy: '0', cx: '0', r: '2.8' }, e))
      ),
      React.createElement(
        'g',
        { id: 'button', className: 'snippet button', key: 'button' },
        React.createElement('circle', _extends({ cx: '0', cy: '0', r: '3.4' }, e)),
        ' />',
        React.createElement('circle', _extends({ cx: '-1', cy: '-1', r: '0.5' }, t)),
        React.createElement('circle', _extends({ cx: '1', cy: '-1', r: '0.5' }, t)),
        React.createElement('circle', _extends({ cx: '1', cy: '1', r: '0.5' }, t)),
        React.createElement('circle', _extends({ cx: '-1', cy: '1', r: '0.5' }, t))
      ),
      React.createElement(
        'g',
        { id: 'buttonhole', className: 'snippet buttonhole', key: 'buttonhole' },
        React.createElement('path', _extends({ d: 'M -1,-5 L 1,-5 L 1,5 L -1,5 z' }, e)),
        React.createElement(
          'path',
          _extends({ d: 'M -1,-5 L 1,-5 L 1,-4 L -1,-4 z M -1,5 L 1,5 L 1,4 L -1,4 z' }, t)
        )
      ),
      React.createElement(
        'radialGradient',
        { key: 'grad', id: 'snap-stud-grad', cx: '50%', cy: '50%', r: '50%', fx: '50%', fy: '50%' },
        React.createElement('stop', {
          offset: '30%',
          style: { stopColor: 'rgb(235,235,235)', stopOpacity: 1 }
        }),
        React.createElement('stop', {
          offset: '80%',
          style: { stopColor: 'rgb(100,100,100)', stopOpacity: 1 }
        })
      ),
      React.createElement(
        'g',
        { id: 'snap-stud', key: 'snapstud' },
        React.createElement('circle', {
          cx: '0',
          cy: '0',
          r: '3.4',
          style: { stroke: '#666', fill: '#dddddd', strokeWidth: 0.3 }
        }),
        React.createElement('circle', {
          cx: '0',
          cy: '0',
          r: '1.8',
          style: { stroke: 'none', fill: 'url(#snap-stud-grad)' }
        }),
        React.createElement('path', {
          style: { fill: 'none', stroke: '#666', strokeWidth: 0.2 },
          d:
            'M -2,0 L -3,0 M 2,0 L 3,0 M 0,2 L 0,3 M 0,-2 L 0,-3 M 1.5,1.5 L 2.1,2.1 M -1.5,1.5 L -2.1,2.1 M -1.5,-1.5 L -2.1,-2.1 M 1.5,-1.5 L 2.1,-2.1'
        })
      ),
      React.createElement(
        'g',
        { id: 'snap-socket', key: 'snapsocket' },
        React.createElement('circle', {
          cx: '0',
          cy: '0',
          r: '3.4',
          style: { stroke: '#666', fill: '#bbbbbb', strokeWidth: 0.3 }
        }),
        React.createElement('circle', {
          cx: '0',
          cy: '0',
          r: '2',
          style: { stroke: '#666', fill: '#dddddd', strokeWidth: 0.4 }
        }),
        React.createElement('path', {
          style: { fill: 'none', stroke: '#666', strokeWidth: 0.5 },
          d: 'M -1.7,-1 L -1.7,1 M 1.7,-1 L 1.7,1'
        })
      ),
      React.createElement(
        'g',
        { id: 'logo', className: 'snippet logo', transform: 'translate(-23 -36)', key: 'logo' },
        React.createElement('path', _extends({ d: logoPathString }, t))
      )
    ]
  },
  Grid = function (t) {
    var e = { style: { fill: 'none', stroke: 'currentColor' } }
    return 'imperial' === t.units
      ? React.createElement(
          'pattern',
          {
            id: 'grid',
            height: '25.4',
            width: '25.4',
            patternUnits: 'userSpaceOnUse',
            key: 'grid'
          },
          React.createElement(
            'path',
            _extends({ className: 'gridline lg imperial', d: 'M 0 0 L 0 25.4 L 25.4 25.4' }, e)
          ),
          React.createElement(
            'path',
            _extends(
              { className: 'gridline lg imperial', d: 'M 12.7 0 L 12.7 25.4 M 0 12.7 L 25.4 12.7' },
              e
            )
          ),
          React.createElement(
            'path',
            _extends(
              {
                className: 'gridline sm imperial',
                d:
                  'M 3.175 0 L 3.175 25.4 M 6.32 0 L 6.35 25.4 M 9.525 0 L 9.525 25.4 M 15.875 0 L 15.875 25.4 M 19.05 0 L 19.05 25.4 M 22.225 0 L 22.225 25.4'
              },
              e
            )
          ),
          React.createElement(
            'path',
            _extends(
              {
                className: 'gridline sm imperial',
                d:
                  'M 0 3.175 L 25.4 3.175 M 0 6.32 L 25.4 6.35 M 0 9.525 L 25.4 9.525 M 0 15.875 L 25.4 15.875 M 0 19.05 L 25.4 19.05 M 0 22.225 L 25.4 22.225'
              },
              e
            )
          )
        )
      : React.createElement(
          'pattern',
          { id: 'grid', height: '100', width: '100', patternUnits: 'userSpaceOnUse', key: 'grid' },
          React.createElement(
            'path',
            _extends({ className: 'gridline lg metric', d: 'M 0 0 L 0 100 L 100 100' }, e)
          ),
          React.createElement(
            'path',
            _extends({ className: 'gridline metric', d: 'M 50 0 L 50 100 M 0 50 L 100 50' }, e)
          ),
          React.createElement(
            'path',
            _extends(
              {
                className: 'gridline sm metric',
                d:
                  'M 10 0 L 10 100 M 20 0 L 20 100 M 30 0 L 30 100 M 40 0 L 40 100 M 60 0 L 60 100 M 70 0 L 70 100 M 80 0 L 80 100 M 90 0 L 90 100'
              },
              e
            )
          ),
          React.createElement(
            'path',
            _extends(
              {
                className: 'gridline sm metric',
                d:
                  'M 0 10 L 100 10 M 0 20 L 100 20 M 0 30 L 100 30 M 0 40 L 100 40 M 0 60 L 100 60 M 0 70 L 100 70 M 0 80 L 100 80 M 0 90 L 100 90'
              },
              e
            )
          ),
          React.createElement(
            'path',
            _extends(
              {
                className: 'gridline xs metric',
                d:
                  'M 5 0 L 5 100 M 15 0 L 15 100 M 25 0 L 25 100 M 35 0 L 35 100 M 45 0 L 45 100 M 55 0 L 55 100 M 65 0 L 65 100 M 75 0 L 75 100 M 85 0 L 85 100 M 95 0 L 95 100'
              },
              e
            )
          ),
          React.createElement(
            'path',
            _extends(
              {
                className: 'gridline xs metric',
                d:
                  'M 0 5 L 100 5 M 0 15 L 100 15 M 0 25 L 100 25 M 0 35 L 100 35 M 0 45 L 100 45 M 0 55 L 100 55 M 0 65 L 100 65 M 0 75 L 100 75 M 0 85 L 100 85 M 0 95 L 100 95'
              },
              e
            )
          )
        )
  },
  Defs = function (t) {
    var e = null
    if (t.paperless)
      for (var a in ((e = []), t.parts)) {
        var s = { x: 0, y: 0 }
        'undefined' == typeof t.parts[a].points.gridAnchor
          ? 'undefined' != typeof t.parts[a].points.anchor && (s = t.parts[a].points.anchor)
          : (s = t.parts[a].points.gridAnchor),
          e.push(
            React.createElement('pattern', {
              id: 'grid-' + a,
              key: 'grid-' + a,
              xlinkHref: '#grid',
              x: s.x,
              y: s.y
            })
          )
      }
    return React.createElement(
      'defs',
      null,
      React.createElement(Markers, null),
      React.createElement(Snippets, null),
      React.createElement(Grid, { units: t.units }),
      e
    )
  },
  TextOnPath = function (t) {
    var e,
      a = '',
      s = _createForOfIteratorHelper$2(t.path.attributes.getAsArray('data-text'))
    try {
      for (s.s(); !(e = s.n()).done; ) {
        var n = e.value
        ;(a += i18n.strings[t.language]['plugin.' + n]
          ? i18n.strings[t.language]['plugin.' + n]
          : n),
          (a += ' ')
      }
    } catch (t) {
      s.e(t)
    } finally {
      s.f()
    }
    var r = { xlinkHref: '#' + t.pathId, startOffset: '0%' },
      o = t.path.attributes.get('data-text-class')
    return (
      o && -1 < o.indexOf('center')
        ? (r.startOffset = '50%')
        : o && -1 < o.indexOf('right') && (r.startOffset = '100%'),
      React.createElement(
        'text',
        null,
        React.createElement(
          'textPath',
          r,
          React.createElement('tspan', t.path.attributes.asPropsIfPrefixIs('data-text-'), a)
        )
      )
    )
  },
  DesignPath = function (t) {
    var e,
      a = [],
      s = 0,
      n = null,
      r = _createForOfIteratorHelper$2(t.path.ops)
    try {
      for (r.s(); !(e = r.n()).done; ) {
        var o = e.value,
          l = t.part + t.name + s
        'curve' === o.type
          ? (a.push(
              React.createElement('path', {
                key: l + 'cp1',
                d: 'M '.concat(n.x, ',').concat(n.y, ' L ').concat(o.cp1.x, ',').concat(o.cp1.y),
                className: 'design path cp'
              })
            ),
            s++,
            a.push(
              React.createElement('path', {
                key: l + 'cp2',
                d: 'M '
                  .concat(o.to.x, ',')
                  .concat(o.to.y, ' L ')
                  .concat(o.cp2.x, ',')
                  .concat(o.cp2.y),
                className: 'design path cp'
              })
            ),
            s++,
            a.push(
              React.createElement('circle', {
                key: l + 'cpcirc1',
                cx: o.cp1.x,
                cy: o.cp1.y,
                r: 3.5,
                className: 'design path cp'
              })
            ),
            s++,
            a.push(
              React.createElement('circle', {
                key: l + 'cpcirc2',
                cx: o.cp2.x,
                cy: o.cp2.y,
                r: 3.5,
                className: 'design path cp'
              })
            ),
            (n = o.to))
          : 'close' !== o.type && (n = o.to)
      }
    } catch (t) {
      r.e(t)
    } finally {
      r.f()
    }
    return (
      a.push(
        React.createElement('path', {
          key: t.part + t.name + 'dpath',
          d: t.path.asPathstring(),
          onClick: function () {
            return t.raiseEvent('path', { path: t.path, name: t.name, part: t.part })
          },
          className: 'design hovertrap'
        })
      ),
      a
    )
  },
  getProps = function (t) {
    var e = function (t) {
        var e = t.split('-')
        if (1 < e.length) {
          t = e.shift()
          var a,
            n = _createForOfIteratorHelper$2(e)
          try {
            for (n.s(); !(a = n.n()).done; ) {
              var r = a.value
              t += r.charAt(0).toUpperCase() + r.slice(1)
            }
          } catch (t) {
            n.e(t)
          } finally {
            n.f()
          }
        }
        return t
      },
      a = function (t) {
        var a,
          s = {},
          n = t.split(';'),
          r = _createForOfIteratorHelper$2(n)
        try {
          for (r.s(); !(a = r.n()).done; ) {
            var o = a.value,
              i = o.split(':')
            2 === i.length && (s[e(i[0].trim())] = i[1].trim())
          }
        } catch (t) {
          r.e(t)
        } finally {
          r.f()
        }
        return s
      },
      s = { class: 'className', 'marker-start': 'markerStart', 'marker-end': 'markerEnd' },
      n = {}
    for (var r in t.attributes.list)
      'style' == r && (n[r] = a(t.attributes.get(r))),
        -1 === Object.keys(s).indexOf(r)
          ? 'style' !== r && (n[r] = t.attributes.get(r))
          : (n[s[r]] = t.attributes.get(r))
    return n
  },
  Path = function (t) {
    if (!t.path.render) return null
    var e = [],
      a = 'path-' + t.part + '-' + t.name
    return (
      t.design &&
        e.push(React.createElement(DesignPath, _extends({}, t, { key: 'dpa-' + t.name }))),
      e.push(
        React.createElement(
          'path',
          _extends({ id: a, key: a, d: t.path.asPathstring() }, getProps(t.path))
        )
      ),
      t.path.attributes.get('data-text') &&
        e.push(
          React.createElement(TextOnPath, _extends({ key: 'text-on-path-' + t.name, pathId: a }, t))
        ),
      e
    )
  },
  DesignPoint = function (t) {
    return React.createElement(
      'g',
      { className: t.className },
      React.createElement('circle', { cx: t.point.x, cy: t.point.y, r: '2', className: 'center' }),
      React.createElement('circle', {
        cx: t.point.x,
        cy: t.point.y,
        r: '7.5',
        className: 'hovertrap',
        onClick: function () {
          return t.raiseEvent('point', { point: t.point, name: t.name, part: t.part })
        }
      })
    )
  },
  Text = function (t) {
    var e,
      a = [],
      s = '',
      n = _createForOfIteratorHelper$2(t.point.attributes.getAsArray('data-text'))
    try {
      for (n.s(); !(e = n.n()).done; ) {
        var r = e.value
        ;(s += i18n.strings[t.language]['plugin.' + r]
          ? i18n.strings[t.language]['plugin.' + r]
          : r),
          (s += ' ')
      }
    } catch (t) {
      n.e(t)
    } finally {
      n.f()
    }
    if (-1 !== s.indexOf('\n')) {
      var o = 0,
        i = s.split('\n')
      a.push(React.createElement('tspan', { key: 'tspan-' + o }, i.shift()))
      var l,
        c = _createForOfIteratorHelper$2(i)
      try {
        for (c.s(); !(l = c.n()).done; ) {
          var d = l.value
          o++,
            a.push(
              React.createElement(
                'tspan',
                {
                  key: 'tspan-' + o,
                  x: t.point.x,
                  dy: t.point.attributes.get('data-text-lineheight') || 12
                },
                d
              )
            )
        }
      } catch (t) {
        c.e(t)
      } finally {
        c.f()
      }
    } else a.push(React.createElement('tspan', { key: 'tspan-1' }, s))
    return React.createElement(
      'text',
      _extends({ x: t.point.x, y: t.point.y }, t.point.attributes.asPropsIfPrefixIs('data-text-')),
      a
    )
  },
  Circle = function (t) {
    return React.createElement(
      'circle',
      _extends(
        { cx: t.point.x, cy: t.point.y, r: t.point.attributes.get('data-circle') },
        t.point.attributes.asPropsIfPrefixIs('data-circle-')
      )
    )
  },
  Point = function (t) {
    var e = []
    return (
      t.design &&
        e.push(
          React.createElement(
            DesignPoint,
            _extends({}, t, { key: 'dp-' + t.name, className: 'design point' })
          )
        ),
      t.point.attributes.get('data-text') &&
        e.push(React.createElement(Text, _extends({}, t, { key: 'point-' + t.name }))),
      t.point.attributes.get('data-circle') &&
        e.push(React.createElement(Circle, { point: t.point, key: 'circle-' + t.name })),
      1 > e.length ? null : e
    )
  },
  Snippet = function (t) {
    var e = { xlinkHref: '#' + t.snippet.def, x: t.snippet.anchor.x, y: t.snippet.anchor.y },
      a = t.snippet.attributes.get('data-scale'),
      s = t.snippet.attributes.get('data-rotate')
    return (
      (a || s) &&
        ((e.transform = ''),
        a &&
          ((e.transform += 'translate('.concat(e.x, ', ').concat(e.y, ') ')),
          (e.transform += 'scale('.concat(a, ') ')),
          (e.transform += 'translate('.concat(-1 * e.x, ', ').concat(-1 * e.y, ') '))),
        s && (e.transform += 'rotate('.concat(s, ', ').concat(e.x, ', ').concat(e.y, ') '))),
      React.createElement('use', _extends({}, e, getProps(t.snippet)))
    )
  },
  Part = function (t) {
    var e = function (e, a) {
        var s = t.part.points[e],
          n = 'M '.concat(s.x, ' ').concat(t.part.topLeft.y, ' ')
        ;(n += 'L '.concat(s.x, ' ').concat(t.part.bottomRight.y, ' ')),
          (n += 'M '.concat(t.part.topLeft.x, ' ').concat(s.y, ' ')),
          (n += 'L '.concat(t.part.bottomRight.x, ' ').concat(s.y, ' '))
        var r = 'focus point c' + (a % 4)
        return React.createElement(
          React.Fragment,
          { key: 'fp' + e },
          React.createElement('path', { d: n, className: r }),
          React.createElement('circle', {
            cx: s.x,
            cy: s.y,
            r: '5',
            className: r,
            onClick: function () {
              return t.raiseEvent('clearFocus', { part: t.name, type: 'points', name: e })
            }
          })
        )
      },
      a = function (e, a) {
        var s = 'M '.concat(e.x, ' ').concat(t.part.topLeft.y, ' ')
        ;(s += 'L '.concat(e.x, ' ').concat(t.part.bottomRight.y, ' ')),
          (s += 'M '.concat(t.part.topLeft.x, ' ').concat(e.y, ' ')),
          (s += 'L '.concat(t.part.bottomRight.x, ' ').concat(e.y, ' '))
        var n = 'focus coords c' + (a % 4)
        return React.createElement(
          React.Fragment,
          { key: 'cp' + a },
          React.createElement('path', { d: s, className: n }),
          React.createElement('circle', {
            cx: e.x,
            cy: e.y,
            r: '5',
            className: n,
            onClick: function () {
              return t.raiseEvent('clearFocus', { part: t.name, type: 'coords', data: e })
            }
          })
        )
      },
      s = t.paperless
        ? React.createElement('rect', {
            x: t.part.topLeft.x,
            y: t.part.topLeft.y,
            width: t.part.width,
            height: t.part.height,
            className: 'grid',
            fill: 'url(#grid-' + t.name + ')'
          })
        : null,
      n = []
    if (t.design && t.focus && 'undefined' != typeof t.focus[t.name]) {
      for (var r in t.focus[t.name].points) n.push(e(t.focus[t.name].points[r], r))
      var o = function (e) {
        var a = t.focus[t.name].paths[e]
        n.push(
          React.createElement('path', {
            key: 'fpa-' + a,
            d: t.part.paths[a].asPathstring(),
            className: 'focus path c' + (e % 4),
            onClick: function () {
              return t.raiseEvent('clearFocus', { part: t.name, type: 'paths', name: a })
            }
          })
        )
      }
      for (var i in t.focus[t.name].paths) o(i)
      for (var l in t.focus[t.name].coords) n.push(a(t.focus[t.name].coords[l], l))
    }
    return React.createElement(
      'g',
      _extends({}, getProps(t.part), { id: 'part-'.concat(t.name) }),
      s,
      Object.keys(t.part.paths).map(function (e) {
        return React.createElement(Path, {
          key: e,
          name: e,
          part: t.name,
          language: t.language,
          path: t.part.paths[e],
          focus: t.focus,
          topLeft: t.part.topLeft,
          bottomRight: t.part.bottomRight,
          design: t.design,
          raiseEvent: t.raiseEvent
        })
      }),
      Object.keys(t.part.points).map(function (e) {
        return React.createElement(Point, {
          key: e,
          name: e,
          part: t.name,
          language: t.language,
          point: t.part.points[e],
          focus: t.focus,
          topLeft: t.part.topLeft,
          bottomRight: t.part.bottomRight,
          design: t.design,
          raiseEvent: t.raiseEvent
        })
      }),
      Object.keys(t.part.snippets).map(function (e) {
        return React.createElement(Snippet, { key: e, name: e, snippet: t.part.snippets[e] })
      }),
      n
    )
  },
  Draft = function (t) {
    return React.createElement(
      Svg,
      {
        embed: t.settings.embed,
        width: t.width,
        height: t.height,
        language: t.settings.locale,
        id: t.settings.idPrefix + 'svg',
        design: t.design || !1,
        style: t.style || {},
        viewBox: t.viewBox,
        className: t.className || 'freesewing draft'
      },
      React.createElement(Defs, {
        units: t.settings.units,
        parts: t.parts,
        paperless: t.settings.paperless,
        design: t.design || !1
      }),
      React.createElement(
        'g',
        null,
        Object.keys(t.parts).map(function (e) {
          return React.createElement(Part, {
            part: t.parts[e],
            language: t.settings.locale,
            paperless: t.settings.paperless,
            units: t.settings.units,
            key: e,
            name: e,
            focus: t.focus || !1,
            design: t.design || !1,
            raiseEvent: t.raiseEvent
          })
        })
      )
    )
  },
  Legend = function (t) {
    var e = t.caption,
      a = void 0 === e ? '' : e,
      s = t.part,
      n = void 0 === s ? '' : s,
      r = new Pattern({ only: n, measurements: { head: 370 } }).draft().getRenderProps()
    return React.createElement(
      'figure',
      null,
      React.createElement('div', { className: 'shadow' }, React.createElement(Draft, r)),
      React.createElement('figcaption', null, a)
    )
  }
module.exports = Legend
//# sourceMappingURL=index.js.map
