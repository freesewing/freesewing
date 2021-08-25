---
title: 140|Adding options
---

You know what your bib should look like, and you have the *head* measurement to work with. Mais il y a encore un certain nombre de choix que vous allez devoir faire :

 - Quelle devrait être la largeur de l'encolure ?
 - Quelle sera la largeur du bavoir ?
 - Quelle longueur devra-t-il avoir ?

Vous pourriez faire ces choix à la place de l'utilisateur et les graver dans la pierre, pour ainsi dire.

Mais étant donné que vous concevez un patron sous forme de code, il est trivial de rendre votre patron flexible et de laisser le choix à l'utilisateur. Tout ce que vous avez à faire est d'ajouter des options à votre patron.

## Ajouter l'option neckRatio

La première option que nous allons ajouter contrôle le ratio entre l'encolure et le tour de tête. Appelons-la `neckRatio`.

Ouvrez le fichier de configuration à cette adresse `config/index.js` et ajoutez ceci aux options :

```js
  options: {
    // Supprimez cette option de taille (size)
    //size: { pct: 50, min: 10, max: 100 }
    // Et ajoutez l'option neckRatio
    neckRatio: { pct: 80, min: 70, max: 90 }, 
  }
```

Pouvez-vous devinez ce que cela signifie ?

 - Nous avons ajouté une option de type pourcentage
 - Sa valeur minimale est de 70%
 - Sa valeur maximale est de 90%
 - Sa valeur par défaut est de 80%

<Note>

Il y a différents types d'options, mais les pourcentages sont les plus communes.
They are all documentation [in the API docs](/reference/api/config/#options).

</Note>

Faisons quelque chose de similaire pour la largeur (width en anglais) et la longueur (length en anglais) de notre bavoir :

```js
options: {
  neckRatio: { pct: 80, min: 70, max: 90 }, 
  widthRatio: { pct: 45, min: 35, max: 55 }, 
  lengthRatio: { pct: 50, min: 40, max: 65 }, 
}
```

 - Vous avez ajouté les options `widthRatio` et `lengthRatio`
 - Vous avez donné toutes les valeurs par défaut sensibles des options
 - Vous avez donné toutes les valeurs sensibles pour les minima et les maxima des options

<Note>

Plus tard, vous testerez votre patron pour voir comment il se comporte lorsque vous modifierez les options entre leurs valeurs minimales et maximales. A cet instant, vous pouvez encore ajuster ces valeurs.

</Note>

Avant de fermer le fichier `config/index.js`, assurez-vous de mettre à jour l'entrée `optionGroups` comme suit :

```js
optionGroups: {
  fit: ["neckRatio", "widthRatio", "lengthRatio"]
},
```

<Note>

The `optionGroups` entry does not do anything for your pattern as such. 
Elle signale au frontend que c'est ainsi que les options devraient être rassemblées et présentées à l'utilisateur.

</Note>

Etant donnée que vous avez supprimé l'option `box`, le patron ne dessine plus une boîte. Alors commençons à dessiner votre bavoir à la place.
