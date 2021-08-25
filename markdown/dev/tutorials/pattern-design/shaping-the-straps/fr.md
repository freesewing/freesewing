---
title: 200|Shaping the straps
---

Nos attaches devraient suivre l'encolure, ce qui n'est pas difficile à faire. Il nous faut juste nous assurer que les points de contrôle de nos courbes aient des proportions similaires. Ce qui signifie, à la moitié entre le début de la courbe et le coin de notre rectangle.

<Note>

For this, you'll be using a new method: `Point.shiftFractionTowards()`. We've already
used `Point.shift()` and there's also `Point.shiftTowards()` and `Point.shiftOutwards()`.
As always, [the API docs](/reference/api/point/) have all the details.

</Note>

```js
points.edgeLeft = new Point(points.topLeft.x, points.left.y);
points.edgeRight = new Point(points.topRight.x, points.right.y);
points.edgeTop = new Point(0, points.topLeft.y);

points.edgeLeftCp = points.edgeLeft.shiftFractionTowards(points.topLeft, 0.5);
points.edgeRightCp = points.edgeLeftCp.flipX();
points.edgeTopLeftCp = points.edgeTop.shiftFractionTowards(
  points.topLeft,
  0.5
);
points.edgeTopRightCp = points.edgeTopLeftCp.flipX();
```

Maintenant, adaptons notre chemin `rect` de façon à ce qu'il ne soit plus un rectangle :

```js
paths.rect = new Path()
  .move(points.edgeTop)
  .curve(points.edgeTopLeftCp, points.edgeLeftCp, points.edgeLeft)
  .line(points.bottomLeft)
  .line(points.bottomRight)
  .line(points.edgeRight)
  .curve(points.edgeRightCp, points.edgeTopRightCp, points.edgeTop)
  .close();
```

Tout à coup, les choses commencent à prendre la forme d'un bavoir :

<Example pattern="tutorial" part="step6" caption="Pretty good, but how are we going to fit it over the baby's head?" />

