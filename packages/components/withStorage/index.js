/**
 * @freesewing/components/withStorage | v2.6.0-rc.0
 * A collection of React components for FreeSewing web UIs
 * (c) 2020 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */ 'use strict'
function _interopDefault(a) {
  return a && 'object' == typeof a && 'default' in a ? a['default'] : a
}
var React = _interopDefault(require('react')),
  storage = _interopDefault(require('@freesewing/utils/storage'))
function _classCallCheck(a, b) {
  if (!(a instanceof b)) throw new TypeError('Cannot call a class as a function')
}
function _defineProperties(a, b) {
  for (var c, d = 0; d < b.length; d++)
    (c = b[d]),
      (c.enumerable = c.enumerable || !1),
      (c.configurable = !0),
      'value' in c && (c.writable = !0),
      Object.defineProperty(a, c.key, c)
}
function _createClass(a, b, c) {
  return b && _defineProperties(a.prototype, b), c && _defineProperties(a, c), a
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
function _inherits(a, b) {
  if ('function' != typeof b && null !== b)
    throw new TypeError('Super expression must either be null or a function')
  ;(a.prototype = Object.create(b && b.prototype, {
    constructor: { value: a, writable: !0, configurable: !0 }
  })),
    b && _setPrototypeOf(a, b)
}
function _getPrototypeOf(a) {
  return (
    (_getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (a) {
          return a.__proto__ || Object.getPrototypeOf(a)
        }),
    _getPrototypeOf(a)
  )
}
function _setPrototypeOf(a, b) {
  return (
    (_setPrototypeOf =
      Object.setPrototypeOf ||
      function (a, b) {
        return (a.__proto__ = b), a
      }),
    _setPrototypeOf(a, b)
  )
}
function _isNativeReflectConstruct() {
  if ('undefined' == typeof Reflect || !Reflect.construct) return !1
  if (Reflect.construct.sham) return !1
  if ('function' == typeof Proxy) return !0
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0
  } catch (a) {
    return !1
  }
}
function _assertThisInitialized(a) {
  if (void 0 === a)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  return a
}
function _possibleConstructorReturn(a, b) {
  return b && ('object' == typeof b || 'function' == typeof b) ? b : _assertThisInitialized(a)
}
function _createSuper(a) {
  return function () {
    var b,
      c = _getPrototypeOf(a)
    if (_isNativeReflectConstruct()) {
      var d = _getPrototypeOf(this).constructor
      b = Reflect.construct(c, arguments, d)
    } else b = c.apply(this, arguments)
    return _possibleConstructorReturn(this, b)
  }
}
var withStorage = function (a, b) {
  return (function (c) {
    function d(a) {
      var c
      return (
        _classCallCheck(this, d),
        (c = e.call(this, a)),
        (c.setStorageData = c.setStorageData.bind(_assertThisInitialized(c))),
        (c.updateStorageData = c.updateStorageData.bind(_assertThisInitialized(c))),
        (c.state = { data: storage.get(b) || {} }),
        c
      )
    }
    _inherits(d, c)
    var e = _createSuper(d)
    return (
      _createClass(d, [
        {
          key: 'setStorageData',
          value: function (a) {
            storage.set(b, a)
          }
        },
        {
          key: 'updateStorageData',
          value: function (a) {
            var c = !!(1 < arguments.length && void 0 !== arguments[1]) && arguments[1],
              d = !!(2 < arguments.length && void 0 !== arguments[2]) && arguments[2],
              e = !!(3 < arguments.length && void 0 !== arguments[3]) && arguments[3]
            if (c) {
              var f = this.state.data
              d && 'undefined' == typeof f[c] && (f[c] = {}),
                e && 'undefined' == typeof f[c][d] && (f[c][d] = {}),
                e ? (f[c][d][e] = a) : d ? (f[c][d] = a) : (f[c] = a),
                this.setState({ data: f }),
                storage.set(b, f)
            }
          }
        },
        {
          key: 'render',
          value: function () {
            return React.createElement(
              a,
              _extends(
                { storageData: this.state.data, updateStorageData: this.updateStorageData },
                this.props
              )
            )
          }
        }
      ]),
      d
    )
  })(React.Component)
}
module.exports = withStorage
//# sourceMappingURL=index.js.map
