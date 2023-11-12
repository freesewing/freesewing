import { points } from './points.mjs'

export const panel = {
  name: 'lumina.panel',
  from: points,
  draft: ({ sa, Point, points, Path, paths, Snippet, snippets, options, macro, part }) => {
    paths.seam = new Path()
      .move(points.frontPanelHem)
      .join(paths.backPanel.reverse())
      .join(paths.frontPanel)
      .close()

    if (sa) paths.sa = paths.seam.offset(sa).attr('class', 'fabric sa')

    return part
  },
}
