---
title: bust
---

[![Build-time plugin](https://img.shields.io/badge/Type-build--time-purple.svg)](/plugins)
&nbsp;
[![License: MIT](https://img.shields.io/npm/l/@freesewing/plugin-bust.svg?label=License)](https://www.npmjs.com/package/@freesewing/plugin-bust)
&nbsp;
[![Code quality on DeepScan](https://deepscan.io/api/teams/2114/projects/2993/branches/23256/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2114&pid=2993&bid=23256)
&nbsp;
[![Open issues tagged pkg:plugin-bust](https://img.shields.io/github/issues/freesewing/freesewing/pkg:plugin-bust.svg?label=Issues)](https://github.com/freesewing/freesewing/issues?q=is%3Aissue+is%3Aopen+label%3Apkg%3Aplugin-bust)

The [@freesewing/plugin-bust](/reference/packages/plugin-bust) packages provides a plugin to help you adapt menswear patterns for breasts.

If you are designing a womenswear pattern, you won't need this plugin. But if you're adapting
a menswear pattern for breasts, this plugin can help you.

Almost all menswear patterns use the chest circumference to draft the garment.

As a person with breasts, using your (full) chest circumference will give you bad fit.
Instead, it's better to use your high bust measurement as chest circumference, and then create extra room for the breasts.

This is the same technique that's used in a full-bust adjustment to fit a womenswear pattern for a person with above-average sized breasts.

This plugin helps you by:

 - Storing the chest circumference in `measurements.bust`
 - Changing `measurments.chestCircumference` to the value of `measurements.highBust`

This way you can extend a menswear pattern and have it drafted with the high bust measurement
as chest measurment, after which you can create room for the breasts.

It's used by our [Carlita](/reference/packages/carlita) pattern, which extends the menswear [Carlton](/reference/packages/carlton) pattern.

<Tip>

To learn more about extending a pattern, see [Design inheritance](/howtos/code/inheritance/)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-bust
```

## Usage

Like all [build-time plugins](/guides/plugins/#build-time-plugins), you load them 
by passing them to the [`freesewing.Design`](/reference/api#design) constructor:

```js
import freesewing from "@freesewing/core";
import bust from "@freesewing/plugin-bust";
import config from "../config";

const Pattern = new freesewing.Design(config, bust);
```


