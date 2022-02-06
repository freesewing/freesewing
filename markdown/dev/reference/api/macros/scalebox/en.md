---
title: scalebox
---

The `scalebox` macro adds a *scale box* to your pattern. This box allows
users to verify their pattern is printed to scale.

The `scalebox` macro is provided by the [scalebox plugin](/reference/plugins/scalebox).

<Example part="plugin_scalebox">
Example of the scalebox added by this macro
</Example>

```js
macro('scalebox', {
  at: points.anchor
})
```

| Property    | Default | Type                | Description | 
|-------------|---------|---------------------|-------------|
| `at`        |         | [Point](/reference/api/point) | The point to anchor the *scale box* on |
| `lead`      | FreeSewing | String           | The lead text above the title |
| `title`     | *pattern name + version* | String | The title text |
| `text`      | (\*)    | String              | The text below the title |
| `rotate`    | 0       | Number              | Rotation in degrees |

(\*) `freesewingIsMadeByJoostDeCockAndContributors \n withTheFinancialSupportOfOurPatrons`

