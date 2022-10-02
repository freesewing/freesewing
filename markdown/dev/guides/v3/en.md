---
title: FreeSewing version 3
---

Since August 2022, we've been working on the next major version of FreeSewing: version 3 (v3).
This guides gives a high level overview of the changes that are going into v3, why we're making them, and what to expect.

If you're looking for a more hands-on list of changes between v2 and v3, please refer to [the v3 migration guide](/guides/v3/migration).

Once v3 is in production, these guides will become less relevant. For the time being, that is not the case though, so things could still change. That being said, here's the inside scoop on v3.

## Why a version 3 in the first place?

Before diving into the details, let's take a moment to go over some of the reasons why we decided to start work on v3, rather than put keep working on the v2 branch of FreeSewing.

FreeSewing practices [semantic versioning](https://semver.org/), which means that any breaking changes require a new major version.
In more practical terms, it means that new features or ideas that would require breaking changes are put on the back burner until enough of them accumulate that they start making a compelling case for putting out a new major version.

For FreeSewing v3, [our contributor call on 20 August 2022](https://github.com/freesewing/freesewing/discussions/2582) marks the moment that we decided enough of our plans and ambitions were being held back by our inability to introduce breaking changes that we decided to turn the page and start working on v3.

## High-level goals

### Support for packs

The main driver for v3 was what was listed on [our roadmap](https://github.com/freesewing/freesewing/discussions/1278) as *Support for packs*. The idea initially focussed on publishing collections of re-usable pattern parts such as a *sleeve pack* or a *collar pack* and so on. You would then be able to create new designs by pulling in a collar from the collar pack, some sleeves from the sleeve pack and so on.

As we itterated on this idea, it became clear that there was little added value in creating another type of container (a *pack*) and that it would be better of we made it easier to treat each design as a *pack*. In other words, allow people to combine parts from different designs in a seamless way.

Design inheritance was already possible in v2, but because the configuration was handled on the design level, it required careful re-confiruration of (required) measuremetns, options, part dependencies, and so on. It was possible, but came with a lot of friction. 

So in v3, all configuration is moved to the part level, and a design is now not much more than a container object for a collection of parts.Its the parts themselves that configure what they need. Anything from the measurements they require, the options they provide, the plugins they use, and so on.

This way, you can pull a part out of a design and all of its configuration, dependencies, plugins, and so on will follow it.

This migration of the configuration to the part level (from the design level) is the biggest and most fundamental change between v2 and v3. It is also where most of the work needs to be done to port existing designs from v2 to v3.

### Improved developer experience.

In version 2, we ship both CJS and ESM modules, and we rely on default exports.
In version 3, FreeSewing is ESM-only and we have also migrated to only use named exports in the code we publish as they provide better IDE integration.

As part of our move to v3, we've switched from Rollup to Esbuild as our bundles, and in the process dumped Babel.

For many of our users, these choices are deep enough under the hood that they are unconcerned by them.
Together, they only speed up our builds, they also improve the developer experience, which has been another big driver in v3.

### Multisets, Stacks, and better support for sampling

Sampling is when FreeSewing drafts a number of variations of a given pattern and allows you to compare them by stacking the parts on top of each other. In v2 this was handled in a sort of hackish way as it was very much bolted on as an afterthought.

To handle this type of use-case in v3, we've added two new features that together open up a range of possibilities.
One is support for multisets, the other is support for stacks.

Multisets means you can pass a number of different sets of settings to a pattern and core will draft the pattern for each set of settings.

Stacks allow you to designate different parts of your pattern --- or parts across different sets of settings --- as belonging to the same stack. When it's time to layout your pattern, core will stack them on top of each other, a bit like layers.

These two new features not only make sampling a lot more straight-forward, they also allow other possibilities such as drafting a pattern for two sets of measurements which can be handy when dealing with an assymetric body for example.

### Provide more generic extending capabilities, rather than tight-coupling with our frontend

This is something that works on two different levels.

One one hand, we've had some feature requests in v2 that were good use cases, but a bit too specific to the user's use-case for us to add them to core.

On the other hand, there are things in core and in a design's configuration that are tightly coupled to FreeSewing's own frontend (on FreeSewing.org) and not really relevant to people using our sortware for other purposes.

In v3, we wanted to get rid of the FreeSewing.org specific stuff and instead give all our users, including ourselves, the possibility to extend the software with the features they needed for frontend integration.

Designs now no longer ship with any freesewing.org specific info, but more importantly, plugins can now further extend core with *store methods*. We've also extended to available lifecycle hooks to let people hook into the drafting process at different times in a pattern's lifecycle.

We also allow overloading of both options and the store with additional information to facilitate frontend integration.

Last but not least, we've improved the logging process as well as allow people to plug in their own log handlers. 

## New in the core API

The core API is -- for the most part -- unchanged in v3. What's changed is covered in [the migration guide](/guides/v3/migration).
But there's a bunch of new things, and here is the list:

### New attributes

The following attributes have been added to the core API in v3:

#### On the `Pattern` object

- [Pattern.designConfig](/reference/api/pattern#pattern-attributes)
- [Pattern.patternConfig](/reference/api/pattern#pattern-attributes)
- [Pattern.setStores](/reference/api/pattern#pattern-attributes)

### New methods

The following methods have been added to the core API in v3:

#### On the `Attributes` object

- [Attributes.addClass](/reference/api/attributes/addclass)
- [Attributes.asPropIfPrefixIs](/reference/api/attributes/aspropifprefixis)
- [Attributes.render](/reference/api/attributes/render)
- [Attributes.renderAsCss](/reference/api/attributes/renderascss)
- [Attributes.renderIfPrefixIs](/reference/api/attributes/renderifprefixis)

#### On the `Part` object

- [Part.hide](/reference/api/part/hide)
- [Part.setHidden](/reference/api/part/sethidden)
- [Part.unhide](/reference/api/part/unhide)

#### On the `Path` object

- [Path.addClass](/reference/api/path/addclass)
- [Path.addText](/reference/api/path/addtext)
- [Path.hide](/reference/api/path/hide)
- [Path.setClass](/reference/api/path/setclass)
- [Path.setText](/reference/api/path/settext)
- [Path.setHidden](/reference/api/path/sethidden)
- [Path.smurve](/reference/api/path/smurve)
- [Path.smurve_](/reference/api/path/smurve_)
- [Path.unhide](/reference/api/path/unhide)

#### On the `Pattern` object

- [Pattern.addPart](/reference/api/pattern/addPart)
- [Pattern.getConfig](/reference/api/pattern/getConfig)


#### On the `Point` object

- [Point.addCircle](/reference/api/point/addcircle)
- [Point.addText](/reference/api/point/addtext)
- [Point.setCircle](/reference/api/point/setcircle)
- [Point.setText](/reference/api/point/settext)

#### On the `Store` object

- [Store.extend](/reference/api/store/extend)
- [Store.push](/reference/api/store/push)
- [Store.remove](/reference/api/store/remove)

## Changes for developers

- FreeSewing is now ESM-only
- We use named exports instead of default experts
- We've switched from Rollup to Esbuild for our bundler
- FreeSewing v3 requires NodeJS 16 or more recent

<Fixme compact>This guide is a work in process</Fixme>
