const prefix = 'mirroredOnFold'

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
        if (!partCutlist) return

        if (partCutlist.materials ? !partCutlist.materials[material] : material !== 'fabric') {
          part.hide()
          return
        }

        const handleFoldAndGrain = (macro, grainSpec, ignoreOnFold) => {
          if (!ignoreOnFold && partCutlist.cutOnFold)
            macro('mirrorOnFold', { fold: partCutlist.cutOnFold })

          if (grainSpec !== undefined) macro('rotateToGrain', { grainAngle, partGrain: grainSpec })
        }

        const matCutConfig = partCutlist.materials?.[material]
        if (matCutConfig) {
          const activePart = pattern.config.parts[pattern.activePart]

          // hide the part so that all others can inherit from it and be manipulated separately
          part.hide()

          matCutConfig.forEach(({ cut, identical, bias, ignoreOnFold }, i) => {
            const cGrain = partCutlist.grain ? partCutlist.grain + (bias ? 45 : 0) : undefined
            for (let c = 0; c < cut; c++) {
              const dupPartName = `cut.${pattern.activePart}.${material}_${c + i + 1}`

              pattern.addPart({
                name: dupPartName,
                from: activePart,
                draft: ({ part, macro }) => {
                  handleFoldAndGrain(macro, cGrain, ignoreOnFold)

                  if (!identical && c % 2 === 1) macro('flip')

                  return part
                },
              })
            }
          })
        } else {
          const { macro } = part.shorthand()
          handleFoldAndGrain(partCutlist.grain)
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
          nameFormat: () => {
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
