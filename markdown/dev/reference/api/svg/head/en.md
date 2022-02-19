---
title: head
---

A string that combines the `style`, `script`,
and `defs` sections and an opening tag for an SVG group.

```svg
<style type="text/css">
  /* svg.style will be inserted */
</style>

<script type="text/javascript">
  /* svg.script will be inserted */
</scripts>

<defs>
  /* svg.defs will be inserted */
</defs>

<!-- Start of group #fs-container -->
<g id="fs-container">
```

<Note>

###### This does not include the opening SVG tag

Note that while [Pattern.svg.tail](/reference/api/pattern/svg/tail/) closes the SVG tag,
[Pattern.svg.head](/reference/api/pattern/head/) does not open it.
That's because the `width`, `height` and `viewBox` attributes will
depend on the main body of the SVG document.

</Note>
