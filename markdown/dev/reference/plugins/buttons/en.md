---
title: "@freesewing/plugin-buttons"
---

The **@freesewing/plugin-buttons** plugin provides the following [snippets](/reference/api/snippets):

-   [button](/reference/api/snippets/button)
-   [buttonhole](/reference/api/snippets/buttonhole)
-   [buttonhole-start](/reference/api/snippets/buttonhole-start)
-   [buttonhole-end](/reference/api/snippets/buttonhole-end)
-   [snap-stud](/reference/api/snippets/snap-stud)
-   [snap-socket](/reference/api/snippets/snap-socket)

<Example part="plugin_buttons">
An example of the button, buttonhole, buttonhole-start, buttonhole-end, snap-stud, and snap-socket snippets
</Example>

<Tip>

The buttons plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-buttons
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import buttons from "@freesewing/plugin-buttons";
import config from "../config";

const Pattern = new freesewing.Design(config, buttons);
```

Now you can use the
[button](/reference/api/snippets/button),
[buttonhole](/reference/api/snippets/buttonhole),
[buttonhole-start](/reference/api/snippets/buttonhole-start),
[buttonhole-end](/reference/api/snippets/buttonhole-end),
[snap-stud](/reference/api/snippets/snap-stud), and
[snap-socket](/reference/api/snippets/snap-socket)
snippets in your designs.
