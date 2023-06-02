import React from 'react'
import { getProps } from './utils.mjs'

export const Stack = ({ stackName, stack, settings, components, t }) => {
  const { Group, Part } = components

  return (
    <Group {...getProps(stack)}>
      {[...stack.parts].map((part, key) => (
        <Part {...{ settings, components, t, part, stackName, key }} />
      ))}
    </Group>
  )
}
