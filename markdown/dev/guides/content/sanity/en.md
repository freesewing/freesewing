---
title: Sanity Content Guide
---

FreeSewing uses Sanity content needs to be edited/written by non-technical contributors,
and for images uploaded by users, such as for their profile image and so on.

<Tldr>

You can manage FreeSewing's Sanity content at
[cms.freesewing.org](https://cms.freesewing.org/) 
</Tldr>

By *content that needs to be edited/written by non-technical contributors* we mean:

- Newsletter posts
- Blog posts in all languages
- Showcase posts in all languages

## Why we use Sanity

The (historical) reason that we use a (headless) CMS for this lies with **the
showcase posts**.  Our documentation is still hosted in git as MDX, and
historically this was also the case for our blog posts and showcase posts.

However, while documentation is written by contributors who are familiar with
how we work, and blog posts are typically written by Joost, showcase posts are
often provided by users of the site for whom submitting a pull request is a
steep learning curve.

So for this reason, we started using an external CMS to host the showcase
posts.  And, since blog posts and showcase posts are so similar, we decided to
use this platform for both.  Later, we added newsletter content to this list
because this too is sometimes provided by people not so familiar with the git
workflow.

Prior to version 3, we used a self-hosted version of
[Strapi](https://strapi.io/) for this.  And while that did what we needed,
self-hosting adds workload to people and our backend systems, so it's not
without its drawbacks.  Then, with the release of Strapi v4, they dropped
support for MongoDB, which was the database we are using, so we were stuck on
v3 of Strapi.

So for FreeSewing v3 we started looking for alternatives, and after trying
various solutions Sanity came out as the best solution for our needs.  It's a
SaaS solution -- which is nice because it means we don't have to host anything
-- but the flip side of the coin is that as a communal open source project, we
obviously cannot afford it.

Fortunately for us, the same reasons that mean we don't have any money also
mean that Sanity took pity on us, and they agreed to waive their fees and let
us use their service free of charge.  So, Sanity is now a FreeSewing sponsor,
and since everything is in place already, we also use them to host user images
because honestly it's a really nice service.

## How to manage Sanity content

As Sanity is a headless CMS, you essentially have to talk to the API to manage
your content.
 
Fear not though, we don't expect you to do that. The Sanity Studio is a
web-based frontend that allows you to manage the content in a web environment,
and we have an instance of it deployed at https://cms.freeseiwng.org/ that is
pre-configured to manage FreeSewing's content.

## For developers

If you're looking to learn more about how to interact with the Sanity API,
please refer to [the Sanity reference documentation](/reference/sites/sanity).

