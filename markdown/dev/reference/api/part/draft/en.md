---
title: "The part's draft method"
---

Each part **must** have a `draft` property that holds a method that will draft the part.
In other words, this method is where the actual work happens. The method's signature
is as follows:

```js
function draft(props)
```

The draft method receives a single parameter, an object which you can _destructure_ to
access the following properties:

| Property | Description |
| --------:|:----------- |
|| **_Content constructors_** |
| `Path`            | A [Path constructor](/reference/api/path) to create new paths |
| `Point`           | A [Point constructor](/reference/api/point) to create new points |
| `Snippet`         | A [Snippet constructor](/reference/api/snippet) to create new snippets |
|| **_Content containers_** |
| `paths`           | Add a Path to your part by adding it to this object |
| `points`          | Add a Points to your part by adding it to this object |
| `snippets`        | Add a Snippet to your part by adding it to this object |
|| **_Access to settings_** |
| `absoluteOptions` | Access to `settings.absoluteOptions` |
| `complete`        | Access to `settings.complete` |
| `measurements`    | Access to `settings.measurements` |
| `options`         | Access to `settings.options` |
| `paperless`       | Access to `settings.paperless` |
| `sa`              | Access to `settings.sa` |
| `scale`           | Access to `settings.scale` |
|| **_Access to utilities_**   |
| `context`         | Allows access to the pattern object and other things higher in the tree |
| `getId`           | See [the getId documentation](/reference/api/part/getid) |
| `hide`            | See [the hide documentation](/reference/api/part/hide) |
| `log`             | See [the logging documentation](/reference/api/store/log) |
| `macro`           | See [the macros documentation](/reference/macros/) |
| `setHidden`       | See [the setHidden documentation](/reference/api/part/sethidden) |
| `store`           | See [the store documentation](/reference/api/store) |
| `unhide`          | See [the unhide documentation](/reference/api/part/unhide) |
| `units`           | A version of [`utils.units()`](/reference/api/utils/units) that is preconfigured with the user's chosenunits |
| `utils`           | See [the utils documentation](/reference/api/utils) |
| `Bezier`          | The [bezier-js](https://pomax.github.io/bezierjs/) library's `Bezier` named export |
|| **_Return value_**   |
| `part`            | Your draft method **must** return this |

<Tip>

Please note that there is no `optionalMeasurements` property.
Instead, optional measurements are accessed via the 'measurements'
property.

</Tip>
