---
title: script
---

A string that will be rendered as the script section of the SVG document.

We don't use this ourselves, but it's there if you need it.

```svg
<script type="text/javascript">
  /* svg.script will be inserted */
</scripts>
```

<Warning>

###### Add, but don't overwrite

When adding your own script, it's important not to
overwrite this property, but rather add your own.

In other words, do this:

```js
svg.script += myScript;
```

and don't do this:

```js
svg.script = myScript;
```

</Warning>
