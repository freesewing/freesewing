import React, { forwardRef } from 'react'
import { defaultComponents as patternComponents } from '@freesewing/react/components/Pattern'
import { PointXray } from './point.mjs'
import { PathXray } from './path.mjs'

/*
 * Allow people to override these components
 */
const defaultComponents = {
  Point: PointXray,
  Path: PathXray,
}

export const Xray = forwardRef((props, ref) => {
  if (!props.renderProps) return null

  // desctructure props
  const {
    renderProps = false,
    t = (string) => string,
    children = false,
    className = 'freesewing pattern',
    components = {},
    drillProps = {},
  } = props

  // Merge pattern, default, and custom components
  const mergedComponents = {
    ...patternComponents,
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
                drillProps={drillProps}
              />
            ))}
      </Group>
    </Svg>
  )
})
