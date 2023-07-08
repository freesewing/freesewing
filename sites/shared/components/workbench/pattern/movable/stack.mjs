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
import { useRef, useState, useEffect, useCallback } from 'react'
import { generateStackTransform, getTransformedBounds } from '@freesewing/core'
import { getProps } from 'pkgs/react-components/src/pattern/utils.mjs'
import { angle } from '../utils.mjs'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'
import { Buttons } from './transform-buttons.mjs'

export const MovableStack = ({
  stackName,
  stack,
  components,
  t,
  movable = true,
  layout,
  updateLayout,
  showButtons,
  settings,
}) => {
  const stackExists = !movable || typeof layout?.move?.x !== 'undefined'

  // Use a ref for direct DOM manipulation
  const stackRef = useRef(null)
  const innerRef = useRef(null)

  // State variable to switch between moving or rotating the part
  const [rotate, setRotate] = useState(false)

  // This is kept as state to avoid re-rendering on drag, which would kill performance
  // It's a bit of an anti-pattern, but we'll directly manipulate the properties instead of updating the state
  // Managing the difference between re-render and direct DOM updates makes this
  // whole thing a bit tricky to wrap your head around
  const stackRotation = layout?.rotate || 0
  const [liveTransforms] = useState({
    translateX: layout?.move.x,
    translateY: layout?.move.y,
    rotation: stackRotation,
    flipX: !!layout?.flipX,
    flipY: !!layout?.flipY,
  })

  const center = stack.topLeft && {
    x: stack.topLeft.x + (stack.bottomRight.x - stack.topLeft.x) / 2,
    y: stack.topLeft.y + (stack.bottomRight.y - stack.topLeft.y) / 2,
  }

  const setTransforms = useCallback(() => {
    // get the transform attributes
    const { translateX, translateY, rotation, flipX, flipY } = liveTransforms
    const transforms = generateStackTransform(translateX, translateY, rotation, flipX, flipY, stack)

    const me = select(stackRef.current)
    me.attr('transform', transforms.join(' '))

    return transforms
  }, [liveTransforms, stackRef, stack])

  /** update the layout either locally or in the gist */
  const updateStacklayout = useCallback(
    (history = true) => {
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
            x: liveTransforms.translateX,
            y: liveTransforms.translateY,
          },
          rotate: liveTransforms.rotation % 360,
          flipX: liveTransforms.flipX,
          flipY: liveTransforms.flipY,
          tl,
          br,
        },
        history
      )
    },
    [stackRef, setTransforms, updateLayout, liveTransforms, movable, stack, stackName]
  )

  // update the layout on mount
  useEffect(() => {
    // only update if there's a rendered part and it's not an imovable part
    if (stackRef.current && movable) {
      updateStacklayout(false)
    }
  }, [stackRef, movable, updateStacklayout])

  /** reset the part's transforms */
  const resetPart = () => {
    liveTransforms.rotation = 0
    liveTransforms.flipX = 0
    liveTransforms.flipY = 0
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

  /** Method to flip (mirror) the part along the X or Y axis */
  const flip = (axis) => {
    if (axis === 'x') liveTransforms.flipX = !liveTransforms.flipX
    else liveTransforms.flipY = !liveTransforms.flipY
    updateStacklayout()
  }

  /** method to rotate 90 degrees */
  const rotate90 = (direction = 1) => {
    if (liveTransforms.flipX) direction *= -1
    if (liveTransforms.flipY) direction *= -1

    liveTransforms.rotation += 90 * direction

    updateStacklayout()
  }

  /** get the delta rotation from the start of the drag event to now */
  const getRotation = (event) =>
    angle(center, event.subject) - angle(center, { x: event.x, y: event.y })

  let didDrag = false
  const handleDrag =
    movable &&
    drag()
      // subject allows us to save data from the start of the event to use throughout event handing
      .subject(function (event) {
        return rotate
          ? // if we're rotating, the subject is the mouse position
            { x: event.x, y: event.y }
          : // if we're moving, the subject is the part's x,y coordinates
            { x: liveTransforms.translateX, y: liveTransforms.translateY }
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
          if (liveTransforms.flipX) newRotation *= -1
          if (liveTransforms.flipY) newRotation *= -1

          liveTransforms.rotation = stackRotation + newRotation
        } else {
          liveTransforms.translateX = event.x
          liveTransforms.translateY = event.y
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

  // Initialize drag handler
  useEffect(() => {
    // don't drag the pages
    if (!movable || !stackExists) return
    handleDrag(select(stackRef.current))
  }, [stackRef, movable, stackExists, handleDrag])

  // // Don't just assume this makes sense
  if (!stackExists) return null

  const { Group, Part } = components
  return (
    <Group id={`stack-${stackName}`} {...getProps(stack)} ref={stackRef}>
      <Group id={`stack-inner-${stackName}`} ref={innerRef}>
        {[...stack.parts].map((part, key) => (
          <Part {...{ components, t, part, stackName, settings }} key={key} />
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
              transform={`translate(${center.x}, ${
                center.y
              }) rotate(${-liveTransforms.rotation}) scale(${liveTransforms.flipX ? -1 : 1},${
                liveTransforms.flipY ? -1 : 1
              })`}
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
