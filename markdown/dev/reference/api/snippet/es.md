---
title: Snippet
---

A snippet is a reuseable bit of markup for your pattern. They are added to the SVG `defs` section, and rendered with the SVG `use` tag.

The snippet constructor takes two arguments:

 - `def` : The `xlink:href` id that links to the relevant entry in the SVG `defs` section
 - `anchor` : A [`Point`](#point) on which to anchor the snippet

```js
Snippet new Snippet(def, Point);
```

A Snippet object comes with the following properties:

 - `def` : The `xlink:href` id that links to the relevant entry in the SVG `defs` section
 - `anchor` : A [`Point`](../point) on which to anchor the snippet
 - `attributes` : An [`Attributes`](../attributes) instance holding the snippet's attributes

In addition, a Snippet object exposes the following methods:

## attr()

```js
Snippet snippet.attr(
  string name, 
  mixed value, 
  bool overwrite = false
)
```

This `Snippet.attr()` method calls [`Attributes.add()`](./attributes#add) under the hood, but returns the Snippet object.  This allows you to chain different calls together.

If the third parameter is set to `true` it will call [`Attributes.set()`](./attributes#set) instead, thereby overwriting the value of the attribute.

### Snippet.attr() example

<Example part="snippet_attr" caption="An example of the Snippet.attr() method" />

```js
let { Point, points, Snippet, snippets } = part.shorthand();

points.anchor = new Point(50, 15);
snippets.demo = new Snippet("logo", points.anchor)
  .attr("data-scale", 0.8)
  .attr("data-rotate", 180);
```

## clone()

```js
Snippet snippet.clone()
```

### Snippet.clone() example

Returns a new Snippets object that is a deep copy of this one.

<Example part="snippet_clone" caption="An example of the Snippet.clone() method" />

```js
let { Point, points, Snippet, snippets } = part.shorthand();

points.anchor = new Point(35, 35);
snippets.demo = new Snippet("logo", points.anchor)
  .attr("style", "color: #f006");

snippets.clone = snippets.demo
  .clone()
  .attr("data-scale", 0.5);
```
