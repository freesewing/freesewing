---
title: Part
order: 15
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
function draft({
  Path,
  Point,
  Snippet,
  absoluteOptions,
  complete,
  hide,
  log,
  macro,
  measurements,
  paperless,
  part,
  paths,
  points,
  scale,
  snippets,
  options,
  sa,
  store,
  units,
  unhide,
  utils,
})
```

The method received a single parameter, an object which you can _destructure_ to 
access the following properties:

### Provided constructors

| Property | Description |
| --------:| ----------- |
| `Path` | A [Path constructor](/reference/api/path) |
| `Point` | A [Point constructor](/reference/api/point) |
| `Snippet` | A [Snippet constructor](/reference/api/snippet) |

### Provided settings

| Property | Description |
| --------:| ----------- |
| `absoluteOptions` | FIXME |
| `complete` | Holds `settings.complete` |
| `measurements` | Holds `settings.measurements` |
| `paperless` | Holds `settings.paperless` |
| `scale` | Holds `settings.scale` |
| `options` | Holds `settings.options` |
| `sa` | Holds `settings.sa` |

### Provided containers

| Property | Description |
| --------:| ----------- |
| `paths` | The part's paths container |
| `points` | The part's points container |
| `snippets` | The part's snippets container |
| `store` | Holds the [Store](/reference/api/store) instance that is shared across parts |
| `utils` | A [Utils](/reference/api/utils) instance with utility methods |


### Provided methods

| Property | Description |
| --------:| ----------- |
| `hide` | Call `hide()` to hide this part |
| `units` | A context-aware version of `utils.units` |
| `unhide` | A context-aware version of `utils.units` |


### Other provided properties

| Property | Description |
| --------:| ----------- |
| `log` | The default logging object from the store (FIXME) |
| `macro` | The macro runner. See [the macros documentation](/reference/macros/) |
| `part` | The part container itself. **You must return this** |
| `store` | Holds the [Store](/reference/api/store) instance that is shared across parts |
| `utils` | A [Utils](/reference/api/utils) instance with utility methods |


## A part's  `measurements` list
## A part's  `optionalMeasurements` list
## A part's  `options` list
## A part's  `plugin` list
