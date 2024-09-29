---
date: "2024-10-01"
edition: "2024q4"
intro: "Welcome to the 2024 Autumn edition of the FreeSewing newsletter."
title: "2024 Autumn edition"
---

Welcome to the 2024 Autumn edition of the FreeSewing newsletter.

Here's what we've cobbled together for you on this first day of July:

- 🌐 If you're reading this newsletter in anything other than English, I've got some bad news for you
- 🤖 No AI was used to create this newsletter (only to translate it) (1-minute read by joost)

Shall we get started?

&nbsp;  

&nbsp;

&nbsp;  

&nbsp;

## 🤖 FIXME

Without wanting to alarm anyone, I recently suffered a bit of a crisis
feeling completely overwhelmed by all the work that is sitting in my inbox.
It's arguably not really new, and I don't think anyone is waiting for yet another
open source maintainer apologizing for being busy.

However, this was the first time this feeling crossed over from _phew, this is
a lot_ into _I can't do this any longer_ teritory.

It's always darkest before dawn, and now that I've acknowledged that there's a
problem and came up with a plan to deal with it (which I'll get to in a second)
I'm feeling much better already, so no need to worry about me. However, I want
to be open and honest about where these changes are coming from and why I'm 
making them.

What changes? Well, effective immediately, I will work towards making
FreeSewing simpler to maintain, and put more strict boundaries and what we do
and what we don't do.

I've already ported [FreeSewing.dev](https://freesewing.dev/) to
[Docusaurus](https://docusaurus.io/), which makes it a lot easier to maintain.
There will be more under-the-hood changes like these that make our life eaiser,
without creating a material difference to our users.

Unfortunately, that alone won't cut it, so I also intent to drop support
for translation, and only maintain English from now onwards.
This too will go unnoticed for the vast majority of our users, but obviously
not for all of them.

In May 2018, I wrote the following on the subject:

> *I’ve decided to add a new challenge to the mix: i18n.*
> 
> *In case you’re wondering, i18n is short for internationalisation, aka making
> the site available in different languages.*
> 
> *Yes, May 25th will be here soon, and yes I need more work like I need
> another hole in my head. But I feel it’s an important project to try and make
> freesewing.org available to as many people as possible. And for this, we need
> to get rid of the language barrier.*

Six and a half years later, I still believe that removing the language
barrier is important to reach as many people as possible. But I also think that
it's fair to say that if we are looking to do _less_ then this is the obvious
candidate of things to drop.

To put things in perspective: 87.9% of FreeSewing users have selected English
as their language of choice and thus will be unaffected by such a move.  Of the
remaining users, those who prefer French form the largest contingent (7%)
followed by Spanish (3.2%), German (1.7%), Dutch (1.1%) and finally Ukranian
(less then 0.1%). I don't have an easy way to extract similar data for our
patrons, but I can safely say that if you combine the US, Canada, UK, Ireland, 
and Australia you have covered the vast majority of patrons too.

To those users who are affected, I am sorry that it has come to this. While
translation as such does not add too much overhead (although I handle most of
the Dutch translation so it's not nothing), the main culprit is the technical
complexity that comes from supporting multiple languages.
This is also why dropping one or more languages does not make a meaningful
difference.

I'm sharing these numbers because they provide context to frame these changes.
They are not a justification for these changes. All users matter, and all 
patrons matter the world to me.
Just because one group is smaller than another does not mean we should throw
them under the bus. I hope that's something that needs no explaining. That
being said, when something's gotta give, I feel dropping translation is the
least impactful because in practice, I'm not convinced it matters all that much.

Today's browsers will translate pages on the fly, and I've more than once seen
people interact with the site in non-English, not because they opted for a
different languages, but rather because their browser is in the habit of
translating all English content to whatever is their prefered language.
Furthermore, despite the great work of our many volunteer translators, a
significant amount of FreeSewing content remains machine-translated because
there's just _a lot_ of it. Does it really matter all that much whether it's
us providing the (machine) translation or the browser?
I don't believe it matters all that much.

To come full cirlce, I feel it's worth pointing out that nobody has ever asked
me to add translation to FreeSewing. I decided to add it because I felt that in
a perfect world, everyone could access FreeSewing in the language of their
choice. With the way machine learning (or _AI_ if you want) is going, that 
reality is perhaps already upon us.

Long story short: I have come to realize I've bitten of more than I can chew,
and I am making adjustments to lighten the load. Slow and steady runs the 
race, and burnout is not good for anyone involved.


&nbsp;

---

&nbsp;



joost


