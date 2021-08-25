---
title: 180|Completing the neck opening
---

Comme l'encolure est symétrique, il n'est pas nécessaire de recalculer les points de l'autre côté. Vous pouvez tout simplement les retourner, pour ainsi dire. Et c'est exactement ce que vous allez faire :

D'abord, créez quelques nouveaux points :

```js
points.rightCp2 = points.rightCp1.flipY();
points.bottomCp1 = points.bottomCp2.flipX();

points.left = points.right.flipX();
points.leftCp1 = points.rightCp2.flipX();
points.leftCp2 = points.rightCp1.flipX();

points.top = points.bottom.flipY();
points.topCp1 = points.bottomCp2.flipY();
points.topCp2 = points.bottomCp1.flipY();
```

<Note>

We're using the `Point.flipX()` and `Point.flipY()` methods here.
Peut-être pouvez-vous deviner à quoi elles servent ? If not, check [the API documentation](/reference/api/point/).

</Note>

Puis, mettez à jour votre chemin :

```js
paths.neck = new Path()
  .move(points.top)
  .curve(points.topCp2, points.leftCp1, points.left)
  .curve(points.leftCp2, points.bottomCp1, points.bottom)
  .curve(points.bottomCp2, points.rightCp1, points.right)
  .curve(points.rightCp2, points.topCp1, points.top)
  .close();
```

<Example pattern="tutorial" part="step4" caption="And now you have a complete neck opening" />

