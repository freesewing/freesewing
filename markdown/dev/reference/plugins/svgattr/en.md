---
title: "@freesewing/plugin-svgattr"
---

The **@freesewing/plugin-svgattr** plugin takes an object of key-value 
pairs and adds them ass attributes to your SVG document on render.
It leverages [the preRender lifecycle hook](/reference/api/hooks/prerender) to do so.

## Installation

```bash
npm install @freesewing/plugin-svgattr
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import Aaron from "@freesewing/aaron";
import svgAttr from "@freesewing/plugin-svgattr";
import translations from "@freesewing/i18n";

const myAaron = new Aaron()
  .use(svgAttr, { class: "freesewing pattern" });
```

You should pass a second argument which holds key-value pairs of the attributes you want to add to the SVG tag.


