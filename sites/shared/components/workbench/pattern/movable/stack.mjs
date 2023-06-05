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
import { useRef, useState, useEffect } from 'react'
import { generateStackTransform, getTransformedBounds } from '@freesewing/core'
import { Stack } from 'pkgs/react-components/src/pattern/stack.mjs'
import { getProps, angle } from 'pkgs/react-components/src/pattern/utils.mjs'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import { Buttons } from './transform-buttons.mjs'
import get from 'lodash.get'

export const MovableStack = ({
  stackName,
  stack,
  settings,
  components,
  t,
  movable = true,
  layout,
  updateLayout,
  showButtons,
}) => {
  const stackExists = !movable || typeof layout?.move?.x !== 'undefined'

  // Use a ref for direct DOM manipulation
  const stackRef = useRef(null)
  const innerRef = useRef(null)

  // State variable to switch between moving or rotating the part
  const [rotate, setRotate] = useState(false)

  // update the layout on mount
  useEffect(() => {
    // only update if there's a rendered part and it's not the pages or fabric part
    if (stackRef.current && movable) {
      updateStacklayout(false)
    }
  }, [stackRef, layout])

  // Initialize drag handler
  useEffect(() => {
    // don't drag the pages
    if (!movable || !stackExists) return
    handleDrag(select(stackRef.current))
  }, [rotate, stackRef, layout])

  // // Don't just assume this makes sense
  if (!stackExists) return null

  if (!movable) return <Stack {...{ stackName, stack, settings, components, t }} />

  // These are kept as vars because re-rendering on drag would kill performance
  // Managing the difference between re-render and direct DOM updates makes this
  // whole thing a bit tricky to wrap your head around
  let translateX = layout.move.x
  let translateY = layout.move.y
  let stackRotation = layout.rotate || 0
  let rotation = stackRotation
  let flipX = !!layout.flipX
  let flipY = !!layout.flipY

  const center = {
    x: stack.topLeft.x + (stack.bottomRight.x - stack.topLeft.x) / 2,
    y: stack.topLeft.y + (stack.bottomRight.y - stack.topLeft.y) / 2,
  }

  /** get the delta rotation from the start of the drag event to now */
  const getRotation = (event) =>
    angle(center, event.subject) - angle(center, { x: event.x, y: event.y })

  const setTransforms = () => {
    // get the transform attributes
    const transforms = generateStackTransform(translateX, translateY, rotation, flipX, flipY, stack)

    const me = select(stackRef.current)
    me.attr('transform', transforms.join(' '))

    return transforms
  }

  let didDrag = false
  const handleDrag = drag()
    // subject allows us to save data from the start of the event to use throughout event handing
    .subject(function (event) {
      return rotate
        ? // if we're rotating, the subject is the mouse position
          { x: event.x, y: event.y }
        : // if we're moving, the subject is the part's x,y coordinates
          { x: translateX, y: translateY }
    })
    .on('drag', function (event) {
      if (!event.dx && !event.dy) return

      if (rotate) {
        let newRotation = getRotation(event)
        // shift key to snap the rotation
        if (event.sourceEvent.shiftKey) {
          newRotation = Math.ceil(newRotation / 15) * 15
        }
        // reverse the rotation direction one time per flip. if we're flipped both directions, rotation will be positive again
        if (flipX) newRotation *= -1
        if (flipY) newRotation *= -1

        rotation = stackRotation + newRotation
      } else {
        translateX = event.x
        translateY = event.y
      }

      // a drag happened, so we should update the layout when we're done
      didDrag = true
      setTransforms()
    })
    .on('end', function () {
      // save to gist if anything actually changed
      if (didDrag) updateStacklayout()

      didDrag = false
    })

  /** reset the part's transforms */
  const resetPart = () => {
    rotation = 0
    flipX = 0
    flipY = 0
    updateStacklayout()
  }

  /** toggle between dragging and rotating */
  const toggleDragRotate = () => {
    // only respond if the part should be able to drag/rotate
    if (!stackRef.current || !movable) {
      return
    }

    setRotate(!rotate)
  }

  /** update the layout either locally or in the gist */
  const updateStacklayout = (history = true) => {
    /** don't mess with what we don't lay out */
    if (!stackRef.current || !movable) return

    // set the transforms on the stack in order to calculate from the latest position
    const transforms = setTransforms()

    // apply the transforms to the bounding box to get the new extents of the stack
    const { tl, br } = getTransformedBounds(stack, transforms)

    // update it on the draft component
    updateLayout(
      stackName,
      {
        move: {
          x: translateX,
          y: translateY,
        },
        rotate: rotation % 360,
        flipX,
        flipY,
        tl,
        br,
      },
      history
    )
  }

  /** Method to flip (mirror) the part along the X or Y axis */
  const flip = (axis) => {
    if (axis === 'x') flipX = !flipX
    else flipY = !flipY
    updateStacklayout()
  }

  /** method to rotate 90 degrees */
  const rotate90 = (direction = 1) => {
    if (flipX) direction *= -1
    if (flipY) direction *= -1

    rotation += 90 * direction

    updateStacklayout()
  }

  const { Group, Part } = components
  return (
    <Group id={`stack-${stackName}`} {...getProps(stack)} ref={stackRef}>
      <Group id={`stack-inner-${stackName}`} ref={innerRef}>
        {[...stack.parts].map((part, key) => (
          <Part {...{ settings, components, t, part, stackName, key }} />
        ))}
      </Group>
      {movable && (
        <>
          <rect
            x={stack.topLeft.x}
            y={stack.topLeft.y}
            width={stack.width}
            height={stack.height}
            className={`layout-rect ${rotate ? 'rotate' : 'move'}`}
            id={`${stackName}-layout-rect`}
            onClick={toggleDragRotate}
          />
          {showButtons ? (
            <Buttons
              transform={`translate(${center.x}, ${center.y}) rotate(${-rotation}) scale(${
                flipX ? -1 : 1
              },${flipY ? -1 : 1})`}
              flip={flip}
              rotate={rotate}
              setRotate={setRotate}
              resetPart={resetPart}
              rotate90={rotate90}
              partName={stackName}
            />
          ) : null}
        </>
      )}
    </Group>
  )
}
