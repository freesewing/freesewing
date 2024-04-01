---
date: "2024-04-01"
edition: "2024q2"
intro: "Welcome to the 2024 Spring edition of the FreeSewing newsletter."
title: "2024 Spring edition"
---

Welcome to the 2024 Spring edition of the FreeSewing newsletter.

Here's what we've got for you today, no joke:
 
- 👕 FreeSewing 3.2 brings Tristan, Lumina, Lumira, and more (3-minute read by joost)
- 📨 Email just got harder, again (1-minute read by joost)
- 🕸️ Building FreeSewing's web of trust in the wake of the XZ backdoor attempt (5-minute by joost)
- 🤔 How FreeSewing's challenges have shifted over time (2-minute read by joost)


Shall we get started?

&nbsp;  

&nbsp;

## 👕 FreeSewing 3.2 brings Tristan, Lumina, Lumira, and more

We released FreeSewing v3.2 earlier during Q1 2024 and it includes 3 new
designs, as well as a range of bug fixes and improvements.

Let's have a look at the highlights:

### The Tristan Top

First up, there is [the Tristan Top](https://freesewing.org/designs/tristan). Tristan is a top with princess seams and (optional) lacing at front or/and back. It’s origin story is the need for a costume for a Renaissance festival, so that is probably a good indicator of what to expect.

Tristan was design by Natalia who also [wrote a blog post about the new Tristan design](https://freesewing.org/blog/our-newest-design-is-the-tristan-top), so that's a great place to get all the details about this new design.

### The Lumina and Lumira Leggings

I’ll give you a second to scan that title again, but yes there are two different leggings patterns with similar names: [the Lumira Leggings](https://freesewing.org/designs/lumira) and the [Lumina Leggings](https://freesewing.org/designs/lumina).

Both were born out of Wouter’s desire for good cycling gear, and I suggest you check out the designer notes for both [Lumina](https://freesewing.org/designs/lumina#notes) and [Lumira](https://freesewing.org/designs/lumira#notes) to fully appreciate the difference between these designs, why they differ, and what would work best for you.

### Bug fixes and improvements

Regular readers of the newsletter will know that we continiously roll out
improvements on FreeSewing.org and that those are not tied to a new release,
but it's a good opportunity to list them so here are some highlights of the bug
fixes and improvements that went into the 3.2 release:

- Sandy has [a new panels
  option](https://freesewing.org/docs/designs/sandy/options/panels) that was
  added by [Paula](https://github.com/freesewing/freesewing/pull/5861). You
  could aways create your circle skirt out of a number of a similar patterns by
  doing the match yourself, but now the pattern will take care of that for you.
- What started out as [a bug report for the biceps ease on
  Jaeger](https://github.com/freesewing/freesewing/issues/5999) ended with a
  change to the way the armscye is calculated on Brian, in particular the depth
  of the armhole. Given that Brian is our most foundational block, this will
  have ripple effects on many other designs, you can expect that out-of-the-box
  the armscye will reach a bit lower.
- In [Carlton](https://freesewing.org/designs/carlton) — and thus in
  [Carlita](https://freesewing.org/designs/carlita) — we have fixed and issue
  where the seam allowance on the undercollar was incorrectly drawn.
- In [Charlie](https://freesewing.org/designs/charlie), the back pocket welt
  (4) and front pocket facing (8) incorrectly indicated to cut 2 instead of 4
  in the cutlist. This too is resolved.
- In [Hugo](https://freesewing.org/designs/hugo), we fixed a bug that caused
  the design to error when the complete setting was off, and we fixed an issue
  where the front pocket opening would get increasingly narrow as the hip
  circumference increased.
- We’ve added a new
  [Path.combine()](https://freesewing.dev/reference/api/path/combine) method to
  [our core API](https://freesewing.dev/reference/api). Its origins lie in a
  discussion in [issue
  #5976](https://github.com/freesewing/freesewing/issues/5976) which was
  originally filed as a bug report about how Path.join() connects gaps in the
  joined paths — caused by either `move` operations, or a difference between
  the end and start point of joined paths — to be filled in with a line
  segment. That behaviour is expected/intended, but we’ve added
  `Path.combine()` to faciliate the other behavior: Combining different paths
  into a single Path object without alterning any of its drawing operations.
- The [title macro](https://freesewing.dev/reference/macros/title) now can be
  configured with a `notes` and `classes.notes` setting in its config, allowing
  designers to add notes to (the title of) a pattern part.
- Our [i18n plugin](https://freesewing.dev/reference/plugins/i18n) now supports
  now supports translation of nested arrays of strings, which gives designers
  more flexibility to concatenate translated parts of strings. 

The [FreeSewing 3.2 announcement blog post](https://freesewing.org/blog/v3-2-0) has all the details.


&nbsp;

---

&nbsp;


## 📨 Email just got harder, again

If you are reading this in your inbox, and not an archived copy on
FreeSewing.org, then we were able to deliver this email to you, which is good
news.

What you may not realize is that doing so is not exactly trivial, and hasn't
been for years. But recently, things have gotten even more complex.  Gmail
(Google) and Yahoo for example have [implemented new restrictions in the first
quarter of
2024](https://www.xomedia.io/blog/a-deep-dive-into-email-deliverability/) which
requires additional work on our end to maximize the chances of this email
actually landing in your inbox.

Furthermore, so-called _bulk email senders_ are subject to the most stringent
checks. If you send 5000 messages a day, you are considered a bulk sender and
will be subject to extra scrutiny. As this newsletter has about 14k
subscribers, we are being held to the highest possible standards.

Obviously, nobody likes spam, and I am not advocating against these rules.
It's just that the amount of time and effort required to make something as
seeminly trivial as sending out an email work at scale is ever-increasing as 
the internet trends towards a de-facto pay-to-play model.

For now, I am still making those efforts, and hopefully they proved sufficient
to get this to your inbox. But it's something we may need to revisit at a later
time if it becomes an increasing strain on our limited time and resources.


&nbsp;

---

&nbsp;

## 🕸️ Building FreeSewing's web of trust in the wake of the XZ backdoor attempt (5-minute by joost)

Depending on where you get your news from, you might have heard or read about
[the backdoor attempt of the xz compression
utility](https://arstechnica.com/security/2024/03/backdoor-found-in-widely-used-linux-utility-breaks-encrypted-ssh-connections/).

In a nutshell, a malicious actor attempted to introduce a backdoor in this
utility, which ultimately was an attempt to smuggle a gated RCE exploit into
SSHd.

Or, in [ELI5](https://en.wiktionary.org/wiki/ELI5) terms: Somebody contributed
code to a small library that had nefarious intent. It was done in a sneaky way
and the ultimate target was not the library itself, but rather another software
project that uses this library: The Secure Shell Deamon. A _daemon_ is just a
cooler word for a _service_ on a computer, because why not make things cooler.
This particular daemon or service, the _secure shell_ daemon is responsible for
handling secure shell (SSH) connections. It's the gold standard for remote
management of Linux (and unix) systems.

The code smuggled in a gated RCE backdoor. RCE stands for _remote code
execution_, meaning it allows you to _do stuff_ remotely without needing to
authenticate or anything. Or to put it differently, it allows one to control
a remote computer system they normally should not have access to.
The fact that it is _gated_ means that the author of
the malicious code took steps to ensure that only they could use the malicious
code. Like a backdoor with a key.

It's hard to overstate the gravity of this attempt at backdooring essentially
every Linux system on the planet.  It's not only the world's most widely used
operating system, its dominance of server operating systems is overwhelming.
Or as I often say: _Anything that matters runs on Linux_. 

This is an ongoing story and I for one am hoping it will be made into a Netflix
mini-series starring David Cross in the role of [Andres
Freund](https://github.com/anarazel), but I digress. This is the FreeSewing
newsletter, so I wanted to lift something out of this story that I think
is relevant to FreeSewing, or really to any open source project out there.

### Maintainer burnout and the long con of gaining trust

One of the fascinating elements of this story is _who_ contributed the changes,
and why they were accepted without sufficient scrutiny to reveal the malicious
intent of the contribution.

Because the user who made them had been contributing for __years__ to the project
and in light of this work had risen in status to a level where there was a lot
of implicit trust based on their work, despite knowing next to nothing about
who or what goes behind username `JiaT75` (in this case). Such a _long con_ is
a significant investment of time and effort, so the currently held assumption
is that this was a nation-state actor (think NSA or some other country's
equivalent).  It's also important to note that the xy maintainer was having a
hard time dealing with the long tail of responsibilities of maintaining
software and was actively looking for help to stave off burnout.  It's a
scenario that is shockingly common across open source projects and creates a
situation where malicious actors can all too easily take advantage of exhausted
maintainers desperate to offload some of the work.

### Establishing a web of trust

This problem of *who can you trust* is of course not new. One way to counter it
is by establishing a _web of trust_.  This is how things are done in larger
open source software projects involving many volunteers, such as [the Debian
project](https://www.debian.org/).

In practical terms, such a web of trust is built upon relationships between
people who know and have verified each other's true identity.  For example,
there's a number of people in the FreeSewing community that I have met in real
life. We've not merely met face to face, but have spent time together, we know
where we live, we know each other's partners or family, or have some other
tangible way that provides a high level of assurance that this person really is
who they claim to be.

Those people, in turn, can have similar connections with others who they know,
have met, and trust to a level that goes well beyond the online world.  This
creates a web of trust where you can trust your friends, and the friends of
your friends and so on.

In light of current events, and in acknowledgment of the rapid accelaration of
what is possible with generatative artificial intelligence, FreeSewing will
henceforth restrict all write access or elevated privileges to community
members who are part of FreeSewing's web of trust.

We will of course continue to accept -- or rather review -- contributions from
everyone. But permissions that unlock the potential to do harm will be
restricted to people for whom trust has been established AFK (away from
keyboard).

In order to facilitate building such a web of trust, we will start documenting
these connections between people.  This will allow people who are looking to
take on more responsibilities within FreeSewing to look at its web of trust and
see who lives close to them so they can hook in to our web of trust through
that person.

I realize that FreeSewing is extremely unlikely to be the target of a backdoor
attempt by a nation state actor, but adopting best practices and being
transparent about how we do things is a good idea regardless.

So, I will start building and documenting this web of trust over the next couple 
of weeks, and review all access control and permissions to make sure we are 
doing everything we can to prevent even the most dedicated actors from poisoning
the well.

&nbsp;

---

&nbsp;

## 🤔 How FreeSewing's challenges have shifted over time

Did you know that [FreeSewing v1 was released 7 years and 7 days
ago](https://freesewing.org/blog/announcing-freesewing)?  Since that time we've
made many changes big and small, and our core library and plugin system have
matured into a reliable -- and certainly opinionated -- way to design parametric
sewing patterns.

The challenges that are most interesting from a technical point of view have
been more or less solved. What's left is the user-facing side of things, or
the user experience (UX) as we like to call it.

FreeSewing can do a lot, so how make all of that functionality available to the
users without overwhelming them? Is that even possible on mobile, which is the 
dominant way in which people go online now. How do you create it an intuitive experience,
or guide someone who arrives on FreeSewing.org after a _free sewing patterns_
Google search towards an understanding of what FreeSewing is and does in the handful of
seconds that people are likely to give it a chance before moving on to the next 
link in their search results.

To be clear: I do not know the answer to these questions. But it is
increasingly what we spend our time on. The percentage of people out there who
use our software directly is insignificant compared to the amount of people who
(only) consume our software through our website. For most visitors, FreeSewing
__is__ a website and if it is anything else, that is probably not clear to them,
or even relevant.

Obviously there is room for improvement, but often there is no one obvious path
forward. Perhaps -- or should I say almost certainly -- this is an area where I
lack the talent or skill to come up with some sort of grand overarching
strategy. But I find myself second-guessing a lot of my own ideas or impulses
in this area.

So, I was wondering if we could do a little experiment. An experiment where I
ask you -- my dear reader -- a simple question. Are you ready for it? Here 
is the question:


> **What is FreeSewing?**

I'd love to hear your answer. You can simply hit reply to let me know.

<small>_PS: I burried this question at the end because I feel if you read through all of
what came before, I probably want to hear your thoughts._</small>


