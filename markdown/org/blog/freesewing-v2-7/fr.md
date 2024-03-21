---
author: 1
caption: "Photo par Deeana crée à partir de Pexels"
date: "2020-07-12"
intro: "Nous venons de publier FreeSewing v2.7 🎉"
title: "FreeSewing v2.7 : Titan, modifications des mesures et une longue liste d'améliorations"
---


Nous venons de publier FreeSewing v2.7 🎉

Il y a beaucoup de travail dans cette version, et, malheureusement, cela causera aussi quelques erreurs à vos modèles et à vos personnes existantes, mais c'est pour la bonne cause.

Regardons ce qui est nouveau :

## Bloc de pantalon Titan

J'ai perdu le nombre de fois où j'ai commencé à travailler sur un pantalon au cours des dernières années. C'est quelque chose qui est resté sur ma liste de tâches pendant longtemps, mais malgré plusieurs tentatives de m'y mettre, je n'avais pas réussi à parvenir à quelque chose dont j'étais satisfait.

C'est parce que la conception de patrons de pantalon est difficile. S'assurer que tout tombe bien, tout en garantissant également que les coutures d'intérieur, d'extérieur et la couture de fourche soient toutes les mêmes longueurs n'est pas une mince affaire. Surtout si vous voulez un patron qui s'adapte parfaitement aux différentes tailles et modèles.

Il serait probablement resté sur ma liste de tâches un peu plus longtemps, mais en février, Debra m'a tendu la main et nous avons réussi à sortir un pantalon ensemble. J'aime faire équipe avec des gens parce que c'est un excellent moyen de rester motivé, donc au cours des 4 prochains mois ou plus, nous avons travaillé sur ce que Debra a nommé [Titan](/designs/titan/), un bloc de pantalon unisexe sans pinces. Je tiens à la remercier pour sa patience et ses contributions à faire de Titan un succès

<Note>

###### Aidez-nous : Fabriquer une toile de Titan 

Un bloc est juste cela, un bloc ou un patron de base. Nos prochaines étapes sont évidemment de l'utiliser pour servir de base pour un certain nombre de patron de pantalon différents. Avant d'y arriver, nous aimerions voir comment Titan s'adapte sur une variété de corps.

Donc, si vous pouviez réaliser une toile d'un Titan sur mesure et nous faire savoir comment il tombe, ce serait merveilleux.

</Note>

## La pente de l'épaule — encore — et d'autres modifications aux mensurations

Nous avons modifié les différentes mesures du site. Cela se présente en 3 principales catégories :

 - Nous avons fait de la *taille * la base des mesures verticales
 - Nous avons changé la mesure de la pente des épaules
 - Nous avons simplifié la langue et les termes

En conséquence, certaines mesures verticales qui n'étaient pas basées sur la taille ne sont pas parties (les hanches au haut de la jambe par exemple). D'autres mesures ont été renommées pour simplifier les choses, mais à moins que vous ne soyez un développeur, vous n'avez pas à vous en soucier.

Un changement important est celui que nous avons fait pour la mesure de la pente des épaules. C'est historiquement une mesure difficile à mesurer, et les changements que nous avons faits précédemment pour essayer de résoudre ce problème étaient rétrospectivement une mauvaise idée.

Nous l'avons à nouveau changé, mais cette fois-ci, la pente des épaules est mesurée comme on s'attendrait à ce qu'une pente soit mesurée : en degrés.

Cela nécessitait quelques changements car jusqu'à présent, toutes les mesures utilisaient les mêmes unités, mais les choses devraient être ok maintenant.

À la suite de toutes ces modifications et mesures, il y a deux choses que vous devez savoir :

 - Les personnes que vous avez dans votre compte verront leurs mesures mises à jour (lorsque juste les noms ont changé) ou supprimées (lorsque la mesure n'est plus utilisée, ou nous avons changé la façon de le mesurer)
 - Les patrons que vous avez enregistrés dans votre compte qui utilisent certaines des mesures modifiées ne fonctionneront plus. Cependant, nous les avons conservées dans votre compte afin que, si vous le souhaitez, vous puissiez extraire les données et les retracer avec les nouvelles mesures. N'hésitez pas à nous contacter si vous avez besoin d'aide pour cela.

<Tip>

Nous avons migré notre code (backend) vers ces nouvelles mesures, mais il est probable que vous ayez encore en cache certaines choses anciennes dans votre profil.  
Pour contourner ce problème, vous devriez probablement [recharger votre compte](/account/reload/).

</Tip>

## Changements du frontend

Nous avons également apporté quelques modifications au site Web.

 - Nous avons ajouté un [guide de notation des patrons](/docs/about/notation/) pour aider à la compréhension de la signification de ces marquages sur votre patron.
 - Nous avons ajouté une page [recharger le compte](/account/actions/reload/) pour vous aider à éviter des problèmes liés aux données du compte mises en cache
 - Nous avons changé le style des différentes tailles lorsque vous comparez un patron, et nous avons aussi inclus une légende montrant quel trait correspond à quelle taille.


## Et bien d'autres changements sous le capot

Comme je l'ai dit, beaucoup de travail a été effectué dans cette version. Consultez notre [journal des modifications Monorepo](https://github.com/freesewing/freesewing/blob/develop/CHANGELOG.md) pour tous les détails.

