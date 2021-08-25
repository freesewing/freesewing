---
title: 150|Structure of a part
---

Débarassons-nous tout d'abord de la boîte exemple. Ouvrez le fichier `src/bib.js` et assurez-vous qu'il ressemble à ceci :

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

C'est un squelette vide pour une partie de patron. A chaque fois que vous voudrez créer une nouvelle partie, ces quelques lignes constitueront un bon point de départ.

Parcourons rapidement les différentes sections. Même s'il ne se passe pas encore grand chose, il est toujours bénéfique de comprendre ce qu'il se passe.

## La méthode d'ébauche (draft)

```js
export default function(part) {

  // ...

  return part;
}

```

Ceci est un standard de notre méthode `draftBib`. Elle prend comme argument la partie, et la retourne.

<Note>

If you're new to JavaScript, and don't intuitively *get this*, stick with it. Cela va bientôt devenir une seconde nature.

</Note>

## Using shorthand

```js
let {
  Point,
  points,
  Path,
  paths,
} = part.shorthand();
```

This is FreeSewing's **shorthand** method. It returns an object with a bunch of handy helpers and you use JavaScript's *object destructuring* to only get what you need.

L'exemple ci-dessus rend les variables suivantes disponibles :

 - `Point` : Le constructeur de point (Point)
 - `points`: Une référence aux points de la partie
 - `Path` : La constructeur de chemin (Path)
 - `paths` : Une référence aux chemins de la partie

<Note>

This will all become clear, but if you're curious, the API docs have all the details 
on [the Part.shorthand() method](/reference/api/part/#shorthand)

</Note>

## Partie standard

```js
// Complete?
if (complete) {
  if (sa) {
  }
  // Paperless?
  if (paperless) {
  }
}
```

Voici quelques standards supplémentaires pour nous assurer que nous respectons les paramètres `complete`, `sa`, et `paperless`.

Pour le moment, vous n'avez pas à vous inquiéter à propos de cela. Focalisons-nous sur le démarrage du bavoir.
