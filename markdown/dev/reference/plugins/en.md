---
title: Plugins
---

FreeSewing uses a modular approach where functionality can be extended with
plugins. Plugins can provide [snippets](/reference/snippets), 
[macros](/reference/macros), [store methods](/reference/store-methods), or 
use any of the [lifecycle hooks](/reference/hooks).

## Using plugins

Plugins can be either
[added to part configurations](/reference/api/part/config/plugins) in designs or
[added to a pattern instance with Pattern.use()](/reference/api/pattern/use).

To import a plugin for use:
```js
import { plugin } from { @freesewing/plugin-gore }
```

<Tip>

For convenience, each plugin is exported as several names exports:

- `plugin`
- `pluginName`
- `namePlugin`

For example, `@freesewing/plugin-gore` has named exports `plugin`, `pluginGore`, and `gorePlugin` that all are the same thing.

</Tip>

## Plugins we maintain

<ReadMore />

## Notes

Refer to [the plugin guide](/guides/plugins) for an in-depth look into
plugins.
