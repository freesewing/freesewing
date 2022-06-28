/*
 * This React component is a long way from perfect, but it's a start for
 * handling custom layouts.
 *
 * There are two reasons that (at least in my opinion) implementing this is non-trivial:
 *
 * 1) React re-render vs DOM updates
 *
 *    For performance reasons, we can't re-render with React when the user drags a
 *    pattern part (or rotates it). It would kill performance.
 *    So, we don't re-render with React upon dragging/rotating, but instead manipulate
 *    the DOM directly.
 *
 *    So far so good, but of course we don't want a pattern that's only correctly laid
 *    out in the DOM. We want to updat the pattern gist so that the new layout is stored.
 *    For this, we re-render with React on the end of the drag (or rotate).
 *
 *    Handling this balance between DOM updates and React re-renders is a first contributing
 *    factor to why this component is non-trivial
 *
 * 2) SVG vs DOM coordinates
 *
 *    When we drag or rotate with the mouse, all the events are giving us coordinates of
 *    where the mouse is in the DOM.
 *
 *    The layout uses coordinates from the embedded SVG which are completely different.
 *    So we need to make this translation and that adds complexity.
 *
 * 3) Part-level transforms
 *
 *    It's not just that the DOM coordinates and SVG coordinate system is different, each
 *    part also has it's own transforms applied and because of this behaves as if they have
 *    their own coordinate system.
 *
 *    In other words, a point (0,0) in the part is not the top-left corner of the page.
 *    In the best-case scenario, it's the top-left corner of the part. But even this is
 *    often not the case as parts will have transforms applied to them.
 *
 * 4) Flip along X or Y axis
 *
 *    Parts can be flipped along the X or Y axis to facilitate a custom layout.
 *    This is handled in a transform, so the part's coordinate's don't actually change. They
 *    are flipped late into the rendering process (by the browser displaying the SVG).
 *
 *    Handling this adds yet more mental overhead
 *
 * 5) Bounding box
 *
 *    While moving and rotating parts around is one thing. Recalculating the bounding box
 *    (think auto-cropping the pattern) gets kinda complicated because of the reasons
 *    outlined above.
 *
 *    We are currently handling a lot in the frontend code. It might be more elegant to move
 *    some of this to core. For example, core expects the custom layout to set the widht and height
 *    rather than figuring it out on its own as it does for auto-generated layouts.
 *
 *
 *
 *  Known issues
 *
 *  - Rotating gets a little weird sometimes as the part rotates around it's center in the
 *    SVG coordinate system, but the mouse uses it's own coordinates as the center point that's
 *    used to calculate the angle of the rotation
 *
 *  - Moving parts into the negative space (minus X or Y coordinated) does not extend the bounding box.
 *
 *  - Rotation gets weird when a part is mirrored
 *
 *  - The bounding box update when a part is rotated is not entirely accurate
 *
 *
 *  I've sort of left it at this because I'm starting to wonder if we should perhaps re-think
 *  how custom layouts are supported in the core. And I would like to discuss this with the core team.
 */
import { useEffect, useRef, useState } from 'react'
import Svg from '../../draft/svg'
import Defs from '../../draft/defs'
import { angle } from '../../draft/utils'
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
      // FIXME: Allow use the option to clear the layout again
      updateGist(['layout'], {
        ...patternProps.autoLayout,
        width: patternProps.width,
        height: patternProps.height
      })
    }
  }, [layout])

  if (!patternProps || !layout) return null

  // Helper method to update part layout and re-calculate width * height
  const updateLayout = (name, config) => {
    // Start creating new layout
    const newLayout = {...layout}
    const matrix = svgRef.current.getScreenCTM().inverse();

    // convert topLeft and bottom right from DOM coordinates to svg coordinates
    if (config.tl) {
      config.tl = DOMPointReadOnly.fromPoint(config.tl).matrixTransform(matrix)
      config.br = DOMPointReadOnly.fromPoint(config.br).matrixTransform(matrix);
    }
    newLayout.parts[name] = config

    // Pattern topLeft and bottomRight
    let topLeft = {x: 0, y: 0}
    let bottomRight = {x: 0, y: 0}
    for (const [pname, part] of Object.entries(patternProps.parts)) {
      let partLayout = newLayout.parts[pname];
      // Pages part does not have its topLeft and bottomRight set by core since it's added post-draft
      if (partLayout.tl) {
        // set the pattern extremes
        topLeft.x = Math.min(topLeft.x, partLayout.tl.x)
        topLeft.y = Math.min(topLeft.y, partLayout.tl.y)
        bottomRight.x = Math.max(bottomRight.x, partLayout.br.x)
        bottomRight.y = Math.max(bottomRight.y, partLayout.br.y);
      }
    }

    // move the pages to the top left corner of the viewBox
    // newLayout.parts.pages.move.x = Math.min(0, topLeft.x);
    // newLayout.parts.pages.move.y = Math.min(0, topLeft.y)

    newLayout.width = bottomRight.x - topLeft.x
    newLayout.height = bottomRight.y - topLeft.y
    newLayout.bottomRight = bottomRight
    newLayout.topLeft = topLeft
    console.log(newLayout.topLeft, newLayout.bottomRight);
    updateGist(['layout'], newLayout)
  }


  // We need to make sure the `pages` part is at the bottom of the pile
  // so we can drag-drop all parts on top of it.
  // Bottom in SVG means we need to draw it first
  const partList = Object.keys(patternProps.parts)

  return (
    <div className="my-8 w-11/12 m-auto border-2 border-dotted border-base-content shadow">
      <Svg {...patternProps} embed={gist.embed} ref={svgRef} viewBox={layout.topLeft ? `${layout.topLeft.x} ${layout.topLeft.y} ${layout.bottomRight.x} ${layout.bottomRight.y}` :  false}>
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
              name,
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

