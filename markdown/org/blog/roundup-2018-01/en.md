---
author: "joostdecock"
caption: "Your new login background for the month of February"
date: "2018-01-31"
intro: "This is your monthly roundup of the freesewing news of the last four weeks, and a look at what lies ahead in the next month."
title: "Monthly roundup - January 2018: Inkscape DPI, version awareness, Bail, and Carlita"
---

This is your monthly roundup of the freesewing news of the last four weeks, and a look at what lies ahead in the next month.

## Looking back at January
![More like this month](https://posts.freesewing.org/uploads/coffee_3f501d4076.gif)

It might be [the record-breaking depressing weather in my neck of the woods
](https://www.theguardian.com/world/2018/jan/19/aint-no-sunshine-winter-darkest-europe),
but I feel like January took a lot out of me. So let's see if we have at least something
to show for it.

### The Inkscape default units quandary

At the start of the year, we rolled out core v1.3.0 to address [issue #204](https://github.com/freesewing/core/issues/204)
aka the the Inkscape default units quandary.

It was a bit of an unusual fix because our hand was forced due to upstream changes made by the
Inkscape developers. In addition, we didn't only have to adapt our code, but also had to backport
the changes to all your existing drafts. 

If you were blissfully unaware of the whole thing, we wrote a blog post about it:
[Freesewing core v1.3.0 is out; Comes with fixes so good that we back-ported them to all your drafts](https://joost.freesewing.org/blog/core-v1.3.0-is-out/).

### Version awareness 

We now keep track of which version of core generated your draft. We roll out fixes and improvements
all the time. So the drafts you have stored in your profile might be outdated.

You are now informed about this, both on the draft's page itself and on your list of drafts.
A simple redraft will upgrade them to the latest version.

> ##### Long-term vision for versioning
> 
> This solution is a step up from the previous situation, but it doesn't allow for very
> granular version control. If you have 10 different Simon drafts stored in your profile, and we
> bump the core version number because we made a tweak to Carlton, all your drafts are marked
> as outdated, even though the changes don't impact them.
> 
> With only a single core version number to depend on, there's no obvious way for us to keep track
> of what changes impact what pattern.
> 
> The long-term plan here is to have a core version number and a pattern version number.
> This way, a version bump in one pattern will not impact other patterns. 
> 
> A version bump in core will still impact all patterns, but there should be far fewer core versions
> once we take all patterns out of core.
> 
> The idea is that every pattern will be in its own repository, and we'll use composer to manage them 
> as dependencies. 
> 
> But this is a long-term idea that won't be implemented until after we rewrite core. 
> Yes, that's another long-term idea.

### Bail for error handling

In the first half of the month, we tried Rollbar for error handling and reporting.
While we liked the functionality it provided, we weren't too happy about the possible impact on 
your privacy of sending that kind of data to a third party.

So, we decided to write our own poor man's rollbar called Bail. Bail is now used in our data
and core backends, so when things break, we know about it. 

This effort also lead to a 2-week side-quest to write tests for our data backend. All details:
[Introducing freesewing bail: A poor man's rollbar --- because privacy](/blog/introducing-bail/)
 
### Carlita is here

A couple of days ago, we released the [Carlita Coat](/patterns/carlita), 
the womenswear version of our Carlton coat.

If you rushed out to get your hands on Carlita, it's good to know that she was released as
part of core v1.6.0 and we're now at v1.6.3, and that is mostly due to fixes and tweaks in
Carlton/Carlita.

If you've got an earlier version of the pattern, please redraft. If you've already printed
it, perhaps have a look at [the changelog](https://github.com/freesewing/core/blob/develop/CHANGELOG.md) 
to figure out what has changed.

If you check the changelog, you'll also see that we started the month on core v1.2.9 and
are now running core v1.6.3, so I don't think it's just an idea that it was a busy month.

## Looking ahead to February

February is a short month so it's probably best to manage expectations. But here's
what I have in mind for it:

### Carlton/Carlita documentation

Quite frankly, this is like pulling teeth to me, so don't expect it to be finished by the
end of February, but I should at least have made some progress on the 
documentation for the Carlton and Carlita patterns.

On a related note, the increasing popularity of this site means I'm a lot more occupied with
various questions, and small issues that need my attention. 

All that feedback is a good thing
for it is how we improve things around here. But I do notice that it is becoming increasingly
difficult to dedicate a larger chunk of time to one specific thing. 
Which is really what you need when tackling larger tasks such as writing documentation
or designing new patterns.

I don't really have a solution for that, I'm just making the observation.

### Maybe a Blake Blazer release

I have a jacket pattern on my drawing board that's been there since the summer (it's called the Blake Blazer).
I really should just take out some time to wrap it up and publish it, but
I've been reluctant to do so because I can't seem to find the time to actually make
the jacket.

I've used the pattern before for 
[my refashioners make this year](/blog/the-refashioners-2017/), 
but that's not exactly
a very representative example.

I don't think I'll find the time to make a jacket in February, but perhaps a muslin is enough
to publish it in beta.

### FOSDEM

![All details on fosdem.org](https://posts.freesewing.org/uploads/fosdem_bb321397cc.png)

[FOSDEM](http://fosdem.org/) --- the Free and Open Source Developers' European Meeting ---
 is on the first weekend of February in Brussels.

I'm planning to be there on Sunday, so if you're attending too, let me know or come and say hi.

