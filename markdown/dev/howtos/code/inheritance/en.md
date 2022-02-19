---
title: Design inheritance
for: developers
about: Shows how you can use one design as the basis for another
---

If your pattern is based on, or extending, another pattern (some of) your
pattern parts will need to be drafted by the parent pattern.

In such a case, rather than return our own draft method for the part, you
should instantiate the parent pattern, and return its part draft method:

```js
import freesewing from "@freesewing/core";
import Brian from "@freesewing/brian";
import plugins from "@freesewing/plugin-bundle";
import config from "../config";
// Parts
import draftBack from "./back";

// Create new design
const Sorcha = new freesewing.Design(config, plugins);

// Attach our own draft method to the prototype
Sorcha.prototype.draftBack = part => draftBack(part);

// Attach the inherited draft method to the prototype
Sorcha.prototype.draftBase = function(part) {
  // Getting the base part from Brian
  return new Brian(this.settings).draftBase(part);
};
```

<Warning>

Because we're using the `this` keyword here, you cannot use the arrow notation.

</Warning>

## Configuration

The inherited pattern parts will use the configuration of your pattern.
You must take care to make sure that
your pattern has all the options the parent pattern requires.

For example, if you inherit from a pattern that has a `chestEase` option, you will
need to add that option to your own patter, because the inherited parts will depend on it.

## Dependencies

When extending a pattern, you should add it as a peer dependency, rather than a regular dependency.
Doing so will avoid that the parent pattern will get bundled with your own pattern.
