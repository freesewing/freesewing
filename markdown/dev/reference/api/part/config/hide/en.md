---
title: Hiding parts
---

The `hide`, `hideDependencies`, and `hideAll` properties on the
part configuration object control the hiding of parts.

<Tip>A hidden part will not be included in the output when it's rendered</Tip>

## hide

To hide the current part, set the `hide` property to a truthy value:

```js
const part = {
  name: 'example.front',
  hide: true,
  draft: ({ part }) => part
}
```

## hideDependencies

When you set the `hideDependencies` property to a truthy value,
the part that is an inheritance dependency of the current part
(the part listed in `from`) will be hidden.

```js
import exampleBase from './base.mjs'

const part = {
  name: 'example.front',
  from: exampleBbase,
  hideDependencies: true,
  draft: ({ part }) => part
}
```

## hideAll

When you set the `hideAll` property to a truthy value,
both the current part and all parts that are dependencies of the
current part (listed either in `after` or `from`) will be hidden.

```js
import exampleBase from './base.mjs'

const part = {
  name: 'other.base',
  from: exampleBbase,
  hideAll: true,
  draft: ({ part }) => part
}
```

<Note>

This has a different effect than setting both `hide` and `hideDependencies` to
a truthy value.
The difference is that `hideall` also affects parts listed in `after`,
not just the current part and the part listed in `from`.

</Note>

