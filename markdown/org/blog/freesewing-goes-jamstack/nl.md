---
author: 1
caption: "Foto door <a href='https://stock.tookapic.com/jenniferforjoy' target='_BLANK' rel='nofollow'>Jennifer</a>"
date: "2017-06-12"
intro: "Toen we eind maart freesewing core uitbrachten, verschoof mijn focus onmiddellijk naar het bouwen van onze front-end, zodat freesewing.org makemypattern.com volledig kon vervangen."
title: "Wij zijn JAMstack, wij zijn JAMstack, wij zijn JAMstack, wij zijn JAMstack, wij zijn JAMstack, wij zijn JAMstack, wij zijn JAMstack, en ik hoop dat jij JAMstack ook leuk vindt"
---

Toen we eind maart freesewing core uitbrachten, verschoof mijn focus onmiddellijk naar het bouwen van onze front-end, zodat [freesewing.org](/) [makemypattern.com](https://makemypattern.com/)volledig kon vervangen.

Ik geloof dat de waarde van freesewing ligt in het kernplatform en onze patronen. Maar zonder een gebruiksvriendelijke manier om die waarde bloot te leggen, zal die grotendeels genegeerd worden.

Dus hadden we een website nodig waarop mensen patronen kunnen genereren. Makemypattern.com &mdash; misschien wel de beste vergelijking van iets vergelijkbaars &mdash; draait op Drupal 7, en mijn oorspronkelijke idee was om de nieuwe site op Drupal 8 te draaien. Ik heb dat pad ver genoeg bewandeld om er zeker van te zijn dat ik het aan de praat kon krijgen en kon aansluiten op onze backend. Op dat moment schakelde ik over en richtte mijn aandacht op wat nu bekend staat als freesewing core.

Het duurde ongeveer 7 maanden om Core te bouwen en sindsdien is er veel veranderd. Of misschien ben ik veranderd, ik heb in ieder geval veel geleerd onderweg. Hoe dan ook, ik heb besloten om het anders aan te pakken.

## Het probleem met een CMS

Ik heb niets tegen Drupal, maar het idee om de gratis website te beheren via een Content Management Systeem (CMS) spreekt me niet aan.

Een van de belangrijkste redenen is dat er zoveel informatie is opgeslagen onder een ondoorzichtige databaselaag, waardoor het moeilijk te beheren is. Dat geldt ook voor inhoud, waar berichten, metadata, afbeeldingen enzovoort allemaal verspreid zijn over tabellen, locaties en mappen. Maar er is ook het thema dat een heleboel dingen bevat, er zijn de aangepaste Drupal-modules om verbinding te maken met de backend, enzovoort, enzovoort.

> Ik wilde diezelfde benadering in een website. Maar het kan niet statisch zijn, want het moet dingen doen.

Toen we core aan het afronden waren, heb ik er een documentatiesite voor gebouwd op basis van [Jekyll](https://jekyllrb.com/). In vergelijking daarmee voelde het als een verademing. Gewoon een hoop markdown-bestanden, met wat SASS, afbeeldingen en wat JavaScript erbij, en het wordt allemaal gecompileerd tot een keurige statische website.

Het is eenvoudig te beheren en het integreert mooi met een GitHub-gerichte werkstroom die bekend zal zijn bij potentiële bijdragers.

Ik wilde diezelfde benadering in een website. Maar het kan niet statisch zijn, want het moet dingen doen.


## Een alternatieve benadering: JAMstack

Ik leerde JAMstack voor het eerst kennen toen ik op zoek ging naar hosting voor mijn core documentatiesite. Het werd in eerste instantie gehost op GitHub pagina's die gratis hosting bieden. Ze hebben ook SSL of een aangepaste domeinnaam, maar je kunt ze niet allebei hebben. Dat was een soort dealbreker.

Op zoek naar alternatieven stuitte ik op [Netlify](https://www.netlify.com/), die zowel SSL als aangepaste domeinen doen en een free-tier hebben voor open source projecten (bedankt jongens). Verder heeft [deze video van Netlify CEO Mathias Biilmann](https://vimeo.com/163522126) me erg enthousiast gemaakt over JAMstack.

Tenzij je bekend bent met JAMstack, raad ik je aan de video te bekijken, maar het komt hier op neer:

 - **J** = JavaScript
 - **A** = API's
 - **M** = Opmaak

Het idee is dat je een statische site bouwt (markup) die je vervolgens interactief maakt met JavaScript dat inhaakt op een of meer API's.

Dus in ons geval, in plaats van een eenvoudige documentatiesite te hebben met eenvoudig te bewerken markdown en een complex CMS om de ingewikkelde dingen af te handelen, laten we gewoon een eenvoudige site bouwen die statisch wordt gegenereerd, maar JavaScript en API's gebruikt om de slimme dingen te doen.

## Rennen voordat je kunt lopen

Ik moet toegeven dat ik in mijn enthousiasme om deze nieuwe aanpak te omarmen een beetje op de zaken vooruit ben gelopen. Plotseling was ik niet langer bezig met het bouwen van een eenvoudige site, maar zat ik tot over mijn oren in isomorfe rendering, client-side routing, React en Redux, Node.js en ES6 transpiling.

> Als je niet weet wat dat allemaal betekent, krijg je misschien een idee van de frustratie die ik voelde toen ik al deze nieuwe beesten probeerde te temmen.
> 
> Als je weet wat het allemaal betekent, waar was je dan in april toen ik door de vallei van de doodsreactie liep?

Het punt is, ik ben geen ontwikkelaar en ik zat er tot over mijn oren in. Hoewel ik elke dag nieuwe dingen leerde, boekte ik niet veel vooruitgang met de eigenlijke taak en voelde ik me gefrustreerd over mijn onvermogen om zelfs de meest alledaagse dingen te doen.

Na een maand van frustratie, veel proberen en schijnbaar nog meer fouten, gooide ik de handdoek in de ring. Eff dit nieuwerwetse glimmende JavaScript dat alle jonge kinderen gebruiken, ik blijf bij wat ik ken.

Dat is in wezen de basis van jQuery. Met andere woorden, dingen die 10 jaar geleden best cool waren.

## 10 jaar oude jam is nog steeds jam toch?

Hier zijn we dan, freesewing.org is een site aangedreven door de JAMstack. En weet je wat, het lijkt te doen wat het moet doen.

We laten Jekyll een statische site bouwen en als we pushen naar onze master branch, wordt deze automatisch ingezet op Netlify.

> Eff dat nieuwerwetse glimmende JavaScript dat alle jonge kinderen gebruiken

We hebben [een gloednieuwe data-API](https://github.com/freesewing/data) gebouwd op [het Slim framework](https://www.slimframework.com/). Het verwerkt alle gebruikersgegevens. Dingen zoals rekeningen, metingen, modellen en ontwerpen, maar ook opmerkingen op deze website enzovoort.

Het praat ook met de kern voor ons en elke keer dat je een patroon ontwerpt, geven we je niet alleen het patroon, maar vergelijken we je patroon ook met een reeks standaardmaten, wat best cool is.

En we hebben nog andere coole dingen, zoals de mogelijkheid om een bestaand ontwerp te forken of opnieuw op te stellen.

## Dit is een startpunt

Ik hoop dat de gebruikerservaring/interface geen wegversperring wordt voor mensen. Ik heb veel moeite gedaan om het tekenproces zo intuïtief mogelijk te maken en ik denk dat het in vergelijking met onze demo (of de makemypattern interface) een enorme verbetering is.

Maar ja, ik weet zeker dat er links of rechts dingen zullen breken, of dat sommigen van jullie de kleuren niet mooi vinden of wat al niet meer.

Het punt is dat ik iets wilde bouwen dat makemypattern.com kon vervangen, zodat ik jullie allemaal kon vertellen _Hé, kom eens langs en speel met dit nieuwe ding_.

Ik denk dat ik dat nu wel kan doen. En als je ziet dat er ruimte is voor verbetering, [doe dan mee](/contribute), we zijn nog maar net begonnen.



<small>PS: Voor degenen die zich afvragen wat de titel van dit bericht is:</small>

<YouTube id='oFRbZJXjWIA' />


