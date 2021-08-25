---
title: De hoeken afronden
order: 240
---

We weten al hoe je hoeken afrondt; daar dient de `round`-macro voor:


```js
macro("round", {
  from: points.topLeft,
  to: points.bottomRight,
  via: points.bottomLeft,
  radius: points.bottomRight.x / 4,
  prefix: "bottomLeft"
});
macro("round", {
  from: points.bottomLeft,
  to: points.topRight,
  via: points.bottomRight,
  radius: points.bottomRight.x / 4,
  prefix: "bottomRight"
});
```

Maar hier kunnen we nog iets bijleren. Als je kijkt naar hoe we de `round`-macro hiervoor toegepast hebben, zie je dat we deze regel gebruikt hebben:

```js
  render: true,
```

Dit geeft de `round`-macro de opdracht om een pad te creëren dat de afgeronde hoek tekent. Standaard doet de macro niet meer dan de punten te creëren die nodig zijn om de hoek af te ronden.

Meestal zal je afgeronde hoek deel uitmaken van een groter pad. Dan wil je niet dat de macro het ook nog eens tekent. Daarom staat de `render`-eigenschap van de `round`-macro standaard ingesteld als `false`.

Hier hebben we de `render`-eigenschap weggelaten, en dat zou je ook moeten doen in je vorige gebruik van de `round`-macro. We hebben hem toen alleen ingesteld als `true` om je te tonen wat de macro precies doet.

Nu onze hoeken afgerond zijn, moeten we ons pad updaten. Gelukkig hoeven we alleen maar het begin te updaten. Vervang dit:

```js
paths.seam = new Path()
  .move(points.edgeLeft)
  .line(points.bottomLeft)
  .line(points.bottomRight)
  .line(points.edgeRight)
```

Door dit:

```js
paths.seam = new Path()
  .move(points.edgeLeft)
  .line(points.bottomLeftStart)
  .curve(points.bottomLeftCp1, points.bottomLeftCp2, points.bottomLeftEnd)
  .line(points.bottomRightStart)
  .curve(points.bottomRightCp1, points.bottomRightCp2, points.bottomRightEnd)
  .line(points.edgeRight)
```

en behoud de rest van het pad zoals het was.

De vorm van het slabbetje is nu afgewerkt:

<Example pattern="tutorial" part="step10" caption="That is looking a lot like a bib" />



