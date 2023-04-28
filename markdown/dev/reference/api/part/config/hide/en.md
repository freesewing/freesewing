---
title: Hiding parts
---

The `hide` option of a part's configuration controls how to hide it and/or its dependencies.

<Tip>A hidden part will not be included in the output when it's rendered</Tip>
<Tip>The `hide` configuration from parts that you include in your design will always override configuration from inherited parts.</Tip>

## Settings

### hide.after

To hide the explicitly included `after` parts, set `hide.after` to a truthy value

```js
import exampleBase from './base.mjs'

const part = {
  name: 'example.front',
  after: [exampleBase],
  // hide `exampleBase`
  hide: {after: true},
  draft: ({ part }) => part
}
```


### hide.always

To hide a specific part that would otherwise not be hidden by other configuration, add its name to the `hide.always` array

```js
import { exampleBase } from './base.mjs'
import { exampleBack } from './back.mjs'
const part = {
  name: 'example.front',
  after: [exampleBase, exampleBack],
  // hide `exampleBack`
  hide: {always: ['example.back']},
  draft: ({ part }) => part
}
```

### hide.from

To hide the explicitly included `from` part, set `hide.from` to a truthy value.

```js
import exampleBase from './base.mjs'

const part = {
  name: 'other.base',
  from: exampleBase,
  // hide exampleBase
  hide: {from: true},
  draft: ({ part }) => part
}
```

### hide.inherited

To hide parts that you have not explicitly included in this part that may be pulled in by the explictly included `from` and `after` parts, set `hide.inherited` to a truthy value.

<Note>This setting will hide any part included as `from` or `after` by your explicitly included `from` part or its dependency chain. It will also hide any part included as `from` by your explicitly included `after` part or its dependency chain. It will not hide the `after` parts of `after` parts</Note>

```js
// the "after" chain
const mainFrontParent = {
  name: 'other.mainFront',
  draft: ({part}) => part
}
const mainFrontBase = {
  name: 'example.mainFrontBase',
  draft: ({part}) => part
}
const mainFront = {
  name: 'example.mainFront',
  after: mainFrontBase,
  from: mainFrontParent,
  draft: ({part}) => part
}

// the "from" chain
const grandParentBase = {
  name: 'other.grandParentBase',
  draft: ({part}) => part
}
const grandParent = {
  name: 'other.grandParent',
  after: grandParentBase
  draft: ({ part }) => part
}
const parent = {
  name: 'other.parent',
  from: grandParent
  draft: ({ part }) => part
}


const mainBack = {
  name: 'example.mainBack',
  from: parent,
  after: mainFront,
  // hide grandParentBase, grandParent, mainFrontParent
  // don't hide parent, mainFront, or mainFrontBase
  hide: { inherited: true },
  draft: ({part}) => part
}

```
<Tip>
<details>
  <summary>Need more clarity?</summary>

  In the above example, the dependency tree for the part `example.mainBack` resolves to the following, with `from` dependencies in **bold** and `after` dependencies *italicized*.


  | Part                          | Dependency Type  | Hidden |
  | :---------- | :---------- | :-----|
  | example.mainBack              | root             | false  |
  | - **other.parent**            | from             | false  |
  | - - **other.grandParent**      | inherited from   | true   |
  | - - - *other.grandParentBase*   | inherited after  | true   |
  | - *example.mainFront*         | after            | false  |
  | - - *example.mainFrontBase*    | after            | false  |
  | - - **other.mainFront**        | inherited from   | true   |

  Dependencies are considered inherited if they have two or more dashes (-) next to them, and are either **bold** themselves, or underneath a **bold** part.
</details>
</Tip>

### hide.never

To __not__ hide a specific part that would otherwise be hidden by other configuration, add its name to the `hide.never` array

```js
import { exampleBase } from './base.mjs'
import { exampleBack } from './back.mjs'
const part = {
  name: 'example.front',
  after: [exampleBase, exampleBack],
  hide: {
    // hide exampleBase and exampleBack
    after: true,
    // override hiding exampleBack so that it is shown
    never: ['example.back']
  },
  draft: ({ part }) => part
}
```

### hide.self

To hide the current part, set `hide.self` to a truthy value:

```js
const part = {
  name: 'example.front',
  // hide `example.front`
  hide: {self: true},
  draft: (({ part }) => part)
}
```

## Presets
We provide two presets for common hiding configurations. For convenience, you can pass a preset to the `hide` configuration as a string like `hide: <preset name>`, or you can use `import { hidePresets } from '@freesewing.core` and pass `hide: hidePresets.<preset name>`

<Tip> If you don't like to remember strings and you're working in development a environment that has code completion, importing the presets from `@freesewing/core` will help you be sure you're definitely using an available preset </Tip>

### HIDE_ALL
For a shortcut to setting all `boolean` hiding options ([`after`](#hideafter), [`from`](#hidefrom), [`inherited`](#hideinherited), and [`self`](#hideself)) to true, use  `HIDE_ALL`
<Note>
This is equivalent to using

```js
{
  self: true,
  after: true,
  from: true,
  inherited: true
}
```
</Note>

To use it as an imported preset:
```js
import { hidePresets } from '@freesewing/core'
import { exampleBase } from './base.mjs'
import { exampleBack } from './back.mjs'

const part = {
  name: 'example.front',
  from: exampleBase
  after: [exampleBack],
  // hide `example.front`, `exmpleBase`, and `exampleBack`
  // as well as any inherited parts
  hide: hidePresets.HIDE_ALL,
  draft: ({ part }) => part
}
```


To use it as a string
```js
import { exampleBase } from './base.mjs'
import { exampleBack } from './back.mjs'

const part = {
  name: 'example.front',
  from: exampleBase,
  after: [exampleBack],
  // hide `example.front`, `exmpleBase`, and `exampleBack`
  // as well as any inherited parts
  hide: 'HIDE_ALL',
  draft: ({ part }) => part
}
```

### HIDE_TREE
For a shortcut to setting [`from: true`](#hidefrom) and [`inherited: true`](#hideinherited), use `HIDE_TREE`

<Note>
This is equivalent to using

```js
{
  from: true,
  inherited: true
}
````
</Note>
<Related>
See [`hide.inherited`](#hideinherited) for a full explanation of how that option works
</Related>

To use it as an imported preset:
```js
import { hidePresets } from '@freesewing/core'
import { exampleBase } from './base.mjs'
import { exampleBack } from './back.mjs'

const part = {
  name: 'example.front',
  from: exampleBase,
  // hide `exmpleBase`, and all inherited parts
  hide: hidePresets.HIDE_TREE,
  draft: ({ part }) => part
}
```


To use it as a string
```js
import { exampleBase } from './base.mjs'
import { exampleBack } from './back.mjs'

const part = {
  name: 'example.front',
  from: exampleBase,
  // hide `exmpleBase`, and all inherited parts
  hide: 'HIDE_TREE',
  draft: ({ part }) => part
}
```
