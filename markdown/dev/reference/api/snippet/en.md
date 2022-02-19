---
title: Snippet
order: 35
---

A snippet is a reuseable bit of markup for your pattern. They are added to the
SVG `defs` section, and rendered with the SVG `use` tag.

The snippet constructor takes two arguments:

-   `def` : The `xlink:href` id that links to the relevant entry in the SVG `defs` section
-   `anchor` : A [`Point`](#point) on which to anchor the snippet

```js
Snippet new Snippet(def, Point);
```

A Snippet object comes with the following properties:

-   `def` : The `xlink:href` id that links to the relevant entry in the SVG `defs` section
-   `anchor` : A [`Point`](../point) on which to anchor the snippet
-   `attributes` : An [`Attributes`](../attributes) instance holding the snippet's attributes

In addition, a Snippet object exposes the following methods:

<ReadMore list />
