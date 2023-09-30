---
author: "joostdecock"
caption: "Hat-tip à nappy.co pour l'image"
date: "2021-05-24"
intro: "FreeSewing 2.16 est livré avec React 17 et Webpack 5."
title: "FreeSewing 2.16 est livré avec React 17 et Webpack 5."
---


Nous avons publié FreeSewing v2.16 aujourd'hui. Pour l'observateur occasionnel, il n'y a pas tant de changements que ça. Et pour les utilisateurs de ce site web, c'est certainement le cas.

Cependant, si tu grattes la surface, tu verras que beaucoup de travail a été fait pour cette version.

Voyons ce qui a été changé :

## créer un motif de couture de frise

Le plus grand changement est lié à [create-freesewing-pattern](https://www.npmjs.com/package/create-freesewing-pattern) et à l'environnement de développement qu'il met en place pour toi.

Nous utilisons [create-react-app](https://www.npmjs.com/package/create-react-app) (aka <abbr title='Create React App'>CRA</abbr>) sous le capot, et FreeSewing 2.16 est notre première version à être livrée avec [React](https://reactjs.org/) 17, CRA 4, et [Webpack](https://webpack.js.org/) 5.

Cette migration vers CRA 4 (et son compagnon [react-scripts](https://www.npmjs.com/package/react-scripts) 4) est importante parce qu'elle offre une toute nouvelle façon de recharger ton application à chaud, appelée `FAST_REFRESH`.

L'inconvénient est que cela ne fonctionnera que pour *les composants locaux* dans ton application. Et comme notre environnement de développement charge ton code de modèle comme une dépendance (locale), il ne se recharge pas lorsque tu modifies ton fichier de modèle.

Pour aggraver les choses, Webpack 5 gardera un cache en mémoire des dépendances construites. Ainsi, même le redémarrage de l'environnement de développement n'affichera pas les modifications que tu as apportées à ton modèle.

Évidemment, ce n'est pas cool. Et bien qu'il y ait certainement des moyens de configurer Webpack pour qu'il se comporte comme nous le souhaitons, CRA ne permet pas ce genre de personnalisation. Tu peux toujours éjecter la configuration CRA (ou fork react-scripts) mais cela créerait trop de surcharge de maintenance.

## L'environnement de développement FreeSewing : Maintenant avec un rafraîchissement rapide

Nous voulons que l'environnement de développement reflète toutes les modifications que tu apportes à ton code. Et nous aimerions utiliser la nouvelle fonction d'actualisation rapide parce qu'elle est assez géniale.

Contrairement au précédent hot-reload qui se contentait de recharger la page, le fast refresh peut mettre à jour dynamiquement un composant React modifié.

C'est une distinction importante parce qu'un rechargement de page réinitialise l'environnement de développement à l'état qui est stocké dans le stockage local. Cela comprend les choses les plus importantes comme les mesures, mais pas ce que tu regardais dans l'environnement de développement, la configuration des modèles, etc. Ainsi, à chaque rechargement, il te fallait quelques clics pour revenir à ce que tu étais en train de faire, ce qui était un peu gênant.

L'actualisation rapide a le potentiel de remédier à cela, et pour l'activer, tout ce que nous avons à faire est d'importer le motif en tant que composant local. Hélas, CRA utilise le ModuleScopePlugin `de Webpack` qui interdit d'importer du code local en dehors du dossier `example/src` .

Pour contourner ce problème, cours :

```bash
npx create-freesewing-pattern
```

va maintenant créer un lien symbolique `example/src/pattern` vers le dossier racine de ton motif. Cela amène le code dans le champ d'application local, de sorte qu'il puisse être correctement chargé et réactualisé rapidement.

Cette approche présente un autre avantage : Alors qu'auparavant tu devais utiliser deux terminaux - un pour construire/observer le code modèle et un pour construire/observer l'environnement de développement - tu dois maintenant n'en charger qu'un seul parce que l'environnement de développement construira/observera également le code modèle.

Les développeurs se réjouissent 🎉

## Migration de react-markdown 5 vers 6

Un autre changement majeur est [react-markdown](https://www.npmjs.com/package/react-markdown). Nous l'avons déjà mis à niveau sur nos sites Web (dans le cadre de la migration vers Gatsby v3 que nous avons achevée au début du mois), mais nous l'utilisons également dans notre environnement de développement.

Il s'agit d'un changement relativement trivial où le contenu markdown n'est plus transmis en tant que prop explicite :

```jsx
<Markdown source={`Hello, I am **Markdown**`} />
```

Mais plutôt via l'accessoire spécial *children* .

```jsx
<Markdown>Bonjour, je suis **Markdown**</Markdown>
```

## Mise à jour des plugins de rollup

Les rollup-plugins suivants ont également subi quelques changements majeurs :

- rollup-plugin-terser 6 => 7
- @rollup/plugin-commonjs 14 => 19
- @rollup/plugin-node-resolve 8 => 13

Cela ne devrait pas poser de problème, sauf si tu regroupes tes propres modèles de couture libre. Si tu rencontres des difficultés, [, fais-le nous savoir](https://discord.freesewing.org/).

## Valeurs par défaut pour la liste des navigateurs

Nous utilisons maintenant le paramètre recommandé `defaults` pour [browserlist](https://github.com/browserslist/browserslist) qui contrôle la prise en charge par le navigateur des compilateurs croisés tels que [Babel](https://babeljs.io/).

Nous avions l'habitude d'avoir un ensemble de paramètres personnalisés, mais il n'y a pas vraiment de raison de ne pas s'en tenir aux valeurs par défaut.

Cela pourrait potentiellement avoir un impact sur la prise en charge de certains navigateurs très anciens, mais il y a de fortes chances que cela aussi passe inaperçu.

## Résumé

Peu de choses ont changé dans le code de FreeSewing lui-même, mais il y a un tas de changements qui ont un impact sur les dépendances et les bundlers.

Ce sont généralement les choses les plus difficiles et les plus ésotériques de tout projet JavaScript.

[Si tu rencontres des problèmes après la mise à jour vers FreeSewing v2.16, n'hésite pas à te rendre sur notre serveur Discord](https://discord.freesewing.org/) pour que nous puissions t'aider.

Cela dit, tant que tu utilises la même version des différents paquets FreeSewing, tu ne devrais pas avoir de problèmes.

