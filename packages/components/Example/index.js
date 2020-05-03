/**
 * @freesewing/components/Example | v2.6.0-rc.0
 * A collection of React components for FreeSewing web UIs
 * (c) 2020 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */ 'use strict'
function _interopDefault(a) {
  return a && 'object' == typeof a && 'default' in a ? a['default'] : a
}
var React = require('react'),
  React__default = _interopDefault(React),
  examples = _interopDefault(require('@freesewing/examples')),
  rendertest = _interopDefault(require('@freesewing/rendertest')),
  tutorial = _interopDefault(require('@freesewing/tutorial')),
  i18n = require('@freesewing/i18n'),
  IconButton = _interopDefault(require('@material-ui/core/IconButton')),
  ResetIcon = _interopDefault(require('@material-ui/icons/SettingsBackupRestore')),
  Switch = _interopDefault(require('@material-ui/core/Switch'))
function _defineProperty(a, b, c) {
  return (
    b in a
      ? Object.defineProperty(a, b, { value: c, enumerable: !0, configurable: !0, writable: !0 })
      : (a[b] = c),
    a
  )
}
function _extends() {
  return (
    (_extends =
      Object.assign ||
      function (a) {
        for (var b, c = 1; c < arguments.length; c++)
          for (var d in ((b = arguments[c]), b))
            Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d])
        return a
      }),
    _extends.apply(this, arguments)
  )
}
function ownKeys(a, b) {
  var c = Object.keys(a)
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a)
    b &&
      (d = d.filter(function (b) {
        return Object.getOwnPropertyDescriptor(a, b).enumerable
      })),
      c.push.apply(c, d)
  }
  return c
}
function _objectSpread2(a) {
  for (var b, c = 1; c < arguments.length; c++)
    (b = null == arguments[c] ? {} : arguments[c]),
      c % 2
        ? ownKeys(Object(b), !0).forEach(function (c) {
            _defineProperty(a, c, b[c])
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b))
        : ownKeys(Object(b)).forEach(function (c) {
            Object.defineProperty(a, c, Object.getOwnPropertyDescriptor(b, c))
          })
  return a
}
function _slicedToArray(a, b) {
  return (
    _arrayWithHoles(a) ||
    _iterableToArrayLimit(a, b) ||
    _unsupportedIterableToArray(a, b) ||
    _nonIterableRest()
  )
}
function _arrayWithHoles(a) {
  if (Array.isArray(a)) return a
}
function _iterableToArrayLimit(a, b) {
  if ('undefined' != typeof Symbol && Symbol.iterator in Object(a)) {
    var c = [],
      d = !0,
      e = !1,
      f = void 0
    try {
      for (
        var g, h = a[Symbol.iterator]();
        !(d = (g = h.next()).done) && (c.push(g.value), !(b && c.length === b));
        d = !0
      );
    } catch (a) {
      ;(e = !0), (f = a)
    } finally {
      try {
        d || null == h['return'] || h['return']()
      } finally {
        if (e) throw f
      }
    }
    return c
  }
}
function _unsupportedIterableToArray(a, b) {
  if (a) {
    if ('string' == typeof a) return _arrayLikeToArray(a, b)
    var c = Object.prototype.toString.call(a).slice(8, -1)
    return (
      'Object' === c && a.constructor && (c = a.constructor.name),
      'Map' === c || 'Set' === c
        ? Array.from(c)
        : 'Arguments' === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
        ? _arrayLikeToArray(a, b)
        : void 0
    )
  }
}
function _arrayLikeToArray(a, b) {
  ;(null == b || b > a.length) && (b = a.length)
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c]
  return d
}
function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
  )
}
function _createForOfIteratorHelper(a) {
  if ('undefined' == typeof Symbol || null == a[Symbol.iterator]) {
    if (Array.isArray(a) || (a = _unsupportedIterableToArray(a))) {
      var b = 0,
        c = function () {}
      return {
        s: c,
        n: function () {
          return b >= a.length ? { done: !0 } : { done: !1, value: a[b++] }
        },
        e: function (a) {
          throw a
        },
        f: c
      }
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }
  var d,
    f,
    g = !0,
    h = !1
  return {
    s: function () {
      d = a[Symbol.iterator]()
    },
    n: function () {
      var a = d.next()
      return (g = a.done), a
    },
    e: function (a) {
      ;(h = !0), (f = a)
    },
    f: function () {
      try {
        g || null == d.return || d.return()
      } finally {
        if (h) throw f
      }
    }
  }
}
var Svg = function (a) {
    var b = a.embed,
      c = a.design,
      d = a.language,
      e = void 0 === d ? 'en' : d,
      f = a.className,
      g = void 0 === f ? 'freesewing draft' : f,
      h = a.style,
      i = void 0 === h ? {} : h,
      j = a.viewBox,
      k = a.width,
      l = a.height,
      m = a.children,
      n = {
        xmlns: 'http://www.w3.org/2000/svg',
        'xmlns:svg': 'http://www.w3.org/2000/svg',
        xmlnsXlink: 'http://www.w3.org/1999/xlink',
        xmlLang: e,
        viewBox: (void 0 !== j && j) || '0 0 '.concat(k, ' ').concat(l),
        className: g,
        style: i
      }
    return (
      void 0 === b || b || ((n.width = k + 'mm'), (n.height = l + 'mm')),
      void 0 !== c && c && (n.className += ' design'),
      React__default.createElement('svg', n, m)
    )
  },
  Markers = function () {
    var a = { orient: 'auto', refX: '0.0', refY: '0.0', style: { overflow: 'visible' } },
      b = { d: 'M 0,0 L 12,-4 C 10,-2 10,2  12, 4 z' },
      c = { d: 'M 0,0 L -12,-4 C -10,-2 -10,2  -12, 4 z' },
      d = { grainline: 'note', cutonfold: 'note', dimension: 'mark' },
      e = []
    for (var f in d)
      e.push(
        React__default.createElement(
          'marker',
          _extends({ id: f + 'From', key: f + '-from' }, a),
          React__default.createElement('path', _extends({ className: d[f] + ' fill-' + d[f] }, b))
        )
      ),
        e.push(
          React__default.createElement(
            'marker',
            _extends({ id: f + 'To', key: f + '-to' }, a),
            React__default.createElement('path', _extends({ className: d[f] + ' fill-' + d[f] }, c))
          )
        )
    return e
  },
  logoPathString =
    'M 35.222,0 C 34.233,0.703 34.284,0.613 33.485,0.874 31.653,1.473 29.896,1.144 27.811,0.97 27.184,0.9 26.562,0.859 25.955,0.855 22.89,0.834 20.287,1.733 19.794,4.243 18.885,4.794 18.049,5.461 17.221,6.129 15.453,7.524 14.122,9.229 13.214,11.284 11.974,14.319 13.094,17.576 13.649,20.652 13.781,21.372 13.919,22.058 13.993,22.323 14.098,22.696 14.283,23.052 14.484,23.372 14.531,23.38 14.779,22.998 14.838,22.829 14.924,22.583 14.915,22.188 14.821,21.848 14.613,21.083 14.415,20.462 14.398,20.15 14.368,19.564 14.482,19.023 14.696,18.755 14.772,18.66 14.946,19.15 14.901,19.332 14.848,19.551 14.808,19.926 14.825,20.099 14.872,20.685 14.958,21.312 15.065,21.86 15.202,22.567 15.261,23.021 15.236,23.197 15.218,23.325 15.158,23.454 14.928,23.85 14.728,24.197 14.624,24.478 14.608,24.726 14.591,24.968 14.664,25.573 14.732,25.721 14.831,25.952 15.129,26.195 15.389,26.255 15.638,26.35 15.763,26.547 15.891,26.768 16.202,27.361 16.442,28.083 16.68,29.171 16.796,29.692 16.893,30.157 16.924,30.401 15.004,30.403 12.545,30.404 10.305,30.404 9.551,30.416 8.189,30.062 6.94,29.98 6.759,28.026 5.901,25.756 4.433,25.624 3.431,25.533 2.6,25.914 1.897,27.497 L 1.917,27.582 C 2.332,27.235 2.77,26.174 4.348,26.247 5.56,26.302 5.964,28.596 6.084,29.976 5.346,30.03 4.718,30.257 4.39,30.824 L 4.383,30.824 C 4.383,30.825 4.383,30.827 4.386,30.829 4.383,30.831 4.383,30.833 4.383,30.835 L 4.39,30.835 C 4.728,31.416 5.379,31.641 6.144,31.686 6.655,46.136 20.238,48 23.95,48 37.798,48 42.646,38.59 43.375,34.863 43.716,36.451 42.642,38.474 42.385,39.967 45.306,36.59 44.778,33.343 44.244,30.077 44.688,30.605 45.289,30.932 46.104,30.751 45.523,30.363 44.735,30.635 44.263,28.998 44.057,28.291 43.879,27.761 43.702,27.316 43.32,25.883 42.778,24.514 42.112,23.18 41.55,21.733 41.921,20.795 41.865,19.553 42.876,22.887 43.508,23.774 44.688,24.123 41.72,20.547 42.736,15.01 41.059,10.068 41.818,10.514 42.684,10.648 43.606,10.103 42.714,9.849 41.824,10.52 40.544,8.639 39.463,6.536 37.897,4.983 35.997,3.613 34.979,2.949 33.849,2.503 32.713,2.089 33.87,1.799 35.162,0.769 35.222,0 z M 33.281,11.107 C 34.805,11.663 36.485,13.775 36.466,15.847 L 36.466,15.933 36.466,15.963 C 36.425,18.777 35.146,20.29 35.2,22.164 35.269,24.371 36.219,25.141 36.408,25.509 36.084,24.148 35.894,22.436 36.322,21.08 36.872,19.336 37.427,17.892 37.387,16.526 37.367,16.206 37.231,15.009 37.14,14.479 38.774,16.837 36.786,20.266 37.358,22.51 38.352,26.419 42.807,26.913 41.481,34.789 40.314,41.713 32.318,46.968 24.122,46.968 18.046,46.968 7.517,43.605 6.997,31.676 8.232,31.588 9.56,31.244 10.305,31.256 12.557,31.256 15.129,31.257 17.067,31.258 17.431,32.9 17.704,33.296 19.085,34.39 20.621,35.598 20.979,35.745 23.251,35.767 25.524,35.79 26.198,35.303 28.403,33.217 28.879,32.659 29.085,31.928 29.316,31.241 31.584,31.22 33.238,31.18 34.865,31.104 36.522,31.029 36.756,31.104 39.426,30.829 36.756,30.554 36.522,30.629 34.865,30.553 33.281,30.481 31.677,30.44 29.508,30.42 29.69,29.603 29.95,28.805 30.227,28.016 30.398,27.551 30.599,27.098 30.805,26.647 L 31.03,26.577 C 31.464,26.423 31.848,26.093 32.001,25.647 32.198,25.056 32.058,24.392 31.677,23.909 31.546,23.728 31.383,23.497 31.316,23.395 31.115,23.077 31.11,22.9 31.28,21.718 31.423,20.728 31.439,20.21 31.34,19.708 31.32,19.421 31.318,18.831 31.309,18.672 31.385,18.714 31.55,19.09 31.717,19.599 31.883,20.11 31.91,20.216 31.948,20.651 31.99,21.145 31.805,21.511 31.653,22.248 31.577,22.628 31.51,22.981 31.51,23.029 31.51,23.08 31.546,23.188 31.584,23.272 31.673,23.46 31.84,23.724 31.871,23.724 32.416,23.123 32.736,22.381 33.021,21.628 33.321,20.776 33.409,19.872 33.619,18.995 33.789,18.231 33.985,17.466 34.046,16.682 34.169,15.152 34.097,14.072 33.759,12.478 33.678,12.118 33.444,11.431 33.281,11.107 z M 27.921,18.644 C 28.506,18.637 29.085,18.708 29.636,18.867 30.385,19.154 30.49,19.823 30.628,20.574 30.705,21.054 30.702,21.399 30.615,21.963 30.554,22.781 30.229,23.414 29.519,23.859 28.448,24.057 27.303,24.248 26.395,23.539 25.633,22.489 25.174,21.162 25.349,19.868 25.46,19.337 25.707,19.061 26.215,18.896 26.762,18.739 27.341,18.653 27.921,18.644 z M 19.038,18.739 C 19.585,18.734 20.138,18.792 20.442,18.986 21.747,19.869 21.328,21.306 20.812,22.567 20.061,24.218 18.437,24.157 16.863,24.144 15.992,23.889 15.912,23.175 15.786,22.412 15.678,21.675 15.448,20.885 15.64,20.144 16.133,18.952 17.935,18.815 19.038,18.739 z M 38.941,18.945 C 38.948,22.118 39.49,23.677 40.578,25.924 39.937,24.701 39.021,24.005 38.68,22.543 38.028,19.72 38.731,19.878 38.941,18.945 z M 23.128,21.243 C 23.3,21.417 23.383,21.657 23.532,21.848 23.647,21.651 23.765,21.455 23.913,21.28 23.99,21.282 24.084,21.434 24.169,21.706 24.533,22.712 24.604,23.819 25.076,24.786 25.517,25.486 24.915,25.894 24.254,25.926 23.772,25.925 23.568,25.596 23.285,25.27 23.212,25.483 23.073,25.62 22.907,25.764 22.485,26.118 21.658,25.987 21.53,25.429 21.7,24.363 22.243,23.384 22.599,22.362 22.776,21.989 22.778,21.703 23.128,21.243 z M 16.936,26.628 C 17.149,26.628 17.734,27.025 17.853,27.249 17.935,27.398 18.122,27.978 18.135,28.119 18.156,28.287 18.105,28.685 18.053,28.793 18.015,28.87 17.986,28.881 17.942,28.831 17.905,28.789 17.415,27.849 17.102,27.227 16.856,26.729 16.83,26.628 16.936,26.628 z M 29.158,26.939 C 29.166,26.94 29.178,26.943 29.189,26.946 29.255,26.973 29.209,27.207 28.961,28.057 28.914,28.313 28.8,28.515 28.633,28.683 28.578,28.683 28.553,28.619 28.467,28.264 28.394,27.961 28.386,27.691 28.437,27.449 28.525,27.146 28.881,27.053 29.158,26.939 z M 27.675,28.792 C 27.696,28.788 27.716,28.799 27.742,28.82 27.832,28.883 27.845,29.049 27.785,29.374 27.712,29.792 27.696,29.838 27.588,29.881 27.541,29.902 27.457,29.917 27.401,29.917 27.3,29.899 27.274,29.817 27.298,29.693 27.298,29.433 27.374,29.207 27.546,28.94 27.611,28.84 27.644,28.797 27.675,28.792 z M 19.042,28.811 C 19.111,28.811 19.319,28.961 19.396,29.065 19.482,29.175 19.58,29.83 19.525,29.943 19.462,30.085 19.154,30.014 19.069,29.837 19.017,29.731 18.894,29.159 18.894,29.023 18.894,28.897 18.955,28.811 19.042,28.811 z M 26.933,28.984 C 27.017,29.104 27.039,29.258 27.021,29.596 L 27.004,29.904 26.916,29.992 C 26.863,30.041 26.773,30.101 26.719,30.126 26.6,30.182 26.509,30.187 26.492,30.142 26.472,30.082 26.506,29.7 26.543,29.571 26.586,29.438 26.779,29.041 26.843,28.957 26.872,28.88 26.906,28.976 26.933,28.984 z M 21.912,28.966 C 22.093,29.012 22.173,29.175 22.272,29.323 L 22.339,29.455 22.245,29.782 C 22.195,29.962 22.142,30.124 22.126,30.142 22.108,30.162 22.041,30.172 21.942,30.171 21.678,30.164 21.648,30.153 21.577,30.045 L 21.511,29.947 21.567,29.672 C 21.648,29.276 21.687,29.157 21.777,29.055 21.824,29 21.871,28.97 21.912,28.966 z M 20.241,29.249 20.39,29.398 20.415,29.735 C 20.428,29.919 20.434,30.09 20.424,30.111 20.415,30.14 20.361,30.148 20.194,30.148 L 19.977,30.148 C 19.861,30.021 19.825,29.866 19.776,29.706 19.662,29.225 19.662,29.006 19.78,28.977 19.973,28.989 20.1,29.129 20.241,29.249 z M 26.041,29.018 C 26.277,29.081 26.23,29.456 26.229,29.724 26.211,30.158 26.194,30.248 26.138,30.304 26.041,30.401 25.771,30.347 25.64,30.203 25.597,30.151 25.593,30.135 25.627,29.924 25.666,29.667 25.716,29.507 25.827,29.287 25.908,29.129 25.984,29.03 26.041,29.018 z M 20.715,29.038 C 20.728,29.037 20.749,29.038 20.769,29.04 20.919,29.052 21.059,29.15 21.183,29.33 L 21.283,29.477 C 21.292,29.718 21.283,29.972 21.24,30.196 21.214,30.209 21.106,30.229 21,30.239 20.816,30.256 20.799,30.252 20.735,30.196 20.646,30.12 20.621,29.979 20.599,29.511 20.586,29.129 20.595,29.044 20.715,29.038 z M 22.984,29.118 C 23.145,29.152 23.247,29.238 23.292,29.379 23.328,29.5 23.35,30.177 23.315,30.224 23.303,30.244 23.227,30.269 23.14,30.28 22.816,30.321 22.53,30.29 22.502,30.213 22.466,30.125 22.707,29.253 22.796,29.145 22.834,29.061 22.926,29.126 22.984,29.118 z M 25.082,29.124 C 25.153,29.117 25.229,29.185 25.303,29.33 25.363,29.451 25.372,29.493 25.372,29.764 25.372,29.98 25.359,30.073 25.336,30.093 25.316,30.109 25.235,30.138 25.149,30.16 24.999,30.199 24.966,30.203 24.919,30.187 L 24.694,30.146 24.711,30.012 C 24.727,29.837 24.842,29.449 24.923,29.281 24.971,29.181 25.026,29.131 25.082,29.124 z M 24.104,29.127 C 24.151,29.125 24.173,29.136 24.203,29.169 24.274,29.253 24.364,29.501 24.421,29.766 24.497,30.139 24.497,30.138 24.334,30.187 24.263,30.209 24.113,30.232 24.006,30.238 23.653,30.256 23.626,30.235 23.669,29.923 23.703,29.645 23.84,29.207 23.899,29.175 23.963,29.141 24.037,29.142 24.104,29.127 z M 6.111,30.536 C 6.114,30.535 6.118,30.536 6.118,30.536 6.127,30.731 6.127,30.928 6.131,31.124 5.636,31.086 5.272,30.968 5.272,30.829 5.272,30.692 5.623,30.575 6.111,30.536 z M 6.976,30.553 C 7.377,30.603 7.654,30.708 7.649,30.829 7.649,30.951 7.381,31.055 6.983,31.104 6.979,30.921 6.979,30.737 6.976,30.553 z M 25.702,31.086 C 25.736,31.083 25.751,31.08 25.803,31.085 26.011,31.106 26.041,31.119 26.041,31.189 26.041,31.281 25.883,31.558 25.776,31.654 25.726,31.702 25.657,31.742 25.633,31.742 25.513,31.742 25.443,31.489 25.499,31.256 25.533,31.13 25.595,31.091 25.702,31.086 z M 24.947,31.169 C 25.04,31.161 25.13,31.186 25.22,31.198 25.194,31.461 25.076,31.676 24.857,31.819 24.803,31.819 24.776,31.716 24.776,31.491 24.776,31.223 24.79,31.172 24.947,31.169 z M 24.119,31.266 C 24.312,31.266 24.482,31.275 24.49,31.286 24.526,31.32 24.422,31.578 24.269,31.84 24.138,32.073 24.119,32.09 24.038,32.096 23.72,32.06 23.729,31.687 23.68,31.431 23.68,31.279 23.714,31.266 24.119,31.266 z M 21.11,31.295 C 21.331,31.299 21.417,31.332 21.417,31.417 21.417,31.525 21.335,31.74 21.288,31.767 21.217,31.806 21.211,31.804 21.071,31.658 20.85,31.41 20.825,31.364 21.11,31.295 z M 22.174,31.306 C 22.178,31.312 22.221,31.39 22.264,31.478 22.358,31.661 22.365,31.741 22.298,31.802 22.14,31.892 22.107,31.841 21.964,31.75 21.798,31.593 21.667,31.382 21.71,31.338 21.858,31.285 22.021,31.305 22.174,31.306 z M 22.596,31.311 22.991,31.318 C 23.145,31.318 23.278,31.326 23.285,31.338 23.312,31.362 23.225,31.876 23.178,31.992 23.124,32.122 22.935,32.123 22.837,31.969 22.697,31.748 22.605,31.562 22.602,31.434 L 22.596,31.311 z',
  Snippets = function () {
    var a = { fill: 'currentColor', stroke: 'none' },
      b = { fill: 'none', stroke: 'currentColor' }
    return [
      React__default.createElement(
        'g',
        { id: 'notch', className: 'snippet notch', key: 'notch' },
        React__default.createElement('circle', _extends({ cy: '0', cx: '0', r: '1.4' }, a)),
        React__default.createElement('circle', _extends({ cy: '0', cx: '0', r: '2.8' }, b))
      ),
      React__default.createElement(
        'g',
        { id: 'bnotch', className: 'snippet bnotch', key: 'bnotch' },
        React__default.createElement(
          'path',
          _extends({ d: 'M -1.1 -1.1 L 1.1 1.1 M 1.1 -1.1 L -1.1 1.1' }, b)
        ),
        React__default.createElement('circle', _extends({ cy: '0', cx: '0', r: '2.8' }, b))
      ),
      React__default.createElement(
        'g',
        { id: 'button', className: 'snippet button', key: 'button' },
        React__default.createElement('circle', _extends({ cx: '0', cy: '0', r: '3.4' }, b)),
        ' />',
        React__default.createElement('circle', _extends({ cx: '-1', cy: '-1', r: '0.5' }, a)),
        React__default.createElement('circle', _extends({ cx: '1', cy: '-1', r: '0.5' }, a)),
        React__default.createElement('circle', _extends({ cx: '1', cy: '1', r: '0.5' }, a)),
        React__default.createElement('circle', _extends({ cx: '-1', cy: '1', r: '0.5' }, a))
      ),
      React__default.createElement(
        'g',
        { id: 'buttonhole', className: 'snippet buttonhole', key: 'buttonhole' },
        React__default.createElement('path', _extends({ d: 'M -1,-5 L 1,-5 L 1,5 L -1,5 z' }, b)),
        React__default.createElement(
          'path',
          _extends({ d: 'M -1,-5 L 1,-5 L 1,-4 L -1,-4 z M -1,5 L 1,5 L 1,4 L -1,4 z' }, a)
        )
      ),
      React__default.createElement(
        'radialGradient',
        { key: 'grad', id: 'snap-male-grad', cx: '50%', cy: '50%', r: '50%', fx: '50%', fy: '50%' },
        React__default.createElement('stop', {
          offset: '30%',
          style: { stopColor: 'rgb(235,235,235)', stopOpacity: 1 }
        }),
        React__default.createElement('stop', {
          offset: '80%',
          style: { stopColor: 'rgb(100,100,100)', stopOpacity: 1 }
        })
      ),
      React__default.createElement(
        'g',
        { id: 'snap-male', key: 'snapmale' },
        React__default.createElement('circle', {
          cx: '0',
          cy: '0',
          r: '3.4',
          style: { stroke: '#666', fill: '#dddddd', strokeWidth: 0.3 }
        }),
        React__default.createElement('circle', {
          cx: '0',
          cy: '0',
          r: '1.8',
          style: { stroke: 'none', fill: 'url(#snap-male-grad)' }
        }),
        React__default.createElement('path', {
          style: { fill: 'none', stroke: '#666', strokeWidth: 0.2 },
          d:
            'M -2,0 L -3,0 M 2,0 L 3,0 M 0,2 L 0,3 M 0,-2 L 0,-3 M 1.5,1.5 L 2.1,2.1 M -1.5,1.5 L -2.1,2.1 M -1.5,-1.5 L -2.1,-2.1 M 1.5,-1.5 L 2.1,-2.1'
        })
      ),
      React__default.createElement(
        'g',
        { id: 'snap-female', key: 'snapfemale' },
        React__default.createElement('circle', {
          cx: '0',
          cy: '0',
          r: '3.4',
          style: { stroke: '#666', fill: '#bbbbbb', strokeWidth: 0.3 }
        }),
        React__default.createElement('circle', {
          cx: '0',
          cy: '0',
          r: '2',
          style: { stroke: '#666', fill: '#dddddd', strokeWidth: 0.4 }
        }),
        React__default.createElement('path', {
          style: { fill: 'none', stroke: '#666', strokeWidth: 0.5 },
          d: 'M -1.7,-1 L -1.7,1 M 1.7,-1 L 1.7,1'
        })
      ),
      React__default.createElement(
        'g',
        { id: 'logo', className: 'snippet logo', transform: 'translate(-23 -36)', key: 'logo' },
        React__default.createElement('path', _extends({ d: logoPathString }, a))
      )
    ]
  },
  Grid = function (a) {
    var b = { style: { fill: 'none', stroke: 'currentColor' } }
    return 'imperial' === a.units
      ? React__default.createElement(
          'pattern',
          {
            id: 'grid',
            height: '25.4',
            width: '25.4',
            patternUnits: 'userSpaceOnUse',
            key: 'grid'
          },
          React__default.createElement(
            'path',
            _extends({ className: 'gridline lg imperial', d: 'M 0 0 L 0 25.4 L 25.4 25.4' }, b)
          ),
          React__default.createElement(
            'path',
            _extends(
              { className: 'gridline lg imperial', d: 'M 12.7 0 L 12.7 25.4 M 0 12.7 L 25.4 12.7' },
              b
            )
          ),
          React__default.createElement(
            'path',
            _extends(
              {
                className: 'gridline sm imperial',
                d:
                  'M 3.175 0 L 3.175 25.4 M 6.32 0 L 6.35 25.4 M 9.525 0 L 9.525 25.4 M 15.875 0 L 15.875 25.4 M 19.05 0 L 19.05 25.4 M 22.225 0 L 22.225 25.4'
              },
              b
            )
          ),
          React__default.createElement(
            'path',
            _extends(
              {
                className: 'gridline sm imperial',
                d:
                  'M 0 3.175 L 25.4 3.175 M 0 6.32 L 25.4 6.35 M 0 9.525 L 25.4 9.525 M 0 15.875 L 25.4 15.875 M 0 19.05 L 25.4 19.05 M 0 22.225 L 25.4 22.225'
              },
              b
            )
          )
        )
      : React__default.createElement(
          'pattern',
          { id: 'grid', height: '100', width: '100', patternUnits: 'userSpaceOnUse', key: 'grid' },
          React__default.createElement(
            'path',
            _extends({ className: 'gridline lg metric', d: 'M 0 0 L 0 100 L 100 100' }, b)
          ),
          React__default.createElement(
            'path',
            _extends({ className: 'gridline metric', d: 'M 50 0 L 50 100 M 0 50 L 100 50' }, b)
          ),
          React__default.createElement(
            'path',
            _extends(
              {
                className: 'gridline sm metric',
                d:
                  'M 10 0 L 10 100 M 20 0 L 20 100 M 30 0 L 30 100 M 40 0 L 40 100 M 60 0 L 60 100 M 70 0 L 70 100 M 80 0 L 80 100 M 90 0 L 90 100'
              },
              b
            )
          ),
          React__default.createElement(
            'path',
            _extends(
              {
                className: 'gridline sm metric',
                d:
                  'M 0 10 L 100 10 M 0 20 L 100 20 M 0 30 L 100 30 M 0 40 L 100 40 M 0 60 L 100 60 M 0 70 L 100 70 M 0 80 L 100 80 M 0 90 L 100 90'
              },
              b
            )
          ),
          React__default.createElement(
            'path',
            _extends(
              {
                className: 'gridline xs metric',
                d:
                  'M 5 0 L 5 100 M 15 0 L 15 100 M 25 0 L 25 100 M 35 0 L 35 100 M 45 0 L 45 100 M 55 0 L 55 100 M 65 0 L 65 100 M 75 0 L 75 100 M 85 0 L 85 100 M 95 0 L 95 100'
              },
              b
            )
          ),
          React__default.createElement(
            'path',
            _extends(
              {
                className: 'gridline xs metric',
                d:
                  'M 0 5 L 100 5 M 0 15 L 100 15 M 0 25 L 100 25 M 0 35 L 100 35 M 0 45 L 100 45 M 0 55 L 100 55 M 0 65 L 100 65 M 0 75 L 100 75 M 0 85 L 100 85 M 0 95 L 100 95'
              },
              b
            )
          )
        )
  },
  Defs = function (a) {
    var b = null
    if (a.paperless)
      for (var c in ((b = []), a.parts)) {
        var d = { x: 0, y: 0 }
        'undefined' == typeof a.parts[c].points.gridAnchor
          ? 'undefined' != typeof a.parts[c].points.anchor && (d = a.parts[c].points.anchor)
          : (d = a.parts[c].points.gridAnchor),
          b.push(
            React__default.createElement('pattern', {
              id: 'grid-' + c,
              key: 'grid-' + c,
              xlinkHref: '#grid',
              x: d.x,
              y: d.y
            })
          )
      }
    return React__default.createElement(
      'defs',
      null,
      React__default.createElement(Markers, null),
      React__default.createElement(Snippets, null),
      React__default.createElement(Grid, { units: a.units }),
      b
    )
  },
  TextOnPath = function (a) {
    var b,
      c = '',
      d = _createForOfIteratorHelper(a.path.attributes.getAsArray('data-text'))
    try {
      for (d.s(); !(b = d.n()).done; ) {
        var e = b.value
        ;(c += i18n.strings[a.language]['plugin.' + e]
          ? i18n.strings[a.language]['plugin.' + e]
          : e),
          (c += ' ')
      }
    } catch (a) {
      d.e(a)
    } finally {
      d.f()
    }
    var f = { xlinkHref: '#' + a.pathId, startOffset: '0%' },
      g = a.path.attributes.get('data-text-class')
    return (
      g && -1 < g.indexOf('center')
        ? (f.startOffset = '50%')
        : g && -1 < g.indexOf('right') && (f.startOffset = '100%'),
      React__default.createElement(
        'text',
        null,
        React__default.createElement(
          'textPath',
          f,
          React__default.createElement(
            'tspan',
            a.path.attributes.asPropsIfPrefixIs('data-text-'),
            c
          )
        )
      )
    )
  },
  DesignPath = function (a) {
    var b,
      c = [],
      d = 0,
      e = null,
      f = _createForOfIteratorHelper(a.path.ops)
    try {
      for (f.s(); !(b = f.n()).done; ) {
        var g = b.value,
          h = a.part + a.name + d
        'curve' === g.type
          ? (c.push(
              React__default.createElement('path', {
                key: h + 'cp1',
                d: 'M '.concat(e.x, ',').concat(e.y, ' L ').concat(g.cp1.x, ',').concat(g.cp1.y),
                className: 'design path cp'
              })
            ),
            d++,
            c.push(
              React__default.createElement('path', {
                key: h + 'cp2',
                d: 'M '
                  .concat(g.to.x, ',')
                  .concat(g.to.y, ' L ')
                  .concat(g.cp2.x, ',')
                  .concat(g.cp2.y),
                className: 'design path cp'
              })
            ),
            d++,
            c.push(
              React__default.createElement('circle', {
                key: h + 'cpcirc1',
                cx: g.cp1.x,
                cy: g.cp1.y,
                r: 3.5,
                className: 'design path cp'
              })
            ),
            d++,
            c.push(
              React__default.createElement('circle', {
                key: h + 'cpcirc2',
                cx: g.cp2.x,
                cy: g.cp2.y,
                r: 3.5,
                className: 'design path cp'
              })
            ),
            (e = g.to))
          : 'close' !== g.type && (e = g.to)
      }
    } catch (a) {
      f.e(a)
    } finally {
      f.f()
    }
    return (
      c.push(
        React__default.createElement('path', {
          key: a.part + a.name + 'dpath',
          d: a.path.asPathstring(),
          onClick: function () {
            return a.raiseEvent('path', { path: a.path, name: a.name, part: a.part })
          },
          className: 'design hovertrap'
        })
      ),
      c
    )
  },
  getProps = function (a) {
    var b = function (a) {
        var b = a.split('-')
        if (1 < b.length) {
          a = b.shift()
          var c,
            d = _createForOfIteratorHelper(b)
          try {
            for (d.s(); !(c = d.n()).done; ) {
              var e = c.value
              a += e.charAt(0).toUpperCase() + e.slice(1)
            }
          } catch (a) {
            d.e(a)
          } finally {
            d.f()
          }
        }
        return a
      },
      c = function (a) {
        var c,
          d = {},
          e = a.split(';'),
          f = _createForOfIteratorHelper(e)
        try {
          for (f.s(); !(c = f.n()).done; ) {
            var g = c.value,
              h = g.split(':')
            2 === h.length && (d[b(h[0].trim())] = h[1].trim())
          }
        } catch (a) {
          f.e(a)
        } finally {
          f.f()
        }
        return d
      },
      d = { class: 'className', 'marker-start': 'markerStart', 'marker-end': 'markerEnd' },
      e = {}
    for (var f in a.attributes.list)
      'style' == f && (e[f] = c(a.attributes.get(f))),
        -1 === Object.keys(d).indexOf(f)
          ? 'style' !== f && (e[f] = a.attributes.get(f))
          : (e[d[f]] = a.attributes.get(f))
    return e
  },
  Path = function (a) {
    if (!a.path.render) return null
    var b = [],
      c = 'path-' + a.part + '-' + a.name
    return (
      a.design &&
        b.push(React__default.createElement(DesignPath, _extends({}, a, { key: 'dpa-' + a.name }))),
      b.push(
        React__default.createElement(
          'path',
          _extends({ id: c, key: c, d: a.path.asPathstring() }, getProps(a.path))
        )
      ),
      a.path.attributes.get('data-text') &&
        b.push(
          React__default.createElement(
            TextOnPath,
            _extends({ key: 'text-on-path-' + a.name, pathId: c }, a)
          )
        ),
      b
    )
  },
  DesignPoint = function (a) {
    return React__default.createElement(
      'g',
      { className: a.className },
      React__default.createElement('circle', {
        cx: a.point.x,
        cy: a.point.y,
        r: '2',
        className: 'center'
      }),
      React__default.createElement('circle', {
        cx: a.point.x,
        cy: a.point.y,
        r: '7.5',
        className: 'hovertrap',
        onClick: function () {
          return a.raiseEvent('point', { point: a.point, name: a.name, part: a.part })
        }
      })
    )
  },
  Text = function (a) {
    var b,
      c = [],
      d = '',
      e = _createForOfIteratorHelper(a.point.attributes.getAsArray('data-text'))
    try {
      for (e.s(); !(b = e.n()).done; ) {
        var f = b.value
        ;(d += i18n.strings[a.language]['plugin.' + f]
          ? i18n.strings[a.language]['plugin.' + f]
          : f),
          (d += ' ')
      }
    } catch (a) {
      e.e(a)
    } finally {
      e.f()
    }
    if (-1 !== d.indexOf('\n')) {
      var g = 0,
        h = d.split('\n')
      c.push(React__default.createElement('tspan', { key: 'tspan-' + g }, h.shift()))
      var i,
        j = _createForOfIteratorHelper(h)
      try {
        for (j.s(); !(i = j.n()).done; ) {
          var k = i.value
          g++,
            c.push(
              React__default.createElement(
                'tspan',
                {
                  key: 'tspan-' + g,
                  x: a.point.x,
                  dy: a.point.attributes.get('data-text-lineheight') || 12
                },
                k
              )
            )
        }
      } catch (a) {
        j.e(a)
      } finally {
        j.f()
      }
    } else c.push(React__default.createElement('tspan', { key: 'tspan-1' }, d))
    return React__default.createElement(
      'text',
      _extends({ x: a.point.x, y: a.point.y }, a.point.attributes.asPropsIfPrefixIs('data-text-')),
      c
    )
  },
  Circle = function (a) {
    return React__default.createElement(
      'circle',
      _extends(
        { cx: a.point.x, cy: a.point.y, r: a.point.attributes.get('data-circle') },
        a.point.attributes.asPropsIfPrefixIs('data-circle-')
      )
    )
  },
  Point = function (a) {
    var b = []
    return (
      a.design &&
        b.push(
          React__default.createElement(
            DesignPoint,
            _extends({}, a, { key: 'dp-' + a.name, className: 'design point' })
          )
        ),
      a.point.attributes.get('data-text') &&
        b.push(React__default.createElement(Text, _extends({}, a, { key: 'point-' + a.name }))),
      a.point.attributes.get('data-circle') &&
        b.push(React__default.createElement(Circle, { point: a.point, key: 'circle-' + a.name })),
      1 > b.length ? null : b
    )
  },
  Snippet = function (a) {
    var b = { xlinkHref: '#' + a.snippet.def, x: a.snippet.anchor.x, y: a.snippet.anchor.y },
      c = a.snippet.attributes.get('data-scale'),
      d = a.snippet.attributes.get('data-rotate')
    return (
      (c || d) &&
        ((b.transform = ''),
        c &&
          ((b.transform += 'translate('.concat(b.x, ', ').concat(b.y, ') ')),
          (b.transform += 'scale('.concat(c, ') ')),
          (b.transform += 'translate('.concat(-1 * b.x, ', ').concat(-1 * b.y, ') '))),
        d && (b.transform += 'rotate('.concat(d, ', ').concat(b.x, ', ').concat(b.y, ') '))),
      React__default.createElement('use', _extends({}, b, getProps(a.snippet)))
    )
  },
  Part = function (a) {
    var b = function (b, c) {
        var d = a.part.points[b],
          e = 'M '.concat(d.x, ' ').concat(a.part.topLeft.y, ' ')
        ;(e += 'L '.concat(d.x, ' ').concat(a.part.bottomRight.y, ' ')),
          (e += 'M '.concat(a.part.topLeft.x, ' ').concat(d.y, ' ')),
          (e += 'L '.concat(a.part.bottomRight.x, ' ').concat(d.y, ' '))
        var f = 'focus point c' + (c % 4)
        return React__default.createElement(
          React__default.Fragment,
          { key: 'fp' + b },
          React__default.createElement('path', { d: e, className: f }),
          React__default.createElement('circle', {
            cx: d.x,
            cy: d.y,
            r: '5',
            className: f,
            onClick: function () {
              return a.raiseEvent('clearFocus', { part: a.name, type: 'points', name: b })
            }
          })
        )
      },
      c = function (b, c) {
        var d = 'M '.concat(b.x, ' ').concat(a.part.topLeft.y, ' ')
        ;(d += 'L '.concat(b.x, ' ').concat(a.part.bottomRight.y, ' ')),
          (d += 'M '.concat(a.part.topLeft.x, ' ').concat(b.y, ' ')),
          (d += 'L '.concat(a.part.bottomRight.x, ' ').concat(b.y, ' '))
        var e = 'focus coords c' + (c % 4)
        return React__default.createElement(
          React__default.Fragment,
          { key: 'cp' + c },
          React__default.createElement('path', { d: d, className: e }),
          React__default.createElement('circle', {
            cx: b.x,
            cy: b.y,
            r: '5',
            className: e,
            onClick: function () {
              return a.raiseEvent('clearFocus', { part: a.name, type: 'coords', data: b })
            }
          })
        )
      },
      d = a.paperless
        ? React__default.createElement('rect', {
            x: a.part.topLeft.x,
            y: a.part.topLeft.y,
            width: a.part.width,
            height: a.part.height,
            className: 'grid',
            fill: 'url(#grid-' + a.name + ')'
          })
        : null,
      e = []
    if (a.design && a.focus && 'undefined' != typeof a.focus[a.name]) {
      for (var f in a.focus[a.name].points) e.push(b(a.focus[a.name].points[f], f))
      var g = function (b) {
        var c = a.focus[a.name].paths[b]
        e.push(
          React__default.createElement('path', {
            key: 'fpa-' + c,
            d: a.part.paths[c].asPathstring(),
            className: 'focus path c' + (b % 4),
            onClick: function () {
              return a.raiseEvent('clearFocus', { part: a.name, type: 'paths', name: c })
            }
          })
        )
      }
      for (var h in a.focus[a.name].paths) g(h)
      for (var i in a.focus[a.name].coords) e.push(c(a.focus[a.name].coords[i], i))
    }
    return React__default.createElement(
      'g',
      _extends({}, getProps(a.part), { id: 'part-'.concat(a.name) }),
      d,
      Object.keys(a.part.paths).map(function (b) {
        return React__default.createElement(Path, {
          key: b,
          name: b,
          part: a.name,
          language: a.language,
          path: a.part.paths[b],
          focus: a.focus,
          topLeft: a.part.topLeft,
          bottomRight: a.part.bottomRight,
          design: a.design,
          raiseEvent: a.raiseEvent
        })
      }),
      Object.keys(a.part.points).map(function (b) {
        return React__default.createElement(Point, {
          key: b,
          name: b,
          part: a.name,
          language: a.language,
          point: a.part.points[b],
          focus: a.focus,
          topLeft: a.part.topLeft,
          bottomRight: a.part.bottomRight,
          design: a.design,
          raiseEvent: a.raiseEvent
        })
      }),
      Object.keys(a.part.snippets).map(function (b) {
        return React__default.createElement(Snippet, {
          key: b,
          name: b,
          snippet: a.part.snippets[b]
        })
      }),
      e
    )
  },
  Draft = function (a) {
    return React__default.createElement(
      Svg,
      {
        embed: a.settings.embed,
        width: a.width,
        height: a.height,
        language: a.settings.locale,
        id: a.settings.idPrefix + 'svg',
        design: a.design || !1,
        style: a.style || {},
        viewBox: a.viewBox,
        className: a.className || 'freesewing draft'
      },
      React__default.createElement(Defs, {
        units: a.settings.units,
        parts: a.parts,
        paperless: a.settings.paperless,
        design: a.design || !1
      }),
      React__default.createElement(
        'g',
        null,
        Object.keys(a.parts).map(function (b) {
          return React__default.createElement(Part, {
            part: a.parts[b],
            language: a.settings.locale,
            paperless: a.settings.paperless,
            units: a.settings.units,
            key: b,
            name: b,
            focus: a.focus || !1,
            design: a.design || !1,
            raiseEvent: a.raiseEvent
          })
        })
      )
    )
  },
  Design = function (c) {
    var d = function (b) {
        var c = []
        for (var d in b.list)
          c.push(
            React__default.createElement(
              'li',
              { key: d },
              React__default.createElement('b', null, d),
              ': ',
              e(b.list[d])
            )
          )
        return React__default.createElement('ul', { className: 'links' }, c)
      },
      e = function (a) {
        if (Array.isArray(a)) {
          if (1 === a.length) return a.pop()
          var b,
            c = [],
            d = _createForOfIteratorHelper(a)
          try {
            for (d.s(); !(b = d.n()).done; ) {
              var e = b.value
              c.push(React__default.createElement('li', { key: e }, e))
            }
          } catch (a) {
            d.e(a)
          } finally {
            d.f()
          }
          return React__default.createElement('ul', null, c)
        }
        return a
      },
      f = function (d, e) {
        for (var a in c.parts[d].points) {
          var f = c.parts[d].points[a]
          if (e.x === f.x && e.y === f.y) return a
        }
        return !1
      },
      g = function (a, b) {
        var c = []
        for (var d in a.ops) c.push(h(a.ops[d], d, b))
        return React__default.createElement('ul', { className: 'links' }, c)
      },
      h = function (a, b, d) {
        var e = { part: d, coords: { x: null, y: null } }
        if ('move' === a.type || 'line' === a.type) {
          ;(e.coords.x = a.to.x), (e.coords.y = a.to.y)
          var g = React__default.createElement('span', null, '(op.to.x,op.to.y)'),
            h = function () {
              return c.raiseEvent('coords', e)
            },
            i = f(d, a.to)
          return (
            i &&
              ((g = i),
              (h = function () {
                return c.raiseEvent('point', { point: c.parts[d].points[i], name: i, part: d })
              })),
            React__default.createElement(
              'li',
              { key: b },
              React__default.createElement('b', null, a.type),
              '\xA0\xBB\xA0',
              React__default.createElement('a', { href: '#logo', role: 'button', onClick: h }, g)
            )
          )
        }
        if ('curve' === a.type) {
          for (
            var j = {},
              k = {},
              l = ['to', 'cp1', 'cp2'],
              m = function () {
                var b = o[n],
                  g = f(d, a[b])
                g
                  ? ((j[b] = g),
                    (k[b] = function () {
                      return c.raiseEvent('point', {
                        point: c.parts[d].points[g],
                        name: g,
                        part: d
                      })
                    }))
                  : ((j[b] = React__default.createElement(
                      'span',
                      null,
                      '(',
                      a[b].x,
                      ',',
                      a[b].y,
                      ')'
                    )),
                    (k[b] = function () {
                      return c.raiseEvent(
                        'coords',
                        _objectSpread2({}, e, { coords: { x: a[b].x, y: a[b].y } })
                      )
                    }))
              },
              n = 0,
              o = l;
            n < o.length;
            n++
          )
            m()
          return React__default.createElement(
            'li',
            { key: b },
            React__default.createElement('b', null, a.type),
            l.map(function (a) {
              return React__default.createElement(
                React__default.Fragment,
                { key: a },
                React__default.createElement('span', null, '\u2002\xBB\u2002'),
                React__default.createElement(
                  'a',
                  { href: '#logo', role: 'button', onClick: k[a] },
                  j[a]
                )
              )
            })
          )
        }
        return 'close' === a.type
          ? React__default.createElement(
              'li',
              { key: b },
              React__default.createElement('b', null, 'close')
            )
          : null
      },
      j = {
        container: { padding: '0 1rem' },
        h5: { margin: '0.5rem 0' },
        h6: { margin: '0.25rem 0 0 0.5rem' },
        ul: { marginTop: '0.25rem' }
      }
    if (!c.design || null === c.focus || 1 > Object.keys(c.focus).length) return null
    for (
      var k = [],
        l = function () {
          var a = n[m]
          for (var b in (k.push(
            React__default.createElement(
              'h5',
              { key: 'part-' + a, style: j.h5 },
              'parts.',
              React__default.createElement('b', null, a),
              '(',
              React__default.createElement(
                'a',
                {
                  href: '#logo',
                  onClick: function () {
                    return c.raiseEvent('part', a)
                  }
                },
                'Isolate'
              ),
              ')'
            )
          ),
          c.focus[a].paths)) {
            var e = c.focus[a].paths[b],
              f = c.parts[a].paths[e]
            k.push(
              React__default.createElement(
                'h6',
                { key: 'patitle-' + e, style: j.h6, className: 'path c' + (b % 4) },
                'path.',
                React__default.createElement('b', null, e)
              )
            ),
              k.push(
                React__default.createElement(
                  'ul',
                  { className: 'links', key: 'ops-' + e, style: j.ul },
                  React__default.createElement(
                    'li',
                    null,
                    React__default.createElement('b', null, 'attributes'),
                    ': ',
                    d(f.attributes)
                  ),
                  React__default.createElement(
                    'li',
                    null,
                    React__default.createElement('b', null, 'ops'),
                    ': ',
                    g(f, a)
                  )
                )
              )
          }
          for (var h in c.focus[a].points) {
            var i = c.focus[a].points[h],
              l = c.parts[a].points[i]
            k.push(
              React__default.createElement(
                'h6',
                { key: 'potitle-' + i, style: j.h6, className: 'point c' + (h % 4) },
                'point.',
                React__default.createElement('b', null, i)
              )
            ),
              k.push(
                React__default.createElement(
                  'ul',
                  { className: 'links', key: 'pdata-' + i, style: j.ul },
                  React__default.createElement(
                    'li',
                    null,
                    React__default.createElement('b', null, 'x'),
                    ': ',
                    l.x
                  ),
                  React__default.createElement(
                    'li',
                    null,
                    React__default.createElement('b', null, 'y'),
                    ': ',
                    l.y
                  ),
                  React__default.createElement(
                    'li',
                    null,
                    React__default.createElement('b', null, 'attributes'),
                    ': ',
                    d(l.attributes)
                  )
                )
              )
          }
        },
        m = 0,
        n = Object.keys(c.focus);
      m < n.length;
      m++
    )
      l()
    return React__default.createElement('div', { style: j.container, className: 'design' }, k)
  },
  Example = function (a) {
    var b = a.pattern,
      c = void 0 === b ? 'examples' : b,
      d = a.design,
      e = a.caption,
      f = void 0 === e ? '' : e,
      g = a.options,
      h = void 0 === g ? {} : g,
      j = a.settings,
      k = a.part,
      l = void 0 === k ? '' : k,
      m = a.sample,
      n = React.useState(!1),
      o = _slicedToArray(n, 2),
      q = o[0],
      r = o[1],
      s = React.useState(null),
      t = _slicedToArray(s, 2),
      u = t[0],
      v = t[1],
      w = function (a, b) {
        if ('clearFocusAll' === a) return v(null)
        var c = {}
        if (
          (null !== u && (c = _objectSpread2({}, u)),
          'undefined' == typeof c[b.part] && (c[b.part] = { paths: [], points: [], coords: [] }),
          'point' === a)
        )
          c[b.part].points.push(b.name)
        else if ('path' === a) c[b.part].paths.push(b.name)
        else if ('coords' === a) c[b.part].coords.push(b.coords)
        else if ('clearFocus' === a) {
          var d = u[b.part][b.type].indexOf(b.name)
          c[b.part][b.type].splice(d, 1)
        }
        v(c)
      }
    if (null !== u)
      for (var x, y = 0, z = Object.keys(u); y < z.length; y++) {
        for (var A in ((x = z[y]), u[x].points));
        for (var i in u[x].paths);
        for (var B in u[x].coords);
      }
    ;(j = _objectSpread2(
      { options: _objectSpread2({}, h), measurements: { headCircumference: 390 } },
      j
    )),
      '' !== l && (j.only = [l])
    var C = new { examples: examples, rendertest: rendertest, tutorial: tutorial }[c](j)
    m ? C.sample() : C.draft()
    var D = C.getRenderProps()
    return React__default.createElement(
      'figure',
      { className: q ? 'design example' : 'example' },
      React__default.createElement(
        'div',
        { className: 'example' },
        q
          ? React__default.createElement(
              'div',
              { className: 'actions' },
              React__default.createElement(
                IconButton,
                {
                  color: 'primary',
                  onClick: function () {
                    return w('clearFocusAll', null)
                  }
                },
                React__default.createElement(ResetIcon, null)
              ),
              React__default.createElement(Switch, {
                checked: q,
                onChange: function () {
                  return r(!q)
                },
                value: q,
                color: 'primary'
              })
            )
          : null,
        React__default.createElement(
          Draft,
          _extends({}, D, { design: !(void 0 !== d) || d, focus: u, raiseEvent: w })
        )
      ),
      React__default.createElement('figcaption', null, f),
      q &&
        React__default.createElement(
          'div',
          { className: 'design' },
          React__default.createElement(Design, {
            focus: u,
            design: q,
            raiseEvent: w,
            parts: D.parts
          })
        )
    )
  }
module.exports = Example
//# sourceMappingURL=index.js.map
