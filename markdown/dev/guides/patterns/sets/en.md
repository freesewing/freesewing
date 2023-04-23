---
title: Sets
order: 100
---

When we refer to a _set_ we mean a _set of settings_. 
In the vast majority of cases, there is only one set of settings. So we just
refer to them as _the settings_.  But FreeSewing supports instantiating a
pattern with multiple sets of settings. We refer to this as **multiset
support**.

## Multiset support

Multiset support underpins features such as
[sampling](/reference/api/pattern/sample) and in general can be used to
_combine_ multiple drafted variants into a single pattern container.

Here's a simple example:

<Example settings="sample: { type: measurement, measurement: head }" withHead caption="A simple example of sampling the `head` measurement">

```js
({
  Point,
  points,
  Path,
  paths,
  Snippet,
  snippets,
  measurements,
  part
}) => {

  const size = measurements.head
  paths.box = new Path()
    .move(new Point(0,0))
    .line(new Point(0, size/3))
    .line(new Point(size, size/3))
    .line(new Point(size, 0))
    .addClass('fabric')
    .close()
  points.logo = new Point(size/2, size/5)
  snippets.logo = new Snippet('logo', points.logo)

  return part
}
```

</Example>

When drafting for multiple sets of settings, it's important to keep the different draft variants from cross-contaminating each other.
To ensure this, the core library will:

- Set up each pattern part per set
- Provide a per-set store that is shared between parts in the set

This is illustrated below:



<Example caption="A schematic overview of what goes on inside a FreeSewing pattern">

