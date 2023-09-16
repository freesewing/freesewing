import { frontFacing as carltonFrontFacing } from '@freesewing/carlton'

export const frontFacing = {
  name: 'carlita.frontFacing',
  from: carltonFrontFacing,
  draft: ({ points, macro, expand, store, part }) => {
    if (expand) store.flag.preset('expandIsOn')
    else {
      // Expand is on, do not draw the part but flag this to the user
      store.flag.note({
        msg: `carlton:cutFrontFacing`,
        suggest: {
          text: 'flag:show',
          icon: 'expand',
          update: {
            settings: ['expand', 1],
          },
        },
      })
      // Also hint about expand
      store.flag.preset('expandIsOff')

      return part.hide()
    }

    macro('title', {
      at: points.title,
      nr: '1c',
      title: 'frontFacing',
      align: 'center',
    })

    return part
  },
  hide: {
    from: true,
    inherited: true,
  },
}
