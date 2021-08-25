---
title: Overlap vermijden
order: 220
---

Je hebt nu enkel nog maar het uiteinde van één bandje getekend, maar het is al heel duidelijk dat ze overlappen. Dat is een grote no-no in naaipatronen, dus daar moeten we iets aan doen.

We gaan het bandje uit de weg draaien zodat het niet meer overlapt. De rest van het slabbetje moet blijven zoals het is, dus laten we om te beginnen een lijst maken van punten die moeten draaien:

```js
let rotateThese = [
  "edgeTopLeftCp",
  "edgeTop",
  "tipRight",
  "tipRightTop",
  "tipRightTopStart",
  "tipRightTopCp1",
  "tipRightTopCp2",
  "tipRightTopEnd",
  "tipRightBottomStart",
  "tipRightBottomCp1",
  "tipRightBottomCp2",
  "tipRightBottomEnd",
  "tipRightBottom",
  "top",
  "topCp2"
];
```

Nu kan je ze roteren. Hoe ver? Tot het bandje niet meer overlapt:

```js
while (points.tipRightBottomStart.x > -1) {
  for (let p of rotateThese) points[p] = points[p].rotate(1, points.edgeLeft);
}
```

We roteren alle punten in de `rotateThese`-reeks rond de punten van `edgeLeft`. We werken met stappen van 1 graad totdat het punt `tipRightBottomStart` 1 millimeter voorbij het midden van het slabbetje ligt.

En nu we toch bezig zijn, kunnen we meteen een punt toevoegen waar de drukknop voor de sluiting terecht moet komen:

```js
points.snapLeft = points.top.shiftFractionTowards(points.edgeTop, 0.5);
```

<Example pattern="tutorial" part="step8" caption="The right part looks a bit wonky now, but we'll get to that" />

Dat gaan we spiegelen aan de andere kant en de paden voor `neck` en `rect` vervangen door een nieuw pad.

