---
title: Plugin guide
---

Plugins allow you to extend FreeSewing with new features and functionality.
A FreeSewing plugin can extend FreeSewing in 3 different ways:

- It can [provide macros](/guides/plugins/macros), which are a way to automate a number of steps into a
  single command.
- It can [hook into the pattern](/guides/plugins/hooks), which allows you to manipulate the pattern or
  interact with it at various stages of it's lifecycle.
- It can [provide store methods](/guides/plugins/store), which allows you to add new ways to handle data
  in the pattern, including providing a custom logger.

We have [a list of plugins](/reference/plugins/) that we maintain, but
if you can't find what you're looking for, you can write your own plugin.

If you plan on doing that or if you would like to understand how plugins work,
this guide is for you.

We'll cover the following topics:

<ReadMore list />
