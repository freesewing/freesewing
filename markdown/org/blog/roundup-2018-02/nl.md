---
author: "joostdecock"
caption: "Je nieuwe inlogachtergrond voor de maand maart"
date: "2018-02-28"
intro: "Dit is je maandelijkse samenvatting van het freeswing-nieuws van de afgelopen vier weken en een blik op wat er de komende maand in het verschiet ligt."
title: "Maandelijkse samenvatting - februari 2018: Core 1.7.0 met Sven, Carlton en Carlita verbeteringen. Plus GDRP, vim en Jaeger"
---

Dit is je maandelijkse samenvatting van het freeswing-nieuws van de afgelopen vier weken en een blik op wat er de komende maand in het verschiet ligt.

## Terugblik op februari

Ik had de geheime ambitie om dit jaar elke maand een nieuw patroon uit te brengen. Het is pas februari en dat plan lijkt nu al van de baan te zijn.

Laten we eens kijken naar de dingen die wel gebeurden in februari voordat we het hebben over wat er niet gebeurde.

### Core v1.7.0 is uit

Eerder vandaag heb ik de trekker overgehaald van core release 1.7.0. Zoals gebruikelijk bevat [de lijst met veranderingen](https://github.com/freesewing/core/blob/develop/CHANGELOG.md#170) alle informatie, maar het belangrijkste voor gebruikers zijn [de nieuwe ribbelopties in het Sven-patroon](/docs/patterns/sven/options#ribbing)en een heleboel extra verbeteringen aan Carlton/Carlita.

Deze Carlton/Carlita verbeteringen worden gedreven door het feit dat ik en [Anneke](/showcase/maker/annekecaramin) zijn begonnen met het werken aan [de documentatie voor deze patronen](/docs/patterns/carlton/). En elke keer als we iets schrijven als *hier plakvlieseline aanbrengen*, gaan we ook terug naar het patroon om precies te markeren waar dit plakvlies moet komen.

Onnodig te zeggen dat dat veel werk is. Maar het zou moeten helpen bij het maken van deze vachtpatronen, vooral voor mensen voor wie dit de eerste keer is dat ze een vacht maken.

### GDPR strijdplan

Ik wil het niet laten klinken alsof het schrijven van een blogpost tegenwoordig een prestatie is, maar ik vind wel dat [ons *GDRP strijdplan* blogpost](/blog/gdpr-plan) het vermelden waard is, omdat dit belangrijke ontwikkelingen zijn en de werkdruk die dit genereert aanzienlijk is.

Hoewel er nog niets vastligt, schetst het bericht ons plan om GDRP-compliance aan te pakken, iets waar we ons de komende maanden op zullen richten.


### Vim snippets voor freesewing kern

In [een blogpost die de belichaming is van de term *niche*](/blog/core-vim-snippets) kondigden we de beschikbaarheid aan van een vim plugin die freesewing core specifieke snippets biedt.

Het komt erop neer dat ALS je patronen wilt ontwikkelen en ALS je de vim editor gebruikt, deze voor jou zijn.

Dat zijn wel erg veel mitsen.

### Jaeger voorproefje

Maak kennis met Jaeger, het patroon voor sportjassen dat ik deze maand hoopte uit te brengen.

![Jaeger is klaar, maar ik heb er nog geen gemaakt](jaeger.png")

Degenen onder jullie met een goed geheugen herinneren zich misschien nog dat ik vorige maand zei dat ik misschien in februari zou uitbrengen. Hoewel het toen nog een andere naam had.

Zoals ik vorige maand ook al voorspelde, vond ik niet de tijd om er een te maken. Eigenlijk is mijn grootste probleem bij het ontwerpen van nieuwe patronen het vinden van de tijd om ze ook echt te maken. En dat is des te problematischer bij zo'n ingewikkeld patroon als een jasje. Eerlijk gezegd weet ik nog steeds niet waar ik de tijd vandaan heb gehaald om die Carlton jas te maken.

Maar goed, dit alles om te zeggen dat het patroon klaar is, behalve dat ik nog nooit de laatste versie ervan heb gemaakt. En ik heb het gevoel dat ik het zo niet kan loslaten.

Dus, als je hier een mousseline van wilt maken --- of zelfs het echte werk --- laat het me weten in de comments, dan zorg ik dat je een ontwerp krijgt.

Dat zou ook kunnen helpen om deze patroonrelease vooruit te helpen, want ik weet nu al dat ik volgende maand niet veel tijd zal hebben om aan een jasje te werken.

En nu we het er toch over hebben...

## Vooruitkijken naar maart

Ik heb twee weken vakantie in maart (Yay!) waarvan ik het grootste deel in Bangkok zal zijn (nog meer Yay!).

Dat betekent dat ik volgende maand niet veel naaiwerk zal doen, maar er moet wel wat quality time zijn voor mij en mijn laptop, dus ik wilde een van de grotere punten op mijn tussentijdse todo-list aanpakken.

Mijn oorspronkelijke plan was om core te herschrijven, je kunt wat details [vinden in dit ticket over de kwestie](https://github.com/freesewing/core/issues/236)

Vooruitkijkend naar de komende maanden is de meest urgente kwestie echter die naderende GDPR-deadline in mei, waarvoor ook veel werk zal vereisen.

Dus dacht ik dat het zinvoller zou zijn om een ander ding op de todo-lijst van verheven doelen aan te pakken: de voorkant herschrijven.

In plaats van nog een berg jQuery-code toe te voegen om alle GDPR-zaken af te handelen, is het idee om de voorkant te forken en te porten naar [vue.js](https://vuejs.org/). Ook hiervoor is [een open issue waar je de voortgang kunt volgen](https://github.com/freesewing/site/issues/311).

Aangezien ik nul ervaring heb met vue.js, moet dit leuk worden. Als je wilt helpen, laat dan een reactie achter.

