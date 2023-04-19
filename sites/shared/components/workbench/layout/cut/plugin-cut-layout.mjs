import { addToOnly } from '../plugin-layout-part.mjs'
import { pluginMirror } from '@freesewing/plugin-mirror'
const prefix = 'mirroredOnFold'

// types of path operations
const opTypes = ['to', 'from', 'cp1', 'cp2']
const avoidRegx = new RegExp(`^(cutonfold|grainline|__scalebox|__miniscale|${prefix})`)

/**
 * The plugin to handle all business related to mirroring, rotating, and duplicating parts for the cutting layout
 * @param  {string} material   the material to generate a cutting layout for
 * @param  {number} grainAngle the angle of the material's grain
 * @return {Object}            the plugin
 */
export const cutLayoutPlugin = function (material, grainAngle) {
  return {
    hooks: {
      // after each part
      postPartDraft: (pattern) => {
        // if it's a duplicated cut part, the fabric part, or it's not wanted by the pattern
        if (
          pattern.activePart.startsWith('cut.') ||
          pattern.activePart === 'fabric' ||
          !pattern.__wants(pattern.activePart)
        )
          return

        // get the part that's just been drafted
        const part = pattern.parts[pattern.activeSet][pattern.activePart]
        // get this part's cutlist configuration
        let partCutlist = pattern.setStores[pattern.activeSet].get(['cutlist', pattern.activePart])
        // if there isn't one, we're done here
        if (!partCutlist) return

        // if the cutlist has materials but this isn't one of them
        // or it has no materials but this isn't the main fabric
        if (partCutlist.materials ? !partCutlist.materials[material] : material !== 'fabric') {
          // hide the part because it shouldn't be shown on this fabric
          part.hide()
          return
        }

        // get the cutlist configuration for this material, or default to one
        const matCutConfig =
          partCutlist.materials?.[material] || (material === 'fabric' ? [{ cut: 1 }] : [])

        // get the config of the active part to be inherited by all duplicates
        const activePartConfig = pattern.config.parts[pattern.activePart]

        // hide the active part so that all others can inherit from it and be manipulated separately
        part.hide()

        // for each set of cutting instructions for this material
        matCutConfig.forEach((instruction, i) => {
          // for each piece that should be cut
          for (let c = 0; c < instruction.cut; c++) {
            const dupPartName = `cut.${pattern.activePart}.${material}_${c + i + 1}`

            // make a new part that will follow these cutting instructions
            pattern.addPart({
              name: dupPartName,
              from: activePartConfig,
              draft: ({ part, macro, utils }) => {
                part.attributes.remove('transform')

                // if they shouldn't be identical, flip every other piece
                if (!instruction.identical && c % 2 === 1) {
                  part.attributes.add(
                    'transform',
                    grainAngle === 90 ? 'scale(-1, 1)' : 'scale(1, -1)'
                  )
                }

                macro('handleFoldAndGrain', {
                  partCutlist,
                  instruction,
                })

                // combine the transforms
                const combinedTransform = utils.combineTransforms(
                  part.attributes.getAsArray('transform')
                )
                part.attributes.set('transform', combinedTransform)

                return part
              },
            })

            // add it to the only list if there is one
            addToOnly(pattern, dupPartName)
          }
        })
      },
    },
    macros: {
      ...pluginMirror.macros,
      // handle mirroring on the fold and rotating to sit along the grain or bias
      handleFoldAndGrain: ({ partCutlist, instruction }, { points, macro }) => {
        // get the grain angle for the part for this set of instructions
        const grainSpec = partCutlist.grain
          ? partCutlist.grain + (instruction.bias ? 45 : 0)
          : undefined
        // if the part has cutonfold instructions
        if (partCutlist.cutOnFold) {
          // if we're not meant to igore those instructions, mirror on the fold
          if (!instruction.ignoreOnFold) macro('mirrorOnFold', { fold: partCutlist.cutOnFold })
          // if we are meant to ignore those instructions, but there's a grainline
          else if (grainSpec !== undefined) {
            // replace the cutonfold with a grainline
            macro('grainline', { from: points.cutonfoldVia1, to: points.cutonfoldVia2 })
            macro('cutonfold', false)
          }
        }

        // if there's a grain angle, rotate the part to be along it
        macro('rotateToGrain', { bias: instruction.bias, grainSpec })
      },
      // mirror the part across the line indicated by cutonfold
      mirrorOnFold: ({ fold }, { paths, snippets, macro, points, utils, Point }) => {
        // get all the paths to mirror
        const mirrorPaths = []
        for (const p in paths) {
          // skip ones that are hidden
          if (!paths[p].hidden && !p.match(avoidRegx)) mirrorPaths.push(p)
        }

        // store all the points to mirror
        const mirrorPoints = []
        // store snippets by type so we can re-sprinkle later
        const snippetsByType = {}
        // for each snippet
        let anchorNames = 0
        for (var s in snippets) {
          const snip = snippets[s]
          // don't mirror these ones
          if (['logo'].indexOf(snip.def) > -1) continue

          // get or make an array for this type of snippet
          snippetsByType[snip.def] = snippetsByType[snip.def] || []

          // put the anchor on the list to mirror
          const anchorName = `snippetAnchors_${anchorNames++}`
          points[anchorName] = new Point(snip.anchor.x, snip.anchor.y)
          mirrorPoints.push(anchorName)
          snippetsByType[snip.def].push(`${prefix}${utils.capitalize(anchorName)}`)
        }

        // mirror
        let unnamed = 0
        macro('mirror', {
          paths: mirrorPaths,
          points: mirrorPoints,
          mirror: fold,
          prefix,
        })

        // sprinkle the snippets
        for (var def in snippetsByType) {
          macro('sprinkle', {
            snippet: def,
            on: snippetsByType[def],
          })
        }
      },
      /**
       * rotate the part so that it is oriented properly with regard to the fabric grain
       * if the part should be on the bias, this rotates the part to lie on the bias
       * while keeping the grainline annotation along the grain
       */
      rotateToGrain: ({ bias, grainSpec }, { part, paths, points, Point }) => {
        // the amount to rotate is the difference between this part's grain angle (as drafted) and the fabric's grain angle
        let toRotate = grainSpec === undefined ? 0 : grainAngle + grainSpec
        // don't over rotate
        toRotate = toRotate % 180
        if (toRotate < 0) toRotate += 180
        // if there's no difference, don't rotate
        if (toRotate === 0) return

        if (paths.grainline && bias) {
          const pivot = points.grainlineFrom || new Point(0, 0)
          paths.grainline.ops.forEach((op) => {
            opTypes.forEach((t) => {
              if (op[t]) op[t] = op[t].rotate(45, pivot)
            })
          })
        }

        part.attributes.add('transform', `rotate(${toRotate})`)
      },
    },
  }
}
