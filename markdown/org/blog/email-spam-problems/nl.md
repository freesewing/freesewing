---
author: 1
caption: "Zou je een rijstrook afsluiten omdat een bestuurder zijn muziek te hard afspeelt?"
date: "2017-09-07"
intro: "Bedankt voor niets Microsoft; E-mail moet niet zo moeilijk zijn"
title: "Bedankt voor niets Microsoft; E-mail moet niet zo moeilijk zijn"
---

Mensen met een e-mailadres van Microsoft --- denk aan Hotmail, MSN, live.com, outlook.com en hun talloze varianten --- zullen zich beduidend minder snel aanmelden voor deze website.

Dat komt omdat ze meer dan 4 van de 10 keer nooit de e-mail voor het activeren van hun account ontvangen.

## Wat is er aan de hand?

Laten we eerst eens kijken naar wat er gebeurt. Hier is een relevant fragment uit de logboeken:

````
Mislukt: postmaster@mg.freesewing.org -> ********@hotmail.co.uk 'Bevestig je freesewing account' 
Server response: 550 5.7.1 Helaas zijn de berichten van [104.130.122.15] niet verzonden. 
Neem contact op met je internetprovider omdat een deel van hun netwerk op onze blokkadelijst staat. 
````

Dit betekent dat een deel van het MailGun netwerk op hun blokkadelijst staat. Het resultaat is dat zij (later meer over wie dat zijn) geen berichten naar buiten brengen.

