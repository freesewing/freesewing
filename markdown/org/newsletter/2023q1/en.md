---
date: "2023-01-01"
edition: "2023q1"
intro: "Welcome to the 2023 Winter edition of the FreeSewing newsletter."
title: "2023 Winter edition"
---

Welcome to the 2023 Winter edition of the FreeSewing newsletter.

First up: Happy new year to those who celebrate. May 2023 bring you everything you've hoped for, and perhaps some nice surprises too.

As is a tradition this time of the year, our contributors enjoy a break to enjoy the holidays, and what you'll find below is made up almost entirely of the ramblings of me, Joost.

In addition, it's new year's day, so I'm not going to make this too long. Here's what's in store today:
 
- 🏁 2022 was the year of FreeSewing 2.22 (1-minute read - by Joost)
- ✋ 2023 will be the year of FreeSewing 3 (1-minute read - by Joost)
- 💜 The cost of loving (2-minute read - by Joost)
- 🕵️ Behind the Seams: Zwaluw (4-minute read - by Karen & Zwaluw)

Let's get right to it.

&nbsp;  

&nbsp;

## 🏁 2022 was the year of FreeSewing 2.22

You won't find this on the list of any 2022 retrospective, but this is not a newsletter for hot takes about the news, this is the FreeSewing newsletter. And for us, 2022 was the year we release FreeSewing v2.22 and decided it would be the last v2 release ever.

