---
title: 160|Constructing the neck opening
---

Votre but est de construire une encolure légèrement ovale qui a une circonférence égale à la mesure `head` multipliée par l'option `neckRatio`.

Cela va peut-être impliquer un peu d'essai-erreur. Mais étant donné que l'encolure sera symétrique à la fois horizontalement et verticalement, vous aurez juste besoin de construire un quart de celle-ci.

Nous allons ajouter quelques points à notre patron pour cela. Mais nous voulons avoir accès à toutes nos mesures et options pour ce faire. Pour cela, vous allez d'abord mettre à jour l'appel aux raccourcis pour indiquer que vous voulez également avoir accès à `measurements` et `options`:


```js
let {
  Point,
  points,
  Path,
  paths,
  measurements,
  options
} = part.shorthand();
```

Merveilleux. Maintenant, mettons-nous au travail :

```js
// Design pattern here (concevoir le patron ici)
points.right = new Point(measurements.head / 10, 0);
points.bottom = new Point(0, measurements.head / 12);

points.rightCp1 = points.right
  .shift(90, points.bottom.dy(points.right)/2);
points.bottomCp2 = points.bottom
  .shift(0, points.bottom.dx(points.right)/2);

paths.neck = new Path()
  .move(points.right)
  .curve(points.rightCp1, points.bottomCp2, points.bottom)
```

Vous avez ajouté quelques points à votre partie, et dessiné votre premier chemin. Examinons chaque ligne en détail :

```js
points.right = new Point(measurements.head / 10, 0);
```

 - Nous ajoutons un point nommé `right` à `points`, qui contient les points de notre partie
 - Nous utilisons le constructeur Point, qui prend deux arguments : les valeurs X et Y du point
 - La valeur X est `measurements.head / 10`
 - La valeur Y est `0`

Le point `bottom` est très similaire, alors passons directement à la ligne suivante :

```js
points.rightCp1 = points.right
  .shift(90, points.bottom.dy(points.right)/2);
```

 - We're adding a point named `rightCp1`, which will become the *control point* of the right part
 - Au lieu d'utiliser le constructeur Point, nous faisons appel à la méthode `Point.shift()` sur un point existant
 - Elle prend deux arguments : l'angle de décalage et la distance
 - Vous pouvez voir que nous décalons à 90 degrés (ce qui signifie vers le haut) mais la distance emploie une autre méthode
 - La méthode `Point.dy()` retourne la différence selon l'axe Y entre le point appelé et le point source
 - Nous nous décalons de la moitié de la différence en Y

Le point suivant est très similaire de nouveau, excepté que cette fois nous nous décalons vers la droite (0 degré) de la moitié de la distance en X entre les points `bottom` et `right`.

<Tip>

Points vient avec une ribambelle de ces méthodes. 
You can find them all in [the Point API docs](/referene/api/point/).

</Tip>

La ligne suivante vous introduit une notion nouvelle, les chemins (Paths) :

```js
paths.neck = new Path()
  .move(points.right)
  .curve(points.rightCp1, points.bottomCp2, points.bottom)
```

 - Nous ajoutons un chemin nommé `neck` à `paths` qui contient les chemins de notre partie
 - Nous utilisons le constructeur de chemin Path, qui ne prend aucun argument
 - Nous poursuivons avec l'appel à `Path.move()` qui prend un Point comme argument
 - Puis, il y a un appel à `Path.curve()` qui prend 3 points comme arguments

If you've read through [the high-level overview of FreeSewing](/guides/overview/) you will have learned that paths always start with a `move()` operation. Dans ce cas, nous avons bougé depuis notre point `right`.

A partir de là, nous avons dessiné une courbe de Bézier vers notre point `bottom` en utilisant `rightCp1` et `bottomCp2` comme points de contrôle.

Lorsque tout est dit et fait, nous avons maintenant un quart de notre encolure :

<Example pattern="tutorial" part="step2" caption="You have drawn your first path" />

Le seul problème étant que nous n'avons aucune garantie que cette ouverture soit de taille correcte.

Plutôt que d'espérer qu'elle le soit, vous allez vérifier qu'elle l'est réellement dans la prochaine étape.

