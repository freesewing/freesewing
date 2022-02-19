---
title: Design 
order: 10
---

The `Design` object in FreeSewing's core library serves a single purpose:
To instantiate new pattern designs.

## Design constructor

```js
function freesewing.Design(
  object config, 
  object|array plugins, // optional
  object|array conditionalPlugins // optional
) 
```

This constructor creates a new pattern design.
It takes the following arguments:

-   `config` : The pattern configuration
-   `plugins` : Either a [plugin object](/guides/plugins/), or an array of plugin objects
-   `conditionalPlugins` : Either a [conditional plugin object](/guides/plugins/conditionally-loading-build-time-plugins/), or an array
    of conditional plugin objects to (conditionally) load in your pattern

```js
import freesewing from "@freesewing/core"
import plugins from "@freesewing/plugin-bundle"
import config from "../config"

// Create new design
const Sorcha = new freesewing.Design(config, plugins)
```

<Tip>

This method is a *super-constructor*. It will return a constructor
method that will become the default export of your design and
should be called to instantiate your pattern.

See [creating a new pattern design](/howtos/code/create-new-design) for a complete example.

</Tip>
