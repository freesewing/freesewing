---
author: 1
caption: "The most important change is obviously that we moved from purple to black as our signature color"
date: "2018-05-24"
intro: "Welcome to our new website. It's GDPR compliant, speaks 3 languages, and smells of wet paint"
title: "Welcome to our new website. It's GDPR compliant, speaks 3 languages, and smells of wet paint"
---


Tomorrow, May 25th, the General Data Protection Regulation (GDPR) of the European Union (EU) comes into force. 
From that day onward, businesses that don't respect the privacy of EU citizens
expose themselves to fines of up to 4% of their global annual turnover.

The date marks nothing short of a watershed moment for online privacy, 
as the world's most stringent data protection laws suddenly apply to half a billion people. 

## Your consent is now required

For freesewing, the roll-out of GDPR doesn't pose a problem as such. 
Not only did we have a solid plan, the only thing we absolutely had to add to the site was *consent*. 
We are no longer allowed to process your data without your permission. 
Permission that we should ask for both explicitly and granularly.

So, we have two types of questions to ask you:

 - Do you give your consent to process your profile data?
 - Do you give your consent to process your model data?

We make the distinction because they are different things. 
A profile/account is required to login to the site, post comments, and so on.  
Model data is required to generate made-to-measure sewing patterns.

You will be greeted by these questions when they are relevant 
(as in, when we do need to access that specific data), 
and you can revisit them at any time [in your account settings](/account).

## It is our duty to inform you

Under GDPR, we must inform you about how we handle privacy issues.
We have written about [our approach to privacy](/blog/privacy-choices) before, 
but this requires something (a bit) more formal.

So, we've drafted a [privacy notice](/privacy) that outlines all of these things. 

In addition to our privacy notice, we've setup [a page that lists all of your rights](/rights), 
and explains how you can exercise them.

With these changes, we've covered your right to be informed.

## Privacy by design

One of the more vague yet impactful requirements of GDPR is so-called *privacy-by-design*. 
We took the advice to heart and have made two changes inspired by this:

 - Encryption of data at rest
 - Termination of dormant accounts

We now encrypt your profile data at rest. 
In other words, our database holds your info, but it's encrypted. 
We only decrypt it when we need it.

We'll also terminate accounts that have been dormant for 12 months. 
In other words, if you don't login on the website for 1 year, your account and all your data will be removed.

However, for that last matter, there will be a bit of a grace period as we haven't fully implemented all the required changes yet. 
Which brings me to my next point:

## Also new: everything else

These GDPR-related changes seemed like a good opportunity to re-vist some of the choices we've made, and see if there was room for improvement. 
That was the initial idea anyway. In the end, we complete re-wrote the website from scratch.

Our previous website used [Jekyll](https://jekyllrb.com/) as a static site generator, 
with a pile of javascript code to make add the dynamic elements to the site. 
While that did do the trick, there were two important downsides:

 - Jekyll uses the Ruby programming language. That's another programming language, another package manager, and another ecosystem that potential contributors have to wrap their heads around. We wanted to avoid that.
 - That *pile* of JavaScript code was rather literal. Maintainability was starting to become an issue, not to mention that it would be difficult for new developers to jump in and understand what's going on.

So, to kill two birds with one stone, we rewrote the entire site using [Vue.js](https://vuejs.org/) and [Nuxt](https://nuxtjs.org/). 
Our entire frontend is written in JavaScript now — no more Ruby required — and due to Vue's modular nature and component-based approach, 
it should be a lot easier to maintain.

## Internationalization, aka i18n

Obviously, as we were rewriting things, we've thrown in a couple of new features. 
The most obvious being that we fully support i18n (internationalization) now.

While translation is an ongoing endeavor, we've got everything in place to support it. 
Starting today, freesewing is no longer exclusively available in English, but also in Dutch and Spanish.

I'd like to thank [@AnnekeCaramin](/users/annekecaramin) 
and [@AlfaLyr](/users/alfalyr), our language coordinators for Dutch and Spanish respectively, 
but also all other people who have helped out with translating. 

An overview of the status of the different languages is available [here](/i18n), 
and I'm hopeful that soon we'll be able to enable more languages.

## Beware the wet paint

Arguably, this release is a bit premature. 
We've still have [a couple of open issue to fix](https://github.com/freesewing/site/issues), 
and we're missing a bunch of documentation. 

However, since our deadline is externally imposed, we don't exactly have much choice in this. 
That is, if we want to be fully compliant with GDPR, and we do.

So, please bear with us as we continue to build this website, and our platform. 
And don't hesitate to let us know when something goes wrong.

