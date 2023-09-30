---
title: Loading plugins
order: 140
---

Plugins can be loaded at build time and added to the design.
Or, they can be added at run time and added to an instantiated pattern.

To load a plugin at build time, it should be added to [the `plugins` key of the part configuration](/reference/api/part/config/plugins).

To load a plugin at run time, it should be loaded with a call to [`Pattern.use()`](/reference/api/pattern/use).

Please refer to the relevant documentation for more details.
