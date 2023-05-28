// Export macros
export const bannerMacros = {
  banner: function (so, { complete }) {
    // Mix defaults with settings object
    so = {
      text: '',
      dy: -1,
      spaces: 12,
      repeat: 10,
      className: '',
      detail: true,
      ...so,
    }
if ((complete && so.detail) || !so.detail) {
    so.path.attr('data-text-dy', so.dy).attr('data-text-class', `${so.className} center`)
    const spacer = '&#160;'.repeat(so.spaces)

    for (let i = 0; i < so.repeat; i++) {
      so.path.attr('data-text', spacer)
      so.path.attr('data-text', so.text)
    }

    so.path.attr('data-text', spacer)
  }
  },
}
