---
title: Svg.pattern
---

The `Svg.pattern` property holds a reference to [the Pattern
object](/reference/api/pattern/) itself.

## Notes

This allows hooks that only receive the SVG object (such as the preRender and
postRender hooks) to still access the pattern object.
