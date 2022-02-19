---
title: insertText
---

The `insertText` hook is called when text is about to be inserted during rendering.

Methods attached to the `insertText` hook will receive 2 parameters:

-   `locale` : The language code of the language requested by the user (defaults to `en`)
-   `text`: The text to be inserted

Unlike most hooks that receive an object that you can make changes to,
for this hook you need to return a string.

This hook is typically used for translation, as is the case
in [our i18n plugin](/reference/plugins/i18n/).

## Understanding the insertText hook

When we say that *this hook is called when text is about to be inserted*, that is a simplified view.
In reality, this hook is called:

-   For every value set on data-text
-   For the combined result of these values, joined together with spaces

Let's use an example to clarify things:

```js
points.example
  .attr('data-text', "seamAllowance")
  .attr('data-text', ": 1cm")
```

For the example point above, the `insertText` hook will end up being called 3 times:

-   First it will pass `seamAllowance` to the plugin
-   Then it will pass `: 1cm` to the plugin
-   Finally it will pass `seamAllowance : 1cm` to the plugin

Having the `insertText` hook only run once with `Seam allowance: 1cm` would be problematic because
the seam allowance may differ, or perhaps we're using imperial units, and so on.

Instead, you can (and should) divide your text into chunks that need translating, and chunks that do not.

This is also why we're not inserting **Seam allowance** but rather **seamAllowance**;
It is merely a key to indicate what translation we want to replace this text with.
