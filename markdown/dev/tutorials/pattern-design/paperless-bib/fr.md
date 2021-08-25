---
title: 270|Making your pattern paperless
---

Les utilisateurs peuvent demander des patrons sans papier en réglant le paramètre `paperless` sur `true`.

Nous pouvons obtenir cette valeur du paramètre à partir de la méthode `part.shorthand()`. Cela sera le dernier raccourci dont nous aurons besoin :

```js
let {
  Point,
  points,
  Path,
  paths,
  measurements,
  options,
  macro,
  complete,
  snippets,
  Snippet,
  paperless
} = part.shorthand();
```

The idea behind *paperless patterns* is that users don't need to print your pattern in order to use it. Au lieu de cela, nous incluons les dimensions sur le patron qui leur permettent de transférer la patron directement sur le tissu, ou sur un medium intermédiaire comme du papier carbone.

De plus, FreeSewing va automatiquement délivrer une grille pour chaque partie de patron avec des marques métriques ou impériales, selon les unités choisies par l'utilisateur.

Tandis que la grille est ajoutée automatiquement, vous aurez à ajouter les dimensions vous-mêmes. Heureusement, il existe des macros pour vous aider dans cette tâche, spécifiquement :

 - La macro `hd` qui ajoute une mesure horizontale
 - La macro `vd` qui ajoute une mesure verticale
 - La macro `ld` qui ajoute une mesure linéaire
 - La macro `pd` qui ajoute une mesure de chemin suivant ce même chemin<Fixme> Add links to macro docs </Fixme>

Jetons un coup d'oeil à ce code :

```js
if (paperless) {
  // Add dimensions
  macro("hd", {
    from: points.bottomLeftStart,
    to: points.bottomRightEnd,
    y: points.bottomLeft.y + 15
  });
  macro("vd", {
    from: points.bottomRightStart,
    to: points.bottom,
    x: points.bottomRight.x + 15
  });
  macro("vd", {
    from: points.bottomRightStart,
    to: points.right,
    x: points.bottomRight.x + 30
  });
  macro("vd", {
    from: points.bottomRightStart,
    to: points.tipLeftTopStart,
    x: points.bottomRight.x + 45
  });
  macro("hd", {
    from: points.left,
    to: points.right,
    y: points.left.y + 25
  });
  macro("ld", {
    from: points.tipLeftBottomEnd,
    to: points.tipLeftTopStart,
    d: 15
  });
}
```

Beaucoup de choses se passent, mais elles sont répétitives. Voyons un peu le résultat final, et discutons-en :

<Example pattern="tutorial" part="bib" caption="Your paperless bib" settings={{paperless: true}} />

Nous avons utilisé la macro `hd` pour ajouter deux mesures horizontales :

 - Une en bas pour la largeur de notre bavoir
 - Une pour la largeur de l'encolure

La macro `hd` prend un point d'origine `from` et un point d'arrivée `to` et également une valeur `y` qui dit à quelle valeur en Y marquer cette mesure.

Nous avons également ajouté trois macros `vd` pour les mesures verticales sur la droite.

Elle prennent aussi un point de départ `from` et un point d'arrivée `to`, mais attendent un paramètre `x` pour leur indiquer à quelle valeur de X la mesure doit être marquée.

Finalement, nous avons ajouté une macro `ld` pour la mesure linéaire du haut qui marque la largeur de notre attache. Bien que la plupart des mesures soient horizontale ou verticale, parfois vous voudrez une ligne droite entre les points `from` et `to` comme dans ce cas.

La macro `ld` prend un argument `d` (pour delta) qui indique jusqu'où la mesure doit être décalée de la ligne partant du point `from` au point `to`, si besoin.

Rendre votre patron sans papier est la cerise sur le gâteau. Il est temps de faire un bilan, de voir tout ce que nous avons appris, et de donner quelques indications sur la direction à suivre à partir de là.

