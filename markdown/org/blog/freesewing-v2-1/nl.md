---
author: 1
caption: "Dit bericht gaat vooral over ons werk aan progressieve openbaarmaking. Ook: Drie nieuwe patronen!"
date: "2019-10-06"
intro: "We hebben zojuist FreeSewing v2.1 uitgebracht 🎉"
title: "FreeSewing v2.1: Drie nieuwe patronen, expertmodus en hulp bij metingen"
---


We hebben zojuist FreeSewing v2.1 uitgebracht 🎉

## Ontmoet Penelope, Waralee en Simone

Er zijn 3 nieuwe patronen in deze release:

 - [Penelope](/patterns/penelope) is een kokerrok van [Wouter Van Wageningen](/users/wouter.vdub)
 - [Waralee](/patterns/waralee) zijn wikkelbroeken, ook van [Wouter](/users/wouter.vdub)
 - [Simone](/patterns/simone) is Simon (ons veelzijdige button-down patroon) bewerkt voor borsten door [Joost De Cock](/users/joost)

Al deze patronen zijn ofwel dameskleding of -- in het geval van Waralee -- unisex kleding. Dit geeft aan dat we meer patronen voor damesmode op de site willen zetten.

Naast het maken van nieuwe patronen is er veel moeite gedaan om dingen eenvoudiger te maken, zonder ze dommer te maken. Ik zal het uitleggen:

## Ons werk aan progressieve openbaarmaking

Het is een voortdurende uitdaging om een balans te vinden tussen het geven van alle kracht aan onze gebruikers en het toch makkelijk maken voor nieuwkomers om aan de slag te gaan. We zijn begonnen dat probleem aan te pakken met de zogenaamde *progressive disclosure of complexity*.

Het idee - dat we niet hebben verzonnen, maar dat een concept is in UX design - is om de ervaring voor de meeste mensen te vereenvoudigen zonder de mogelijkheden van meer gevorderde gebruikers te beperken.

We richten onze aandacht voor progressieve openbaarmaking op twee gebieden waar onze gebruikers het vaakst mee worstelen:

 - **Patroonopties**: Onze patronen worden vaak geleverd met tientallen opties. Dat is geweldig voor degenen die graag elk detail van hun patroon afstemmen, maar kan een beetje overweldigend zijn voor nieuwkomers.
 - **Metingen**: Het nemen van nauwkeurige metingen is cruciaal voor goede resultaten met onze patronen, maar niet zo triviaal als je zou denken.

Hoewel we er zeker nog niet zijn, hebben we op beide punten vooruitgang geboekt. Laten we eens kijken wat we hebben gedaan:

### Patroonopties: We hebben nu een expertmodus en deze staat standaard uit

(Sommige van) Onze patronen hebben een tijdje *geavanceerde opties* gehad, maar die zijn nu standaard verborgen. Dat is totdat je de **Expertmodus** aanzet in de instellingen (onder de patroonopties).

Naast geavanceerde patroonopties laat de exportmodus ook de minder gebruikte kladinstellingen zien, zoals de mogelijkheid om de taal, eenheden, details, marge en inhoud van je klad te wijzigen.

![Geavanceerde modus](https://posts.freesewing.org/uploads/recreate_a6e2f9c4d6.png)

<Note> 

###### Ook getoond: Patroon vs Recept standaardwaarden

Bij het configureren van je draft heeft elke optie een knopje om de standaardwaarde voor die optie te herstellen.
Het wordt ingewikkelder als je een recept opnieuw maakt. Als je nu de standaardinstelling herstelt, is het dan de standaardinstelling van het patroon of de standaardinstelling van het recept?

Het antwoord was altijd het standaard patroon, maar met deze versie zul je zien dat opties waarbij het standaard recept anders is dan het standaard patroon
twee knoppen hebben. Eén keer om de standaard patrooninstelling te herstellen, en nog een keer om de standaard receptinstelling te herstellen. 

Je kunt dit zien in de schermafbeelding hierboven.

</Note>

### Metingen: Fouten in je metingen opsporen

We hebben een aantal indicatoren toegevoegd om je fouten of problemen in je metingen te helpen zien. Je modellen tonen nu een grafische weergave van je lichaamsafmetingen, zodat je eventuele uitschieters kunt zien.

![Een grafische weergave van de metingen van je model](https://posts.freesewing.org/uploads/model_c3fa8fc50c.png)

Daarnaast tonen we je een schatting van je verschillende metingen (gebaseerd op je nekomtrek) naast de werkelijke waarde. Als het verschil groter wordt, zullen we je daar op wijzen.

Dit is een moeilijk gebied voor ons om in te werken. We willen je helpen om de beste resultaten te krijgen, en dat houdt ook in dat we je helpen om problemen met je metingen te ontdekken. Aan de andere kant willen we op geen enkele manier impliceren dat iemands metingen *verkeerd zijn* op de een of andere manier.

Wij zijn een zeer omvangrijk model en een onevenredig groot deel van onze gebruikers zijn mensen die moeite hebben om kleding of patronen te vinden uit andere buitentjes. Dus aan de ene kant lijkt het misschien alsof we onszelf op een mislukking voorbereiden door metingen te vergelijken met een set van min of meer *standaardmetingen* . Maar je kent je lichaam. U weet welke van uw metingen afwijken van het gemiddelde. En we wijzen erop dat ze dat wel doen, is slechts een bevestiging dat je het goed hebt gemeten. Aan de andere kant weet je dat als er iets springt waar je een redelijk gemiddelde maat hebt, je die metingen nog eens dubbel moet controleren.

Last but not least, terwijl we begeleiding proberen te geven bij metingen om fouten te helpen spoelen, we sluiten nooit iemand uit op basis van grootte of maat. Wat je ons ook voor de voeten werpt, we maken een patroon dat voor jou werkt, of (onze software zal) het proberen.

## Andere wijzigingen

 - We hebben onze maatbereiken voor onze vergelijkingsoverzichten uitgebreid. Herenkleding wordt nu gesampled vanaf maat 32 tot en met 48, terwijl dameskleding wordt gesampled vanaf maat 28 tot en met 46.
 - We hebben enkele wijzigingen aangebracht in de standaardinstellingen in het Simon patroon, gebaseerd op onze tests met Simone
 - We hebben ondersteuning voor het vooraf laden van modellen met borsten toegevoegd aan onze ontwikkelomgeving voor patroonontwerpers
 - We hebben reparaties en verbeteringen doorgevoerd in onze Jaeger, Bruce, Benajamin, Simon, Carlton en Carlita patronen.
 - We hebben een heleboel ontbrekende afbeeldingen toegevoegd in de documentatie en [is begonnen met een poging om ervoor te zorgen dat alle opties een afbeelding hebben om hun doel te illustreren](https://github.com/freesewing/freesewing.org/issues/190).

Meer informatie is beschikbaar [in de changelog](https://github.com/freesewing/freesewing/blob/develop/CHANGELOG.md).

We hopen dat je deze release leuk vindt en [kom langs in onze chatroom](https://discord.freesewing.org/) om je gedachten, feedback, suggesties of ideeën te delen. We horen graag van je 





