---
title: Part plugins
---

The `plugins` property on the part configuration object 
list the plugins that are used in/required by the part:

```js
import { pluginBundle } from '@freesewing/plugin-bundle'
import { pluginBust } from '@freesewing/plugin-bust'

const part = {
  name: 'example.front',
  plugins: [ pluginBundle, pluginBust ],
  draft: ({ part }) => part
}
```
<Tip>

You should only list the plugins that required by the part itself, 
not those required by its dependencies

</Tip>

## Passing data to a plugin

Some plugins require you to pass data to the plugin.
For these, pass an `[plugin, data]` array:

```js
import { pluginBundle } from '@freesewing/plugin-bundle'
import { myDataPlugin } from 'myDataPlugin'

const myData = {
  some: 'data'
}

const part = {
  name: 'example.front',
  plugins: [ pluginBundle, [ myDataPlugin, data ] ],
  draft: ({ part }) => part
}
```

## Conditional plugins

A conditional plugin is loaded conditionally. It should be provided
as an object with the following structure:

```js
import myPlugin from './my-plugin.mjs'

const plugin = {
  plugin,
  condition,
}
```

Where `plugin` is the plugin itself, and `condition` is the 
method to determing whether or not to load it.

<Related>

Refer to [the plugin guide](/guides/plugins) to learn
about conditional plugins

</Related>
