---
date: "2023-07-01"
edition: "2023q3"
intro: "Welcome to the 2023 Summer edition of the FreeSewing newsletter."
title: "2023 Summer edition"
---

Welcome to the 2023 Summer edition of the FreeSewing newsletter.

Here's what's we've included for you today:


- 🚨 Intermittent signup trouble as v2 infrastructure struggles with load  (2-minute read by Joost)
- 🕵️ Behind the Seams: Jasmine (6-minute read - by Jasmine & Karen)
- 🪡 Technique of the week (2-minute read - by Karen)
- 🙏 Help us with social media (2-minute read - by Bob & Karen)
- ⚫ It's always darkest before dawn (3-minute read by Joost)

&nbsp;

---

&nbsp;

## 🚨 Intermittent signup trouble as v2 infrastructure struggles with load 

FreeSewing has recently been experiencing intermittent email delivery issues,
which causes problems for new users trying to sign up, or other actions that
rely on transactional emails, such as password resets.

The underlying issue is that we are getting rate-limited by the SMTP relays we
use to send out these transactional emails, and this causes people to wait in
vain for their signup email, password reset, and so on.

We have been using a free-tier service for the delivery of these messages, and
historically this has worked fine for us.  There's been moments in the past
where a large influx of new users would trigger these problems, for example
during the height of the PPE shortage in the early stages of the COVID pandemic
when FreeSewing (and our face mask pattern) was linked to in the 
New York Times, Forbes, and several other new outlets that dwarf us in scale.

What used to be an exceptional event is now becoming more common, and it's
something that I personally tend to lose sleep over because it
disproportionately impacts the on-boarding process. Sure, there's going to be
the occasional user who will have trouble resetting their password. But the
vast majority of people who are impacted by this are new users, who are
attempting to sign up.

It is  a bad first impression when they can't get in, and as we all know, bad
first impressions can be hard to recover from.

After mulling it over for a while, I've decided to... do nothing. Or rather, to
keep working on the more permanent fix, which is the v3 infrastructure where
we've switched transactional email to a different partner where we are a paying
customer, so there will be no rate limiting.  Downing tools now to go
firefighting on the current production v2 infrastructure would only delay the
release of v3, which will resolve this problem once and for all.

As a mitigating factor, we have already migrated the delivery of this newsletter to our new infrastructure, as this will lighten the
load on our *budget* of transactional emails per day.  So
unlike before, we're actually paying money to get this to your inbox. It's not
a lot of money per email of course, but it's just one of the many changes we
need to make to scale up FreeSewing.

So, apologies to all those people who have been impacted by these intermittent
issues. I know that nothing I say here can undo the frustration of hitting
refresh on your inbox and not getting that email. But I wanted to be open about
the underlying issues and why -- confronted with a lot of work and limited
resources -- I've decided to keep my eye on the prize.


&nbsp;

---

&nbsp;

## 🕵️ Behind the Seams: Jasmine

