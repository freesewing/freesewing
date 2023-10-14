---
title: Why do I have to click again to confirm I want to subscribe after I already clicked the confirmation link you sent me?
---

There are two aspects that cause signing up for our newsletter to require multiple clicks:

- [People should only be able to sign up themselves](#people-should-only-be-able-to-sign-up-themselves)
- [GET requests should not make changes](#get-requests-should-not-make-changes)

## People should only be able to sign up themselves

This one is pretty easy to understand. One should not be able to subscribe somebody else's email address to the FreeSewing newsletter.

This is why, after indicating you want to sign up, we sent you a confirmation email to the email address you provided. If you receive this email, it confirms not only that the email address is working, but also that you have access to it.

In other words, only after you click the link in the confirmation email can we know for cerntain that:

- The email address is valid
- The owner of the email address wants to subscribe

That's where it would be over. Except for one technical detail that's also important:

## GET requests should not make changes

<Warning compact>This is more technical and harder to understand</Warning>

Another reason is that while we could make it so that clicking the link in your email would immeadiatly subcribe you, it would be in violation of internet standards. Specifically, the __HTTP__ protocol's __GET method__ definition which states that:


<Note>
<h5>GET requests should only retrieve data and should have no other effect.</h5>

[wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages)
</Note>

A _GET request_ is what happens when you follow a link. Merely following a link should not make any changes (like subscribing you to a newsletter).

For example, when you receive an email, your email client may _preload_ the links in it in the background. So that they are quicker to load should you click on them.

Obviously, this preloading should not confirm your subscription. Which is why you need to click a button to confirm. Because that will trigger a __POST request__ and those can make changes.

<Tip>

##### This does not apply to users subscribing through their account

None of this applies to users who subscribe to our newsletter by enabling the
option in our account.  In this case, we do not need to go through the email
validation process, since we already did that when you signed up. 

For users, subscribing (and unsubscribing) is instant (If you are curious, 
we use an idempotent __PUT request__ under the hood).
</Tip>


