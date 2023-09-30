---
title: CSS Classes
---

We recommend using these classes to style your designs.  Not only are these
classes implemented in the `@freesewing/plugin-theme` plugin, they are also
properly styled in our own frontends.

It is this styling that you will see below. What the various classes exactly
look like will depend on the environment where you use FreeSewing. But what
doesn't change is the names of the classes and their purpose.

## Stoke colors

These classes set the `stroke` property.

<Example caption="An overview of the classes to set the stroke color in FreeSewing">
```mjs
({ 
  Point, 
  Path, 
  points, 
  paths, 
  store, 
  options, 
  part 
}) => {
  const colors = [
    'fabric',
    'lining',
    'interfacing',
    'canvas',
    'various',
    'mark',
    'contrast',
    'note',
  ]
  const w = 120
  let y = 0

  for (const color of colors) {
    y += 12
    paths[color] = new Path()
      .move(new Point(0, y))
      .line(new Point(w, y))
      .setClass(color)
      .addText(`.${color}`, 'center')
  }

  paths.noClip = new Path()
    .move(new Point(0, -1))
    .move(new Point(10, -1))

  return part
}
```
</Example>

## Fill colors

These classes set the `stroke-fill` property.

<Example caption="An overview of the classes to set the fill color in FreeSewing">
```mjs
({ 
  Point, 
  Path, 
  points, 
  paths, 
  store, 
  options, 
  part 
}) => {
  const colors = [
    'fabric',
    'lining',
    'interfacing',
    'canvas',
    'various',
    'mark',
    'contrast',
    'note',
  ]
  const w = 55
  let row = 1
  let i = 0
  let y = 20

  for (const color of colors) {
    const d = (i%2) ? 0 : 60
    points[color] = new Point(w/2+d, y*row-6).addText(`.${color}`, 'center')
    paths[color] = new Path()
      .move(new Point(d, y*row))
      .line(new Point(w+d, y*row-10))
      .line(new Point(w+d, y*row))
      .line(new Point(d, y*row-10))
      .close()
      .setClass(`fill-${color} no-stroke`)
    if (i%2) row++
    i++
  }

  paths.noClip = new Path()
    .move(new Point(0, -10))
    .move(new Point(10, -1))

  return part
}
```
</Example>


## Stroke styles

These classes set the `stroke-dasharray` property.

<Example caption="An overview of the classes to set the stroke style in FreeSewing">
```mjs
({ 
  Point, 
  Path, 
  points, 
  paths, 
  store, 
  options, 
  part 
}) => {
  const styles = [
    'dotted', 
    'dashed', 
    'lashed', 
    'sa', 
    'help', 
    'hidden',
  ]
  const w = 120
  let y = 0

  paths.dflt = new Path()
    .move(new Point(0, 0))
    .line(new Point(w, 0))
    .addText(`[default]`, 'center')

  for (const style of styles) {
    y += 12
    paths[style] = new Path()
      .move(new Point(0, y))
      .line(new Point(w, y))
      .setClass(style)
      .addText(`.${style}`, 'center')
  }

  paths.noClip = new Path()
    .move(new Point(0, -8))
    .move(new Point(10, -8))

  return part
}
```
</Example>

## Stroke widths

These classes set the `stroke-width` property.
The default width is shown at the top.

<Example caption="An overview of the classes to set the stroke width in FreeSewing">
```mjs
({ 
  Point, 
  Path, 
  points, 
  paths, 
  store, 
  options, 
  part 
}) => {
  const widths = [
    'stroke-xs',
    'stroke-sm',
    'stroke-lg',
    'stroke-xl',
    'stroke-2xl',
    'stroke-3xl',
    'stroke-4xl',
  ]
  const w = 120
  let y = 0
  let i = 0

  paths.dflt = new Path()
    .move(new Point(0, 0))
    .line(new Point(w, 0))
    .addText(`[default]`, 'center')

  for (const width of widths) {
    i++
    y += 12 + i

    paths[width] = new Path()
      .move(new Point(0, y))
      .line(new Point(w, y))
      .setClass(width)
      .addText(`.${width}`, 'center')
      .attr('data-text-dy', -0.6*i)
  }

  paths.noClip = new Path()
    .move(new Point(-20, -8))
    .move(new Point(140, 110))

  return part
}
```
</Example>

## Font size

These classes set the `stroke-width` property.
The default width is shown at the top.

<Example caption="An overview of the classes to set the font size in FreeSewing">
```mjs
({ 
  Point, 
  Path, 
  points, 
  paths, 
  store, 
  options, 
  part 
}) => {
  const sizes = [
    'text-xs',
    'text-sm',
    'text-lg',
    'text-xl',
    'text-2xl',
    'text-3xl',
    'text-4xl',
  ]
  let y = 0
  let i = -2

  points.dflt = new Point(0,0).addText(`[default]`)

  for (const size of sizes) {
    i++
    y += 12 + i*5.5
    points[size] = new Point(0, y).addText(`.${size}`, size)
  }

  paths.noClip = new Path()
    .move(new Point(-5, -8))
    .move(new Point(190, 175))

  return part
}
```
</Example>

## Text alignment

These classes set the `text-anchor` property.
The default align is to the left (`text-anchor: start;`).

<Example caption="An overview of the classes to align text in FreeSewing">
```mjs
({ 
  Point, 
  Path, 
  points, 
  paths, 
  store, 
  options, 
  part 
}) => {

  const w = 120
  paths.left = new Path()
    .move(new Point(0, 0))
    .line(new Point(w, 0))
    .addText('Default is left-aligned')
  paths.center = new Path()
    .move(new Point(0, 12))
    .line(new Point(w, 12))
    .addText('.center', 'center')
  paths.right = new Path()
    .move(new Point(0, 24))
    .line(new Point(w, 24))
    .addText('.right', 'right')

  paths.noClip = new Path()
    .move(new Point(-5, -8))
    .move(new Point(10, 15))

  return part
}
```
</Example>

## Bold and italic text

<Example caption="An overview of the classes to make text bold or italic in FreeSewing">
```mjs
({ 
  Point, 
  Path, 
  points, 
  paths, 
  store, 
  options, 
  part 
}) => {

  const w = 120
  paths.left = new Path()
    .move(new Point(0, 0))
    .line(new Point(w, 0))
    .addText('Default text', 'center')
  paths.center = new Path()
    .move(new Point(0, 12))
    .line(new Point(w, 12))
    .addText('.bold', 'bold center')
  paths.right = new Path()
    .move(new Point(0, 24))
    .line(new Point(w, 24))
    .addText('.italic', 'center italic')

  paths.noClip = new Path()
    .move(new Point(-5, -8))
    .move(new Point(10, 15))

  return part
}
```
</Example>

## Various:

- `.no-stroke`: Do not stroke the element
- `.no-fill`: Do not fill the element