```js
({ Point, points, Path, paths, options, part }) => {

  // Draws a w*h box, returns a Path object
  const box = (name, origin, width, height, classes='fabric') => {
    let base = height
    if (width < height) base = width
    let t = base
    points[name + 'TopLeft'] = new Point(origin.x, origin.y)
    points[name + 'BottomLeft'] = new Point(origin.x, origin.y + height)
    points[name + 'BottomRight'] = new Point(
      origin.x + width,
      origin.y + height
    )
    points[name + 'TopRight'] = new Point(origin.x + width, origin.y)
    points[name + 'Mid'] = points[name + 'TopLeft'].shiftFractionTowards(
      points[name + 'BottomRight'],
      0.5
    )
    points[name + 'Mid'].y += 3

    return new Path()
      .move(points[name + 'TopLeft'])
      .line(points[name + 'BottomLeft'])
      .line(points[name + 'BottomRight'])
      .line(points[name + 'TopRight'])
      .line(points[name + 'TopLeft'])
      .close()
      .addClass(classes)
  }

  // Draws and arrow from to and places text
  const arrow = (name, text = '') => {
    let from = points[name + 'From']
    let to = points[name + 'To']
    from = from.shiftTowards(to, 2)
    to = to.shiftTowards(from, 2)
    const base = from.dist(to)
    const r = 3
    points[name + 'Tip1'] = to.shiftTowards(from, 3.5).rotate(r, from)
    points[name + 'Tip2'] = to.shiftTowards(from, 3.5).rotate(r * -1, from)
    const path = new Path()
      .move(from)
      .line(to)
      .move(points[name + 'Tip1'])
      .line(to)
      .line(points[name + 'Tip2'])
      .addClass('lining stroke-lg')
    if (options.focus === name) path.addClass('note')

    return text
      ? path.addText('  ' + text, options.focus === name ? 'fill-note center' : 'center')
      : path
  }

  // Draws a box and handled text placement
  const drawBox = (name, x, y, width, height, text=true, classes, textClasses='') => {
    points[name + 'Origin'] = new Point(x, y)
    paths[name] = box(name, points[name + 'Origin'], width, height, classes)
    if (text === 'b') {
      paths[name+'_label'] = new Path()
        .move(points[name+'BottomLeft'])
        .line(points[name+'BottomRight'])
        .addClass('hidden')
        .addText(name, 'center ' + textClasses)
        .attr('data-text-dy', -1)
    }
    else if (text === 't') {
      paths[name+'_label'] = new Path()
        .move(points[name+'TopLeft'])
        .line(points[name+'TopRight'])
        .addClass('hidden')
        .addText(name, 'center ' + textClasses)
        .attr('data-text-dy', 11)
    }
    else if (text === 'r') {
      paths[name+'_label'] = new Path()
        .move(points[name+'BottomRight'])
        .line(points[name+'TopRight'])
        .addClass('hidden')
        .addText(name, 'center ' + textClasses)
        .attr('data-text-dx', -5)
    }
    else if (text) points[name + 'Mid'].addText(name, 'center')
  }

  // Stacks
  drawBox('Stack 0', -30, -33, 50, 169, 'b', 'mark', 'fill-mark')
  paths['Stack 0'].attr('fillOpacity', 0.2)
  drawBox('Stack 1', 23, -33, 50, 169, 'b', 'mark', 'fill-mark')
  paths['Stack 1'].attr('fillOpacity', 0.2)
  drawBox('Stack 2', 76, -33, 50, 169, 'b', 'mark', 'fill-mark')
  paths['Stack 2'].attr('fillOpacity', 0.2)

  // Sets
  drawBox('Set 0', -33, -30, 174, 76, 'r', 'contrast fill-contrast', 'bold text-lg fill-contrast')
  paths['Set 0'].attr('fillOpacity', 0.2)
  drawBox('Set 1', -33, 50, 174, 76, 'r', 'contrast fill-contrast', 'bold text-lg fill-contrast')
  paths['Set 1'].attr('fillOpacity', 0.2)

  // Parts set 0
  drawBox('Part A (set 0)', -27, -27, 44, 70, 'b', 'note')
  drawBox('points', -24, -24, 38, 12, true, 'note')
  drawBox('paths', -24, -9, 38, 12, true, 'note')
  drawBox('snippets', -24, 6, 38, 12, true, 'note')

  drawBox('Part B (set 0)', 26, -27, 44, 70, 'b', 'note')
  drawBox(' points ', 29, -24, 38, 12, true, 'note')
  drawBox(' paths ', 29, -9, 38, 12, true, 'note')
  drawBox(' snippets ', 29, 6, 38, 12, true, 'note')

  drawBox('Part C (set 0)', 79, -27, 44, 70, 'b', 'note')
  drawBox('  points  ', 82, -24, 38, 12, true, 'note')
  drawBox('  paths  ', 82, -9, 38, 12, true, 'note')
  drawBox('  snippets  ', 82, 6, 38, 12, true, 'note')

  drawBox('setStore 0', -24, 21, 144, 12, true, 'lining', 'fill-various')
  paths['setStore 0'].attr('fillOpacity', 0.2)

  // Parts set 1
  drawBox('Part A (set 1)', -27, 53, 44, 70, 'b', 'note')
  drawBox(' points', -24, 56, 38, 12, true, 'note')
  drawBox(' paths', -24, 71, 38, 12, true, 'note')
  drawBox(' snippets', -24, 86, 38, 12, true, 'note')

  drawBox('Part B (set 1)', 26, 53, 44, 70, 'b', 'note')
  drawBox('  points ', 29, 56, 38, 12, true, 'note')
  drawBox('  paths ', 29, 71, 38, 12, true, 'note')
  drawBox('  snippets ', 29, 86, 38, 12, true, 'note')

  drawBox('Part C (set 1)', 79, 53, 44, 70, 'b', 'note')
  drawBox('   points  ', 82, 56, 38, 12, true, 'note')
  drawBox('   paths  ', 82, 71, 38, 12, true, 'note')
  drawBox('   snippets  ', 82, 86, 38, 12, true, 'note')

  drawBox('setStore 1', -24, 101, 147, 12, true, 'lining', 'fill-various')
  paths['setStore 1'].attr('fillOpacity', 0.2)

  // Pattern
  drawBox('Pattern Store', -30, -52, 155, 15, true, 'lining', 'fill-lining')
  paths['Pattern Store'].attr('fillOpacity', 0.2)
  drawBox('Pattern', -43, -59, 195, 216, 'b', 'fabric stroke-lg', 'text-lg bold')

  return part
}
```

</Example>

## One set is plenty

In the vast majority of cases, a pattern will only have one set of settings.
As such, multiset support is not something you need to be intimately familiar with.
But, it is good to know it exists and explains certain things that might seem
_odd_ if you were unaware of multiset support, such as the fact that there's a
pattern-wide store and a different store per set, the so-called _setStore(s)_.

Below is an illustration of a pattern with a single set of settings which, once again, is the vast majority of use cases:

<Example caption="A schematic overview of what goes on inside a FreeSewing pattern in a typical use-case: a single set of settings">

