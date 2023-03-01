const prefix = 'mirroredOnFold'

const redraft = ({ part }) => part
const redraftAndFlip = ({ part, macro }) => {
  macro('flip')
  return part
}

const opTypes = ['to', 'cp1', 'cp2']
export const cutLayoutPlugin = function (material, grainAngle) {
  return {
    hooks: {
      postPartDraft: (pattern) => {
        const part = pattern.parts[pattern.activeSet][pattern.activePart]
        if (pattern.activePart.startsWith('cut.') || pattern.activePart === 'fabric' || part.hidden)
          return

        const partCutlist = pattern.setStores[pattern.activeSet].get([
          'cutlist',
          pattern.activePart,
        ])

        if (partCutlist?.materials ? !partCutlist.materials[material] : material !== 'fabric') {
          part.hide()
          return
        }

        const { macro } = part.shorthand()
        if (partCutlist?.cutOnFold) {
          macro('mirrorOnFold', { fold: partCutlist.cutOnFold })
        }

        if (
          partCutlist?.grain !== undefined &&
          partCutlist.grain !== grainAngle &&
          partCutlist.grain + 180 != grainAngle
        ) {
          macro('rotateToGrain', { partGrain: partCutlist.grain, grainAngle })
        }

        const matCutConfig = partCutlist?.materials?.[material]
        if (!matCutConfig) return

        for (var i = 1; i < matCutConfig.cut; i++) {
          const dupPartName = `cut.${pattern.activePart}.${material}_${i + 1}`
          pattern.addPart({
            name: dupPartName,
            from: pattern.config.parts[pattern.activePart],
            draft: matCutConfig.identical || i % 2 === 0 ? redraft : redraftAndFlip,
          })
        }
      },
    },
    macros: {
      mirrorOnFold: ({ fold }, { paths, snippets, utils, macro, points }) => {
        const mirrorPaths = []
        for (const p in paths) {
          if (!paths[p].hidden && !p.startsWith(prefix)) mirrorPaths.push(paths[p])
        }

        const mirrorPoints = []
        const snippetsByType = {}
        for (var s in snippets) {
          const snip = snippets[s]
          if (['logo'].indexOf(snip.def) > -1) continue

          snippetsByType[snip.def] = snippetsByType[snip.def] || []

          mirrorPoints.push(snip.anchor)
          for (var pName in points) {
            if (points[pName] === snip.anchor) {
              snippetsByType[snip.def].push(prefix + utils.capitalize(pName))
              break
            }
          }
        }

        let unnamed = 0
        macro('mirror', {
          paths: Object.values(mirrorPaths),
          points: mirrorPoints,
          mirror: fold,
          prefix,
          nameFormat: (path) => {
            unnamed++
            return `${prefix}_${unnamed}`
          },
        })

        for (var def in snippetsByType) {
          macro('sprinkle', {
            snippet: def,
            on: snippetsByType[def],
          })
        }
      },
      rotateToGrain: ({ partGrain, grainAngle }, { paths, snippets, Point, points }) => {
        const pivot = points.grainlineFrom || points.cutonfoldFrom || new Point(0, 0)

        const toRotate = grainAngle - partGrain

        for (const pathName in paths) {
          const path = paths[pathName]
          if (paths[pathName].hidden) continue

          path.ops.forEach((op) => {
            opTypes.forEach((t) => {
              if (op[t]) op[t] = op[t].rotate(toRotate, pivot)
            })
          })
        }

        for (const snippetName in snippets) {
          snippets[snippetName].anchor = snippets[snippetName].anchor.rotate(toRotate, pivot)
        }

        for (const pointName in points) {
          const point = points[pointName]
          const pointAttrs = point.attributes
          if (Object.keys(pointAttrs.list).length) {
            points[pointName] = point.rotate(toRotate, pivot)
            points[pointName].attributes = pointAttrs.clone()
          }
        }
      },
    },
  }
}
