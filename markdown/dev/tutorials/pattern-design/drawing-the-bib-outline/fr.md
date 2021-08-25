---
title: Dessiner le contour du bavoir
order: 190
---

Avec notre encolure en place, attaquons-nous au contour du bavoir :

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

La première chose que nous avons faite est de créer les variables `width` (largeur) et `length` (longueur) afin de nous épargner un peu de dactylographie :

```js
let width = measurements.head * options.widthRatio;
let length = measurements.head * options.lengthRatio;
```

La longueur et la largeur de votre bavoir sont tous les deux des facteurs du tour de tête (head circumference). De cette façon, la taille du bavoir s'adaptera à celle du bébé, et l'utilisateur pourra ajuster la longueur et la largeur en jouant avec les options que vous aurez ajouté au patron.

Une fois nos variables prêtes, nous ajoutons quelques nouveaux points, et un deuxième chemin nommé `rect`.

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

Nous calculons le point `topLeft` (hautGauche) de façon à ce que le bord haut du bavoir et les côtés soient équidistants de l'encolure.

Vous n'étiez pas obligés de le faire. Mais cela paraît plus équilibré de cette façon :

<Example pattern="tutorial" part="step5" caption="Note how the neck opening is the same distance from the left, right, and top edge" />

