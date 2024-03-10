---
author: 1
caption: "Picture by <a href='https://stock.tookapic.com/jenniferforjoy' target='_BLANK' rel='nofollow'>Jennifer</a>"
date: "2017-06-12"
intro: "When we released freesewing core at the end of March, my focus immeadiatly shifted to building our front-end so that freesewing.org could fully replace makemypattern.com ."
title: "We're JAMstack, we're JAMstack, we're JAMstack, we're JAMstack, we're JAMstack, we're JAMstack, we're JAMstack, and I hope you like JAMstack too"
---

When we released freesewing core at the end of March, my focus immeadiatly shifted to building our front-end so that [freesewing.org](/) could fully replace [makemypattern.com](https://makemypattern.com/).

I believe that the value of freesewing lies with the core platform and our patterns. 
But without a user friendly way to expose that value, it will largely go ignored.

So we needed a website that lets people generate patterns. Makemypattern.com &mdash; arguably the best comparison of something similar &mdash; runs on Drupal 7, and my initial idea was to run the new site on Drupal 8. 
I went down that path far enought to be confident I could get it to work, and hook it up to our backend. At which point I switched gears and turned my attention to what is now known as freesewing core. 

Core took about 7 months to build, and a lot has changed since then. Or perhaps I have changed, I certainly learned a lot along the way. Either way, I've decided to do things different.

## The problem with a CMS

I have no beef with Drupal but the idea of managing the freesewing website through any Content Management System (CMS) does not appeal to me.

One of the main reason is that so much information is stored under an opaque database layer which makes it difficult to manage. 
That goes for content where posts, metadata, images, and so on is all spread across tables, locations, and folders. 
But there's also the theme that has a bunch of stuff in it, there's the custom Drupal modules to connect to the backend, and so on and so forth.

> I wanted that same approach in a website. Except, it can't be static because it has to, you know, do stuff.

When we were finalizing core, I built a documentation site for it based on [Jekyll](https://jekyllrb.com/). It felt like a breath of fresh air in comparison. 
Just a bunch of markdown files, with some SASS, images, and some JavaScript thrown in the mix, and it all compiles into a neat static website.

It's easy to manage, and it integrates nicely with a GitHub-centered workflow that is going to be famliar to potential contributors.

I wanted that same approach in a website. Except, it can't be static because it has to, you know, do stuff.


## An alternative approach: JAMstack

I first learned about JAMstack when I started looking into hosting for said core documentation site. 
It was initially hosted on GitHub pages which provides free hosting.
They also have SSL or a custom domain name, but you can't have both. Which was kind of a deal breaker.

Looking for alternatives, I stumbled onto [Netlify](https://www.netlify.com/), who do both SSL and custom domains and have a free-tier for open source projects (thanks guys).
Furthermore, [this video by Netlify CEO Mathias Biilmann](https://vimeo.com/163522126) got me really excited about JAMstack.

Unless you're familiar with JAMstack, I suggest you check out the video, but it boils down to this:

 - **J** = JavaScript
 - **A** = APIs
 - **M** = Markup

The idea is that you build your static site (markup) that you then make interactive with JavaScript that hooks up to one or more APIs.

So in our case, rather than having a straight-forward documentation site with easy-to-edit markdown and a complex CMS to handle the dymanic stuff, let's just build one simple site that is statically generated, yet uses JavaScript and APIs to do the smart stuff.

## Running before you can walk

I must admit that in my enthousiasm to embrace this new approach I got a little ahead of myself.
Suddenly, I was no longer building a simple site, but I was up to my eyeballs in isomorphic rendering, client-side routing, React and Redux, Node.js and ES6 transpiling.

> If you don't know what any of that means, you might get a hint of the frustration I felt as I was trying to tame all these new beasts.
> 
> If you do know what it all means, where were you back in April when I walked through the valley of the React of death? 

Point is, I'm not a developer and I was in way over my head. 
While I was learning new things every day, I wasn't making much progress on the actual task at hand, and felt frustrated with my inability to do even the most mundane things.

After a month of frustration, loads of trial and seemingly even more error, I threw in the towel. 
Eff this newfangled shiny JavaScript all the young kids are using, I'll stick to what I know. 

Which is essentially the basics of jQuery. In other words, stuff that was pretty cool 10 years ago.

## 10 year old jam is still jam right?

So here we are, freesewing.org is a site powered by the JAMstack. And you know what, it seems to do what it needs to do.

We have Jekyll build out static site, and when we push to our master branch, it gets autmatically deployed to Netlify.

> Eff this newfangled shiny JavaScript all the young kids are using

We have [a brand new data API](https://github.com/freesewing/data) build on [the Slim framework](https://www.slimframework.com/). 
It handles all user data. Things like accounts, measurements, models, and drafts, but also comments on this website and so on.

It also talks to core for us, and every time you draft a pattern, we don't just give you the pattern, but we also run a comparison of your pattern to a range of standard sizes, which is kinda cool.

And we have other cool stuff, like the ability to fork or redraft an existing draft.

## This is a starting point

I hope the user experience/interface is not going to be a roadblock for people. 
I've made a great deal of effort to make the drafting process as intuitive as possible and I think that in comparison to our demo (or the makemypattern interface for that matter) it's a vast improvement.

Then again, I'm sure things will break left or right, or that some of you don't like the colours or whatnot.

The point is that I set out to build something that can replace makemypattern.com so that I could tell all of you _Hey, come over and play with this new thing_.

I think if nothing else, I can do that now. And if you see room for improvement, please [join the effort](/contribute), we're only getting started.



<small>PS: For those of you wondering about the title of this post:</small>

<YouTube id='oFRbZJXjWIA' />


