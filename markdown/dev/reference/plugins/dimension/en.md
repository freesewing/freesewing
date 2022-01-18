---
title: "@freesewing/plugin-dimension"
---

The **@freesewing/plugin-dimension** plugin provides a variety of macros
to facilitate adding *dimensions* to your design. By *dimensions* we mean 
the indicators for distance that are added to patterns 
in [paperless mode](/reference/api/settings/paperless).

The following macors are provided by this plugin:

 - [hd](/reference/api/macros/hd) : Adds a horizontal dimension
 - [vd](/reference/api/macros/vd) : Adds a vertical dimension
 - [ld](/reference/api/macros/ld) : Adds a linear dimension
 - [pd](/reference/api/macros/pd) : Adds a dimension along a path
 - [rmd](/reference/api/macros/rmd) : Removes a dimension
 - [rmad](/reference/api/macros/rmad) : Removes all dimensions with a default prefix

<Example part="plugin_dimension">

An example of the different dimensinon macros

</Example>

<Tip>

The dimension plugin is part of our [plugin-bundle](/reference/plugins/bundle)

</Tip>

## Installation

```bash
npm install @freesewing/plugin-dimension
```

## Usage

Like all [build-time plugins](/guides/plugins/types-of-plugins#build-time-plugins), you
load them by passing them to the [freesewing.Design](/reference/api/design) super-constructor:

```js
import freesewing from "@freesewing/core";
import dimension from "@freesewing/plugin-dimension";
import config from "../config";

const Pattern = new freesewing.Design(config, dimension);
```

Now you can use the 
[hd](/reference/api/macros/hd/), 
[vd](/reference/api/macros/vd/), 
[ld](/reference/api/macros/ld/), 
[pd](/reference/api/macros/pd/), 
[rmd](/reference/api/macros/rmd/), and
[rmad](/reference/api/macros/rmad/) 
macros in your parts.

