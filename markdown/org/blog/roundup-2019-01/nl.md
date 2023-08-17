---
author: "joostdecock"
caption: "Je inlogachtergrond voor februari"
date: "2019-01-31"
intro: "Is het echt eind januari? Nu al?"
title: "Maandoverzicht - januari 2019: de grote bèta-update"
---


Is het echt eind januari? Nu al?

Na de kerstvakantie gebruikt te hebben om [Simon](/en/patterns/simon) over te zetten - niet bepaald het meest triviale patroon - ben ik er vrij zeker van dat alle patronen goed zullen doen. Simon heeft 61 opties, dus als het voor Simon werkt, werkt het voor alle patronen, althans zo zie ik het.

Er zijn nu zeven patronen overgezet. Dat lijkt misschien niet veel, maar het wordt wel vervelend elke keer als we een verandering aanbrengen die de patronen raakt, omdat we er dan 7 moeten bijwerken. Ik heb dus besloten om het overzetten van patronen even in de ijskast te zetten en in plaats daarvan mijn aandacht te richten op [onze nieuwe bètawebsite](/en/).

## Gatsby is nu onze statische site generator

De nieuwe website is gebouwd bovenop [Gatsby](https://www.gatsbyjs.org/), een statische site-generator geschreven in JavaScript en aangedreven door [React](https://reactjs.org/). We zijn behoorlijk toegewijd aan [de JAMstack architectuur](/en/blog/freesewing-goes-jamstack) hier bij freesewing.org.

Het is onze derde herschrijving van de site sinds we freesewing.org hebben gelanceerd en ik geef toe dat dat een beetje veel is. Ik hoop echt dat de site die we nu aan het bouwen zijn nog een tijdje blijft bestaan.

Aan de andere kant zijn snelle iteraties een goede zaak, vooral omdat we onze draai nog moesten vinden. We doen wat nodig is om het goed te doen, en terwijl de vraag van *wat is het doel van dit alles* misschien bij sommigen van jullie opkomt, heb ik het gevoel dat beta.freesewing.org op het punt is gekomen waar het die vraag beantwoordt.

## (Bijna) alles gebeurt nu in je browser

We hebben ons platform herschreven in JavaScript. Dat ding dat in je browser draait. Als je voorheen de stijl van je manchetten of iets dergelijks wilde veranderen, moesten we gebruiken om je wensen naar een backend te sturen, die dan een ontwerp genereerde en het terugstuurde.

Als je nu een optie aanpast, hoeven we niet naar een backend te gaan om je te laten zien hoe de dingen eruit zien. Omdat alles in je browser draait. Dus als je iets verandert, , dan wordt het gewoon bijgewerkt op je scherm.

Dat hadden we al die tijd al in gedachten, maar het blijft een krachtig moment wanneer alle stukjes eindelijk op hun plaats vallen en de dingen echt werken.

Dat gezegd hebbende, draait nog niet alles in de browser. Specifiek het omzetten van je patronen in PDF's is iets dat we in de backend afhandelen omdat we nog steeds aan dat deel werken.

## Geen account nodig

Met onze [nieuwe demo](https://beta.freesewing.org/en/demo) kun je de banden aanhalen zonder de noodzaak om je aan te melden. Bij het aanmelden hoef je geen account met wachtwoord aan te maken, want ondersteunt nu het aanmelden met je bestaande Google of GitHub account.

Mensen die al een account hebben, kunnen inloggen met hun Google of GitHub account, op voorwaarde dat het e-mailadres van hun freesewing account overeenkomt.

## Je kunt alles veranderen

We hebben veel veranderingen doorgevoerd om het voor ontwikkelaars makkelijker te maken om aan de slag te gaan met freesewing. Maar we hebben ook veranderingen doorgevoerd voor mensen die op andere manieren bijdragen.

Al onze (markdown) inhoud kan nu op de site worden bewerkt. Geen GitHub account nodig, klik gewoon op het kleine potlood-icoontje naast de titel, stuur je wijzigingen in en we zijn klaar.

Hetzelfde goede nieuws voor vertalers. Alle vertalingen kunnen ook online worden bewerkt. We hebben ook onze documentatie voor vertalers en bewerkers bijgewerkt om deze nieuwe vereenvoudigde workflow weer te geven.

## Aangepaste lay-outs

Het inloggen/aanmelden met GitHub/Google accounts was een functie waar gebruikers om hadden gevraagd, en dat is deze ook: We ondersteunen nu het maken van een aangepaste lay-out voor je patroon. Zo werkt het:

Wanneer een patroon wordt ontworpen, worden de verschillende patroondelen automatisch op het patroon gelegd. Vaak is dat geweldig, maar soms zou je willen dat je iets kon veranderen. Het kan bijvoorbeeld zijn dat je je patroon wilt laten afdrukken in een copyshop, dus je wilt er zeker van zijn dat het op de breedte van hun rol papier past. Of je wilt wat papier besparen door sommige delen samen te drukken.

Het is nog in vroege bèta (dus nog steeds af en toe stuk), maar je kunt nu de breedte van je patroon veranderen, je patroondelen verplaatsen, roteren of zelfs verticaal of horizontaal spiegelen om het aan te passen aan je plannen. Dat kan allemaal in je browser, op de site.

## Documentatie voor ontwikkelaars

We hebben ook onze documentatie voor ontwikkelaars op de nieuwe site gezet. Tot gisteren werd de documentatie over het nieuwe platform gehost op een aparte site, , maar nu hebben we de documentatie overgezet en is alles geïntegreerd in onze (toekomstige) website.

## We migreren je concepten niet

Tijd om het te hebben over de dingen die we niet zullen doen: We zullen je bestaande concepten niet migreren. Het nieuwe platform is gewoon te anders. Er is geen manier voor ons om je bestaande concepten te migreren op een manier die zinvol is. Dus als de dag komt dat we overschakelen naar de nieuwe site, zullen je concepten er niet meer zijn.

Je kunt al je gegevens downloaden van onze site, maar als je dat niet zelf doet, is je v1 drafts kwijt.

## Geen opmerkingen meer

Ik heb besloten om geen commentaarfunctie te implementeren omdat ik het gevoel heb dat de verkeerde verwachtingen wekt.

Freesewing is niet weer een [Pattern Review](https://sewing.patternreview.com/), of [Thread and Needles](https://www.threadandneedles.org/), of [The Fold Line](https://thefoldline.com/), of [Textillia](https://www.textillia.com/), of [Kollabora](http://www.kollabora.com/), of wat de *Raverly of sewing* du jour ook is.

Ik wil niet dat freesewing.org gaat concurreren met deze websites. Zij doen hun ding, wij het onze. Hun waardepropositie is de gemeenschap, de onze niet. Dat betekent niet dat onze gemeenschap niet waardevol is. Het betekent alleen dat we onze gemeenschap niet nodig hebben om zich op onze website te verzamelen. Onze gemeenschap bestaat overal waar gaat. Of het nu Twitter, Instagram, Reddit, blogs of een ander sociaal netwerk is waar ik nog nooit van heb gehoord. Het maakt niet uit, het is allemaal goed.

Het opbouwen van een gemeenschap op de website kost tijd, moeite en werk. En daar hebben we simpelweg de bandbreedte niet voor. Dus ik heb liever dat we ons richten op [onze kerntaak](/en/docs/faq/#whats-your-end-game)en dat we mensen over freesewing laten praten, waar ze ook over dingen praten.

## Iemand Parijs?

Ik heb gezegd dat ik dit jaar een soort meetup wil organiseren, en hoewel ik nog niet echt de tijd heb gehad om uit te werken wat dat zou inhouden, komen we elkaar misschien toch wel tegen.

Om precies te zijn, [Charlotte](https://englishgirlathome.com/) (aka English girl at home) en [Carmen](https://www.carmencitab.com/) (aka CarmencitaB) organiseren de [Paris Sewcial](https://englishgirlathome.com/2019/01/23/paris-sewcial-paris-coud-2019-registration-open/) meetup in mei. Ik ga naar Parijs om daar deel van uit te maken, dus als jullie ook gaan, zien we elkaar daar.

De registratie is [op deze manier](https://www.eventbrite.co.uk/e/paris-sewcial-paris-coud-registration-54520802187). 


