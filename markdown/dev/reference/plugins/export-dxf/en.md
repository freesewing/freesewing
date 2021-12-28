---
title: "@freesewing/plugin-export-dxf"
---

The **@freesewing/plugin-export-dxf** plugin exports your pattern
to [the DXF file format](https://en.wikipedia.org/wiki/AutoCAD_DXF). 
It will attach the [the postDraft lifecycle
hook](/reference/api/hooks/postdraft) to add a `renderDxf()` method
to the pattern object.

<Comment by="joost">

##### This is de-facto unmaintained

This plugin is de-facto unmaintained because I have no use for it.
I keep it around in case it might be useful, and I've used it 
myself for exporting to different software.

The being said, DXF is a poor choice as a file format for storing sewing patterns.
For one thing, it only allows straight lines, no curves. Yikes!

</Comment>

## Installation

```sh
npm install @freesewing/plugin-export-dxf
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

After calling `pattern.draft()` you will be able to call `pattern.renderDxf()` 
which will return the Dxf output.
