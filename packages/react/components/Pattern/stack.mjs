import React from 'react'
import { getProps } from './utils.mjs'

export const Stack = ({ stackName, stack, settings, components, strings }) => {
  const { Group, Part, Grid } = components

  return (
    <Group {...getProps(stack)}>
      {settings[0].paperless ? <Grid {...{ stack, stackName }} /> : null}
      {[...stack.parts].map((part, key) => (
        <Part {...{ settings, components, part, stackName, strings }} key={key} />
      ))}
    </Group>
  )
}
