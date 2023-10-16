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
        'banner',
        'bartack',
        'buttons',
        'cutonfold',
        'dimension',
        'flip',
        'gore',
        'grainline',
        'i18n',
        'logo',
        'measurements',
        'mirror',
        'notches',
        'round',
        'scalebox',
        'sprinkle',
        'title',
        'versionfreeSvg',
      ],
      menu: 'tests',
    },
  },
}
