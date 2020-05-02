/**
 * @freesewing/components/Emblem | v2.6.0-rc.0
 * A collection of React components for FreeSewing web UIs
 * (c) 2020 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */ 'use strict'
function _interopDefault(a) {
  return a && 'object' == typeof a && 'default' in a ? a['default'] : a
}
var React = _interopDefault(require('react')),
  Emblem = function (a) {
    return React.createElement(
      React.Fragment,
      null,
      React.createElement('span', { className: 'emb' }, a.t1 || 'Free'),
      React.createElement('span', { className: 'lem' }, a.t2 || 'Sewing')
    )
  }
module.exports = Emblem
//# sourceMappingURL=index.js.map
