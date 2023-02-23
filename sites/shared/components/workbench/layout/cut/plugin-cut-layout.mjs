const prefix = 'mirroredOnFold'

const redraft = ({ part }) => part
export const cutLayoutPlugin = {
  hooks: {
    postPartDraft: (pattern) => {
      const partCutlist = pattern.setStores[pattern.activeSet].get(['cutlist', pattern.activePart])
      if (!partCutlist) return

      const { macro } = pattern.parts[pattern.activeSet][pattern.activePart].shorthand()
      if (partCutlist.cutOnFold) macro('mirrorOnFold', { fold: partCutlist.cutOnFold })

      if (partCutlist.materials) {
        for (const material in partCutlist.materials) {
          for (var i = 1; i < partCutlist.materials[material]; i++) {
            pattern.addPart({
              name: `${pattern.activePart}_${material}_${i}`,
              from: pattern.activePart,
              draft: redraft,
            })
          }
        }
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
