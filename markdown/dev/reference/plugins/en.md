---
title: Plugins
---

FreeSewing uses a modular approach where functionality can be extended with
plugins. Plugins can provide macros, store methods, or use any of the lifecycle
hooks.

## Using plugins

Plugins can be either
[added to part configurations](/reference/api/part/config/plugins) in designs or
[added to a pattern instance with Pattern.use()](/reference/api/pattern/use).

To import a plugin for use:
```js
import { namePlugin } from { @freesewing/plugin-name }
// or
import { pluginName } from { @freesewing/plugin-name }
```

<Tip>

For convenience, each plugin is exported in two name formats:
"plugin\<Name>" and "\<name\>Plugin".
For example, either `pluginBanner` or `bannerPlugin` can be used.

</Tip>

## Plugins we maintain

<ReadMore />

## Notes

Refer to [the plugin guide](/guides/plugins) for an in-depth look into
plugins.
