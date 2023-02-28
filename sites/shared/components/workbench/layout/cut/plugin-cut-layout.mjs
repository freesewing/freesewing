const prefix = 'mirroredOnFold'

const redraft = ({ part }) => part
const redraftAndFlip = ({ part, macro }) => {
  macro('flip')
  return part
}

export const cutLayoutPlugin = function (material) {
  return {
    hooks: {
      postPartDraft: (pattern) => {
        if (pattern.activePart.startsWith('cut.') || pattern.activePart === 'fabric') return

        const partCutlist = pattern.setStores[pattern.activeSet].get([
          'cutlist',
          pattern.activePart,
        ])

        if (partCutlist?.materials ? !partCutlist.materials[material] : material !== 'fabric') {
          pattern.parts[pattern.activeSet][pattern.activePart].hide()
          return
        }

        if (partCutlist?.cutOnFold) {
          const { macro } = pattern.parts[pattern.activeSet][pattern.activePart].shorthand()
          macro('mirrorOnFold', { fold: partCutlist.cutOnFold })
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
    },
  }
}
