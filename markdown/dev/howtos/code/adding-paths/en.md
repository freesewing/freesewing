---
title: Adding paths
for: developers
icon: pattern
about: Shows you how to add paths to your pattern
---

After using the [shorthand](/howtos/code/shorthand/) call,
`Path` contains the path constructor, while `paths` is a reference to `part.paths`,
which is where you should store your paths.

Things will now *just work* when you do this:

```js
paths.example = new Path()
```

<Tip>

The [Path API docs](/reference/api/path) list all the things you can do with a path object.

</Tip>
