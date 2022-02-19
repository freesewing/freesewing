---
title: Adding pattern parts
for: developers
about: Shows you how to add new parts to your pattern
---

Since the patterns parts are listed
in [the configuration file](/reference/config/), freesewing knows about
all the parts that belong to your pattern.

It expects that each pattern has its own draft method, that is called `draft`
followed by the capitalized name of the pattern part.

For example, if our pattern `Sorcha` has a part called `back`, you should
have a `draftBack` method. It's good practice to keep each part in its own
file, so create a file called `back.js`. Inside, you export your method
to draft this part:

```js
export default part => {
  // Your part code here

  return part
}
```

Then, in your `index.js` file, you import this file, and attach the
method to your pattern's prototype:

```js
import freesewing from "freesewing"
import plugins from "@freesewing/plugin-bundle"
import config from "../config"
// Parts
import draftBack from "./back"

// Create new design
const Sorcha = new freesewing.Design(config, plugins)

// Attach to pattern prototype
Sorcha.prototype.draftBack = part => draftBack(part)
```
