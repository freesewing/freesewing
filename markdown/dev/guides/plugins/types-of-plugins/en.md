---
title: Types of plugins
order: 10
---

Plugins come in two flavours:

-   [Build-time plugins](#build-time-plugins)
-   [Run-time plugins](#run-time-plugins)

When writing a plugin, ask yourself whether it's a run-time or a build-time plugin.
And if the answer is both, please split them into two plugins.

## Build-time plugins

A plugin is a build-time plugin if it is required by the pattern at build-time.
In other words, the plugin is a dependency for the pattern, and if it's missing
the pattern won't load.

<Tip>

Our [plugin bundle](/reference/plugins/bundle/) bundles build-time plugins that are used in many patterns.

</Tip>

<Note>Plugins that provide a macro are typically build-time plugins</Note>

## Run-time plugins

A plugin is a run-time plugin if it can be added after instantiating your pattern.
Think of it as a plugin to be used in the front-end.

Run-time plugins are not a dependecy of the pattern. They just *add something* to it.

Our [theme plugin](/reference/plugins/theme/) is a good example of a run-time plugin.
If it's missing, your pattern will still work, it just won't look pretty.
