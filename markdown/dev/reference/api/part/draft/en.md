---
title: "Parts: The `draft()` method"
---

A `Part` in FreeSewing holds all data, logic, and configuration of a Design.
Parts truly are the building blocks of FreeSewing as they not only provide
the configurarion, but also a `draft()` method that does the actual work
of drafting a parametric design.

## Part structure

A part is an object with the following properties:

| Property | Description | 
| -------- | ----------- |
| `draft`  | The method that will draft the part (__required__) |
| `measurements` | An array of required measurements |
| `optionalMeasurements` | An array of optional measurements |
| `options` | An object of options |
| `plugins` | A plugin or array of plugins |

## A part's `draft()` method

Each part **must** have a `draft` property that holds a method that will draft the part.
The method's signature is as follows:

```js
function draft(props)
```

The method received a single parameter, an object which you can _destructure_ to 
access the following properties:

- [Content constructors](#content-constructors)
  - `Path`
  - `Point`
  - `Snippet`
- [Content containers](#content-constainers)
  - `paths`
  - `points`
  - `snippets`
- [The `macro` runner](#the-macro-runner)
- [Access to settings](#access-to-settings)
  - `absoluteOptions`
  - `complete`
  - `measurements`
  - `options`
  - `paperless`
  - `sa`
  - `scale`
- [Top-level methods](#access-to-settings)
  - `units()`
  - `hide()`
  - `unhide()`
- [Utilities](#utilities)
- [Logging via the `log` object](#logging-via-the-log-object)
- [The `store`](#the-store)
- [The `part` object which you must return](#the-part-object-which-you-must-return)

### Content constructors

There are three things you can add to a part: points, paths and snippets.
For each of those, you receive the relevant constructor:

| Property | Description |
| --------:| ----------- |
| `Path` | A [Path constructor](/reference/api/path) to create new paths |
| `Point` | A [Point constructor](/reference/api/point) to create new points |
| `Snippet` | A [Snippet constructor](/reference/api/snippet) to create new snippets |

for example: 

```js
new Point(19, 80)
```

### Content containers

Creating a Point, Path, or Snippet by itself doesn't do much.
To add them to your part, assign them to the relevant container object:

| Property | Description |
| --------:| ----------- |
| `paths` | Add a Path to your part by storing it in this container object |
| `points` | The part's points container |
| `snippets` | The part's snippets container |

for example: 

```js
points.example = new Point(19, 80)
```

### The `macro` runner

| Property | Description |
| --------:| ----------- |
| `macro` | The macro runner. See [the macros documentation](/reference/macros/) |

for example:

```js
points.title = new Point(100,100)
macro('title', { 
  at: points.title, 
  nr: 1, 
  title: 'front' 
})
```

### Access to settings

The (relevant entries of the) `settings` object as by the user are also available:

| Property | Description |
| --------:| ----------- |
| `absoluteOptions` | FIXME |
| `complete` | Access to `settings.complete` |
| `measurements` | Access to `settings.measurements` |
| `options` | Access to `settings.options` |
| `paperless` | Access to `settings.paperless` |
| `sa` | Access to `settings.sa` |
| `scale` | Access to `settings.scale` |

for example: 

```js
points.example = new Point(19, measurements.head)
```

### Top-level methods

There's a couple of top-level methods that you can use:

| Property | Description |
| --------:| ----------- |
| `units` | An instance of `utils.units` preconfigured with `settings.units` |
| `hide` | Call `hide()` to hide the part |
| `unhide` | Call `unhide()` to unhide/reveal the part |

for example:

```js
console.log(`123mm is ${units(123)}`)
hide()
```

### Utilities

| Property | Description |
| --------:| ----------- |
| `utils` | A [Utils](/reference/api/utils) instance with utility methods |

for example:

```
points.example = new Point(
  measurements.head * utils.stretchToScale(options.stretch),
  0
)
```

### Logging via the `log` object

| Property | Description |
| --------:| ----------- |
| `log` | The default logging object from the store (FIXME) |

The `log` object has methods attached to it with the following signature:

```js
function loglevel(string msg)
```

The different log levels are: `debug`, `info`, `warning`, and `error`.

For example:

```js
log.info('Hello')
```

### The store

| Property | Description |
| --------:| ----------- |
| `store` | Holds the [Store](/reference/api/store) instance that is shared across parts |

The store is how you can share data between parts. For example:

```js
store.set('example', 12)
// In some other part
let value = store.get('example') // (value now holds 12)
```

### The `part`  object which you must return

| Property | Description |
| --------:| ----------- |
| `part` | The part container itself. **You must return this** |

Last but not least, there is the `part` object which you must return:

```js
// Do clever things here

return part
```

## A part's  `measurements` list

The `measurements` property should hold a list (an array) of all the measurements that are required for your part.

For example:

```js
const part = {
  draft: ({ part }) => part, // Obviously this is silly
  measurements: [ 'head', 'chest', 'waist' ]
}
```

<Note>
You only need to include the measurements required for this part. Not the measurements for any dependencies.

## A part's  `optionalMeasurements` list
## A part's  `options` list
## A part's  `plugin` list
