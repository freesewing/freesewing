import React, { forwardRef } from 'react'
import { Svg as DefaultSvg } from './svg.mjs'
import { Defs as DefaultDefs } from './defs.mjs'
import { Group as DefaultGroup } from './group.mjs'
import { Stack as DefaultStack } from './stack.mjs'
import { Part as DefaultPart } from './part.mjs'
import { Point as DefaultPoint } from './point.mjs'
import { Snippet as DefaultSnippet } from './snippet.mjs'
import { Path as DefaultPath } from './path.mjs'
import { Grid as DefaultGrid } from './grid.mjs'
import { Text as DefaultText, TextOnPath as DefaultTextOnPath } from './text.mjs'
import { Circle as DefaultCircle } from './circle.mjs'
import { getId, getProps, withinPartBounds, translateStrings } from './utils.mjs'

/*
 * Allow people to override these components
 */
const defaultComponents = {
  Svg: DefaultSvg,
  Defs: DefaultDefs,
  Group: DefaultGroup,
  Stack: DefaultStack,
  Part: DefaultPart,
  Point: DefaultPoint,
  Path: DefaultPath,
  Snippet: DefaultSnippet,
  Grid: DefaultGrid,
  Text: DefaultText,
  TextOnPath: DefaultTextOnPath,
  Circle: DefaultCircle,
}

/*
 * The pattern component
 * FIXME: document props
 */
const Pattern = forwardRef((props, ref) => {
  if (!props.renderProps) return null

  // Destructure props
  const {
    renderProps = false,
    t = (string) => string,
    children = false,
    className = 'freesewing pattern',
    components = {},
  } = props

  // Merge default and swizzled components
  const mergedComponents = {
    ...defaultComponents,
    ...components,
  }

  const { Svg, Defs, Stack, Group } = mergedComponents

  const optionalProps = {}
  if (className) optionalProps.className = className

  return (
    <Svg
      viewBox={`0 0 ${renderProps.width} ${renderProps.height}`}
      embed={renderProps.settings.embed}
      {...renderProps}
      {...optionalProps}
      ref={ref}
    >
      <Defs {...renderProps} />
      <style>{`:root { --pattern-scale: ${renderProps.settings.scale || 1}} ${
        renderProps.svg.style
      }`}</style>
      <Group>
        {children
          ? children
          : Object.keys(renderProps.stacks).map((stackName) => (
              <Stack
                key={stackName}
                stackName={stackName}
                stack={renderProps.stacks[stackName]}
                settings={renderProps.settings}
                components={mergedComponents}
                t={t}
              />
            ))}
      </Group>
    </Svg>
  )
})

export {
  // utils
  getId,
  getProps,
  withinPartBounds,
  translateStrings,
  // default components
  defaultComponents,
  // The Pattern component itself
  Pattern,
}
