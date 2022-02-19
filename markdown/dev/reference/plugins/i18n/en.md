---
title: "@freesewing/plugin-i18n"
---

The **@freesewing/plugin-i18n** plugin provides a mechanism to translate your designs.
It does that by attaching to [the insertText lifecycle hook](/reference/api/hooks/inserttext) to
intercept all operations that add text to a design and attempt to translate the text
prior to insertion.

<Note>

This plugin provides the mechanism for translation, but does not come with translations itself.
For this, you can use our [i18n package](/reference/packages/i18n).

</Note>

## Installation

```bash
npm install @freesewing/plugin-i18n
```

## Usage

Like all [build-time plugins](/guides/plugins/#build-time-plugins), you load them
by passing them to the [`freesewing.Design`](/reference/api#design) constructor:

```js
import aaron from "@freesewing/aaron";
import i18n from "@freesewing/plugin-i18n";
import translations from "@freesewing/i18n";

const pattern = new aaron()
  .use(i18nPlugin, { strings: translations });
```

You should also pass a second argument which holds your translations.
It should be structured as such:

```js
{
  strings:
    en: {
      example: "Example"
    },
    nl: {
      example: "Voorbeeld"
    },
    // More languages can follow
  }
}
```
