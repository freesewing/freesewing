const formatImperial = (neg, inch, numo = false, deno = false, format = 'html') => {
  if (format === 'html') {
    if (numo) return `<span>${neg}${inch}&nbsp;<sup>${numo}</sup>/<sub>${deno}</sub></span>`
    else return `<span>${neg}${inch}</span>`
  } else {
    if (numo) return `${neg}${inch} ${numo}/${deno}`
    else return `${neg}${inch}`
  }
}

export default formatImperial