If you haven't met Jasmine yet, you're missing out (and you should come hang out in our [Discord](https://discord.freesewing.org/)). She's got some cool sewing projects under her belt, but another big reason we reached out to interview her was the exceptional contributions Jasmine makes to the FreeSewing community. Have a question, a problem, or a celebration to share? Jasmine has cheered on and helped out countless folks in the community and brings support and joy (and incredibly cute puppies) to the folks of FreeSewing. So without further ado, here's a little bit more about one of our favorite FreeSewists!

### How did you learn about FreeSewing?
I think it was in search of a way to draft a body block...

My body is proportioned in a way I don't really find easily in ready made patterns. So the idea was to figure out a basic block to use as a template when adjusting patterns.

### How did you become a contributor?
I'm a contributor? When did that happen? I guess it started with sharing my makes with the community, and then hacking the Sven sweater to emulate an oversized sweater I loved but absolutely couldn't afford.

### What has been your contributor work so far?
The [family of Florents](https://freesewing.org/showcase/matching-florents/) have found their way onto the showcase pages, and the [hacked Sven](https://freesewing.org/showcase/drop-shoulder-sven/) did as well. I also wrote out how I adapted the design to an oversized drop-shoulder style.

### Are you a sewist? A coder? Both? Neither?
A sewist. Learning to code is on my wish list, but I don't have the bandwidth for it at the moment.

### When and why did you start sewing?
I've wanted to learn to mend for a long time, as well as adjusting the fit on bought items. The same proportions that don't fit into sewing patterns easily also make it so I can get into standard sized clothes. But they never fit me properly. Everything tends to gape at my waist.

### What is your daily job, outside of FreeSewing?
I'm an X-ray technician at a small hospital. For the most part, I do hospital radiology, but a small portion of my hours is spent on patient radiation dose management and optimisation.

### What are you currently working on?
Sewing is mostly paused at the moment as my partner and I have a lot of renovation projects we need to focus on right now. There's a small handsewing project I'll work on to kill time during a quiet night shift at work, but nothing concrete at the moment.

### Which project did you just finish?
I just finished some adjustments on a pair of trousers I made two years ago. They're a loose fit with a drawstring waist, and my first sewing project. I was thrilled even just managing to follow the instructions at that point, but the back and front panels are identical. With my body shape and rear estate, to use coined FreeSewing lingo, that's not ideal. So I removed some material from the front, and added patch pockets from some scraps I had left of the fabric.

### What sewing/coding project are you most proud of?
The loose fitted pleated trousers I made after the Folkwear Rosie the Riveter pattern. It included a lot of new challenges I'd never taken on before. I'm sort of still picking projects in a way that forces me to learn a new thing each time, and this one definitely pushed the limits of my confidence.

### What in your life are you most proud of?
There's so much to choose from. Some pieces of my writing? The ones where I dragged my guts and tears and snot across the page? I don't know. Stories and art matter. Certainly. But I think right now it's the puppies we raised. Seeing them come into the world, watching them waddle around and explore, and help them grow into wonderful family members for their future humans? That might be it. I'm already both dreading and looking forward to our second litter.

### What do you love the most about sewing?
The way the tactile work helps settle the chaos in my brain. When I hit the right rhythm, it can feel meditative. 
And I end up with garments that do what I want them to, rather than having to search endlessly for what will end up as a compromise both in terms of fit and style, and sustainability and fair labour issues. Plus-sized shopping can feel like one of the seven levels of hell.

### What do you hate the most about sewing?
Cutting.

### What’s the hardest part of sewing to you?
Usually, that's knowing when to stop. I will either fall into a hyperfocused rabbit hole and then realise it's 4am and possibly time to go to sleep, or I'll just keep doing one more seam and then one more, and then I get so tired I make a stupid mistake.

### What would be your advice for starting sewists?
Sew things you're excited about. Practice projects like bags and bookmarks are great, but if you're motivated to finish a thing and use it, it becomes so much more fun. If you're prone to self-doubt, picking projects to expand or solidify your skills gradually can really work well. But if you're excited about it, and eager to get to work, by all means, go for that lined coat with lovely construction details and tailored elements. (Thinking of the lovely coats and jackets FreeSewing features.)

### Do you sew mostly for yourself, or for others like friends and family?
Mostly myself, but two of my Florent triplets were made for relatives, and last winter I made a bunch of wristwarmers out of offcuts of sweater fabric, as stocking stuffer gifts for my family.

### What are you up to when you’re not making clothes or designing patterns? Would you like to share ways to follow you on social media?
Lol, how much space do we have here? As already mentioned, my partner and I ate licensed breeders of Belgian Tervuren Shepherds, though we stick to a litter every two years, pretty much. With the amount of time and energy invested in the puppies, more would not be sustainable. We also compete with our girls at dog agility trials and conformation shows. 
And then I'm also a writer, poet, narrator, and podcaster. Links to my creative work can be found at [JasmineArch.com](JasmineArch.com), and I also venture onto Tiktok now and then, where I'm [@jaztellsstories](https://www.tiktok.com/@jaztellsstories).

### Do you have pets? Family?
We currently have four dogs, though that number is set to grow in the coming years, I suspect.

### Are you a dog person or a cat person?
I like cats and will definitely want one as soon as my Lucie girl is not with us anymore. She loves cats too, but a little too much, I'm afraid. The cat would not be amused. But dogs are closer to my heart. The connection we have through working and training with our dogs is something I don't see happening with a cat anytime soon.

### If there was one thing you could take with you to an uninhabited island, what would it be? Why?
Oomph. Only one? A well-stocked ereader that has a solar cell to recharge.

### If there was one person you could take with you to an uninhabited island, who would it be? Why?
Shit. Can't I go alone? The older I get, the more of an introvert I'm becoming. Otherwise, I'd want one of my dogs. My youngest, Vroni, makes an excellent blanket in the evening, and she's always happy, cheerful, and ready for a game of some sort. While some humans make for excellent company, they're usually a bit heavy to use as a blanket.

&nbsp;

---

&nbsp;

## 🪡 Technique of the week (X-minute read - by Karen)

First things first, yes, this newsletter comes out quarterly, so this title's moderately apocryphal. "Technique of the quarter" lacks panache, so here we are. Just work with us.

In a recent [Contributor Call](https://freesewing.org/community/calls/), some FreeSewing contributors mentioned that great tips and techniques sometimes get shared between the community on [Discord](https://discord.freesewing.org/), and it would be great to share them more broadly. So, here goes!

A few weeks ago, a new sewist was having trouble with the top thread snapping over and over, and it led to some great troubleshooting tips. While this time, it didn't work (sometimes you have to throw in the towel and get your machine serviced, like if the timing's off), we thought the suggestions would be great to share!

### Is your thread snapping when you try to sew? A few things that might be worth checking...
- The tension might be off. It's usually a numbered dial near the top of the machine, and it should generally be set to around 4 or 4.5, unless you're tinkering with it or more familiar with tension. If you're having problems and the tension is set to 2 or 7 or something, odds are high that's the problem. 
- Do you have the presser foot up while you're threading the machine? This separates the tension discs, so your thread can slip between them.
- Maybe something's up with your tension discs themselves. These are the little discs that your thread travels between before it goes through the takeup lever. They hold the thread at the right tension, and if your thread slips outside of them, it can cause all sorts of problems. If the thread's definitely between the tension discs, but you think they're the source of the issue, make sure they're all cleaned out and no lint or dust is caught between them.
- Make sure you've got the right bobbin. Sometimes they look right, but even a minor variation from what's recommended for your specific machine can cause major problems. Once you're sure of that, make sure the bobbin is loaded in the right direction!
- It's also always worth making sure you've got a good fresh needle! The wrong size needle for the fabric can mess up your thread tension and your fabric.

Good luck sewing!

&nbsp;

---

&nbsp;


## 🙏 Help us with social media

Hey! Did you know FreeSewing is on social media? If the answer to that question is no, well, you're not alone. We could use some interested parties who are socially savvy to pick up the loose ends we've left trailing around Instagram, Reddit, and other platforms. 

### What platforms do you need help with?
Currently, FreeSewing is on [Discord](https://discord.freesewing.org/), [Facebook](https://www.facebook.com/groups/627769821272714), [Instagram](https://instagram.com/freesewing_org), [Reddit](https://www.reddit.com/r/freesewing/), [Twitter](https://twitter.com/freesewing_org), and [YouTube](https://youtube.com/channel/UCLAyxEL72gHvuKBpa-GmCvQ). (If you want to check out the whole list again later, you can find all of them here: [Where to find us](https://freesewing.org/community/where/).)

Frankly, I don't think we're going to say no to support with any of them, but in particular our Instagram and Reddit accounts could use someone at the helm, and it's been a while since our YouTube had exciting new content.

### What would I actually be doing?
Great question! It's important to FreeSewing that people volunteering their time are getting to work on things that they find interesting, joyful, motivating, etc. So, if you've got strong thoughts on the way one of these items could or should be managed, we're all ears. That being said, sometimes guidelines are helpful, so here's a little info.

**Instagram**: This person would at least monitor messages and tags, and would re-post cool makes from FreeSewing users that tagged us or used one of the [FreeSewing hashtags](https://freesewing.org/community/hashtags/). You would abide by the [Community Standards](https://freesewing.org/docs/various/community-standards/) in all of their interactions on behalf of FreeSewing. If you wanted to go above and beyond, you might actually create content, pulling from makes posted in the showcase, cool things happening on [Github](https://github.com/freesewing/) or [Discord](https://discord.freesewing.org/), updates from [Contributor Calls](https://freesewing.org/community/calls/), etc.

**Reddit**: This person would moderate the [FreeSewing subreddit], making sure that contributors were adhering to FreeSewing's [Community Standards](https://freesewing.org/docs/various/community-standards/). You would answer questions where possible and function as a connector to the rest of the FreeSewing community in cases where questions and contributions should be shared with more contributors. 

### What if, like so many before me, I can't commit long-term but would like to contribute *something*?

**Create a YouTube tutorial**: You know how we said that our YouTube could use some new content? If you're ever inclined to make, for instance, a tutorial for a pattern, a video on how you hacked something to work for you, a how-to on some aspect of developing and contributing code to FreeSewing... Well, this list could go on, but the short version is that we'd love to see it.

**Join our Facebook group or Discord**: It's only fun if it's a community.

**Write for the newsletter**: If you've used a FreeSewing pattern for something interesting, developed a cool new contribution for FreeSewing, would love to share a deep dive on a sewing technique, we'll gladly help get it into the newsletter, onto the Showcase, or wherever it best fits.

You can let us know if you're game to help out with any of these by simply replying to this email, or by hopping in the Discord.

&nbsp;

---

&nbsp;



## ⚫ It's always darkest before dawn

I had to look it up but at the beginning of this year, I wrote the following
about the release of FreeSewing version 3:

> *You can start the clock today and I promise that it will be out before the end of the year.* 
> *If it's Q4, I will be a bit disappointed. If it's Q3, I will be happy.*
> *If it's Q2 I will be thrilled. And if it's Q1 I'll be very surprised.*

Today marks the start of Q3 and so the pressure mounts to deliver on that promise.
I had initially penciled in the 25th of August as a bit of a hard deadline
because it marks 6 years to the day since I launched FreeSewing.org.

If I had been smart, I would have gone back to [that announcement blog 
post](https://freesewing.org/blog/open-for-business/) and heeded the warning in
its prophetic opening sentence:

> *When I released freesewing core back in March, I did not expect it to take
> another 5 months to finally have a proper front-end for it, but here we are.*

Because this is exactly the situation we find ourselves in today. The
foundational work is largely completed. We may still tweak things left and right
as we make progress, but the main effort is now on building a new frontend for
our flagship website. Somehow, we need to make all of that work under the hood
available to you in a way that is simple yet powerful, and intuitive despite
FreeSewing providing functionality that is not what people typically expect from
*a sewing pattern website*.

I am no longer certain that I'll make that self-imposed August 25 deadline.
Although I am still cautiously optimistic that by the end of this quarter, when
the next edition of this newsletter rolls around, we'll have reasons to
celebrate. Still, it will be ready when it's ready. Estimating the amount of
time it will take to write software is notoriously difficult when it's your day
job, it gets increasingly more hand-wavy when you are limited to your evenings
and weekends to move the needle.

This somewhat stoic *it will be ready when it's ready* attitude does not mean I
am less determined to make it happen. It's more the realization that as much as
I want to sprint to the finish line, this is more like a marathon. And blowing
up before the finish line is a clear and present danger.

The last month or so has been difficult for me. The increasing pressure to
deliver had sucked most of the joy out of my FreeSewing work, and I found
myself irritable and easily triggered. I was attending a session on burnout
prevention at work recently, and I recognized so many of the warning flags in
myself that I realized that staying the course was too dangerous.

My commitment to the success and growth of FreeSewing remains unwavering.  On
the other hand, I felt something had to give, so I ultimately decided that the
best way forward for the foreseeable future would be to *only* focus on getting
v3 out the door.

So for the time being, and probably at least until v3 is ready, I am taking a
step back from the community to allow me to work on FreeSewing free of
distractions. It is this same somewhat hermit-like focus that has brought
FreeSewing into this world, it's what brought you (the current) FreeSewing v2, 
and I believe it will get us to FreeSewing v3 as well.

I'm in a better place now. It was touch-and-go there for a moment, and I'd like
to apologize to those members of the community who had to deal with my
increasingly frazzled mental health in the weeks leading up to my course
correction.

I'm still not sure I'll make the deadlines I've set out for myself. But I feel
positive and hopeful again that the work we're doing is worthwhile and will pay
off in the end. And -- should there by any doubt about that -- I know for a
fact that the FreeSewing community is perfectly wonderful without me around too.
And on some of my more difficult days, probably even more so.

