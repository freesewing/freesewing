// Export macros
export const bannerMacros = {
  banner: function (so, { store }) {
    console.log({ banner: { so: so, store: store } })
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
  rmbanner: function (so, { paths, store }) {
    console.log({ rmbanner: { id: so.id, store: store } })
    const pathName = store.get('macros.banner.paths.' + so.id)
    console.log({ pathName: pathName })
    if (pathName) {
      const bannerPath = paths[pathName]
      console.log({ bannerPath: bannerPath })
      delete bannerPath.attributes['data-text-dy']
      delete bannerPath.attributes['data-text-class']
      delete bannerPath.attributes['data-text']
      console.log({ bannerPath: bannerPath })
    }
  },
}
