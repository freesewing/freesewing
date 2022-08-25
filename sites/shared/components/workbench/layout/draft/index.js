import { useRef} from 'react'
import Svg from '../../draft/svg'
import Defs from '../../draft/defs'
import Part from './part'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

const Draft = props => {
  const { draft, patternProps, gist, updateGist, app, bgProps={}, fitLayoutPart = false, layoutType="printingLayout"} = props

  const svgRef = useRef(null);
  if (!patternProps) return null
  // keep a fresh copy of the layout because we might manipulate it without saving to the gist
  let layout = draft.settings.layout === true ? {
      ...patternProps.autoLayout,
      width: patternProps.width,
      height: patternProps.height
    } : {...draft.settings.layout}



  // Helper method to update part layout and re-calculate width * height
  const updateLayout = (name, config, history=true) => {
    // Start creating new layout
    const newLayout = {...layout}
    newLayout.parts[name] = config

    // Pattern topLeft and bottomRight
    let topLeft = {x: 0, y: 0}
    let bottomRight = {x: 0, y: 0}
    for (const [pname, part] of Object.entries(patternProps.parts)) {
      if (pname == props.layoutPart && !fitLayoutPart) continue
      let partLayout = newLayout.parts[pname];

      // Pages part does not have its topLeft and bottomRight set by core since it's added post-draft
      if (partLayout?.tl) {
        // set the pattern extremes
        topLeft.x = Math.min(topLeft.x, partLayout.tl.x)
        topLeft.y = Math.min(topLeft.y, partLayout.tl.y)
        bottomRight.x = Math.max(bottomRight.x, partLayout.br.x)
        bottomRight.y = Math.max(bottomRight.y, partLayout.br.y);
      }
    }

    newLayout.width = bottomRight.x - topLeft.x
    newLayout.height = bottomRight.y - topLeft.y
    newLayout.bottomRight = bottomRight
    newLayout.topLeft = topLeft

    if (history) {
      updateGist(['layouts', layoutType], newLayout, history)
    } else {
      // we don't put it in the gist if it shouldn't contribute to history because we need some of the data calculated here for rendering purposes on the initial layout, but we don't want to actually save a layout until the user manipulates it. This is what allows the layout to respond appropriately to settings changes. Once the user has starting playing with the layout, all bets are off
      layout = newLayout
    }
  }


  // We need to make sure the `pages` part is at the bottom of the pile
  // so we can drag-drop all parts on top of it.
  // Bottom in SVG means we need to draw it first
  const partList = Object.keys(patternProps.parts)

  return (
    <div className="my-8 w-11/12 m-auto border-2 border-dotted border-base-content shadow">
    <TransformWrapper
      minScale={0.1}
      centerZoomedOut={true}
      wheel={{ activationKeys: ['Control'] }}
    >
      <TransformComponent>
      <Svg {...patternProps}
        embed={gist.embed}
        ref={svgRef}
        viewBox={layout.topLeft ? `${layout.topLeft.x} ${layout.topLeft.y} ${layout.width} ${layout.height}` :  false}
        style={{height: '90vh'}}
      >
        <Defs {...patternProps} />
        <style>{`:root { --pattern-scale: ${gist.scale || 1}}`}</style>
        <g>
          <rect x="0" y="0" width={layout.width} height={layout.height} {...bgProps} />
          {[
            partList.filter(name => name === props.layoutPart),
            partList.filter(name => name !== props.layoutPart),
          ].map(list => list.map(name => (
            <Part {...{
              key:name,
              partName: name,
              part: patternProps.parts[name],
              layout,
              app,
              gist,
              updateLayout,
              isLayoutPart: name === props.layoutPart
            }}/>
          )))}
        </g>
      </Svg>
      </TransformComponent>
    </TransformWrapper>
    </div>
  )
}

export default Draft

