---
---



<PatternOptions pattern='breanna' />

## De mouwkop begrijpen

De Mouwkop van Breanna was ontworpen om zich aan te passen aan verschillende soorten mouwen en kledingstukken. Als gevolg daarvan heeft alleen al de mouwkop twintig mogelijkheden om zijn vorm te controleren. Hoewel dat aanvankelijk misschien een beetje bezwarend zou kunnen lijken, begrijpen hoe de mouwkop wordt opgesteld maakt het gemakkelijk om te begrijpen wat alle individuele opties doen.

### De grenzendoos

De *stuiterdoos* van de mouwkop is een rechthoek die net zo breed is als de mouw, en net zo hoog als de mouwkop. Binnen deze doos bouwen we onze mouwkop.

![De Breanna mouwkop](sleevecap.svg)

De afbeelding hierboven toont een mouwkop, vanaf punt 1, ga dan naar boven tot punt 4, en dan weer naar beneden tot punt 2.

<Note>

###### Het vinden van de voorkant van de mouw(cap)

In ons voorbeeld staat de voorkant van de mouwkop aan de rechterkant. Maar hoe zou u dat weten? 

Terwijl patronen meestal een indicatie hebben die aangeeft welke kant is (een enkel merkteken
betekent het voorpand, overwegende dat een dubbele inkeping de achterkant betekent, kan je ook
de voorkant van een mouwkop herkennen omdat het meer gebogen is. De achterkant van de
mouwkop wordt ook gebogen, maar het is een vlakke curve. Dat komt doordat de menselijke schouder
sterker uitklapt en aan de voorkant van het lichaam gebogen is Dus is de mouwkop daar meer gebogen 
om te passen op de schouder.

</Note>

De breedte van de mouwkop (en dus de breedte van de mouw aan de onderkant van het armsgat) is gelijk aan de afstand tussen de punten 1 en 2. Die afstand hangt af van de metingen van het model, de hoeveelheid overwijdte en het snijpunt van het kledingstuk, enzovoort. Voor onze mouwkop willen we weten dat we beginnen met een bepaalde breedte. En hoewel die breedte beïnvloed kan worden door andere factoren, kunnen we deze niet beïnvloeden door een van de mouwkop opties.

![Onderdeel de bovenkant van de mouwkop](sleevecaptop.svg)

De hoogte van de mouwkop is gelijk aan de afstand tussen de punten 3 en 4. De exacte hoogte is een compromis tussen de maten van het model, de opties, de overwijdte van de mouw en mouwkop, en het feit dat uiteindelijk de mouw in het armsgat moet passen. Dus de hoogte kan verschillen, en we controleren de exacte waarde. Maar er zijn twee opties die de vorm van onze mouwkop bepalen:

 - [Mouwkop top X](/docs/patterns/breanna/options/sleevecaptopfactorx/) : Bepaalt de horizontale plaatsing van punt 3 en 4
 - [Mouwkop top Y](/docs/patterns/breanna/options/sleevecaptopfactory/) : Bepaalt de verticale plaatsing van punt 4

Met andere woorden, paragraaf 4 kan steeds lager en misschien minder intuïtief worden gemaakt. het kan ook worden veranderd om meer aan rechts of links te liggen, in plaats van in het midden te rukken zoals in ons voorbeeld.

### De inflectiepunten

![De inkoppelingspunten regelen](sleevecapinflection.svg)

Met de punten 1, 2, 3 en 4 hebben we een doos om onze mouwkop in te trekken. Nu is het tijd om onze *inflectie punten* toe te wijzen. Dit zijn de punten 5 en 6 op onze tekening, en hun plaatsing wordt bepaald door de volgende 4 opties:

 - [Mouwkop X](/docs/patterns/breanna/options/sleevecapbackfactorx) : Bepaalt de horizontale plaatsing van punt 5
 - [Mouwkop Y](/docs/patterns/breanna/options/sleevecapbackfactory) : Bepaalt de verticale plaatsing van punt 5
 - [Mouwkop X](/docs/patterns/breanna/options/sleevecapbackfactorx) : Bepaalt de horizontale plaatsing van punt 6
 - [Mouwkop Y](/docs/patterns/breanna/options/sleevecapbackfactory) : Bepaalt de verticale plaatsing van punt 6

<Note>

Zoals u in ons voorbeeld ziet, liggen deze punten niet altijd op onze mouwlijn. In plaats daarvan
helpen ze bij het creëren van punten die altijd op de mouwkop liggen: de ankerpunten.

</Note>

### De ankerpunten

![Controleren van de ankerpunten](sleevecapanchor.svg)

Uiteindelijk zal onze mouwkop de combinatie van 5 curves zijn. Naast de punten 1 en 2, de 4 *ankerpunten* die oranje zijn gemarkeerd in ons voorbeeld zullen de start/afwerking van deze curves zijn.

De punten zijn *offset* looddicular uit het midden van een lijn tussen de twee ankerpunten om hen. De offset voor elk punt wordt bepaald door deze 4 opties:

 - [Mouwkop Q1 offset](/docs/patterns/breanna/options/sleevecapq1offset) : Bepaalt de offset loopendicular naar de lijn van punt 2 tot 6
 - [Mouwkop Q2 offset](/docs/patterns/breanna/options/sleevecapq2offset) : Bepaalt de offset perpendicular naar de lijn van punt 6 tot 4
 - [Mouwkop Q3 offset](/docs/patterns/breanna/options/sleevecapq3offset) : Bepaalt de offset perpendicular naar de lijn van punt 4 tot 5
 - [Mouwkop Q4 offset](/docs/patterns/breanna/options/sleevecapq3offset) : Bepaalt de offset perpendicular naar de lijn van punt 5 tot 1

<Note>

We hebben onze mouwkop in 4 kwartalen verdeeld. We starten vooraan (rechts in ons voorbeeld)
met kwart 1. en doe onze weg naar de rug om te eindigen met kwart 4.

Net als de offset optie, zullen de laatste opties om de vorm van onze mouwkop te bepalen gewoon herhalen, zodat je 
elk kwartaal afzonderlijk kunt controleren.

</Note>

### De spreiding

![Controleren van de ankerpunten](sleevecapspread.svg)

We hebben nu alle start- en eindpunten om de 5 curves te tekenen die samen onze mouwkoppen zullen vormen. Wat we missen, zijn de controlepunten (zie [onze informatie over Beverier-curven](https://freesewing.dev/concepts/beziercurves) om meer te weten te komen over de bouw van curven). Deze worden bepaald door de zogenaamde *spread*.

Voor elk van de ankerpunten (de punten gemarkeerd in oranje, geen punt 1 en 2) er is een optie om de spreiding naar boven en naar beneden te besturen:

 - [Mouwkop Q1 neerwaardse spreiding](/docs/patterns/breanna/options/sleevecapq1spread1) : Bepaalt de neerwaartse spreiding in het eerste kwartaal
 - [Mouwkop Q1 opwaardse spreiding](/docs/patterns/breanna/options/sleevecapq1spread2) : Bepaalt de opwaartse spreiding in het eerste kwartaal
 - [Mouwkop Q2 neerwaardse spreiding](/docs/patterns/breanna/options/sleevecapq2spread1) : Bepaalt de neerwaartse spreiding in het tweede kwartaal
 - [Mouwkop Q2 opwaartse spreiding](/docs/patterns/breanna/options/sleevecapq2spread2) : Bepaalt de opwaartse spreiding in het tweede kwartaal
 - [Mouwkop Q3 opwaartse spreiding](/docs/patterns/breanna/options/sleevecapq3spread1) : Bepaalt de opwaartse spreiding in het derde kwartaal
 - [Mouwkop Q3 neerwaardse spreiding](/docs/patterns/breanna/options/sleevecapq3spread2) : Bepaalt de neerwaartse spreiding in het derde kwartaal
 - [Mouwkop Q4 opwaartse spreiding](/docs/patterns/breanna/options/sleevecapq4spread1) : Bepaalt de opwaartse spreiding in het vierde kwartaal
 - [Mouwkop Q4 neerwaardse spreiding](/docs/patterns/breanna/options/sleevecapq4spread2) : Bepaalt de neerwaartse spreiding in het vierde kwartaal

<Note>

Attensieve lezers zullen hebben opgemerkt dat punt 4 geen ankerpunt is. Met andere woorden, er is geen garantie
dat het op de mouwkop zal liggen. Dit betekent ook dat de opwaartse spreiding in kwartaal 2 en 3
de hoogte van de mouwkop zal beïnvloeden. Verminder de opwaartse spread, en de curve zal onder punt 4 duiken. Verhoog het en
de curve zal daarboven stijgen.

</Note>

### Takeaways

Terwijl de mouwkop in Breanna (en alle patronen die Breanna) veel mogelijkheden hebben, begrijpen hoe de mouwkop wordt gebouwd kan helpen om de juiste vorm te ontwerpen die je wilt. Om dit te doen:

 - Begin met het plaatsen van de bovenkant van je mouwkop
 - Bepaal dan de invoegpunten
 - Vervolgens, gebruik de offset om de kracht van de curve te controleren
 - Tot slot gebruik je de spreiding om de zaken vlot te trekken

Wat belangrijk is om te onthouden is dat je alleen de vorm van de mouwkop controleert. Welke vorm je ook ontwerpt, het zal in het armsgat worden gemonteerd, betekent dat de grootte ervan kan en zal worden aangepast om ervoor te zorgen dat de mouw bij de armband past. De vorm die u aanmaakt zal echter altijd worden gerespecteerd.

