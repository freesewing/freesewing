---
author: "joostdecock"
caption: "Picture by <a href='https://pixabay.com/en/users/herbert2512-2929941/' target='_BLANK' rel='nofollow'>Herbert</a>"
date: "2017-06-16"
intro: "The world wide web is increasingly eroding your privacy. Facebook, Google, and an avalanche of ad networks out there are all keeping tabs on your browser tabs. Tracking you on the web, keeping an an eye on the sites your visiting, so that they can gather more info on you, and sell that to advertisers."
title: "The choices I've made to protect your privacy. Or why you won't be getting any cookies."
---

The world wide web is increasingly eroding your privacy. Facebook, Google, and an avalanche of ad networks out there are all keeping tabs on your browser tabs. Tracking you on the web, keeping an an eye on the sites your visiting, so that they can gather more info on you, and sell that to advertisers.

Pardon my French, but I hate that shit.

> Facebook, Google, and an avalanche of ad networks out there are all keeping tabs on your browser tabs

Building this site from scratch has been a great opportunity to reflect on how to do things. 

To make sure I'm not contributing to the problem, I've made the following choices:

## Encryption everywhere

Let's run everything over https. That's just [common sense](https://letsencrypt.org/) in 2017. 

## No ads

This one is another no-brainer. The number 1 tracking pest online are ad networks, and I want them nowhere near this site. 

Fortunately, that doesn't pose a problem given that we don't play by the _Give something for free, then sell people's data_ rules of the web.

## No external code

This site loads no external JavaScript code. None. Which does mean I had to rethink a few things that typically require external code. 

There is no Facebook Like button or Twitter integration. We still have social sharing under our blog posts (hint hint) but it's the plain vanilla HTML variety that prevents tracking.

In the same category, there's no social logins. Sure a _Login with Facebook_ button is handy, but also kind of a nightmare when you consider what it does to your privacy. 

For a statically generated site like this ([see this post about JAMstack for details](/blog/freesewing-goes-jamstack/)) [Disqus](https://disqus.com/) is pretty much the de facto standard for comments. But Disqus is pretty awful when it comes to tracking, so that was a big no-no to me.

A similar story for authentication where I considered [Auth0](https://auth0.com/). There too, I was concerned about tracking, so I decided against it.

I ended up just biting the bullet and implemented authentication and comments myself. Time will tell of that was a good trade-of.

## No cookies
We don't use any cookies. Obviously no third-party cookies, but not even cookies of our own.

Instead, we use local storage which is better because unlike cookies, it doesn't send your info on every request.

## No analytics
I ran [Google Analytics](https://analytics.google.com/) on [makemypattern](https://makemypattern.com/). It's powerful, but obviously a tracking nightmare. So I wasn't going to have that either.

This issue is further complicated by the fact that this static site is hosted by [Netlify](https://www.netlify.com/). So I don't have server logs and can't run any analytics server-side.

For the most part, I decided to just go without analytics. I don't need to know how many people are visiting this site. I still know how many user accounts are created, and how many patterns are generated, which should be fine indicators for the site's overall well-being.

But there's one thing that wanted to keep from analytics: the referral logs. It's one of life's small pleasures to go through that list and discover 
[somebody](https://www.reddit.com/r/freepatterns/comments/4zh5nr/is_there_software_to_generate_sewing_patterns/) 
[linked](http://www.makery.uk/2016/08/the-refashioners-2016-joost/) 
[to](https://closetcasepatterns.com/week-sewing-blogs-vol-98/)
[you](https://opensource.com/life/16/11/free-open-sewing-patterns). 

Here too, I've implemented my own bare-bones solution. If you land on this site from an external link, we'll report that referral to our own API. Which means we still get the referral info, but no tracking.

Perhaps it's just vanity, but when I'm having a bad day, those referral logs make me feel better (when it's not just Russian referral spam). I might be wrong on this one, but I would wager that a lot of people who have their own blog can relate to that.

