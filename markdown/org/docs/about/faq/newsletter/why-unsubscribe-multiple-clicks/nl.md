---
title: Waarom moet ik opnieuw klikken om te bevestigen dat ik me wil afmelden voor de nieuwsbrief?
---

While we could make it so that clicking the link in your email would immediately unsubscribe you, it would be in violation of internet standards. Specifiek de definitie van het __HTTP__ protocol __GET methode__ waarin staat dat:


<Note>
<h5>GET verzoeken moeten alleen gegevens ophalen en mogen verder geen effect hebben.</h5>

[wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages)
</Note>

Een _GET request_ is wat er gebeurt als je een link volgt. Merely following a link should not make any changes (like unsubscribing you from a newsletter).

For example, when you receive an email, your email client may _preload_ the links in it in the background. So that they are quicker to load should you click on them.

Het is duidelijk dat dit voorladen je niet moet afmelden. Which is why you need to click a button to confirm. Because that will trigger a __POST request__ and those can make changes.

<Tip>

##### Dit geldt niet voor gebruikers die zich afmelden via hun account

Niets hiervan geldt voor gebruikers die zich afmelden voor onze nieuwsbrief door de optie
in hun account uit te schakelen. In dit geval klik je al op een knop, in plaats van
op een link in je e-mail.

Als je nieuwsgierig bent, we gebruiken een idempotent __PUT request__ onder de motorkap.
</Tip>


