import { useEffect, useRef} from 'react'
import Svg from '../../draft/svg'
import Defs from '../../draft/defs'
import Part from './part'

const Draft = props => {
  if (!props.gistReady) {return null}
  const { patternProps, gist, updateGist ,app, bgProps={} } = props
  const { layout=false } = gist

  const svgRef = useRef(null);

  useEffect(() => {
    if (!layout) {
      // On the initial draft, core does the layout, so we set the layout to the auto-layout
      // After this, core won't handle layout anymore. It's up to the user from this point onwards
      updateGist(['layout'], {
        ...patternProps.autoLayout,
        width: patternProps.width,
        height: patternProps.height
      }, false)
    }
  }, [layout])

  if (!patternProps || !layout) return null

  // Helper method to update part layout and re-calculate width * height
  const updateLayout = (name, config, history=true) => {
    // Start creating new layout
    const newLayout = {...layout}
    newLayout.parts[name] = config

    // Pattern topLeft and bottomRight
    let topLeft = {x: 0, y: 0}
    let bottomRight = {x: 0, y: 0}
    for (const [pname, part] of Object.entries(patternProps.parts)) {
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
    updateGist(['layout'], newLayout, history)
  }


  // We need to make sure the `pages` part is at the bottom of the pile
  // so we can drag-drop all parts on top of it.
  // Bottom in SVG means we need to draw it first
  const partList = Object.keys(patternProps.parts)

  return (
    <div className="my-8 w-11/12 m-auto border-2 border-dotted border-base-content shadow">
      <Svg {...patternProps}
        embed={gist.embed}
        ref={svgRef}
        viewBox={layout.topLeft ? `${layout.topLeft.x} ${layout.topLeft.y} ${layout.width} ${layout.height}` :  false}
        style={{maxHeight: '100vh'}}
      >
        <Defs {...patternProps} />
        <style>{`:root { --pattern-scale: ${gist.scale || 1}}`}</style>
        <g>
          <rect x="0" y="0" width={patternProps.width} height={patternProps.height} {...bgProps} />
          {[
            partList.filter(name => name === 'pages'),
            partList.filter(name => name !== 'pages'),
          ].map(list => list.map(name => (
            <Part {...{
              key:name,
              partName: name,
              part: patternProps.parts[name],
              layout,
              app,
              gist,
              updateLayout,
            }}/>
          )))}
        </g>
      </Svg>
    </div>
  )
}

export default Draft

