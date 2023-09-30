---
title: Part dependencies
---

Part dependencies control the order in which parts are drafted. FreeSewing will
make sure to draft all of a part's dependencies before drafting the part
itself.

<Warning compact>
Even though inherited parts are automatically included in a part's dependencies,
do not confuse part dependencies with [part inheritance](/howtos/code/from).

</Warning>

Part dependencies are configured with [the `after`
keyword](/reference/api/part/config/dependencies#after). Let's look at an
example:

```js
// highlight-start
import { otherPart } from './otherpart.mjs'
// highlight-end

export const myPart = {
  name: 'example.myPart',
// highlight-start
  after: otherPart,
// highlight-end
  draft: function ({ part }) {
    // Design part here
    return part
  }
}
```

<Tip>
Refer to [the part documentation on
dependencies](/reference/api/part/config/dependencies) for all details.
</Tip>
