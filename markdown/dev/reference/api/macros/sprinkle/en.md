---
title: sprinkle
---

The `sprinkle` macro facilitates adding snippets to your pattern in bulk.\
It is by the [sprinkle plugin](/reference/plugins/sprinkle).

<Example part="plugin_sprinkle">
Example of button snippets sprinkled on a pattern by this macro
</Example>

```js
macro('sprinkle', {
  snippet: 'button',
  on: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
})
```

| Property    | Default | Type             | Description |
|------------:|---------|------------------|-------------|
| `snippet`   |         | String           | Name of the snippet to sprinkle |
| `on`        | `[]`    | Array of strings | An array with **the names** of points to add the snippet on |
| `scale`     | 1       | number           | Scale for the individual snippets |
| `rotate`    | 0       | number           | Rotation for the individual snippets |
