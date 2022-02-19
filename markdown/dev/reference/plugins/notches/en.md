---
title: "@freesewing/plugin-notches"
---

The **@freesewing/plugin-notces** plugin provides the following [snippets](/reference/api/snippets):

-   [notch](/reference/api/snippets/notch)
-   [bnotch](/reference/api/snippets/bnotch)

<Example part="plugin_notches">
An example of the button, buttonhole, buttonhole-start, buttonhole-end, snap-stud, and snap-socket snippets
</Example>

<Tip>

The notches plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-notches
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import notches from "@freesewing/plugin-notches";
import config from "../config";

const Pattern = new freesewing.Design(config, notches);
```

Now you can use the
[notch](/reference/api/snippets/notch) and\
[bnotch](/reference/api/snippets/buttonhole)
snippets in your designs.
