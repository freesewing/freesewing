---
title: Compléter votre patron
order: 260
---

Lorsque nous avons commencé, nous avons dit qu'une bonne partie standard ressemblait à cela :

```js
export default function(part) {
  let { Point, points, Path, paths } = part.shorthand();
  // Design pattern here

  // Complete?
  if (complete) {
    if (sa) {
    }
    // Paperless?
    if (paperless) {
    }
  }
  return part;
}
```

So far, we've kept to the *// Design pattern here* area, but now we're going to work on the area under *// Complete?* 

<Note>

###### The point of (non) complete patterns

Users can set the `complete` setting to `false`. When that's the case, you
should draft a base outline of the pattern, rather than a fully detailed pattern.i

This has different uses, such as generating patterns to be cut out with a laser cutter.

</Note>

Le réglage `complete` est sur `true` par défaut, mais l'utilisateur peut le modifier. Pour accéder à ce paramètre, nous avons juste à dire à `part.shorthand()` que nous aimerions y avoir accès.

Tant que nous y sommes, ajoutons également `snippets` et `Snippet`, comme ceci :

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
  Snippet
} = part.shorthand();
```

## Adding snippets

Les snippets sont de petites choses réutilisables pour embellir notre patron. Des choses comme les boutons et les boutonnières, un logo, ou des boutons pression :

```js
// Complete?
if (complete) {
  snippets.snapMale = new Snippet("snap-male", points.snapLeft);
  snippets.snapFemale = new Snippet("snap-female", points.snapRight)
    .attr("opacity", 0.5);

  if (sa) {
  }
  // Paperless?
  if (paperless) {
  }
}
```

Nous avons ajouté des snippets `snap-male` (pression mâle) et `snap-female` (pression femelle) aux points que nous avons envisagés pour cela.

Etant donné que la pression femelle est sur l'envers du tissu, nous l'avons rendue semi-transparente en réglant l'attribut `opacity` (opacité) à `0.5`. Oui, vous pouvez faire ça.

<Tip>

Tous les attributs que vous réglez seront ajoutés à la sortie SVG.

</Tip>

Puisque nous ajoutons des snippets, mettons-y également un logo :

```js
points.logo = new Point(0, 0);
snippets.logo = new Snippet("logo", points.logo);
```

## Seam allowance

De la même façon que les utilisateurs peuvent choisir s'ils désirent un patron complet ou non, ils peuvent choisir d'inclure ou non des marges de couture sur le patron.

Voici pourquoi nous avons cette condition :

```js
if (sa) {
}
```

Notre bavoir n'utilise pas de marge de couture. Nous allons employer du biais pour la finition. Alors vous pouvez simplement supprimer cette condition.

Toutefois, pour de futures références, `sa` (pour seam allowance) est la variable que vous pouvez obtenir de `part.shorthand()` tout comme `complete`. Mais au lieu des valeurs `true` ou `false`, elle contiendra la quantité de marge de couture en mm.

Note that you can still do `if (sa)` because zero is *falsy*.

Nous n'ajouterons pas de marge de couture, mais nous allons faire quelque chose qui s'en rapproche dans l'absolu. Plutôt que de dessiner un contour hors de notre bavoir pour indiquer la marge de couture, nous allons en dessiner un au sein de notre bavoir pour signifier le ruban de biais :

```js
paths.bias = paths.seam
  .offset(-5)
  .attr("class", "various dashed")
  .attr("data-text", "finishWithBiasTape")
  .attr("data-text-class", "center fill-various");
```

La méthode `path.offset()` rend la tâche d'ajouter une marge de couture triviale, étant donné qu'elle construit un chemin parallèle à la distance que vous désirez. 9 fois sur 10, vous l'utiliserez en tant que `path.offset(sa)`.

Notez que nous employons de nouveau les attributs, pour modifier l'aspect de la ligne, et pour ajouter du texte dessus, comme expliqué dans [Ajouter du texte](fr/concepts/adding-text).

## Echelle et titre

Deux macros en plus et nous aurons terminé.

La macro `title` ajoute un titre à notre partie. Ce n'est pas indispensable ici puisque nous n'avons qu'une seule partie. Mais les patrons ont en général différentes parties, quelques unes d'entre elles peuvent se ressembler. C'est pourquoi vous devriez numéroter vos parties et leur donner un nom.

La macro `title` est là pour vous aider :

```js
points.title = points.bottom.shift(-90, 45);
macro("title", {
  at: points.title,
  nr: 1,
  title: "bib"
});
```

La macro `scalebox` imprime un carré de dimensions exactes. Elle est utilisée par les personnes qui impriment leur patron afin qu'elles puissent vérifier que leur impression est à la bonne échelle.

```js
points.scalebox = points.title.shift(-90, 55);
macro("scalebox", { at: points.scalebox });
```

And with that, our pattern is now *complete*:

<Example pattern="tutorial" part="step11" caption="We used attributed to add color, dashes, text on a path and even opacity" />

Nous n'avons pas tout à fait terminé cependant. There's one more thing the user can ask for: a *paperless* pattern.

