// Export macros
export const bannerMacros = {
  banner: function (so, { store, macros }) {
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

    macros.banner.paths = macros.banner.paths ? macros.banner.paths : []
    macros.banner.paths[so.id] = so.path.name
  },
  rmbanner: function (id, { paths, macros }) {
    const pathName = macros.banner.paths ? macros.banner.paths[id] : undefined
    if (pathName) {
      const bannerPath = paths[pathName]
      if (bannerPath) {
        delete bannerPath.attributes.list['data-text-dy']
        delete bannerPath.attributes.list['data-text-class']
        delete bannerPath.attributes.list['data-text']
      }
      delete macros.banner.paths[id]
    }
  },
}
