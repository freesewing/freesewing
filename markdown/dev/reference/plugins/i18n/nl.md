---
title: i18n
---

[![Run-time plugin](https://img.shields.io/badge/Type-run--time-pink.svg)](/plugins) &nbsp; [![License: MIT](https://img.shields.io/npm/l/@freesewing/plugin-i18n.svg?label=License)](https://www.npmjs.com/package/@freesewing/plugin-i18n) &nbsp; [![Code quality on DeepScan](https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256) &nbsp; [![Open issues tagged pkg:plugin-i18n](https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-i18n.svg?label=Issues)](https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-i18n)

The **i18n** plugin provides translation for your pattern:

<Example part="path_attr" caption="An example in English" design={false} options={{locale: 'en'}} /> <Example part="path_attr" caption="An example in French" design={false} options={{locale: 'fr'}} />

It uses the [`insertText`](/plugins#inserttext) hook to do so.

<Note>

This plugin provides the mechanism for translation, but does not come with translations itself.
For this, you can use our [i18n package](/reference/packages/i18n).

</Note>

## Installation

```bash
npm install @freesewing/plugin-i18n
```

## Usage

Like all [build-time plugins](/guides/plugins/#build-time-plugins), you load them by passing them to the [`freesewing.Design`](/reference/api#design) constructor:

```js
import Aaron from "@freesewing/aaron";
import i18n from "@freesewing/plugin-i18n";
import translations from "@freesewing/i18n";

const myAaron = new Aaron()
  .use(i18nPlugin, { strings: translations });
```

You should also pass a second argument which holds your translations. It should be structured as such:

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


