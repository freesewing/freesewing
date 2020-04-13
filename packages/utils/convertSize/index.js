/**
 * @freesewing/utils/convertSize | v2.5.1-1
 * A collection of utilities shared across freesewing frontend projects
 * (c) 2020 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */ 'use strict'
const convertSize = (a = 42, b = !1) => {
  let c = {
    withoutBreasts: {
      32: '3XS',
      34: 'XXS',
      36: 'XS',
      38: 'S',
      40: 'M',
      42: 'L',
      44: 'XL',
      46: '2XL',
      48: '3XL',
      50: '4XL'
    },
    withBreasts: {
      28: '3XS',
      30: 'XXS',
      32: 'XS',
      34: 'S',
      36: 'M',
      38: 'L',
      40: 'XL',
      42: '2XL',
      44: '3XL',
      46: '4XL'
    }
  }
  return b ? c.withBreasts[a] : c.withoutBreasts[a]
}
module.exports = convertSize
//# sourceMappingURL=index.js.map
