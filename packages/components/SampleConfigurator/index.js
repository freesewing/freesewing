/**
 * @freesewing/components/SampleConfigurator | v2.6.0-rc.0
 * A collection of React components for FreeSewing web UIs
 * (c) 2020 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */ 'use strict'
function _interopDefault(a) {
  return a && 'object' == typeof a && 'default' in a ? a['default'] : a
}
var React = require('react'),
  React__default = _interopDefault(React),
  reactIntl = require('react-intl'),
  models = require('@freesewing/models')
function _typeof(a) {
  '@babel/helpers - typeof'
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (a) {
            return typeof a
          }
        : function (a) {
            return a &&
              'function' == typeof Symbol &&
              a.constructor === Symbol &&
              a !== Symbol.prototype
              ? 'symbol'
              : typeof a
          }),
    _typeof(a)
  )
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
var OptionGroup = function (a) {
    return React__default.createElement(
      React__default.Fragment,
      null,
      a.options.map(function (b) {
        var c = []
        if ('object' === _typeof(b))
          for (var d, e = 0, f = Object.keys(b); e < f.length; e++) {
            ;(d = f[e]),
              c.push(
                React__default.createElement(
                  'h5',
                  { key: d + '-title', className: 'subheading' },
                  React__default.createElement(reactIntl.FormattedMessage, {
                    id: 'optiongroups.' + d
                  })
                )
              )
            var g,
              h = [],
              i = _createForOfIteratorHelper(b[d])
            try {
              var j = function () {
                var b = g.value
                h.push(
                  React__default.createElement(
                    'li',
                    null,
                    React__default.createElement(
                      'a',
                      {
                        href: '#logo',
                        onClick: function () {
                          return a.sampleOption(b)
                        }
                      },
                      React__default.createElement(reactIntl.FormattedMessage, {
                        id: 'options.' + a.config.name + '.' + b + '.title'
                      })
                    )
                  )
                )
              }
              for (i.s(); !(g = i.n()).done; ) j()
            } catch (a) {
              i.e(a)
            } finally {
              i.f()
            }
            c.push(React__default.createElement('ul', { style: { paddingLeft: '1rem' } }, h))
          }
        else
          c.push(
            React__default.createElement(
              'li',
              null,
              React__default.createElement(
                'a',
                {
                  href: '#logo',
                  onClick: function () {
                    return a.sampleOption(b)
                  }
                },
                React__default.createElement(reactIntl.FormattedMessage, {
                  id: 'options.' + a.config.name + '.' + b + '.title'
                })
              )
            )
          )
        return c
      })
    )
  },
  OptionGroup$1 = reactIntl.injectIntl(OptionGroup),
  PatternOptions = function (a) {
    var b = function (b) {
      var c = [],
        d = React__default.createElement(
          'ul',
          { className: 'links' },
          React__default.createElement(OptionGroup$1, {
            key: b + '-group',
            units: a.units,
            config: a.config,
            options: a.config.optionGroups[b],
            sampleOption: a.sampleOption
          })
        )
      return (
        c.push(
          React__default.createElement(
            'li',
            { key: b + '-ghead', className: 'nodot' },
            React__default.createElement(
              'h3',
              null,
              React__default.createElement(reactIntl.FormattedMessage, { id: 'optiongroups.' + b })
            ),
            d
          )
        ),
        c
      )
    }
    return React__default.createElement(
      'ul',
      { className: 'links' },
      Object.keys(a.config.optionGroups).map(function (a) {
        return b(a)
      })
    )
  },
  SampleConfigurator = function (a) {
    var b = React.useState([]),
      c = _slicedToArray(b, 2),
      d = c[0],
      e = c[1],
      f = function (b) {
        a.updateGist({ type: 'measurement', measurement: b }, 'settings', 'sample')
      },
      g = function (b) {
        a.updateGist({ type: 'models', models: b }, 'settings', 'sample')
      },
      h = { ant: {}, man: models.withoutBreasts.manSize42 }
    for (var i in models.withoutBreasts.manSize42) h.ant[i] = h.man[i] / 10
    return React__default.createElement(
      'ul',
      { className: 'links' },
      React__default.createElement(
        'li',
        { className: 'nodot' },
        React__default.createElement(
          'h4',
          null,
          React__default.createElement(reactIntl.FormattedMessage, { id: 'app.patternOptions' })
        ),
        React__default.createElement(PatternOptions, {
          config: a.config,
          gist: a.gist,
          sampleOption: function (b) {
            a.updateGist({ type: 'option', option: b }, 'settings', 'sample')
          }
        })
      ),
      React__default.createElement(
        'li',
        { className: 'nodot' },
        React__default.createElement(
          'h4',
          null,
          React__default.createElement(reactIntl.FormattedMessage, { id: 'app.measurements' })
        ),
        React__default.createElement(
          'ul',
          { style: { paddingLeft: '1rem' } },
          a.config.measurements.map(function (a) {
            return React__default.createElement(
              'li',
              { key: a },
              React__default.createElement(
                'a',
                {
                  href: '#logo',
                  onClick: function () {
                    return f(a)
                  }
                },
                React__default.createElement(reactIntl.FormattedMessage, {
                  id: 'measurements.' + a
                })
              )
            )
          })
        )
      ),
      React__default.createElement(
        'li',
        { className: 'nodot' },
        React__default.createElement(
          'h4',
          null,
          React__default.createElement(reactIntl.FormattedMessage, { id: 'app.models' })
        ),
        React__default.createElement(
          'ul',
          { style: { paddingLeft: '1rem' } },
          React__default.createElement(
            'li',
            null,
            React__default.createElement(
              'a',
              {
                href: '#logo',
                onClick: function () {
                  return g(models.withBreasts)
                }
              },
              React__default.createElement(reactIntl.FormattedMessage, { id: 'app.withBreasts' })
            )
          ),
          React__default.createElement(
            'li',
            null,
            React__default.createElement(
              'a',
              {
                href: '#logo',
                onClick: function () {
                  return g(models.withoutBreasts)
                }
              },
              React__default.createElement(reactIntl.FormattedMessage, { id: 'app.withoutBreasts' })
            )
          ),
          React__default.createElement(
            'li',
            null,
            React__default.createElement(
              'a',
              {
                href: '#logo',
                onClick: function () {
                  return g(h)
                }
              },
              'Antman'
            )
          )
        )
      )
    )
  }
module.exports = SampleConfigurator
//# sourceMappingURL=index.js.map
