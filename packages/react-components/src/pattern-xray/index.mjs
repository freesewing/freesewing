// eslint-disable-next-line no-unused-vars
import React, { forwardRef } from 'react'
import { defaultPatternComponents } from '../pattern/index.mjs'
// Components that can be swizzled
import { PointXray } from './point.mjs'
import { PathXray } from './path.mjs'
/*
 * Allow people to swizzle these components
 */
export const defaultPatternXrayComponents = {
  ...defaultPatternComponents,
  Point: PointXray,
  Path: PathXray,
}

export const PatternXray = forwardRef(
  (
    {
      renderProps = false,
      t = (string) => string,
      components = {},
      children = false,
      className = 'freesewing pattern',
    },
    ref
  ) => {
    if (!renderProps) return null

    // Merge default and swizzled components
    components = {
      ...defaultPatternXrayComponents,
      ...components,
    }

    const { Svg, Defs, Stack, Group } = components

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
                  components={components}
                  t={t}
                />
              ))}
        </Group>
      </Svg>
    )
  }
)

PatternXray.displayName = 'PatternXray'
