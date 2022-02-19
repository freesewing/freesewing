---
title: rmd
---

The `rmd` macro removes a dimension.
It is provided by the [dimension plugin](/reference/plugins/dimension/).

To be able to use this plugin, you need to give your dimension an id:

```js
macro('ld', {
  from: points.from,
  to: points.to,
  d: 0,
  id: 'example'
})
```

Now you can remove it as such:

```js
macro('rmd', {
  id: 'example'
})
```

| Property | Default | Type     | Description |
|----------|---------|----------|-------------|
| `id`     |         | `string` | The id of the dimension to remove |
