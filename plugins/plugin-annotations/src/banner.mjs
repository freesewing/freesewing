// Export macros
export const bannerMacros = {
  banner: function (so, { store }) {
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

    for (let i = 0; i < so.repeat; i++) {
      so.path.attr('data-text', spacer)
      so.path.attr('data-text', so.text)
    }

    so.path.attr('data-text', spacer)

    store.set('macros.banner.paths.' + so.id, so.path.name)
  },
  rmbanner: function (id, { paths, store }) {
    const storePathKey = 'macros.banner.paths.' + id
    const pathName = store.get(storePathKey)
    if (pathName) {
      const bannerPath = paths[pathName]
      delete bannerPath.attributes.list['data-text-dy']
      delete bannerPath.attributes.list['data-text-class']
      delete bannerPath.attributes.list['data-text']
    }
    store.unset(storePathKey)
  },
}
