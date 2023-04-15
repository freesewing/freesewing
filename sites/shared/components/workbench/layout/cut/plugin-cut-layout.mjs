const prefix = 'mirroredOnFold'

// types of path operations
const opTypes = ['to', 'cp1', 'cp2']

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
        // get the part that's just been drafted
        const part = pattern.parts[pattern.activeSet][pattern.activePart]
        // if it's a duplicated cut part, the fabric part, or it's hidden, leave it alone
        if (pattern.activePart.startsWith('cut.') || pattern.activePart === 'fabric' || part.hidden)
          return

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

        // get the cutlist configuration for this material
        const matCutConfig = partCutlist.materials?.[material]
        // if there's specific instructions for this material
        if (matCutConfig) {
          // get the config of the active part to be inherited by all duplicates
          const activePartConfig = pattern.config.parts[pattern.activePart]

          // hide the active part so that all others can inherit from it and be manipulated separately
          part.hide()

          // for each set of cutting instructions for this material
          matCutConfig.forEach(({ cut, identical, bias, ignoreOnFold }, i) => {
            // get the grain angle for the part for this set of instructions
            const cGrain = partCutlist.grain ? partCutlist.grain + (bias ? 45 : 0) : undefined

            // for each piece that should be cut
            for (let c = 0; c < cut; c++) {
              const dupPartName = `cut.${pattern.activePart}.${material}_${c + i + 1}`

              // make a new part that will follow these cutting instructions
              pattern.addPart({
                name: dupPartName,
                from: activePartConfig,
                draft: ({ part, macro }) => {
                  // handle fold and grain for these cutting instructions
                  macro('handleFoldAndGrain', {
                    partCutlist,
                    grainSpec: cGrain,
                    ignoreOnFold,
                    bias,
                  })

                  // if they shouldn't be identical, flip every other piece
                  if (!identical && c % 2 === 1) macro('flip')

                  return part
                },
              })
            }
          })
        }
        // if there wasn't a specific configuration, still make sure to handle fold and grain
        else {
          const { macro } = part.shorthand()
          macro('handleFoldAndGrain', { partCutlist, grainSpec: partCutlist.grain })
        }
      },
    },
    macros: {
      // handle mirroring on the fold and rotating to sit along the grain or bias
      handleFoldAndGrain: ({ partCutlist, grainSpec, ignoreOnFold, bias }, { points, macro }) => {
        // if the part has cutonfold instructions
        if (partCutlist.cutOnFold) {
          // if we're not meant to igore those instructions, mirror on the fold
          if (!ignoreOnFold) macro('mirrorOnFold', { fold: partCutlist.cutOnFold })
          // if we are meant to ignore those instructions, but there's a grainline
          else if (grainSpec !== undefined) {
            // replace the cutonfold with a grainline
            macro('grainline', { from: points.cutonfoldVia1, to: points.cutonfoldVia2 })
            macro('cutonfold', false)
          }
        }

        // if there's a grain angle, rotate the part to be along it
        if (grainSpec !== undefined)
          macro('rotateToGrain', { grainAngle, bias, partGrain: grainSpec })
      },
      // mirror the part across the line indicated by cutonfold
      mirrorOnFold: ({ fold }, { paths, snippets, utils, macro, points }) => {
        // get all the paths to mirror
        const mirrorPaths = []
        for (const p in paths) {
          // skip ones that are hidden
          if (!paths[p].hidden && !p.match(/^(cutonfold|grainline|__scalebox|__miniscale)/))
            mirrorPaths.push(paths[p])
        }

        // store all the points to mirror
        const mirrorPoints = []
        // store snippets by type so we can re-sprinkle later
        const snippetsByType = {}
        // for each snippet
        for (var s in snippets) {
          const snip = snippets[s]
          // don't mirror these ones
          if (['logo'].indexOf(snip.def) > -1) continue

          // get or make an array for this type of snippet
          snippetsByType[snip.def] = snippetsByType[snip.def] || []

          // put the anchor on the list to mirror
          mirrorPoints.push(snip.anchor)

          // then we have to find the name of that point so we can apply the snippet to its mirror
          for (var pName in points) {
            if (points[pName] === snip.anchor) {
              // add the name-to-be of the mirrored anchor to the list for resprinkling
              snippetsByType[snip.def].push(prefix + utils.capitalize(pName))
              break
            }
          }
        }

        // mirror
        let unnamed = 0
        macro('mirror', {
          paths: mirrorPaths,
          points: mirrorPoints,
          mirror: fold,
          prefix,
          nameFormat: () => {
            unnamed++
            return `${prefix}_${unnamed}`
          },
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
      rotateToGrain: ({ partGrain, grainAngle, bias }, { paths, snippets, Point, points }) => {
        // if this part doesn't have a grain recorded, bail
        if (partGrain === undefined) return

        // the amount to rotate is the difference between this part's grain angle (as drafted) and the fabric's grain angle
        let toRotate = grainAngle - partGrain
        // don't over rotate
        if (toRotate >= 180) toRotate -= 180
        else if (toRotate <= -180) toRotate += 180
        // if there's no difference, don't rotate
        if (toRotate === 0) return

        // we'll pivot rotations along the grainline to point, with a fallback
        const pivot = points.grainlineTo || new Point(0, 0)

        // go through all the paths
        for (const pathName in paths) {
          const path = paths[pathName]
          // don't rotate hidden paths
          if (paths[pathName].hidden) continue

          // we want the grainline indicator to always go in the fabric grain direction
          // so if this part is on the bias and this path is the grainline indicator
          // we'll rotate it 45 degrees less than necessary
          let thisRotation = toRotate
          if (pathName === 'grainline' && bias) thisRotation -= 45

          // replace all the points in all the ops of this path with ones that have been rotated
          path.ops.forEach((op) => {
            opTypes.forEach((t) => {
              if (op[t]) op[t] = op[t].rotate(thisRotation, pivot)
            })
          })
        }

        // replace all snippet anchors with ones that have been rotated
        for (const snippetName in snippets) {
          snippets[snippetName].anchor = snippets[snippetName].anchor.rotate(toRotate, pivot)
        }

        // go through all the points
        for (const pointName in points) {
          const point = points[pointName]
          const pointAttrs = point.attributes
          // if it has attributes, we want to rotate it
          if (Object.keys(pointAttrs.list).length) {
            points[pointName] = point.rotate(toRotate, pivot)

            // title points need to be re-rotated around the top title point to avoid text collisions
            if (pointName.match(/_(title|exportDate)(?!Nr)/))
              points[pointName] = points[pointName].rotate(-toRotate, points.__titleNr)

            // put the attributes back onto the new point
            points[pointName].attributes = pointAttrs.clone()
          }
        }
      },
    },
  }
}
