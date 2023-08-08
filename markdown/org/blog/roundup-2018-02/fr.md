---
author: "joostdecock"
caption: "Ton nouveau fond d'écran de connexion pour le mois de mars"
date: "2018-02-28"
intro: "Voici ton récapitulatif mensuel de l'actualité freesewing des quatre dernières semaines, et un aperçu de ce qui t'attend le mois prochain."
title: "Tour d'horizon mensuel - février 2018 : Core 1.7.0 avec les améliorations de Sven, Carlton et Carlita. Plus GDRP, vim et Jaeger"
---

Voici ton récapitulatif mensuel de l'actualité freesewing des quatre dernières semaines, et un aperçu de ce qui t'attend le mois prochain.

## Retour sur le mois de février

J'avais cette ambition secrète de sortir un nouveau patron chaque mois cette année. Nous ne sommes qu'en février et ce plan semble déjà avoir déraillé.

Examinons les choses qui se sont passées en février avant de parler de ce qui ne s'est pas passé.

### Core v1.7.0 est disponible

Plus tôt dans la journée, j'ai appuyé sur la gâchette pour la version de base 1.7.0. Comme d'habitude, [le changelog](https://github.com/freesewing/core/blob/develop/CHANGELOG.md#170) contient toutes les informations, mais les plus importantes pour les utilisateurs sont [les nouvelles options de côtes dans le motif Sven](/docs/patterns/sven/options#ribbing), ainsi que un tas d'améliorations supplémentaires pour Carlton/Carlita.

Ces améliorations de Carlton/Carlita sont dues au fait que moi-même et [Anneke](/showcase/maker/annekecaramin) avons commencé à travailler sur [la documentation pour ces modèles](/docs/patterns/carlton/). Et chaque fois que nous écrivons quelque chose comme *appliquer de l'entoilage thermocollant ici*, nous retournons également au modèle pour marquer exactement l'endroit où l'entoilage thermocollant doit être placé.

Inutile de dire que c'est un travail considérable. Mais il devrait aider à la construction de ces patrons de manteaux, surtout pour les personnes dont c'est la première fois qu'elles font un manteau.

### Plan de bataille GDPR

Je ne veux pas donner l'impression qu'écrire un article de blog relève de l'exploit de nos jours, mais je pense que [notre *plan de bataille GDRP* article de blog](/blog/gdpr-plan) vaut la peine d'être mentionné parce que ce sont des développements importants, et la charge de travail que cela génère est significative.

Bien que rien ne soit encore coulé dans le béton, le billet présente notre plan pour aborder la conformité au RGPD, quelque chose sur lequel nous nous concentrerons dans les prochains mois.


### Snippets de Vim pour le noyau de freesewing

Dans [un billet de blog qui est l'incarnation du terme *niche*](/blog/core-vim-snippets) nous avons annoncé la disponibilité d'un plugin vim qui fournit des snippets spécifiques au core en libre accès.

En gros, SI tu veux développer des modèles et SI tu utilises l'éditeur vim, ils sont faits pour toi.

On peut dire que cela fait beaucoup de "si".

### Jaeger en avant-première

Voici Jaeger, le modèle de manteau de sport que j'espérais sortir ce mois-ci.

![Jaeger est prêt, mais je n'en ai pas encore fait un.](jaeger.png")

Ceux d'entre vous qui ont une bonne mémoire se souviennent peut-être que j'ai mentionné le mois dernier que j'allais peut-être publier ceci au cours du mois de février. Bien qu'à l'époque, il portait encore un autre nom.

Comme je l'avais également prévu le mois dernier, je n'ai pas trouvé le temps pour en faire un. En fait, ce qui me pose le plus de problèmes dans la conception de nouveaux patrons, c'est de trouver le temps pour les réaliser. Ce qui est d'autant plus problématique avec un modèle aussi impliqué qu'une veste. À vrai dire, je ne sais toujours pas où j'ai trouvé le temps de confectionner ce manteau Carlton.

Bref, tout ça pour dire que le patron est prêt, sauf que je n'en ai jamais fait la dernière version. Et j'ai l'impression que je ne peux pas le libérer comme ça.

Donc, si tu souhaites faire une mousseline de ceci --- ou même la vraie --- fais-le moi savoir dans les commentaires de , et je m'assurerai que nous t'envoyons une ébauche.

Cela pourrait aussi aider à faire avancer la publication de ce patron, car je sais déjà que je n'aurai pas beaucoup de temps pour travailler sur une veste le mois prochain.

A ce propos...

## En attendant le mois de mars

J'ai deux semaines de vacances en mars (Youpi !) dont la plus grande partie à Bangkok (encore Youpi !).

Cela signifie que je ne ferai pas beaucoup de couture le mois prochain, mais il devrait y avoir un peu de temps de qualité pour moi et mon ordinateur portable, . J'ai donc voulu m'attaquer à l'un des points les plus importants de ma liste de choses à faire à mi-parcours.

Mon plan initial était de réécrire le noyau, tu peux trouver quelques détails [dans ce ticket sur le sujet](https://github.com/freesewing/core/issues/236).

Cependant, en regardant les mois à venir, la question la plus pressante est cette échéance imminente du GDPR en mai, qui nécessitera également beaucoup de travail.

Je me suis donc dit qu'il serait plus logique de s'attaquer à une autre chose sur la liste des grands objectifs : réécrire l'interface utilisateur.

Plutôt que d'ajouter encore une autre pile de code jQuery pour gérer tous les trucs GDPR, l'idée est de forker le frontend et de le porter sur [vue.js](https://vuejs.org/). Pour cela aussi, [il y a une question ouverte dont tu peux suivre l'évolution](https://github.com/freesewing/site/issues/311).

Étant donné que je n'ai aucune expérience avec vue.js, cela devrait être amusant. Si tu souhaites apporter ton aide, laisse un commentaire.

