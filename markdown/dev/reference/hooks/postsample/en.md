---
title: postSample
---

The `postSample` hook runs just after your pattern is sampled.
Your plugin will receive the Pattern object. 

It is triggered just before the end of either:

 - the [Pattern.sampleOption()](/reference/api/pattern/#sampleoption) method
 - the [Pattern.sampleMeasurement()](/reference/api/pattern/#samplemeasurement) method
 - the [Pattern.sampleModels()](/reference/api/pattern/#samplemodels) method

<Note>

The `postSample` hook is rarely used.

</Note>

