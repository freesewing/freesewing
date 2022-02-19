---
title: Conditionally loading build-time plugins
order: 30
---

You can choose to load your build-time plugin conditionally based on run-time data.

To do so, you need to create a `condition` method that will determine whether the
plugin will be loaded. This method receives the complete settings object and should
return `true` if the plugin is to be loaded, and `false` if it should not be loaded.

```js
const condition = settings => {
  if (settings) {
    // Remember, settings contains:
    // settings.options => The user's options
    // settings.measurements => The measurements
    return true  // Load the plugin
  }
  else return false // Do not load the plugin
}
```

You pass your plugin and condition method as a third parameter to the Design constructor
with the `plugin` and `condition` keys respectively.

Let's look at a complete example to illustrate this:

```js
import freesewing from '@freesewing/core'
import plugins from '@freesewing/plugin-bundle'
import myConditionalPlugin from '@freesewing/plugin-bust'

const myConditionalPluginCheck = (settings = false) =>
  settings &&
  settings.options &&
  settings.options.draftForHighBust &&
  settings.measurements.highBust
    ? true
    : false

const Pattern = new freesewing.Design(
  config, 
  plugins, 
  { 
    plugin: myConditionalPlugin, 
    condition: myConditionalPluginCheck
  }
)
```

Our condition method will return `true` only if the following conditions are met:

-   A `settings` object is passed into the method
-   `settings.options` is *truthy*
-   `settings.options.draftForHighBust` is *truthy*
-   `settings.options.measurements.highBust` is *truthy*

This is a real-world example from our Teagan pattern. A t-shirt pattern that can be
drafted to the high bust (rather than the full chest circumference) if the user
choses so.

But that feat is handled auto-magically by `plugin-bust` which is a build-time plugin.
So whether to load this plugin or not hinges on the user settings, which is why we
load this plugin conditionally.
