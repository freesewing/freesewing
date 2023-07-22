---
date: "2022-07-01"
edition: "2022q3"
intro: "2022 Zomernummer"
title: "2022 Zomernummer"
---

Welkom bij de 2022 zomereditie van de FreeSewing nieuwsbrief. Dit is wat er vandaag voor jou in zit:

- 🦈 FreeSewing 2.21 voegt vijf nieuwe patronen toe (4 minuten lezen - door Karen)
- 🔨 Veranderingen in onze monorepo-structuur (2 minuten lezen - door Natalia)
- Schat, we hebben FreeSewing gekrompen: FreeSewing ontwerpen aanpassen voor kinderen (2 minuten lezen - door Natalia)
- 👨‍💻 FreeSewing *afk* (1 minuut gelezen - door Lexander)
- 🕵️ Achter de naden: Starfetcher (4 minuten lezen - door Karen & Starfetcher)
- Moeten we down zijn omdat de inkomsten van FreeSewing zijn gedaald? (2 minuten lezen - door Joost)

Laten we er meteen in springen!

&nbsp;

&nbsp;

## FreeSewing 2.21 voegt vijf nieuwe patronen toe

FreeSewing 2.21 voegt Bob, Hi, Lucy, Noble en Unice ontwerpen toe.

### Bob de slabber

Trouwe volgers van FreeSewing herkennen Bob misschien, een klassieke slab en het resultaat van de FreeSewing patroonontwerp tutorial. Wil je Bob naaien zonder een FreeSewing patroon te leren ontwikkelen? Dat kan nu! Hoewel we vinden dat je toch moet leren hoe je een FreeSewing patroon ontwikkelt, zoals de mensen hieronder.

