---
author: 1
caption: "Photo par Snapwire - Via pexels.com"
date: "2022-01-01"
intro: "Je ne vais pas faire tout un article de blog sur 2021 parce que j'ai l'impression que la plupart d'entre nous veulent passer à autre chose et oublier tout ça, mais si tu cherchais une lecture plus longue, voici la table des matières de la dernière édition de notre bulletin d'information qui a également été envoyé aujourd'hui :"
title: "Récapitulation de 2021 : Un nouveau FreeSewing.dev et l'annonce de notre programme de primes aux bugs."
---



Je ne vais pas faire un article de blog entier sur 2021 parce que j'ai l'impression que la plupart d'entre nous veulent passer à autre chose et l'oublier, mais si tu cherchais une lecture plus longue, voici la table des matières de [notre dernière édition du bulletin d'information](/newsletter/2022q1/) qui a également été envoyé aujourd'hui :

- 🎉 2021 est salé et brûlé
- 🧐 Ce que nos contributeurs ont fait en 2021.
- 🎖️ FreeSewing est désormais un projet "tous contributeurs".
- 🚧 Pourquoi la version 3 a été mise en attente.
- 🤓 Ce que j'ai fait en 2021
- 🐛 Le programme de primes aux bugs de FreeSewing
- ⛑️ Recettes annuelles et leur destination (spoiler : les mêmes que d'habitude)
- 🤞 Ce que j'espère qu'il se passera cette année.

Ici, j'aimerais sélectionner les choses qui me semblent les plus intéressantes en ce moment.

## freesewing.dev a été reconstruit

[L'effort que j'ai commencé pendant l'été](https://freesewing.dev/blog/project-2022) s'est concrétisé le dernier jour de l'année lorsque j'ai déployé le nouveau site [freesewing.dev](https://freesewing.dev/blog/project-2022) en production.

Il s'agit d'une refonte complète, et le code est désormais [hébergé dans notre monorepo](https://github.com/freesewing/freesewing), ce qui signifie que [notre dépôt dédié à freesewing.dev](https://github.com/freesewing/freesewing.dev) a été archivé.

Cet effort a permis de mettre en œuvre un certain nombre d'éléments de [notre feuille de route v3](https://github.com/freesewing/freesewing/discussions/1278) qui s'est transformée en une longue liste d'idées et de plans. Du haut de ma tête :

- Migrer vers NextJS
- Meilleure prise en charge des graphes ouverts
- Migrer le style vers TailwindCSS
- Migrer les articles de blog et les articles de vitrine vers Strapi
- Migrer la newsletter vers Strapi
- Déplace le contenu markdown dans monorepo & fusionne les projets de traduction Crowdin.
- Ajoute un point de terminaison au backend pour les images open graph générées automatiquement.

ont tous été mis en œuvre en tant que résultat direct ou effet secondaire de cet effort.

Ce site servira également de modèle pour la refonte de freesewing.org, qui est prévue pour cette année.

## Le programme de récompense des bugs de FreeSewing

Une fois de plus, [lisez notre newsletter](/newsletter/2022q1/) pour tout savoir, mais voici l'essentiel : Nous lançons maintenant le programme FreeSewing bug bounty :

> Si tu trouves un bogue dans l'un de nos modèles ou dans notre bibliothèque de base, nous t'ajouterons (avec ta permission) à notre liste de contributeurs et nous t'enverrons un petit quelque chose pour te remercier.

Alors garde l'œil ouvert, et si quelque chose ne te semble pas normal, [, fais-le nous savoir sur](https://discord.freesewing.org/) et nous t'enverrons des cadeaux.
