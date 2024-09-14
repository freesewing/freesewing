---
date: 2024-04-01
edition: 2024q2
intro: Welkom bij de 2024 lente editie van de FreeSewing nieuwsbrief.
title: 2024 Voorjaarseditie
---

Welkom bij de 2024 lente editie van de FreeSewing nieuwsbrief.

Dit is wat we vandaag voor je hebben, geen grapje:

- FreeSewing 3.2 brengt Tristan, Lumina, Lumira en meer (3 minuten lezen door joost)
- 📨 E-mail is weer moeilijker geworden (1 minuut gelezen door joost)
- 🕸️ Bouwen aan het web van vertrouwen van FreeSewing in de nasleep van de XZ achterdeurpoging (5 minuten door joost)
- 🤔 Hoe de uitdagingen van FreeSewing in de loop der tijd zijn veranderd (2 minuten lezen door joost)

Zullen we beginnen?

&nbsp;

&nbsp;

## FreeSewing 3.2 brengt Tristan, Lumina, Lumira en meer

We hebben FreeSewing v3.2 eerder uitgebracht in Q1 2024 en het bevat 3 nieuwe
ontwerpen, evenals een reeks bugfixes en verbeteringen.

Laten we eens kijken naar de hoogtepunten:

### The Tristan Top

Als eerste is er [de Tristan Top](https://freesewing.org/designs/tristan). Tristan is een top met prinsessennaden en (optioneel) een vetersluiting voor en/of achter. Het verhaal over de oorsprong is de behoefte aan een kostuum voor een Renaissance festival, dus dat is waarschijnlijk een goede indicatie van wat je kunt verwachten.

Tristan is ontworpen door Natalia die ook [een blogpost schreef over het nieuwe Tristan ontwerp](https://freesewing.org/blog/our-newest-design-is-the-tristan-top), dus dat is een geweldige plek om alle details over dit nieuwe ontwerp te krijgen.

### The Lumina and Lumira Leggings

Ik geef je even de tijd om die titel nog een keer te scannen, maar ja, er zijn twee verschillende leggingspatronen met vergelijkbare namen: [de Lumira Leggings](https://freesewing.org/designs/lumira) en de [Lumina Leggings](https://freesewing.org/designs/lumina).

Beide zijn voortgekomen uit Wouter's verlangen naar goede fietskleding, en ik raad je aan om de ontwerpnotities voor zowel [Lumina](https://freesewing.org/designs/lumina#notes) als [Lumira](https://freesewing.org/designs/lumira#notes) te bekijken om het verschil tussen deze ontwerpen te begrijpen, waarom ze verschillen en wat het beste voor jou zou werken.

### Bug fixes and improvements

Regelmatige lezers van de nieuwsbrief zullen weten dat we voortdurend
verbeteringen uitrollen op FreeSewing.org en dat die niet gebonden zijn aan een nieuwe release,
maar het is een goede gelegenheid om ze op te sommen, dus hier zijn enkele hoogtepunten van de bug
fixes en verbeteringen die in de 3.2 release zijn opgenomen:

- Sandy heeft een nieuwe panelen
  optie die
  is toegevoegd door [Paula](https://github.com/freesewing/freesewing/pull/5861). Je zou
  altijd je cirkelrok kunnen maken van een aantal vergelijkbare patronen door
  zelf te matchen, maar nu zorgt het patroon daarvoor.
- Wat begon als een bugrapport voor het bicepsgemak op
  Jaeger eindigde met een
  wijziging in de manier waarop de armscye wordt berekend op Brian, in het bijzonder de diepte
  van het armsgat. Aangezien Brian ons meest fundamentele blok is, zal dit
  gevolgen hebben voor veel andere ontwerpen.
- In [Carlton](https://freesewing.org/designs/carlton) - en dus ook in
  [Carlita](https://freesewing.org/designs/carlita) - hebben we
  hersteld en uitgegeven waar de naadtoeslag op de onderkraag verkeerd was getekend.
- In [Charlie](https://freesewing.org/designs/charlie) is voor de achterzak welt
  (4) en voorzak facing (8) ten onrechte aangegeven dat er 2 in plaats van 4
  in de kniplijst moeten worden geknipt. This too is resolved.
- In [Hugo](https://freesewing.org/designs/hugo) hebben we een bug verholpen die ervoor zorgde dat
  het ontwerp een foutmelding gaf als de volledige instelling uit stond, en we hebben een probleem verholpen
  waarbij de opening van de voorzak steeds smaller werd naarmate de heup
  groter werd.
- We hebben een nieuwe methode
  [Path.combine()](https://freesewing.dev/reference/api/path/combine) toegevoegd aan
  [onze kern-API](https://freesewing.dev/reference/api). De oorsprong ligt in een
  discussie in issue
  \#5976 die
  oorspronkelijk was ingediend als een bugrapport over hoe Path.join() gaten in de
  samengevoegde paden verbindt - veroorzaakt door `verplaats` operaties, of een verschil tussen
  het eind- en beginpunt van samengevoegde paden - om op te vullen met een lijn
  segment. Dat gedrag wordt verwacht/bedoeld, maar we hebben
  `Path.combine()` toegevoegd om het andere gedrag te vergemakkelijken: Het combineren van verschillende paden
  in een enkel Path object zonder de tekenbewerkingen af te wisselen.
- De [title macro](https://freesewing.dev/reference/macros/title) kan nu
  geconfigureerd worden met een `notes` en `classes.notes` instelling in de configuratie, zodat
  ontwerpers noten kunnen toevoegen aan (de titel van) een patroondeel.
- Onze [i18n plugin](https://freesewing.dev/reference/plugins/i18n) ondersteunt nu
  ondersteunt nu vertaling van geneste matrices van strings, wat ontwerpers
  meer flexibiliteit geeft om vertaalde delen van strings aan elkaar te rijgen.

De [FreeSewing 3.2 aankondiging blog post](https://freesewing.org/blog/v3-2-0) heeft alle details.

&nbsp;

---

&nbsp;

## E-mail is weer moeilijker geworden

Als je dit in je inbox leest en niet in een gearchiveerde kopie op
FreeSewing.org, dan hebben we deze e-mail bij je kunnen afleveren en dat is goed
nieuws.

Wat je je misschien niet realiseert is dat dit niet bepaald triviaal is, en dat is
al jaren niet meer. Maar onlangs zijn de dingen nog ingewikkelder geworden.  Gmail
(Google) en Yahoo bijvoorbeeld hebben nieuwe beperkingen geïmplementeerd in het eerste
kwartaal van
2024 waardoor
extra werk van onze kant vereist is om de kans te maximaliseren dat deze e-mail
daadwerkelijk in je inbox terechtkomt.

Bovendien worden zogenaamde _bulk e-mail afzenders_ onderworpen aan de strengste
controles. Als je 5000 berichten per dag verstuurt, word je beschouwd als een bulkverzender en wordt
extra kritisch bekeken. Aangezien deze nieuwsbrief ongeveer 14k
abonnees heeft, worden we aan de hoogst mogelijke normen gehouden.

Uiteraard houdt niemand van spam en ik pleit niet tegen deze regels.
Het is gewoon zo dat de hoeveelheid tijd en moeite die nodig is om iets dat
zo triviaal lijkt als het versturen van een e-mail op schaal te laten werken, steeds groter wordt naarmate
het internet evolueert naar een de-facto pay-to-play model.

Voorlopig doe ik die inspanningen nog steeds, en hopelijk zijn ze voldoende gebleken
om dit in jullie inbox te krijgen. Maar het is iets dat we op een later tijdstip
misschien opnieuw moeten bekijken als het een steeds groter beslag legt op onze beperkte tijd en middelen.

&nbsp;

---

&nbsp;

## 🕸️ Bouwen aan het web van vertrouwen van FreeSewing in de nasleep van de XZ achterdeurpoging (5 minuten door joost)

Afhankelijk van waar je je nieuws vandaan haalt, heb je misschien gehoord of gelezen over
de backdoor poging van het xz compressie
hulpprogramma.

In een notendop probeerde een kwaadwillende actor een backdoor te introduceren in dit
hulpprogramma, wat uiteindelijk een poging was om een gated RCE-exploit binnen te smokkelen in
SSHd.

Of, in [ELI5](https://en.wiktionary.org/wiki/ELI5) termen: Iemand heeft
code bijgedragen aan een kleine bibliotheek die snode bedoelingen had. Het werd op een geniepige manier gedaan
en het uiteindelijke doelwit was niet de bibliotheek zelf, maar een ander software
project dat deze bibliotheek gebruikt: De Secure Shell Deamon. Een _daemon_ is gewoon een
cooler woord voor een _service_ op een computer, want waarom dingen niet cooler maken.
Deze specifieke daemon of dienst, de _secure shell_ daemon is verantwoordelijk voor
het afhandelen van beveiligde shell (SSH) verbindingen. Het is de gouden standaard voor extern
beheer van Linux (en unix) systemen.

De code smokkelde een gesloten RCE backdoor binnen. RCE staat voor _remote code
execution_, wat betekent dat je _dingen_ op afstand kunt doen zonder
authenticatie of iets dergelijks. Of anders gezegd, het stelt iemand in staat om
te bedienen van een computersysteem op afstand waar hij normaal gesproken geen toegang toe zou mogen hebben.
Het feit dat het _gated_ is betekent dat de auteur van
de kwaadaardige code stappen heeft genomen om ervoor te zorgen dat alleen zij de kwaadaardige
code konden gebruiken. Als een achterdeur met een sleutel.

Het is moeilijk om de ernst te overschatten van deze poging tot backdooring van in wezen
elk Linux systeem op de planeet.  Het is niet alleen 's werelds meest gebruikte besturingssysteem
, de dominantie van server besturingssystemen is overweldigend.
Of zoals ik vaak zeg: Alles wat er toe doet draait op Linux_.

Dit is een doorlopend verhaal en ik hoop dat er een Netflix
miniserie van wordt gemaakt met David Cross in de rol van Andres
Freund, maar ik dwaal af. Dit is de FreeSewing
nieuwsbrief, dus ik wilde iets uit dit verhaal halen waarvan ik denk dat
relevant is voor FreeSewing, of eigenlijk voor elk open source project dat er is.

### Burn-out bij de beheerder en de lange weg om vertrouwen te winnen

Een van de fascinerende elementen van dit verhaal is _wie_ de wijzigingen heeft bijgedragen,
en waarom ze werden geaccepteerd zonder voldoende nauwkeurig onderzoek om de kwaadaardige
bedoeling van de bijdrage te onthullen.

Omdat de gebruiker die ze maakte al **years** had bijgedragen aan het project
en door dit werk in status was gestegen tot een niveau waarop er veel
impliciet vertrouwen was gebaseerd op hun werk, ondanks dat ze vrijwel niets wisten over
wie of wat er achter gebruikersnaam `JiaT75` (in dit geval) schuilgaat. Zo'n _lange oplichting_ is
een aanzienlijke investering in tijd en moeite, dus de huidige aanname
is dat dit een actor uit een natiestaat was (denk aan NSA of het
equivalent van een ander land).  Het is ook belangrijk om op te merken dat de xy-beheerder het
erg moeilijk had met de lange staart van verantwoordelijkheden van het onderhouden van
software en actief op zoek was naar hulp om een burnout te voorkomen.  Het is een
scenario dat schokkend vaak voorkomt bij open source projecten en een
situatie creëert waarin kwaadwillende actoren maar al te gemakkelijk misbruik kunnen maken van uitgeputte
beheerders die wanhopig zijn om wat van het werk over te nemen.

### Een web van vertrouwen creëren

Dit probleem van _wie kun je vertrouwen_ is natuurlijk niet nieuw. Een manier om het tegen te gaan
is door een _web van vertrouwen_ te creëren.  Dit is hoe dingen worden gedaan in grotere
open source software projecten waarbij veel vrijwilligers betrokken zijn, zoals het Debian
project.

Praktisch gezien is zo'n web van vertrouwen gebouwd op relaties tussen
mensen die elkaars ware identiteit kennen en hebben geverifieerd.  Bijvoorbeeld,
er zijn een aantal mensen in de FreeSewing gemeenschap die ik in het echte
leven heb ontmoet. We hebben elkaar niet alleen persoonlijk ontmoet, maar ook tijd met elkaar doorgebracht, we kennen
waar we wonen, we kennen elkaars partners of familie, of hebben een andere
tastbare manier die een hoge mate van zekerheid geeft dat deze persoon echt
is wie hij beweert te zijn.

Die mensen kunnen op hun beurt soortgelijke connecties hebben met anderen die ze kennen,
hebben ontmoet en vertrouwen op een niveau dat veel verder gaat dan de online wereld.  Dit
creëert een web van vertrouwen waarin je je vrienden kunt vertrouwen, en de vrienden van
je vrienden enzovoort.

In het licht van de huidige gebeurtenissen en als erkenning van de snelle versnelling van
wat er mogelijk is met generatieve kunstmatige intelligentie, zal FreeSewing
voortaan alle schrijftoegang of verhoogde privileges beperken tot leden van de gemeenschap
die deel uitmaken van FreeSewing's web van vertrouwen.

We blijven natuurlijk bijdragen accepteren - of liever gezegd beoordelen - van
iedereen. Maar rechten die het potentieel ontsluiten om kwaad te doen, worden
beperkt tot mensen voor wie vertrouwen is opgebouwd AFK (weg van
toetsenbord).

Om het bouwen van zo'n web van vertrouwen te vergemakkelijken, beginnen we met het documenteren van
deze verbindingen tussen mensen.  Hierdoor kunnen mensen die
meer verantwoordelijkheden binnen FreeSewing op zich willen nemen, het vertrouwensweb bekijken en
zien wie er bij hen in de buurt woont, zodat ze zich kunnen aansluiten bij ons vertrouwensweb via
die persoon.

Ik realiseer me dat het zeer onwaarschijnlijk is dat FreeSewing het doelwit wordt van een achterdeur
poging door een nationale actor, maar het is hoe dan ook een goed idee om best practices toe te passen en
transparant te zijn over hoe we dingen doen.

Ik zal dus in de komende paar weken beginnen met het bouwen en documenteren van dit web van vertrouwen,
, en alle toegangscontroles en toestemmingen herzien om er zeker van te zijn dat we
alles doen wat we kunnen om te voorkomen dat zelfs de meest toegewijde actoren
de bron vergiftigen.

&nbsp;

---

&nbsp;

## 🤔 Hoe de uitdagingen van FreeSewing in de loop der tijd zijn veranderd

Wist je dat FreeSewing v1 7 jaar en 7 dagen
geleden is uitgebracht?  Sinds die tijd hebben we
veel grote en kleine veranderingen doorgevoerd, en onze kernbibliotheek en plugin-systeem zijn
uitgegroeid tot een betrouwbare -- en zeker eigenwijze -- manier om parametrische
naaipatronen te ontwerpen.

De uitdagingen die vanuit technisch oogpunt het meest interessant zijn, zijn
min of meer opgelost. Wat overblijft is de gebruikerskant, of
de gebruikerservaring (UX) zoals wij het graag noemen.

FreeSewing kan veel, dus hoe maak je al die functionaliteit beschikbaar voor de
gebruikers zonder ze te overweldigen? Is dat zelfs mogelijk op mobiel, wat nu de
dominante manier is waarop mensen online gaan. Hoe maak je er een intuïtieve ervaring van,
of hoe begeleid je iemand die op FreeSewing.org terechtkomt na een Google-zoekopdracht naar _gratis naaipatronen_
naar een begrip van wat FreeSewing is en doet in de handvol
seconden dat mensen het waarschijnlijk een kans geven voordat ze verder gaan naar de volgende
link in hun zoekresultaten.

Voor de duidelijkheid: ik weet het antwoord op deze vragen niet. Maar het is
steeds meer waar we onze tijd aan besteden. Het percentage mensen dat
onze software rechtstreeks gebruikt, is verwaarloosbaar vergeleken met het aantal mensen dat
(alleen) onze software gebruikt via onze website. Voor de meeste bezoekers is FreeSewing
**is** een website en als het iets anders is, is dat waarschijnlijk niet duidelijk voor hen,
of zelfs maar relevant.

Er is duidelijk ruimte voor verbetering, maar vaak is er niet één duidelijk pad
voorwaarts. Misschien -- of moet ik zeggen bijna zeker -- is dit een gebied waar ik
het talent of de vaardigheid mis om een soort grote overkoepelende
strategie te bedenken. Maar ik betrap mezelf erop dat ik veel van mijn eigen ideeën of impulsen
op dit gebied in twijfel trek.

Dus ik vroeg me af of we een klein experiment konden doen. Een experiment waarbij ik
aan jou -- mijn beste lezer -- een eenvoudige vraag stel. Ben je er klaar voor? Hier
is de vraag:

> **Wat is FreeSewing?**

Ik hoor graag je antwoord. Je kunt gewoon op reply drukken om het me te laten weten.

<small>_PS: Ik heb deze vraag aan het eind begraven, omdat ik het gevoel heb dat als je door alles van
hebt gelezen wat ervoor kwam, ik waarschijnlijk je gedachten wil horen._</small>
