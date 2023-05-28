export const base = {
  name: 'pluginstest.base',
  hide: true,
  draft: ({ store, part }) => {
    store.set('bannerbox', {
      macro: {
        textClassName: 'fill-various text-xs',
        boxClassName: 'stroke-various stroke-xs dashed',
      },
      snippet: {
        textClassName: 'fill-lining text-xs',
        boxClassName: 'stroke-lining stroke-xs dotted',
      },
      plugin: {
        textClassName: 'fill-mark text-xs',
        boxClassName: 'stroke-mark stroke-xs lashed',
      },
    })

    return part
  },
  options: {
    plugin: {
      dflt: 'all',
      list: [
        'all',
        'annotations',
        'flip',
        'gore',
        'i18n',
        'measurements',
        'mirror',
        'round',
        'versionfreeSvg',
      ],
      menu: 'tests',
    },
    false: { bool: false, menu: 'tests' },
    isDetail: { bool: true, menu: 'tests' },
  },
}
