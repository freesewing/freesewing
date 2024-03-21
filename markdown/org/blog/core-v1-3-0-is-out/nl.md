---
author: 1
caption: "Weegschalen, hoe werken die?"
date: "2018-01-04"
intro: "Freesewing core v1.3.0 is uit; komt met fixes die zo goed zijn dat we ze hebben geback-port naar al je drafts"
title: "Freesewing core v1.3.0 is uit; komt met fixes die zo goed zijn dat we ze hebben geback-port naar al je drafts"
---

Op de laatste dag van 2017 schreven we in onze [maandelijkse roundup van al het freeswing-nieuws](/blog/roundup-2017-12/) over het dreigende probleem met onjuist geschaalde concepten, aka [Core issue #204 - The Inkscape default units quandary](https://github.com/freesewing/core/issues/204).

Ik zal het niet meer hebben over [al dat](/blog/roundup-2017-12/) , maar het komt erop neer dat de [Inkscape](http://inkscape.org/) beheerders Inkscape's interne DPI (dots per inch) hebben veranderd van 90 naar 96. Een wijziging die van kracht wordt vanaf versie 0.92.

Als deze wijziging niet is aangevinkt, worden alle vrijlooppatronen onjuist geschaald. Dat komt omdat we uitgaan van 90DPI in onze SVG-uitvoer en dienovereenkomstig schalen.

![Dat 'oh-shit' moment waarop we ons de volledige impact van de DPI-wijziging realiseerden](https://posts.freesewing.org/uploads/oh_shit_90b4969a5d.gif)

Als de overgang naar 96DPI van kracht wordt, zullen alle patronen 6,66% afwijken. Dat is echt het soort verschil dat te klein is om op te merken als je naar een patroon kijkt, maar groot genoeg om je kledingstuk compleet te verknoeien.

Het probleem is ook lastiger dan het aan de oppervlakte lijkt. Ten eerste kunnen we niet zomaar overschakelen naar 96DPI, omdat er nu twee versies zijn die onder de motorkap een andere standaard DPI gebruiken. We hebben een oplossing nodig die voor allebei werkt.

![Screenshot van een freeswing patroon dat onjuist geschaald is in de laatste Inkscape versie](https://posts.freesewing.org/uploads/inkscape_b96e2bb510.png)

Bovendien, terwijl elke fix die we implementeren van toepassing is op nieuwe concepten, alle bestaande concepten gegenereerd voor de fix nog steeds zou worden beïnvloed.

Met andere woorden, als je vorige week of een maand geleden een patroon hebt gemaakt, zou dat patroon niet correct geschaald worden in een recente versie van Inkscape.  
En omdat we Inkscape gebruiken in onze SVG-to-PDF tool-chain, zou het ook onjuist geschaald zijn als je hier zou komen en een PDF zou downloaden.

Er moest duidelijk iets gebeuren. En snel.

## De oplossing voor nieuwe concepten

Vanaf de release van core v1.3.0 van vandaag zijn onze SVG-bestanden niet langer afhankelijk van een DPI-instelling.

In plaats van de interne eenheden te gebruiken en een SVG-transformatie toe te passen om het hele patroon te schalen, hebben we de eenheden vastgezet op mm en de SVG viewBox bijgewerkt om de schaling toe te passen.

Het is duidelijk dat we het vanaf het begin zo hadden moeten doen. Elke dag is een schooldag.

Als je je zorgen maakt over het gebruik van mm in je ontwerp (omdat je imperiale eenheden gewend bent), wees dan gerust dat die mm onder de motorkap blijven. Je zult het verschil niet kunnen zien.

## De oplossing voor al bestaande concepten

Om problemen met reeds bestaande concepten te voorkomen, moesten we ook daarvoor een oplossing bedenken.

We hebben in wezen twee opties:

 - Al die ontwerpen opnieuw maken
 - Patch ze op hun plaats zonder het ontwerp zelf te veranderen

Opnieuw opstellen lost het probleem op, omdat elk nieuw ontwerp wordt afgehandeld door de nieuwste kernversie die de fix bevat.

Core wordt echter ook geleverd met regelmatige updates, aanpassingen en reparaties in de patronen zelf. Dus als je een concept opnieuw opstelt dat is gegenereerd op een eerdere versie van core, is er geen garantie dat het concept niet verandert.

In principe zou die verandering altijd een verbetering zijn. Maar de bug van de een is de feature van de ander, en we hebben liever niet dat [je kaas verplaatst naar](https://en.wikipedia.org/wiki/Who_Moved_My_Cheese%3F).

![Blijf van mijn spullen af](https://posts.freesewing.org/uploads/who_moved_my_cheese_0cd51a25d6.jpg)

In plaats daarvan hebben we besloten om alle concepten die we in ons bestand hebben ter plekke te patchen met de nieuwe schaalcode, zonder enig ander aspect van het ontwerp aan te raken.

Op het moment dat je dit leest, is dit al gedaan en alle freesewing ontwerpen zouden nu correct moeten schalen. Overal.

## Ook: versiebewustzijn

We hebben ook wijzigingen aangebracht in onze backendsystemen om de versie van freesewing core op te slaan die je concept heeft gegenereerd.

Als we sinds het genereren van je concept nieuwe functies of oplossingen hebben geïntroduceerd, ontvang je een melding op dat er een update beschikbaar is:

![Als je ontwerp is gegenereerd met een oude versie van freesewing core, zullen we je daarover vertellen](https://posts.freesewing.org/uploads/upgrade_dee342e3fb.png)

Of je je ontwerp bijwerkt of niet, is aan jou. Als je de info in je *oude ontwerp* niet kwijt wilt raken, kun je het forken in plaats van het ter plekke bij te werken.








