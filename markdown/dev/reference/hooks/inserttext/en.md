---
title: insertText 
---

The `insertText` lifecycle hook is called when text is about to be inserted
during rendering.

It is typically used for translation, as is the case
in [our i18n plugin](/reference/plugins/i18n/).

## Signature

```js
string hook(string locale='en', string text)
```

## Example

```js
// Let' get LOUD by turning everything into UPPERCASE
pattern.on(
  'insertText', 
  (locale, text) => text.toUpperCase()
)
```

## Notes

When we say that _this hook is called when text is about to be inserted_, that is a simplified view.
In reality, this hook is called:

- For every string of text added to a given Point or Path
- For the combined result of these values, joined together with spaces

Let's use an example to clarify things:

```js
points.example
  .addText("seamAllowance")
  .addText(": 1 cm")
```

For the example point above, the `insertText` hook will end up being called 3 times:

- First it will pass `seamAllowance` to the plugin
- Then it will pass `: 1 cm` to the plugin
- Finally it will pass `seamAllowance : 1 cm` to the plugin

Having the `insertText` hook only run once with `Seam allowance: 1 cm` would be problematic because
the seam allowance may differ, or perhaps we're using imperial units, and so on.

Instead, you can (and should) divide your text into chunks that need translating, and chunks that do not.

This is also why we're not inserting **Seam allowance** but rather **seamAllowance**;
It is merely a key to indicate what translation we want to replace this text with.
