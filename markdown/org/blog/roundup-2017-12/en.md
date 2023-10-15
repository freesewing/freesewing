---
author: "joostdecock"
caption: "Your new login background for the month of January"
date: "2017-12-31"
intro: "This is your monthly roundup of the freesewing news of the last four weeks, and a look at what lies ahead in the next month."
title: "Monthly roundup - December 2017: Patrons, Bent, Carlton, Florent, and the looming Inkscape issue"
---

This is your monthly roundup of the freesewing news of the last four weeks, and a look at what lies ahead in the next month.

## Looking back at December
As you may or may not know, for freesewing the year starts on December 10th.
This way, I only have to write this blog post on New Year's eve, rather than roll out a bunch of new changes.

What changes? I'm glad you asked:

### We have patrons now

This was really big news for me, and something that we had been working on behind the scenes for a good while.
But 3 weeks ago, we finally unveiled our new patron system.

The [announcement blog post](/blog/calling-all-patrons/) has all the details, plus an open-hearted look at the
financial side of this project. If you haven't read it yet, I recommend it.

![Spreading the word about our new patron approach](https://posts.freesewing.org/uploads/patrons_ig_bad479bb83.png)


The gist of it is that we are building a bedrock of loyal supporters to ensure a 
sustainable future for freesewing.org, our code, our patterns, and our community.

These people are our Patrons, and they support us with a small monthly contribution.
We have three tiers, and they all come with their own prices and perks. You can find all the info
on [the patrons sign-up page](/patrons/join).

We are 3 weeks in now, and so far [25 people](/patrons) have shown their support for this project by becoming a patron.

Needless to say, this is truly wonderful news that we're all very excited about.


### A logo tweak

The roll out of our patron system had an unforeseen side-effect: We needed to simplify the freesewing logo a bit 
so we could order all that swag with the logo on it.

![The new logo](https://posts.freesewing.org/uploads/logo_cb4d9e16ca.svg)
![The old logo](https://posts.freesewing.org/uploads/old_logo_flag_cbfc5a5ff1.png)

Turns out there's a limit to the amount of detail you can get embossed into jeans rivets or buttons, or woven into labels.
(that's just some of the swag our patrons get).

So, we've streamlined the logo a bit. It's been on the site and our social media accounts since December 10th, but 
we hadn't updated our auto-generated avatars yet. That's something we've managed to squeeze in in the last hours of 
December (and the year) so that's good too.

### New patterns

We've had three (yes 3) pattern releases in December. 

[Florent](/patterns/florent) is a flat cap pattern that was contributed by 
[Quentin](/users/ptzcb). The [announcement blog post](/blog/florent-flat-cap-beta/) has all the details.

Then later this month, we published [Carlton](/patterns/carlton) and [Bent](/patterns/bent), the block it's based on.
I've worked with [Anneke](/showcase/maker/annekecaramin) to make this pattern happen, and a female version of the coat is coming. 
You know what, you should probably read all about it [in this blog post](/announcing-carlton-and-bent/).

### Model name and draft reference are now printed on every pattern part

We got a request to add the model and draft info to the printed pattern. People who were using a given pattern
for different people (imagine making a hoodie for yourself and your partner) got confused about which parts belonged to which draft.

That seemed like a good idea to us, so we've added this info to the patterns. If you have an
older draft in your account, you can simply re-draft it to update it.

### Data export

We've grouped a few harder to find pages in a new [Tools](/tools/) entry in the account section of the menu.

It contains a link to our RSS feed of the blog, our on-demand tiler, and a link to remove your account,
but none of those are new, we've just grouped them so they'd be easier to find.

What is new is the ability to export all the data we have on file for you.

This work is in preparation of the changes we'll be making next month, which brings me to:

## Looking ahead to January

There's new patterns in the pipeline, but I'm not ready to commit to a deadline for these yet, mostly because
we have a bunch of other stuff on our plate. Including:

### Open data and privacy talk

We had a bit of a debate about whether or not we should publish anonymized measurements data here at freesewing.

I won't repeat everything here, but [our tweet](https://twitter.com/j__st/status/941586171158777856)
and [Instagram post](https://www.instagram.com/p/Bct2jUEnuS9/) on the topic get a lot of responses.

A vast majority of people supports this idea, and as such we have plans to move ahead with it.
However, if we do this, we want to do it right and completely in the open. 
So expect a blog post on the matter shortly.

The questions that came up as we were discussing the possibility of publishing this data tend to 
revolve around privacy. We are --- and remain --- committed to protecting the privacy or all
our users and visitors, and have written about 
[the choices we have made to guarantee your privacy](/blog/privacy-choices/).

Thinking about these issues made us realize that we want to provide a more iron-clad 
guarantee than a blog post. So, we will draft and publish a privacy notice in line
with the upcoming GDPR.

Don't know what GDPR is? Good. Keep reading.

### GDPR compliance

The GDPR is the [General Data Protection Regulation](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) 
of the European Union.  It replaces the *Data Protection Directive* and is a more ambitious piece of
data protection legislation. 

The GDPR will become active in May 2018, and by that time, freesewing will be ready for it. 
Specifically, we will publish a privacy notice that outlines exactly what happens to your data,
and we will make certain that all your rights are respected.

We are still planning how exactly we will tackle this, and for the most part, these will be cosmetic changes
and that won't change anything about freesewing as such.

But we value your privacy, and we want to practice what we preach, so we'll be making sure to do what's right.

### Core issue #204 - The Inkscape default units quandary

Under the heading *Important changes* the 
[release notes for Inkscape 
version 0.92](http://wiki.inkscape.org/wiki/index.php/Release_notes/0.92#Important_changes) list:

> The default resolution was changed from 90dpi to 96dpi, to match the CSS standard. 

This seemingly trivial update to the open source SVG editor will have some profound ripple effects for freesewing.

While it won't impact our code as such, we use Inkscape to turn the SVG patterns we generate into the PDFs that you
print at home. And if now Inkscape thinks that one inch no longer holds 90, but 96 pixels, your patterns will be
scaled incorrectly, which is kind of a big deal.

Given that we can continue to run an older build of Inkscape to do our bidding, this doesn't mean things are on fire just yet.
But it's a problem we will have to tackle sooner rather than later. 

That's because even when we fix it, once we start using the new Inkscape, it will still incorrectly handle the drafts
that have been generated prior to the fix and that are still stored in people's profiles.   
Needless to say, I see a lot of mucking about with the SVG viewbox in my future.

There's other changes in the newest Inkscape too that can potentially wreak havoc. Most likely to cause a stink-up
is the new way the *line-height* attribute will be handled in text. Less dramatic, but still inconvenient.

While these changes add an unwelcome number of entries to our to-do list, it's worth pointing out that
the Inkscape maintainers make these changes because they thing it's the right thing, and that going forward,
this will be the better option.

So, in the same spirit, we'll make sure to follow suit. 

But that's for next year.

