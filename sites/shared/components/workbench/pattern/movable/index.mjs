import { useRef } from 'react'
import { Stack } from './stack.mjs'
// import { SvgWrapper } from '../../pattern/svg.mjs'
// import { PartInner } from '../../pattern/part.mjs'
import { PanZoomPattern } from 'shared/components/workbench/pan-zoom-pattern.mjs'
import { MovableStack } from './stack.mjs'
import get from 'lodash.get'

export const MovablePattern = ({
  design,
  pattern,
  renderProps,
  patternConfig,
  settings,
  showButtons = true,
  update,
  bgProps = {},
  fitImmovable = false,
  immovable = [],
  layoutPath,
}) => {
  const svgRef = useRef(null)
  if (!renderProps) return null

  // keep a fresh copy of the layout because we might manipulate it without saving to the gist
  let layout =
    renderProps.settings[0].layout === true
      ? {
          ...renderProps.autoLayout,
          width: renderProps.width,
          height: renderProps.height,
        }
      : renderProps.settings[0].layout

  // Helper method to update part layout and re-calculate width * height
  const updateLayout = (name, config, history = true) => {
    // Start creating new layout
    const newLayout = { ...layout }
    newLayout.stacks[name] = config

    // Pattern topLeft and bottomRight
    let topLeft = { x: 0, y: 0 }
    let bottomRight = { x: 0, y: 0 }
    for (const pname in renderProps.stacks) {
      if (immovable.includes(pname) && !fitImmovable) continue
      let partLayout = newLayout.stacks[pname]

      // Pages part does not have its topLeft and bottomRight set by core since it's added post-draft
      if (partLayout?.tl) {
        // set the pattern extremes
        topLeft.x = Math.min(topLeft.x, partLayout.tl.x)
        topLeft.y = Math.min(topLeft.y, partLayout.tl.y)
        bottomRight.x = Math.max(bottomRight.x, partLayout.br.x)
        bottomRight.y = Math.max(bottomRight.y, partLayout.br.y)
      }
    }

    newLayout.width = bottomRight.x - topLeft.x
    newLayout.height = bottomRight.y - topLeft.y
    newLayout.bottomRight = bottomRight
    newLayout.topLeft = topLeft

    if (history) {
      update.ui(layoutPath, newLayout)
    } else {
      // we don't put it in the gist if it shouldn't contribute to history because we need some of the data calculated here for rendering purposes on the initial layout, but we don't want to actually save a layout until the user manipulates it. This is what allows the layout to respond appropriately to settings changes. Once the user has starting playing with the layout, all bets are off
      layout = newLayout
    }
  }

  const viewBox = layout.topLeft
    ? `${layout.topLeft.x} ${layout.topLeft.y} ${layout.width} ${layout.height}`
    : false

  const sortedStacks = {}
  Object.keys(renderProps.stacks)
    .sort((a, b) => {
      const hasA = immovable.includes(a)
      const hasB = immovable.includes(b)
      if (hasA && !hasB) return -1
      if (!hasA && hasB) return 1
      return 0
    })
    .forEach((s) => (sortedStacks[s] = renderProps.stacks[s]))

  const sortedRenderProps = { ...renderProps, stacks: sortedStacks }

  const Stack = ({ stackName, stack, settings, components, t }) => (
    <MovableStack
      {...{
        stackName,
        stack,
        settings,
        components,
        t,
        movable: !immovable.includes(stackName),
        layout: layout.stacks[stackName],
        updateLayout,
        showButtons,
      }}
    />
  )

  return (
    <PanZoomPattern
      {...{
        renderProps: sortedRenderProps,
        components: { Stack },
      }}
      ref={svgRef}
    />
  )
}
