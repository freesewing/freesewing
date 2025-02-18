---
author: "joostdecock"
caption: "Your login background for April"
date: "2018-03-31"
intro: "This is your monthly roundup of the freesewing news of the last four weeks, and a look at what lies ahead in the next month."
title: "Monthly roundup - March 2018: Parlez-vous français? Sprechen Sie Deutsch? ¿Hablas español? 你會說中文嗎？"
---

This is your monthly roundup of the freesewing news of the last four weeks, and a look at what lies ahead in the next month.

## Looking back at March

As a general rule of thumb, the less you hear from me, the harder I'm working. 
Chances are you didn't hear from me during March at all. And yes, that's because I'm working hard.

Here's why:

### The Jaeger Jacket is now available

We've had the new [Jaeger Jacket](/patterns/jaeger) jacket in the pipeline for a while now. 
I had stalled a release because I couldn't find the time to make one, something which seems to
be a general problem for pattern releases.

So, I asked for help and a number of people stepped up and offered to make up (a muslin of) a Jaeger jacket.

That went well, so a couple of weeks ago we finally pushed out Jaeger for general availability.
It's part of our core 1.8 release, and [the announcement post](/blog/core-1.8-jaeger-across-back/) has all the details.

### The *across back* measurement is no more

The across back measurement was cause of a great deal of confusion among our users. 
More often than not, when someone contacted us because their pattern looked wonky, 
an unrealistic across back measurement was to blame.

So, we stepped in and removed that measurement in favour of calculating it from the *shoulder to shoulder* 
measurement, and giving you a new *across back factor* option so you can still tweak it if you want to.

For a more detailed description, please refer to [the core 1.8 release blog post](/blog/core-1.8-jaeger-across-back/).

## Looking ahead to April

### The big GDPR overhaul

Last month we [outlined our GDPR battle plan](/blog/gdpr-plan/) and shortly afterwards I made a decision:
Rather than implement all these changes in the site, I would start over from scratch.

Or rather, I've given myself until the end of April to work on this. At which time I will need to decide
whether it's possible to migrate the entire site before GDPR doomsday (May 25th) or should I abandon this 
effort and do what needs to be done in the current site.

>Rather than implement all these changes in the site, I would start over from scratch.

I like the first scenario better and have been working on it pretty much day and (part of the) night
during the last couple of weeks.

I can't really show you much, but the goal is to build the new site on top of 
[the Nuxt framework](https://nuxtjs.org/). Doing so would allow us to drop Ruby from the freesewing technology stack,
which would streamline deployment and development.

My hope is also that using a modern and popular JS frontend framework will make it easier/more attractive 
contribute changes to the site.

### Translators wanted

Speaking of contributions. Since I'll be rewriting the site from scratch, I've decided to add a new challenge to the mix: i18n.

In case you're wondering, i18n is short for internationalisation, aka making the site available in different languages.

Yes, May 25th will be here soon, and yes I need more work like I need another hole in my head. 
But I feel it's an important project to try and make freesewing.org available to as many people as possible. 
And for this, we need to get rid of the language barrier.

Now I'm hopeful that I'll be able to take care of the technical aspects of making the site multi-lingual. 
But that won't do us any good without translations. So that's where you come in :)

> #### If you're willing to help with the effort of translating freesewing, please [get in touch](/contact). We need your help. 

It would also help if you could spread the word a bit :)



