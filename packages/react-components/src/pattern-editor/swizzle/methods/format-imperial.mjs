// Formatting for imperial values
export const formatImperial = (
  Swizzled,
  neg,
  inch,
  numo = false,
  deno = false,
  format = 'html'
) => {
  if (format === 'html') {
    if (numo) return `${neg}${inch}&nbsp;<sup>${numo}</sup>/<sub>${deno}</sub>"`
    else return `${neg}${inch}"`
  } else if (format === 'notags') {
    if (numo) return `${neg}${inch} ${numo}/${deno}"`
    else return `${neg}${inch}"`
  } else {
    if (numo) return `${neg}${inch} ${numo}/${deno}`
    else return `${neg}${inch}`
  }
}
