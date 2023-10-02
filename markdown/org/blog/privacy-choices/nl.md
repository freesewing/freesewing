---
author: "joostdecock"
caption: "Foto door <a href='https://pixabay.com/en/users/herbert2512-2929941/' target='_BLANK' rel='nofollow'>Herbert</a>"
date: "2017-06-16"
intro: "Het wereldwijde web tast steeds meer je privacy aan. Facebook, Google en een stortvloed aan advertentienetwerken houden allemaal je browsertabbladen in de gaten. Ze volgen je op het web, houden in de gaten welke sites je bezoekt, zodat ze meer informatie over je kunnen verzamelen en die aan adverteerders kunnen verkopen."
title: "De keuzes die ik heb gemaakt om je privacy te beschermen. Of waarom je geen koekjes krijgt."
---

Het wereldwijde web tast steeds meer je privacy aan. Facebook, Google en een stortvloed aan advertentienetwerken houden allemaal je browsertabbladen in de gaten. Ze volgen je op het web, houden in de gaten welke sites je bezoekt, zodat ze meer informatie over je kunnen verzamelen en die aan adverteerders kunnen verkopen.

Sorry voor mijn Frans, maar ik haat die troep.

> Facebook, Google en een stortvloed aan advertentienetwerken houden allemaal je browsertabbladen in de gaten

Het vanaf nul opbouwen van deze site is een geweldige kans geweest om na te denken over hoe je dingen moet doen.

Om er zeker van te zijn dat ik niet bijdraag aan het probleem, heb ik de volgende keuzes gemaakt:

## Overal versleuteling

Laten we alles via https laten lopen. Dat is gewoon [gezond verstand](https://letsencrypt.org/) in 2017.

## Geen advertenties

Ook dit is een no-brainer. De nummer 1 opsporingsplaag online zijn advertentienetwerken en ik wil dat ze niet in de buurt van deze site komen.

Gelukkig vormt dat geen probleem, omdat we niet spelen volgens de _Geef iets gratis en verkoop vervolgens de gegevens van mensen_ regels van het web.

## Geen externe code

Deze site laadt geen externe JavaScript-code. Geen. Dat betekent wel dat ik een paar dingen moest heroverwegen waarvoor normaal gesproken externe code nodig is.

Er is geen Facebook Like-knop of Twitter-integratie. We hebben nog steeds social sharing onder onze blogposts (hint hint), maar het is de gewone HTML-variant die tracking voorkomt.

In dezelfde categorie zijn er geen sociale logins. Natuurlijk is een knop _Inloggen met Facebook_ handig, maar ook een beetje een nachtmerrie als je bedenkt wat het met je privacy doet.

Voor een statisch gegenereerde site als deze ([zie dit bericht over JAMstack voor details](/blog/freesewing-goes-jamstack/)) [Disqus](https://disqus.com/) is zo'n beetje de de facto standaard voor commentaar. Maar Disqus is verschrikkelijk als het gaat om tracking, dus dat was een grote nee voor mij.

Een soortgelijk verhaal voor authenticatie waar ik [Auth0](https://auth0.com/)overwoog. Ook daar maakte ik me zorgen over tracking, dus besloot ik het niet te doen.

Uiteindelijk heb ik het bijltje erbij neergegooid en de authenticatie en commentaar zelf geïmplementeerd. De tijd zal leren of dat een goede ruil was.

## Geen cookies
We gebruiken geen cookies. Uiteraard geen cookies van derden, maar zelfs geen eigen cookies.

In plaats daarvan gebruiken we lokale opslag, wat beter is omdat het, in tegenstelling tot cookies, je informatie niet bij elk verzoek verstuurt.

## Geen analyse
Ik heb [Google Analytics](https://analytics.google.com/) uitgevoerd op [makemypattern](https://makemypattern.com/). Het is krachtig, maar duidelijk een nachtmerrie om te volgen. Dus dat was ik ook niet van plan.

Dit probleem wordt verder bemoeilijkt door het feit dat deze statische site wordt gehost door [Netlify](https://www.netlify.com/). Dus ik heb geen serverlogs en kan geen analytics server-side uitvoeren.

Voor het grootste deel heb ik besloten om het gewoon zonder analytics te doen. Ik hoef niet te weten hoeveel mensen deze site bezoeken. Ik weet nog steeds hoeveel gebruikersaccounts er worden aangemaakt en hoeveel patronen er worden gegenereerd, wat prima indicatoren zouden moeten zijn voor het algehele welzijn van de site.

Maar er is één ding dat we niet wilden analyseren: de verwijzingslogboeken. Het is een van de kleine geneugten van het leven om die lijst door te nemen en te ontdekken dat [iemand](https://www.reddit.com/r/freepatterns/comments/4zh5nr/is_there_software_to_generate_sewing_patterns/) [heeft gekoppeld aan](http://www.makery.uk/2016/08/the-refashioners-2016-joost/) [jij](https://closetcasepatterns.com/week-sewing-blogs-vol-98/) [](https://opensource.com/life/16/11/free-open-sewing-patterns).

Ook hier heb ik mijn eigen kale oplossing geïmplementeerd. Als je via een externe link op deze site terechtkomt, rapporteren we die verwijzing aan onze eigen API. Dat betekent dat we nog steeds de verwijzingsinfo krijgen, maar geen tracking.

Misschien is het gewoon ijdelheid, maar als ik een slechte dag heb, geven die verwijzingslogs me een beter gevoel (als het niet gewoon Russische verwijzingsspam is). Ik kan het mis hebben, maar ik durf te wedden dat veel mensen met een eigen blog zich hierin kunnen vinden.

