---
title: 210|Creating the closure
---

Het begint er goed uit te zien, maar op deze manier krijgen we het slabbetje niet over baby's hoofdje. We hebben een sluiting nodig. We gaan de bandjes aan het uiteinde laten overlappen en er een drukknoop op zetten.

To round the straps, we'll use something new: **a macro**.

Macro's zijn kleine helpers die dingen automatiseren die anders heel snel heel saai zouden worden. Er zijn macro's om titels toe te voegen aan je patroon, of aanwijzingen van de stofrichting, een schaalkader, ... en er is dus ook een macro om hoeken af te ronden: de `round`-macro.

Voordat we die kunnen gebruiken, moeten we onze `part.shorthand()`-call updaten om aan te geven dat we ook graag macro's willen gebruiken. Voeg gewoon `macro` toe op het einde:

```js
let {
  Point,
  points,
  Path,
  paths,
  measurements,
  options,
  macro
} = part.shorthand();
```

We hebben hier een halve cirkel nodig. De `round`-macro werkt met hoeken van 90 graden, dus je gebruikt hem hier twee keer.

We voegen een paar punten toe om de macro te begeleiden, en dan zetten we hem aan het werk:

```js
let strap = points.edgeTop.dy(points.top);

points.tipRight = points.edgeTop.translate(strap / 2, strap / 2);
points.tipRightTop = new Point(points.tipRight.x, points.edgeTop.y);
points.tipRightBottom = new Point(points.tipRight.x, points.top.y);

macro("round", {
  from: points.edgeTop,
  to: points.tipRight,
  via: points.tipRightTop,
  prefix: "tipRightTop",
  render: true
});
macro("round", {
  from: points.tipRight,
  to: points.top,
  via: points.tipRightBottom,
  prefix: "tipRightBottom",
  render: true
});
```
<Fixme> Add link to macro/extend docs </Fixme>

<Example pattern="tutorial" part="step7" caption="Pretty good, but how are we going to fit it over the baby's head?" />

Net zoals bij de halsopening hebben we hier maar de helft getekend. We kunnen de punten gewoon kopiëren naar de andere kant.

Probleem: als we dat doen, overlappen de bandjes. En dat werkt niet voor een naaipatroon, want dan krijg je het niet uit één stuk stof geknipt. Dus moeten we de overlapping oplossen.



