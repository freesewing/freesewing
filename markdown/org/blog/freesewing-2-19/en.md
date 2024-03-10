---
author: 1
caption: "Like history? Then this release is going to be right up your alley."
date: "2021-10-17"
intro: "I've just pulled the release lever on version 2.19 of FreeSewing and there's a lot that went into this release. For full details, you can check out the changelog , here I'll stick to the highlights:"
title: "FreeSewing 2.19 brings Bee, Lunetius, Tiberius, Walburga, a new plugin, and a bunch of improvements and fixes"
---

I've just pulled the release lever on version 2.19 of FreeSewing and there's a lot that went into this release. For full details, you can [check out the changelog](https://github.com/freesewing/freesewing/blob/develop/CHANGELOG.md#2190-2021-10-17), here I'll stick to the highlights:

## Lunetius, Tiberius, and Walburga

[Lunetius](/designs/lunetius), [Tiberius](/designs/tiberius/), and [Walburga](/designs/walburga/) are three new patters from **Rika Tamaike** who is the latest addition to our growing team of designers. These are all historical pattern:

 - Lunetius is a lacerna, a historical Roman cloak
 - Tiberius is a historical Roman tunic
 - Walburga is a tabard/surcoat, a historical garment from medieval Europe

I'm not much of a history buff myself, so I'm looking forward to see what these will look like when people are going to start making them. What I can say for sure is that all of these are pretty straight-forward, so they should be fun to make.

## The Bee bikini

Also new in this release is [Bee](/designs/bee/), a bikini pattern that you can pair with the [Ursula Undies pattern](/designs/ursula/). **Bobgeorgethe3rd** signed for the code, the design of the bikini was a collaboration with **PrudenceRabbit**.

I'm hoping for some people in the Southern hemisphere to make this one because I suspect it might be a while before bikini weather returns to those of use living above the equator.

This too is a fast and simple make, so go and check it out.

## The versionfree-svg plugin

This is a bit more under-the-hood stuff, but we've also published [plugin-versinofree-svg](https://www.npmjs.com/package/@freesewing/plugin-versionfree-svg), a new plugin that will strip the version information from FreeSewing's SVG output.

This is handy because it allows diffing between different versions. By not including the version information, you can see what (if anything) has changed between different versions of a pattern, something we use ourselved in our QA pipeline.

## Backported snap options from the v3 roadmap

Speaking of under-the-hood, the [snap proposal](https://github.com/freesewing/freesewing/discussions/1331) on [our v3 roadmap](https://github.com/freesewing/freesewing/discussions/1278) was something we liked so much that we promptly backported it to v2, and it's already being used in different patterns.

Have fun with the new patterns, and for feedback, questions, or suggestions, [come hang out with us on Discord](https://discord.freesewing.org).
