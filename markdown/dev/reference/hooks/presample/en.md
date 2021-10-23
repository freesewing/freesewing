---
title: preSample
---

The `preSample` hook runs just before your pattern is sampled.

It is triggered at the very start of either:

 - the [Pattern.sampleOption()](/reference/api/pattern/#sampleoption) method
 - the [Pattern.sampleMeasurement()](/reference/api/pattern/#samplemeasurement) method
 - the [Pattern.sampleModels()](/reference/api/pattern/#samplemodels) method

Your plugin will receive the Pattern object. 

<Note>

The `preSample` hook is rarely used.

</Note>