The [FreeSewing contributor call of 20 august 2022](https://github.com/freesewing/freesewing/discussions/2582) marks the official moment were we decided to wrap up development of v2 with one final release, and then turn our attention to version 3.

In the months leading up to this moment, we had already made great strides in trying to implement many of the things on [our road map](https://github.com/freesewing/freesewing/discussions/1278), and it feels weird to me somehow that only four months have passed since when I think about all the work that has been done on v3.

On the developer side of things, we've completely switched over already. FreeSewing.dev holds our developer documentation for v3, while the _legacy_ v2 documentation is relegated to v2.freesewing.dev.

Our development environment for v3 is also ready — run `npx @freesewing/new-design@next` to try it yourself — and we also rewrote our backend to support our future plans, like hooking up our development environment to the backend so designers can use the measurements data they have stored in their FreeSewing account to test their designs.


&nbsp;

---

&nbsp;

## ✋ 2023 will be the year of FreeSewing 3 

The current `next` release of FreeSewing is v3.0.0-alpha.4. The race has started now to turn that into `beta` and then finally put it in production on FreeSewing.org. 

I've talked about some of the new things in FreeSewing v3 in [our last newsletter](https://freesewing.org/newsletter/2022q4/).
I could talk about it more, but talk is cheap. You want to see it, right? Well you can't. It's not ready.
It was also not supposed to be ready. We started the effort late in August this year, and from the very start put the release at _sometime in 2023_. 

But, you can start the clock today and I promise that it will be out before the end of the year. If it's Q4, I will be a bit disappointed. If it's Q3, I will be happy. If it's Q2 I will be thrilled. And if it's Q1 I'll be very surprised.

The only thing that's really left to do right now — apart from copious amounts of polish and bug fixes obviously — is to write a new frontend. In other words, a new FreeSewing.org where you can actually use all of the cool stuff we've been working on.

In many ways, it will be the crowning achievement of version 3. The thing that brings everything together. 

No pressure.

&nbsp;

---

&nbsp;

## 💜 The cost of loving

FreeSewing's revenue during 2022 was `9.325,54` euro. That's down from `10.070,77` in 2021, which was in turn lower than the `10.736,82` of revenue in 2020. Still, it's more than double of the `4.109,38` euro revenue of 2019 and I think that's worth pointing out because 2019 was the last pre-pandemic year. 

We've seen an enormous influx of users, patrons, and revenue in 2020 undoubtedly because [our face mask pattern](https://freesewing.org/designs/florence/) was wildly popular during the PPE shortage that year. That peak has been tapering off ever since, and has pushed year-on-year revenue into a downward trend. Furthermore, inflation and the cost of living crisis has been particularly tangible this year, and I've received more than one apologetic message from patrons who wanted to continue supporting us but felt obliged to cut us from their monthly budget to ensure they would be able to support themselves and/or their families.

So I don't feel bad about revenue being lower this year. I think it's been a difficult year for many people, and we have always been looking for support from those who could spare it without hardship. Yes, it's nice to break the `10.000` barrier. Yes, I would love to get to `12.000` and reach `1.000` MRR (monthly recurring revenue) but I'm not going to let that get in the way of being proud of the work we do.

I am proud not only of the work we do, but because FreeSewing is a force for good in this world.
With the addition of this year's `9.325,54`, FreeSewing's contributions to [Médecins sans frontières/Doctors Without Borders](https://www.msf.org/) stands at `38.814,94` euro or about 41.6k US dollar. Money that helps people who are in a worse situation than we all are.

So I am proud of those numbers, and most of all I am proud of the FreeSewing patrons who are behind them. They are the real heroes.

&nbsp;

---

&nbsp;

## 🕵️ Behind the Seams: Zwaluw

One of our Contributor Call hosts sat down (virtually) with Zwaluw (who goes by Z or Zee) to learn a little more about their background and journey to becoming a FreeSewing contributor! The interview below has been edited for length, and any errors, oversights, etc. are entirely the fault of the interviewer!

### How did you learn about FreeSewing?
I don’t remember! I’m very active now, but I remember looking at the site a long while back and thinking it was cool, but I don’t remember how I got there… Maybe googling made-to-measure patterns?

### How did you become a contributor?
That I do remember, it was writing documentation! I don’t remember if Starf asked or I offered, but my first project was writing the documentation for [Lunetius](https://freesewing.org/designs/lunetius/), a historical Roman cloak.

### What has been your contributor work so far?
My first contribution work was the documentation for Lunetius, and I still help with documentation sometimes, but I’ve also started developing patterns. In particular, I’ve made [Lucy](https://freesewing.org/designs/lucy/), a historical tie-on pocket, and Jane. Jane is a to-be-released shift pattern (or underwear for historical garments), and there’s not a lot of patterns out there for those. For so many people in the historical sewing community, you make a shift and get it over with, and that’s not me. Jane gives you options on a pattern that’s pretty loosely fitted, but you might want more or less ease, different sleeves, etc.

### Are you a sewist? A coder? Both? Neither?
I’m definitely both! I’ve sewn for much longer, and FreeSewing is how I started to learn Javascript and Markdown. I’d wanted to learn, but I had done absolutely no coding before, and something about FreeSewing really appealed. I think because I thought, “If I learn this, I can make a pattern.” It’s a really cool way to learn about web design and how to build websites, and I love joining the Contributor Calls. (Note from the interviewer: you too can join the Contributor Calls, every other Saturday! Schedules and agendas are posted in the [Discussions](https://github.com/freesewing/freesewing/discussions) section of the FreeSewing monorepo on Github. The next one is [January 7th!](https://github.com/freesewing/freesewing/discussions/3201))

### When and why did you start sewing?
I first started sewing around when I was ten years old, so sixteen years ago, and I’ve been making my own clothes for most of that time. At some point, I got into historical sewing, and it definitely influences my modern clothing. I like to make historical things that also work for me in my daily life. For example, I wear a lot of walking skirts.

My dream project is a Victorian bustle gown, but it’s a lot of work. I do have a lobster bustle and corset, so maybe I will do a corset cover next…

### What are you currently working on?
Right now, I’m working on a quilt in shades of blue that is all hand sewn.

I like to have multiple types of projects going at once, though, so I am also working on a warm winter skirt made from IKEA flannel bedsheets in a beautiful gray and white plaid. Currently, I’m debating how to create the flannel waistband while keeping it from getting too bulky. I’ve also got some 1780s stays that are hand sewn except for the boning channels, with synthetic whalebone boning, and I need to make a bunch of new shifts, as some of my current ones are getting worn out.

### Which project did you just finish?
The skirt I’m wearing! It’s a wool skirt for going to Tromsø, Norway in the Arctic Circle and I needed very warm stuff for that. While I was there, I also made so many napkins for the people whose house I was staying in. Sometimes I’ll use handcrafts as a fidget.

### What sewing/coding project are you most proud of?
I think I’m most proud of Jane, a shift designed on FreeSewing that’s slated for release in 2023. That was my first coding project, and it’s done now, and functional! [Lucy](https://freesewing.org/designs/lucy/) I slapped together in a weekend, while Jane I’ve been working on for a year. 

### What in your life are you most proud of?
My family isn’t super crafty, but both my grandmothers were sewists, and my Dutch grandmother was a weaver, and I’m definitely proud that I’m continuing that, even though they never got a chance to teach me. I have my grandmother’s old looms, and my great grandmother's sewing machine. Looms are too big for a studio, but the sewing machine is one of those ancient black cast iron Singers that you crank by hand, and it still works! I can’t date it specifically, because it is from before they had serial numbers (which means it’s pre-1860s).

### What do you love the most about sewing?
I love the meditative aspect of sewing. I can’t do meditation, and I’m not a mindfulness person, but when I sit down with a project and hand stitch, it’s very calming. I will machine stitch some things, too, but I find myself thinking: “This is so fast, I don’t enjoy this.”

### What’s the hardest part of sewing to you?
The historical sewing community can be pretty inaccessible – if you don’t have a lot of money or time, then getting into this hobby can be really hard, and I wish that wasn’t the case. It’s part of what makes FreeSewing so cool – everyone’s donating their time and skills, so you’re not paying $30 for a pattern that doesn’t even properly fit you.

For me personally, I think the hardest part is pacing, and making sure I don’t overdo it and hurt my hands. I do my best to have projects in different buckets: complicated, easy, practical… And I switch between them to not completely burn myself out. I need to recognize when I need to not sew for a few days, and then usually I end up switching to FreeSewing things!

### What would be your advice for starting sewists?
Do something you enjoy. Even if it’s a big project and it’s overwhelming, it’s more fun to do that than to do something easy. And don’t forget your thimble. Historical costuming folks so often don’t have a thimble, or don’t stitch ergonomically, and it can really hurt your hands. I did not start out as a hand sewist – I took a class with Sarah at Williamsburg.  I basically spent an hour sewing, and my hands hurt, and it didn’t work, and she saw and taught me her method. I’ve been handsewing ever since. (You can find Sarah on Instagram at [@sewnstories](https://www.instagram.com/sewnstories/).)

### Do you sew mostly for yourself, or for others like friends and family?
I sew mostly for myself. I have made things for other people occasionally, but not a lot. Sometimes I have a time where I don’t have enough spoons and I really want to make things, but I already have enough towels, aprons, etc. So then I’ll make things for other people. And I am theoretically available for commissions (but it’s slow).

### What are you up to when you’re not making clothes or designing patterns?
Reading books – I don’t have any favorite genres, but my favorite author is Terry Pratchett. I’m excited that we’re finally getting a Discworld movie version that looks good! Besides reading, I spend some of my time playing video games (I’m currently playing Destiny 2) and resting.

### Would you like to share ways to follow you on social media?
I’m bad about posting, but my Instagram is [@zwaluwz](https://www.instagram.com/zwaluwz/). It also includes pictures of my cat, who was leash-trained!

### Do you have pets? Family?
I had a cat named Q, but he passed away last April. I’m hoping to move, so that I can have a cat again, because my landlord won’t let me get a new cat.

### Are you a dog person or a cat person?
Both! I do not discriminate in animals. I got to handle a bunch of snakes once, and it was the happiest I’ve ever been. Maybe I should just get a lizard… Or a hognose snake…

### If there was one thing you could take with you to an uninhabited island, what would it be? Why?
A sewing project! 

### If there was one person you could take with you to an uninhabited island, who would it be? Why?
I don’t think I would take people, I’d just have a nice quiet time.
