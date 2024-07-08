---
title: Use translation keys, not text
order: 60
---

Don't insert literal text in your patterns. Instead, insert a key that can then be translated.

For example, if you want to put "_Finish with bias tape_" on your pattern, don't be
tempted to do this:

```js
path.seam.attr("data-text", "Finish with bias tape");
```

That (English) string is now hard-coded in your pattern. As FreeSewing supports
translation out of the box, it would be a real shame not to make use of it.

Instead, insert a key to identify the string:

```js
path.seam.attr("data-text", "finishWithBiasTape");
```

This way, different strings for different languages can be associated with
the key, allowing translated text to be used.

You can find and browse the translations and available translation keys for each design in the design's
[i18n folder on GitHub][1].

[1]: https://github.com/freesewing/freesewing/tree/develop/designs/aaron/i18n
