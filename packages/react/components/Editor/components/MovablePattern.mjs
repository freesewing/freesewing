import React, { useRef, useState, useEffect, useCallback } from 'react'
import { ZoomablePattern } from './ZoomablePattern.mjs'
import { generateStackTransform, getTransformedBounds } from '@freesewing/core'
import { getProps } from '@freesewing/react/components/Pattern'
import { FlipIcon, RotateIcon, ResetIcon } from '@freesewing/react/components/Icon'
import { drag } from 'd3-drag'
import { select } from 'd3-selection'
//import { Buttons } from './transform-buttons.mjs'

export const MovablePattern = ({
  renderProps,
  state,
  update,
  fitImmovable = false,
  immovable = [],
  t,
}) => {
  const svgRef = useRef(null)
  if (!renderProps) return null

  /* keep a fresh copy of the layout because we might manipulate it without
   * update the state
   */
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
      update.ui('layout', newLayout)
    } else {
      /* we don't put it in the gist if it shouldn't contribute to history
       * because we need some of the data calculated here for rendering
       * purposes on the initial layout, but we don't want to actually save a
       * layout until the user manipulates it. This is what allows the layout
       * to respond appropriately to settings changes. Once the user has
       * starting playing with the layout, all bets are off
       */
      layout = newLayout
    }
  }

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
        components,
        t,
        movable: !immovable.includes(stackName),
        layout: layout.stacks[stackName],
        updateLayout,
        settings,
        state,
      }}
    />
  )

  return (
    <div className="" style={{ height: 'calc(100vh - 12rem)' }}>
      <ZoomablePattern
        {...{
          renderProps: sortedRenderProps,
          components: { Stack },
        }}
        ref={svgRef}
      />
    </div>
  )
}

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
 *    We run `getScreenCTM().inverse()` on the svg element to pass to
 *    `matrixTransform` on a `DOMPointReadOnly` for dom to svg space
 *    conversions.
 *
 * 3) Part-level transforms
 *
 *    All parts use their center as the transform-origin to simplify
 *    transforms, especially flipping and rotating.
 *
 * 4) Bounding box
 *
 *    We use `getBoundingClientRect` rather than `getBBox` because it provides
 *    more data and factors in the transforms. We then use our `domToSvg`
 *    function to move the points back into the SVG space.
 */

export const MovableStack = ({
  stackName,
  stack,
  components,
  t,
  movable = true,
  layout,
  updateLayout,
  settings,
  state,
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

  /** update the layout either locally or in the state */
  const updateStacklayout = useCallback(
    (history = true) => {
      /** don't mess with what we don't lay out */
      if (!stackRef.current || !movable) return

      // set the transforms on the stack in order to calculate from the latest position
      const transforms = setTransforms()

      // apply the transforms to the bounding box to get the new extents of the stack
      const { topLeft, bottomRight } = getTransformedBounds(stack, transforms)

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
          tl: topLeft,
          br: bottomRight,
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
  if (!stackExists) {
    return null
  }

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
            iconSize={state.ui?.layout?.iconSize}
          />
        </>
      )}
    </Group>
  )
}

function dx(pointA, pointB) {
  return pointB.x - pointA.x
}
function dy(pointA, pointB) {
  return pointB.y - pointA.y
}
function rad2deg(radians) {
  return radians * 57.29577951308232
}
function angle(pointA, pointB) {
  let rad = Math.atan2(-1 * dy(pointA, pointB), dx(pointA, pointB))
  while (rad < 0) rad += 2 * Math.PI

  return rad2deg(rad)
}

const rectSize = 24

const Button = ({ onClickCb, transform, Icon, children, title = '' }) => {
  const _onClick = (event) => {
    event.stopPropagation()
    onClickCb(event)
  }

  return (
    <g transform={transform} className="svg-layout-button group">
      <title>{title}</title>
      <rect width={rectSize} height={rectSize} className="button" rx="2" ry="2" />
      <Icon className="group-hover:tw-text-primary-content" />
      <rect width={rectSize} height={rectSize} onClick={_onClick} className="tw-fill-transparent" />
    </g>
  )
}

export const ShowButtonsToggle = ({ ui, update }) => {
  const hideButtons = (evt) => {
    update.ui('hideMovableButtons', !evt.target.checked)
  }
  return (
    <label className="label cursor-pointer">
      <span className="label-text text-lg mr-2">{t('showMovableButtons')}</span>
      <input
        type="checkbox"
        className="toggle toggle-primary"
        checked={!ui.hideMovableButtons}
        onChange={hideButtons}
      />
    </label>
  )
}

/** buttons for manipulating the part */
export const Buttons = ({ transform, flip, rotate, resetPart, rotate90, iconSize }) => {
  return (
    <g transform={transform}>
      <g style={{ transform: `scale(${iconSize || 0.5}` }}>
        {rotate ? (
          <circle cx="0" cy="0" r="50" className="stroke-2xl muted" />
        ) : (
          <path d="M -50, 0 l 100,0 M 0,-50 l 0,100" className="stroke-2xl muted" />
        )}
        <rect
          x="-68"
          y="-15"
          width="136"
          height="30"
          rx="3"
          ry="3"
          fill="var(--pattern-interfacing)"
          fill-opacity="0.2"
          stroke="var(--pattern-interfacing)"
          stroke-width="1"
        />
        <Button
          onClickCb={resetPart}
          transform={`translate(${rectSize / -2}, ${rectSize / -2})`}
          Icon={() => <ResetIcon wrapped={0} />}
          title="Reset part orientation"
        />
        <Button
          onClickCb={() => rotate90()}
          transform={`translate(${rectSize * -2.7}, ${rectSize / -2})`}
          Icon={() => <RotateIcon wrapped={0} style={{}} />}
          title="Rotate part clockwise"
        />
        <Button
          onClickCb={() => flip('y')}
          transform={`rotate(90) translate(${rectSize / -2}, ${rectSize * -1.6})`}
          Icon={() => <FlipIcon wrapped={0} />}
          title="Flip part top/bottom"
        />
        <Button
          onClickCb={() => flip('x')}
          transform={`translate(${rectSize * -1.6}, ${rectSize / -2})`}
          Icon={() => <FlipIcon style={{}} wrapped={0} />}
          title="Flip part left/right"
        />
        <Button
          onClickCb={() => rotate90(-1)}
          transform={`translate(${rectSize * 1.7}, ${rectSize / -2})`}
          Icon={() => <RotateIcon transform="scale(-1,1), translate(-24,0)" wrapped={0} />}
          title="Rotate part counter-clockwise"
        />
      </g>
    </g>
  )
}
