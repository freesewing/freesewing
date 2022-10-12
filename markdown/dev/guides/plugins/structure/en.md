---
title: Plugin structure
order: 100
---

A FreeSewing plugin is a plain object with the following structure:

```mjs
Object plugin = {
  String name,
  String version,
  Object hooks,
  Object macros,
  Array store,
}
```

A plugin **must** have the `name` and `version` properties.
The other properties are optional, and they map to the three different functionalities macros can provide:

- `hooks`: Holds an object with lifecycle hooks the plugin wants to hook into
- `macros`: Holds and object with macros the plugin provides
- `store`: Holds and Array with store methods the plugin provides.

Click on the links above for more details on the structure of these properties.
