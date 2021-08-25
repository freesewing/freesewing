---
title: De bandjes tekenen
order: 230
---

Al wat we nu nog moeten doen, is een hoop punten spiegelen aan de andere kant en één pad maken dat de omtrek van het slabbetje volgt.

Eerst maken we de punten:

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

Nu verwijder je de paden `neck` en `rect` die we eerder gemaakt hebben, en vervang je ze door dit nieuwe pad:

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

Nu we dat uit de weg hebben, ziet het slabbetje er zo uit:

<Example pattern="tutorial" part="step9" caption="That is looking a lot like a bib" />

<Note> 

We used the `part.attr()` method to style our path? But because the `fabric` class is drawn in black,
it doesn't look much different. Later gaan we een paar andere klasses gebruiken die het effect duidelijker maken. 

</Note>

Het ziet er best goed uit. But those sharp corners at the bottom don't exactly say *baby* do they? Daar gaan we iets aan doen.

