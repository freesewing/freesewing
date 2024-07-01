---
date: "2024-07-01"
edition: "2024q3"
intro: "Welkom bij de 2024 zomereditie van de FreeSewing nieuwsbrief."
title: "2024 Zomereditie"
---

Welkom bij de 2024 zomereditie van de FreeSewing nieuwsbrief.

Dit is wat we op deze eerste dag van juli voor jullie in elkaar hebben geflanst:

- 💰 Vercel heeft eenzijdig onze open source sponsoring opgezegd, wat nu? (2 minuten lezen door joost)
- 🚢 Waarom FreeSewing 3.3 is vertraagd, en waarom het jou waarschijnlijk niets uitmaakt (1 minuut gelezen door joost)
- 🇨🇭But Kun je het swizen? (3 minuten lezen door joost)
- Er is geen AI gebruikt om deze nieuwsbrief te maken (alleen om hem te vertalen) (1 minuut gelezen door joost)

Zullen we beginnen?


&nbsp;  

&nbsp;

&nbsp;  

&nbsp;

## Vercel heeft onze open source sponsoring eenzijdig opgezegd, wat nu?

Op 18 juni ontvingen we de volgende e-mail:

> *Hey there,*
>
> *Uw team FreeSewing is momenteel ingeschreven in het sponsorprogramma van Vercel*.
>
> *Uw 100% korting vervalt op 14 juni. Om je de tijd te geven deze overgang te verwerken, zullen we je team automatisch inschrijven voor een korting van $300/mo voor de komende 6 maanden, beginnend op 14 juni en eindigend op 14 december.*
>
> *Dank je wel dat je met ons samenwerkt.*

Ik moet beginnen met het voor de hand liggende hier te zeggen: Vercel heeft onze hosting en implementaties
hosting en implementaties gesponsord en daar zijn we uiteraard erg dankbaar voor.
daarvoor.

