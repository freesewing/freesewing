---
title: unflag.error()
---

This removes a specific piece of information flagged at the `error` level.

Info that is flagged is stored in the store under `plugins.plugin-annotations.flags.error`.
When doing so, you can pass an `id` or -- if no `id` is used, the `title` field will be used as the `id`.
This methods allows you to remove this flagged info by passing said `id` (or `title`).

## Signature

```js
undefined Store.unflag.error(string id)
```

Since these methods are not part of FreeSewing's core API, what you pass to this method does depend on your own implementation.

For a more detailed example of how we use this, see [flag.info()](/reference/store-methods/flag.info).
