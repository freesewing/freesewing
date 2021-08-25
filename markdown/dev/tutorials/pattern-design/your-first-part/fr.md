---
title: Votre première partie
order: 120
---

Much like garments themselves, patterns are made up of *parts*.

La plupart des patrons auront plusieurs parties. Une manche, une partie arrière, le col, etc. Notre patron est des plus simples, et ne comporte qu'une seule partie : le bavoir.

Le patron qui vient d'être créé pour nous a aussi une unique partie pour vous faire démarrer. It's called **box** and it draws a box. If you click on the **Draft your pattern** button in your browser, you'll get to see it:

![Le patron par défaut avec sa partie box](./step1.png)

Since we only need one part, we'll rename this *box* part, and call it *bib*.

## Renommez la partie box en bib

Tout d'abord, mettez à jour le fichier de configuration dans `config/index.js`. Update the **parts** array with `bib`, rather than `box`:

```js
parts: ["bib"],
```

Lorsque c'est fait, remplacez le nom du fichier `src/box.js` par `src/bib.js`.

Puis, dans le fichier `src/index.js`, changez l'import de façon correspondante :

```js
// Changez cette ligne
//import draftBox from "./box";

// en
import draftBib from "./bib";
```

Enfin, toujours dans le fichier `src/index.js`, mettez à jour la méthode d'ébauche :

```js
// Change cette ligne
//Pattern.prototype.draftBox = draftBox;

// en
Pattern.prototype.draftBib = draftBib;
```

<Tip>

###### Always use draftPartname

FreeSewing will expect for each part to find a method named Draft*Partname*.

If you have a part named `sleeve` you should have a method called `draftSleeve()` that drafts that part.

In our case, we have a part named `bib` so we're using `draftBib()` as the method that drafts it.

</Tip>

Félicitations, votre modèle a maintenant une partie `bib`, au lieu d'une partie `box`. Elle a toujours la même tête cependant :

<Example pattern="tutorial" part="step1" caption="Our bib part, which is the renamed box part" />

Cette partie `bib` est là où nous allons effectuer un travail plus sérieux. Mais tout d'abord, nous avons encore un peu de configuration à faire.
