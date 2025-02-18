---
date: "2024-07-01"
edition: "2024q3"
intro: "Welcome to the 2024 Summer edition of the FreeSewing newsletter."
title: "2024 Summer edition"
---

Welcome to the 2024 Summer edition of the FreeSewing newsletter.

Here's what we've cobbled together for you on this first day of July:

- 💰 Vercel unilaterally cancelled our open source sponsorship, now what? (2-minute read by joost)
- 🚢 Why FreeSewing 3.3 is delayed, and why you probably don't care (1-minute read by joost)
- 🇨🇭But can you swizzle it? (3-minute read by joost)
- 🤖 No AI was used to create this newsletter (only to translate it) (1-minute read by joost)

Shall we get started?

&nbsp;  

&nbsp;

&nbsp;  

&nbsp;

## 💰 Vercel unilaterally cancelled our open source sponsorship, now what?

On the 18th of June, we received the following email:

> *Hey there,*
>
> *Your team FreeSewing is currently enrolled in the Vercel sponsorship program.*
>
> *Your 100% off discount is expiring on June 14. To give you time to handle this transition, we will automatically enroll your team into a $300/mo discount for the next 6 months, starting on June 14 and ending on December 14.*
>
> *Thank you for partnering together with us.*

I should start by stating the obvious here: Vercel has graciously sponsored our
hosting and deployments for a while now, and we're obviously very appreciative
of that.

