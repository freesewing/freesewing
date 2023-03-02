const prefix = 'mirroredOnFold'

const redraft = ({ part }) => part
const redraftAndFlip = ({ part, macro }) => {
  macro('flip')
  return part
}

const opTypes = ['to', 'cp1', 'cp2']
const getRotationAngle = (grainAngle, partGrain) => {
  let toRotate = Math.abs(grainAngle - partGrain)
  if (toRotate >= 180) toRotate -= 180
  return toRotate
}
export const cutLayoutPlugin = function (material, grainAngle) {
  return {
    hooks: {
      postPartDraft: (pattern) => {
        const part = pattern.parts[pattern.activeSet][pattern.activePart]
        if (pattern.activePart.startsWith('cut.') || pattern.activePart === 'fabric' || part.hidden)
          return

        let partCutlist = pattern.setStores[pattern.activeSet].get(['cutlist', pattern.activePart])

        if (partCutlist?.materials ? !partCutlist.materials[material] : material !== 'fabric') {
          part.hide()
          return
        }

        if (typeof partCutlist.cut === 'function') {
          partCutlist = { ...partCutlist, ...partCutlist }
        }

        const matCutConfig = partCutlist?.materials?.[material]

        const { macro } = part.shorthand()
        const foldSpec =
          matCutConfig?.cutOnFold === undefined ? partCutlist?.cutOnFold : matCutConfig.cutOnFold
        if (foldSpec) {
          macro('mirrorOnFold', { fold: foldSpec })
        }

        let baseRotation = 0
        const grainSpec = matCutConfig?.grain || partCutlist?.grain
        if (grainSpec !== undefined) {
          let partGrain = grainSpec
          if (typeof grainSpec === 'function') {
            partGrain = grainSpec(0)
            baseRotation = getRotationAngle(grainAngle, partGrain)
          }
          macro('rotateToGrain', { grainAngle, partGrain })
        }
        if (!matCutConfig) return

        for (let i = 1; i < matCutConfig.cut; i++) {
          const dupPartName = `cut.${pattern.activePart}.${material}_${i + 1}`

          pattern.addPart({
            name: dupPartName,
            from: pattern.config.parts[pattern.activePart],
            draft: ({ part, macro }) => {
              if (typeof grainSpec === 'function') {
                let partGrain = grainSpec(i) - baseRotation
                macro('rotateToGrain', { partGrain, grainAngle })
              }

              if (!matCutConfig.identical && i % 2 === 1) macro('flip')

              return part
            },
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
        if (partGrain === undefined) return

        const toRotate = getRotationAngle(grainAngle, partGrain)
        if (toRotate === 0) return

        const pivot = new Point(0, 0)

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
