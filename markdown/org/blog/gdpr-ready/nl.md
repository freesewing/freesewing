---
author: 1
caption: "De belangrijkste verandering is natuurlijk dat we van paars naar zwart zijn gegaan als onze huisstijlkleur."
date: "2018-05-24"
intro: "Welkom op onze nieuwe website. Het voldoet aan GDPR, spreekt 3 talen en ruikt naar natte verf"
title: "Welkom op onze nieuwe website. Het voldoet aan GDPR, spreekt 3 talen en ruikt naar natte verf"
---


Morgen, 25 mei, wordt de General Data Protection Regulation (GDPR) van de Europese Unie (EU) van kracht. Vanaf die dag stellen bedrijven die de privacy van EU-burgers niet respecteren zich bloot aan boetes die kunnen oplopen tot 4% van hun wereldwijde jaaromzet.

De datum markeert niets minder dan een keerpunt voor online privacy, als 's werelds strengste wetten voor gegevensbescherming plotseling van toepassing zijn op een half miljard mensen.

## Je toestemming is nu vereist

Voor freesewing vormt de uitrol van GDPR op zich geen probleem. We hadden niet alleen een solide plan, het enige dat we absoluut aan de site moesten toevoegen was *consent*. We mogen je gegevens niet meer verwerken zonder jouw toestemming. Toestemming waar we expliciet en granulair om moeten vragen.

We willen je dus twee soorten vragen stellen:

 - Geeft je de toestemming om je profielgegevens te verwerken?
 - Geeft je de toestemming voor je modelgegevens te verwerken?

We maken het onderscheid omdat het verschillende dingen zijn. Een profiel/account is nodig om in te loggen op de site, opmerkingen te plaatsen enzovoort.  
Modelgegevens zijn nodig om op maat gemaakte naaipatronen te genereren.

Je wordt door deze vragen begroet wanneer ze relevant zijn (als in, wanneer we toegang tot die specifieke gegevens nodig hebben), en je kunt ze op elk moment opnieuw bekijken [in je accountinstellingen](/account).

## Het is onze plicht om je te informeren

Onder GDPR moeten we je informeren over hoe we omgaan met privacykwesties. We hebben al eerder geschreven over [onze benadering van privacy](/blog/privacy-choices) , maar dit vereist iets (iets) formelers.

Daarom hebben we een [privacyverklaring](/privacy) opgesteld die al deze dingen beschrijft.

In aanvulling op onze privacyverklaring hebben we [een pagina ingericht met een overzicht van al je rechten](/rights), en uitleg over hoe je deze kunt uitoefenen.

Met deze veranderingen hebben we je recht op informatie afgedekt.

## Privacy door ontwerp

Een van de meer vage maar impactvolle vereisten van GDPR is de zogenaamde *privacy-by-design*. We hebben het advies ter harte genomen en hebben op basis hiervan twee veranderingen doorgevoerd:

 - Encryptie van gegevens in rust
 - Beëindiging van slapende rekeningen

We versleutelen nu je profielgegevens in rust. Met andere woorden, onze database bevat jouw informatie, maar deze is versleuteld. We ontsleutelen het alleen als we het nodig hebben.

We beëindigen ook accounts die al 12 maanden inactief zijn. Met andere woorden, als je 1 jaar lang niet inlogt op de website, worden je account en al je gegevens verwijderd.

Voor dat laatste is er echter een beetje uitstel, omdat we nog niet alle vereiste wijzigingen volledig hebben doorgevoerd. Dat brengt me bij mijn volgende punt:

## Ook nieuw: al het andere

Deze GDPR-gerelateerde veranderingen leken ons een goede gelegenheid om een aantal keuzes die we hebben gemaakt opnieuw te bekijken en te zien of er ruimte was voor verbetering. Dat was in ieder geval het oorspronkelijke idee. Uiteindelijk hebben we de website helemaal opnieuw geschreven.

Onze vorige website gebruikte [Jekyll](https://jekyllrb.com/) als statische site generator, met een berg javascript code om de dynamische elementen aan de site toe te voegen. Dat werkte wel, maar er waren twee belangrijke nadelen:

 - Jekyll gebruikt de programmeertaal Ruby. Dat is een andere programmeertaal, een andere pakketbeheerder en een ander ecosysteem waar potentiële bijdragers zich in moeten verdiepen. Dat wilden we vermijden.
 - Die *stapel* van JavaScript-code was nogal letterlijk. De onderhoudbaarheid begon een probleem te worden, om nog maar te zwijgen over het feit dat het moeilijk zou zijn voor nieuwe ontwikkelaars om in te springen en te begrijpen wat er aan de hand is.

Dus om twee vliegen in één klap te slaan, hebben we de hele site herschreven met [Vue.js](https://vuejs.org/) en [Nuxt](https://nuxtjs.org/). Onze hele voorkant is nu geschreven in JavaScript - Ruby is niet meer nodig - en dankzij Vue's modulaire aard en componentgebaseerde aanpak, zou het een stuk eenvoudiger te onderhouden moeten zijn.

## Internationalisatie, ook bekend als i18n

Uiteraard hebben we tijdens het herschrijven een aantal nieuwe functies toegevoegd. De meest voor de hand liggende is dat we i18n (internationalisatie) nu volledig ondersteunen.

Hoewel vertalen een doorlopende inspanning is, hebben we alles op zijn plaats om het te ondersteunen. Vanaf vandaag is freesewing niet langer alleen beschikbaar in het Engels, maar ook in het Nederlands en Spaans.

Ik wil graag [@AnnekeCaramin](/users/annekecaramin) en [@AlfaLyr](/users/alfalyr)bedanken, onze taalcoördinatoren voor respectievelijk Nederlands en Spaans, maar ook alle andere mensen die hebben geholpen met vertalen.

Een overzicht van de status van de verschillende talen is beschikbaar [hier](/i18n), en ik heb goede hoop dat we binnenkort meer talen kunnen inschakelen.

## Pas op voor de natte verf

Deze uitgave is misschien wat voorbarig. We hebben nog steeds [een paar openstaande problemen op te lossen](https://github.com/freesewing/site/issues), en we missen een heleboel documentatie.

Maar omdat onze deadline van buitenaf wordt opgelegd, hebben we hier niet echt veel keuze in. Tenminste, als we volledig willen voldoen aan de GDPR, en dat willen we.

Heb dus geduld met ons terwijl we verder bouwen aan deze website en ons platform. En aarzel niet om het ons te laten weten als er iets misgaat.

