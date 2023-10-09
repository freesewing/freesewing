---
author: "joostdecock"
caption: "Your new login background for the month of December"
date: "2017-11-30"
intro: "This is your monthly roundup of the freesewing news of the last four weeks, and a look at what lies ahead in the next month."
title: "Monthly roundup - November 2017: Benjamin, on-boarding, showcases, and our on-demand tiler"
---


This is your monthly roundup of the freesewing news of the last four weeks, and a look at what lies ahead in the next month.

## Looking back at November
November has been busy around here. While lot of the work has been happening behind the scenes
-- more on that in December -- there's also a list of things that are already rolled out.

Here's the most important changes:

### Meet Benjamin
![Wouter showing off Benjamin](https://posts.freesewing.org/uploads/benjamin_fc9844f4bd.jpg)
First up: a new pattern. The Benjamin Bow tie is [now available](/patterns/benjamin) in beta.

![More bow ties from Wouter's personal stash](https://posts.freesewing.org/uploads/bowties_4f3e05ec53.jpg)

Benjamin is a bow tie, and as I explained in [the announcement blog post](/en/blog/benjamin-bow-tie-beta/) 
this release is kind of a big deal.

That's because it's the first ever pattern to have been contributed by the community.
More specifically, it was [Wouter](/users/xdpug) who designed and programmed the pattern.

So shout-out to him for being the first person to contribute a pattern. And if you
[hang around in the freesewing chat room](https://discord.freesewing.org/), 
you know that he's already started working on his next pattern.


### Better user on-boarding

I've changed the sign-up flow a bit to help people discover all the options they can set in their account.

![The welcome page guides you through your account setup](https://posts.freesewing.org/uploads/welcome_e02a39ca3b.png)

The change is two-fold. First you are now auto-magically logged in
when you click the email confirmation link for your account.

Second, we send you to the welcome page and guide you
through a few steps to finalize your account setup. Specifically:

 - Configure your units
 - Configure your username
 - Configure your profile picture
 - Configure your social media accounts

(More on that last one later in this post) 

All of these settings are available in [your account](/account), but people
frequently don't realize that.
With the new sign-up flow, that should no longer be the case.

> ##### Hey, I never got a handy welcome page like that
> At any time, you can go to [the welcome page](/welcome) 
> to check or update your account settings.

### Mixed units warning

One of the issues that drove the changes to the on-boarding of new users was the 
issue of mixed units.

Mixed units is when your account is configured in metric, but your model is set
to imperial (or vice-versa).

![An example warning when units are mixed between your account and your model](https://posts.freesewing.org/uploads/units_mismatch_warning_058d7de9b4.png)

This is supported. If you make things for other people in other parts of the world,
this flexibility is handy.

But it's a rather niche scenario, and more often than not it's due to the user not 
realizing their units are set as they are.

So now, when you draft a pattern with mixed units, we'll show you a warning box to make
sure that you do actually intend to use mixed units. 

### Per-pattern default seam allowance
The roll-out of Benjamin raised another issue: standard seam allowance.

For a bow tie, the current standard seam allowance (1cm for metric, 5/8" for imperial)
is too large. So Wouter wanted some way to change the standard seam allowance.

![Here too, we've added a little notification to make sure you are aware](https://posts.freesewing.org/uploads/non_standard_sa_warning_e5046e98a7.png)

So, that's what we implemented. Going forward, patterns can set the standard seam allowance
(for both metric and imperial). If they don't, we revert to 1cm|5/8" as before.

Note that this is only the default seam allowance. When you draft a pattern you can still 
set the seam allowance to whatever you like.

### Social media accounts

If you clicked the link to the welcome page, or if you check out the 
settings in [your profile](/profile) you'll see that you can now enter your
username for a few other sites:

 - Twitter
 - Instagram
 - GitHub

No need to worry, [your privacy is in good hands here](/blog/privacy-choices/). 
I am not interested in collecting your data, and the only reason
this is here is because people [asked for it](https://github.com/freesewing/site/issues/184).

![After Quentin added his Instagram and GitHub accounts to his settings, his comment now have links to those accounts])comments-social.png)

Links to your social media accounts will appear on your profile page and along your comments.

### More showcases

We've added a bunch of new [showcases](/showcase) this month.
Every maker that has one or more showcases here on the site has their own page
that lists all their showcases. 

![An example of links on a maker page. In this case, Anneke](https://posts.freesewing.org/uploads/maker_links_8504a1b00d.png)

This month, we've updated those pages with links to the blog and/or social media
accounts of these makers. 
The idea is that people who feel you've made a cool thing can find out a bit more about you.

### Referrer policy, or why you never get any visitors from freesewing.org

We've rolled out the strictest referral policy: `no-referrer`. It blocks all referrer information.

This means that if you run Google analytics -- or some other website statistics tool --
on your blog or website, you won't see traffic from freesewing.org.

![Our referrer policy: No](https://posts.freesewing.org/uploads/no_13049a23c3.gif)

That doesn't mean that people aren't clicking links to your blog, but we simply
block the referrer header from being set, so Google has no idea where people come from.

Why you ask? Because privacy.

### On-demand tiler
When you draft a pattern here, you can download it in a number of formats, all neatly tiled 
so you can print them.

You can also download the SVG source code to make further changes to the patterns.
But once you have made those changes, there's no easy way for you to get it as a printable PDF.

![The on-demand tiler does what you'd expect](tiler.svg)

Well now there is. We've added [an on-demand tiler](/tools/tiler) to the site that does just that.
Upload your SVG, pick the format of your choice, and we'll tile it for you.

## Looking ahead to December

I had hoped to release my winter coat pattern during November, but alas that didn't work out.
I'm actually still making it, and when it's ready there will be a few tweaks required to the pattern
before I can release it.

But that news will have to play second fiddle to our wrap up of the year
(traditionally on December 10th here). It's not just about what happened over the last 12 months,
we'll also be rolling out some changes to safeguard the future of this project.

10 more sleeps :)


