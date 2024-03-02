---
author: "joostdecock"
caption: "Je nieuwe inlogachtergrond voor de maand februari"
date: "2018-01-31"
intro: "Dit is je maandelijkse samenvatting van het freeswing-nieuws van de afgelopen vier weken en een blik op wat er de komende maand in het verschiet ligt."
title: "Maandelijkse roundup - januari 2018: Inkscape DPI, versiebewustzijn, Bail en Carlita"
---

Dit is je maandelijkse samenvatting van het freeswing-nieuws van de afgelopen vier weken en een blik op wat er de komende maand in het verschiet ligt.

## Terugblik op januari
![Meer zoals deze maand](https://posts.freesewing.org/uploads/coffee_3f501d4076.gif)

Misschien is het [het recordbrekende deprimerende weer in mijn streek ](https://www.theguardian.com/world/2018/jan/19/aint-no-sunshine-winter-darkest-europe), maar ik heb het gevoel dat januari veel van me heeft gevergd. Dus laten we eens kijken of we op zijn minst iets kunnen laten zien.

### Het Inkscape standaard eenheden dilemma

Aan het begin van het jaar brachten we core v1.3.0 uit om [issue #204](https://github.com/freesewing/core/issues/204) aka het Inkscape standaard eenheden dilemma aan te pakken.

Het was een beetje een ongebruikelijke fix omdat onze hand werd gedwongen door upstream wijzigingen van de Inkscape ontwikkelaars. Bovendien moesten we niet alleen onze code aanpassen, maar ook de wijzigingen backporteren naar al jullie bestaande concepten.

Als je het allemaal niet wist, hebben we er een blogpost over geschreven: [Freesewing core v1.3.0 is uit; Komt met fixes die zo goed zijn dat we ze hebben geback-port naar al je drafts](https://joost.freesewing.org/blog/core-v1.3.0-is-out/).

### Versiebewustzijn

We houden nu bij welke versie van core je concept heeft gegenereerd. We brengen voortdurend fixes en verbeteringen aan op . De concepten die je in je profiel hebt opgeslagen kunnen dus verouderd zijn.

Je wordt hier nu over geïnformeerd, zowel op de conceptpagina zelf als in je lijst met concepten. Een eenvoudige redraft zal ze upgraden naar de nieuwste versie.

> ##### Langetermijnvisie voor versiebeheer
> 
> Deze oplossing is een stap vooruit ten opzichte van de vorige situatie, maar het biedt geen mogelijkheden voor granulair versiebeheer. Als je 10 verschillende concepten van Simon hebt opgeslagen in je profiel en we het versienummer van de kern veranderen omdat we Carlton hebben aangepast, worden al je concepten gemarkeerd als verouderd op , ook al hebben de wijzigingen geen invloed op hen.
> 
> Met slechts een enkel core versienummer om van af te hangen, is er geen voor de hand liggende manier voor ons om bij te houden welke veranderingen welk patroon beïnvloeden.
> 
> Het langetermijnplan hier is om een kernversienummer en een patroonversienummer te hebben. Op deze manier heeft een versiewobbel in één patroon geen invloed op andere patronen. 
> 
> Een versie bump in core heeft nog steeds invloed op alle patronen, maar er zouden veel minder core versies moeten zijn als we alle patronen uit core halen.
> 
> Het idee is dat elk patroon in zijn eigen repository komt, en we gebruiken composer om ze te beheren als afhankelijkheden. 
> 
> Maar dit is een langetermijnidee dat pas wordt geïmplementeerd nadat we core hebben herschreven. Ja, dat is ook een idee voor de lange termijn.

### Borg voor foutafhandeling

In de eerste helft van de maand hebben we Rollbar uitgeprobeerd voor foutafhandeling en rapportage. Hoewel we de functionaliteit die het bood goed vonden, waren we niet zo blij met de mogelijke impact op van het versturen van dat soort gegevens naar een derde partij.

Dus besloten we onze eigen poor man's rollbar te schrijven, genaamd Bail. Bail wordt nu gebruikt in onze gegevens en core backends, dus als er dingen kapot gaan, weten we dat.

Deze inspanning leidde ook tot een 2 weken durende side-quest om tests te schrijven voor onze data backend. Alle details: [Introductie van freesewing borg: De rolbeugel van een arme man --- omdat privacy](/blog/introducing-bail/)

### Carlita is hier

Een paar dagen geleden hebben we de [Carlita Coat](/patterns/carlita)uitgebracht, de damesversie van onze Carlton coat.

Als je je hebt gehaast om Carlita te bemachtigen, is het goed om te weten dat ze is uitgebracht als onderdeel van core v1.6.0 en dat we nu bij v1.6.3 zijn, en dat is voornamelijk te danken aan fixes en tweaks in Carlton/Carlita.

Als je een eerdere versie van het patroon hebt, maak dan een nieuwe versie. Als je al hebt afgedrukt, kijk dan eens op [de changelog](https://github.com/freesewing/core/blob/develop/CHANGELOG.md) om erachter te komen wat er is veranderd.

Als je de changelog bekijkt, zie je ook dat we de maand begonnen met core v1.2.9 en draait nu core v1.6.3, dus ik denk niet dat het alleen maar een idee is dat het een drukke maand was.

## Vooruitkijken naar februari

Februari is een korte maand, dus het is waarschijnlijk het beste om de verwachtingen te managen. Maar hier is wat ik ervoor in gedachten heb:

### Carlton/Carlita documentatie

Eerlijk gezegd is dit als tanden trekken voor mij, dus verwacht niet dat het eind februari af zal zijn, maar ik zou in ieder geval wat vooruitgang moeten hebben geboekt met de documentatie voor de Carlton en Carlita patronen.

Even terzijde: de toenemende populariteit van deze site betekent dat ik veel meer bezig ben met verschillende vragen en kleine problemen die mijn aandacht nodig hebben.

Al die feedback is een goede zaak want zo verbeteren we de dingen hier. Maar ik merk wel dat het steeds moeilijker wordt om een groter stuk tijd aan één specifiek ding te besteden. Dat is echt wat je nodig hebt bij het aanpakken van grotere taken zoals het schrijven van documentatie of het ontwerpen van nieuwe patronen.

Ik heb daar niet echt een oplossing voor, ik maak alleen de opmerking.

### Misschien een Blake Blazer release

Ik heb een patroon voor een jasje op mijn tekentafel liggen dat er al sinds de zomer ligt (het heet de Blake Blazer). Ik zou eigenlijk wat tijd moeten uittrekken om het in te pakken en te publiceren, maar ik zie er tegenop om dat te doen omdat ik maar geen tijd kan vinden om het jasje te laten maken.

Ik heb het patroon eerder gebruikt voor [mijn refashioners maken dit jaar](/blog/the-refashioners-2017/), maar dat is niet bepaald een heel representatief voorbeeld.

Ik denk niet dat ik de tijd zal vinden om in februari een jasje te maken, maar misschien is een mousseline genoeg om het in bèta te publiceren.

### FOSDEM

![Alle details op fosdem.org](https://posts.freesewing.org/uploads/fosdem_bb321397cc.png)

[FOSDEM](http://fosdem.org/) --- de Free and Open Source Developers' European Meeting --- is in het eerste weekend van februari in Brussel.

Ik ben van plan er zondag te zijn, dus als jij er ook bent, laat het me dan weten of kom even gedag zeggen.

