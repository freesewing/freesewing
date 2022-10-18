---
title: Hide or remove paths from an inherited part
---

To hide paths from an inherited part, iterate over the `paths` object
and call `Path.hide()` on all entries:

```mjs
for (const i in paths) paths[i].hide()
```

To outright remove the paths all together, delete them:

```mjs
for (const i in paths) delete paths[i]
```

<Warning>
Do __not__ replace the `path` object:

```mjs
paths = {}
```

as the `paths` object is more than a pojo (plain old javascript object)
</Warning>

<Tip>
You can use the same strategy for hiding or removing points or snippets.
</Tip>
