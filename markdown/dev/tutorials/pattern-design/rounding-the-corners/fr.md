---
title: Arrondir les coins
order: 240
---

Nous savons déjà comment arrondir des coins, laissons la macro `round` s'en charger :


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

Mais il y a encore quelque chose à apprendre ici. Si vous regardez comment nous avons employer la macro `round` précédemment, vous vous rendrez compte que nous avons utilisé cette ligne :

```js
  render: true,
```

Cela instruit la macro `round` de créer un chemin qui dessine un coin arrondi. Alors que par défaut, elle ne fait que dessiner les points requis pour arrondir le coin.

Typiquement, votre coin arrondi fera partie d'un chemin plus large et vous ne voulez pas que la macro le dessine. C'est pourquoi la propriété `render` (rendu) de la macro `round` a sa valeur par défaut définie sur `false`.

Nous l'avons laissée là, et vous devriez aussi la retirer pour votre emploi précédent de la macro `round`. Nous avons réglé `render` sur `true` à ce moment pour que vous puissiez voir ce que la macro faisait.

Avec nos coins arrondis, nous devrions mettre à jour notre chemin. Fort heureusement, nous avons juste à mettre à jour le début de ce dernier. Remplacez ceci :

```js
paths.seam = new Path()
  .move(points.edgeLeft)
  .line(points.bottomLeft)
  .line(points.bottomRight)
  .line(points.edgeRight)
```

Par ça :

```js
paths.seam = new Path()
  .move(points.edgeLeft)
  .line(points.bottomLeftStart)
  .curve(points.bottomLeftCp1, points.bottomLeftCp2, points.bottomLeftEnd)
  .line(points.bottomRightStart)
  .curve(points.bottomRightCp1, points.bottomRightCp2, points.bottomRightEnd)
  .line(points.edgeRight)
```

et gardez le reste du chemin tel qu'il était.

La forme de notre bavoir est maintenant finie :

<Example pattern="tutorial" part="step10" caption="That is looking a lot like a bib" />



