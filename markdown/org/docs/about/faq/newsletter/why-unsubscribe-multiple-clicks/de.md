---
title: Warum muss ich erneut klicken, um zu bestätigen, dass ich den Newsletter abbestellen möchte?
---

Wir könnten zwar dafür sorgen, dass du dich durch einen Klick auf den Link in deiner E-Mail sofort wieder abmeldest, aber das wäre ein Verstoß gegen die Internetstandards. Insbesondere die Definition der __GET-Methode__ des __HTTP__ Protokolls, die besagt, dass:


<Note>
<h5>GET-Anfragen sollten nur Daten abrufen und keine anderen Auswirkungen haben.</h5>

[wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages)
</Note>

Eine _GET-Anfrage_ ist das, was passiert, wenn du einem Link folgst. Merely following a link should not make any changes (like unsubscribing you from a newsletter).

For example, when you receive an email, your email client may _preload_ the links in it in the background. So that they are quicker to load should you click on them.

Obviously, this preloading should not unsubscribe you. Which is why you need to click a button to confirm. Because that will trigger a __POST request__ and those can make changes.

<Tip>

##### This does not apply to users unsubscribing through their account

None of this applies to users who unsubscribe from our newsletter by disabling the
option in their account. In this case, you are already clicking a button, rather
than a link in your email.

If you are curious, we use an idempotent __PUT request__ under the hood.
</Tip>


