---
author: "joostdecock"
caption: "Je nieuwe inlogachtergrond voor de maand oktober"
date: "2017-09-30"
intro: "Dit is je maandelijkse samenvatting van het freeswing-nieuws van de afgelopen vier weken en een blik op wat er de komende maand in het verschiet ligt."
title: "Maandelijks overzicht - september 2017: Simon complicaties, e-mail problemen en donaties zijn dit jaar gestegen."
---

Dit is je maandelijkse samenvatting van het freeswing-nieuws van de afgelopen vier weken en een blik op wat er de komende maand in het verschiet ligt.

## Terugblik op september, en een beetje op augustus
Voor deze eerste editie kijk ik iets verder terug dan een maand, want [deze site is eind augustus](/blog/open-for-business/)gelanceerd, dus die week neem ik mee in deze maandelijkse roundup.

### Mijn naam is Simon en ik ben ingewikkeld.

Sinds de lancering zijn er [3 nieuwe padreleases geweest van freesewing core](https://github.com/freesewing/core/releases) --- je weet wel, datgene dat je naaipatronen genereert --- en die waren allemaal te wijten aan problemen met [het Simon Shirt patroon](/patterns/simon).

Volledige details zijn te vinden op [de changelog](https://github.com/freesewing/core/blob/develop/CHANGELOG.md), maar hier is de essentie:


 -  De naadtoeslag bij de zoom klopte niet toen de lenthBonus erg laag was.
 -  De snede in de mouw voor de sluiting was te kort
 -  Er was een probleem met de naadtoeslag bij het knoopsgat
 -  De mouwlengtebonus werd dubbel geteld
 -  Er werd geen rekening gehouden met de heupomvang/gemakkelijkheid; in plaats daarvan werd de borstomvang/gemakkelijkheid gebruikt.
 -  Een aantal standaardopties zijn aangepast


Met dank aan [Tatyana](/users/yrhdw) en [Stefan](/users/kczrw) voor het melden van deze problemen. Je krijgt die funky bugbadge:

![Ik vind deze echt leuk](https://posts.freesewing.org/uploads/badge_found_bug_d7d0c9055a.svg)

#### Wat is je probleem Simon?

Dat deze problemen opduiken bij Simon is geen toeval. Het patroon heeft maar liefst 41 opties waarmee je vrijwel elk aspect van je shirt kunt bepalen.

Het beheren van al die verschillende combinaties in de code leidt tot veel complexiteit. En waar de complexiteit van code toeneemt, verschijnen er bugs.

![Als Simon op Facebook zou staan, zou zijn relatiestatus zeker *Het is ingewikkeld* zijn.](https://posts.freesewing.org/uploads/complicated_d8c872358d.gif)

#### Is het tijd voor een revisie?
Simon is een port van het Singular Shirt patroon van MakeMyPattern.com. Toen zou het maken van een shirt met een andere stijl hebben betekend dat de code moest worden gekopieerd, wijzigingen moesten worden aangebracht en dat er dan voor eeuwig twee licht verschillende variaties moesten blijven bestaan.

Het gaat hier beter bij freesewing, waar overerving is ingebakken in het systeem. Ik zou dus een basispatroon voor overhemden kunnen (en misschien wel moeten) hebben, en dat dan uitbreiden met een heleboel verschillend gestileerde overhemdpatronen.

 - Brian Basispatroon
   - Basis patroon overhemd
     - Casual overhemd patroon
     - Formeel overhemd patroon
     - Een ander overhemdpatroon

Het zou niet alleen de complexiteit van de code verminderen, maar het zou aantoonbaar ook intuïtiever zijn om een aantal verschillend gestileerde overhemdpatronen te zien, in plaats van slechts één patroon en dan 41 opties om mee te jongleren.

Een volledige Simon revisie zal wat werk zijn, maar het is mogelijk. Ik ben benieuwd naar je gedachten hierover.


## Problemen met de bezorging van e-mail oplossen
Ik heb een workaround toegevoegd voor degenen die problemen hadden met het ontvangen van de registratiemails. In principe mensen met een e-mailaccount dat wordt beheerd door Microsoft.

![Als deze jongens je inbox beheren, wie weet wat voor e-mails je dan nog meer niet krijgt?](msft.gif)

Je kunt [mijn blogpost over deze kwestie](/blog/email-spam-problems/) lezen voor alle details, maar als je een van deze adressen hebt, zou je deze e-mails nu moeten krijgen. Het enige nadeel is dat je ze misschien twee keer krijgt.

## Verwijzingen
Als mensen een link naar je site plaatsen en bezoekers klikken op die link, dan heet dat een verwijzing. De bloggers onder jullie zijn misschien bekend met het doorbladeren van je Google Analytics-rapporten om te zien wie er naar je heeft gelinkt.

Deze site maakt geen gebruik van Google Analytics --- er is [een blogpost met details over dat](/blog/privacy-choices/) ook --- maar legt nog steeds verwijzingen vast. Het overzicht van recente verwijzingen is voor iedereen beschikbaar op [de statuspagina](/status).

Linken naar freesewing.org is natuurlijk leuk om te doen, dus ik houd de verwijzingen in de gaten en als er een site opduikt die van een gebruiker is, krijg je de Ambassador badge.

![Linken naar freesewing.org is een manier om de ambassadeurbadge vrij te spelen.](https://posts.freesewing.org/uploads/badge_ambassador_3dd1e722cc.svg)

Het is een kleine manier om je te bedanken voor het verspreiden van freesewing.

## Donaties
In september hebben we het donatiebedrag van vorig jaar gepasseerd, dus het is fijn om te zien dat ik dit jaar [meer geld naar AzG](/about/pledge#donations-history) kan sturen dan in 2016.

Je kunt de donaties altijd volgen op [de donaties belofte pagina](/about/pledge#donations-history), maar hier is de huidige status:

![Joehoew! Beter dan vorig jaar](https://posts.freesewing.org/uploads/donations_68e214d133.svg)

## Meer downloadformaten

Ik heb ook extra formaten toegevoegd aan de concept downloadpagina. Je hebt nu de keuze uit SVG, PDF, brief-PDF, tabloid-PDF, A4-PDF, A3-PDF, A2-PDF, A1-PDF en A0-PDF.

## De badge voor kwaliteitscontrole
Ik heb de kwaliteitscontrolebadge toegevoegd voor dingen als het melden (of repareren) van typefouten, gebroken links, grammatica en andere kleine verbeteringen.

![Zie je een typefout? Laat het me weten en je krijgt dit](https://posts.freesewing.org/uploads/badge_quality_control_6acb8c10c2.svg)

Dit lijkt misschien geen wereldschokkende bijdrage, maar toch zijn ze belangrijk.

Op het spectrum tussen eindeloos zwoegen op de perfecte inhoud voordat je het publiceert, of het snel uitbrengen met alles erop en eraan, neig ik sterk naar het laatste. Dus ik reken een beetje op jullie om me te laten weten wanneer ik het verprutst heb.

## Vooruitkijken naar oktober

Er zijn 5 patronen waar ik momenteel aan werk. En ze zijn allemaal zover klaar dat ik ze moet maken om te controleren of ze werken zoals bedoeld. Eerst een mousseline en dan het echte werk.

Dat is een beetje een knelpunt voor mij omdat ik lang moet pendelen, dus mijn naaitijd is meestal beperkt tot het weekend.

De enige manier die ik zie om het proces van het uitbrengen van patronen te versnellen is om mensen mee te laten doen met het testen van patronen. Ik denk niet dat het iets is wat ik mensen kan vragen om te doen, want dit is een vroeg teststadium. Om nog maar te zwijgen over het feit dat ik ze niets te bieden heb om de deal te versoepelen. Wat ga ik je geven, een gratis patroon?

Maar toch, voor het geval dat sommigen van jullie willen helpen door een mousseline te maken en me te laten weten hoe dat ging, hier is wat er op dit moment op mijn tekentafel ligt:

 - Een broekenblok voor mannen dat beter zou moeten zijn dan Theo(dore)
 - Een blok voor jeans met zelfkant voor mannen
 - Een zip-up hoodie voor mannen
 - Een winterjas
 - Een uniseks leggins patroon

Als iemand van jullie er een wil maken als test, [laat het me dan weten](/contact), het zou me echt helpen. 

