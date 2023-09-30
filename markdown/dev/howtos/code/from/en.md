---
title: Part inheritance
---

Part inheritance means that rather than start your part from a blank slate, your starting point is another part.
You will _inherit_ all its points, paths, and snippets, hence the name.

<Warning compact>
Do not confuse this with [part dependencies](/howtos/code/after).
</Warning>

Part inheritance is configured with [the `from`
keyword](/reference/api/part/config/dependencies#from). Let's look at an
example:

```js
// highlight-start
import { front as brianFront } from '@freesewing/brian'
// highlight-end

export const front = {
  name: 'example.front',
// highlight-start
  from: brianFront,
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
