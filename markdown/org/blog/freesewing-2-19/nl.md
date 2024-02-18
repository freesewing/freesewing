---
author: 1
caption: "Zoals geschiedenis? Dan is deze release echt iets voor jou."
date: "2021-10-17"
intro: "Ik heb zojuist de hendel overgehaald voor het uitbrengen van versie 2.19 van FreeSewing en er is een hoop in deze release gaan zitten. Voor alle details kun je de changelog bekijken, hier beperk ik me tot de hoogtepunten:"
title: "FreeSewing 2.19 brengt Bee, Lunetius, Tiberius, Walburga, een nieuwe plugin en een heleboel verbeteringen en fixes"
---

Ik heb zojuist de hendel overgehaald voor het uitbrengen van versie 2.19 van FreeSewing en er is een hoop in deze release gaan zitten. Voor de volledige details kun je [bekijken op de changelog](https://github.com/freesewing/freesewing/blob/develop/CHANGELOG.md#2190-2021-10-17), hier zal ik me beperken tot de hoogtepunten:

## Lunetius, Tiberius en Walburga

[Lunetius](/designs/lunetius), [Tiberius](/designs/tiberius/), en [Walburga](/designs/walburga/) zijn drie nieuwe patronen van **Rika Tamaike** die de nieuwste toevoeging is aan ons groeiende team van ontwerpers. Dit zijn allemaal historische patronen:

 - Lunetius is een lacerna, een historische Romeinse mantel
 - Tiberius is een historische Romeinse tuniek
 - Walburga is een tabberd/surcoat, een historisch kledingstuk uit middeleeuws Europa

Ik ben zelf niet zo'n geschiedenisfanaat, dus ik ben benieuwd hoe deze eruit zullen zien als mensen ze gaan maken. Wat ik wel met zekerheid kan zeggen is dat ze allemaal vrij eenvoudig zijn, dus het moet leuk zijn om ze te maken.

## De Bee bikini

Ook nieuw in deze uitgave is [Bee](/designs/bee/), een bikinipatroon dat je kunt combineren met het [Ursula Undies patroon](/designs/ursula/). **Bobgeorgethe3rd** tekende voor de code, het ontwerp van de bikini was een samenwerking met **PrudenceRabbit**.

Ik hoop dat er mensen op het zuidelijk halfrond zijn die deze maken, want ik vermoed dat het nog wel even kan duren voordat het weer bikini-weer is voor degenen die boven de evenaar wonen.

Ook dit is snel en eenvoudig te maken, dus ga snel kijken.

## De versievrije-svg plugin

Dit is iets meer onder de motorkap, maar we hebben ook [plugin-versinofree-svg](https://www.npmjs.com/package/@freesewing/plugin-versionfree-svg)gepubliceerd, een nieuwe plugin die de versie-informatie uit de SVG-uitvoer van FreeSewing haalt.

Dit is handig omdat het differen tussen verschillende versies mogelijk maakt. Door de versie-informatie niet op te nemen, kun je zien wat er (als er iets) is veranderd tussen verschillende versies van een patroon, iets wat we zelf ook gebruiken in onze QA pijplijn.

## Backported snap-opties van de v3 roadmap

Over onder de motorkap gesproken, het [snap voorstel](https://github.com/freesewing/freesewing/discussions/1331) op [onze v3 roadmap](https://github.com/freesewing/freesewing/discussions/1278) vonden we zo goed dat we het prompt hebben teruggezet naar v2, en het wordt al gebruikt in verschillende patronen.

Veel plezier met de nieuwe patronen, en voor feedback, vragen of suggesties, [kom met ons rondhangen op Discord](https://discord.freesewing.org).
