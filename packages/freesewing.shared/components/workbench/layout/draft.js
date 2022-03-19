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
import Svg from '../draft/svg'
import Defs from '../draft/defs'
import Path from '../draft/path'
import Point from '../draft/point'
import Snippet from '../draft/snippet'
import { getProps } from '../draft/utils'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'

const Buttons = ({ transform, flip, rotate, setRotate, resetPart }) => {
  const letter = 'F'
  const style = { style: {fill: 'white', fontSize: 18, fontWeight: 'bold', textAnchor: 'middle'} }

  return (
    <g transform={transform}>
      {rotate
        ? <circle cx="0" cy="0" r="50" className='stroke-2xl muted' />
        : <path d="M -50, 0 l 100,0 M 0,-50 l 0,100" className="stroke-2xl muted" />
      }
      <g className="svg-layout-button" onClick={resetPart}>
        <rect x="-10" y="-10" width="20" height="20" />
        <text x="0" y="10" {...style}>{letter}</text>
      </g>
      <g className="svg-layout-button" onClick={() => flip('y')}>
        <rect x="10" y="-10" width="20" height="20" className="button" />
        <text x="20" y="10" {...style} transform="scale(1,-1)">{letter}</text>
      </g>
      <g className="svg-layout-button" onClick={() => flip('x')}>
        <rect x="-30" y="-10" width="20" height="20" className="button" />
        <text x="20" y="10" {...style} transform="scale(-1,1)">{letter}</text>
      </g>
    </g>
  )
}

const dx = (pointA, pointB) => pointB.x - pointA.x
const dy = (pointA, pointB) => pointB.y - pointA.y
const rad2deg = radians => radians * 57.29577951308232
const angle = (pointA, pointB) => {
  let rad = Math.atan2(-1 * dy(pointA, pointB), dx(pointA, pointB))
  while (rad < 0) rad += 2 * Math.PI

  return rad2deg(rad)
}

const generateTransform = (x, y, rot, flipX, flipY, part) => {
  const anchor = {
    x: 0,
    y: 0
  }
  const center = {
    x: part.topLeft.x + (part.bottomRight.x - part.topLeft.x)/2,
    y: part.topLeft.y + (part.bottomRight.y - part.topLeft.y)/2,
  }
  const dx = part.topLeft.x - center.x
  const dy = part.topLeft.y - center.y
  const transforms = [`translate(${x},${y})`]
  if (flipX) transforms.push(
    `translate(${center.x * -1}, ${center.y * -1})`,
    'scale(-1, 1)',
    `translate(${center.x * -1 + 2 * dx}, ${center.y})`
  )
  if (flipY) transforms.push(
    `translate(${center.x * -1}, ${center.y * -1})`,
    'scale(1, -1)',
    `translate(${center.x}, ${center.y * -1 + 2 * dy})`,
  )
  if (rot) transforms.push(
    `rotate(${rot}, ${center.x - anchor.x}, ${center.y - anchor.y})`
  )

  return transforms.join(' ')
}

