---
title: "Opening up the FreeSewing backend API"
caption: "A Brass Ornate Vintage Key on Black Computer Keyboard, by PixaBay"
date: 20231103
intro: "The FreeSewing backend API now supports API keys so you can interact with it too"
author: 1
---

Locking out people of your API seems to be the fashionable thing to do these days. With places like Twitter -- nay, X -- and Reddit either locking down API access or charging for access.

I have made the exact opposite move, and as part of the rollout of the new FreeSewing.org I've built a new backend that is open to be used by anyone.

The backend supports authentication via API keys, and you can generate those keys right here in your account settings. You can generate as many as you want, and set expiry on them, as well as configure their access level.

## What's the point?
Good question. First of all, I think it's the nice thing to do. But more importantly, I feel that if you are going to put all those measurements in FreeSewing, you may want to use them elsewhere, no? So I wanted to facilitate that.

I expect this will, at least initially, be very much a niche feature. However, I am hopeful that other people working in the realm of parametric design and bespoke sewing patterns (or even just people looking for measurements) will come to appreciate this and hopefully integrate this with their own scripts or tooling.

If nothing else, I know I will.

The [REST API reference documentation lives here](https://freesewing.dev/reference/backend), if you're looking for the OpenAPI Specification, then go to https://backend3.freesewing.org/docs/

## Use, don't abuse

Our backend API runs in a cloud environment and while I do not charge for access to the API, I do need to pay the bills of said cloud provider.

As such, please be mindful of the amount of requests you generate. And if you have big plans, please reach out to me to discuss them first.

I will monitor the use of our backend API and we may at any moment decide to revoke API keys if I feel the use is beyond what I can or want to support.
Backend use will be monitored and I may step in 

