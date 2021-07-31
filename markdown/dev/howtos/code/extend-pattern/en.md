---
title: Create a new design based on an existing design
for: developers
about: Shows how to create a variation of a pre-existing design
---

<Note>

##### See this example in our source code

 - [packages/aaron/config/index.js](https://github.com/freesewing/freesewing/blob/72f34101792bda4d8e553c3479daa63cb461f3c5/packages/aaron/config/index.js#L34)
 - [packages/aaron/src/index.js](https://github.com/freesewing/freesewing/blob/72f34101792bda4d8e553c3479daa63cb461f3c5/packages/aaron/src/index.js#L2)
 - [packages/carlita/src/index.js](https://github.com/freesewing/freesewing/blob/8474477911daed3c383700ab29c9565883f16d66/packages/carlita/src/index.js#L25)

</Note>

The example below is from Aaron, which is based on Brian.

Brian has a part called `base` that is hidden by default.
We will use this part as a dependency, and also hide it.

This is what it looks like in the Aaron config file:

```js
  dependencies: {
    front: 'base',
    back: 'front'
  },
  inject: {
    front: 'base',
    back: 'front'
  },
  hide: ['base'],
```

And here is the code:

```js
import freesewing from '@freesewing/core'
import Brian from '@freesewing/brian'
import plugins from '@freesewing/plugin-bundle'
import config from '../config'
// Parts
import draftBack from './back'
import draftFront from './front'

// Create design
const Pattern = new freesewing.Design(config, plugins)

// Attach draft methods to prototype
Pattern.prototype.draftBase = function(part) {
  // Getting the base part from Brian
  return new Brian(this.settings).draftBase(part)
}
Pattern.prototype.draftFront = part => draftFront(part)
Pattern.prototype.draftBack = part => draftBack(part)

export default Pattern
```

If you have a lot of parts to inherit, you can create a loop like in this
example from Carlita:

```js
// Attach draft methods from Carlton to prototype
for (let m of [
  'draftBack',
  'draftTail',
  'draftTopSleeve',
  'draftUnderSleeve',
  'draftBelt',
  'draftCollarStand',
  'draftCollar',
  'draftCuffFacing',
  'draftPocket',
  'draftPocketFlap',
  'draftPocketLining',
  'draftChestPocketWelt',
  'draftChestPocketBag',
  'draftInnerPocketWelt',
  'draftInnerPocketBag',
  'draftInnerPocketTab'
]) {
  Pattern.prototype[m] = function(part) {
    return new Carlton(this.settings)[m](part)
  }
}
```
