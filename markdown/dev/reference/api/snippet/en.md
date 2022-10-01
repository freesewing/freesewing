---
title: Snippet
---

A Snippet is a reuseable bit of markup for your pattern. They are added to the
SVG `defs` section, and rendered with the SVG `use` tag.

## Signature

```js
Snippet new Snippet(def, Point);
```

The snippet constructor takes two arguments:

- `def` : The `xlink:href` id that links to the relevant entry in the SVG `defs` section
- `anchor` : A [`Point`](/reference/api/point) on which to anchor the snippet

## Attributes

A Snippet object comes with the following properties:

- `def` : The `xlink:href` id that links to the relevant entry in the SVG `defs` section
- `anchor` : A [`Point`](/reference/api/point) on which to anchor the snippet
- `attributes` : An [`Attributes`](/reference/api/attributes) instance holding the snippet's attributes

## Example

<Example caption="Example of the Snippet constructor">
```js
({ Point, Snippet, snippets, Path, paths, part }) => {

  snippets.logo = new Snippet('logo', new Point(0,0))

  // Prevent clipping
  paths.diag = new Path()
    .move(new Point(-25,-40))
    .move(new Point(25,15))

  return part
}
```
</Example>

## Methods

A Snippet object exposes the following methods:

<ReadMore list />
