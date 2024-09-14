import { pocketSlash } from './pocketslash.mjs'

function draftPocketSlashShield({
  options,
  points,
  paths,
  snippets,
  sa,
  macro,
  part,
  store,
  scale,
}) {
  if (!options.pocketSlash) return part.hide()

  macro('rmad')

  const keepPaths = ['shield', 'saShield']
  for (const name in paths) {
    if (keepPaths.indexOf(name) === -1) delete paths[name]
  }

  if (sa) paths.saShield.unhide()
  paths.shield.setClass('fabric')
  points.shieldText.setText(null)
  delete snippets.logo

  macro('hd', {
    id: 'wTop',
    from: points.topLeft,
    to: points.shieldTop,
    y: points.topLeft.y - (sa + 15),
  })
  macro('vd', {
    id: 'hTop',
    from: points.topLeft,
    to: points.shieldSide,
    x: points.shieldSide.x - (sa + 15),
  })
  if (points.shieldSide.x != points.shieldSideTrim.x) {
    macro('hd', {
      id: 'wBottomTrim',
      from: points.shieldSide,
      to: points.shieldSideTrim,
      y: points.shieldSide.y + (sa + 15),
      noStartMarker: points.shieldSideTrim.x - points.shieldSide.x < 25 * scale ? true : false,
      noEndMarker: points.shieldSideTrim.x - points.shieldSide.x < 25 * scale ? true : false,
    })
    macro('hd', {
      id: 'wDiagonal',
      from: points.shieldSideTrim,
      to: points.shieldTopTrim,
      y: points.shieldSide.y + (sa + 15),
    })
  }
  if (points.shieldTop.y != points.shieldTopTrim.y) {
    macro('vd', {
      id: 'hSideTrim',
      from: points.shieldTop,
      to: points.shieldTopTrim,
      x: points.shieldTop.x + (sa + 15),
      noStartMarker: points.shieldTopTrim.y - points.shieldTop.y < 25 * scale ? true : false,
      noEndMarker: points.shieldTopTrim.y - points.shieldTop.y < 25 * scale ? true : false,
    })
    macro('vd', {
      id: 'hDiagonal',
      from: points.shieldTopTrim,
      to: points.shieldSideTrim,
      x: points.shieldTop.x + (sa + 15),
    })
  }

  points.title = points.shieldCenter.translate(scale * -10, scale * 10)
  macro('title', { at: points.title, nr: 6, title: 'opal:pocketShield', scale: 0.6 })
  store.cutlist.removeCut('lining')
  store.cutlist.addCut({ cut: 2, from: 'fabric' })

  return part
}

export const pocketSlashShield = {
  name: 'pocketSlashShield',
  draft: draftPocketSlashShield,
  from: pocketSlash,
}
