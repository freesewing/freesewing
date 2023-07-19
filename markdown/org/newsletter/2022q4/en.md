---
date: "2022-10-01"
edition: "2022q4"
intro: "2022 Autumn edition"
title: "2022 Autumn edition"
---

Welcome to the 2022 Autumn edition of the FreeSewing newsletter.
Here's what's in it for you today:
 
- 🏁 FreeSewing 2.22 is out and will be the final v2 release (1-minute read - by Joost)
- 🔱 FreeSewing version 3; What is it, and when can you expect it? (3-minute read - by Joost)
- 🚀 We've crossed the 50.000 commits milestone (1-minute read - by Joost)
- ⛵ FreeSewing at the Serendiep in Rotterdam (1-minute read - by Lexander)
- 🕵️ Behind the Seams: Enoch (4-minute read - by Karen & Enoch)

Let's jump right in!

&nbsp;  

&nbsp;

## 🏁 FreeSewing 2.22 is out and will be the final v2 release

FreeSewing 2.22 came out towards the end of August, featuring a new plushie
design by Wouter — who also signed for Hi the shark.  This time, it's
[Octoplushy](https://freesewing.org/designs/octoplushy/) which is, you guessed
it, an octopus.

What's certainly less adorable but perhaps not relevant is that this will be the
final minor release under version 2.  That's right, version 3 of FreeSewing is
coming, and while we continue to support version 2 — not to mention that it's
still powering FreeSewing.org — our focus is now very much on the next major
version: FreeSewing v3.

&nbsp;

---

&nbsp;

## 🔱 FreeSewing version 3; What is it, and when can you expect it?

For a bit over a month now, we've put the version 2 code base in long-term storage and have started working towards version 3.
And while it will be a while before this lands in production — which means FreeSewing.org for us — I'd like to give a very brief highlight tour of some of the things that are happening with FreeSewing version 3 right now that I am personally most excited about.

### Part-level configuration, aka pack support

On [our road map](https://github.com/freesewing/freesewing/discussions/1278) — which if you have been paying attention has ever more things under the *already implemented* heading — we had so-called support for *packs*. The idea was that we'd love to make it possible to create designs by freely combining different components. Like perhaps you'd get the sleeves from a *sleeve pack* and the collar from a *collar pack*, add some pockets from a *collar pack* and so on.

It's one of those things that makes a lot of sense, but begs the question: How will all of this work under the hood?
In v2 of FreeSewing, implementing these ideas would have been non-trivial because even though we support extending patterns into other designs, the process is too cumbersome for this level of ad-hoc mashing together different designs.

So that's something we wanted to address in version 3, and to do so we've essentially move all configuration to the part level. For example a sleeve part will have it's own options defined and list what measurements it needs and so on. You can now just pull that sleeve part out of the design (or in the future a sleeve pack) and use it in your own design without having to worry about measurements and options and so on.

It's the most fundamental change in V3, but it's something that will open the door to a lot of creative combinations of various designs in the future.

### Support for multiple sets of settings, or as we call them: Multisets

Patterns are ultimately drafted for users by passing them a bunch of *settings*. The measurements to use, how you'd like the options to be just your way and so on.

In FreeSewing version 3, you'll still be able to pass multiple sets of these settings to the pattern.
This has a bunch of interesting applications. For example, if you're working with an asymmetric body, you'd be able to pass in two different sets of measurements and say "*give me those and those parts with these measurements, and the other parts with those measurements*".

We also use this new feature under the hood to handle how we *sample* patterns. Which is when we compare various iterations of a pattern with each other. This used to be somewhat bolted on top in a semi-awkward way. But in version 3, it's as simple as compiling a list of different sets of settings (since one gets tired of typing/saying *sets of settings* rather quickly, we refer to them as *multisets*) and then we can *simply* pass them to the pattern and it *just works*.

### Stack support

Closely related to multiset support is support for stacks in the layout phase.
Stacks are a bit like *layers*. Typically, when lay-outing each part is its own thing and we would lay them out individually.
Now, you can say that different parts are part of the same *stack* and they would be stacked on top of each other in the layout, like layers.

It's once again something we use internally for some of our sampling/comparing work, but also opens up interesting possibilities and I'm curious to see how people will end up using these features.

### And so much more

There's really is a lot more going on in version 3, with improvements and tweaks big and small. 
But these are some of the more fundamental changes. We're also still working on it, so if you have a great idea, [our road map](https://github.com/freesewing/freesewing/discussions/1278) is the more formal way to propose them. For a more informal chat, stop by [the FreeSewing Discord](https://discord.freesewing.org/) where we hang out and coordinate our work.

### When can you expect version 3?

The short answer to when you can expect version 3 is *sometime in 2023*. If that seems long, it's because we're really re-working things from the ground up. The changes outlined above are really foundational changes, and they need to ripple through the entire machinery built on top of those foundations before it can all come together in something that can be released on FreeSewing.org.

And we also want to make sure we get it right. So we're going to keep on keeping on, and release it when it's ready.

&nbsp;

---

&nbsp;

## 🚀 We've crossed the 50.000 commits milestone

A couple of days ago, we crossed the threshold of 50.000 commits [on our monorepo](https://github.com/freesewing/freesewing).

Numbers in itself aren't really that meaningful, not to mention that you can always game the system. So I don't mean to imply that this milestone in itself has some sort of special significance. But I do feel that at a time that most work (on v3) is happening behind the scenes, it serves as a good reminder that FreeSewing is a bit like a swan. It might seem to glide forward seemingly effortlessly at a steady pace, but there is frantic pedaling going on beneath the surface.

&nbsp;

---

&nbsp;

## ⛵ FreeSewing at the Serendiep in Rotterdam (1-minute read - by Lexander)

FreeSewing was invited to join an exposition hosted by Serendiep, which is a ship that's home to art and science, with a theater space and machines inside. The week-long exposition was part of a bigger whole: the city of Rotterdam is celebrating the 150th birthday of one of their canals.

The workshop began with me, Lexander, introducing FreeSewing and explaining the concept, and we spent the evening making a sleeveless Teagan as a sleeping shirt. We were with a group of a few people and did the whole FreeSewing process: taking the measurements, assembling the paper pattern, cutting the fabric pieces and sewing them together.

The Teagan fit nicely and overall it was a really fun experience! I’m looking forward to what the future will bring.

&nbsp;

---

&nbsp;

## 🕵️ Behind the Seams: Enoch

One of our Contributor Call hosts sat down (virtually) with Enoch to learn a little more about hir background and journey to becoming a FreeSewing contributor! The interview below has been edited for length, and any errors, oversights, etc. are entirely the fault of the interviewer.

### How did you learn about FreeSewing?

I learned to sew in grade school, but since then hadn’t done much sewing until the pandemic. In March 2020, just before lockdown, I wrapped up a long-time project, so, like many people, I found myself with some free time. Just prior to that I had finally received a diagnosis to explain my decades-long struggle with exhaustion (Restless Legs Syndrome, of all things), and medicating it meant that for the first time ever I had enough energy to have interests and hobbies.  

So I dusted off my old sewing machine and started playing around. At some point I was trying to make a piece that I couldn’t find a pattern for, so I learned enough pattern drafting to pull something together to make it happen. Because I'm a coder with an interest in open source, once I had done it in paper for myself, I wanted to automate it, and in automating it I wanted to make it available for as many bodies as possible. I decided I needed a parametric pattern, and tried out a few different things before finding FreeSewing. 

### How did you become a contributor?

Once I started developing patterns in FreeSewing, I found myself thinking, “It would be cool if there were this. It would be cool if there were that.” For instance, as I was designing, I wanted to be able to generate line drawings to preview how different settings and measurements would impact the finished garments, and then I wanted to be able to drop in my fabrics and see how they would look on the designs. Adding the custom option types I wanted wasn't very straightforward, so my first PR was me trying to make it easier to replace small parts of the workbench. My first few PRs broke some stuff, so I got more involved just trying to clean up after myself. And then I really got into it. 

I've worked on open source software before in small amounts, and I've been the sole developer on software that was technically open sourced, but this is my first time being in the community of an open source software, and I'm finding that part of it really rewarding. To have all these people focusing on all these different areas of making it good, and all in basically constant communication with one another is super cool. The human element really matters, and FreeSewing is so much about the human element at all levels. Iit drives me to contribute at a higher and more consistent level. And I think Joost deserves a lot of credit for having written this massive thing and still managing to really foster this community around building and bettering it.

### What has been your contributor work so far?

I've done a few smaller things, but there are two big things I’ve worked on, and one still in the works!

The first is getting Gitpod set up. Gitpod allows you to do your development in the browser, so that you don’t have to manage dependencies locally. This is especially useful for Windows developers because our environment isn't very Windows friendly, and it's not officially supported. I've also recently submitted some updates to the environment to help smooth things for Windows folks who really prefer to develop locally.

The second is an update to the Printing Layout tool for the Lab. I reworked the moving and rotating functionality so that it works more smoothly and we now have snapped rotation in addition to free rotation. I also overhauled our export to PDF system so that when you export it looks as you would expect it to based on how you laid it out. We have a lot more control over the tiling now, and Joost doesn't have to maintain any C code alongside everything else. 

Still In progress is the Cutting Layout tool, which will allow you to specify a fabric width and lay out all the pieces (and if you're supposed to cut two, it'll give you two of them) so you can figure out how much fabric your pattern needs.

### Are you a sewist? A coder? Both? Neither?

Both! But I’ve definitely done more coding. That’s my job, so I’ve done it most days for ten years.

### When and why did you start sewing?

I started sewing early – I took sewing classes in elementary school, and my dad bought me a sewing machine in exchange for promising to hem all his pants (which I never did). Then, except for a semester or two of costume design in college, I hardly sewed again until more recently. I did learn to use an industrial machine, though!

### What are you currently working on?

I've been slow recently, but I always have ideas – I have a whole backlog of things I want to make for my partner, and I also do woodworking and am restoring a steel tanker desk and some rosewood mid-century side tables, and I’m working on a design for the back and front yard of my home. I learned a lot of 3D modeling during the pandemic, and it’s cooling off enough now (in the southern US) to work in the yard.

### What project did you just finish?

I just finished a tunic for my partner, and I designed the suit I wore to my sister’s wedding.. I handed the design off to a tailor, but when the suit was delivered, the sleeves were attached in the most baffling manner, and I ended up having to attach them myself. It turned out beautiful, although I’m still unhappy with the sleeves.

### What do you love the most about sewing?

I like that sewing opens up the world. You can realize or fix or customize whatever you want, and sewing allows you to get a perfect fit (or at least try…), whatever that means to you.  I'm a very aesthetically driven person who was raised by very aesthetically driven people, and I believe in the transformative power of clothes, so it's great to be able to take that control for yourself. 
Plus, I love to have any skill, and sewing is really a whole category of skills that really allows you to imagine a thing and say, “Yeah, we can do that.”

### What do you hate the most about sewing?

Seam ripping – which I have to do a ton of. And I sometimes feel there are too many steps to making the things it interests me to make.

I think in reality I don’t often actually find sewing an enjoyable activity – on the one hand, I'm very ambitious, but on the other hand I'm very risk-averse and a massive perfectionist, so I have to do like 3 muslins before a final version of anything. But then I get distracted, which results in a lot of prototypes that I just wear even though they’re more a proof of concept than an actual garment. The most extreme example is from when I was a teen: I was experimenting with making my own chest binders, and the first one I made that worked out, which I wore for probably two years, was held together with ribbons and safety pins. Eventually I needed a new one, which I sewed fully, but for those first two years you can see the outline of safety pins through my shirt in every picture. 

### What would be your advice for starting sewists?

Start with something that interests you. Lots of folks are taught to start with samplers, zipper bags, etc., and that works if it will interest you to develop the fundamentals. But if you want to tackle something ambitious, buy some cheap fabric and go for it! It won’t be nearly as bad as you think it is, and there’s always more fabric. 

### Do you sew mostly for yourself, or for others like friends and family?

I mostly sew for other people, but I’ll make things sometimes because it seems easier to make a piece of clothing than to go and find it. I guess I’m a “make it if I don’t think it exists in the world” kind of sewer, but I’ll buy a tee shirt even though I could sew one. Or one time I sewed a pair of pants the day before a trip because I didn't have enough pants and going shopping sounded more inconvenient.

### What are you up to when you’re not making clothes or designing patterns?

I’m always doing something – woodworking, design, I occasionally code other things, I’m always washing dishes… I like puzzles, and finally finished a 1500 piece one that I kept taking months-long breaks from. I made a little free puzzle library for the finished ones, but nobody ever comes and takes any puzzles from me. 

### Do you have pets? Family?

I prefer people to animals, and I live with a partner in a beautiful, pet-free home. My partner and I share a philosophy of "the loved ones of my loved ones are my loved ones", which allows us to think about family really lovingly and expansively. I'm also lucky to have a great adult relationship with my family of origin, though I don't currently live close to them.

### If there was one person you could take with you to an uninhabited island, who would it be? Why?
Honestly, my partner is the person – we’ve lived together for almost 5 years, and being around each other constantly during the pandemic really brought us closer, (and taught us how to set better boundaries!) so I feel confident we'd be ok in a deserted island scenario. They would grow us food and I would build us shelter, and it would be great.

### Would you like to share ways to follow you on social media?
You can follow me on Instagram at @enoch\_tries\_everything, but be warned it’s very rarely updated.



