---
title: Dessiner les attaches
order: 230
---

Tout ce que nous devons faire maintenant est de retourner un ensemble de points de l'autre côté, et créer un unique chemin qui suit le contour de notre bavoir.

Tout d'abord, il faut créer les points :

```js
points.edgeTopRightCp = points.edgeTopLeftCp.flipX();
points.topCp1 = points.topCp2.flipX();
points.tipLeftTopStart = points.tipRightTopStart.flipX();
points.tipLeftTopCp1 = points.tipRightTopCp1.flipX();
points.tipLeftTopCp2 = points.tipRightTopCp2.flipX();
points.tipLeftTopEnd = points.tipRightTopEnd.flipX();
points.tipLeftBottomStart = points.tipRightBottomStart.flipX();
points.tipLeftBottomCp1 = points.tipRightBottomCp1.flipX();
points.tipLeftBottomCp2 = points.tipRightBottomCp2.flipX();
points.tipLeftBottomEnd = points.tipRightBottomEnd.flipX();
points.snapRight = points.snapLeft.flipX();
```

Maintenant, supprimez les chemins `neck` et `rect` que nous avons créés plus tôt, et remplaçez-les avec ce nouveau chemin :

```js
paths.seam = new Path()
  .move(points.edgeLeft)
  .line(points.bottomLeft)
  .line(points.bottomRight)
  .line(points.edgeRight)
  .curve(
    points.edgeRightCp, 
    points.edgeTopRightCp, 
    points.tipLeftTopStart
  )
  .curve(
    points.tipLeftTopCp1, 
    points.tipLeftTopCp2, 
    points.tipLeftTopEnd
  )
  .curve(
    points.tipLeftBottomCp1,
    points.tipLeftBottomCp2,
    points.tipLeftBottomEnd
  )
  .curve(
    points.topCp1, 
    points.rightCp2, 
    points.right
  )
  .curve(
    points.rightCp1, 
    points.bottomCp2, 
    points.bottom
  )
  .curve(
    points.bottomCp1, 
    points.leftCp2, 
    points.left
  )
  .curve(
    points.leftCp1, 
    points.topCp2, 
    points.tipRightBottomEnd
  )
  .curve(
    points.tipRightBottomCp2,
    points.tipRightBottomCp1,
    points.tipRightBottomStart
  )
  .curve(
    points.tipRightTopCp2,
    points.tipRightTopCp1,
    points.tipRightTopStart
  )
  .curve(
    points.edgeTopLeftCp, 
    points.edgeLeftCp, 
    points.edgeLeft
  )
  .close()
  .attr("class", "fabric");
```

Avec ceci, notre bavoir ressemble à présent à cela :

<Example pattern="tutorial" part="step9" caption="That is looking a lot like a bib" />

<Note> 

We used the `part.attr()` method to style our path? But because the `fabric` class is drawn in black,
it doesn't look much different. Nous allons utiliser d'autres classes plus tard qui rendront son effet plus apparent. 

</Note>

Cela a un assez bel aspect. But those sharp corners at the bottom don't exactly say *baby* do they? Réglons donc ça.