const Part = props => {
  const { layout, gist, name, part } = props
  const partLayout= layout.parts[name]

  // Don't just assume this makes sense
  if (typeof layout.parts?.[name]?.move?.x === 'undefined') return null

  // Use a ref for direct DOM manipulation
  const partRef = useRef(null)
  const centerRef = useRef(null)

  // State variable to switch between moving or rotating the part
  const [rotate, setRotate] = useState(false)

  // Initialize drag handler
  useEffect(() => {
    handleDrag(select(partRef.current))
  }, [rotate])

  // These are kept as vars because re-rendering on drag would kill performance
  // Managing the difference between re-render and direct DOM updates makes this
  // whole thing a bit tricky to wrap your head around
  let translateX = partLayout.move.x
  let translateY = partLayout.move.y
  let rotation = partLayout.rotate || 0
  let flipX = partLayout.flipX ? true : false
  let flipY = partLayout.flipY ? true : false
  let partRect

  const center = {
    x: part.topLeft.x + (part.bottomRight.x - part.topLeft.x)/2,
    y: part.topLeft.y + (part.bottomRight.y - part.topLeft.y)/2,
  }
  const handleDrag = drag()
    .subject(function() {
      return { x: translateX, y: translateY }
    })
    .on('start', function(event) {
      partRect = partRef.current.getBoundingClientRect()
    })
    .on('drag', function(event) {
      if (rotate) rotation = angle(partRect, { x:event.x, y: event.y }) * -1
      else {
        translateX = event.x
        translateY = event.y
      }
      const me = select(this);
      me.attr('transform', generateTransform(translateX, translateY, rotation, flipX, flipY, part))
    })
    .on('end', function(event) {
      updateLayout()
    })

  const resetPart = () => {
    rotation = 0
    flipX = 0
    flipY = 0
    updateLayout()
  }
  const toggleDragRotate = () => {
    updateLayout()
    setRotate(!rotate)
  }
  const updateLayout = () => {
    props.updateLayout(name, {
      move: {
        x: translateX,
        y: translateY,
      },
      rotate: rotation,
      flipX,
      flipY
    })
  }

  // Method to flip (mirror) the part along the X or Y axis
  const flip = axis => {
    if (axis === 'x') flipX = !flipX
    else flipY = !flipY
    updateLayout()
  }

  const grid = gist.paperless ? (
    <rect
      x={part.topLeft.x}
      y={part.topLeft.y}
      width={part.width}
      height={part.height}
      className="grid"
      fill={'url(#grid-' + eame + ')'}
    />
  ) : null

  return (
    <g
      {...getProps(part)}
      id={`part-${name}`}
      ref={props.name === 'pages' ? null : partRef}
      onClick={toggleDragRotate}
    >
      {grid}
      {
        props.gist?._state?.xray?.enabled &&
        props.gist?._state?.xray?.reveal?.[name]
        && <XrayPart {...props} />
      }
      {Object.keys(part.paths).map((pathName) => (
        <Path
          key={pathName}
          pathName={pathName}
          path={part.paths[pathName]}
          topLeft={props.part.topLeft}
          bottomRight={props.part.bottomRight}
          {...props}
        />
      ))}
      {Object.keys(props.part.points).map((pointName) => (
        <Point
          key={pointName}
          pointName={pointName}
          point={props.part.points[pointName]}
          topLeft={props.part.topLeft}
          bottomRight={props.part.bottomRight}
          {...props}
        />
      ))}
      {Object.keys(props.part.snippets).map((snippetName) => (
        <Snippet
          key={snippetName}
          snippetName={snippetName}
          snippet={props.part.snippets[snippetName]}
          {...props}
        />
      ))}
      <text x={center.x} y={center.y} ref={centerRef} />
      <rect
        x={part.topLeft.x}
        y={part.topLeft.y}
        width={part.width}
        height={part.height}
        className={`layout-rect ${rotate ? 'rotate' : 'move'}`}
      />
      {props.name !== 'pages' && <Buttons
        transform={`translate(${part.topLeft.x + part.width/2}, ${part.topLeft.y + part.height/2})`}
        flip={flip}
        rotate={rotate}
        setRotate={setRotate}
        resetPart={resetPart}
       />}
    </g>
  )
}

const Draft = props => {
  const { patternProps, gist, updateGist ,app, bgProps={} } = props
  const { layout=false } = gist

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
    newLayout.parts[name] = config
    newLayout.width = layout.width
    newLayout.height = layout.height
    // Pattern topLeft and bottomRight
    let topLeft = { x: 0, y: 0 }
    let bottomRight = { x: 0, y: 0 }
    for (const [pname, part] of Object.entries(patternProps.parts)) {
      // Pages part does not have its topLeft and bottomRight set by core since it's added post-draft
      if (part.topLeft) {
        // Find topLeft (tl) and bottomRight (br) of this part
        const tl = {
          x: part.topLeft.x + newLayout.parts[pname].move.x,
          y: part.topLeft.y + newLayout.parts[pname].move.y
        }
        const br = {
          x: part.bottomRight.x + newLayout.parts[pname].move.x,
          y: part.bottomRight.y + newLayout.parts[pname].move.y
        }
        // Handle rotate
        if (newLayout.parts[pname].rotate) {
          // Angle to the corners
          const center = {
            x: part.topLeft.x + part.width/2,
            y: part.topLeft.x + part.height/2,
          }
          const corners = {
            tl: part.topLeft,
            br: part.bottomRight,
          }
          const angles = {}
          for (const corner in corners) angles[corner] = angle(center, corners[corner])
          const delta = {}
          const rotation = newLayout.parts[pname].rotate
          for (const corner in corners) {
            delta[corner] = {
              x: part.width/2 * (Math.cos(angles[corner]) - Math.cos(angles[corner] + rotation)),
              y: part.height/2 * (Math.sin(angles[corner]) - Math.sin(angles[corner] + rotation))
            }
          }
          if (delta.br.x > 0) br.x += delta.br.x
          if (delta.br.y > 0) br.y += delta.br.y
          if (delta.tl.x < 0) tl.x -= delta.tl.x
          if (delta.tl.y < 0) tl.y -= delta.tl.y
        }
        if (tl.x < topLeft.x) topLeft.x = tl.x
        if (tl.y < topLeft.y) topLeft.y = tl.y
        if (br.x > bottomRight.x) bottomRight.x = br.x
        if (br.y > bottomRight.y) bottomRight.y = br.y
      }
    }
    newLayout.width = bottomRight.x - topLeft.x
    newLayout.height = bottomRight.y - topLeft.y
    updateGist(['layout'], newLayout)
  }


  // We need to make sure the `pages` part is at the bottom of the pile
  // so we can drag-drop all parts on top of it.
  // Bottom in SVG means we need to draw it first
  const partList = Object.keys(patternProps.parts)

  return (
    <div className="my-8 w-11/12 m-auto border-2 border-dotted border-base-content shadow">
      <Svg {...patternProps} embed={gist.embed}>
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

