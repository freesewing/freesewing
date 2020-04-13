const convertSize = (size = 42, breasts = false) => {
  let sizeConversion = {
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

  return breasts ? sizeConversion.withBreasts[size] : sizeConversion.withoutBreasts[size]
}

export default convertSize
