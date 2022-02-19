---
title: "@freesewing/plugin-measurements"
---

The **@freesewing/plugin-measurements** plugin attaches
to [the preDraft lifecycle hook](/reference/api/hooks/predraft) to
provide a number of extra measurements to your pattern insofar as
they can be deduced from the measurements that are provided.

It will add the following measurements:

-   `seatFront` (if both `seat` and `seatBack` are provided)
-   `seatBackArc` (if both `seat` and `seatBack` are provided)
-   `seatFrontArc` (if both `seat` and `seatBack` are provided)
-   `waistFront` (if both `waist` and `waistBack` are provided)
-   `waistBackArc` (if both `waist` and `waistBack` are provided)
-   `waistFrontArc` (if both `waist` and `waistBack` are provided)
-   `crossSeamBack` (if both `crossSeam` and `crossSeamFront` are available)

## Installation

```sh
npm install @freesewing/plugin-measurements
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import measurements from "@freesewing/plugin-measurements";
import config from "../config";

const Pattern = new freesewing.Design(config, measurements);
```
