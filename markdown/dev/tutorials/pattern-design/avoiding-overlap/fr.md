---
title: Eviter le chevauchement
order: 220
---

Tandis que vous avez seulement dessiné l'extrémité d'une attache, il est assez évident que les attaches se chevauchent. Ce qui est absolument inadmissible pour un patron de couture, alors il va falloir résoudre ce problème.

Spécifiquement, nous allons faire tourner (rotate) notre attache de façon à ce qu'elle ne se superpose plus sur la deuxième. Le reste du bavoir devrait rester tel quel, alors commençons par lister les points qui doivent subir une rotation :

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

A présent vous pouvez les faire tourner. Jusqu'où ? Jusqu'à ce que les attaches ne se chevauchent plus :

```js
while (points.tipRightBottomStart.x > -1) {
  for (let p of rotateThese) points[p] = points[p].rotate(1, points.edgeLeft);
}
```

Nous allons faire tourner tous les points du tableau `rotateThese` autour des points `edgeLeft` (bord gauche). Nous utilisons des incréments de 1 degré jusqu'à ce que le point `tipRightBottomStart` dépasse d'1 mm du centre du bavoir.

Dans le même temps, ajoutons un point où le bouton pression devrait se trouver :

```js
points.snapLeft = points.top.shiftFractionTowards(points.edgeTop, 0.5);
```

<Example pattern="tutorial" part="step8" caption="The right part looks a bit wonky now, but we'll get to that" />

Maintenant, effectuons l'image miroir de l'autre côté, et remplaçons nos chemins `neck` et `rect` par un nouveau chemin.

