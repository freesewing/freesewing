const noop = () => true
// This is here for webpack's resolve.fallback
module.exports = {
  basename: noop,
  extname: noop,
  resolve: noop,
}
