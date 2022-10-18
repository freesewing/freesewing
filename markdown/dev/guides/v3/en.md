---
title: FreeSewing version 3
---

Since August 2022, we've been working on the next major version of FreeSewing:
version 3 (v3).  This guides presents a high level overview of the changes that
are going into v3, why we're making them, and what to expect.

<Fixme compact>This guide is a work in process</Fixme>

If you're looking for a more hands-on list of changes between v2 and v3, please
refer to [the v3 migration guide](/guides/v3/migration).

Once v3 is in production, these guides will become less relevant. For now,
short of reading the code itself, they are your best source for the inside
scoop on v3, unless you want to read the source code of course.

## Why a version 3 in the first place?

Before diving into the details, let's take a moment to go over some of the
reasons why we decided to start work on v3, rather than keep working on the v2
branch of FreeSewing.

FreeSewing practices [semantic versioning](https://semver.org/), which means
that breaking changes require a new major version.  In more practical terms, it
means that new features or ideas that would require breaking changes are put on
the back burner until enough of them accumulate that they start making a
compelling case for putting out a new major version.

For FreeSewing v3, [our contributor call on 20 August
2022](https://github.com/freesewing/freesewing/discussions/2582) marks the
moment we decided that enough of our plans and ambitions were being held back
by our inability to introduce breaking changes. So we agreed to turn the page
and start working on v3.

## High-level goals

### Support for packs

The main driver for v3 was what was listed on [our
roadmap](https://github.com/freesewing/freesewing/discussions/1278) as *Support
for packs*. The idea initially focussed on publishing collections of re-usable
pattern parts such as a *sleeve pack* or a *collar pack*. You would then be
able to create new designs by combining a collar from the collar pack, some
sleeves from the sleeve pack and so on.

As we itterated on this idea, it became clear that there was little added value
in creating another type of container (a *pack*) and that it would be better if
we made it easier to treat each design as a *pack*. In other words, allow
people to combine parts from different designs in a seamless way.

Design inheritance was already possible in v2, but because the configuration
was handled on the design level, it required careful re-confiruration of
(required) measurements, options, part dependencies, and so on. It was
possible, but came with a lot of friction. 

So in v3, all configuration is moved to the part level, and a design is now not
much more than a container object for a collection of parts. It is the parts
themselves that configure what they need. Anything from the measurements they
require, the options they provide, the plugins they use, and so on.

This way, you can pull a part out of a design and all of its configuration,
dependencies, plugins, and so on will follow.

This migration of the configuration from the design level to the part level is
the biggest and most fundamental change between v2 and v3. It is also where
most of the work needs to be done to port existing designs from v2 to v3.

### Improved developer experience

The effort to improve the developer experience started already in v2. We've
shipped a new development environment based on NextJS (previously we used
Create React App) and have designing patterns more frictionless both for
stand-alone development, as well as for people working with(in) [our
monorepo](https://github.com/freesewing/freesewing).

We've also switched from Rollup to Esbuild as our bundler, and in the process
dumped Babel.

However, some of the changes we wanted to make to simplify things would have
been breaking changes, so they were put on hold. Until now that as.

For example, in version 2, we shipped both CJS and ESM modules, and we relied
on default exports.

In version 3, FreeSewing is ESM-only and we only use named exports in the code
we publish as they provide better IDE integration.

For many of our users, these choices are deep enough under the hood that they
are unconcerned by them.  But for contributors, things have gotten a lot more
approachable. For one thing, we are also porting our websites to NextJS so that
there's only one frontend development framework to familiarize yourself with. 

Together, these changes not only provide a better developer experience, a more
unified approach, they've also slashed our build times.  In that sense, v3 is
(for now) the final chapter of our efforts to provide a better developer
experience.

### Multisets, Stacks, and better support for sampling

Sampling is when FreeSewing drafts a number of variations of a given pattern
and allows you to compare them by stacking the parts on top of each other. In
v2 this was bolted on as an afterthought, and as such implemented in a somewhat
hackish way.

In v2, only paths are sampled and you can't compare list options among other
restrictions.  Improving this and making sampling cover the entire spectrum
of what goes in a design has been on our roadmap for a while, but we were not
able to do much without introducing breaking changes.

To handle this use-case in v3, we've added two new features that together open
up a range of possibilities.  One is support for multisets, the other is
support for stacks.

Multisets means you can pass a number of different sets of settings to a
pattern and core will draft the pattern for each set of settings.

Stacks allow you to designate different parts of your pattern --- or parts
across different sets of settings --- as belonging to the same stack. When it's
time to layout your pattern, core will stack them on top of each other, a bit
like layers.

These two new features not only make sampling a lot more straight-forward, they
also allow other possibilities such as drafting a pattern for two sets of
measurements when dealing with an asymmetric body.

### Provide more generic extending capabilities, rather than tight-coupling with our frontend

This is something that works on two different levels.

One one hand, we've had some feature requests in v2 that were good ideas, but a
bit too specific to the user's setup for us to add them to core.

On the other hand, we had things in core and in a design's configuration that
were tightly coupled to FreeSewing's own frontend (on FreeSewing.org) and not
really relevant to people using our software for other purposes.

In v3, we wanted to keep our core library fully neutral. FreeSewing.org should
not be a *special* case, so all the FreeSewing.org specific stuff had to go.
Instead, all our users, including ourselves, should have the possibility to
extend the software with the features they need for frontend integration.

Removing the FreeSewing.org specific stuff means that designs now no longer
ship with any FreeSewing.org specific info.  Instead, plugins can now further
extend core with *store methods*, and we allow passing any data into the
design that you can then access on the pattern object.

You can also add additional data to your part's options to further facilitate
frontend integration.  We've also added more lifecycle hooks to let people hook
into the drafting process at different times in a pattern's lifecycle.  And
we've improved the logging process as well as allow people to plug in their own
log handlers. 

These changes make our core library less opinionated about how it should be
integrated, and we're excited to see what people will come up with.

## New in the core API

The core API is -- for the most part -- unchanged in v3. What's changed is
covered in [the migration guide](/guides/v3/migration).  But there's a bunch of
new things, and here is the list:

### New attributes

The following attributes have been added to the core API in v3:

#### On the `Pattern` object

- [Pattern.activePart](/reference/api/pattern#pattern-attributes)
- [Pattern.activeSet](/reference/api/pattern#pattern-attributes)
- [Pattern.designConfig](/reference/api/pattern#pattern-attributes)
- [Pattern.designConfig](/reference/api/pattern#pattern-attributes)
- [Pattern.patternConfig](/reference/api/pattern#pattern-attributes)
- [Pattern.setStores](/reference/api/pattern#pattern-attributes)

### New methods

The following methods have been added to the core API in v3:

#### On the `Attributes` object

- [Attributes.addClass](/reference/api/attributes/addclass)
- [Attributes.asPropsIfPrefixIs](/reference/api/attributes/aspropsifprefixis)
- [Attributes.render](/reference/api/attributes/render)
- [Attributes.renderAsCss](/reference/api/attributes/renderascss)
- [Attributes.renderIfPrefixIs](/reference/api/attributes/renderifprefixis)

#### On the `Part` object

- [Part.hide](/reference/api/part/draft/hide)
- [Part.setHidden](/reference/api/part/draft/sethidden)
- [Part.unhide](/reference/api/part/draft/unhide)

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

- [Pattern.addPart](/reference/api/pattern/addpart)
- [Pattern.getConfig](/reference/api/pattern/getconfig)


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

