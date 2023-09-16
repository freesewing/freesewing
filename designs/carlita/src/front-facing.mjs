import { frontFacing as carltonFrontFacing } from '@freesewing/carlton'

export const frontFacing = {
  name: 'carlita.frontFacing',
  from: carltonFrontFacing,
  draft: ({ points, macro, part }) => {
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
