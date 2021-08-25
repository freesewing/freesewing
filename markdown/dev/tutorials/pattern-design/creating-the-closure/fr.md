---
title: 210|Creating the closure
---

Les choses commencent à prendre forme, mais nous ne pouvons pas passer le bavoir sur la tête du bébé comme ça. Alors nous devons créer un système de fermeture. Nous allons faire chevaucher les attaches à leurs extrémités, et y mettre un bouton pression.

To round the straps, we'll use something new: **a macro**.

Les macros sont de petites assistantes qui automatisent les tâches qui autrement seraient un peu fastidieuses. Il existe des macros pour ajouter des titres à votre patron, ou des indicateurs de droit-fil, une échelle, et il y a une macro pour arrondir les coins. La macro `round`.

Avant de pouvoir l'utiliser, nous devons mettre à jour notre appel à `part.shorthand()` pour indiquer que nous aimerions également utiliser des macros. Ajoutez simplement `macro` à la fin :

```js
let {
  Point,
  points,
  Path,
  paths,
  measurements,
  options,
  macro
} = part.shorthand();
```

Nous avons besoin d'un demi cercle ici, mais la macro `round` fonctionne sur des angles à 90°, alors nous allons l'utiliser deux fois.

Ainsi, ajoutons donc quelques points pour guider la macro, puis la laisser faire son travail :

```js
let strap = points.edgeTop.dy(points.top);

points.tipRight = points.edgeTop.translate(strap / 2, strap / 2);
points.tipRightTop = new Point(points.tipRight.x, points.edgeTop.y);
points.tipRightBottom = new Point(points.tipRight.x, points.top.y);

macro("round", {
  from: points.edgeTop,
  to: points.tipRight,
  via: points.tipRightTop,
  prefix: "tipRightTop",
  render: true
});
macro("round", {
  from: points.tipRight,
  to: points.top,
  via: points.tipRightBottom,
  prefix: "tipRightBottom",
  render: true
});
```
<Fixme> Add link to macro/extend docs </Fixme>

<Example pattern="tutorial" part="step7" caption="Pretty good, but how are we going to fit it over the baby's head?" />

Comme pour l'encolure, nous avons seulement dessiné la moitié étant donné que nous pouvons copier les points pour l'autre côté.

Toutefois, le faire engendrerait un chevauchement des attaches. Ce qui ne fonctionne pas pour un patron puisque cela rendrait impossible de le couper à partir d'une simple pièce de tissu. Alors occupons-nous ensuite du chevauchement.



