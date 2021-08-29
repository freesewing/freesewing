---
title: Design 
order: 10
---

```js
function freesewing.Design(
  object config, 
  object|array plugins, // optional
  object|array conditionalPlugins // optional
) 
```

A super-constructor to create a new pattern design. 
It takes the following arguments:

 - `config` : The pattern configuration
 - `plugins` : Either a [plugin object](/guides/plugins/), or an array of plugin objects
 - `conditionalPlugins` : Either a [conditional plugin object](/guides/plugins/conditionally-loading-build-time-plugins/), or an array 
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
method that should be called to instantiate your pattern. 

See [creating a new pattern design](/howtos/code/create-new-design) for an example.

</Tip>
