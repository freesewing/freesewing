---
title: Why do I have to click again to confirm I want to unsubscribe from the newsletter?
---

While we could make it so that clicking the link in your email would immeadiatly unsubcribe you, it would be in violation of internet standards. Specifiek de definitie van het __HTTP__ protocol __GET methode__ waarin staat dat:


<Note>
<h5>GET verzoeken moeten alleen gegevens ophalen en mogen verder geen effect hebben.</h5>

[wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages)
</Note>

Een _GET request_ is wat er gebeurt als je een link volgt. Merely following a link should not make any changes (like unsubscribing you from a newsletter).

For example, when you receive an email, your email client may _preload_ the links in it in the background. So that they are quicker to load should you click on them.

Obviously, this preloading should not unsubscribe you. Which is why you need to click a button to confirm. Because that will trigger a __POST request__ and those can make changes.

<Tip>

##### This does not apply to users unsubscribing through their account

None of this applies to users who unsubscribe from our newsletter by disabling the
option in their account. In this case, you are already clicking a button, rather
than a link in your email.

If you are curious, we use an idempotent __PUT request__ under the hood.
</Tip>


