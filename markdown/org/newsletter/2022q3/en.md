---
date: "2022-07-01"
edition: "2022q3"
intro: "2022 Summer edition"
title: "2022 Summer edition"
---

Welcome to the 2022 Summer edition of the FreeSewing newsletter.
Here's what's in it for you today:
 
- 🦈 FreeSewing 2.21 adds five new patterns (4-minute read - by Karen)
- 🔨 Changes to our monorepo structure (2-minute read - by Natalia)
- 🚸 Honey, we shrunk FreeSewing: Adapting FreeSewing designs for kiddos (2-minute read - by Natalia)
- 👨‍💻 FreeSewing *afk* (1-minute read - by Lexander)
- 🕵️ Behind the Seams: Starfetcher (4-minute read - by Karen & Starfetcher)
- 💰 Should we be down because FreeSewing's revenue is down? (2-minute read - by Joost)

Let's jump right in!

&nbsp;  

&nbsp;

## 🦈 FreeSewing 2.21 adds five new patterns

FreeSewing 2.21 adds Bob, Hi, Lucy, Noble and Unice designs.

### Bob the bib

Long-time followers of FreeSewing may recognize Bob, a classic bib, and the result of the FreeSewing pattern design tutorial. Want to sew up Bob without learning how to develop a FreeSewing pattern? Now you can! Although we think you should still learn how to develop a FreeSewing pattern, like the folks below.

