---
title: Hiding parts
linktitle: hide, hideDependencies, hideAll
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
all parts that are dependencies of the current part (listed either
in `after` or `from`) will be hidden.

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

This has the same effect as setting both `hide` and `hideDependencies` to
a truthy value.

</Note>

