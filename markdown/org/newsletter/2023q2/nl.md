---
date: "2023-04-01"
edition: "2023q2"
intro: "Welkom bij de 2023 lente editie van de FreeSewing nieuwsbrief."
title: "2023 Voorjaarseditie"
---

Welkom bij de 2023 lente editie van de FreeSewing nieuwsbrief.

Dit is wat we vandaag voor je hebben opgenomen:

- ☕ Op de hoogte blijven van de heetste FreeSewing roddels (3 minuten lezen - door Karen)
- 🐑 Oproep voor patroonherders (2 minuten lezen - door Karen)
- 💵 Op zoek naar 1000 echte fans (3 minuten lezen - door Joost)
- 🕵️ Achter de naden: Benjamin F. (4 minuten lezen - door Benjamin & Karen)
- Wil je schrijven voor de nieuwsbrief? (1 minuut lezen - door Karen)

&nbsp;

&nbsp;

## Op de hoogte blijven van alle FreeSewing roddels

Oké, dus je bent fan van FreeSewing, je bent enthousiast over V3 en ondertussen vraag je je af waar je de beste roddels kunt vinden over wat er achter de schermen gebeurt. Vrees niet! Wij hebben oplossingen voor je.

Ten eerste, heb je onze [Discord](https://freesewing.org/community/where/discord/)al bekeken? Hier kun je alle leuke voorproefjes bekijken, zoals welke patronen er in V3 zullen verschijnen, aanbevelingen en tips over soorten stof, moeilijk te vinden hardware en naaimachineonderhoud, alle coole knutselwerkjes waar ontwikkelaars achter de schermen aan werken en nog veel meer. Als je echt op de hoogte wilt zijn, kun je hier terecht. (Het is ook letterlijk waar het allemaal om draait, als je wilt deelnemen aan de tweewekelijkse gesprekken met medewerkers van FreeSewing, die plaatsvinden in de voicechat).

Als je Discord haat, zijn er echter nog steeds opties voor je. Benjamin F. (van "Behind the Seams" fame) heeft de hoogtepunten van Discord samengevat als een GitHub discussie hier: [Discord recaps](https://github.com/freesewing/freesewing/discussions/3523). Bekijk het voor een snelle blik op recente onderwerpen.

En last but not least is er natuurlijk de FreeSewing site zelf. Hoewel sommige updates zijn uitgesteld in afwachting van V3, kun je nog steeds onze showcases bekijken om een kijkje te krijgen in een aantal van de prachtige en indrukwekkende dingen die FreeSewing gebruikers de afgelopen maanden hebben gemaakt. Een paar hoogtepunten:

- De kleinste Hi ooit gemaakt: [MicroHi](https://freesewing.org/showcase/microhi)
- Deze gedetailleerde how-to voor het maken van een [drop-shoulder Sven](https://freesewing.org/showcase/drop-shoulder-sven)
- Een bijpassende set van [meergeneratie Florents](https://freesewing.org/showcase/matching-florents)
- Hoe pas je [Aaron aan in een tankjurk](https://freesewing.org/showcase/aaron-dress-by-ts)
- Een ongelooflijke, onberispelijke [Classic Carlton van Boris](https://freesewing.org/showcase/carlton-by-boris) (kijk eens naar het verstevigingsborduurwerk!) -->

...En nog veel meer die hier niet pasten, maar die net zo ongelooflijk zijn, en je moet maar naar de [Showcase](https://freesewing.org/showcase/) gaan om er meer over te weten te komen. 😉

&nbsp;

---

&nbsp;

## Oproep voor patroonherders

Ben je een expert in het maken van een bepaald FreeSewing patroon? Misschien heb je alle opties geprobeerd, of weet je waarom het in bepaalde gevallen misgaat, of heb je het voor al je vrienden en familie cadeau gedaan? Als dit waar is, dan is jouw expertise precies wat we zoeken.

Zoals je misschien al gemerkt hebt, groeit FreeSewing en voegt het nieuwe mogelijkheden toe! En als V3 uitkomt, komen er verschillende nieuwe patronen bij. Maar elk patroon kan wel iemand gebruiken die bekend is met de zwakke plekken en fijne kneepjes ervan. Vaak is dit de patroonontwerper. In andere gevallen is het de persoon die de documentatie van het patroon heeft ontwikkeld. En dan zijn er nog de patronen die op de site van FreeSewing staan, maar waarvan de ontwerper is overgestapt naar een nieuwe uitdaging of niemand heeft het patroon al een tijdje gemaakt. Deze patronen kunnen soms ten prooi vallen aan problemen die niemand opmerkt. Als nieuwe gebruikers ze dan uitproberen, kan dat een nodeloos moeilijke ervaring zijn.

Een patroonherder is iemand die een oogje in het zeil houdt zodat dit niet gebeurt bij hun patroon. Je hoeft geen programmeerwonder of naaikunstenaar te zijn voor deze rol, maar gewoon iemand die bekend is met het patroon, wat erin zit en hoe het in elkaar zit. Als er iets kapot gaat, kun je het zelf repareren, maar je kunt ook een bugrapport indienen om de rest van de gemeenschap op de hoogte te stellen en hulp te werven. Als dit klinkt als iets waarin je geïnteresseerd bent, reageer dan op deze e-mail en laat het ons weten!

Bonus: FreeSewing heeft een bug bounty programma dat je (a) onze onsterfelijke waardering oplevert en (b) soms coole swag oplevert.

&nbsp;

---

&nbsp;

## Op zoek naar 1000 echte fans

Ik realiseerde me een paar weken geleden dat het nu meer dan 6 maanden geleden is dat we begonnen te werken aan versie 3 van FreeSewing, en dat is zowel een eeuwigheid als helemaal niet zo lang.

Het is een eeuwigheid als je met ingehouden adem hebt gewacht op de release. (Als je in deze groep zit, heb dan even geduld met ons, want wat zijn we druk geweest). Maar het is helemaal niet zo lang als je kijkt naar alle veranderingen die we in deze nieuwe grote versie proppen. Ik heb laatst de balans opgemaakt en ik realiseerde me dat er bijna niets is dat we niet helemaal opnieuw ontwerpen of anders en beter doen. Een kort lijstje uit mijn hoofd:

- Database: Van MongoDB naar Sqlite
- Achterkant: Volledig herschreven
- Javascript: Van CJS/ESM naar puur ESM en van standaardexports naar named exports
- Bundler: Van Rollup naar Esbuild
- Hosting: Van Netlify naar Vercel
- FreeSewing.dev: Van Gatsby naar NextJS
- FreeSewing.org: Van Gatsby naar NextJS, en volledig herschreven
- Ontwikkelomgeving: Van CRA (Creëer React App) naar NextJS
- Componentenbibliotheek: Van MaterialUI/MUI naar TailwindCSS/DaisyUI

Ik houd het hier bij technische veranderingen, er zijn natuurlijk nieuwe functies en andere dingen die anders/beter zullen zijn. Maar dit zijn de fundamenten die veranderen, dus dit is het soort dingen dat niet meteen duidelijk voor je zal zijn.

Het enige dat niet op bovenstaande lijst staat is onze betalingsverwerker (momenteel PayPal, we zullen waarschijnlijk migreren naar Stripe) en dat brengt me bij het enige dat we (nog) niet hebben veranderd: Abonnementen.

Op dit moment hebben we 3 niveaus van abonnementen. 2, 4 en 8 euro per maand. Sommige gebruikers hebben contact met me opgenomen omdat ze meer wilden doen voor FreeSewing en [we hebben een 25$/maand abonnement opgezet voor die gulle zielen](https://static.freesewing.org/fs-25/).

Dat zette me aan het denken over het abonnementsmodel en hoe het project in het algemeen financieel wordt ondersteund. Je herinnert je misschien dat ik vorig jaar schreef dat de inkomsten van FreeSewing een licht dalende trend vertoonden, en dat is iets waar ik nerveus van word als ik bedenk hoeveel veranderingen we doorvoeren. Mensen houden meestal niet van verandering en er is een zeker risico dat we mensen van ons vervreemden met v3.

Aan de andere kant is massa-appeal nooit onze shtick geweest. We hebben geen miljoenen nodig, [alles wat je nodig hebt is 1000 echte fans](https://kk.org/thetechnium/1000-true-fans/). In v3 zullen we dus ook de abonnementen herzien. We implementeren een puur [betaal wat je kunt](https://en.wikipedia.org/wiki/Pay_what_you_can) model. Vandaag kun je dus ofwel niet betalen, ofwel 2, 4, 8 of 25 euro/dollar per maand betalen. In de toekomst kun je nog steeds niet betalen, of betalen wat jij denkt dat goed is. Huidige abonnementen worden niet beëindigd, hoewel je natuurlijk welkom bent om over te stappen op het nieuwe abonnementsmodel.

De toekomst zal uitwijzen of dit een goede of slechte zet is voor FreeSewing. Maar ik geloof dat inzetten op onze echte fans onze winnende strategie is. Dus dat gaan we doen 🤞


&nbsp;

---

&nbsp;


## 🕵️ Achter de naden: Benjamin F.

FreeSewing medewerker Benjamin (BenJamesBen op GitHub) heeft ons de laatste tijd absoluut verbaasd met zijn werk ter ondersteuning van FreeSewing. Dus vroegen we hem of hij het niet erg zou vinden om het onderwerp te zijn van de nieuwsbrief van dit kwartaal, en natuurlijk zei hij niet alleen ja, maar kwam hij ook terug met iets fantastisch, grappigs en unieks. Zoals altijd zijn fouten, vergissingen, enz. volledig de schuld van de interviewer!

### Vertel ons over je betrokkenheid bij FreeSewing.
Bedankt dat je me de kans geeft om over FreeSewing te praten. Ik vind het een vrij geweldige organisatie omdat ze gratis patronen aan mensen geeft. Voor mij is dat het beste wat FreeSewing doet. In de Verenigde Staten is er een winkel die regelmatig uitverkoop heeft waar je papieren patronen voor $2,00 USD kunt kopen, maar ik heb gehoord dat patronen in andere landen veel duurder zijn. En op sommige plekken zijn papieren patronen helemaal niet verkrijgbaar in winkels. FreeSewing biedt gratis patronen aan iedereen!

### Ik zie dat je veel codeerwerk doet voor FreeSewing?
Ik heb vroeger computerwerk gedaan (software QA en testen) en mijn opleiding is ook informatica. Veel van wat ik in het verleden heb gedaan bestaat uit het bekijken van code die andere mensen hebben geschreven, uitzoeken wat het doet en problemen oplossen. Dus ik heb die achtergrond gebruikt en toegepast op FreeSewing, ik test de website en de patronen om er zeker van te zijn dat alles goed werkt en ik probeer bugs op te lossen die opduiken.

### Ben je ook een naaister?
Dat is eigenlijk een goede vraag, in filosofische zin dan. Ik heb een naaimachine en heb naailessen gevolgd. Ik heb een stoffengoed en meerdere onafgemaakte projecten waar ik aan zou moeten werken. Maar echt naaien? Ik lijk niet veel te naaien. Ik besteed veel tijd aan het bekijken van naaivideo's op YouTube. Telt het kijken naar naaivideo's mee als je een naaister bent?

### Aan welke onafgemaakte projecten werk je niet en kijk je in plaats daarvan YouTube?
Ik ben begonnen aan een ontwerp voor een piratenhemd uit de 18e eeuw voor FreeSewing. Alle code is geschreven en het produceert prima patronen. Ik heb het echter nog niet getest om te zien of de gegenereerde patronen passen. (Ik heb gegokt naar de afmetingen van het patroon en gewoon getallen verzonnen die logisch leken). De volgende stap is het maken van een testkledingstuk om de pasvorm te controleren, wijzigingen in het patroon aan te brengen en de code dienovereenkomstig aan te passen.

Ik ben mijn zus ook een kussen schuldig dat op maat is gemaakt. (Ik hoef eigenlijk alleen maar een rechthoekige tas met een ritssluiting te naaien die ze kan vullen met extra traagschuim dat ze zelf in huis heeft). En tot slot, mijn eerste, originele onafgemaakte project is een Hawaiian/bowling stijl kampshirt, Kwik Sew 3484. (Ik kocht het patroon toen Kwik Sew nog een eigen bedrijf was en nog kledingpatronen maakte, als dat je een idee geeft van hoe lang het project al onaf is).

### Het piratenshirt klinkt interessant.
Ik heb het gekozen omdat 1. Ik wil eigenlijk een piratenshirt, en 2. Het leek me een goed, gemakkelijk ontwerp om te maken (alle stukken zijn rechthoeken!). Maar hoewel ik enigszins geïnteresseerd ben in historische kleding, ben ik helemaal niet geïnteresseerd in historische naaimethoden, naaien met de hand wel te verstaan. Ik ben van plan om een naaimachine te gebruiken om mijn piratenshirt te naaien.

Leuk weetje: Piraten naaiden ook met naaimachines (die ze meenamen van de schepen die ze plunderden). Maar in plaats van de spelden te verwijderen tijdens het naaien, lieten ze de spelden erin zitten en naaiden eroverheen - wat echt gevaarlijk kan zijn. Daarom droegen veel piraten ooglapjes.

### Je zei dat je een naaimachine had?
Het is een machine met de naam Kenmore die gemaakt is door Janome. Ik denk dat het destijds het meest eenvoudige model was. Geen steeklengte- of breedte-instelling, 4-staps knoopsgat, voorlaadspoel. Ik kocht hem nieuw bij Sears, toen Sears nog bestond en naaimachines verkocht. (Dat zou je nog een aanwijzing moeten geven over hoe lang mijn onafgemaakte kampshirtproject al onafgemaakt is!)

### Aan welke naaiprojecten zou je in de toekomst willen werken, ervan uitgaande dat je je bestaande onafgemaakte projecten afmaakt?
Ik wil graag mijn eigen kleermakersham maken. (Nog een eenvoudig patroon - gewoon twee ovalen). Ik overweeg om mijn eigen onderbroeken te maken omdat ik nieuwe nodig heb. Hoewel ik niet zeker weet of het praktischer of voordeliger is om ze gewoon in de winkel te kopen. En ik ben een beetje geïntimideerd voor het naaien van gebreide stof. Ik ben ook geïnteresseerd geraakt in patronen voor het naaien van je eigen op maat gemaakte jurk/pop. Maar dat lijkt me een te moeilijk project.

Tot slot zou ik ooit een kledingstuk willen maken van meubelstof of gordijnstof. Het lijkt me een interessante uitdaging om dat soort stof te gebruiken. Bovendien droeg Scarlett O'Hara een jurk gemaakt van gordijnen, waardoor ze met Rhett Butler kon trouwen. Maria maakte kleren van gordijnen en ze mocht trouwen met kapitein Von Trapp. (En ze was bijna een non!) Als ik kleren zou maken van gordijnen, stel je dan eens voor met wie ik zou kunnen trouwen!?

### Terug naar het coderen: is het moeilijk om een FreeSewing patroon te maken? Ik denk aan mensen die misschien ervaren naaisters zijn die patronen kunnen ontwerpen, maar die geen coderingskennis hebben.
Het is niet per se moeilijk om een bestaand patroon om te zetten in code. De eerste uitdaging is om te leren nadenken over hoe het patroon is opgesteld en het te beschrijven in termen van maten en hoeken. Net zoiets als wanneer je iemand via de telefoon of sms zou moeten uitleggen hoe je een patroon opstelt. Als je eenmaal in staat bent om instructies op te schrijven zoals "teken een punt A", "teken een ander punt 10 cm in een hoek van 45 graden boven en rechts van A en label het punt B", "teken een lijn tussen punt A en punt B", enzovoort, dan kun je de tekeninstructies omzetten in code.

De volgende uitdaging zou kunnen zijn om het bestaande patroon te nemen dat voor één specifiek persoon is gemaakt en na te denken over hoe het kan worden omgezet naar patronen voor andere mensen met andere afmetingen. Je zou moeten denken: "waarom was de stofmaat van dit onderdeel 10 cm? Als het is omdat het iets groter was dan de polsomtrek, dan kan de meting misschien worden omgerekend naar "de polsomtrek, plus 10%". Ik denk dat de vaardigheden vergelijkbaar zijn met die van patroontekenen.

Voor het coderen zelf is misschien de beste manier om het te leren (afgezien van het volgen van een formele codeercursus, waarvan er genoeg gratis te vinden zijn op internet) om naar de code van een bestaand FreeSewing ontwerp te kijken. Ik vermoed dat veel mensen leren coderen door naar bestaande code te kijken, die te kopiëren en er wijzigingen in aan te brengen om te zien wat de wijzigingen doen. FreeSewing biedt een laboratoriumtool waarmee je wijzigingen kunt bekijken in de ontwerpen die je maakt of bewerkt, zodat je met dingen kunt spelen en kunt leren van experimenteren. Als je hulp nodig hebt of vastloopt, zijn er genoeg mensen op de Discord die je graag helpen!

### Hartelijk dank. Nog laatste woorden?
Ik vind het verbazingwekkend dat de FreeSewing gemeenschap zo geografisch divers is, verspreid over de hele wereld, en toch in staat is om met elkaar te communiceren en elkaar te helpen. Ik ben blij dat ik deel uitmaak van deze gemeenschap. Hoewel, het valt me op dat met de anonimiteit van het internet, niemand me echt heeft gezien of weet wie ik ben. Misschien ben ik wel een kat op internet die zich voordoet als een persoon. (Als ik een kat was, zou dit niet als "catfishing" worden beschouwd. Wij katten noemen het gewoon "vissen"!)

&nbsp;

---

&nbsp;




## Wil je schrijven voor de nieuwsbrief?

Hey! Het is Karen, je vriendin van de [contributor calls](https://freesewing.org/community/calls/), de [Discord](discord.freesewing.org), en een heleboel van de dingen die in deze nieuwsbrief worden geschreven! Elk kwartaal publiceren we deze nieuwsbrief om mensen op de hoogte te houden van wat er nieuw is met FreeSewing, coole updates, indrukwekkende prestaties, rare projecten, enz. Maar het werkt alleen omdat er een hele ongelooflijke groep mensen is die creëert, ontwerpt en bijdraagt. (Hier kom jij in beeld.)

Als je deze nieuwsbrief leest en denkt:
- "Maar hoe zit het met de invulvraag?" of
- "Ooh, dat doet me denken aan een FreeSewing project waar ik achter de schermen aan heb gewerkt..." of
- "Wow, ik zou willen dat iemand een diepe duik in dit onderwerp zou nemen!"

...Dat zouden we graag willen weten. En als je dat artikel zelf wilt schrijven, dan ben ik persoonlijk dolblij en zal ik je op alle mogelijke manieren helpen om die mogelijkheid werkelijkheid te laten worden.

Misschien heb je een kledingstuk gemaakt dat je op een slimme manier hebt moeten hacken of dat een eigen leven is gaan leiden, en ben je er echt trots op. Misschien heb je een fork van de FreeSewing monorepo waar je iets spannends aan het knutselen bent. Misschien weet je niet waar je over wilt schrijven, maar hou je van FreeSewing en wil je graag een bijdrage leveren, of hoop je je naam op te bouwen als gerenommeerde woordkunstenaar. (Oké, eigenlijk is achtenswaardig misschien wat overdreven, maar dat is een deel van onze charme).

Reik uit! Je kunt ons vinden op [Discord](discord.freesewing.org), of op [Github](https://github.com/freesewing/), of je kunt gewoon reageren op deze e-mail. We horen graag van je. 🧡


