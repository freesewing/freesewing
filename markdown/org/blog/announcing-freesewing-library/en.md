---
author: 1
caption: "I don't drink, but this seemed appropriate for a celebration post ¯\\_(ツ)_/¯"
date: "2018-08-25"
intro: "Celebrating one year of freesewing.org: Announcing the freesewing library"
title: "Celebrating one year of freesewing.org: Announcing the freesewing library"
---


Exactly one year ago, the doors of freesewing.org swung open for our users, 
while those of makemypattern.com get one of those *we've moved* signs.

Looking back at [that blog post from 12 months ago](/blog/open-for-business), 
it almost beggars belief that the things announced then are only one year old. 
The concept of a draft, the comparison functionality, or even paperless patterns. 
They all celebrate their first birthday today.

Not this site though, because [driven by the looming GDPR deadline](/blog/gdpr-plan), we dumped our Jekyll based site for a new front end sometime in May. 

## More languages with less languages

GDPR was only part of that story. 
Other reasons for the rewrite were our desire to support multiple languages, 
and to simplify our technology stack.

In other words, we wanted to reach people who speak different languages, 
and wanted to limit the number of programming languages required to do so.

### More natural languages

We've done remarkably well on this front.
While you won't find every last bit of content translated, this website's main features 
are now available in five languages: 

 - English
 - German
 - Spanish
 - French
 - Dutch
 
Which really is 100% thanks to the great work of [our wonderful translators](/i18n/).

### Less programming languages

The switch from [Jekyll]() to a [Nuxt](https://nuxtjs.org/)-based front-end 
has removed [Ruby](https://www.ruby-lang.org/) from our technology stack.
Freesewing.org now runs on JavaScript, PHP and a little bit of C (which we'll ignore for now).

But removing programming languages is not a goal *an sich*. 
Rather, the underlying ambition is to simplify things, make it easier for people to get
involved, and ultimately attract more contributors so that the project can grow and flourish.

Today, designing/developing patterns is not an insurmountable obstacle. 
We've got [benjamin](/patterns/benjamin), [florent](/patterns/florent), 
and [sandy](/patterns/sandy) to show for it. 
All of these were contributed by people for whom freesewing was initially new, 
they went through the design tutorial, and in the end created a pattern of their own.

We'd like more people to follow in their footsteps. So making the process as simple as 
possible is a worthy investment of our time.

## Announcing freesewing, the library

For the past 2 months, I have taken time off from pattern making and sewing to 
tackle our [technical debt](https://en.wikipedia.org/wiki/Technical_debt).

Specifically, I've set out to rewrite our core back-end from the ground up in JavaScript. 
But there's a twist. It's no longer a back-end. It's a library you can use 
both in your browser, or on the server with [node.js](https://nodejs.org/).

It is currently in version 0.10, and feature complete with freesewing core. 
It's [available on GitHub](https://github.com/freesewing/freesewing) and 
[NPM](https://www.npmjs.com/package/freesewing), and is fully documented at 
[developer.freesewing.org](https://developer.freesewing.org/). 

And while its API is richer than core's, it's footprint is actually a lot smaller:

![Lines of code comparison between the new library and (the relevant portion of) freesewing core](https://posts.freesewing.org/uploads/corevsfreesewing_c9327c9fa3.svg)

Which is good news, in case you were wondering.

## What happens next?

A lot of work needs to be done before we can actually use this on freesewing.org:


 - All our existing patterns need to be parted to the JS version. [Brian](https://github.com/freesewing/brian) is the first pattern to have been ported.
 - Rewrite our data back-end in JS. Since this will remove the PHP programming language from our stack.
 - Build a new website using the freesewing library and our new data back-end.

This really is a lot of work, and while I hope that by the end of the year we'll have made 
good progress, I can't promise it will be done.

## But I just want patterns

Chances are, all you care about is patterns. 
What you want is more patterns, better patterns, different patterns. 
And all of this rewriting is not exactly pushing your buttons.

I get that. I really do. I for one have a list of patterns I'd like to see added to the site. 
And my work on other aspects of the project keeps me from adding them. 

But I believe that investing now in a streamlined developer experience will have a knock-on effect in the long term. 

If we want a few extra patterns, this is not the right approach. But if we want a lot more patterns, I believe it is.

And I want a lot more patterns.

