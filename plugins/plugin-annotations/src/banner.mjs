// Export macros
export const bannerMacros = {
  banner: function (so, pattern) {
    // Mix defaults with settings object
    so = {
      id: 'banner',
      text: '',
      dy: -1,
      spaces: 12,
      repeat: 10,
      className: '',
      ...so,
    }
    // Allow passing of path by ID or the actual object
    const path = typeof so.path === 'object' ? so.path : pattern.paths[so.path]

    // Store id/path in store for later removal with rmbanner
    if (path.name) pattern.store.set(`data.plugins.annotations.banner.${so.id}`, path.name || path)

    // Set test dy value
    path.attr('data-text-dy', so.dy).attr('data-text-class', `${so.className} center`)

    // Set text on path
    const spacer = '&#160;'.repeat(so.spaces)
    for (let i = 0; i < so.repeat; i++) {
      path.attr('data-text', spacer)
      path.attr('data-text', so.text)
    }

    path.attr('data-text', spacer)
  },
  rmbanner: function (id = 'banner', pattern) {
    let path = pattern.store.get(`data.plugins.annotations.banner[${id}]`)
    if (typeof path !== 'object') path = pattern.paths[path]

    // Remove attributes from path
    path.attributes.remove('data-text-dy').remove('data-text-class').remove('data-text')
  },
}