[Ontdek Bob op FreeSewing.org](https://freesewing.org/designs/bob)

### <strike>BLÅHAJ</strike>, neen Hi

Toen (de Britse tak van) een zekere Zweedse geel/blauw gekleurde meubelgigant aankondigde te stoppen met zijn alom geliefde pluchen haai, ging het internet daar niet erg goed mee om. Mensen houden van zachte en aaibare haaien en het idee om er ooit een te moeten missen om je gezelschap te houden als het moeilijk is, was ronduit verontrustend.

Dus werden er plannen gemaakt, strategieën besproken, maar een tijdje leek het erop dat we onze nederlaag maar moesten accepteren. Smash ging naar Wouter Van Wageningen, een van de meest senior patroonontwerpers van FreeSewings, die aan een unieke missie begon: De haaien redden. Het volstaat te zeggen. Dat deed hij. Want natuurlijk deed hij dat.

Wouter gaf het patroon de naam Hi en degenen onder jullie die zijn Nederlandse roots delen, zullen de woordspeling hier begrijpen 🦈 Dus nu kun je je eigen Hi naaien, een vriendelijke en fantastische pluchen haai en eerlijk gezegd een interneticoon.

Dit is het eerste pluche patroon van FreeSewing en daarom is het niet op maat gemaakt, maar het is wel parametrisch! Je kunt Hi in elke maat naaien, van ruwweg 5 centimeter tot 5 meter, en je kunt zijn mond aanpassen, zijn neus puntig maken en je Hi "agressief" maken (dat is wanneer je hem puntige tanden geeft). Nog iets leuks aan Hi: hij past iedereen in je leven! Heeft je broer of zus, kat, schoonzus, verliefdheid, baas, GM, barista of iemand anders in je leven een Hi nodig? Waarschijnlijk. Heb je een Hi nodig? Bijna zeker. Moet het 5 meter lang zijn? Nee, maar het wil wel.

[Ontdek Hi op FreeSewing.org](https://freesewing.org/designs/hi)

### Lucy

[Lucy](https://en.wikipedia.org/wiki/Lucy_Locket) is een perfect accessoire voor de historisch geïnspireerde naaister, een historische zak die je om je middel kunt knopen, ontworpen door SeaZeeZee. Traditioneel konden deze onder andere kledinglagen worden gedragen, zodat je gemakkelijk dingen kon dragen die aan het oog werden onttrokken door rokken of schorten, maar het is niet nodig om je Lucy te verbergen onder een bushel (of een bustle). Maak er een in zowat elke stof die je mooi vindt - Lucy ziet er geweldig uit in dat schattige quiltkatoen dat je niet kon weerstaan, dat restje dat je te mooi vindt om weg te gooien of het textiel waar je bang voor bent maar dat je toch wilt uitproberen. Een Lucy in pailletten, fluweel of vinyl? Zeker cool. 😎

[Ontdek Lucy op FreeSewing.org](https://freesewing.org/designs/lucy)

### Edele

Hi is niet het enige patroon dat Wouter Van Wageningen dit kwartaal heeft uitgebracht. Voor degenen die willen experimenteren met hun eigen patroonontwerpen, heeft Wouter het Noble blok gemaakt, een mouwloos prins(ss) naadblok gebaseerd op het Bella blokpatroon. Blokken zijn de basis voor andere patronen, dus Noble heeft geen afwerkingen of sluitingen, maar het is een geweldig, op maat gemaakt startpunt voor zelfgemaakte patronen.

[Ontdek Noble op FreeSewing.org](https://freesewing.org/designs/noble)

### Unice

Last but not least heeft FreeSewing-ontwerpster Anna Puk voor het eerst een nieuw ondergoedpatroon uitgebracht, Unice! Unice is een variatie op Ursula, een basispatroon voor ondergoed dat je heel gemakkelijk kunt aanpassen. Weet je nog niet of je Ursula of Unice moet opnaaien? Unice is ontworpen voor een volle achterkant, dus het kan een goede zijn om te proberen als je vindt dat ondergoed in jouw maat niet voldoende dekking biedt aan de achterkant, of als je jeans altijd strakker zitten bij het zitvlak dan bij de dijen of taille. Of, nog beter, maak ze allebei! Je kunt immers nooit te veel ondergoed hebben. (En als je dat doet, ga dan naar de [Discord](https://freesewing.org/community/where/discord/) of naar onze sociale kanalen, @freesewing_org op Instagram en Twitter, en laat ons weten hoe ze voor jou werken)!

[Ontdek Unice op FreeSewing.org](https://freesewing.org/designs/unice)

&nbsp;

---

&nbsp;

## 🔨 Veranderingen in onze monorepo-structuur

Er gebeuren grote dingen.

Er zijn enkele veranderingen geweest in de monorepo-structuur. Nu de vorige werkruimte met één garen in pakketten is opgesplitst in:
- ontwerpen voor ontwerpen
- plugins voor plugins
- pakketten voor NPM-pakketten die geen ontwerp of plugin zijn
- sites voor websites, backend code, onze svg tiler enzovoort

De monorepo is ontdaan van de individuele ontwikkelomgevingen voor ontwerpen. In plaats daarvan zou alle ontwikkeling van ontwerpen nu in het lab moeten gebeuren. Er is een nieuw commando `yarn tips` dat je kunt uitvoeren en dat je een snelle samenvatting geeft van hoe je moet werken binnen onze monorepo. En je kunt `yarn lab` draaien om het lab te starten vanaf de root van de repo, of vanuit elke ontwerp- of plugin-map.

Als je een nieuw ontwerp wilt toevoegen, voer dan `garen nieuw ontwerp` uit en alles wordt voor je geregeld.

De oude stand-alone ontwikkelomgeving (`npx create-freesewing-pattern`) is verouderd (sinds v2.21 geeft het uitvoeren ervan een waarschuwing) maar nog steeds beschikbaar. Degenen die op zoek zijn naar stand-alone ontwikkeling zouden de vervanging moeten proberen die gebruik maakt van dezelfde verbeterde ontwikkelomgeving als onze monorepo. Om het te starten voer je uit: `npx @freesewing/new-design`

Wil je een volledige lijst van wat er nieuw is? Bekijk de [notities van de laatste contributieoproep](https://github.com/freesewing/freesewing/discussions/2270).

&nbsp;

---

&nbsp;

## Schat, we hebben FreeSewing gekrompen: FreeSewing ontwerpen aanpassen voor kinderen

Eerst poppen, nu kinderen?! FreeSewing medewerkers lijken miniversies van onze ontwerpen te willen maken.

We wilden even de aandacht vestigen op de geweldige projecten die mensen voor hun kinderen maken en de lessen die ze hebben gedeeld. Mis de foto's niet in de [vitrine](https://freesewing.org/showcase/).

Als je geïnteresseerd bent in het aanpassen van een FreeSewing ontwerp voor een jongere, zijn er een paar dingen waar je rekening mee moet houden:

- **Maak testkledingstukken!** Het maken van een mousseline is een goede gewoonte in het algemeen, en vooral belangrijk als je naait voor mensen van wie de maten nog niet zijn getest met een FreeSewing ontwerp, omdat hun verhoudingen de eerste keer niet altijd soepel zullen werken. `comixminx` is de onbetwiste kampioen van Shin naaibroeken, die verschillende testparen heeft genaaid op weg naar het maken van draagbare paren voor elk van [haar](https://freesewing.org/showcase/shin-swim-trunks-for-comixminxs-kid/) [kinderen](https://freesewing.org/showcase/more-shin-swim-shorts/).
- **Overweeg om een blok uit te proberen.** Zoals te zien is in `Bob3000`'s schattige [klusjas](https://freesewing.org/showcase/bob3000-chore-coat/) voor zijn kind, gebaseerd op het blok Brian, kan de basisvorm van een blok een goed uitgangspunt zijn waaraan je ontwerpelementen kunt toevoegen.
- **Gebruik veel gemak bij het ontwerpen voor peuters.** `mathstitch` maakte uiteindelijk hun eigen kraagshirt en het is prachtig geworden. Ze deelden een aantal tips voor iedereen die in de toekomst misschien een bestaand ontwerp probeert aan te passen! Ze raden aan om veel gemak toe te voegen omdat peuters zo actief en ongecoördineerd zijn, de neiging hebben om steeds ongewone houdingen aan te nemen zoals hurken en kruipen, en sommigen hebben grote buiken en veel puppyvet. 🐶 Een muts met korte mouwen is gepast. Als je kind nog in de luiers zit, moet het shirt uitlopen bij de heupen om daar rekening mee te houden, en je moet ervoor zorgen dat de knopen ver genoeg van de onderkant van het shirt eindigen.
- **Voeg verstelbare elementen toe om kledingstukken langer te laten passen.** `Rowan` maakte een klein [Albert schortje](https://freesewing.org/showcase/a-tiny-albert-apron/) voor de verjaardag van hun kind en voegde verstellers toe aan de bandjes. Geweldig idee om het aantal draagbeurten van dit schattige accessoire te maximaliseren.
- **Naai snel.** `AMJ` meldt dat ze kinderen van maat hebben zien veranderen tussen het passen en het naaien. 😀

Als je een van onze ontwerpen uitprobeert met je kind, hopen we dat je erover komt kletsen in [Discord](https://discord.freesewing.org/).

&nbsp;

---

&nbsp;

## 👨‍💻 FreeSewing *afk*

FreeSewing gaat naar buiten! FreeSewing zal deel uitmaken van het [May Contain Hackers](https://mch2022.org/) kamp als een korte lezing door Lexander. Markeer je agenda voor 24 juli, 09:40 PM CEST; het is te volgen via een livestream.

Lexander zal beschrijven wat FreeSewing is, de motivatie van Joost (en andere vrijwilligers) erachter, iets over de techniek en waarom het belangrijk is voor de mode en kleding als geheel. Meer informatie vind je in de volledige beschrijving [op de site van het evenement](https://program.mch2022.org/mch2021-2020/talk/M9JWKM/).

&nbsp;

---

&nbsp;

## 🕵️ Achter de naden: Starfetcher

### Hoe heb je FreeSewing leren kennen?

Ik weet het niet meer precies, maar volgens mij zocht ik op een dag naar naaipatronen en had ik het glorieuze inzicht om "open source naaipatroon" als trefwoord te gebruiken. De zoekmachine deed zijn werk.

### Hoe ben je medewerker geworden?

Tijdens het lezen van de developer docs vond ik een paar typefouten en besloot ze te corrigeren, terwijl ik aan vertalingen begon vond ik er nog een paar, en plotseling was ik een medewerker. Meedoen aan de contributiegesprekken was de volgende logische stap en sindsdien heb ik niet meer omgekeken.

### Wat is je werk tot nu toe geweest?

Naast het repareren van typefouten en gebroken links, doe ik sporadisch wat vertaalwerk en heb ik drie historisch geïnspireerde patronen gecodeerd: Lunetius, Tiberius en Walburga.

### Ben je een naaister? Een codeur? Beide? Geen van beide?

Beide, en het hangt van mijn stemming af wat ik leuker vind om te doen.

### Wanneer en waarom ben je begonnen met naaien?

Als kind leerde mijn moeder me de basis, maar pas in mijn late tienerjaren begon ik het serieus te nemen toen ik besloot mijn eigen kostuum te naaien voor mijn verjaardagsfeestje (mijn verjaardagsfeestjes waren en zijn nog steeds altijd verkleedfeestjes). Ik heb veel fouten gemaakt (zoals het afwerken van de randen voordat ik de delen aan elkaar naaide), maar ik was (en ben nog steeds) er ongelooflijk trots op. Daarna nam ik weer een pauze in het naaien, maar herontdekte het toen ik halverwege mijn tienerjaren weer begon met cosplay.

### Wat is je dagelijkse werk, buiten FreeSewing?

Op dit moment ben ik bezig met mijn PhD in experimentele natuurkunde, dus ik heb een goede mix van hands-on werk aan de machine en veel vloeken achter de computer om 23.00 uur.

### Waar werk je op dit moment aan?

Momenteel ben ik bezig met het maken van schuimpantsers als aanvulling op de stoffen onderdelen van mijn kostuum (bestaande uit Lunetius, Tiberius en Walburga, natuurlijk). Het is een nieuwe techniek voor mij, dus het is erg leuk om mee te spelen.

### Welk project heb je net afgerond?

Ik ben net klaar met het coderen en naaien van Pythia de paenula, mijn aankomende FreeSewing patroon voor een ander type historisch geïnspireerde mantel. Nu ben ik aan het uitstellen om de laatste bugs op te sporen.

### Op welk naai-/codeerproject ben je het meest trots?

Wat naaien betreft, ben ik nog steeds erg trots op het eerste kostuum dat ik zelf naaide, maar het lastigste tot nu toe is de Sailor Fuku die ik een paar jaar geleden maakte. Oh, en het Victoriaanse shirt met veel plooien aan de voorkant, waar ik ook de maatvoering van eigenlijk alles moest aanpassen (een ervaring die me uiteindelijk naar FreeSewing heeft geleid). Qua codering is dat waarschijnlijk een werkgerelateerd iets waarbij ik een aantal mooie grafische voorstellingen heb gemaakt met Python en LaTeX.

### Waar ben je het meest trots op in je leven?

Dat is een moeilijke vraag! Waarschijnlijk alle gecombineerde ervaringen die me alles hebben geleerd wat ik nu weet.

### Wat vind je het leukste aan naaien?

Het magische gevoel als je iets af hebt en het aantrekt en het gewoon perfect is.

### Wat haat je het meest aan naaien?

Het wegzakkende gevoel als je iets af hebt en je je realiseert dat er iets mis is gegaan en je directe toekomst waarschijnlijk bestaat uit de draadplukker of de snijmat als je pech hebt. Oh, en het zomen van rokken, vooral het zomen van twee gecombineerde rokken met een volledige cirkel omdat je het volume wilde om 2 uur 's nachts.

### Wat is voor jou het moeilijkste aan naaien?

Patroondelen leggen met de juiste nerflijn en dingen uitknippen zonder de naadtoeslag te vergeten.

### Wat zou jouw advies zijn voor beginnende naaisters?

Duik er gewoon in! Wees niet bang om fouten te maken en wees niet bang om hulp te vragen, maar probeer het gewoon.

### Naai je vooral voor jezelf of voor anderen, zoals vrienden en familie?

Meestal alleen voor mezelf, hoewel ik een paar keer heb geprobeerd om iets als cadeau te naaien - tot nu toe heb ik er nog nooit een afgemaakt.

### Wat doe je als je geen kleding maakt of patronen ontwerpt? - Wil je manieren delen om je te volgen op sociale media?

Ik hou van rollenspellen (DSA, Cthulhu, ...), videospellen, lezen, fotografie, schermen en boogschieten (nog steeds een amateur, dat wel). Ik ben ook verantwoordelijk voor de regie van het acteergedeelte van de musicalgroep van mijn oude school. Geen sociale media voor mij.

### Heb je huisdieren? Familie?

Helaas geen huisdieren, hoewel mijn SO een schattige hond heeft. Ik ben vrij close met mijn ouders.

### Ben je een honden- of kattenpersoon?

Beide! Maar als ik zou moeten kiezen, zou ik... een pinguïn kiezen.

### Als je één ding mee zou kunnen nemen naar een onbewoond eiland, wat zou dat dan zijn? Waarom?

Behalve dingen als water en voedsel en een mes? Waarschijnlijk mijn e-boeklezer, geüpgraded met zonnecellen en tot de nok toe gevuld met boeken voor vermaak en overleving.

### Als er één persoon was die je mee mocht nemen naar een onbewoond eiland, wie zou dat dan zijn? Waarom?

Dat is lastig! Als het vrijwillig is, mijn SO, maar ze zouden het moeilijk hebben zonder elektriciteit en andere extraatjes van de beschaving. Als het niet vrijwillig is, iemand die mijn overlevingskansen vergroot, zoals een hele sterke dokter.

&nbsp;

---

&nbsp;

## Moeten we down zijn omdat de inkomsten van FreeSewing zijn gedaald?

Ik neem aan dat je bekend bent met [FreeSewing's revenue pledge](https://freesewing.org/docs/various/pledge/)? Zo niet, ga je gang en lees het. Ik zal wachten.

Over de eerste 6 maanden van 2022 waren de inkomsten van FreeSewing 25% lager dan de (gemiddelde) inkomsten van 2021.

Dit is niet geheel onverwacht. Er was een toestroom van nieuwe klanten tijdens de Covid pandemie, en we zitten nu op de neergaande lijn van die golf. Veel klanten die FreeSewing hebben ontdekt vanwege ons gezichtsmaskerpatroon, verlaten ons nu omdat ze het nut niet inzien van het uitbreiden van hun steun. Anderen voelen de crisis in de kosten van levensonderhoud en hebben hun bijdragen verlaagd of helemaal geschrapt.

Ik waardeer al deze bijdragen echt, maar als ik beschermheren zie vertrekken, vraag ik me af of we een probleem hebben? Persoonlijk denk ik van niet. Maar ook daar ben ik niet 100% zeker van. En op de slechte dagen voedt het zeker mijn twijfels over... nou ja, alles eigenlijk.

Er zijn veel verschillende statistieken die je kunt gebruiken om aan te tonen dat FreeSewing bloeit. Of het nu gaat om het aantal ontwerpen dat we beschikbaar hebben, de grootte en activiteit van de gemeenschap, of iets dat zo eenvoudig te meten is als het aantal commits.

Maar toch...

Na er een tijdje over nagedacht te hebben, dacht ik dat het het beste was om gewoon transparant te zijn over wat er aan de hand is: FreeSewing doet het goed, maar we zien minder financiële steun dan vroeger. De inkomsten zullen dit jaar met minstens 25% dalen.
