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
is to use the part's name as its stack name.

- In a draft with only one set, this will result in each part having its
own stack.
With a default layout, the part will not overlap other parts because it is
the only part drafted within its stack and stacks do not overlap.

- In a draft with multiple sets, this will result in parts of the same name
using the same stack.
This is how we achieve the layered look of parts in sample drafts.

<Related>

Please see [Stacks](/guides/designs/stacks) in the Design Guide for
more information about how stacks can be used.

</Related>
