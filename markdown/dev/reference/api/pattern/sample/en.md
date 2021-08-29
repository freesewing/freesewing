---
title: sample()
---

```js
Pattern pattern.sample()
``` 

This method calls either [sampleOption()](#sampleoption), 
[sampleMeasurement()](#samplemeasurement), 
or [sampleModels()](#samplemodels).

Unlike those three methods who you need to pass the relevant info to, 
[sample()](#pattern-sample) will read the `pattern.settings.sample` 
object to determine what to do.

The possiblities are:

 - **type**: One of `option`, `measurement`, or `models`
 - **option**: An option name as defined in the pattern config file (only used when `type` is option).
 - **measurement**: A measurement name as defined in the pattern config file (only used when `type` is measurement).
 - **models**: An array of models with the required measurements for this pattern (only used when `type` is models).

See the specific sample methods below for more details.

<Tip>

###### Anchor your samples

If you add a point named `anchor` to your pattern part, the different samples
will be anchored on this point.

In other words, for each sample, the anchor point will be kept in the same location.

</Tip>

