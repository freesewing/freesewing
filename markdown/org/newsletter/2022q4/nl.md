---
date: "2022-10-01"
edition: "2022q4"
intro: "2022 Herfsteditie"
title: "2022 Herfsteditie"
---

Welkom bij de herfsteditie van 2022 van de FreeSewing nieuwsbrief. Dit is wat er vandaag voor jou in zit:

- 🏁 FreeSewing 2.22 is uit en zal de laatste v2 versie zijn (1 minuut lezen - door Joost)
- 🔱 FreeSewing versie 3; Wat is het en wanneer kun je het verwachten? (3 minuten lezen - door Joost)
- 🚀 We zijn de mijlpaal van 50.000 commits gepasseerd (1-minuut gelezen - door Joost)
- FreeSewing aan het Serendiep in Rotterdam (1 minuut lezen - door Lexander)
- 🕵️ Achter de naden: Enoch (4 minuten lezen - door Karen & Enoch)

Laten we er meteen in springen!

&nbsp;

&nbsp;

## FreeSewing 2.22 is uit en zal de laatste v2 versie zijn.

FreeSewing 2.22 kwam eind augustus uit, met een nieuw plushie ontwerp van Wouter - die ook tekende voor Hi de haai.  Deze keer is het [Octoplushy](https://freesewing.org/designs/octoplushy/) en dat is, je raadt het al , een octopus.

Wat zeker minder schattig is, maar misschien niet relevant, is dat dit de laatste minor release onder versie 2 zal zijn.  Dat klopt, versie 3 van FreeSewing komt eraan, en hoewel we versie 2 blijven ondersteunen - om nog maar te zwijgen over het feit dat deze versie nog steeds FreeSewing.org aandrijft - ligt onze focus nu heel erg op de volgende grote versie: FreeSewing v3.

&nbsp;

---

&nbsp;

## 🔱 FreeSewing versie 3; Wat is het en wanneer kun je het verwachten?

Sinds iets meer dan een maand hebben we de codebasis van versie 2 op lange termijn opgeslagen en zijn we begonnen met het werken aan versie 3. En hoewel het nog wel even duurt voordat dit in productie gaat - wat voor ons FreeSewing.org betekent - wil ik graag een korte rondleiding geven van een aantal dingen die op dit moment gebeuren met FreeSewing versie 3 en waar ik persoonlijk het meest enthousiast over ben.

### Configuratie op onderdeelniveau, ook wel pack-ondersteuning genoemd

Op [onze routekaart](https://github.com/freesewing/freesewing/discussions/1278) - die als je goed hebt opgelet steeds meer dingen heeft onder het kopje *al geïmplementeerd* - hadden we zogenaamde ondersteuning voor *pakketten*. Het idee was dat we het graag mogelijk wilden maken om ontwerpen te maken door verschillende onderdelen vrij te combineren. Misschien haal je de mouwen uit een *sleeve pack* en de kraag uit een *collar pack*, voeg wat zakken toe uit een *collar pack* enzovoort.

Het is een van die dingen die heel logisch zijn, maar de vraag oproepen: Hoe werkt dit allemaal onder de motorkap? In v2 van FreeSewing zou het implementeren van deze ideeën niet-triviaal zijn geweest, want ook al ondersteunen we het uitbreiden van patronen naar andere ontwerpen, het proces is te omslachtig voor dit niveau van ad-hoc samenvoegen van verschillende ontwerpen.

Dat is dus iets wat we in versie 3 wilden aanpakken, en om dat te doen hebben we in wezen alle configuratie naar het onderdeelniveau verplaatst. Voor een mouwonderdeel worden bijvoorbeeld eigen opties gedefinieerd en wordt aangegeven welke afmetingen het onderdeel nodig heeft enzovoort. Je kunt nu gewoon dat mouwdeel uit het ontwerp halen (of in de toekomst een mouwpakket) en het in je eigen ontwerp gebruiken zonder je zorgen te hoeven maken over afmetingen en opties enzovoort.

Het is de meest fundamentele verandering in V3, maar het is iets dat de deur openzet voor veel creatieve combinaties van verschillende ontwerpen in de toekomst.

### Ondersteuning voor meerdere sets instellingen, of zoals wij ze noemen: Multisets

Patronen worden uiteindelijk opgesteld voor gebruikers door ze een aantal *instellingen door te geven*. De afmetingen die je moet gebruiken, hoe je de opties op jouw manier wilt hebben enzovoort.

In FreeSewing versie 3 kun je nog steeds meerdere sets van deze instellingen doorgeven aan het patroon. Dit heeft een heleboel interessante toepassingen. Als je bijvoorbeeld werkt met een asymmetrisch lichaam, kun je twee verschillende sets metingen doorgeven en zeggen: "*geef me die en die delen met deze metingen, en de andere delen met die metingen*".

We gebruiken deze nieuwe functie onder de motorkap ook voor de manier waarop we *voorbeeldpatronen* afhandelen. Dat is wanneer we verschillende iteraties van een patroon met elkaar vergelijken. Vroeger zat dit er op een semi-ongemakkelijke manier bovenop geschroefd. Maar in versie 3 is het zo simpel als het samenstellen van een lijst met verschillende sets van instellingen (omdat je nogal snel moe wordt van het typen/zeggen van *sets van instellingen* , noemen we ze *multisets*) en dan kunnen we *ze gewoon* doorgeven aan het patroon en het *werkt gewoon*.

### Ondersteuning voor stapels

Nauw verwant aan ondersteuning voor multisets is ondersteuning voor stapels in de opmaakfase. Stacks zijn een beetje zoals *lagen*. Normaal gesproken is elk onderdeel bij het opmaken iets aparts en leggen we ze afzonderlijk op. Nu kun je zeggen dat verschillende onderdelen deel uitmaken van dezelfde *stack* en dat ze op elkaar gestapeld zouden worden in de lay-out, als lagen.

Het is opnieuw iets dat we intern gebruiken voor een deel van ons sampling/vergelijkingswerk, maar het opent ook interessante mogelijkheden en ik ben benieuwd om te zien hoe mensen deze functies uiteindelijk gaan gebruiken.

### En nog veel meer

Er gebeurt echt veel meer in versie 3, met grote en kleine verbeteringen en aanpassingen. Maar dit zijn enkele van de meer fundamentele veranderingen. We zijn er ook nog steeds mee bezig, dus als je een geweldig idee hebt, [onze routekaart](https://github.com/freesewing/freesewing/discussions/1278) is de meer formele manier om ze voor te stellen. Voor een informeler gesprek kun je terecht op [de FreeSewing Discord](https://discord.freesewing.org/) waar we rondhangen en ons werk coördineren.

### Wanneer kun je versie 3 verwachten?

Het korte antwoord op de vraag wanneer je versie 3 kunt verwachten is *ergens in 2023*. Als dat lang lijkt, dan komt dat omdat we alles vanaf de grond opnieuw aan het opbouwen zijn. De veranderingen die hierboven beschreven zijn, zijn echt fundamentele veranderingen en ze moeten door de hele machinerie lopen die op deze fundamenten is gebouwd voordat het allemaal samen kan komen in iets dat kan worden uitgebracht op FreeSewing.org.

En we willen er ook zeker van zijn dat we het goed doen. Dus we blijven doorgaan en brengen het uit als het klaar is.

&nbsp;

---

&nbsp;

## 🚀 We zijn de mijlpaal van 50.000 commits gepasseerd

Een paar dagen geleden overschreden we de drempel van 50.000 commits [op onze monorepo](https://github.com/freesewing/freesewing).

Cijfers op zich zijn niet echt zinvol, om nog maar te zwijgen over het feit dat je altijd met het systeem kunt spelen. Ik wil dus niet impliceren dat deze mijlpaal op zichzelf een speciale betekenis heeft. Maar ik heb het gevoel dat op een moment dat het meeste werk (aan v3) achter de schermen gebeurt, het dient als een goede herinnering dat FreeSewing een beetje als een zwaan is. Het lijkt misschien alsof hij schijnbaar moeiteloos vooruit glijdt in een gestaag tempo, maar onder het oppervlak wordt er driftig getrapt.

&nbsp;

---

&nbsp;

## FreeSewing aan het Serendiep in Rotterdam (1 minuut lezen - door Lexander)

FreeSewing was uitgenodigd om deel te nemen aan een expositie die werd georganiseerd door Serendiep, een schip dat onderdak biedt aan kunst en wetenschap, met een theaterruimte en machines binnenin. De expositie van een week maakte deel uit van een groter geheel: de stad Rotterdam viert de 150e verjaardag van een van haar grachten.

De workshop begon met mij, Lexander, die FreeSewing introduceerde en het concept uitlegde, en we brachten de avond door met het maken van een mouwloze Teagan als slaapshirt. We waren met een groep van een paar mensen en deden het hele FreeSewing proces: de maten opnemen, het papieren patroon in elkaar zetten, de stofdelen knippen en aan elkaar naaien.

De Teagan paste mooi en al met al was het een erg leuke ervaring! Ik kijk uit naar wat de toekomst zal brengen.

&nbsp;

---

&nbsp;

## 🕵️ Achter de naden: Enoch

Een van de hosts van onze Contributor Call ging (virtueel) met Enoch om de tafel zitten om wat meer te weten te komen over zijn achtergrond en zijn reis om een FreeSewing-medewerker te worden! Het onderstaande interview is bewerkt voor de lengte en eventuele fouten, vergissingen, etc. zijn geheel de schuld van de interviewer.

### Hoe heb je FreeSewing leren kennen?

Ik leerde naaien op de lagere school, maar sindsdien had ik niet veel genaaid, tot de pandemie. In maart 2020, net voor de afsluiting, rondde ik een langlopend project af, waardoor ik, zoals veel mensen, wat vrije tijd had. Net daarvoor had ik eindelijk een diagnose gekregen die mijn decennialange worsteling met uitputting verklaarde (Restless Legs Syndrome, of zoiets), en het geven van medicijnen betekende dat ik voor het eerst genoeg energie had om interesses en hobby's te hebben.

Dus stofte ik mijn oude naaimachine af en begon wat te spelen. Op een gegeven moment probeerde ik een stuk te maken waar ik geen patroon voor kon vinden, dus leerde ik genoeg patroontekenen om iets in elkaar te zetten om het voor elkaar te krijgen. Omdat ik een coder ben met een interesse in open source, wilde ik, toen ik het eenmaal op papier voor mezelf had gedaan, het automatiseren, en door het te automatiseren wilde ik het beschikbaar maken voor zoveel mogelijk instanties. Ik besloot dat ik een parametrisch patroon nodig had en probeerde een paar verschillende dingen uit voordat ik FreeSewing vond.

### Hoe ben je medewerker geworden?

Toen ik eenmaal begon met het ontwikkelen van patronen in FreeSewing, merkte ik dat ik dacht: "Het zou cool zijn als dit er was. Het zou cool zijn als dat er was." Toen ik aan het ontwerpen was, wilde ik bijvoorbeeld lijntekeningen kunnen genereren om te zien hoe verschillende instellingen en afmetingen de afgewerkte kledingstukken zouden beïnvloeden, en daarna wilde ik mijn stoffen kunnen invoeren en zien hoe ze eruit zouden zien op de ontwerpen. Het toevoegen van de aangepaste optietypen die ik wilde was niet erg eenvoudig, dus mijn eerste PR was dat ik probeerde het makkelijker te maken om kleine onderdelen van de werkbank te vervangen. Mijn eerste paar PR's braken wat dingen, dus werd ik meer betrokken bij het opruimen van mezelf. En toen kreeg ik er echt zin in.

Ik heb al eerder in kleine hoeveelheden aan open source software gewerkt en ik ben de enige ontwikkelaar geweest van software die technisch gezien open source was, maar dit is de eerste keer dat ik deel uitmaak van de gemeenschap van open source software en ik vind dat echt de moeite waard. Om al deze mensen te hebben die zich richten op al deze verschillende gebieden om het goed te maken, en die allemaal in eigenlijk constante communicatie met elkaar zijn, is supergaaf. Het menselijke element is echt belangrijk en bij FreeSewing draait het om het menselijke element op alle niveaus. Het stimuleert me om op een hoger en consistenter niveau bij te dragen. En ik denk dat Joost veel krediet verdient voor het feit dat hij dit enorme ding heeft geschreven en er nog steeds in slaagt om deze gemeenschap rond het bouwen en verbeteren ervan te stimuleren.

### Wat is je werk tot nu toe geweest?

Ik heb een paar kleinere dingen gedaan, maar er zijn twee grote dingen waar ik aan heb gewerkt, en eentje waar ik nog aan werk!

De eerste is Gitpod instellen. Met Gitpod kun je je ontwikkeling in de browser doen, zodat je de afhankelijkheden niet lokaal hoeft te beheren. Dit is vooral handig voor Windows ontwikkelaars omdat onze omgeving niet erg Windows vriendelijk is, en het wordt niet officieel ondersteund. Ik heb onlangs ook een aantal updates voor de omgeving ingediend om de zaken soepeler te laten verlopen voor Windows-mensen die liever lokaal ontwikkelen.

De tweede is een update van het Afdruklay-out hulpmiddel voor het Lab. Ik heb de beweeg- en roteerfunctie herwerkt zodat het soepeler werkt en we hebben nu vastgeklikte rotatie naast vrije rotatie. Ik heb ook ons systeem voor exporteren naar PDF herzien, zodat wanneer je exporteert, het eruit ziet zoals je zou verwachten op basis van hoe je het hebt opgemaakt. We hebben nu veel meer controle over de betegeling en Joost hoeft geen C-code te onderhouden naast al het andere.

Nog in ontwikkeling is het hulpmiddel Knipindeling, waarmee je een stofbreedte kunt opgeven en alle delen kunt leggen (en als je er twee moet knippen, geeft het je er twee) zodat je kunt uitrekenen hoeveel stof je patroon nodig heeft.

### Ben je een naaister? Een codeur? Beide? Geen van beide?

Beide! Maar ik heb zeker meer gecodeerd. Dat is mijn werk, dus dat doe ik al tien jaar lang de meeste dagen.

### Wanneer en waarom ben je begonnen met naaien?

Ik begon al vroeg met naaien - ik volgde naailessen op de basisschool en mijn vader kocht een naaimachine voor me in ruil voor de belofte dat ik al zijn broeken zou omzomen (wat ik nooit deed). Daarna heb ik, op een semester of twee kostuumontwerpen op de universiteit na, nauwelijks meer genaaid tot meer recent. Ik heb wel een industriële machine leren gebruiken!

### Waar werk je op dit moment aan?

Ik ben de laatste tijd traag, maar ik heb altijd ideeën - ik heb een hele achterstand met dingen die ik voor mijn partner wil maken, en ik doe ook aan houtbewerking en ben bezig met het restaureren van een stalen tankerbureau en enkele palissanderhouten mid-century bijzettafeltjes, en ik ben bezig met een ontwerp voor de achter- en voortuin van mijn huis. Ik heb veel 3D-modellering geleerd tijdens de pandemie en het koelt nu genoeg af (in het zuiden van de VS) om in de tuin te werken.

### Welk project heb je net afgerond?

Ik heb net een tuniek voor mijn partner afgemaakt en ik heb het pak ontworpen dat ik droeg op de bruiloft van mijn zus. Ik gaf het ontwerp door aan een kleermaker, maar toen het pak werd afgeleverd, waren de mouwen op de meest verbijsterende manier bevestigd en moest ik ze uiteindelijk zelf vastmaken. Het is prachtig geworden, hoewel ik nog steeds ontevreden ben over de mouwen.

### Wat vind je het leukste aan naaien?

Ik vind het leuk dat naaien de wereld opent. Je kunt realiseren of repareren of aanpassen wat je maar wilt, en met naaien kun je een perfecte pasvorm krijgen (of in ieder geval proberen…), wat dat ook voor jou mag betekenen.  Ik ben een zeer esthetisch gedreven persoon die is opgevoed door zeer esthetisch gedreven mensen en ik geloof in de transformerende kracht van kleding, dus het is geweldig om die controle voor jezelf te kunnen nemen. Bovendien vind ik het heerlijk om een vaardigheid te hebben, en naaien is echt een hele categorie vaardigheden waarmee je je iets kunt voorstellen en kunt zeggen: "Ja, dat kunnen we doen."

### Wat haat je het meest aan naaien?

Naden scheuren - wat ik heel vaak moet doen. En soms heb ik het gevoel dat er te veel stappen zijn om de dingen te maken die me interesseren om te maken.

Ik denk dat ik naaien in werkelijkheid niet vaak een leuke bezigheid vind - aan de ene kant ben ik heel ambitieus, maar aan de andere kant ben ik heel risicomijdend en een enorme perfectionist, dus ik moet wel 3 muslins doen voordat ik een definitieve versie van iets heb. Maar dan word ik afgeleid, wat resulteert in veel prototypes die ik gewoon draag, ook al zijn ze meer een proof of concept dan een echt kledingstuk. Het meest extreme voorbeeld is van toen ik een tiener was: Ik experimenteerde met het maken van mijn eigen borstbanden en de eerste die ik maakte en die werkte, en die ik waarschijnlijk twee jaar heb gedragen, werd bij elkaar gehouden met linten en veiligheidsspelden. Uiteindelijk had ik een nieuwe nodig, die ik helemaal genaaid heb, maar die eerste twee jaar kun je op elke foto de omtrek van veiligheidsspelden door mijn shirt zien.

### Wat zou jouw advies zijn voor beginnende naaisters?

Begin met iets dat je interesseert. Veel mensen leren om te beginnen met merklappen, zipperzakjes, enz. en dat werkt als het je interesseert om de basis te ontwikkelen. Maar als je iets ambitieus wilt aanpakken, koop dan wat goedkope stof en ga ervoor! Het zal lang niet zo erg zijn als je denkt, en er is altijd meer stof.

### Naai je vooral voor jezelf of voor anderen, zoals vrienden en familie?

Ik naai meestal voor andere mensen, maar soms maak ik dingen omdat het makkelijker lijkt om een kledingstuk te maken dan het te gaan zoeken. Ik denk dat ik een "maak het als ik denk dat het niet bestaat in de wereld" soort naaister ben, maar ik koop een T-shirt ook al zou ik er een kunnen naaien. Of een keer naaide ik een broek op de dag voor een reis omdat ik niet genoeg broeken had en boodschappen doen me minder goed uitkwam.

### Wat doe je als je geen kleding maakt of patronen ontwerpt?

Ik ben altijd met iets bezig - houtbewerken, ontwerpen, af en toe codeer ik andere dingen, ik ben altijd aan het afwassen… Ik hou van puzzels en heb eindelijk een puzzel van 1500 stukjes afgemaakt waar ik maandenlang pauze van nam. Ik heb een kleine gratis puzzelbibliotheek gemaakt voor de voltooide puzzels, maar er komt nooit iemand puzzels van me afnemen.

### Heb je huisdieren? Familie?

Ik heb liever mensen dan dieren en ik woon samen met een partner in een mooi, huisdiervrij huis. Mijn partner en ik delen de filosofie "de dierbaren van mijn dierbaren zijn mijn dierbaren", waardoor we heel liefdevol en uitgebreid over familie kunnen nadenken. Ik heb ook het geluk dat ik een goede volwassen relatie heb met mijn familie van herkomst, hoewel ik momenteel niet dicht bij hen woon.

### Als er één persoon was die je mee mocht nemen naar een onbewoond eiland, wie zou dat dan zijn? Waarom?
Eerlijk gezegd is mijn partner de persoon - we wonen al bijna 5 jaar samen en het voortdurend bij elkaar zijn tijdens de pandemie heeft ons echt dichter bij elkaar gebracht (en ons geleerd om betere grenzen te stellen!) dus ik heb er vertrouwen in dat we het goed zouden doen in een scenario met een verlaten eiland. Zij zouden eten voor ons verbouwen en ik zou onderdak voor ons bouwen en het zou geweldig zijn.

### Wil je manieren delen om je te volgen op sociale media?
Je kunt me volgen op Instagram op @enoch\_tries_everything, maar wees gewaarschuwd: het wordt zelden bijgewerkt.



