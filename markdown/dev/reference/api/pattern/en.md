---
title: Pattern
order: 15
---

A Pattern object comes wih the following properties:

 - `settings` : The settings as set by the user
 - `options` : the options as set by the user
 - `config` : The pattern configuration
 - `parts` : A plain object to hold your parts
 - `Part` : The [Part](/en/docs/developer/api/part) constructor
 - `store` : A [Store](/en/docs/developer/api/store) instance
 - `svg` : An [Svg](/en/docs/developer/api/svg) instance
 - `is` : A string that will be set to `draft` or `sample` when you respectively draft or sample a pattern.
 This allows plugins that hook into your pattern to determine what to do in a given scenario.

In addition, a Pattern object has the following methods:

<ReadMore list />
