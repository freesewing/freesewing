/*
 * This React component is a long way from perfect, but it's a start for
 * handling custom layouts.
 *
 * There are a few reasons that (at least in my opinion) implementing this is non-trivial:
 *
 * 1) React re-render vs DOM updates
 *
 *    For performance reasons, we can't re-render with React when the user drags a
 *    pattern part (or rotates it). It would kill performance.
 *    So, we don't re-render with React upon dragging/rotating, but instead manipulate
 *    the DOM directly.
 *
 *    So far so good, but of course we don't want a pattern that's only correctly laid
 *    out in the DOM. We want to update the pattern gist so that the new layout is stored.
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
 *
 *    We run `getScreenCTM().inverse()` on the svg element to pass to `matrixTransform` on a `DOMPointReadOnly` for dom to svg space conversions.
 *
 * 3) Part-level transforms
 *
 *    All parts use their center as the transform-origin to simplify transforms, especially flipping and rotating.
 *
 * 4) Bounding box
 *
 *    We use `getBoundingClientRect` rather than `getBBox` because it provides more data and factors in the transforms.
 * We then use our `domToSvg` function to move the points back into the SVG space.
 *
 *
 *  Known issues
 *  - currently none
 *
 *  I've sort of left it at this because I'm starting to wonder if we should perhaps re-think
 *  how custom layouts are supported in the core. And I would like to discuss this with the core team.
 */
import {PartInner} from '../../draft/part'
import { generatePartTransform } from '@freesewing/core'
import { getProps, angle } from '../../draft/utils'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import { useRef, useState, useEffect} from 'react'

/** buttons for manipulating the part */
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

const Part = props => {
  const { layout, part, partName} = props

  const partLayout = layout.parts?.[partName]

  // Don't just assume this makes sense
  if (typeof partLayout?.move?.x === 'undefined') return null

  // Use a ref for direct DOM manipulation
  const partRef = useRef(null)
  const centerRef = useRef(null)

  // State variable to switch between moving or rotating the part
  const [rotate, setRotate] = useState(false)

  // update the layout on mount
  useEffect(() => {
    if (partRef.current) updateLayout(false)
  }, [partRef])

  // Initialize drag handler
  useEffect(() => {
    if (!partRef.current) {return}
    handleDrag(select(partRef.current))
  }, [rotate, layout])

  // These are kept as vars because re-rendering on drag would kill performance
  // Managing the difference between re-render and direct DOM updates makes this
  // whole thing a bit tricky to wrap your head around
  let translateX = partLayout.move.x
  let translateY = partLayout.move.y
  let partRotation = partLayout.rotate || 0;
  let rotation = partRotation;
  let flipX = !!partLayout.flipX
  let flipY = !!partLayout.flipY

  const center = {
    x: part.topLeft.x + (part.bottomRight.x - part.topLeft.x)/2,
    y: part.topLeft.y + (part.bottomRight.y - part.topLeft.y)/2,
  }

  /** get the delta rotation from the start of the drag event to now */
  const getRotation = (event) => angle(center, event.subject) - angle(center, { x:event.x, y: event.y });

  const handleDrag = drag()
    // subject allows us to save data from the start of the event to use throughout event handing
    .subject(function(event) {
      return rotate ?
      // if we're rotating, the subject is the mouse position
      { x: event.x, y: event.y } :
      // if we're moving, the subject is the part's x,y coordinates
      {x: translateX, y: translateY}
    })
    .on('drag', function(event) {
      if (rotate) {
        let newRotation = getRotation(event);
        // reverse the rotation direction one time per flip. if we're flipped both directions, rotation will be positive again
        if (flipX) newRotation *= -1
        if (flipY) newRotation *= -1

        rotation = partRotation + newRotation
      }
      else {
        translateX = event.x
        translateY = event.y
      }

      // get the transform attributes
      const transforms = generatePartTransform(translateX, translateY, rotation, flipX, flipY, part);

      const me = select(this);
      for (var t in transforms) {
        me.attr(t, transforms[t])
      }
    })
    .on('end', function(event) {
      // save to gist
      updateLayout()
    })

  const resetPart = () => {
    rotation = 0
    flipX = 0
    flipY = 0
    updateLayout()
  }
  const toggleDragRotate = () => {
    if (!partRef.current) {return}
    updateLayout()
    setRotate(!rotate)
  }
  const updateLayout = (history=true) => {
    const partRect = partRef.current.getBoundingClientRect();
    const matrix = partRef.current.ownerSVGElement.getScreenCTM().inverse();

    const domToSvg = (point) => DOMPointReadOnly.fromPoint(point).matrixTransform(matrix)

    // include the new top left and bottom right to ease calculating the pattern width and height
    const tl = domToSvg({x: partRect.left, y: partRect.top});
    const br = domToSvg({x: partRect.right, y: partRect.bottom});

    props.updateLayout(partName, {
      move: {
        x: translateX,
        y: translateY,
      },
      rotate: rotation,
      flipX,
      flipY,
      tl,
      br
    }, history)
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
      id={`part-${partName}`}
      ref={partName === 'pages' ? null : partRef}
      onClick={toggleDragRotate}
      transform-origin={`${center.x} ${center.y}`}
    >
      {PartInner(props)}
      {partName !== 'pages' && <>
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