That being said, the message is a bit ambiguous to the point of misleading.
For starters, we're not the only open source project to have received this
email.  A little Googling shows others piping up who [received a
[similar](https://x.com/Siddhant_K_code/status/1801447290076545099)
[message](https://www.reddit.com/r/nextjs/comments/1dfh7ak/vercel_just_ended_my_opensource_sponsorship/?rdt=41666). 

What seems misleading is that Vercel makes it sound like the deal _expired_.
But it seems more than a bit curious that all the reports I find about this are
all expiring at the exact same date (14 June).

Given that Vercel [no longer offers
sponsorship](https://vercel.com/guides/can-vercel-sponsor-my-open-source-project),
this feels like they decided to revoke the deal, and offer a 6-month credit to
ease the transition.

So while -- once again -- we are appreciative for the free service we've
received, the messaging about these changes seems to muddle the waters 
about their reasons for doing do, as well as create uncertainty about what
will happen next.

We are now in the transition period where they will reduce our monthly bill by
$300 for the next 6 months.  So we didn't have any opportunity to act
beforehand, given that the email reached us 4 days after the transition period
started.

So we'll keep an eye on things, consider alternatives and our options, but we
may very well need to move some things around before December 14 rolls around.
How this will impact our finances remains to be seen.


&nbsp;

---

&nbsp;


## 🚢 Why FreeSewing 3.3 is delayed, and why you probably don't care

FreeSewing 3.3.0 is going to be the biggest release since 3.0. That is, when it
will get released because it's been somewhat stuck for a while.

Eagle-eyed FreeSewing users might have noticed that if you generate a pattern
on [FreeSewing.org](https://freesewing.org/) today, it carries the version
number `v3.3.0-rc.1`. That `rc` stands for _release candidate_, which signals
that this is prerelease that we plan to at some point release as 3.3.0, but
we're not there yet.

The reasons we're not there yet have everything to do with our efforts to
refactor our pattern editor -- more on that lower down this newsletter -- but
these changes are being carefully kept isolated so that in the meanwhile we can
just continue to offer the latest and greatest of our work on FreeSewing.org.

So, you might continue seeing that `v3.3.0-rc.1` version for a while, or you
might see a `v3.3.0-rc.2` or something, but rest assured that eventually,
v3.3.0 is on its way.

But once again, if FreeSewing.org is how you consumer our software, you have
nothing to worry about.


&nbsp;

---

&nbsp;

## 🇨🇭 But can you swizzle it?

As mentioned a few paragraphs up, the reason version 3.3.0 is delayed is
because we are refactoring our pattern editor. Our motivation for this is that
when we carried version 3 over the finish line, there were so many changes in
core, designs, backend, and frontend that it was a mountainous task to tie them
all together in a new FreeSewing.org.

That is also why, at that time, we transplanted our previous pattern editor
without too many changes. I can honestly say that at the time, I just did not
have enough fuel left in the tank to tack that on to the end of the long march
towards v3.

We also opted to share code between our different web
environments, so not only FreeSewing.org but also
[FreeSewing.dev](https://freesewing.dev/) and out stand-alone development
environment.  Sharing code like that makes perfect sense, if you to handle dark
and light mode for example -- or different themes altogether -- there's no need
to re-implement that logic for each web environment.

Our pattern editor is part of that _shared_ code, but it is of course a good
bit more complex than handling themes.  In principle the idea is still solid,
but the practicalities of how it has been implemented are starting to slow us
down.

For one thing, it's easy to make changes to the editor that will break
something else.  The stand-alone development environment for people looking to
develop new patterns being the number one victim of such breakages.

But just because it's easy to break it does not mean its... easy.  If anything,
it's rather complicated to wrap your head around which creates an enormous
hurdle for contributors to overcome, so it's only the most fearless who dare to
go there.

If I ever want to retire, we need to make it easier to understand, and easier
to change.  That was the main driver for creating a feature branch and setting
out on the slightly daunting task of re-implementing it.

But there's another reason too. Because we sometimes get questions like _can I
integrate this in my own website to sell my own patterns?_ to which the answer
is _yes, but ... it's not easy_.  I wanted to make that easy -- or at least
easier -- which includes the ability for people to use our pattern editor, but
make it their own.

In other words, have something ready to go that you can plug-in, but also have
the flexibility to change those parts of it that you'd like to see differently.
Which is where _swizzling_ comes in. To swizzle is to change an implementation
with something else, typically changing a default implementation with something
custom at run time.

Let's say you want to use our pattern editor, but you really don't like the
icon use for seam allowance. Well, you can just _swizzle_ that icon by passing
in your own version, or of course something more ambitious.

The end goal will be a React component that we publish on NPM that you can
just pull in to your project, to then potentially override certain (sub-)
components of it.

It's a work-in-progress, but today it already supports swizzling of 143
components (there's a lot that goes in a pattern editor).  But you'll be also
able to swizzle various hooks, for example the one that handles the editor
state. Although it's worth pointing out that we already support 4 state
backend: local storage, session storage, URL anchor state, and native React
state.

You will also be able to swizzle the various methods we use, like to provide
translation, round numbers, and so on.

While that is (should be?) exciting for people looking to build with
FreeSewing, the main goal here is to have a foundation that is stable yet
flexible enough to build cool stuff on. It's something that I for one
are really excited about.

&nbsp;

---

&nbsp;

## 🤖 No AI was used to create this newsletter (only to translate it)

If you're anything like me, you can't hear anything over the sound of your eyes
rolling when people start talking about _AI_ but still, I need to clarify
something.

FreeSewing has a team of volunteer translators who do great work to make sure
that as many people as possible can enjoy the fruits of our labour.  The way it
works is that we write everything in English first, and then they go to work to
translate it bit by bit.  If some parts haven't been translated yet, we just
fall back to the English content.

This works great for the website, where the bulk of the material is already
translated and when something new gets added, it eventually will get translated
too and with a bit of delay everything is OK.

It does _not_ work well for this newsletter, and that is of course like
everything else wrong with FreeSewing entirely my fault.  You see, I am lazy to
a fault and to make matters worse, I tend to work better towards a deadline.
Which means that it is now -- checks the clock -- coming up to 17:00 on the day
the newsletter has to be sent out, and I'm still writing it.

Suffice to say that this leaves absolutely no time for people to translate my
ramblings, so I then tend to revert to using a machine translation instead.  I
know our translators _hate it_ when I do that because it reflects poorly on all
their hard work.
  
So, if you are reading this as a non-English edition and you find the
translation lacking, rest assured it's all my fault and our translators are not
to blame.


joost


