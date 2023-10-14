---
author: "joostdecock"
caption: "Your login background for February"
date: "2019-01-31"
intro: "Is it really the end of January? Already?"
title: "Monthly roundup - January 2019: The big beta update"
---


Is it really the end of January? Already?

After using the Xmas break to port [Simon](/en/patterns/simon) — 
not exactly the most trivial of patterns — I'm fairly confident that
all patterns will be ok. Simon has 61 options, so if it works
for Simon, it will work for all patterns, or at least that's how I see it.

Seven patterns have now been ported. That might not seem like much,
but it does get rather tedious every time we make a change that touches the patterns, 
as we then have 7 to update.
So I decided to put the pattern porting on hold for a while, and instead focus 
my attention on [our new beta website](/en/). 

## Gatsby is now our static site generator

The new website is built on top of [Gatsby](https://www.gatsbyjs.org/), a static site generator
written in JavaScript and powered by [React](https://reactjs.org/). We've been fairly committed
to [the JAMstack architecture](/en/blog/freesewing-goes-jamstack) here at freesewing.org.

It's our third rewrite of the site since we launched freesewing.org and I admit that that's
a bit much. As in, I really hope the site we're building now will stick around for a while.

Then again, rapid iterations are a good thing, especially as we were still finding our feet.
We do what it takes to get it right, and while the question 
of *what's the purpose of this all* is perhaps on some of your minds, I feel 
like beta.freesewing.org has gotten to the point where it answers that question.

## (almost) everything happens in your browser now

We rewrote our platform in JavaScript. That thing that runs in your browser. 
Previously, whenever you wanted to change the style of your cuffs or something, we needed
to send your wishes to a backend, who'd then generate a draft and send it back.

Now, when you tweak an option, we don't need a round-trip to a backend to show you
what things look like. Because everything runs in your browser. So if you change something,
it just updates right there on your screen.

That's sort of what we had in mind all along, but it's still a powerful moment when
all the pieces finally start to fall in place and things actually work.

That being said, not everything runs in the browser yet. Specifically turning your 
patterns into PDFs is something that we handle in the backend as we're still
working on that part.  

## No account needed

Our [new demo](https://beta.freesewing.org/en/demo) allows you to kick the tires without 
the need to sign up. When signing up, there's no need to create an account with password, as
we now support signing up with your existing Google or GitHub account.

People who already have an account will be able to login with their Google or GitHub account,
provided the email address of their freesewing account matches.

## You can change everything

We've made many changes to try and make it easier for developers to get started with
freesewing. But we've also made changes for people who contribute in other ways.

All our (markdown) content can now be edited on the site. No GitHub account needed,
just click the little pencil icon next to the title, submit your changes, and we're good.

Same good news for translators. All the translations can also be edited online. We've
also updated our documentation for translators and editors to reflect this new simplified workflow.

## Custom layouts

The login/signup with GitHub/Google accounts was a feature requested by users, and so is this one:
We now support the creation of a custom layout for your pattern. Here's how it works:

When a pattern is drafted, the different pattern parts are laid out on the pattern automatically.
Often that's great, but sometimes you wish your could make some changes.
For example, you may want to get your pattern printed in a copy shop so you want to make 
sure it fits on the width of their roll of paper. Or you want to save some paper by squeezing
some parts together.

It's in early beta (as in, it still breaks from time to time) but you can now change the width
of your pattern, move your pattern parts around, rotate them, or even mirror them vertically
or horizontally to suit whatever your plans are. All of that can be done in your browser, on the site.

## Developer documentation

We've also integrated our developer documentation on the new site.
Until yesterday, documentation about the new platform was hosted on a separate site,
but now, we've ported the documentation and everything is integrated in our (future) website.

## We won't migrate your drafts

Time to talk about the things we won't be doing: We will not migrate your existing drafts.
The new platform is just too different. There is no way for us to migrate your existing drafts
in a way that makes sense. So, when the day comes we switch over to the new site, your drafts
will no longer be there.

You can download all your data from our site, but if you don't do that yourself, 
your v1 drafts will be gone.

## No more comments

I have decided to not implement a comments feature because I feel having them
raises the wrong expectations. 

Freesewing is not another [Pattern Review](https://sewing.patternreview.com/), 
or [Thread and Needles](https://www.threadandneedles.org/), 
or [The Fold Line](https://thefoldline.com/), 
or [Textillia](https://www.textillia.com/), 
or [Kollabora](http://www.kollabora.com/), 
or whatever the *Raverly of sewing* du jour is.

I don't want freesewing.org to compete with these websites. They
do their thing, we do ours. Their value proposition is the community, ours is not.
That doesn't mean our community isn't valuable. It just means that we don't
need our community to gather on our website. Our community exists wherever it
goes. Be it Twitter, Instagram, Reddit, blogs, or some social network that I've never
even heard of. It doesn't matter, it's all good.

Building a community on the website takes time, it takes effort, it takes work.
And we simply don't have the bandwidth for that. So I'd rather we focus 
on [our core mission](/en/docs/faq/#whats-your-end-game), and let people talk 
about freesewing wherever it is they talk about things.

## Paris anyone?

I've mentioned I'd like to do some sort of meetup this year, and while I haven't really 
had any time to work out what that would mean, we might end up meeting anyway.

Specifically, [Charlotte](https://englishgirlathome.com/) (aka English girl at home) 
and [Carmen](https://www.carmencitab.com/) (aka CarmencitaB) are organising the
[Paris Sewcial](https://englishgirlathome.com/2019/01/23/paris-sewcial-paris-coud-2019-registration-open/)
meetup in May. I'll be heading to Paris to be part of that, so if you
are too, we'll meet up there.

Registration is 
[right this way](https://www.eventbrite.co.uk/e/paris-sewcial-paris-coud-registration-54520802187). 


