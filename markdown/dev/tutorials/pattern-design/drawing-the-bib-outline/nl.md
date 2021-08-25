---
title: De omtrek van het slabbetje schetsen
order: 190
---

Nu we een halsopening gemaakt hebben, is het tijd om de omtrek van het slabbetje te schetsen:

```js
let width = measurements.head * options.widthRatio;
let length = measurements.head * options.lengthRatio;

points.topLeft = new Point(
  width / -2,
  points.top.y - (width / 2 - points.right.x)
);
points.topRight = points.topLeft.shift(0, width);
points.bottomLeft = points.topLeft.shift(-90, length);
points.bottomRight = points.topRight.shift(-90, length);

paths.rect = new Path()
  .move(points.topLeft)
  .line(points.bottomLeft)
  .line(points.bottomRight)
  .line(points.topRight)
  .line(points.topLeft)
  .close();
```

Eerst hebben we de variabelen voor breedte (`width`) en lengte (`length`) aangemaakt om onszelf wat typwerk te besparen:

```js
let width = measurements.head * options.widthRatio;
let length = measurements.head * options.lengthRatio;
```

Zowel de lengte als de breedte van het slabbetje zijn een factor van de hoofdomtrek. Op die manier past het formaat van het slabbetje zich automatisch aan. Grotere baby? Groter slabbetje. De gebruiker kan de lengte en breedte aanpassen door te spelen met de opties die je aan het patroon hebt toegevoegd.

Zodra we onze variabelen hebben ingesteld, voegen we een paar nieuwe punten toe en een tweede pad met de naam `rect`.

```js
points.topLeft = new Point(
  width / -2,
  points.top.y - (width / 2 - points.right.x)
);
points.topRight = points.topLeft.shift(0, width);
points.bottomLeft = points.topLeft.shift(-90, length);
points.bottomRight = points.topRight.shift(-90, length);

paths.rect = new Path()
  .move(points.topLeft)
  .line(points.bottomLeft)
  .line(points.bottomRight)
  .line(points.topRight)
  .line(points.topLeft)
  .close();
```

We berekenen het punt `topLeft` zodat de bovenkant van het slabbetje en de zijkanten op dezelfde afstand liggen van de halsopening.

Dat was niet echt nodig. Maar het ziet er wel mooi evenwichtig uit:

<Example pattern="tutorial" part="step5" caption="Note how the neck opening is the same distance from the left, right, and top edge" />

