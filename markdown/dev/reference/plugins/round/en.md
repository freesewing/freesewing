---
title: "@freesewing/plugin-round"
---

The **@freesewing/plugin-round** plugin provides [the 
round macro](/reference/api/macros/round) which helps you round 
corners on your designs. 

<Warning>

##### Straight corners only 

The round macro is intended for rounding 90° angles.
It does not support rounding other angles/corners.

</Warning>

<Example part="plugin_round">An example of the round macro</Example>

<Tip>

The round plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-round
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import round from "@freesewing/plugin-round";
import config from "../config";

const Pattern = new freesewing.Design(config, round);
```

Now you can use [the round macro](/reference/macros/round/): in your parts.


