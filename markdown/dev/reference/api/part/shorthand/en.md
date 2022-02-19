---
title: Part.shorthand()
---

A part's `shorthand()` method provides easy access to a number of
internal objects and properties. It does so be returning an object
that contains all you need to draft your pattern parts. It is
typically combined with object destructuring to pull out those
properties you need.

As the name implies, this method can save you a bunch of typing, and keep your
code concise. We highly recommend you use it.

## Part.shorthand() signature

```js
object Part.shorthand();
```

The `Part.shorthand()` method returns a plain object with the following properties:

| Property | Description |
| --------:| ----------- |
| `config` | The pattern configuration |
| `complete` | Holds `pattern.settings.complete` |
| `events` | An object holding the raised events (see [Part.raise](/reference/api/part/raise/)) |
| `final` | `true` is this is a full draft, or `false` if this is a sample. |
| `macro` | The macro runner. See [the macros documentation](/reference/macros/) |
| `measurements` | Holds `pattern.settings.measurements` |
| `paperless` | Holds `pattern.settings.paperless` |
| `Path` | The [Path constructor](/reference/api/path) |
| `paths` | Holds `part.paths` |
| `Point` | The [Point constructor](/reference/api/point) |
| `points` | Holds `part.points` |
| `scale` | Holds `pattern.settings.scale` |
| `Snippet` | The [Snippet constructor](/reference/api/snippet) |
| `snippets` | Holds `part.snippets` |
| `options` | Holds `pattern.settings.options` |
| `raise` | Holds [Part.raise](/reference/api/part/raise/) thus giving you access to the various raise methods |
| `sa` | Holds `pattern.settings.sa` |
| `store` | Holds `pattern.store`, a [Store](/reference/api/store) instance that is shared across parts |
| `utils` | A [Utils](/reference/api/utils) instance with utility methods |
| `units` | A context-aware version of `utils.units` |

## Part.shorthand() example

```js
// You could write this:
part.points.from = new part.Point(
  pattern.measurements.chest / 2, 
  pattern.options.armholeDepth
)

part.points.to = new part.Point(
  part.points.from.x + pattern.settings.sa, 
  part.points.from.y
)

part.paths.example = new part.Path()
  .move(parts.points.from)
  .line(parts.points.to)

// Or use shorthand:  
const { Point, points, measurements, options, sa } = part.shorthand()

points.from = new Point(
  measurements.chest / 2, 
  options.armholeDepth
)

points.to = new part.Point(
  points.from.x + sa, 
  points.from.y
)

paths.example = new Path()
  .move(points.from)
  .line(points.to)
```

<Tip>

As you can see in the example above, you can/should load only
the shorthand you need by using object destructuring.

</Tip>
