---
author: 1
caption: "This image is probably the only thing in the post you can skim diagonally"
date: "2018-02-14"
intro: "The General Data Protection Regulation of the European Union: Our battle plan."
title: "The General Data Protection Regulation of the European Union: Our battle plan."
---

This blog post is about the General Data Protection Regulation (GDPR) of the European Union (EU). 
While I cover the basics of GDPR, the main focus is on how it impacts freesewing.org, and what we plan to do to in the 100 days that remain
before GDPR goes into force.

This is a bit of a long read, so here's a table of contents:

## Thoughts on the EU's GDPR

I have a love/hate relationship with the European Union. 
I love what they do and what they stand for, I hate how they do it.

![I totally get this dude](https://posts.freesewing.org/uploads/rage_quit_fff821e695.gif)

The GDPR is no different. 
It's an important piece of legislation that raises the bar for online privacy, which is great.
But as I was reading up on the subject, I felt the urge to rage-quit because OMG bureaucrats.

Allow me to explain.

### Privacy needs protection
For better or for worse (I believe for worse) the internet has settled into a modus operandi 
where you pay for *free stuff* with your personal data. 
Some people call it [people farming](https://ar.al/notes/we-didnt-lose-control-it-was-stolen/), and I think that's a great term.

The [frightful five](https://www.nytimes.com/2017/05/10/technology/techs-frightful-five-theyve-got-us.html)
are vacuuming up ever more of our personal lives. 
Short of never going online, there seems to be precious little we can do about it.

### Why the EU is the best
This problem is too big to tackle by any of us. 
Who could possibly stand up to the combined power of the tech giants?

Well, how's this for a CV:

  - Fined Facebook 110 million euro for misleading statements about their WhatsApp purchase
  - Ordered Amazon to pay 250 million euro extra taxes in Luxembourg 
  - Fined Google 2.4 billion euro for abusing its dominant position in search
  - Ordered Apple to pay 13 billion euro extra taxes in Ireland

![We're the EU, bitch](titanfall.gif)

When it comes to tech giants, the European Union is all stick/ no carrot.

The General Data Protection Regulation enforces privacy policies that respect users' rights.
It applies to all EU citizens, all the time, everywhere. 

Doesn't matter if you're a silicon valley juggernaut, respect the rights of the EU citizens or face the wrath of the eurocracy:

> Organizations in breach of GDPR can be fined up to 4% of annual global turnover or 20 million euro (whichever is greater)

Four percent of global turnover is *a very big stick*.

### Why the EU is the worst

![What I imagine a Article 29 Working Party looks like](complicated.gif)

The EU being the EU, the regulation is a mixed bag of lofty goals and ideals, watered down by lobbying groups, and further complicated by the compromise required to get 28 member states on board.

The intentions are great, it's a great idea, but they are doing a terrible job at selling it --- as usual.

The practical implementation is in the hands of the so-called *Article 29 Working Party*
which is currently keeping busy designing icons 
(I am [not making this up](https://www.google.be/search?q=standardised+icons+gdpr))
It will change its name to the 
*European Data Protection Board* come May 25th, because you wouldn't want to get too comfortable with all this jargon now, would you?

## The GDPR in practice

If you're looking for expert advice on GDPR compliance, this is not the place for you.


But if you are curious about the GDPR and what it takes for a website like freesewing.org
to be compliant, read on.

> ##### Further reading
> If you really want to know what GDPR is, the best thing you can do is 
> [read the damn thing](http://eur-lex.europa.eu/legal-content/en/TXT/?uri=CELEX%3A32016R0679). It ain't no rocket science.
> 
> If legislative texts make you run for the hills, the UKs ICO has 
> [easily one of the best guides on GDPR](https://ico.org.uk/for-organisations/guide-to-the-general-data-protection-regulation-gdpr/).

### Good to know

A few things you should know before we dive into GDPR:

#### There's 100 days left

The GDPR was adopted back in 2016, but it won't grow its teeth until May 25th 2018.

Until that day, you get a pass. After that day, it's for real. 
Which means we have 100 days left to get our house in order.

#### There's exemptions for SMEs

Organizations employing fewer than 250 people are exempt from some of the more bureaucratic aspects of the GDPR, such as a bunch of documenting requirements.

Essentially, while you still have to do the right thing, there's a lot less paperwork to fill out.

Freesewing employs zero people, so we're off the hook. 

#### There's extra provisions for sensitive data

> Body measurements alone are not sensitive data

The GDPR has extra provisions for *sensitive data*
such as biometric data, profiling, and a bunch of other stuff.

This was cause for concern because we collect body measurements, and one of our questions was whether that qualifies as biometric data.

Turns out it doesn't. Biometric data is what you can use to identify a person, like a fingerprint or iris scan. Body measurements alone are not sensitive data.


### Collecting data through consent

To collect data, you need a so-called *lawful basis for data processing*.  
There are different types, but the one that applies to us (and to most online services) is **consent**.

In this scenario, your legal basis for processing the data is that you've asked the person to get their data
and they've freely given it to you.

That is straight-forward, and makes sense. But the GDPR is really serious about making sure this consent is
freely given, and not wrestled from you grudgingly.

To prevent companies from throwing up a big wall of legalese that people have to agree to, the GDPR outlines a number
of principles this consent should adhere to. Here's a non-exhaustive list:

 - people should have real choice and control
 - consent requires a positive opt-in, pre-ticked boxes or anything like that are not allowed
 - there should be a very clear statement explaining what people are agreeing to
 - these requests for consent must be separate from any terms & conditions
 - consent needs to be granular, you need individual consent for different things, and can't ask for blanket consent
 - it must be easy for people to redraw consent
 - consent of data processing should not be a precondition for a service

Looking at that list, I can't help but feel that legislation would be a lot simpler if lawmakers could just write 
*don't be a dick* and call it a day.

#### Consent granularity

Remember, we can't just get blanket consent.
We need to get consent for every type of data processing we do. 

For freesewing.org, we have identified three different types of data processing:

 - Profile data
 - Model data
 - Patron data

For each of these, we'll need to get consent from the user, making sure it's *real consent* as intended in the GDPR.

Below is a mockup for what this could look like for each data type:

> ##### These mockups are no longer available
>
> Please note that the mockups originally included in this post are no longer
> available. Instead, this functionality has been implemented in the website.

#### Consent timing

The GDPR states that you should ask for consent when the data is collected. 

With our three types of data processing, that means that consent must be asked at different times:

 - **Profile data**: When signing up on the site
 - **Model data**: When creating the first model
 - **Patron data**: When becoming a patron

This will (also) require some extra work to integrate this in the site.

### Respecting basic rights when processing data

The EU enshrines basic rights for its citizens that should be respected when processing data.

Let's look at each of these rights and their impact on freesewing.org.

#### The right to be informed

> You need to be transparent about how you use personal data. Why you collect it, how you use it, and so on.

Informing users is something we are still working on. If anything, this blog post is part of that effort.

We will need to design the individual privacy notices, but also a more overall privacy policy as well as 
making certain that users are informed of all their rights.

While this will require some work, I don't expect any problems here.

#### The right of access

> People have the right to know their data is processed, and to access that data.

We are already compliant, as all data users enter on the site can also be accessed by them.

#### The right to rectification

> People have the right to correct their data if it's not correct.

We are already compliant, as all data users enter on the site can also be edited by them.

#### The right to erasure

> People have the right to have their data removed/erased.

We are already compliant, as users can remove their models, or entire account at any time.  

#### The right to restrict processing

This right means that users must be able to put a *freeze* on all data processing, without going as far as to delete their data.

We do not currently offer this possibility, and will need to add this functionality to the site.

#### The right to data portability

> People not only have a right to export all their data, that export should also be in a format that makes it easy for them to take their data elsewhere.

We are already compliant, as we allow users to export all of their data, and make it available in different standard formats (YAML and JSON).

#### The right to object

> The right to object applies specifically to:
>
> - processing for public interests or by official authorities
> - processing for direct marketing
> - processing for science/historic research/statistics
>
> In these cases, people can object to this specific processing.

This is going to apply to us when we start publishing anonymized model data, something that's on our roadmap.

The reason for publishing this data is that we want to make a dataset available of *real* body measurements, rather than the
*standard* measurements that are typically used in the industry.

This is something we'll write about more at a later date, but essentially this falls under the *scientific research/statistics* category.
And even though the data is anonimized, we still need to respect the right of users to object to this processing.

As such, we should add the possibility to object to this specific use of the data.

#### Rights in relation to automated decision making and profiling

> People have extra rights when it comes to profiling or decisions made by AI or algorithms without human involvement.

This is not relevant in our situation.

### Privacy by design

The EU isn't content with throwing up a couple of consent questions and respecting people's rights when processing data.
It also wants to make certain that your privacy is (better) protected when things go wrong.

That's why it advocates for *privacy by design*. While it's a concept that's hard to pin down in legislation, the 
purpose is clear: They want everyone to consider privacy from the very start of their project/product/business, and
not as an afterthought.

Things such as encryption (both in transit and for data at-rest), pseudonyms, and data expiry are suggested as 
things to keep in mind while designing.

Obviously, the EU is not going to come check your code to see whether you've taken privacy by design to heart.
But it can (and probably will) have an influence when things to wrong.

Imagine two companies who have a data leak, one of them hasn't done much to safeguard the privacy of their users,
whereas the other has taken *privacy by design* measures to mitigate the damage.

It seems obvious that the EU is going to come down harder on the company who didn't even try. 

#### What we're already doing

We already do a number of things that are driven by a *privacy by design* approach. For example:

 - We use pseudonyms for user accounts
 - We don't share any data with any third party
 - We don't include any tracking code, or analytics
 - We don't use cookies
 - We don't have any social logins, like buttons, or other such things
 - We don't run/show any ads
 - We don't run any third-party JavaScript code
 - We use encryption on all transport

There's some more info on this in this blog post: 
[The choices I've made to protect your privacy. Or why you won't be getting any cookies](/blog/privacy-choices/).

These already form a very good basis for a privacy conscious website. But since we'll need to make changes
for GDPR anyway, we're considering other options to further raise the privacy bar.
Specifically, what can we do to limit the damage to our users in case there is a data leak.

#### Restriction of data storage

Some of the most sensitive data we store today is the address and birthday of our higher-tier patrons.

However, the site does not need this information to function. We only need it for administrative purposes; 
Sending out gifts and birthday cards to our patrons.

As such, there's no real need to keep this data in the freesewing database. 
We could just as well write this information down in a notebook we keep on our coffee table.

So, as part of our GDPR-related changes, we will remove this information from the database, and store it 
offline.

#### Encryption of data at rest

We already encrypt all data in transit. But, we are currently considering to add encryption of data at rest.

The idea is to encrypt all data that could potentially identify a user. 
Such as:

 - Email address
 - User name
 - Model names
 - Model notes

This would add an extra layer of defense for our users' privacy in case somehow our database gets dumped.

While this change will be non-trivial to implement and come with a performance penalty, I feel it's
worth looking in to.

## Conclusion

While we still have some work to do, we are already compliant with large parts of the GDPR, especially when
it comes to respecting users rights:

 - The right to be informed
 - The right of access
 - The right to rectification
 - The right to erasure
 - The right to restrict processing
 - The right to data portability
 - The right to object
 - Rights in relation to automated decision making and profiling

We are currently working on *the right to be informed* and have a plan
for the changes required to respect *the right to restrict processing* and *the right to object*.

On the data collection site, we need to hammer out the details for our privacy notices.
We'll also write a detailed privacy policy that bundles all the info from the different notices.

We'll need to add changes to the user on-boarding to make sure notices are presented at the correct time.
Not to mention that we'll need to keep track of who gave their consent for what.

### Action points

 - Draft privacy notices for profile/model/patron data
 - Integrate consent in user on-boarding, model creation, and patron sign-up
 - Make site functionality depend on consent
 - Provide a centralized privacy dashboard where people can review their privacy settings/consent
 - Add email notifications every time consent is changed
 - Provide a way for people to *freeze* their account
 - Provide a way for people to object to their model data being used for research and statistics
 - Write and publish an overall privacy policy
 - Encrypt sensitive data in the database

Seems like we've got a lot of work ahead of us.

### Feedback

It is my personal opinion that the GDPR is a good thing.
But I want to hear from you about the changes outlined in this blog post.

So please reach out with your feedback and comments.
It is after all your data we're talking about.


