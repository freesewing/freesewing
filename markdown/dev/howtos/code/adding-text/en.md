---
title: Adding text
---

SVG is pretty great, but its text handling leaves much to be desired.

To abstract away the intricacies of adding text to an SVG document,
FreeSewing lets you add text to patterns by adding it to the attributes
of points and paths.

All you have to do is set the `data-text` attribute to the text you want to add to the pattern:

```js
points.anchor = new Point(100, 25)
  .attr("data-text", "freesewingIsMadeByJoostDeCockAndContributors")
  .attr("data-text-class", "center");
```

<Example part="point_attr">
Text inserted in a FreeSewing pattern
</Example>

<Note>

You may have noticed that the text we inserted isn't the text that's shown.
That is because, in line with our [best practices](/guides/best-practices) we allow translation of
our pattern by inserting a key that is used to lookup the string in the language
of the pattern, using [the i18n plugin](/reference/plugins/i18n).

</Note>

You can use the same approach to add text to a path:

```js
points.B = new Point(10, 50);
points.BCp2 = new Point(40, 10);
points.C = new Point(90, 30);
points.CCp1 = new Point(50, 90);

paths.example = new Path()
  .move(points.B)
  .curve(points.BCp2, points.CCp1, points.C)
  .attr("class", "canvas")
  .attr("data-text", "freesewingIsMadeByJoostDeCockAndContributors")
  .attr("data-text-class", "text-xs center");
```

<Example part="path_attr">
Text on a path
</Example>
