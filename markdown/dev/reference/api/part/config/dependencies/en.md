---
title: Part dependencies
---

Dependencies in a part's configuration object are controlled by the `from` and `after` properties.

<Note>

In both cases, you should specify the actual configuration object  of the dependency part,
not merely a string with its name.

</Note>

<Tip>

Dependencies configured on parts do not need to be included in the `parts` property
passed to [the Design constructor](/reference/api/design). FreeSewing core will 
recursively resolve all dependencies and add them to the design for you.

</Tip>

## after

The `after` property holds an array of parts that should be drafted before the current part:

```js
import { exampleBack } from './back.mjs'
import { exampleFront } from './front.mjs'

const part = {
  name: 'example.sleeve',
  after: [ exampleBack, exampleFront ],
  draft: ({ part }) => part
}
```

The effect of the `after` property is that drafting of this part will be deferred until all the parts listed 
in the `after` property are drafted.

<Tip>

If you only have one part for the `after` property, you do not have to specify an array:

```js
import { exampleBack } from './back.mjs'

const part = {
  name: 'example.front',
  after: exampleBack,
  draft: ({ part }) => part
}
```

</Tip>

## from

The `from` property holds a part that should be used as the base for the current part.
In other words, the current part will _extend_ the part listed in `front` and inherit all its content.

```js
import { exampleBack } from './back.mjs'

const part = {
  name: 'example.front',
  from: exampleBack,
  draft: ({ part }) => part
}
```

<Warning>

Unlike `after`, `from` only ever takes one part since you can only extend one part.

</Warning>

