// Export macros
export const bannerMacros = {
  banner: function (so) {
    // Mix defaults with settings object
    so = {
      text: '',
      dy: -1,
      spaces: 12,
      repeat: 10,
      className: '',
      ...so,
    }
    so.path.attr('data-text-dy', so.dy).attr('data-text-class', `${so.className} center`)
    const spacer = '&#160;'.repeat(so.spaces)
    let banner = spacer
    for (let i = 0; i < so.repeat; i++) banner += so.text + '&#160;'.repeat(so.spaces)
    so.path.attr('data-text', banner)
  },
}
