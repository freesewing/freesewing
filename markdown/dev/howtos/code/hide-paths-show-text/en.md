---
title: Hide paths but still show text

---

To hide a path but have its text still shown, add the `hidden` CSS class
to the path's attributes.

You can do this via different methods:
1. [`Path.attr()`](/reference/api/path/attr)
2. [`Path.addClass()`](/reference/api/path/addclass)
3. [`Path.setclass()`](/reference/api/path/setclass)

```mjs
path1.attr('class', 'hidden')
path2.addClass('hidden')
path3.setClass('hidden')
```

Setting the `hidden` CSS class causes the path to be invisible but
still included in the drafted pattern. Because the CSS classes for the
text are independent from the CSS classes for the path, the text
will still appear even though the path is invisible.

(Hiding a path via `Path.hide()` or `Path.setHidden()` will not work
for this purpose.
These methods will cause both the path and its accompanying text to be
omitted when the pattern is drafted.)
