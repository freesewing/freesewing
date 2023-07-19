---
date: "2023-04-01"
edition: "2023q2"
intro: "Welcome to the 2023 Spring edition of the FreeSewing newsletter."
title: "2023 Spring edition"
---

Welcome to the 2023 Spring edition of the FreeSewing newsletter.

Here's what's we've included for you today:

- ☕ Keeping up with all the hottest FreeSewing gossip (3-minute read - by Karen)
- 🐑 Call for pattern shepherds (2-minute read - by Karen)
- 💵 Looking for a 1000 true fans (3-minute read - by Joost)
- 🕵️ Behind the Seams: Benjamin F. (4-minute read - by Benjamin & Karen)
- 🦈 Want to write for the newsletter? (1-minute read - by Karen)

&nbsp;  

&nbsp;

## ☕ Keeping up with all the hottest FreeSewing gossip

Okay, so you're a fan of FreeSewing, you're excited for V3, and in the meantime, you're wondering where to get all the hottest gossip about what's going on behind the scenes. Fear not! We've got solutions for you.

First off, have you checked out our [Discord](https://freesewing.org/community/where/discord/)? This is where you can catch all the fun previews, like what patterns are slated for release in V3, recommendations and tips from fabric types to hard-to-find hardware to sewing machine maintenance, all the cool tinkering developers are working on behind the scenes, and more. If you want to be truly in the know, this is where it's at. (It's also literally where it's at, if you want to join FreeSewing's biweekly contributor calls, which happen in the voice chat.)

If you hate Discord, there are still options for you, though. Benjamin F. (of "Behind the Seams" fame) has been recapping the highlights from Discord as a GitHub discussion here: [Discord recaps](https://github.com/freesewing/freesewing/discussions/3523). Check it out for a quick perusal of recent hot topics.

And last but not least, there is of course the FreeSewing site itself. While some updates are on hold pending V3, you can still check out our Showcases to get a peek into some of the wonderful and impressive things that FreeSewing users have been making in recent months. A few highlights:

- The tiniest Hi ever made: [MicroHi](https://freesewing.org/showcase/microhi)
- This detailed how-to on making a [drop-shoulder Sven](https://freesewing.org/showcase/drop-shoulder-sven)
- A matching set of [multi-generational Florents](https://freesewing.org/showcase/matching-florents)
- How to [modify Aaron into a tank dress](https://freesewing.org/showcase/aaron-dress-by-ts)
- An incredible, impeccable [Classic Carlton by Boris](https://freesewing.org/showcase/carlton-by-boris) (check out the reinforcement embroidery!) -->
 
...And a bunch more that didn't fit here but are equally incredible, and you'll just have to go check out the [Showcase](https://freesewing.org/showcase/) to find out more. 😉

&nbsp;

---

&nbsp;

## 🐑 Call for pattern shepherds

Are you an expert at making a particular FreeSewing pattern? Maybe you've tried all the options, or you know why it goes haywire in certain edge cases, or you've made it for all your friends and fam as gifts? If this rings true, then yours is exactly the kind of expertise we're looking for.

As you might have noticed, FreeSewing is growing and adding new capabilities! And when V3 rolls out, there are several new patterns that will come with it. But every pattern could use someone who is familiar with its foibles and intricacies. A lot of the time, this is the pattern designer. In other cases, it's the person who developed the pattern's documentation. And then there are the patterns that exist on FreeSewing's site, but their designer has moved on to new challenges, or no one has made the pattern in a while. These patterns can sometimes fall prey to problems that no one notices. Then, when new users try them out, it can be a needlessly rough experience.

A pattern shepherd is someone who keeps an eye on things so this doesn't happen for their pattern. You don't need to be a programming prodigy or a sewing savant for this role, just someone who is familiar with the pattern, what goes into it, and how it goes together. If something breaks, you might fix it yourself, but you could also file a bug report to let the rest of the community know and recruit help. If this sounds like something you'd be interested in, reply to this email and let us know!

Bonus: FreeSewing has a bug bounty program that nets you (a) our undying appreciation, and (b) sometimes cool swag. 

&nbsp;

---

&nbsp;

## 💵 Looking for a 1000 true fans

I realized a few weeks ago that it has now been more than 6 months that we started working on version 3 of FreeSewing, and that's both an eternity and not very long at all.

It's an eternity if you've been waiting with bated breath for its release. (If you're in this group, then please bear with us because gosh have we been busy).
But it's not very long at all if you consider all the changes that we are cramming into this new major version. I took stock the other day and I realized there is almost nothing that we aren't completely redesigning or doing differently and better. A brief list from the top of my mind:

- Database: From MongoDB to Sqlite
- Backend: Completely rewritten
- Javascript: From CJS/ESM to pure ESM, and from default exports to named exports
- Bundler: From Rollup to Esbuild
- Hosting: From Netlify to Vercel
- FreeSewing.dev: From Gatsby to NextJS
- FreeSewing.org: From Gatsby to NextJS, and being completely rewritten 
- Development environment: From CRA (Create React App) to NextJS
- Component library: From MaterialUI/MUI to TailwindCSS/DaisyUI

I am sticking to technical changes here, there's obviously new features and other things that will be different/better.
But these are the foundations that are changing, so is the kind of stuff that won't be immediately obvious to you.

The one thing that is not on the list above is our payment processor (currently PayPal, we'll probably migrate to Stripe) which brings me to the one thing we haven't (yet) changed: Subscriptions.

Currently, we have 3 tiers of subscriptions. 2, 4, and 8 euro per month.
Some users have reached out to me because they wanted to do more for FreeSewing and [we've setup a 25$/month subscription plan for those generous souls](https://static.freesewing.org/fs-25/).

That got me thinking about the subscription model and how the project is supported financially in general. 
You may remember that I wrote last year that FreeSewing's revenue was trending ever so slightly downward, and it's something that I tend to get nervous about when I consider how many changes we are making.
People don't typically like change, and there is a certain risk that we'll alienate people with v3.

Then again, mass appeal is never been our shtick. We don't need millions, [all you need is a 1000 true fans](https://kk.org/thetechnium/1000-true-fans/). So in v3, we will also overhaul subscriptions.
We'll implement a pure [pay what you can](https://en.wikipedia.org/wiki/Pay_what_you_can) model. 
So today, you can either not pay, or pay 2, 4, 8, or 25 euro/dollar per month.
In the future, you will still be able to not pay, or pay whatever you feel is right.
Current subscriptions will not be terminated, although you are of course welcome to migrate to the new subscription model.

The future will tell whether this will be good or bad move for FreeSewing. 
But I believe that betting on our true fans is our winning strategy. So that's what we'll do 🤞


&nbsp;

---

&nbsp;


## 🕵️ Behind the Seams: Benjamin F.

FreeSewing contributor Benjamin (BenJamesBen on GitHub) has been absolutely astounding us lately with his work supporting FreeSewing. So, we asked him if he wouldn't mind being the subject of this quarter's newsletter, and of course he not only said yes, but came back with something fantastic, funny, and unique. As always, any errors, oversights, etc. are entirely the fault of the interviewer!

### Tell us about your involvement with FreeSewing.
Thank you for giving me the opportunity to talk about FreeSewing. I think that it's a pretty great organization in that it provides patterns free of charge to people. To me, that is the best thing that FreeSewing does. In the United States there is a retail store that regularly has sales where you can buy paper patterns for $2.00 USD, but I've heard that patterns are much more expensive in other countries. And, in some places paper patterns simply aren't available at all in stores. FreeSewing provides free patterns to everyone!

### I see that you do a lot of coding-type work for FreeSewing?
I used to work doing computer stuff (software QA and testing), and my education background is also in computer science. A lot of what I've done in the past involves looking at code that other people have written, figuring out what it does, and troubleshooting issues. So, I've just taken that background and applied it to FreeSewing, testing the website and patterns to make sure things are working correctly, trying to fix bugs that pop up.

### Are you also a sewist?
That's actually a good question, in a philosophical sense that is. I own a sewing machine and took sewing lessons. I have a fabric stash and multiple unfinished projects I should be working on. But, actual sewing? I don't seem to do much sewing. I do spend a lot of time watching sewing videos on YouTube. Does watching sewing videos count towards being a sewist?

### What unfinished projects are you avoiding working on and watching YouTube instead?
I started working on a pirate/18th century shirt design for FreeSewing. All the code is written, and it produces patterns just fine. However, I haven't actually tested it to see if the generated patterns make sense fit-wise. (I guessed at the pattern measurements, just inventing numbers that seemed to make sense.) The next step is to make a test garment to check fit, make alterations to the pattern, and change the code accordingly.

I also owe my sister a pillow made to custom measurements. (I basically just need to sew a rectangular bag with a zipper closure that she can stuff it with extra memory foam that she has own hand.) And finally, my first, original unfinished project is a Hawaiian/bowling style camp shirt, Kwik Sew 3484. (I bought the pattern back when Kwik Sew was its own company and still made garment patterns, if that gives you an idea of just how long the project has been unfinished.)

### The pirate shirt sounds interesting.
I chose it because 1. I actually want a pirate shirt, and 2. It seemed like a good, easy design to make (all the pieces are rectangles!). However, although I am somewhat interested in historical clothing, I am not at all interested in historical sewing methods-- sewing by hand, that is. I plan to use a sewing machine to sew my pirate shirt.

Fun fact: Pirates also sewed using sewing machines (that they took from the ships they plundered). However, instead of removing pins as they sewed, they would leave the pins in and sew over them-- which can be really dangerous. That is why so many pirates had to wear eye patches.

### You said you owned a sewing machine?
It's a Kenmore-badged machine that was made by Janome. I think it was the most basic model available at the time. No stitch length or width adjustment, 4-step buttonhole, front loading bobbin. I bought it new at Sears back when Sears still existed and sold sewing machines. (That should give you another clue about how long my camp shirt unfinished project has been unfinished!)

### What sewing projects would you like to work on in the future, that is assuming you finish your existing unfinished projects?
I would like to make my own tailor's ham. (Another simple pattern-- just two ovals.) I am considering making my own underpants since I need some new ones. Though, I am not sure whether it might be more practical or cost effective to simply buy them from the store. And, I am somewhat intimidated of sewing knit fabric. I've also gotten interested in patterns for sewing your own custom, made-to-measure dress form/mannequin. However, that seems like it might be too difficult a project.

Finally, someday I would like to make a garment out of upholstery or curtain fabric. It seems like it might be an interesting challenge to use that type of fabric. Plus, Scarlett O'Hara wore a dress made from curtains, and as a result she got to marry Rhett Butler. Maria made clothes from curtains, and she got to marry Captain Von Trapp. (And, she was almost a nun!) If I were to make clothes out of curtains, imagine who I could marry!?

### Getting back to coding, is it a difficult task to create a FreeSewing pattern? I'm thinking about people who might be experienced sewists who can design patterns but who don't have coding knowledge.
It isn't necessarily difficult converting an existing pattern into code. The first challenge is to learn how to think about how the pattern is drafted and describe it in terms of measurements and angles. Sort of like if you had to describe how to draft a pattern to someone over the phone or through text messages. Once you are able to write down instructions like, "draw a Point A", "draw another point 10 cm at a 45 degree angle above and to the right of A and label it Point B", "draw a line between Point A and Point B", etc., you can translate the drafting instructions into code.

The next challenge might be to take the existing pattern which was made for one specific person and think about how it might be converted to patterns for other people with different measurements. You would have to think, "why was this part's fabric measurement 10 cm"? If it is because it was slightly larger than the wrist circumference, then perhaps the measurement could instead be converted to "the wrist circumference, plus 10%". I think that the skillset might be similar to that of pattern grading.

For the coding itself, perhaps the best way to learn (apart from taking a formal coding course of which there are plenty of free ones on the internet) might be to look at the code for an existing FreeSewing design. I suspect that many people learn how to code by looking at existing code, copying it, and making changes to it to see what the changes do. FreeSewing provides a lab tool that allows you to view changes to the designs that you make or edit, so you can play around with things and learn from experimentation. If you need any help or get stuck, there are plenty of people on the Discord who would be happy to help!

### Thank you. Any final words?
I find it somewhat amazing that the FreeSewing community is so geographically diverse, spread throughout the world, and still able to communicate with and help each other. I am glad to be part of this community. Though, it occurs to me that with the anonymity of the internet, nobody has actually seen me or knows who I am. For all anybody knows, I could be a cat on the internet just pretending to be a person. (If I were a cat, this wouldn't be considered "catfishing". We cats just call it "fishing"!)

&nbsp;

---

&nbsp;




## 🦈 Want to write for the newsletter? 

Hey! It's Karen, your friend from the [contributor calls](https://freesewing.org/community/calls/), the [Discord](discord.freesewing.org), and a bunch of the stuff written in this newsletter! Every quarter, we put out this newsletter as a way of keeping folks caught up on what's new with FreeSewing, cool updates, impressive accomplishments, weird projects, etc. But it only works because there's a whole incredible cohort of folks creating, designing, and contributing. (Here's where you come in.)

If you read this newsletter and thought:
- "But what about fill-in-the-blank question?" or 
- "Ooh, that reminds me of a FreeSewing project I've been working on behind the scenes..." or
- "Wow, I wish someone would do a deep dive on this topic!" 

...We would love to know that. And if you want to write that article yourself, well then I will personally be overjoyed and will help you in any way I can to make that possibility a reality.

Maybe you made a garment that required some clever hacking or took on a life of its own, and you're really proud of it. Maybe you've got a fork of the FreeSewing monorepo where you're tinkering away with something exciting. Maybe you don't know what you'd like to write about, but you love FreeSewing and want to contribute, or you're hoping to build your cred as a reputable wordsmith. (Okay, actually, reputable might be a stretch, but that's part of our charm.)

Reach out! You can find us on [Discord](discord.freesewing.org), or on [Github](https://github.com/freesewing/), or you can just reply to this email. We'd love to hear from you. 🧡


