/**
 * @freesewing/components/DraftConfigurator | v2.6.0-rc.0
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
  Slider = _interopDefault(require('@material-ui/core/Slider')),
  styles = require('@material-ui/core/styles'),
  IconButton = _interopDefault(require('@material-ui/core/IconButton')),
  RightIcon = _interopDefault(require('@material-ui/icons/KeyboardArrowRight')),
  ResetIcon = _interopDefault(require('@material-ui/icons/SettingsBackupRestore')),
  sliderStep = _interopDefault(require('@freesewing/utils/sliderStep')),
  roundMm = _interopDefault(require('@freesewing/utils/roundMm')),
  roundMmUp = _interopDefault(require('@freesewing/utils/roundMmUp')),
  roundMmDown = _interopDefault(require('@freesewing/utils/roundMmDown')),
  formatMm = _interopDefault(require('@freesewing/utils/formatMm')),
  Radio = _interopDefault(require('@material-ui/core/Radio')),
  RadioGroup = _interopDefault(require('@material-ui/core/RadioGroup')),
  FormControlLabel = _interopDefault(require('@material-ui/core/FormControlLabel')),
  optionType = _interopDefault(require('@freesewing/utils/optionType')),
  optionDefault = _interopDefault(require('@freesewing/utils/optionDefault')),
  defaultSa = _interopDefault(require('@freesewing/utils/defaultSa')),
  i18n = require('@freesewing/i18n'),
  FormGroup = _interopDefault(require('@material-ui/core/FormGroup')),
  Checkbox = _interopDefault(require('@material-ui/core/Checkbox'))
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
var PaddedSlider = styles.withStyles({
    container: { padding: '25px 0' },
    track: { height: '4px' },
    thumb: { width: '16px', height: '16px' }
  })(Slider),
  FormFieldSlider = function (a) {
    var b = a.min,
      c = void 0 === b ? 0 : b,
      d = a.max,
      e = void 0 === d ? 100 : d,
      f = a.step,
      g = void 0 === f ? 0.1 : f,
      h = a.label,
      i = a.updateValue,
      j = a.name,
      k = React.useState(value),
      l = _slicedToArray(k, 2),
      m = l[0],
      n = l[1]
    React.useEffect(
      function () {
        value !== m && n(value)
      },
      [value]
    )
    var o = function (a, b) {
      i(j, b, a), n(b)
    }
    return React__default.createElement(PaddedSlider, {
      value: m,
      min: c,
      max: e,
      step: g,
      onChange: o,
      onChangeCommitted: o,
      classes: { track: 'slider-track', thumb: 'slider-thumb' },
      'aria-labelledby': void 0 !== h && h
    })
  },
  OptionPreamble = function (a) {
    var b = a.intl,
      c = a.title,
      d = a.desc,
      e = a.dflt,
      f = a.designDflt,
      g = a.option,
      h = a.value,
      i = a.displayValue,
      j = a.displayFormat,
      k = void 0 === j ? 'node' : j,
      l = a.sameButDifferent,
      m = a.expanded,
      n = a.toggleExpanded,
      o = a.reset,
      p = a.designReset,
      q = {
        container: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
        left: { flexGrow: 1, margin: '0 0.5rem' },
        right: { margin: '0 5px 0 0 ', textAlign: 'right' }
      },
      r = b.formatMessage({ id: 'app.restoreDefaults', defaultMessage: ' \u267B\uFE0F  ' }),
      s = b.formatMessage({ id: 'app.restoreDesignDefaults', defaultMessage: ' \u267B\uFE0F  ' }),
      t = b.formatMessage({ id: 'app.restorePatternDefaults', defaultMessage: ' \u267B\uFE0F  ' }),
      u = !1
    e !== f && (u = !0)
    var v = h === e ? 'dflt' : 'custom'
    u && h === f ? (v = 'p-dflt') : u && l && (v = 'custom')
    var w = React__default.createElement('span', { className: v }, i)
    return (
      'html' === k &&
        (w = React__default.createElement('span', {
          className: v,
          dangerouslySetInnerHTML: { __html: i }
        })),
      React__default.createElement(
        React__default.Fragment,
        null,
        React__default.createElement(
          'div',
          { onClick: n, style: q.container },
          React__default.createElement(
            'div',
            { style: q.left },
            React__default.createElement(RightIcon, {
              className: 'icon-col-exp ' + (m ? 'expanded' : 'collapsed')
            }),
            c
          ),
          React__default.createElement('div', { style: q.right }, w)
        ),
        React__default.createElement(
          'div',
          { className: m ? 'col-exp expanded' : 'col-exp collapsed' },
          React__default.createElement(
            'div',
            { style: q.container },
            React__default.createElement(
              'div',
              { style: q.left },
              React__default.createElement('p', null, d)
            ),
            React__default.createElement(
              'div',
              { style: q.right },
              u
                ? React__default.createElement(
                    IconButton,
                    {
                      title: s,
                      'aria-label': s,
                      color: 'primary',
                      disabled: h === f,
                      onClick: p,
                      className: 'mini-icon-btn pattern'
                    },
                    React__default.createElement(ResetIcon, null)
                  )
                : null,
              React__default.createElement(
                IconButton,
                {
                  title: u ? t : r,
                  'aria-label': u ? t : r,
                  color: 'primary',
                  disabled: !(h !== e || l),
                  onClick: o,
                  className: 'mini-icon-btn' + (u ? ' pattern' : '')
                },
                React__default.createElement(ResetIcon, null)
              )
            )
          ),
          g
        )
      )
    )
  },
  OptionPreamble$1 = reactIntl.injectIntl(OptionPreamble),
  PatternOptionPctDegCount = function (a) {
    var b = a.min,
      c = void 0 === b ? 0 : b,
      d = a.max,
      e = void 0 === d ? 100 : d,
      f = a.step,
      g = void 0 === f ? 0.1 : f,
      h = a.type,
      i = void 0 === h ? 'pct' : h,
      j = a.updateValue,
      k = a.name,
      l = a.dflt,
      m = a.designDflt,
      n = a.title,
      o = a.desc,
      p = a.value,
      q = a.raiseEvent,
      r = a.noDocs,
      s = 1
    'pct' === i && (s = 100)
    var t = function (a) {
        return Math.round(10 * a) / 10
      },
      u = React.useState(null === p ? l : t(p * s)),
      v = _slicedToArray(u, 2),
      w = v[0],
      x = v[1],
      y = React.useState(null === p ? l : t(p * s)),
      z = _slicedToArray(y, 2),
      A = z[0],
      B = z[1],
      C = React.useState(!1),
      D = _slicedToArray(C, 2),
      E = D[0],
      F = D[1],
      G = function (a, b, c) {
        ;(b = t(b)),
          isNaN(b)
            ? 'mousemove' !== c.type && j(a, p / s)
            : (x(b), 'mousemove' !== c.type && j(a, b / s))
      },
      H = function () {
        x(l), j(k, l / s)
      },
      I = function () {
        x(m), j(k, m / s)
      },
      J = ''
    'pct' === i && (J = '%'), 'deg' === i && (J = '\xB0')
    var K = React__default.createElement(FormFieldSlider, {
      name: k,
      value: w,
      min: c,
      max: e,
      step: 'count' === i ? 1 : g,
      onChange: G,
      label: 'po-' + i + '-' + k,
      updateValue: G
    })
    return React__default.createElement(
      'li',
      null,
      React__default.createElement(OptionPreamble$1, {
        dflt: l,
        designDflt: m,
        value: w,
        desc: o,
        title: n,
        id: 'po-' + i + '-' + k,
        displayValue: w + J,
        reset: H,
        patternReset: I,
        toggleExpanded: function () {
          return F(!E)
        },
        expanded: E,
        showHelp: function () {
          return q('showHelp', { type: 'patternOption', value: k })
        },
        option: K,
        noDocs: r
      })
    )
  },
  Pct = function (a) {
    return React__default.createElement(PatternOptionPctDegCount, _extends({}, a, { type: 'pct' }))
  },
  Deg = function (a) {
    return React__default.createElement(PatternOptionPctDegCount, _extends({}, a, { type: 'deg' }))
  },
  PatternOptionMillimeter = function (a) {
    var b = a.title,
      c = a.desc,
      d = a.units,
      e = void 0 === d ? 'metric' : d,
      f = a.min,
      g = void 0 === f ? 0 : f,
      h = a.max,
      i = a.updateValue,
      j = a.name,
      k = a.dflt,
      l = a.noDocs,
      m = React.useState(k),
      n = _slicedToArray(m, 2),
      o = n[0],
      p = n[1],
      q = React.useState(k),
      r = _slicedToArray(q, 2),
      s = r[0],
      t = r[1],
      u = React.useState(!1),
      v = _slicedToArray(u, 2),
      w = v[0],
      x = v[1],
      y = function (a, b, c) {
        ;(b = roundMm(b, e)),
          isNaN(b) ? 'mousemove' !== c.type && i(a, o) : (p(b), 'mousemove' !== c.type && i(a, b))
      },
      z = React__default.createElement(FormFieldSlider, {
        name: j,
        value: o,
        min: roundMmUp(g, e),
        max: roundMmDown(e),
        step: sliderStep[e],
        onChange: y,
        label: 'po-mm-' + j,
        updateValue: y
      })
    return React__default.createElement(
      'li',
      null,
      React__default.createElement(OptionPreamble$1, {
        dflt: k,
        value: o,
        desc: void 0 !== c && c,
        title: void 0 !== b && b,
        id: 'po-mm-' + j,
        displayValue: formatMm(o, e),
        displayFormat: 'html',
        reset: function () {
          p(k), i(j, k)
        },
        toggleExpanded: function () {
          return x(!w)
        },
        expanded: w,
        showHelp: function () {
          return raiseEvent('showHelp', { type: 'patternOption', value: j })
        },
        option: z,
        noDocs: l
      })
    )
  },
  Bool = function (a) {
    var b = a.dflt,
      c = a.labels,
      d = void 0 === c ? ['false', 'true'] : c,
      e = a.value,
      f = a.name,
      g = a.updateValue,
      h = React.useState(void 0 !== b && b),
      i = _slicedToArray(h, 2),
      j = i[0],
      k = i[1]
    React.useEffect(
      function () {
        e !== j && k(e)
      },
      [e]
    )
    return React__default.createElement(
      RadioGroup,
      {
        onChange: function () {
          g(f, !j), k(!j)
        },
        value: JSON.stringify(j)
      },
      React__default.createElement(FormControlLabel, {
        control: React__default.createElement(Radio, { color: 'primary' }),
        value: 'false',
        checked: 'true' !== j && !0 !== j && 1 !== j,
        label: d[0],
        className: 'po-list-item'
      }),
      React__default.createElement(FormControlLabel, {
        control: React__default.createElement(Radio, { color: 'primary' }),
        value: 'true',
        checked: !('true' !== j && !0 !== j && 1 !== j),
        label: d[1],
        className: 'po-list-item'
      })
    )
  },
  PatternOptionBool = function (a) {
    var b = React.useState(null === a.value ? a.dflt : a.value),
      c = _slicedToArray(b, 2),
      d = c[0],
      e = c[1],
      f = React.useState(!1),
      g = _slicedToArray(f, 2),
      h = g[0],
      i = g[1],
      j = function (b, c) {
        a.updateValue(a.name, c), e(c)
      },
      k = React__default.createElement(Bool, {
        name: a.name,
        value: d,
        dflt: a.dflt,
        onChange: j,
        label: 'po-bool-' + a.name,
        updateValue: j,
        labels: a.labels
      })
    return React__default.createElement(
      'li',
      null,
      React__default.createElement(OptionPreamble$1, {
        dflt: a.dflt,
        designDflt: a.designDflt,
        value: d,
        desc: a.desc,
        title: a.title,
        id: 'po-list-' + a.name,
        displayValue: d ? a.labels[1] : a.labels[0],
        toggleExpanded: function () {
          return i(!h)
        },
        expanded: h,
        reset: function () {
          e(a.dflt), a.updateValue(a.name, a.dflt)
        },
        patternReset: function () {
          e(a.designDflt), a.updateValue(a.name, a.designDflt)
        },
        showHelp: function () {
          return a.raiseEvent('showHelp', { type: 'draftSetting', value: a.name })
        },
        option: k,
        noDocs: a.noDocs
      })
    )
  },
  FormFieldList = function (a) {
    var b = React.useState(a.dflt),
      c = _slicedToArray(b, 2),
      d = c[0],
      e = c[1]
    React.useEffect(
      function () {
        a.value !== d && e(a.value)
      },
      [a.value]
    )
    return React__default.createElement(
      RadioGroup,
      {
        onChange: function (b) {
          a.updateValue(a.name, b.target.value), e(b.target.value)
        },
        value: d
      },
      Object.keys(a.list).map(function (b) {
        return React__default.createElement(FormControlLabel, {
          key: b,
          control: React__default.createElement(Radio, { color: 'primary' }),
          value: b,
          checked: !(d !== b),
          label: a.list[b],
          className: 'po-list-item'
        })
      })
    )
  },
  PatternOptionList = function (a) {
    var b,
      c = React.useState(a.dflt),
      d = _slicedToArray(c, 2),
      e = d[0],
      f = d[1],
      g = React.useState(!1),
      h = _slicedToArray(g, 2),
      i = h[0],
      j = h[1],
      k = function (b, c) {
        a.updateValue(a.name, c), f(c)
      },
      l = 'options.'.concat(a.pattern, '.').concat(a.name, '.options.'),
      m = {},
      n = _createForOfIteratorHelper(a.list)
    try {
      for (n.s(); !(b = n.n()).done; ) {
        var o = b.value
        m[o] = a.intl.formatMessage({ id: l + o, defaultMessage: o })
      }
    } catch (a) {
      n.e(a)
    } finally {
      n.f()
    }
    var p = React__default.createElement(FormFieldList, {
      name: a.name,
      value: e,
      dflt: a.dflt,
      designDflt: a.designDflt,
      onChange: k,
      label: 'po-list-' + a.name,
      updateValue: k,
      list: m
    })
    return React__default.createElement(
      'li',
      null,
      React__default.createElement(OptionPreamble$1, {
        dflt: a.dflt,
        value: e,
        desc: a.desc,
        title: a.title,
        id: 'po-list-' + a.name,
        displayValue: m[e],
        reset: function () {
          f(a.dflt), a.updateValue(a.name, a.dflt)
        },
        patternReset: function () {
          f(a.designDflt), a.updateValue(a.name, a.designDflt)
        },
        toggleExpanded: function () {
          return j(!i)
        },
        expanded: i,
        showHelp: function () {
          return a.raiseEvent('showHelp', { type: 'patternOption', value: a.name })
        },
        option: p,
        noDocs: a.noDocs
      })
    )
  },
  Count = function (a) {
    return React__default.createElement(
      PatternOptionPctDegCount,
      _extends({}, a, { type: 'count' })
    )
  },
  OptionGroup = function (a) {
    var b = function (b) {
      var c = a.config.options[b],
        d = optionType(c),
        e = 'options.'.concat(a.config.name, '.').concat(b, '.'),
        f = {
          name: b,
          dflt: optionDefault(b, a.config.options[b], a.pattern),
          designDflt: optionDefault(b, a.config.options[b]),
          units: a.units,
          updateValue: a.updateValue,
          raiseEvent: a.raiseEvent,
          title: React__default.createElement(reactIntl.FormattedMessage, { id: e + 'title' }),
          desc: React__default.createElement(reactIntl.FormattedMessage, { id: e + 'description' }),
          intl: a.intl,
          pattern: a.config.name,
          key: b,
          noDocs: a.noDocs
        }
      f.value =
        'undefined' != typeof a.data &&
        'undefined' != typeof a.data.settings &&
        'undefined' != typeof a.data.settings.options &&
        'undefined' != typeof a.data.settings.options[b]
          ? a.data.settings.options[b]
          : null
      var g = [
        React__default.createElement(reactIntl.FormattedMessage, { id: 'app.no' }),
        React__default.createElement(reactIntl.FormattedMessage, { id: 'app.yes' })
      ]
      switch (d) {
        case 'pct':
          return React__default.createElement(Pct, _extends({}, c, f))
        case 'deg':
          return React__default.createElement(Deg, _extends({}, c, f))
        case 'mm':
          return React__default.createElement(
            PatternOptionMillimeter,
            _extends({}, c, f, { units: a.units })
          )
        case 'bool':
          return React__default.createElement(PatternOptionBool, _extends({}, c, f, { labels: g }))
        case 'list':
          return React__default.createElement(PatternOptionList, _extends({}, c, f))
        case 'count':
          return React__default.createElement(Count, _extends({}, c, f))
        default:
          throw new Error('Unsupported option type: ' + d)
      }
    }
    return React__default.createElement(
      React__default.Fragment,
      null,
      a.options.map(function (a) {
        var c = []
        if ('object' === _typeof(a))
          for (var d = 0, e = Object.keys(a); d < e.length; d++) {
            var f,
              g = e[d],
              h = [],
              i = _createForOfIteratorHelper(a[g])
            try {
              for (i.s(); !(f = i.n()).done; ) {
                var j = f.value
                h.push(b(j, !0))
              }
            } catch (a) {
              i.e(a)
            } finally {
              i.f()
            }
            c.push(
              React__default.createElement(
                'li',
                null,
                React__default.createElement(
                  'span',
                  { key: g + '-title', className: 'subheading' },
                  React__default.createElement(RightIcon, { className: 'icon-col-exp expanded' }),
                  React__default.createElement(reactIntl.FormattedMessage, {
                    id: 'optiongroups.' + g
                  })
                ),
                React__default.createElement('ul', { className: 'config l4' }, h)
              )
            )
          }
        else c.push(b(a))
        return c
      })
    )
  },
  OptionGroup$1 = reactIntl.injectIntl(OptionGroup),
  PatternOptions = function (a) {
    var b = React.useState([]),
      c = _slicedToArray(b, 2),
      d = c[0],
      e = c[1],
      f = function (a) {
        var b = d.slice(0),
          c = b.indexOf(a)
        ;-1 === c ? b.push(a) : b.splice(c, 1), e(b)
      },
      g = function (b) {
        var c = !0
        ;-1 === d.indexOf(b) && (c = !1)
        var e = [],
          g = null
        return (
          -1 !== d.indexOf(b) &&
            (g = React__default.createElement(
              'ul',
              { className: 'config l3' },
              React__default.createElement(OptionGroup$1, {
                noDocs: a.noDocs,
                key: b + '-group',
                units: a.units,
                config: a.config,
                data: a.data,
                pattern: a.pattern,
                options: a.config.optionGroups[b],
                updateValue: a.updateValue,
                raiseEvent: a.raiseEvent
              })
            )),
          e.push(
            React__default.createElement(
              'li',
              { className: c ? 'expanded' : 'collapsed', key: b + '-ghead' },
              React__default.createElement(
                'span',
                {
                  onClick: function () {
                    return f(b)
                  }
                },
                React__default.createElement(RightIcon, {
                  className: 'icon-col-exp ' + (c ? 'expanded' : 'collapsed')
                }),
                React__default.createElement(reactIntl.FormattedMessage, {
                  id: 'optiongroups.' + b
                })
              ),
              g
            )
          ),
          e
        )
      },
      h = []
    for (var i in a.config.optionGroups)
      (a.data.settings.advanced || 'advanced' !== i) && h.push(g(i))
    return React__default.createElement('ul', { className: 'config l2' }, h)
  },
  DraftSettingSa = function (a) {
    var b = React.useState(
        a.value === defaultSa[a.units] ? 'dflt' : 0 === a.value ? 'none' : 'custom'
      ),
      c = _slicedToArray(b, 2),
      d = c[0],
      e = c[1],
      f = React.useState(null === a.value ? defaultSa[a.units] : a.value),
      g = _slicedToArray(f, 2),
      h = g[0],
      i = g[1],
      j = React.useState('custom' === d ? a.value : 10),
      k = _slicedToArray(j, 2),
      l = k[0],
      m = k[1],
      n = React.useState(!1),
      o = _slicedToArray(n, 2),
      p = o[0],
      q = o[1],
      r = function (b, c) {
        'none' === c
          ? (a.updateValue('sa', 0), e(c), i(0))
          : 'dflt' === c
          ? (a.updateValue('sa', defaultSa[a.units]), e(c), i(defaultSa[a.units]))
          : (a.updateValue('sa', l), e(c), i(l))
      },
      s = 'dflt'
    0 === a.dflt && (s = 'none'), 10 !== a.dflt && (s = 'custom')
    var t = function () {
        e(s), i(a.dflt), a.updateValue('sa', a.dflt)
      },
      u = { none: a.labels.none, dflt: a.labels.dflt, custom: a.labels.custom },
      v = React__default.createElement(FormFieldList, {
        name: 'sa',
        value: d,
        dflt: 'dflt',
        onChange: r,
        label: 'po-bool-sa',
        updateValue: r,
        list: u
      })
    return (
      'custom' === d &&
        (v = React__default.createElement(
          React__default.Fragment,
          null,
          v,
          React__default.createElement(FormFieldSlider, {
            name: 'customSa',
            value: h,
            dflt: defaultSa[a.units],
            label: 'po-bool-sa',
            updateValue: function (b, c, d) {
              ;(c = roundMm(c)),
                isNaN(c)
                  ? a.updateValue('sa', l)
                  : (i(c), m(c), 'mousemove' !== d.type && a.updateValue('sa', c))
            },
            min: 0,
            max: 25.4,
            step: sliderStep[a.units]
          })
        )),
      React__default.createElement(
        'li',
        null,
        React__default.createElement(OptionPreamble$1, {
          dflt: s,
          designDflt: 'dflt',
          sameButDifferent: a.dflt !== a.value,
          value: d,
          desc: a.desc,
          title: a.title,
          id: 'po-list-sa',
          displayValue: formatMm(h, a.units),
          displayFormat: 'html',
          reset: t,
          patternReset: function () {
            e('dflt'), i(defaultSa[a.units]), a.updateValue('sa', defaultSa[a.units])
          },
          toggleExpanded: function () {
            return q(!p)
          },
          expanded: p,
          showHelp: function () {
            return a.raiseEvent('showHelp', { type: 'draftSetting', value: 'sa' })
          },
          option: v,
          noDocs: a.noDocs
        })
      )
    )
  },
  DraftSettingMargin = function (a) {
    var b = React.useState(null === a.value ? a.dflt : a.value),
      c = _slicedToArray(b, 2),
      d = c[0],
      e = c[1],
      f = React.useState(!1),
      g = _slicedToArray(f, 2),
      h = g[0],
      i = g[1],
      j = React__default.createElement(FormFieldSlider, {
        name: 'customSa',
        value: d,
        dflt: a.dflt,
        label: 'po-slider-margin',
        updateValue: function (b, c, f) {
          ;(c = roundMm(c)),
            isNaN(c)
              ? a.updateValue('margin', d)
              : (e(c), 'mousemove' !== f.type && a.updateValue('margin', c))
        },
        min: 0,
        max: 25.4,
        step: sliderStep[a.units]
      })
    return React__default.createElement(
      'li',
      null,
      React__default.createElement(OptionPreamble$1, {
        dflt: a.dflt,
        designDflt: a.designDflt,
        value: d,
        desc: a.desc,
        title: a.title,
        id: 'po-slider-margin',
        displayValue: formatMm(d, a.units),
        displayFormat: 'html',
        reset: function () {
          e(a.dflt), a.updateValue('margin', a.dflt)
        },
        patternReset: function () {
          e(a.designDflt), a.updateValue('margin', a.designDflt)
        },
        toggleExpanded: function () {
          return i(!h)
        },
        expanded: h,
        showHelp: function () {
          return a.raiseEvent('showHelp', { type: 'draftSetting', value: 'margin' })
        },
        option: j,
        noDocs: a.noDocs
      })
    )
  },
  DraftSettingComplete = function (a) {
    return React__default.createElement(PatternOptionBool, _extends({}, a, { name: 'complete' }))
  },
  DraftSettingPaperless = function (a) {
    return React__default.createElement(PatternOptionBool, _extends({}, a, { name: 'paperless' }))
  },
  DraftSettingAdvanced = function (a) {
    return React__default.createElement(PatternOptionBool, _extends({}, a, { name: 'advanced' }))
  },
  DraftSettingUnits = function (a) {
    var b = React.useState(a.dflt),
      c = _slicedToArray(b, 2),
      d = c[0],
      e = c[1],
      f = React.useState(!1),
      g = _slicedToArray(f, 2),
      h = g[0],
      i = g[1],
      j = function (b, c) {
        a.updateValue(a.name, c), e(c)
      },
      k = React__default.createElement(FormFieldList, {
        name: 'units',
        value: d,
        dflt: a.dflt,
        onChange: j,
        label: 'po-bool-units',
        updateValue: j,
        list: a.list
      })
    return React__default.createElement(
      'li',
      null,
      React__default.createElement(OptionPreamble$1, {
        dflt: a.dflt,
        designDflt: a.designDflt,
        value: d,
        desc: a.desc,
        title: a.title,
        id: 'po-list-units',
        displayValue: a.list[d],
        reset: function () {
          e(a.dflt), a.updateValue(a.name, a.dflt)
        },
        patternReset: function () {
          e(a.designDflt), a.updateValue(a.name, a.designDflt)
        },
        toggleExpanded: function () {
          return i(!h)
        },
        expanded: h,
        showHelp: function () {
          return a.raiseEvent('showHelp', { type: 'draftSetting', value: 'units' })
        },
        option: k,
        noDocs: a.noDocs
      })
    )
  },
  DraftSettingLanguage = function (a) {
    var b = React.useState(null === a.value ? a.intl.locale : a.value),
      c = _slicedToArray(b, 2),
      d = c[0],
      e = c[1],
      f = React.useState(!1),
      g = _slicedToArray(f, 2),
      h = g[0],
      i = g[1],
      j = function (b, c) {
        a.updateValue(a.name, c), e(c)
      },
      k = React__default.createElement(FormFieldList, {
        name: a.name,
        value: d,
        dflt: a.dflt,
        designDflt: a.intl.locale,
        onChange: j,
        label: 'po-list-' + a.name,
        updateValue: j,
        list: i18n.languages
      })
    return React__default.createElement(
      'li',
      null,
      React__default.createElement(OptionPreamble$1, {
        dflt: a.dflt,
        designDflt: a.intl.locale,
        value: d,
        desc: a.desc,
        title: a.title,
        id: 'po-list-' + a.name,
        displayValue: i18n.languages[d],
        reset: function () {
          e(a.dflt || a.intl.locale), a.updateValue(a.name, a.dflt || a.intl.locale)
        },
        patternReset: function () {
          e(a.intl.locale), a.updateValue(a.name, a.intl.locale)
        },
        toggleExpanded: function () {
          return i(!h)
        },
        expanded: h,
        showHelp: function () {
          return a.raiseEvent('showHelp', { type: 'draftSetting', value: a.name })
        },
        option: k,
        noDocs: a.noDocs
      })
    )
  },
  DraftSettingLanguage$1 = reactIntl.injectIntl(DraftSettingLanguage),
  FormFieldChecks = function (a) {
    var b = React.useState(a.dflt ? a.dflt : []),
      c = _slicedToArray(b, 2),
      d = c[0],
      e = c[1],
      f = function (b) {
        var c = d.slice(0),
          f = c.indexOf(b)
        ;-1 === f ? c.push(b) : c.splice(f, 1), e(c), a.updateValue(a.name, c)
      }
    return React__default.createElement(
      FormGroup,
      null,
      Object.keys(a.checks).map(function (b) {
        return React__default.createElement(FormControlLabel, {
          control: React__default.createElement(Checkbox, {
            checked: -1 !== d.indexOf(b),
            onChange: function () {
              return f(b)
            },
            value: b
          }),
          label: a.checks[b],
          key: b,
          className: 'po-list-item'
        })
      })
    )
  },
  DraftSettingOnly = function (a) {
    var b = React.useState(null === a.value ? 'dflt' : !1 === a.value ? 'dflt' : 'custom'),
      c = _slicedToArray(b, 2),
      d = c[0],
      e = c[1],
      f = React.useState('custom' === d ? a.value : a.customDflt),
      g = _slicedToArray(f, 2),
      h = g[0],
      i = g[1],
      j = React.useState(!1),
      k = _slicedToArray(j, 2),
      l = k[0],
      m = k[1],
      n = function (b, c) {
        e(c), 'dflt' === c ? a.updateValue('only', !1) : a.updateValue('only', h)
      },
      o = 'dflt'
    ;('custom' === a.dflt || Array.isArray(a.dflt)) && (o = 'custom')
    var p = function () {
        e(o),
          'dflt' === o
            ? (i([]), a.updateValue('only', !1))
            : (i(a.dflt), a.updateValue('only', a.dflt))
      },
      q = function (b, c) {
        a.updateValue('only', c), i(c)
      },
      r = { dflt: a.labels.dflt, custom: a.labels.custom },
      s = React__default.createElement(FormFieldList, {
        name: 'only',
        value: d,
        dflt: a.dflt,
        designDflt: a.dflt,
        onChange: n,
        label: 'po-list-only',
        updateValue: n,
        list: r
      })
    return (
      'custom' === d &&
        (s = React__default.createElement(
          React__default.Fragment,
          null,
          s,
          React__default.createElement(FormFieldChecks, {
            checks: a.parts,
            name: 'parts',
            value: d,
            dflt: h,
            onChange: q,
            label: 'po-list-only',
            updateValue: q,
            list: r
          })
        )),
      React__default.createElement(
        'li',
        null,
        React__default.createElement(OptionPreamble$1, {
          dflt: o,
          designDflt: 'dflt',
          sameButDifferent: a.dflt !== a.value,
          value: d,
          desc: a.desc,
          title: a.title,
          id: 'po-list-only',
          displayValue: a.labels[d],
          reset: p,
          patternReset: function () {
            e('dflt'), i([]), a.updateValue('only', !1)
          },
          toggleExpanded: function () {
            return m(!l)
          },
          expanded: l,
          showHelp: function () {
            return a.raiseEvent('showHelp', { type: 'draftSetting', value: 'only' })
          },
          option: s,
          noDocs: a.noDocs
        })
      )
    )
  },
  DraftSettings = function (a) {
    var b = a.units,
      c = void 0 === b ? 'metric' : b,
      d = a.raiseEvent,
      e = a.updateValue,
      f = a.noDocs,
      g = a.pattern,
      h = a.config,
      i = a.data,
      j = void 0 === i ? { settings: {} } : i,
      k = React.useState([]),
      l = _slicedToArray(k, 2),
      m = l[0],
      n = l[1],
      o = [
        React__default.createElement(reactIntl.FormattedMessage, { id: 'app.no' }),
        React__default.createElement(reactIntl.FormattedMessage, { id: 'app.yes' })
      ],
      p = [
        React__default.createElement(reactIntl.FormattedMessage, { id: 'app.hide' }),
        React__default.createElement(reactIntl.FormattedMessage, { id: 'app.show' })
      ],
      q = {
        metric: React__default.createElement(reactIntl.FormattedMessage, { id: 'app.metricUnits' }),
        imperial: React__default.createElement(reactIntl.FormattedMessage, {
          id: 'app.imperialUnits'
        })
      },
      r = {
        sa: {
          none: React__default.createElement(reactIntl.FormattedMessage, {
            id: 'app.noSeamAllowance'
          }),
          dflt: React__default.createElement(reactIntl.FormattedMessage, {
            id: 'app.standardSeamAllowance'
          }),
          custom: React__default.createElement(reactIntl.FormattedMessage, {
            id: 'app.customSeamAllowance'
          })
        },
        only: {
          dflt: React__default.createElement(reactIntl.FormattedMessage, { id: 'app.default' }),
          custom: React__default.createElement(reactIntl.FormattedMessage, { id: 'app.custom' })
        },
        paperless: o,
        advanced: p,
        complete: p
      },
      s = function (a) {
        var b = m.slice(0),
          c = b.indexOf(a)
        ;-1 === c ? b.push(a) : b.splice(c, 1), n(b)
      },
      t = function (a) {
        var b = !!(1 < arguments.length && arguments[1] !== void 0) && arguments[1]
        if (b && 'undefined' != typeof b.settings[a]) return b.settings[a]
        return 'sa' === a
          ? 10
          : 'only' === a
          ? 'dflt'
          : !('complete' != a) || ('margin' === a ? 2 : !('units' != a) && c)
      },
      u = function (a) {
        var b = {
          raiseEvent: d,
          updateValue: e,
          units: c,
          key: a,
          name: a,
          labels: r[a],
          noDocs: f,
          dflt: t(a, g),
          designDflt: t(a),
          title: React__default.createElement(reactIntl.FormattedMessage, {
            id: 'settings.' + a + '.title'
          }),
          desc: React__default.createElement(reactIntl.FormattedMessage, {
            id: 'settings.' + a + '.description'
          })
        }
        if ('only' === a && ((b.customDflt = []), (b.parts = {}), h.draftOrder)) {
          var i,
            k = _createForOfIteratorHelper(h.draftOrder)
          try {
            for (k.s(); !(i = k.n()).done; ) {
              var l = i.value
              b.parts[l] = React__default.createElement(reactIntl.FormattedMessage, {
                id: 'parts.' + l
              })
            }
          } catch (a) {
            k.e(a)
          } finally {
            k.f()
          }
        }
        return (b.value = 'undefined' == typeof j.settings[a] ? null : j.settings[a]), b
      },
      v = {
        advanced: [
          React__default.createElement(DraftSettingLanguage$1, u('locale')),
          React__default.createElement(DraftSettingUnits, _extends({}, u('units'), { list: q })),
          React__default.createElement(DraftSettingComplete, u('complete')),
          React__default.createElement(DraftSettingMargin, u('margin')),
          React__default.createElement(DraftSettingOnly, u('only'))
        ]
      }
    return React__default.createElement(
      React__default.Fragment,
      null,
      React__default.createElement(
        'ul',
        { className: 'config l2 nogroups' },
        React__default.createElement(DraftSettingSa, u('sa')),
        React__default.createElement(DraftSettingPaperless, u('paperless')),
        React__default.createElement(DraftSettingAdvanced, u('advanced'))
      ),
      j.settings.advanced &&
        React__default.createElement(
          'ul',
          { className: 'config l2' },
          Object.keys(v).map(function (a) {
            var b = !0
            ;-1 === m.indexOf(a) && (b = !1)
            var c = null
            return (
              b &&
                (c = v[a].map(function (a) {
                  return a
                })),
              React__default.createElement(
                React__default.Fragment,
                { key: a },
                React__default.createElement(
                  'li',
                  { className: b ? 'expanded' : 'collapsed', key: a + '-ghead' },
                  React__default.createElement(
                    'span',
                    {
                      onClick: function () {
                        return s(a)
                      }
                    },
                    React__default.createElement(RightIcon, {
                      className: 'icon-col-exp ' + (b ? 'expanded' : 'collapsed')
                    }),
                    React__default.createElement(reactIntl.FormattedMessage, {
                      id: 'optiongroups.' + a
                    })
                  )
                ),
                c
              )
            )
          })
        )
    )
  },
  DraftConfigurator = function (a) {
    var b = a.noDocs,
      c = a.units,
      d = void 0 === c ? 'metric' : c,
      e = a.config,
      f = void 0 === e ? {} : e,
      g = a.data,
      h = void 0 === g ? {} : g,
      i = a.pattern,
      j = a.updatePatternData,
      k = a.raiseEvent,
      l = { noDocs: void 0 !== b && b, units: d, config: f, data: h, pattern: i, raiseEvent: k }
    return React__default.createElement(
      'ul',
      { className: 'config l1' },
      React__default.createElement(
        'li',
        null,
        React__default.createElement(
          'span',
          null,
          React__default.createElement(reactIntl.FormattedMessage, { id: 'app.designOptions' })
        ),
        React__default.createElement(
          PatternOptions,
          _extends({}, l, {
            updateValue: function (a, b) {
              return j(b, 'settings', 'options', a)
            }
          })
        )
      ),
      React__default.createElement(
        'li',
        null,
        React__default.createElement(
          'span',
          null,
          React__default.createElement(reactIntl.FormattedMessage, { id: 'app.patternOptions' })
        ),
        React__default.createElement(
          DraftSettings,
          _extends({}, l, {
            updateValue: function (a, b) {
              return j(b, 'settings', a)
            }
          })
        )
      )
    )
  }
module.exports = DraftConfigurator
//# sourceMappingURL=index.js.map
