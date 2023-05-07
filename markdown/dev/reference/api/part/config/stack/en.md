---
title: Assigning parts to stacks
---

The optional `stack` property assigns the part to a specific
[Stack](/reference/api/stack).

It holds either a string with the stack name or a function which
returns the stack name:

```js
const part = {
  name: 'example.front',
  stack: 'example.combined',
}
```

```js
const part = {
  name: 'example.back',
  stack: ({options}) => options.stack ? 'example.combined' : 'example.back',
}
```

## Notes

If `stack` is present, the part is assigned to the stack with the
specified name.
If multiple parts are assigned to the same stack, they will overlap
in drafting and printing layouts.
This is because parts in the stack are drafted within the same stack
space.

Otherwise, if the `stack` property is not present, the default behavior
is to assign the part to its own stack.
The part will not overlap other parts in drafting and printing layouts.
This is because it is the only part drafted within its stack and
because stacks do not overlap other stacks.

<Related>

Please see [Stacks](/guides/patterns/stacks) in the Pattern Guide for
more information about how stacks can be used.

</Related>
