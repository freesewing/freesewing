//  __SDEFILE__ - This file is a dependency for the stand-alone environment
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { getProps } from './utils.mjs'

export const Stack = ({ stackName, stack, settings, components, t }) => {
  const { Group, Part, Grid } = components

  return (
    <Group {...getProps(stack)}>
      {settings[0].paperless ? <Grid {...{ stack, stackName }} /> : null}
      {[...stack.parts].map((part, key) => (
        <Part {...{ settings, components, t, part, stackName }} key={key} />
      ))}
    </Group>
  )
}
