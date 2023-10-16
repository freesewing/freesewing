---
author: "joostdecock"
caption: "Your new login background for the month of october"
date: "2017-09-30"
intro: "This is your monthly roundup of the freesewing news of the last four weeks, and a look at what lies ahead in the next month."
title: "Monthly roundup - September 2017: Simon complications, email issues, and donations are up this year."
---

This is your monthly roundup of the freesewing news of the last four weeks, and a look at what lies ahead in the next month.

## Looking back at september, and a bit of august
For this first edition, I'm looking back a bit further than one month, because [this site launched at the end of August](/blog/open-for-business/), so I'm including that week in this monthly roundup. 

### My name is Simon, and I'm complicated

Since the launch, there's been [3 new path releases of freesewing core](https://github.com/freesewing/core/releases) --- you know, the thing that actually generates your sewing patterns --- and all of them were due to issues with [the Simon Shirt pattern](/patterns/simon).

Full details are available in [the changelog](https://github.com/freesewing/core/blob/develop/CHANGELOG.md), but here's the gist of it:


 -  The seam allowance at the hem was incorrect when the lenthBonus was very low.
 -  The cut in the sleeve for the placket was too short
 -  There was a problem with the seam allowance at the buttonhole placket
 -  The sleeve length bonus was counted double
 -  The hip measurements/ease was not taken into account;  The chest measurement/ease was used instead
 -  A number option defaults were tweaked
 

Thanks to [Tatyana](/users/yrhdw) and [Stefan](/users/kczrw) for reporting these issues. You get that funky bug badge:

![I really like this one](https://posts.freesewing.org/uploads/badge_found_bug_d7d0c9055a.svg)

#### What's your problem Simon?

That these issues surface in Simon is not a coincidence. The pattern comes with a whopping 41 options that allow you to control pretty much every aspect of your shirt. 

Managing all those different combinations in the code leads to a lot of complexity. And were code complexity rises, bugs appear.

![If Simon was on facebook, its relationship status would certainly be *It's complicated*](https://posts.freesewing.org/uploads/complicated_d8c872358d.gif)

#### Is it time for an overhaul?
Simon is a port of the Singular Shirt pattern of MakeMyPattern.com. Back there, making a differently styled shirt would have involved copying the code over, making changes, and then maintaining two slightly different variations for all eternity.

Things are better here at freesewing, where inheritance is baked in the system.
So I could (and should perhaps) have a basic shirt pattern, and then branch that out into a bunch of differently styled shirt patterns.

 - Brian Body Block
   - Basic shirt pattern
     - Casual shirt pattern
     - Formal shirt pattern
     - Some other shirt pattern

It would not only cut down on code complexity, it would arguably also be more intuitive to see a bunch of differently styled shirt patterns, rather than have only one pattern and then have 41 options to juggle.

A full Simon overhaul is going to be a bit of work, but it is possible. I'd be interested to hear your thoughts on the matter.


## Dealing with email delivery issues
I added a workaround for those of you who had trouble getting the registration emails. Basically, people with an email account managed by Microsoft.

![If these guys run your inbox, then who knows what other emails you're not getting](msft.gif)

You can read [my blog post on the matter](/blog/email-spam-problems/) for all the details, but basically if you have one of those addresses, you should get those emails now. The only downside is that you might get them twice.
 
## Referrals
When people link to your site, and visitors click that link, that's called a referral. The bloggers among you might be familiar with skimming through your Google Analytics reports to see who's been linking to you.

This site does not use Google Analytics --- there's [a blog post with details on that](/blog/privacy-choices/) too --- but still captures referrals. The overview of recent referrals is available for all to see on [the status page](/status). 

Linking to freesewing.org is obviously a nice thing to do, so I keep an eye on the referrals, and if a site shows up that belongs to a user, you get the Ambassador badge. 

![Linking to freesewing.org is one way to unlock the ambassasor badge](https://posts.freesewing.org/uploads/badge_ambassador_3dd1e722cc.svg)

It's a small way to say thank you for spreading the word about freesewing.

## Donations
During september, we passed last year's donations amount, so it's nice to see I'll be able to [send more money to MSF](/about/pledge#donations-history) this year than in 2016.

You can always keep track of the donations on [the donations pledge page](/about/pledge#donations-history), but here's the current status:

![Yay! Better than last year](https://posts.freesewing.org/uploads/donations_68e214d133.svg)

## More download formats

I've also added additional formats to the draft download page. You now have a choice of SVG, PDF, letter-PDF, tabloid-PDF, A4-PDF, A3-PDF, A2-PDF, A1-PDF, and A0-PDF.

## The quality control badge
I've added the quality control badge for things like reporting (or fixing) typos, broken links, grammar, and other small improvements.

![See a typo? Let me know and you get this](https://posts.freesewing.org/uploads/badge_quality_control_6acb8c10c2.svg)

These might not seem like an earth-shattering contribution, but they are important nevertheless.

On the spectrum between endlessly toiling over the perfect content before publishing it, or getting it out fast warts and all, I lean heavily towards the latter. 
So I kinda count on you guys to let me know when I messed up.

## Looking ahead to october

There are 5 patterns I am currently working on. And all of them are ready to the point where I need to make them to verify that they work as intended. First a muslin, and then the real thing.

That's a bit of a bottleneck for me because I have a long commute, so my sewing time is typically limited to the weekends. 

The only way I see to speed up the process of getting patterns released is to have people join in with the pattern testing. I don't think it's something I can ask people to do, because this is early stage testing. Not to mention that I have nothing to offer them to sweeten the deal. What am I going to give you, a free pattern?

Still, on the off chance that some of you want to help out by making a muslin and letting me know how it went, here's what's currently on my drawing board:

 - A trouser block for men that should be better than Theo(dore)
 - A block for selvedge jeans for men
 - A zip-up hoodie for men
 - A wintercoat 
 - A unisex leggins pattern

Should any of you want to make one of these as a test, [let me know](/contact), it would really help me out. 

