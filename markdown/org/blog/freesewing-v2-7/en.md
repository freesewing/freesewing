---
author: 1
caption: "Photo by Deeana Creates from Pexels"
date: "2020-07-12"
intro: "We've just release FreeSewing v2.7 🎉"
title: "FreeSewing v2.7: Titan, changes to measurements, and a long list of improvements"
---


We've just release FreeSewing v2.7 🎉

There's a lot of work that went into this release, and unfortunately it  also will cause some breaking changes to your existing patterns and people, but it's all for the better.

Let's have a look at what's new:

## Titan trouser block

I have lost count of the number of times I have started working on a trouser block over the last couple of years. It's something that's been on my to-do list for a long time, yet despite several attempts at making it happen, I hadn't come up with something that I was happy with.

That's because designing trouser patterns is hard. Making sure things fit, while also guaranteeing that inseam, outseam, and cross seam are all the same length is no walk in the park. Especially if you want a pattern that will seamlessly adapt to different sizes and models.

It would have probably lingered on my to-do list a while longer, but in February, Debra reached out to me and proposed we would come up with a pants sloper together. I love teaming up with people because it a great way to stay motivated, so over the next 4 months or so, we worked on what Debra has named [Titan](/designs/titan/), a dart-free unisex trouser block. I'd like to thank her for her patience and contributions to make Titan a success

<Note>

###### Help us out: Make a Titan muslin 

A block is just that, a block or sloper. Our next steps are obviously this spin this into a number of different trouser patterns. Before we get to that though, we'd like to see how Titan performs on a variety of bodies.

So if you could whip up a muslin of a made-to-measure Titan and let us know how it went, that would be wonderful.

</Note>

## Shoulder slope — again — and other changes to measurements

We've made changes to the different measurements on the site. The roughly fall into 3 categories:

 - We've made *waist* the basis for vertical measurements
 - We've changed the shoulder slope measurement
 - We've simplified the language and terms

As a result, some vertical measurements that were not based on the waist are not gone (hips to upper leg for example). Other measurements have been renamed under the hood to make things simpler, but unless you're a developer, you don't need to worry about that.

An important change is the one we made to the shoulder slope measurement. It's historically been a measurement that is hard to measure, and the changes we've made before to try to address that were in retrospect a bad idea.

We've changed it again, but this time around, shoulder slope is measured as you would expect a slope to be measured: in degrees.

This required some changes as up until now all measurements used the same units, but things should be ok now.

As a result of all these changes and measurements, there's two things you should know:

 - The people you have in your account will have their measurements updated (when the names changed) or removed (where the measurement is no longer used, or we changed how to measure it)
 - Patterns that you have saved in your account that use some of the changed measurements will no longer work. However, we've kept them in your account so that if you want, you can extract the data, and re-draft them for the new measurements. Feel free to reach out if you need assistance with that.

<Tip>

We've migrated our backend to these new measurements, but you are likely to still have some of the old stuff cached in your profile.  
To get around this, you should probably [reload your account](/account/reload/).

</Tip>

## Frontend changes

We've made a few changes to the website too. 

 - We've added a [pattern notation guide](/docs/about/notation/) to take the guesswork out of what those markings on your pattern mean.
 - We've added a [reload account](/account/actions/reload/) page to help you avoid issues due to cached account data
 - We've changed the styling of the different sizes when you compare a pattern, as well as included a legend showing which outline corresponds to which size.


## And many more changes under the hood

As I said, a lot of work went into this release. See our [monorepo changelog](https://github.com/freesewing/freesewing/blob/develop/CHANGELOG.md) for all the details.