[Discover Bob on FreeSewing.org](https://freesewing.org/designs/bob)

### <strike>BLÅHAJ</strike>, nay Hi

When (the UK branch of) a certain Swedish yellow/blue colored furniture giant announced that it would discontinue its universally beloved plush shark, the internet did not handle it very well.
People love soft and cuddly sharks and the idea of ever being without one to keep you company when things are rough was quite frankly unsettling.

So plans were made, strategies discussed, but for a while it seemed we were just going to have to accept defeat.
Smash cut to Wouter Van Wageningen, one of FreeSewings' most senior pattern designers, who embarked on a singular mission: To save the sharks.
Suffice to say. He did. Because of course he did. 

Wouter named the pattern Hi and those of you who share his Dutch roots will get the play on words here 🦈 
So now you can sew up your very own Hi, a friendly and fabulous plush shark and frankly an internet icon. 

This is FreeSewing's first plush pattern, and as such it is not be tailored to any measurements, but it's still parametric! You can sew up Hi in any size from roughly 5 centimeters to 5 meters, and you can modify its mouth, its nose pointiness, and make your Hi "aggressive" (that's when you give it pointy teeth). Another great thing about Hi: it'll fit anyone in your life! Does your sibling, cat, in-law, crush, boss, GM, barista, or anyone else in your life need a Hi? Probably. Do you need a Hi? Almost definitely.
Does it need to be 5 meters long? No, but it wants to.

[Discover Hi on FreeSewing.org](https://freesewing.org/designs/hi)

### Lucy

[Lucy](https://en.wikipedia.org/wiki/Lucy_Locket) is a perfect accessory for the historically-inspired sewist, a historical pocket that you can tie around your waist, designed by SeaZeeZee. Traditionally, these could have been worn under other layers of clothing, creating an easy way to carry things that was obscured by skirts or aprons, but there's no requirement to hide your Lucy under a bushel (or a bustle). Make one in just about any fabric you like - Lucy looks great in that cute quilting cotton you couldn't resist, that scrap you love too much to throw away, or the textile that you're intimidated by but want to take for a test drive. A Lucy in sequins, velvet, or vinyl? Definitely cool. 😎

[Discover Lucy on FreeSewing.org](https://freesewing.org/designs/lucy)

### Noble

Hi isn't the only pattern release from Wouter Van Wageningen this quarter. For those looking to experiment with their own pattern drafting, Wouter has created the Noble block, a sleeveless prince(ss) seam block based on the Bella block pattern. Blocks are the basis for other patterns, so Noble doesn't have finishes or closures, but it makes a great, made-to-measure starting point for self-drafted patterns.

[Discover Noble on FreeSewing.org](https://freesewing.org/designs/noble)

### Unice

Last but not least, first-time FreeSewing designer Anna Puk has released a new underwear pattern, Unice! Unice is a variation on Ursula, a basic, highly customizable underwear pattern. Trying to figure out whether to sew up Ursula or Unice? Unice was designed to accommodate a full rear, so it might be a good one to try if you find that undies in your size don't provide adequate coverage in the back, or if your jeans are always tighter across the seat than the thighs or waist. Or, even better, make them both! After all, you can never have too many undies. (And if you do, please hop into the [Discord](https://freesewing.org/community/where/discord/) or onto our social channels, @freesewing_org on Instagram and Twitter, and let us know how they work out for you!)

[Discover Unice on FreeSewing.org](https://freesewing.org/designs/unice)

&nbsp;  

---

&nbsp;

## 🔨 Changes to our monorepo structure

Big things are happening.

There have been some changes in the monorepo structure. With the previous single yarn workspace in packages now split up in:
- designs for designs
- plugins for plugins
- packages for NPM packages that are neither design nor plugin
- sites for websites, backend code, our svg tiler and so on

The monorepo has been stripped of the individual development environments for designs. Instead, all development on designs should now happen in the lab. 
There's a new command `yarn tips` that you can run that will give you a quick summary of how to work within our monorepo. 
And you can run `yarn lab` to start the lab from the root of the repo, or from any design or plugin folder.

If you want to add a new design, run `yarn new design` and everything will be taken care of for you.

The old stand-alone development environment (`npx create-freesewing-pattern`) is deprecated (ever since v2.21 running it will show a warning about that) but still available.
Those who are looking for stand-alone development should try out the replacement that uses that same improved development environment as our monorepo.
To launch it run: `npx @freesewing/new-design`

Want a full list of what's new? Check out the [notes from the latest contributor call](https://github.com/freesewing/freesewing/discussions/2270).

&nbsp;  

---

&nbsp;

## 🚸 Honey, we shrunk FreeSewing: Adapting FreeSewing designs for kiddos

First dolls, now children?! FreeSewing contributors seem intent on making mini versions of our designs.

We wanted to talk a moment to highlight some of the great projects folks are making for their kids and some of the lessons they've shared. Don't miss the photos in the [showcase](https://freesewing.org/showcase/).

If you're interested in adapting a FreeSewing design for a young person, a few things to consider:

- **Make test garments!** Making a muslin is a good habit in general, and especially important when sewing for people whose measurements may not have been tested yet with a FreeSewing design as their proportions won't necessarily work smoothly the first time around. `comixminx` is the undisputed champion of Shin sewing trunks, having sewn several test pairs on the way to making wearable pairs for each of [her](https://freesewing.org/showcase/shin-swim-trunks-for-comixminxs-kid/) [kids](https://freesewing.org/showcase/more-shin-swim-shorts/).
- **Consider trying out a block.** As evidenced in `Bob3000`'s adorable [chore coat](https://freesewing.org/showcase/bob3000-chore-coat/) for his kid, based on the Brian block, the basic shape of a block might be a good starting point to which you can add design elements.
- **Use lots of ease when designing for toddlers.** `mathstitch` ended up drafting their own collared shirt and it turned out rather wonderfully. They shared some tips for anyone who might try to adapt an existing design in the future! They suggest adding heaps of ease because toddlers are so active and uncoordinated, tend to adopt unusual postures all the time like crouching and crawling, and some have big bellies and lots of puppy fat. 🐶 A short sleevecap is appropriate. If your kiddo is still in diapers, the shirt needs to flare at the hips to accommodate that, and you'll want to ensure the buttons end far enough up from the bottom of the shirt.
- **Add adjustable elements to make garments fit for longer.** `Rowan` made a tiny [Albert apron](https://freesewing.org/showcase/a-tiny-albert-apron/) for their kid's birthday and added adjusters to the straps. Great idea to maximize the number of wears they can get out of this very cute accessory.
- **Sew quickly.** `AMJ` reports having seen kids change sizes between fitting and sewing. 😀

If you're trying out one of our designs with your kid, we hope you'll come chat about it in [Discord](https://discord.freesewing.org/).

&nbsp;

---

&nbsp;

## 👨‍💻 FreeSewing *afk*

FreeSewing is going outside! FreeSewing will be part of the [May Contain Hackers](https://mch2022.org/) camp as a short talk by Lexander. Mark your calendar for July 24th, 09:40 PM CEST; it can be followed with a livestream. 

Lexander will describe about what FreeSewing is, Joost’s (and other volunteers’) motivations behind it, a bit about the tech, and why it’s important for fashion and clothing as a whole. More info is in the full description [on the event’s site](https://program.mch2022.org/mch2021-2020/talk/M9JWKM/).

&nbsp;

---

&nbsp;

## 🕵️ Behind the Seams: Starfetcher

### How did you learn about FreeSewing?

I can't quite remember, but I think I was searching for sewing patterns one day and had the glorious insight to use "open source sewing pattern" as a keyword. The search engine did its job.

### How did you become a contributor?

While reading the developer docs I found a few typos and decided to correct them, while starting on translations I found some more, and suddenly I was a contributor. Joining the contributor calls was the next logical step, and I haven't looked back since.

### What has been your contributor work so far?

Apart from fixing typos and broken links, I sporadically do some translation work and have coded three historically inspired patterns: Lunetius, Tiberius and Walburga.

### Are you a sewist? A coder? Both? Neither?

Both, and it depends on my mood what I like to do more.

### When and why did you start sewing?

As a child, my mother taught me the basics, but it wasn't until my late teens that I started to take it seriously when I decided to sew my own costume for my birthday party (my birthday parties were and still are always costume parties). I did lots of mistakes (like finishing the edges before sewing the parts together), but I was (and still am) incredibly proud of it. Then I took a break from sewing again, but rediscovered it in my middle tweens when I got back into cosplay.

### What is your daily job, outside of FreeSewing?

Right now I'm doing my PhD in experimental physics, so I have a good mixture of hands-on work at the machine and cursing a lot at the computer at 11PM.

### What are you currently working on?

Currently I'm working on making foam armour to complement the fabric parts of my costume (consisting of Lunetius, Tiberius and Walburga, of course). It's a new technique for me so it's lots of fun to play around with.

### Which project did you just finish?

I just finished coding and sewing Pythia the paenula, my upcoming FreeSewing pattern for another type of historically inspired cloak. Now I'm procrastinating on hunting down the last bugs.

### What sewing/coding project are you most proud of?

On the sewing side, I'm still very proud of the first costume I sew by myself, but the trickiest one so far is the Sailor Fuku I made a few years back. Oh, and the Victorian shirt with lots of pleating on the front, where I also had to adjust the sizing of basically everything (an experience that ultimately led me to FreeSewing).
Coding-wise, that's probably a work-related thing where I made some nice graphical representations with Python and LaTeX.

### What in your life are you most proud of?

That's a hard question! Probably all the combined experiences that taught me everything I know today.

### What do you love the most about sewing?

The magical feeling when you finish something and you put it on and it's just perfect.

### What do you hate the most about sewing?

The sinking feeling when you finish something and you realise something went wrong and your immediate future probably involves the thread picker or the cutting mat if you're unlucky. Oh, and hemming skirts, especially hemming two combined full circle skirts because you wanted the volume at 2AM.

### What’s the hardest part of sewing to you?

Laying out pattern pieces with the correct grainline and cutting things out without forgetting the seam allowance.

### What would be your advice for starting sewists?

Just dive right in! Don't be afraid to make mistakes and don't be afraid to ask for help, but just try.

### Do you sew mostly for yourself, or for others like friends and family?

Mostly just for me, though I tried to sew something as a present a few times - so far I never finished any.

### What are you up to when you’re not making clothes or designing patterns? - Would you like to share ways to follow you on social media?

I like table top roleplaying games (DSA, Cthulhu, ...), video games, reading, photography, fencing and archery (still an amateur, mind). I'm also responsible for directing the acting portion of my old schools musical group. No social media for me.

### Do you have pets? Family?

Sadly no pets, although my SO has a cute dog. I'm pretty close to my parents.

### Are you a dog person or a cat person?

Both! Though if I were forced to choose, I'd pick... a penguin.

### If there was one thing you could take with you to an uninhabited island, what would it be? Why?

Apart from things like water and food and a knife? Probably my ebook reader, upgraded with solar cells, and loaded to the brim with books for entertainment and survival. 

### If there was one person you could take with you to an uninhabited island, who would it be? Why?

That's tricky! If it's voluntary, my SO, but they'd have hard time without electricity and other perks of civilization. If it's not voluntary, someone who increases my chances of survival, like a really strong doctor.

&nbsp;

---

&nbsp;

## 💰 Should we be down because FreeSewing's revenue is down?

I'm going to assume you're familiar with [FreeSewing's revenue pledge](https://freesewing.org/docs/various/pledge/)? If not, go ahead and read it. I'll wait.

Over the first 6 months of 2022, FreeSewing's revenue was 25% lower than the (average) revenue of 2021. 

This is not entirely unexpected. There was an influx of new patrons during the Covid pandemic, and we are now on the down-slope of that wave. 
Many patrons who discovered FreeSewing because of our facemask pattern are now leaving us because they don't see the point in extending their support. Others are feeling the cost-of-living crisis and have either lowered their contributions or cancelled them altogether. 

I am truly appreciative of all these contributions, but seeing patrons leave does tend to make me wonder whether we have a problem?
I personally don't think so. But I'm not a 100% certain about that either. And on the bad days, it certainly feeds into my doubts about... well, everything really.

There are many different metrics you could point to that show FreeSewing is thriving. Whether it's the number of designs we have available, the size and activity of the community, or something as easy to measure as number of commits.

Yet still...

After mulling it for a while, I figured the best thing to do is just be transparent about what's going on: FreeSewing is doing fine, but we are seeing less financial support than we used to. Revenue will be lower this year, from the looks of things by at least 25%.
