---
title: Stack
---

A Stack object represents a collection of parts within a pattern.
Stacks are used when laying out the pattern.

<Related>

See [Stacks](/guides/designs/stacks)
for information about how stacks are used in a pattern.

</Related>

## Signature

```js
Stack new Stack(String name)
```

The stack constructor takes a single argument, a String containing the name
of the stack.

## Properties

Stack objects come with the following properties:

- `attributes` : An [Attributes](/reference/api/attributes) instance holding the stack's attributes
- `parts` : A set of parts in the stack
- `name` : The name of the stack
- `topleft` : A [Point](/reference/api/point) that is the top left of the stack's bounding box
- `bottomRight` : A [Point](/reference/api/point) that is the bottom right of the stack's bounding box
- `width` : The width of the stack in mm
- `height` : The height of the stack in mm
- `anchor` : A [Point](/reference/api/point) that is used as the anchor to align parts in the stack


## Example

<Example caption="Example of the Stack constructor">
```js
import { Stack } from '@freesewing/core'

const myStack = new Stack('mystack')
```
</Example>

## Methods

A Stack object exposes the following methods:

<ReadMore list />
