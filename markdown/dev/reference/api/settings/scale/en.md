---
title: scale
---

<Note>

##### This setting is for future use

This setting has been added to our core library in anticipation
of a feature request that we've made part of [our v3 
roadmap](https://github.com/freesewing/freesewing/discussions/1278).

It does not currently have any effect.

</Note>

The `scale` setting is an overal factor that will influence a variety of
factors to better support very large or very small patterns.

To be clear, `scale` does not change the size of the pattern itself.
It merely controls things like the various stroke width, the size of arrows 
on dimensions, the size of the text on the pattern, and so on.

This is a feature request by those users that our generating pattern 
for dolls. At such small sizes, many snippets, text, or logos become
so large (in comparison to the pattern) that they are problematic.

This setting is aimed at addressing that.

```js
import Brian from "@freesewing/brian";

const pattern = new Brian({
  scale: 0.5
})
```

