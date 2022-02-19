---
title: "@freesewing/versionfree-svg"
---

The **@freesewing/plugin-versionfree-svg** plugin suppresses
the inclusion of the FreeSewing version number in SVG output.
This allows diffing pattern output between versions to check for
any differences in the output between different versions of FreeSewing.

## Installation

```sh
npm install @freesewing/plugin-bartack
```

## Usage

Like all [run-time plugins](/guides/plugins/types-of-plugins#run-time-plugins), you
load them by by passing them to the `use()` method of an instatiated pattern.

That method is chainable, so if you have multiple plugins you can just chain them together.

```js
import Aaron from "@freesewing/aaron";
import versionfreeSvg from "@freesewing/plugin-versionfree-svg";

const pattern = new Aaron().use(versionfreeSvg);
```
