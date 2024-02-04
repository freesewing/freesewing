---
title: Warum muss ich erneut klicken, um zu bestätigen, dass ich mich anmelden möchte, nachdem ich bereits auf den Bestätigungslink geklickt habe, den du mir geschickt hast?
---

Es gibt zwei Aspekte, die dazu führen, dass die Anmeldung zu unserem Newsletter mehrere Klicks erfordert:

- [Die Menschen sollten sich nur selbst anmelden können](#people-should-only-be-able-to-sign-up-themselves)
- [GET-Anfragen sollten keine Änderungen vornehmen](#get-requests-should-not-make-changes)

## Die Menschen sollten sich nur selbst anmelden können

Das hier ist ziemlich einfach zu verstehen. One should not be able to subscribe somebody else's email address to the FreeSewing newsletter.

This is why, after indicating you want to sign up, we sent you a confirmation email to the email address you provided. If you receive this email, it confirms not only that the email address is working, but also that you have access to it.

In other words, only after you click the link in the confirmation email can we know for certain that:

- Die E-Mail Adresse ist gültig
- Der Besitzer der E-Mail-Adresse möchte sich anmelden

Dort wäre es dann vorbei. Bis auf ein technisches Detail, das auch wichtig ist:

## GET-Anfragen sollten keine Änderungen vornehmen

<Warning compact>Dies ist technischer und schwieriger zu verstehen</Warning>

Another reason is that while we could make it so that clicking the link in your email would immediately subscribe you, it would be in violation of internet standards. Insbesondere die Definition der __GET-Methode__ des __HTTP__ Protokolls, die besagt, dass:


<Note>
<h5>GET-Anfragen sollten nur Daten abrufen und keine anderen Auswirkungen haben.</h5>

[wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages)
</Note>

Eine _GET-Anfrage_ ist das, was passiert, wenn du einem Link folgst. Merely following a link should not make any changes (like subscribing you to a newsletter).

For example, when you receive an email, your email client may _preload_ the links in it in the background. So that they are quicker to load should you click on them.

Natürlich sollte dieses Vorladen dein Abonnement nicht bestätigen. Which is why you need to click a button to confirm. Because that will trigger a __POST request__ and those can make changes.

<Tip>

##### Dies gilt nicht für Nutzer/innen, die sich über ihr Konto

anmelden. Nichts davon gilt für Nutzer/innen, die sich für unseren Newsletter anmelden, indem sie die Option
in unserem Konto aktivieren.  In diesem Fall brauchen wir die E-Mail
nicht zu überprüfen, da wir dies bereits bei deiner Anmeldung getan haben. 

Für die Nutzerinnen und Nutzer ist das Abonnieren (und Abbestellen) sofort möglich (Falls du neugierig bist: 
wir verwenden einen idempotenten __PUT request__ unter der Haube).
</Tip>


