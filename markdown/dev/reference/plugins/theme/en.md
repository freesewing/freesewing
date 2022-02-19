---
title: "@freesewing/plugin-theme"
---

The **@freesewing-plugin-theme** plugin provides CSS styling for SVG output.
It leverages [the preRender lifecycle hook](/reference/api/hooks/prerender) to
accomplish this.

<Note>

##### Only applies to SVG/PS/PDF output

This plugin will inject CSS in the SVG document when rendering to SVG.

If you use other ways to render your pattern (like our React component)
you will need to apply your own styles.

</Note>

## Installation

```bash
npm install @freesewing/plugin-theme
```

## Usage

Like all [run-time plugins](/guides/plugins/types-of-plugins#run-time-plugins), you
load them by by passing them to the `use()` method of an instatiated pattern.

That method is chainable, so if you have multiple plugins you can just chain them together.

```js
import Aaron from "@freesewing/aaron";
import theme from "@freesewing/plugin-theme";

const pattern = new Aaron().use(theme);
```
