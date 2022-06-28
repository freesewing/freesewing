import Path from '../../draft/path'
import Point from '../../draft/point'
import Snippet from '../../draft/snippet'
import {PartInner} from '../../draft/part'
import { getProps, angle } from '../../draft/utils'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import { useRef, useState, useEffect} from 'react'

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

const generateTransform = (x, y, rot, flipX, flipY, part) => {
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
    `rotate(${rot}, ${center.x}, ${center.y})`
  )

  return transforms.join(' ')
}

const Part = props => {
  const { layout, gist, name, part} = props

  const partLayout = layout.parts[name]

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
  }, [rotate, layout])

  // These are kept as vars because re-rendering on drag would kill performance
  // Managing the difference between re-render and direct DOM updates makes this
  // whole thing a bit tricky to wrap your head around
  let translateX = partLayout.move.x
  let translateY = partLayout.move.y
  let partRotation = partLayout.rotate || 0;
  let rotation = partRotation;
  let flipX = partLayout.flipX ? true : false
  let flipY = partLayout.flipY ? true : false
  let partRect

  const center = {
    x: part.topLeft.x + (part.bottomRight.x - part.topLeft.x)/2,
    y: part.topLeft.y + (part.bottomRight.y - part.topLeft.y)/2,
  }

  const getRotation = (event) => angle(center, event.subject) - angle(center, { x:event.x, y: event.y });

  const handleDrag = drag()
    .subject(function(event) {
      return rotate ? { x: event.x, y: event.y } : {x: translateX, y: translateY}
    })
    .on('start', function(event) {
      partRect = partRef.current.getBoundingClientRect()
    })
    .on('drag', function(event) {
      if (rotate) {
        let newRotation = getRotation(event);
        if (flipX) newRotation *= -1
        if (flipY) newRotation *= -1
        rotation = partRotation + newRotation
      }
      else {
        translateX = event.x
        translateY = event.y
      }
      const me = select(this);
      me.attr('transform', generateTransform(translateX, translateY, rotation, flipX, flipY, part));
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

  return (
    <g
      {...getProps(part)}
      id={`part-${name}`}
      ref={props.name === 'pages' ? null : partRef}
      onClick={toggleDragRotate}
    >
      {PartInner(props)}
      {props.name !== 'pages' && <>
      <text x={center.x} y={center.y} ref={centerRef} />
      <rect
        x={part.topLeft.x}
        y={part.topLeft.y}
        width={part.width}
        height={part.height}
        className={`layout-rect ${rotate ? 'rotate' : 'move'}`}
      />
      <Buttons
        transform={`translate(${part.topLeft.x + part.width/2}, ${part.topLeft.y + part.height/2})`}
        flip={flip}
        rotate={rotate}
        setRotate={setRotate}
        resetPart={resetPart}
       />
      </>}
    </g>
  )
}

export default Part
