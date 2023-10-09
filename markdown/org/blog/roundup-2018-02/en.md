---
author: "joostdecock"
caption: "Your new login background for the month of March"
date: "2018-02-28"
intro: "This is your monthly roundup of the freesewing news of the last four weeks, and a look at what lies ahead in the next month."
title: "Monthly roundup - February 2018: Core 1.7.0 with Sven, Carlton, and Carlita improvements. Plus GDRP, vim, and Jaeger"
---

This is your monthly roundup of the freesewing news of the last four weeks, and a look at what lies ahead in the next month.

## Looking back at February

I had this secret ambition to release a new pattern every month this year. 
It's only February and that plan seems to already have gone off the rails. 

Let's look at the things that did happen in February before we talk about what didn't.

### Core v1.7.0 is out

Earlier today, I pulled the trigger on core release 1.7.0. 
As usual, [the changelog](https://github.com/freesewing/core/blob/develop/CHANGELOG.md#170)
has all the info, but most significant to users are 
[the new ribbing options in the Sven pattern](/docs/patterns/sven/options#ribbing), as well as 
a bunch of additional improvements to Carlton/Carlita. 

Those Carlton/Carlita improvements are driven by the fact that myself and [Anneke](/showcase/maker/annekecaramin)
have started to work on [the documentation
for these patterns](/docs/patterns/carlton/). 
And every time we write something like *apply fusible interfacing here*, we also go back to the pattern to
mark exactly where this fusible needs to go.

Needless to say, that's a bunch of work. But it should help with the construction of these coat patterns,
especially for those people for which this is their first time making a coat.

### GDPR battle plan

I don't want to make it sound like writing a blog post is an achievement these days, but
I do think [our *GDRP battle plan* blog post](/blog/gdpr-plan) is worth mentioning because
these are important developments, and the workload this generates is significant.

While nothing is set in stone yet, the post outlines our plan to tackle GDRP-compliance, 
something which we'll be focusing on in the next months.


### Vim snippets for freesewing core

In [a blog post that is the embodiment of the term *niche*](/blog/core-vim-snippets) we announced the 
availability of a vim plugin that provides freesewing core specific snippets.

Essentially, IF you want to develop patterns and IF you use the vim editor, these are for you.

Arguably, that's a lot of ifs.

### Jaeger sneak preview

Meet Jaeger, the sports coat pattern that I hoped to release this month.

![Jaeger is ready, but I haven't made one yet](jaeger.png")

Those of you with good memories may remember that I mentioned last month that I would
perhaps release this during February. Although back then it still went by a different name.

As I also foreshadowed last month, I did not find the time
to make one.
As a matter of fact, my most problematic bottle neck in designing new patterns seems to be finding the
time to actually make them. Which is all the more problematic with a pattern as involved as a jacket.
Truth be told, I'm still not sure where I found the time to make that Carlton coat.

Anyway, all this to say that the pattern is ready, except that I've never made the latest version of it. 
And I feel like I can't release it like this.

So, if you'd like to make a muslin of this --- or even the real thing --- let me know in the 
comments, and I'll make sure we'll get you a draft. 

That might also help moving this pattern release forward, for I already know I won't have much time
to work on a jacket next month.

Speaking of which...

## Looking ahead to March

I have two weeks of holiday in March (Yay!) the largest part of which I'll be in Bangkok (more Yay!).

That means I won't be doing much sewing next month, but there should be some quality time for me and my laptop,
so I wanted to tackle one of the larger items on my mid-term todo-list.

My initial plan was to rewrite core, you can find some details 
[in this ticket on the matter](https://github.com/freesewing/core/issues/236)

However, looking ahead at the months to come, the most pressing issue is that looming GDPR deadline in May which
will also require a lot of work.

So, I figured it would make more sense to tackle another thing on the todo list of lofty goals: rewrite the frontend.

Rather than add yet another pile of jQuery code to handle all the GDPR stuff, the idea is to fork the frontend 
and port it to [vue.js](https://vuejs.org/). For this too, [there is an open issue where you can follow its progress](https://github.com/freesewing/site/issues/311).

Given that I have zero experience with vue.js, this should be fun. If you'd like to help out, please leave a comment.

