---
title: "Ankündigung von FreeSewing v3.0"
caption: "Dieses Bild von Engin Akyurt scheint die Art von dezenter Feier zu sein, die zu dieser Ankündigung passt"
date: 20230930
intro: "FreeSewing 3.0 ist endlich da.  Die Version 3.0 ist das Ergebnis von mehr als einem Jahr Arbeit und kommt etwas mehr als vier Jahre nach der Version 2.0 heraus. Was ich damit sagen will: Ich mache solche Ankündigungen nicht oft, und das ist eine große Sache. Du solltest dich freuen."
author: 1
---

FreeSewing 3.0 ist endlich da.

FreeSewing is the leading open source platform for made-to-measure sewing patterns, loved by home sewers and fashion entrepreneurs alike.

The 3.0 release culminates more than a year of work, and comes just over four years after the v2.0 release.  What I'm saying is: I don't make announcements like this often, and it's a *big deal*. Du solltest dich freuen.

## Wechselnde Änderungen

Fangen wir mit dem Offensichtlichen an: Dies ist eine Hauptversion, also gibt es einige wichtige Änderungen. Sie alle aufzulisten, wäre eine ziemliche Herausforderung und wahrscheinlich nicht sehr nützlich. The first pre-release versions of FreeSewing 3 is almost a year old, and all of the people who contributed designs  have either ported their designs, or I did it for them.

Still, I want to list three breaking changes that are super obviously going to break your stuff if you rely on FreeSewing code;

- **FreeSewing 3 is ESM only**: Migrating a large Javascript project to ESM modules is enough to make even the most seasoned developers break down and cry, but it's done.
- **FreeSewing 3 uses named exports**: There are obviously some places where a default export is required (looking at you NextJS) but whereever we can, we now use named exports exclusively because we all know those are better.
- **FreeSewing 3 benötigt Node 18 oder neuer**: Ich empfehle lts/hydrogen

Nachdem das geklärt ist, lass uns darüber reden, was neu ist. In diese Veröffentlichung ist eine Menge Arbeit geflossen, und ich kann unmöglich über alles berichten. Aber erlauben Sie mir, einige der grundlegenden Änderungen zu erwähnen.

## Designs sind jetzt JBOP

A big driver for the decision to freeze the v2 branch and start working on v3 was to make it easier to mix-and-match parts from various designs.

Design inheritance was already possible in v2, but because the configuration was handled on the design level, it required careful re-configuration of (required) measurements, options, part dependencies, and so on. It was possible but came with a lot of friction.

In v3, all configuration is moved to the part level, and a design is now not much more than *just a bunch of parts* (JBOP).  It is the parts themselves that configure what they need. This includes anything from the measurements they require, the options they provide, the plugins they use, their dependencies, and so on.

This way, re-use parts from various designs, and all of their configuration, dependencies, plugins, and so on will follow.

## Weniger Textbausteine

Creating a design has also become a lot simpler, you essentially pass your list of parts to our `Design` constructor and you're done:

```mjs
import { Design } from '@freesewing/core'

export const MyDesign = new Design({ 
  parts: [ /* ... deine Teile hier ... */ ]
})
```

Speaking of less boilerplate, in v2, the most common plugins were already bundled in the `@freesewing/plugin-bundle` package, but you still had to include them in your design.  In v3, those plugins have moved to the `@freesewing/core-plugins` package, and will be loaded by FreeSewing's core library by default (although you can opt out of that).

## Plugins mit mehr Befugnissen

In addition to providing macros, snippets, or tapping into FreeSewing's lifecycle hooks, plugins can now also add methods to the store.

This is allows further extending FreeSewing with whatever exciting thing you can thing of.  As an example, the way logging is handled in the core library was re-implemented based on this.  Which means that if you would like a different logging solution, you can simple provide your own log handler in a plugin.

## Neue Entwicklungsumgebung

With the version 3 release comes a new development environment that closely mimics what we will be providing at FreeSewing.org (more on that later).

The development environment ships with various templates that you can use to either start a design from scratch, or extend one of our blocks. You don't have to choose one over the other either, you can use all of these at the same time, and if you want even add more.

Our new development environment now allows (optionally) integrates with the FreeSewing backend. You can authenticate with your FreeSewing account so you can (re)use your measurements while working on your designs.

## Nicht alles ist versioniert

There's a lot more I could talk about, but I need to address the elephant in the room: So we have 3.0 now, when do non-developers get to use this?

Nun ja... Ich brauche ein bisschen mehr Zeit. Everything is sort of ready, but some things always a bit more time because you can't really to them in advance. Things like translation, some more testing, not to mention migrating 50k users to a completely different infrastructure.

So as a regular user of FreeSewing.org who is not itching to spin up a development environment, you will need to hold on a little longer.  But clearly, it's going to be soon now. I'd say a matter of weeks, rather than months.

In the meanwhile, if you find a problem or bug, create an issue because FreeSewing 3 is now production-ready and fully supported.

joost


