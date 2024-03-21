---
author: 1
caption: "Je ne bois pas, mais cela m'a semblé approprié pour un post de célébration ¯_(ツ)_/¯."
date: "08-25-2018"
intro: "C'est le premier anniversaire de freesewing.org : Annonce la bibliothèque freesewing"
title: "C'est le premier anniversaire de freesewing.org : Annonce la bibliothèque freesewing"
---


Il y a exactement un an, les portes de freesewing.org s'ouvraient pour nos utilisateurs, tandis que ceux de makemypattern.com recevaient l'un de ces panneaux *nous avons déménagé* .

En regardant [ce billet de blog datant d'il y a 12 mois](/blog/open-for-business), , il est presque difficile de croire que les choses annoncées à l'époque n'ont qu'un an. Le concept de brouillon, la fonctionnalité de comparaison, ou même les modèles sans papier. Ils fêtent tous leur premier anniversaire aujourd'hui.

Mais pas ce site, car [, poussés par la date limite imminente du GDPR](/blog/gdpr-plan), nous avons abandonné notre site basé sur Jekyll pour un nouveau front-end au mois de mai.

## Plus de langues avec moins de langues

Le GDPR n'était qu'une partie de cette histoire. Les autres raisons de la réécriture étaient notre désir de prendre en charge plusieurs langues, et de simplifier notre pile technologique.

En d'autres termes, nous voulions atteindre des personnes qui parlent des langues différentes, et voulions limiter le nombre de langages de programmation nécessaires pour y parvenir.

### Plus de langues naturelles

Nous avons remarquablement bien réussi sur ce plan. Même si tu ne trouveras pas tout le contenu traduit, les principales caractéristiques de ce site Web sont maintenant disponibles en cinq langues :

 - Anglais
 - Allemand
 - Espagnol
 - Français
 - Néerlandais

Ce qui est vraiment 100% grâce au bon travail de [nos merveilleux traducteurs](/i18n/).

### Moins de langages de programmation

Le passage de [Jekyll]() à [Nuxt](https://nuxtjs.org/)- basé sur un front-end a supprimé [Ruby](https://www.ruby-lang.org/) de notre pile technologique. Freesewing.org fonctionne maintenant avec JavaScript, PHP et un peu de C (que nous ignorerons pour l'instant).

Mais supprimer les langages de programmation n'est pas un objectif *an sich*. L'ambition sous-jacente est plutôt de simplifier les choses, de permettre aux gens de s'impliquer plus facilement sur et, en fin de compte, d'attirer plus de contributeurs pour que le projet puisse grandir et s'épanouir.

Aujourd'hui, concevoir/développer des modèles n'est pas un obstacle insurmontable. Nous avons [benjamin](/patterns/benjamin), [florent](/patterns/florent), et [sandy](/patterns/sandy) pour le prouver. Tous ces modèles ont été créés par des personnes qui ne connaissaient pas freesewing au départ, , qui ont suivi le tutoriel de conception et qui ont fini par créer leur propre modèle.

Nous aimerions que davantage de personnes suivent leurs traces. C'est pourquoi rendre le processus aussi simple que possible ( ) est un investissement digne de notre temps.

## Annonce le freesewing, la bibliothèque

Au cours des deux derniers mois, j'ai pris congé de la création de patrons et de la couture pour m'attaquer à notre [dette technique](https://en.wikipedia.org/wiki/Technical_debt).

Plus précisément, j'ai entrepris de réécrire notre back-end de base en JavaScript. Mais il y a un hic. Ce n'est plus un back-end. C'est une bibliothèque que tu peux utiliser dans ton navigateur ou sur le serveur avec [node.js](https://nodejs.org/).

Il en est actuellement à la version 0.10, et ses fonctionnalités sont complètes avec le noyau freesewing. Il est [disponible sur GitHub](https://github.com/freesewing/freesewing) et [NPM](https://www.npmjs.com/package/freesewing), et est entièrement documenté sur [developer.freesewing.org](https://developer.freesewing.org/).

Et bien que son API soit plus riche que celle de Core, son empreinte est en fait beaucoup plus petite :

![Comparaison des lignes de code entre la nouvelle bibliothèque et (la partie concernée de) freesewing core](https://posts.freesewing.org/uploads/corevsfreesewing_c9327c9fa3.svg)

Ce qui est une bonne nouvelle, au cas où tu te poserais la question.

## Que se passe-t-il ensuite ?

Il reste encore beaucoup de travail à faire avant de pouvoir l'utiliser sur freesewing.org :


 - Tous nos modèles existants doivent être adaptés à la version JS. [Brian](https://github.com/freesewing/brian) est le premier modèle à avoir été porté.
 - Réécris notre back-end de données en JS. Puisque cela supprimera le langage de programmation PHP de notre pile.
 - Construis un nouveau site web en utilisant la bibliothèque freesewing et notre nouveau back-end de données.

C'est vraiment beaucoup de travail, et même si j'espère que d'ici la fin de l'année nous aurons fait de bons progrès, je ne peux pas te promettre que ce sera fait.

## Mais je veux juste des modèles

Il y a de fortes chances que tout ce qui t'intéresse, ce sont les modèles. Ce que tu veux, c'est plus de modèles, de meilleurs modèles, des modèles différents. Et toute cette réécriture n'est pas exactement en train de pousser tes boutons.

Je comprends cela. C'est vraiment le cas. Pour ma part, j'ai une liste de patrons que j'aimerais voir ajoutés au site. Et mon travail sur d'autres aspects du projet m'empêche de les ajouter.

Mais je crois qu'investir maintenant dans une expérience simplifiée pour les développeurs aura un effet d'entraînement à long terme.

Si nous voulons quelques motifs supplémentaires, ce n'est pas la bonne approche. Mais si nous voulons beaucoup plus de modèles, je crois que c'est le cas.

Et je veux beaucoup plus de modèles.

