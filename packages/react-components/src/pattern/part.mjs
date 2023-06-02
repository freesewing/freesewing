import React, { forwardRef } from 'react'
import { getId, getProps } from './utils.mjs'

export const PartInner = forwardRef(
  ({ stackName, partName, part, settings, components, t }, ref) => {
    const { Group, Grid, Path, Point, Snippet } = components

    return (
      <Group ref={ref} id={getId({ settings, stackName, partName, name: 'inner' })}>
        {settings.paperless ? <Grid /> : null}
        {Object.keys(part.paths).map((pathName) => (
          <Path
            key={pathName}
            path={part.paths[pathName]}
            topLeft={part.topLeft}
            bottomRight={part.bottomRight}
            units={settings.units}
            {...{ stackName, partName, pathName, part, settings, components, t }}
          />
        ))}
        {Object.keys(part.points).map((pointName) => (
          <Point
            key={pointName}
            point={part.points[pointName]}
            topLeft={part.topLeft}
            bottomRight={part.bottomRight}
            {...{ stackName, partName, pointName, part, settings, components, t }}
          />
        ))}
        {Object.keys(part.snippets).map((snippetName) => (
          <Snippet
            key={snippetName}
            snippet={part.snippets[snippetName]}
            {...{ stackName, partName, snippetName, part, settings, components, t }}
          />
        ))}
      </Group>
    )
  }
)

export const Part = ({ stackName, partName, part, settings, components, t }) => {
  const { Group } = components

  return (
    <Group {...getProps(part)} id={getId({ settings, stackName, partName })}>
      <PartInner {...{ stackName, partName, part, settings, components, t }} />
    </Group>
  )
}