Dat gezegd hebbende, het bericht is een beetje dubbelzinnig op het punt van misleiding.
Om te beginnen zijn we niet het enige open source project dat deze e-mail heeft ontvangen.
e-mail hebben ontvangen.  Een beetje Googlen laat anderen zien die [een
[similar](https://x.com/Siddhant_K_code/status/1801447290076545099)
[bericht](https://www.reddit.com/r/nextjs/comments/1dfh7ak/vercel_just_ended_my_opensource_sponsorship/?rdt=41666).

Wat misleidend lijkt, is dat Vercel het laat klinken alsof de deal _verlopen_ is.
Maar het lijkt meer dan een beetje vreemd dat alle berichten die ik hierover vind
allemaal op precies dezelfde datum aflopen (14 juni).

Gezien het feit dat Vercel [niet langer
sponsoring aanbiedt] (https://vercel.com/guides/can-vercel-sponsor-my-open-source-project),
lijkt het erop dat ze besloten hebben om de deal te herroepen en een tegoed van 6 maanden aan te bieden om
de overgang te vergemakkelijken.

Dus terwijl we -- nogmaals -- dankbaar zijn voor de gratis service die we hebben gekregen
ontvangen, lijkt de berichtgeving over deze veranderingen verwarring te scheppen
over hun redenen om dit te doen en onzekerheid te creëren over wat er
gaat gebeuren.

We zitten nu in de overgangsperiode waarin ze onze maandelijkse rekening zullen verlagen met
$300 voor de komende 6 maanden.  We hadden dus geen mogelijkheid om iets te doen
vooraf te handelen, aangezien de e-mail ons 4 dagen nadat de overgangsperiode
begon.

Dus we houden de zaken in de gaten, overwegen alternatieven en onze opties, maar we
het is heel goed mogelijk dat we nog wat dingen moeten veranderen voordat het 14 december is.
Hoe dit onze financiën zal beïnvloeden, valt nog te bezien.

&nbsp;

---

&nbsp;


## 🚢 Waarom FreeSewing 3.3 is uitgesteld en waarom het je waarschijnlijk niets kan schelen

FreeSewing 3.3.0 wordt de grootste release sinds 3.0. Dat wil zeggen, wanneer het
wordt uitgebracht, want het zit al een tijdje een beetje vast.

Goedziende FreeSewing gebruikers hebben misschien gemerkt dat als je een patroon genereert
op [FreeSewing.org] (https://freesewing.org/) vandaag het versienummer
nummer `v3.3.0-rc.1` draagt. Dat `rc` staat voor _release candidate_, wat aangeeft
dat dit een prerelease is die we op een gegeven moment willen uitbrengen als 3.3.0, maar
we zijn er nog niet.

De redenen dat we er nog niet zijn hebben alles te maken met onze inspanningen om
onze pattern editor te refactoren -- meer daarover verderop in deze nieuwsbrief -- maar
deze veranderingen worden zorgvuldig geïsoleerd gehouden zodat we in de tussentijd
gewoon door kunnen gaan met het aanbieden van het laatste en beste van ons werk op FreeSewing.org.

Dus het kan zijn dat je de `v3.3.0-rc.1` versie nog een tijdje ziet, of dat je een `v3.3.0-rc.1` versie ziet.
zou een `v3.3.0-rc.2` of iets dergelijks kunnen zien, maar wees er zeker van dat uiteindelijk,
v3.3.0 onderweg is.

Maar nogmaals, als FreeSewing.org de manier is waarop je onze software gebruikt, dan heb je
niets om je zorgen over te maken.


&nbsp;

---

&nbsp;

## 🇨🇭 Maar kun je er ook mee swizzlen?

Zoals een paar paragrafen eerder vermeld, is de reden dat versie 3.3.0 vertraagd is
omdat we onze pattern editor aan het refactoren zijn. Onze motivatie hiervoor is dat
toen we versie 3 over de eindstreep trokken, er zoveel veranderingen waren in
core, ontwerpen, backend en frontend dat het een berg werk was om ze allemaal samen te brengen
samen te brengen in een nieuwe FreeSewing.org.

Dat is ook de reden waarom we op dat moment onze vorige patroonbewerker hebben overgezet
zonder al te veel veranderingen. Ik kan eerlijk zeggen dat ik toen gewoon niet
nog genoeg brandstof in de tank had om dat aan het eind van de lange mars
naar v3.

We hebben er ook voor gekozen om code te delen tussen onze verschillende web
omgevingen, dus niet alleen FreeSewing.org maar ook
[FreeSewing.dev](https://freesewing.dev/) en onze zelfstandige ontwikkelomgeving.
omgeving.  Zulke code delen is heel logisch, als je bijvoorbeeld donkere
en lichte modus bijvoorbeeld -- of verschillende thema's -- is het niet nodig
om die logica opnieuw te implementeren voor elke webomgeving.

Onze patrooneditor maakt deel uit van die _gedeelde_ code, maar is natuurlijk een stuk
complexer dan het behandelen van thema's.  In principe is het idee nog steeds solide,
maar de praktische aspecten van hoe het is geïmplementeerd beginnen ons te vertragen.

Het is bijvoorbeeld makkelijk om wijzigingen in de editor aan te brengen die
van iets anders.  De stand-alone ontwikkelomgeving voor mensen die nieuwe
die nieuwe patronen willen ontwikkelen is het grootste slachtoffer van zulke breuken.

Maar het is niet omdat het makkelijk is om het te breken dat het... makkelijk is.  Als er al iets is,
is het nogal ingewikkeld om je hoofd er in te wikkelen, wat een enorme
hindernis vormt voor bijdragers om te overwinnen, dus het zijn alleen de meest onbevreesden die durven
daarheen te gaan.

Als ik ooit met pensioen wil gaan, moeten we het makkelijker te begrijpen maken, en makkelijker
om te veranderen.  Dat was de belangrijkste drijfveer voor het maken van een feature branch en het beginnen aan de
op de enigszins ontmoedigende taak om het opnieuw te implementeren.

Maar er is nog een andere reden. Omdat we soms vragen krijgen als _kan ik
dit integreren in mijn eigen website om mijn eigen patronen te verkopen?_ waarop het antwoord
is _ja, maar ... het is niet gemakkelijk_.  Ik wilde dat makkelijk maken -- of op zijn minst
makkelijker maken - wat ook inhoudt dat mensen onze patroon editor kunnen gebruiken, maar
het hun eigen te maken.

Met andere woorden, iets kant-en-klaar hebben dat je kunt pluggen, maar ook
de flexibiliteit om die delen te veranderen die je graag anders zou willen zien.
En dat is waar _swizzling_ om de hoek komt kijken. Swizzlen is het veranderen van een implementatie
met iets anders, meestal het veranderen van een standaard implementatie met iets
aangepast tijdens het uitvoeren.

Laten we zeggen dat je onze patroonbewerker wilt gebruiken, maar dat je echt niet houdt van het
icoontje voor naadtoeslag gebruikt. Nou, je kunt dat icoontje gewoon _swizzle_ door
in je eigen versie, of natuurlijk iets ambitieuzers.

Het einddoel zal een React-component zijn die we publiceren op NPM en die je
kunt toevoegen aan je project, zodat je mogelijk bepaalde (sub-)
componenten ervan.

Het is een work-in-progress, maar vandaag ondersteunt het al swizzling van 143
componenten (er gaat veel in een patrooneditor).  Maar je zult ook
in staat zijn om verschillende hooks te swizzlen, bijvoorbeeld degene die de editor
afhandelt. Hoewel het de moeite waard is om erop te wijzen dat we al 4 state
backend ondersteunen: lokale opslag, sessieopslag, URL-anker-status en native React
state.

Je zult ook in staat zijn om de verschillende methoden die we gebruiken te swizen, zoals het bieden van
vertalen, getallen afronden, enzovoort.

Hoewel dat spannend is (zou moeten zijn?) voor mensen die willen bouwen met
FreeSewing willen bouwen, is het belangrijkste doel hier om een basis te hebben die stabiel en toch
flexibel genoeg is om leuke dingen op te bouwen. Het is iets waar ik
erg enthousiast over ben.

&nbsp;

---

&nbsp;

## Er is geen AI gebruikt om deze nieuwsbrief te maken (alleen om hem te vertalen)

Als je net zo bent als ik, hoor je niets boven het geluid van je ogen
als mensen over _AI_ beginnen te praten, maar toch moet ik iets verduidelijken.
iets verduidelijken.

FreeSewing heeft een team van vrijwillige vertalers die geweldig werk doen om ervoor te zorgen dat
dat zoveel mogelijk mensen kunnen genieten van de vruchten van onze arbeid.  De manier waarop
werkt is dat we alles eerst in het Engels schrijven en dan gaan zij aan het werk om
het stukje bij beetje te vertalen.  Als sommige delen nog niet vertaald zijn, vallen we gewoon
terugvallen op de Engelse inhoud.

Dit werkt geweldig voor de website, waar het grootste deel van het materiaal al is
vertaald is en als er iets nieuws wordt toegevoegd, wordt dat uiteindelijk ook vertaald
en met een beetje vertraging is alles in orde.

Het werkt _niet_ goed voor deze nieuwsbrief, en dat is natuurlijk zoals
al het andere dat mis is met FreeSewing volledig mijn schuld.  Ik ben namelijk erg lui
een fout en om het nog erger te maken, heb ik de neiging om beter naar een deadline toe te werken.
Wat betekent dat het nu -- kijk op de klok -- 17:00 uur wordt op de dag dat
de nieuwsbrief verstuurd moet worden, en ik ben hem nog steeds aan het schrijven.

Het volstaat te zeggen dat dit absoluut geen tijd overlaat voor mensen om mijn gebazel te vertalen.
gebazel te vertalen, dus ben ik geneigd om in plaats daarvan een automatische vertaling te gebruiken.  I
Ik weet dat onze vertalers het _haten_ als ik dat doe, omdat het een slechte afspiegeling is van al
hun harde werk.
 
Dus, als je dit leest als een niet-Engelse editie en je vindt de
vertaling gebrekkig vindt, kun je er zeker van zijn dat het mijn schuld is en dat onze vertalers geen schuld treffen.


joost


