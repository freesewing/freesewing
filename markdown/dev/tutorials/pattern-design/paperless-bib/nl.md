---
title: 270|Making your pattern paperless
---

Gebruikers kunnen papierloze patronen opvragen door `paperless` in te stellen als `true`.

Die waarde kan je uit de `part.shorthand()`-methode halen. Dit is de laatste shorthand die we nodig hebben:

```js
let {
  Point,
  points,
  Path,
  paths,
  measurements,
  options,
  macro,
  complete,
  snippets,
  Snippet,
  paperless
} = part.shorthand();
```

The idea behind *paperless patterns* is that users don't need to print your pattern in order to use it. In plaats daarvan voegen we afmetingen toe op het patroon waarmee ze het patroon rechtstreeks op de stof kunnen aanduiden, of op een drager zoals patroonpapier.

Daar bovenop maakt FreeSewing automatisch een grid voor elk patroon met metrieke of imperiale aanduidingen, afhankelijk van de eenheid die de gebruiker heeft ingesteld.

Het grid wordt automatisch toegevoegd, maar de afmetingen moet je zelf toevoegen. Gelukkig zijn er macro's die je daarmee kunnen helpen, namelijk:

 - De `hd`-macro voegt een horizontale afmeting toe
 - De `vd`-macro voegt een verticale afmeting toe
 - De `ld`-macro voegt een lineaire afmeting toe
 - De `pd`-macro voegt een padafmeting toe die een specifiek pad volgt<Fixme> Add links to macro docs </Fixme>

Zo ziet dat eruit in de code:

```js
if (paperless) {
  // Add dimensions
  macro("hd", {
    from: points.bottomLeftStart,
    to: points.bottomRightEnd,
    y: points.bottomLeft.y + 15
  });
  macro("vd", {
    from: points.bottomRightStart,
    to: points.bottom,
    x: points.bottomRight.x + 15
  });
  macro("vd", {
    from: points.bottomRightStart,
    to: points.right,
    x: points.bottomRight.x + 30
  });
  macro("vd", {
    from: points.bottomRightStart,
    to: points.tipLeftTopStart,
    x: points.bottomRight.x + 45
  });
  macro("hd", {
    from: points.left,
    to: points.right,
    y: points.left.y + 25
  });
  macro("ld", {
    from: points.tipLeftBottomEnd,
    to: points.tipLeftTopStart,
    d: 15
  });
}
```

Dat is een hele lap code, maar vooral veel herhaling. Eens kijken naar het eindresultaat:

<Example pattern="tutorial" part="bib" caption="Your paperless bib" settings={{paperless: true}} />

We hebben de `hd`-macro gebruikt om twee horizontale afmetingen toe te voegen:

 - Eentje onderaan voor de breedte van het slabbetje
 - Eentje voor de breedte van de halsopening

De `hd`-macro gebruikt een punt voor `from` en `to` en een `y`-waarde die aangeeft op welke Y-waarde de afmeting getekend moet worden.

We hebben drie `vd`-macro's toegevoegd voor de verticale afmetingen aan de rechterkant.

Die gebruiken ook een punt voor `from` en `to`, maar hebben een `x`-parameter nodig om aan te geven op welke X-waarde de afmeting getekend moet worden.

Als laatste hebben we een `ld`-macro toegevoegd voor de lineaire afmeting bovenaan die de breedte van het bandje aangeeft. De meeste afmetingen zijn horizontaal of verticaal, maar soms heb je een rechte lijn nodig van de punten `from` naar `to` zoals in dit geval.

De `ld`-macro gebruikt een `d`-argument (kort voor 'delta') dat aangeeft op welke afstand de afmeting verwijderd moet staan van de lijn van `from` naar `to`, als er al afstand tussen moet zitten.

Je patroon papierloos maken is de kers op de taart. Tijd om af te ronden, te overlopen wat we geleerd hebben, en je wat aanwijzingen mee te geven voor de volgende stappen.