[MailGun](https://www.mailgun.com/) is een populaire e-mailservice voor ontwikkelaars. Het wordt door deze site gebruikt om e-mails te versturen, zoals de activeringsmails voor accounts.

Andere mensen gebruiken deze service ook, en misschien hebben sommigen van hen op een bepaald moment wat spamberichten afgeleverd via mailgun. Of het was gewoon iemand met een achternaam die spamfilters activeert.

![Enkele andere MailGun klanten. Niet bepaald een onbetrouwbare service, toch?](https://posts.freesewing.org/uploads/mailgun_19f315d4d6.png)

Het punt is dat dit IP-adres of een van zijn buren *een slechte reputatie heeft gegeven*. Het gebeurt. Maar het botweg weigeren om berichten van deze host (of een heel netwerk van hosts) te accepteren is hetzelfde als het afsluiten van een snelwegstrook (of een hele snelweg) omdat één auto op die strook die ene keer onaangenaam hard zijn muziek afspeelde.

Dat brengt me bij onze volgende vraag:

## Wie zou zoiets doen?

Goede vraag. Hier zijn wat cijfers:

![Een grafiek van de postbezorging sinds de lancering van deze site](https://posts.freesewing.org/uploads/emailgraph_d14d476efa.png)

De grafiek hierboven geeft e-mails weer die zijn verzonden sinds de lancering van deze site. Het kleine deel van de grafiek dat rood is, zijn e-mails die worden verwijderd.

Deze website verstuurt verschillende soorten e-mail:

 - De bevestigingsmail van de account
 - De *Ik ben mijn wachtwoord vergeten* e-mails
 - Reacties op berichten

De grafiek geeft alle e-mails weer, maar ik richt me alleen op de bevestigingsmails voor accounts. Zij zijn tenslotte het belangrijkst.

> Afgezien van 1 uitschieter, werd elk bericht dat werd geblokkeerd, geblokkeerd door Microsoft

Hier is een lijst van alle domeinen die legitieme activeringsmails naar hun gebruikers hebben geblokkeerd:

 - btinternet.com
 - hotmail.com
 - hotmail.nl
 - live.nl
 - live.com
 - live.com.au
 - live.nl
 - msn.com
 - outlook.com

Afgezien van de allereerste vermelding in de lijst (waarop slechts 1 bericht werd geblokkeerd) zijn dit allemaal Microsoft-domeinen.

Laat ik dat nog eens herhalen: Afgezien van die ene uitschieter, werd elk bericht dat werd geblokkeerd, geblokkeerd door Microsoft.

## Wat is de impact?

Wat voor invloed heeft dat op mensen?

Nou, op het moment dat ik dit schrijf, zijn er 817 geregistreerde gebruikers en ongeveer 80% (661) heeft ook zijn account geactiveerd.

![Een onevenredig groot aantal hangende activeringen is afkomstig van gebruikers met een e-mailadres dat wordt beheerd door Microsoft](https://posts.freesewing.org/uploads/activations_06987b6065.svg)

Van de mensen die hun account konden activeren, heeft minder dan 1% (6) een e-mailadres dat door Microsoft wordt beheerd. In de groep mensen die hun account niet hebben geactiveerd of niet hebben kunnen activeren, heeft meer dan de helft zo'n adres.

Meer dan 40% van de accountbevestigingsmails worden simpelweg geblokkeerd door Microsoft en, gebaseerd op het aantal activeringen, lijkt het waarschijnlijk dat zelfs als ze niet worden geblokkeerd bij de SMTP relay, ze ergens verderop in het proces worden gefilterd.

Zoals het er nu voor staat, lijkt het bijna onmogelijk voor de gemiddelde hotmail/outlook/live/MSN/... gebruiker om zich aan te melden voor deze site.

## Wat kunnen we eraan doen?

Ik heb om een aantal redenen voor mailgun gekozen. Het niet zelf hoeven afhandelen van SMTP vereenvoudigt de code. Het niet afhankelijk zijn van een lokale SMTP deamon maakt de code draagbaarder en MailGun heeft een heleboel coole functies waarmee je dingen kunt doen zoals reageren op reacties via e-mail.

De grove methoden van Microsoft om spam te filteren doen niets af aan deze redenen.

MailGun gebruiken betekent hun SMTP relays gebruiken en overgeleverd zijn aan de reputatie van die relays. De enige manier om dat te omzeilen is om een dedicated relay in MailGun te configureren zodat freesewing.org verkeer wordt afgeschermd van anderen en we meester worden over onze eigen reputatie.

![$59 per maand? Misschien niet](https://posts.freesewing.org/uploads/pricing_52f0e817cb.png)

Voor dat privilege rekent MailGun 59 dollar per maand, wat neerkomt op 708 dollar per jaar. Ik nodig je uit om een kijkje te nemen op [de donatiegeschiedenis](/about/pledge#donations-history), en je zult begrijpen dat dat ook niet gaat gebeuren.

Ik zou de blokkadelijst kunnen aanvechten en proberen het relais gedeblokkeerd te krijgen. Maar dat is nogal vechten tegen windmolens als ik geen controle heb over de host. Om nog maar te zwijgen over het feit dat MailGun niet alleen die ene host heeft.

Het lijkt erop dat mijn opties opraken en eerlijk gezegd heb ik ook geen geduld meer.

## Wat ik eraan ga doen

Microsoft is een kolos en ik ben maar een jongen. Ik kan hier niet tegenin gaan. Tenzij ik ze Titanfall.

![Blokkeer dit, trut](https://posts.freesewing.org/uploads/titanfall_cb5a210468.gif)

Denk je dat Gmail ooit wordt misbruikt om spam te versturen? Je weet dat het zo is. Denk je dat ze ooit alle e-mail van Gmail zouden blokkeren? Je weet dat ze dat niet zullen doen.

Gisteravond heb ik een aantal wijzigingen doorgevoerd om het probleem te omzeilen. Als je een *problemtic* e-mailadres hebt, stuurt deze site naast de gewone e-mail ook een tweede e-mail via Gmail.

Ik zou graag zien dat ze dat blokkeren.

> ##### Problemen met aanmelden? Er is hulp beschikbaar
> 
> Als je (nog steeds) problemen hebt met aanmelden, aarzel dan niet om contact op te nemen via [](/contact).