```js
({ Point, points, Path, paths, options, part }) => {

  // Draws a w*h box, returns a Path object
  const box = (name, origin, width, height, classes='fabric') => {
    let base = height
    if (width < height) base = width
    let t = base
    points[name + 'TopLeft'] = new Point(origin.x, origin.y)
    points[name + 'BottomLeft'] = new Point(origin.x, origin.y + height)
    points[name + 'BottomRight'] = new Point(
      origin.x + width,
      origin.y + height
    )
    points[name + 'TopRight'] = new Point(origin.x + width, origin.y)
    points[name + 'Mid'] = points[name + 'TopLeft'].shiftFractionTowards(
      points[name + 'BottomRight'],
      0.5
    )
    points[name + 'Mid'].y += 3

    return new Path()
      .move(points[name + 'TopLeft'])
      .line(points[name + 'BottomLeft'])
      .line(points[name + 'BottomRight'])
      .line(points[name + 'TopRight'])
      .line(points[name + 'TopLeft'])
      .close()
      .addClass(classes)
  }

  // Draws and arrow from to and places text
  const arrow = (name, text = '') => {
    let from = points[name + 'From']
    let to = points[name + 'To']
    from = from.shiftTowards(to, 2)
    to = to.shiftTowards(from, 2)
    const base = from.dist(to)
    const r = 3
    points[name + 'Tip1'] = to.shiftTowards(from, 3.5).rotate(r, from)
    points[name + 'Tip2'] = to.shiftTowards(from, 3.5).rotate(r * -1, from)
    const path = new Path()
      .move(from)
      .line(to)
      .move(points[name + 'Tip1'])
      .line(to)
      .line(points[name + 'Tip2'])
      .addClass('lining stroke-lg')
    if (options.focus === name) path.addClass('note')

    return text
      ? path.addText('  ' + text, options.focus === name ? 'fill-note center' : 'center')
      : path
  }

  // Draws a box and handled text placement
  const drawBox = (name, x, y, width, height, text=true, classes, textClasses='') => {
    points[name + 'Origin'] = new Point(x, y)
    paths[name] = box(name, points[name + 'Origin'], width, height, classes)
    if (text === 'b') {
      paths[name+'_label'] = new Path()
        .move(points[name+'BottomLeft'])
        .line(points[name+'BottomRight'])
        .addClass('hidden')
        .addText(name, 'center ' + textClasses)
        .attr('data-text-dy', -1)
    }
    else if (text === 't') {
      paths[name+'_label'] = new Path()
        .move(points[name+'TopLeft'])
        .line(points[name+'TopRight'])
        .addClass('hidden')
        .addText(name, 'center ' + textClasses)
        .attr('data-text-dy', 11)
    }
    else if (text === 'r') {
      paths[name+'_label'] = new Path()
        .move(points[name+'BottomRight'])
        .line(points[name+'TopRight'])
        .addClass('hidden')
        .addText(name, 'center ' + textClasses)
        .attr('data-text-dx', -5)
    }
    else if (text) points[name + 'Mid'].addText(name, 'center')
  }

  // Stacks
  drawBox(' Stack 0', -30, -33, 50, 89, 'b', 'mark', 'fill-mark')
  drawBox(' Stack 1', 23, -33, 50, 89, 'b', 'mark', 'fill-mark')
  drawBox(' Stack 2', 76, -33, 50, 89, 'b', 'mark', 'fill-mark')

  // Sets
  drawBox('Set 0', -33, -30, 174, 76, 'r', 'contrast fill-contrast', 'bold text-lg fill-contrast')
  paths['Set 0'].attr('fillOpacity', 0.2)

  // Parts set 0
  drawBox('Part A (set 0)', -27, -27, 44, 70, 'b', 'note')
  drawBox('points', -24, -24, 38, 12, true, 'note')
  drawBox('paths', -24, -9, 38, 12, true, 'note')
  drawBox('snippets', -24, 6, 38, 12, true, 'note')

  drawBox('Part B (set 0)', 26, -27, 44, 70, 'b', 'note')
  drawBox(' points ', 29, -24, 38, 12, true, 'note')
  drawBox(' paths ', 29, -9, 38, 12, true, 'note')
  drawBox(' snippets ', 29, 6, 38, 12, true, 'note')

  drawBox('Part C (set 0)', 79, -27, 44, 70, 'b', 'note')
  drawBox('  points  ', 82, -24, 38, 12, true, 'note')
  drawBox('  paths  ', 82, -9, 38, 12, true, 'note')
  drawBox('  snippets  ', 82, 6, 38, 12, true, 'note')

  drawBox('setStore 0', -24, 21, 144, 12, true, 'lining', 'fill-various')
  paths['setStore 0'].attr('fillOpacity', 0.2)

  // Pattern
  drawBox('Pattern Store', -30, -52, 155, 15, true, 'lining', 'fill-lining')
  paths['Pattern Store'].attr('fillOpacity', 0.2)
  drawBox(' Pattern', -43, -59, 195, 128, 'b', 'fabric stroke-lg', 'text-lg bold')

  return part
}
```

</Example>


