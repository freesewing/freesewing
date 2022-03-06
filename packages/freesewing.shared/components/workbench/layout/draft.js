import { useEffect, useRef, useState } from 'react'
import Svg from '../draft/svg'
import Defs from '../draft/defs'
import Path from '../draft/path'
import Point from '../draft/point'
import Snippet from '../draft/snippet'
import { getProps } from '../draft/utils'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import { event } from 'd3-dispatch'

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
  if (flipX) transforms.push(
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
  console.log('rendering draft')
  const { layout, gist, updateGist, name, part } = props
  const partLayout= layout.parts[name]

  // Don't just assume this makes sense
  if (typeof layout?.parts?.[name]?.move?.x === 'undefined') return null

  // Use a ref for direct DOM manipulation
  const partRef = useRef(null)
  const centerRef = useRef(null)

  // State variable to switch between moving or rotating the part
  const [rotate, setRotate] = useState(false)

  // Initialize drag handler
  useEffect(() => {
    handleDrag(select(partRef.current))
  }, [rotate])

  // These are kepts as vars because re-rendering on drag would kill performance
  // Managing the difference between re-render and direct DOM updates makes this
  // whole thing a bit tricky to wrap your head around
  let translateX = partLayout.move.x
  let translateY = partLayout.move.y
  let rotation = partLayout.rotate || 0
  let flipX = partLayout.flipX ? true : false
  let flipY = partLayout.flipY ? true : false
  let rotStart = { x: 0, y: 0 }

  const center = {
    x: part.topLeft.x + (part.bottomRight.x - part.topLeft.x)/2,
    y: part.topLeft.y + (part.bottomRight.y - part.topLeft.y)/2,
  }

  const handleDrag = drag()
    .subject(function() {
      const me = select(this);
      return { x: translateX, y: translateY }
    })
    .on('start', function(event) {
      rotStart = { x: event.x, y: event.y }
    })
    .on('drag', function(event) {
      if (rotate) {
        rotation = angle(rotStart, { x:event.x, y: event.y }) * -1
      } else {
        translateX = event.x
        translateY = event.y
      }
      const me = select(this);
      me.attr('transform', generateTransform(translateX, translateY, rotation, flipX, flipY, part))
    })
    .on('end', updateLayout)

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
    console.log('updating layout')
    props.updateGist(
      ['layout', 'parts', name],
      {
        move: {
          x: translateX,
          y: translateY,
        },
        rotate: rotation,
        flipX,
        flipY
      }
    )
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
  const { patternProps, gist, app, updateGist, unsetGist, bgProps={} } = props
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
              updateGist,
              unsetGist,
            }}/>
          )))}
        </g>
      </Svg>
    </div>
  )
}

export default Draft

