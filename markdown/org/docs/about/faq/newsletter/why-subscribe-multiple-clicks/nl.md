---
title: Waarom moet ik opnieuw klikken om te bevestigen dat ik me wil inschrijven nadat ik al op de bevestigingslink heb geklikt die je me hebt gestuurd?
---

Er zijn twee aspecten die ervoor zorgen dat je meerdere keren moet klikken om je aan te melden voor onze nieuwsbrief:

- [Mensen moeten zich alleen zelf kunnen aanmelden](#people-should-only-be-able-to-sign-up-themselves)
- [GET-verzoeken mogen geen wijzigingen aanbrengen](#get-requests-should-not-make-changes)

## Mensen moeten zich alleen zelf kunnen aanmelden

Deze is vrij eenvoudig te begrijpen. One should not be able to subscribe somebody else's email address to the FreeSewing newsletter.

This is why, after indicating you want to sign up, we sent you a confirmation email to the email address you provided. If you receive this email, it confirms not only that the email address is working, but also that you have access to it.

In other words, only after you click the link in the confirmation email can we know for certain that:

- Het e-mailadres is geldig
- De eigenaar van het e-mailadres wil zich abonneren

Daar zou het afgelopen zijn. Behalve één technisch detail dat ook belangrijk is:

## GET-verzoeken mogen geen wijzigingen aanbrengen

<Warning compact>Dit is technischer en moeilijker te begrijpen</Warning>

Another reason is that while we could make it so that clicking the link in your email would immediately subscribe you, it would be in violation of internet standards. Specifiek de definitie van het __HTTP__ protocol __GET methode__ waarin staat dat:


<Note>
<h5>GET verzoeken moeten alleen gegevens ophalen en mogen verder geen effect hebben.</h5>

[wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages)
</Note>

Een _GET request_ is wat er gebeurt als je een link volgt. Merely following a link should not make any changes (like subscribing you to a newsletter).

For example, when you receive an email, your email client may _preload_ the links in it in the background. So that they are quicker to load should you click on them.

Het is duidelijk dat dit vooraf laden je abonnement niet moet bevestigen. Which is why you need to click a button to confirm. Because that will trigger a __POST request__ and those can make changes.

<Tip>

##### Dit geldt niet voor gebruikers die zich aanmelden via hun account

Niets van dit alles geldt voor gebruikers die zich aanmelden voor onze nieuwsbrief door de optie
in ons account in te schakelen.  In dit geval hoeven we het validatieproces van e-mail
niet te doorlopen, omdat we dat al hebben gedaan toen je je aanmeldde. 

Voor gebruikers is aanmelden (en afmelden) direct mogelijk (als je nieuwsgierig bent: 
we gebruiken een idempotent __PUT request__ onder de motorkap).
</Tip>


