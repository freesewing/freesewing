---
date: "2022-01-01"
edition: "2022q1"
intro: "Welcome to the 2022 Winter edition of the FreeSewing newsletter."
title: "2022 Winter edition"
---

Welcome to the 2022 Winter edition of the FreeSewing newsletter.
 
Unlike other editions where we drop a Smörgåsbord of blurbs from various contributors in your mailbox, you're going to have to do with just me this time around. That means a bunch of em dashes — everyone's favorite punctuation mark — and I'm happy to report that two paragraphs in I've already managed to squeeze in one of them A's with a circle over it. Nice!

So much for form, let's talk content. Here's what I'll be covering:

 - 🎉 2021 is salted and burned
 - 🧐 What our contributors have been up to in 2021
 - 🎖️ FreeSewing is now an '*all contributors*' project
 - 🚧 Why version 3 has been put on hold
 - 🤓 What I've been up to in 2021
 - 🐛 FreeSewing's bug bounty program
 - ⛑️ Yearly revenue and where it went (spoiler: same as always)
 - 🤞 What I hope will happen this year

Y'all ready for this? Let's do it.

&nbsp;  

&nbsp;  

## 🎉 2021 is salted and burned

Well yes I binge-watched all 15 seasons of [Supernatural](https://en.wikipedia.org/wiki/Supernatural_(American_TV_series)) this year because what else were we supposed to do, locked in our homes as we were. And if that dreamboat Dean has taught me anything, it's that you should salt, then burn whatever you want to get rid of for good.

I don't mean to say there was nothing good about 2021. As a matter of fact, within the context of FreeSewing it was another absolutely fantastic year. 

But I find it in poor taste to be jubilant about a year that for many people was — yet again — about hanging in there and dealing with the many-faced monster that is the COVID pandemic.

I hope you are all ok and that you did not have to bid farewell to any of your loved ones. I hope that your mental health is resilient enough to deal with all this. And if it's not, then I hope you have people to talk to. If you don't have those, you can talk to me. Hit reply and we'll figure it out somehow. We should not have to deal with any of this on our own, so don't be shy.

With that out of the way, let's look at some of the good things that happened over the course of last year.

&nbsp;  

---

&nbsp;

## 🧐 What our contributors have been up to last year

We put out 53 FreeSewing releases this year, on average more than one per week. It speaks to the continuous churn that goes on in a healthy and thriving open source project. [Work is never over](https://www.youtube.com/watch?v=yydNF8tuVmU), and an ever growing number of people drive FreeSewing forward.

The most visible of those changes are in our growing catalog of designs, with the [Bella Bodice Block](https://freesewing.org/designs/bella/), the [Hortensia Handbag](https://freesewing.org/designs/hortensia/), the [Cornelius Cycling Breeches](https://freesewing.org/designs/cornelius/), the [Charlie Chinos](https://freesewing.org/designs/charlie/), the [Bee Bikini Top](https://freesewing.org/designs/bee/), the [Lunetius Lacerna](https://freesewing.org/designs/lunetius/), the [Tiberius Tunic](https://freesewing.org/designs/tiberius/), the [Walburga Wappenrock](https://freesewing.org/designs/walburga/), and the [Yuri Hoodie](https://freesewing.org/designs/yuri/) all new patterns that were added in 2021.

What I am personally very excited about is that a variety of people were involved in these new patterns, which means the list of people capable of independently cranking out parametric designs is steadily increasing. That is great news for the future.

There is more of course. I think we've added more [showcases](https://freesewing.org/showcase/) this year than any previous year, and [our community on Discord](https://discord.freesewing.org/) is thriving in ways that I never would have dared to imagine.

I'd like to thank all of those people for lending a hand, being part of our community, and just being awesome. If you had told me a couple of years ago that FreeSewing would evolve into a thriving D&D community with a sewing website attached I would not have believed you 😂

&nbsp;  

---

&nbsp;

## 🎖️ FreeSewing is now an '*all contributors*' project

Since we're singing the contributors praise — which I really can't do enough — now would be a good time to point out that FreeSewing is now officially an [all contributors](https://allcontributors.org/) project.

Traditionally, contributions in open source are measured by commits, in other words: contributions to code. The revision control system (git in our case) tracks those contributors automatically, so it's easy enough to pull up a list of people who've pushed code.

But there are many other ways that people contribute to FreeSewing. From translation to proofreading, community building, design work, you name it.

As an all-contributors project, we want to value those contributions in a similar way and so we now maintain a list of contributors rather than relying on get's list of contributors. We are also showcasing that list of contributors prominently both [in our Readme](https://github.com/freesewing/freesewing#contributors-) and on our (future) websites (more on that later).

So anybody who contributes can be added, and should be added. Doing so is a shared responsibility, since the big downside of such a maintained list is of course that we risk forgetting people. If that's the case, do reach out and let us know, we'll be happy to add you.


&nbsp;  

---

&nbsp;

## 🚧 Why version 3 has been put on hold

As you may know, we put out [our roadmap for FreeSewing version 3](https://github.com/freesewing/freesewing/discussions/1278) which reads like a wish list of things people would like to see in the next major release.

After some initial testing-of-the-waters for some of these new features, and I have decided to put v3 on hold for now.

The reason is that many of the things on the wish list don't require a new major version. In other words, we can add them without breaking backwards compatibility. Case in point, several of the v3 proposals/ideas have already been implemented in the current release.

On the other hand, one of the things that will cause breaking changes is moving to ESM-only releases. It gets a bit technical but there's different ways to bundle up your Javascript code, and we currently publish both CJS and ESM bundles. One of the goals of v3 was to move to ESM-only, but I feel that we were putting too many things in this v3 basket making the entire effort an unwieldy affair and difficult to wrap your head around.

So, I'm putting those things that will cause breaking changes (like pure-ESM) on hold until we've implemented all the changes we can already implement today. So by delaying it, we're actually going to see new features sooner because most of the breaking stuff is so far under the hood that you probably wouldn't even notice when it changes.

&nbsp;  

---

&nbsp;

## 🤓 What I've been up to last year

As I mentioned earlier, the fact that more people than ever are now contributing patterns is one of of my personal highlights of the year. But it did not come about by divine intervention. 

16 months ago, at the end of August 2020, I wrote about the challenges of scaling my own labour, and how I wanted to [see FreeSewing grow beyond what I can do on my own](https://freesewing.org/blog/a-call-for-help/).

In retrospect, I feel that post marks the moment where I pivoted from guy-working-on-open-source-thing to an open source maintainer.
My efforts ever since have been preliminary focused on facilitating the work of others, clearing hurdles for aspiring contributors, and simplifying the developer experience.

Which is why I am not concerned that I *only* designed two patterns in 2021. More patterns are always nice, but I prefer to focus on things that are hard for other people to do. Like the [migration to React 17 and Webpack 5](https://freesewing.org/blog/react-17/) which happened in release 2.16 and brought with it an improved developer experience.

But all of that remains on the '*pattern design*' side of things. But there's a lot more that goes into running FreeSewing.

Last summer, I set out to work on [project 2022](https://freesewing.dev/blog/project-2022) in which I wanted to bring a similar easy on-ramp to other aspects of the project. Working on our backend code, our websites, writing blog posts, and so on.

I'm happy to say there's been a lot of progress in this area. Perhaps a good illustration of this is our move to Strapi — a so-called [headless CMS](https://strapi.io/) — for our blog and showcase posts as well as for our newsletter content. Prior to the move, we had several years worth of blog posts, all written by yours truly. Since the move, we've had other people writing blog posts, and I can't even remember last time I published a showcase posts because ever since we moved to Strapi, that's taken care of by others now.

We're also consolidating as much work & code as possible into [our monorepo on Github](https://github.com/freesewing/freesewing) as that makes it easier to wrap your head around the project, and track transversal changes — such as when changes to the website necessitate accompanying backend changes.

Our markdown content and backend code has been consolidated into our monorepo. We were able to [merge our two translation projects on Crowdin into one](https://crowdin.com/project/freesewing), and the efforts started this summer to migrate our frontend code from GatsbyJS to [NextJS](https://nextjs.org/) paid dividends at the last day of the year when I deployed [our new freesewing.dev website](https://freesewing.dev/) in production. 

It's been re-written from the ground up to be better, faster, and perhaps most importantly, easier for people new(ish) to the project to work on, improve, or just see in what novel ways they can break it.

The new FreeSewing.dev was built from the start to share code with what shall become the new FreeSewing.org, so that's something to look forward to this year.

&nbsp;  

---

&nbsp;

## 🐛 FreeSewing's bug bounty program

One of my personal low points of this year was when one of our users reached out because of an issue in their shirt pattern. An issue that I was able to trace back to a regression bug that was triggered by a new feature request we had implemented some time prior.

To have, what I personally consider to be one of our flagship patterns, hobbled by a bug that passed under the radar made my heart sink. I can't help but think about all the people who tried the pattern in the meanwhile, didn't get good results, and in completely understandable fashion most likely concluded that this entire FreeSewing thing is utter garbage.
After all, sewing patterns are traditionally a finished product. Not one that receives numerous improvements and bug fixes throughout the year.


We have taken steps to try and prevent similar mishaps from happening. There's been a significant effort made to increase the number of unit tests that help us spot issues. I wrote a new plugin specifically for this reason that allows us to compare generated patterns across FreeSewing versions/changes. We now also keep sampled output for each and every pattern option under version control, so that we can trace exactly what patterns are being impacted by changes to the codebase.

But, things will still slip under the radar from time to time, which is why we're launching **the FreeSewing bug bounty program**: 

> If you find a bug in one of our patterns, or in our core library, we will (with your permission) add you to our list of contributors, and send you a little something to say thanks.

Obviously, we're no Apple or Google, so we can't fork over cold hard cash as reward, but we have nice stickers, so that's something :)


&nbsp;  

---

&nbsp;

## ⛑️ Yearly revenue and where it went (spoiler: same as always)

Yearly revenue for FreeSewing in 2021 was 10,070.77 euro. In accordance with [our revenue pledge](https://freesewing.org/docs/various/pledge/), it was all donated to [Doctors Without Borders/Médecins Sans Frontières](http://msf.org/).

And, for the second year in a row MSF deployed its teams not just in the South, but also in Europe and the US to help manage the COVID pandemic.

In the hospital where my wife works — one of the main hubs for COVID care in the country — the COVID ward was at one point was even run by teams from MSF as their experience in running healthcare facilities in the middle of a crisis is simply unparalleled.

There were probably similar initiatives and MSF teams working in your vicinity, often under the radar, but always there where they are needed the most.

FreeSewing's revenue is 100% made up of patron contributions, and I feel an enormous depth of gratitude towards those kind-hearted and generous souls who make this possible. 2020 was an absolute bumper year for FreeSewing with an influx of COVID-inspired goodwill pushing our revenue beyond 5 figures for the first time. I did not expect that to hold in 2021 yet once again our patrons delivered.

They are the real heroes of this story. I can't thank them enough.

&nbsp;  

---

&nbsp;

## 🤞 What I hope will happen this year

- I hope we'll be able to rebuild FreeSewing.org and make it better, faster, and more feature-packed
- I hope we'll be able to continue to chip away at gendered terminology, and strive to make patterns that *just work* to support you and how you express yourself
- I hope we'll continue to welcome new contributors who are excited to build this thing together
- I hope we'll continue to bask in the love and support of our patrons so we can pay it forward and help those in dire straits
- I hope you all have a great year filled with health, happiness, and hugs

&nbsp;  

love  
joost
