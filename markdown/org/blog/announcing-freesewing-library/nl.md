---
author: 1
caption: "Ik drink niet, maar dit leek me gepast voor een feestpost ¯\_(ツ)_/¯"
date: "2018-08-25"
intro: "Het eerste verjaardagsfeestje van FreeSewing.org, en de nieuwe FreeSewing-bibliotheek"
title: "Het eerste verjaardagsfeestje van FreeSewing.org, en de nieuwe FreeSewing-bibliotheek"
---


Precies een jaar geleden zwaaiden de deuren van FreeSewing.org open voor onze gebruikers. Op die van MakeMyPattern.com plakten we van die *We zijn verhuisd*-bordjes.

Als ik terugkijk naar [die blogpost van 12 maanden geleden](/blog/open-for-business), kan ik bijna niet geloven dat de dingen die ik toen aankondigde, nu nog maar een jaar oud zijn. Het concept van een schets, de vergelijkingsfunctie, papierloze patronen zelfs ... Ze vieren vandaag allemaal hun eerste verjaardag.

Maar deze site niet. Want [omwille van de naderende GDPR-deadline](/blog/gdpr-plan) hebben we onze Jekyll-site gedumpt voor een nieuwe front-end in de loop van mei.

## Meer talen met minder talen

GDPR was maar een deel van dat verhaal. Er waren meer redenen voor die rewrite: we wilden meerdere talen kunnen ondersteunen en onze technology stack vereenvoudigen.

Met andere woorden, we wilden mensen bereiken die verschillende talen spreken, en we wilden het aantal programmeertalen dat we daarvoor nodig hadden, beperken.

### Meer natuurlijke talen

Op dit vlak hebben we het echt goed gedaan. Je vindt hier niet elk morzeltje content in alle verschillende talen. Maar de belangrijkste functies van de website zijn nu wel beschikbaar in vijf talen:

 - Engels
 - Duits
 - Spaans
 - Frans
 - Nederlands

En dat hebben we echt voor 100% te danken aan het sterke werk van [onze geweldige vertalers](/i18n/).

### Minder programmeertalen

De overstap van [Jekyll](https://jekyllrb.com/) naar een op [Nuxt](https://nuxtjs.org/) gebaseerde fonrt-end heeft [Ruby](https://www.ruby-lang.org/) uit onze technology stack geschrapt. FreeSewing.org loopt nu op JavaScript, PHP en een klein beetje C. Dat laatste negeren we voorlopig.

Maar programmeertalen verwijderen is geen doel op zich. De onderliggende ambitie is om dingen te vereenvoudigen en het zo gemakkelijker te maken voor anderen om betrokken te raken. Uiteindelijk willen we meer bijdragers aantrekken zodat het project kan groeien en bloeien.

Patronen ontwerpen en developen is vandaag geen onoverkomelijk obstakel. We hebben [Benjamin](/patterns/benjamin), [Florent](/patterns/florent) en [Sandy](/patterns/sandy) om dat te bewijzen. Die zijn allemaal bijgedragen door mensen voor wie FreeSewing in eerste instantie nieuw was. Ze hebben de ontwerptutorial gevolgd en uiteindelijk hun eigen patroon gemaakt.

We zouden graag meer mensen in hun voetstappen zien volgen. Dus was het een goede investering van onze tijd om het proces zo eenvoudig mogelijk te maken.

## De FreeSewing-bibliotheek

De afgelopen twee maanden heb ik het patroontekenen even op pauze gezet om onze [technische schuld](https://en.wikipedia.org/wiki/Technical_debt) aan te pakken.

Meer specifiek ben ik begonnen met de back-end in core van nul af aan te herschrijven in JavaScript. Maar hier komt de plotwending. Het is geen back-end meer. Het is voortaan een bibliotheek die je kan gebruiken in je browser of op de server met [node.js](https://nodejs.org/).

Dit zit momenteel in versie 0.10 en heeft alle functies van FreeSewing core. Je kan de bibliotheek vinden op [GitHub](https://github.com/freesewing/freesewing) en [NPM](https://www.npmjs.com/package/freesewing). Hij is volledig gedocumenteerd op [developer.freesewing.org](https://developer.freesewing.org/).

De API is rijker dan die van core. En toch heeft het een veel kleinere voetafdruk:

![Vergelijking van de code tussen de nieuwe bibliotheek en (relevante delen van) de FreeSewing-core](https://posts.freesewing.org/uploads/corevsfreesewing_c9327c9fa3.svg)

Als je nog niet zeker was: dat is goed nieuws.

## Wat gebeurt er nu?

We hebben nog veel werk voordat we dit ook echt kunnen gebruiken op FreeSewing.org:


 - Al onze bestaande patronen moeten geëxporteerd worden naar de JS-versie. [Brian](https://github.com/freesewing/brian) was het eerste patroon waarmee we dat al gedaan hebben.
 - Dat gaat de PHP-programmeertaal uit onze stack verwijderen. Dus moeten we de data in onze back-end herschrijven in JS.
 - We moeten een nieuwe website bouwen aan de hand van de FreeSewing-bibliotheek en onze data back-end.

Dat is echt veel werk. Ik hoop dat we al een heel eind verder staan aan het einde van dit jaar, maar ik durf niet te beloven dat het helemaal klaar zal zijn.

## Maar ik wil gewoon patronen

De kans is groot dat je eigenlijk alleen om de patronen geeft. Je wil meer patronen, betere patronen, andere patronen. En al dit gedoe over herschrijven doet het niet echt voor jou.

Ik snap het. Echt. Ik heb zelf een hele lijst van patronen die ik graag op onze website zou hebben. En terwijl ik met andere aspecten van het project bezig ben, heb ik geen tijd om die patronen toe te voegen.

Maar ik geloof dat als we nu investeren in een gestroomlijnde development-ervaring, we daar op de lange termijn de vruchten van gaan plukken.

Als we een paar extra patronen willen, dan is dit niet de juiste aanpak. Maar als we véél meer patronen willen, dan is het dat volgens mij wel.

En ik wil veel meer patronen.

