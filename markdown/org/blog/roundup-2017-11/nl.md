---
author: "joostdecock"
caption: "Je nieuwe inlogachtergrond voor de maand december"
date: "2017-11-30"
intro: "Dit is je maandelijkse samenvatting van het freeswing-nieuws van de afgelopen vier weken en een blik op wat er de komende maand in het verschiet ligt."
title: "Maandelijkse samenvatting - november 2017: Benjamin, on-boarding, showcases en onze on-demand tegelzetter"
---


Dit is je maandelijkse samenvatting van het freeswing-nieuws van de afgelopen vier weken en een blik op wat er de komende maand in het verschiet ligt.

## Terugblik op november
Het is hier druk geweest in november. Terwijl veel van het werk achter de schermen is gebeurd -- meer daarover in december -- is er ook een lijst met dingen die al zijn uitgerold.

Dit zijn de belangrijkste veranderingen:

### Ontmoet Benjamin
![Wouter pronkt met Benjamin](https://posts.freesewing.org/uploads/benjamin_fc9844f4bd.jpg) Als eerste: een nieuw patroon. De Benjamin Strik is [nu beschikbaar](/patterns/benjamin) in bèta.

![Meer vlinderdassen uit Wouter's persoonlijke voorraad](https://posts.freesewing.org/uploads/bowties_4f3e05ec53.jpg)

Benjamin is een vlinderdas, en zoals ik heb uitgelegd in [de blogpost over de aankondiging](/en/blog/benjamin-bow-tie-beta/) is deze uitgave nogal wat.

Dat komt omdat het het allereerste patroon is dat door de community is bijgedragen. Meer specifiek was het [Wouter](/users/xdpug) die het patroon ontwierp en programmeerde.

Dus shout-out naar hem omdat hij als eerste een patroon heeft bijgedragen. En als je [rondhangt in de freeswing chatroom](https://discord.freesewing.org/), dan weet je dat hij al aan zijn volgende patroon werkt.


### Betere ingebruikname van gebruikers

Ik heb de aanmeldingsflow een beetje veranderd om mensen te helpen alle opties te ontdekken die ze in hun account kunnen instellen.

![De welkomstpagina leidt je door de instellingen van je account](https://posts.freesewing.org/uploads/welcome_e02a39ca3b.png)

De verandering is tweeledig. Ten eerste ben je nu automatisch ingelogd op als je op de bevestigingslink voor je account klikt.

Vervolgens sturen we je naar de welkomstpagina en begeleiden we je door een paar stappen om je account in te stellen. Specifiek:

 - Configureer je eenheden
 - Configureer je gebruikersnaam
 - Je profielfoto configureren
 - Configureer je sociale media-accounts

(Meer over dat laatste later in dit bericht)

Al deze instellingen zijn beschikbaar in [je account](/account), maar mensen realiseren zich dat vaak niet. Met de nieuwe aanmeldingsflow zou dat niet langer het geval moeten zijn.

> ##### Hé, zo'n handige welkomstpagina heb ik nooit gekregen
> 
> Je kunt op elk moment naar [de welkomstpagina](/welcome) gaan om je accountinstellingen te controleren of bij te werken.

### Waarschuwing voor gemengde eenheden

Een van de kwesties die de veranderingen in het on-boarding van nieuwe gebruikers aanstuurde, was de kwestie van gemengde eenheden.

Gemengde eenheden is wanneer je account is geconfigureerd in metrisch, maar je model is ingesteld op op imperiaal (of omgekeerd).

![Een voorbeeldwaarschuwing als eenheden worden gemengd tussen je account en je model](https://posts.freesewing.org/uploads/units_mismatch_warning_058d7de9b4.png)

Dit wordt ondersteund. Als je dingen maakt voor andere mensen in andere delen van de wereld, is deze flexibiliteit handig.

Maar het is een tamelijk niche-scenario en meestal komt het doordat de gebruiker zich niet realiseert dat zijn eenheden zijn ingesteld zoals ze zijn ingesteld.

Dus nu, als je een patroon maakt met gemengde eenheden, laten we je een waarschuwingsvenster zien om er zeker van te zijn dat je wel degelijk van plan bent om gemengde eenheden te gebruiken.

### Standaard naadtoeslag per patroon
Het uitrollen van Benjamin bracht nog een ander probleem met zich mee: de standaard naadtoeslag.

Voor een vlinderdas is de huidige standaard naadtoeslag (1 cm voor metrisch, 5/8" voor imperiaal) te groot. Wouter wilde dus een manier om de standaard naadtoeslag te veranderen.

![Ook hier hebben we een kleine melding toegevoegd om ervoor te zorgen dat je op de hoogte bent](https://posts.freesewing.org/uploads/non_standard_sa_warning_e5046e98a7.png)

Dus dat hebben we geïmplementeerd. In de toekomst kunnen patronen de standaard naadtoeslag instellen op (voor zowel metrisch als imperiaal). Als ze dat niet doen, gaan we terug naar 1cm|5/8" zoals voorheen.

Merk op dat dit alleen de standaard naadtoeslag is. Als je een patroon ontwerpt, kun je nog steeds de naadtoeslag instellen op wat je maar wilt.

### Sociale media-accounts

Als je op de link naar de welkomstpagina hebt geklikt, of als je de instellingen in [je profiel](/profile) bekijkt, zie je dat je nu je gebruikersnaam voor een paar andere sites kunt invoeren:

 - Twitter
 - Instagram
 - GitHub

Maak je geen zorgen, [je privacy is hier in goede handen](/blog/privacy-choices/). Ik ben niet geïnteresseerd in het verzamelen van je gegevens, en de enige reden dat dit hier staat is omdat mensen [erom vroegen](https://github.com/freesewing/site/issues/184).

Nadat Quentin zijn Instagram en GitHub accounts aan zijn instellingen heeft toegevoegd, hebben zijn reacties nu links naar die accounts])comments-social.png)

Links naar je sociale media accounts verschijnen op je profielpagina en bij je reacties.

### Meer vitrines

We hebben deze maand een aantal nieuwe [showcases](/showcase) toegevoegd. Elke maker die hier op de site een of meer vitrines heeft, heeft zijn eigen pagina waarop al zijn vitrines staan.

![Een voorbeeld van links op een makerpagina. In dit geval, Anneke](https://posts.freesewing.org/uploads/maker_links_8504a1b00d.png)

Deze maand hebben we die pagina's bijgewerkt met links naar de blog en/of social media accounts van deze makers. Het idee is dat mensen die vinden dat je een cool ding hebt gemaakt, wat meer over je te weten kunnen komen.

### Verwijzingsbeleid, of waarom je nooit bezoekers krijgt van freesewing.org

We hebben het strengste doorverwijzingsbeleid ingevoerd: `geen doorverwijzers`. Het blokkeert alle verwijzerinformatie.

Dit betekent dat als je Google analytics -- of een andere website statistieken tool -- draait op je blog of website, je geen verkeer van freesewing.org zult zien.

![Ons verwijzingsbeleid: Geen](https://posts.freesewing.org/uploads/no_13049a23c3.gif)

Dat betekent niet dat mensen niet op links naar je blog klikken, maar we blokkeren simpelweg om de referrer header in te stellen, zodat Google geen idee heeft waar mensen vandaan komen.

Waarom vraag je dat? Want privacy.

### Tegelzetter op aanvraag
Als je hier een patroon ontwerpt, kun je het downloaden in een aantal formaten, allemaal netjes getegeld zodat je ze kunt afdrukken.

Je kunt ook de SVG broncode downloaden om de patronen verder aan te passen. Maar als je die wijzigingen hebt aangebracht, is er geen gemakkelijke manier om het als een afdrukbare PDF te krijgen.

![De tegelzetter op aanvraag doet wat je zou verwachten](tiler.svg)

Nu wel. We hebben [een on-demand tegelzetter](/tools/tiler) aan de site toegevoegd die precies dat doet. Upload je SVG, kies het formaat van je keuze en wij betegelen het voor je.

## Vooruitkijken naar december

Ik had gehoopt mijn patroon voor winterjassen in november uit te brengen, maar dat is helaas niet gelukt. Ik ben het eigenlijk nog aan het maken, en als het klaar is zullen er een paar aanpassingen nodig zijn aan het patroon voordat ik het kan uitbrengen.

Maar dat nieuws moet ondergeschikt worden gemaakt aan onze samenvatting van het jaar (hier traditioneel op 10 december). Het gaat niet alleen om wat er de afgelopen 12 maanden is gebeurd, we zullen ook een aantal veranderingen doorvoeren om de toekomst van dit project veilig te stellen.

Nog 10 slaapjes :)


