---
author: "joostdecock"
caption: "Ton nouveau fond d'écran de connexion pour le mois d'octobre"
date: "2017-09-30"
intro: "Voici ton récapitulatif mensuel de l'actualité freesewing des quatre dernières semaines, et un aperçu de ce qui t'attend le mois prochain."
title: "Récapitulatif mensuel - septembre 2017 : Les complications de Simon, les problèmes de messagerie et les dons sont en hausse cette année."
---

Voici ton récapitulatif mensuel de l'actualité freesewing des quatre dernières semaines, et un aperçu de ce qui t'attend le mois prochain.

## Retour sur septembre et un peu d'août
Pour cette première édition, je remonte un peu plus loin qu'un mois, car [ce site a été lancé à la fin du mois d'août](/blog/open-for-business/), et j'inclus donc cette semaine dans ce tour d'horizon mensuel.

### Je m'appelle Simon et je suis compliqué

Depuis le lancement, il y a eu [3 nouvelles versions de freesewing core](https://github.com/freesewing/core/releases) --- tu sais, la chose qui génère réellement tes patrons de couture --- et toutes étaient dues à des problèmes avec [le patron Simon Shirt](/patterns/simon).

Tous les détails sont disponibles sur [le changelog](https://github.com/freesewing/core/blob/develop/CHANGELOG.md), mais voici l'essentiel :


 -  La marge de couture à l'ourlet était incorrecte lorsque le lenthBonus était très bas.
 -  La coupe de la manche pour la patte de boutonnage était trop courte
 -  Il y avait un problème avec la marge de couture au niveau de la patte de boutonnage
 -  Le bonus de la longueur de la manche a été compté double
 -  Le tour de hanche n'a pas été pris en compte ; le tour de poitrine a été utilisé à la place.
 -  Un certain nombre d'options par défaut ont été modifiées


Merci à [Tatyana](/users/yrhdw) et [Stefan](/users/kczrw) pour avoir signalé ces problèmes. Tu obtiens ce badge d'insecte amusant :

![J'aime beaucoup celle-ci](https://posts.freesewing.org/uploads/badge_found_bug_d7d0c9055a.svg)

#### Quel est ton problème, Simon ?

Le fait que ces questions fassent surface chez Simon n'est pas une coïncidence. Le modèle est accompagné de 41 options qui te permettent de contrôler pratiquement tous les aspects de ta chemise.

La gestion de toutes ces différentes combinaisons dans le code entraîne une grande complexité. Et lorsque la complexité du code augmente, des bogues apparaissent.

![Si Simon était sur facebook, son statut relationnel serait certainement *C'est compliqué*](https://posts.freesewing.org/uploads/complicated_d8c872358d.gif)

#### Est-il temps de procéder à une révision ?
Simon est un portage du modèle Singular Shirt de MakeMyPattern.com. À l'époque, pour créer une chemise d'un style différent, il aurait fallu copier le code, y apporter des modifications, puis maintenir deux variations légèrement différentes pour l'éternité.

Les choses vont mieux ici, chez freesewing, où l'héritage est intégré au système. Je pourrais donc (et devrais peut-être) avoir un modèle de chemise de base, puis le décliner en plusieurs modèles de chemises de style différent.

 - Patron de base de corps Brian
   - Modèle de chemise de base
     - Modèle de chemise décontractée
     - Modèle de chemise formelle
     - Un autre modèle de chemise

Non seulement cela réduirait la complexité du code, mais ce serait aussi plus intuitif de voir un tas de modèles de chemises de styles différents, plutôt que de n'avoir qu'un seul modèle et de devoir jongler avec 41 options.

Une refonte complète de Simon va demander un peu de travail, mais c'est possible. J'aimerais connaître ton avis sur la question.


## Traiter les problèmes d'acheminement des courriels
J'ai ajouté une solution de contournement pour ceux d'entre vous qui ont eu du mal à recevoir les courriels d'inscription. En gros, les personnes qui ont un compte de messagerie géré par Microsoft.

![Si ces gars-là gèrent ta boîte de réception, alors qui sait quels autres courriels tu ne reçois pas.](msft.gif)

Tu peux lire [mon article de blog sur le sujet](/blog/email-spam-problems/) pour tous les détails, mais en gros, si tu as l'une de ces adresses, tu devrais recevoir ces courriels maintenant. Le seul inconvénient est que tu risques de les recevoir deux fois.

## Références
Lorsque des personnes créent un lien vers ton site et que les visiteurs cliquent sur ce lien, cela s'appelle une recommandation. Les blogueurs parmi toi sont peut-être habitués à parcourir leurs rapports Google Analytics pour voir qui a créé des liens vers eux.

Ce site n'utilise pas Google Analytics --- il y a [un article de blog avec des détails sur](/blog/privacy-choices/) aussi --- mais il capture quand même les références. La vue d'ensemble des renvois récents est disponible pour tous sur [la page de statut](/status).

La création de liens vers freesewing.org est évidemment une bonne chose, alors je garde un œil sur les renvois, et si un site appartenant à un utilisateur apparaît, tu reçois le badge Ambassadeur.

![Faire un lien vers freesewing.org est une façon de déverrouiller le badge d'ambassadeur.](https://posts.freesewing.org/uploads/badge_ambassador_3dd1e722cc.svg)

C'est une petite façon de te remercier d'avoir fait connaître le freesewing.

## Dons
Au cours du mois de septembre, nous avons dépassé le montant des dons de l'année dernière, c'est donc agréable de voir que je pourrai [envoyer plus d'argent à MSF](/about/pledge#donations-history) cette année qu'en 2016.

Tu peux toujours suivre l'évolution des dons sur [la page de promesses de dons](/about/pledge#donations-history), mais voici l'état actuel :

![Parfait ! Mieux que l'année dernière](https://posts.freesewing.org/uploads/donations_68e214d133.svg)

## Plus de formats de téléchargement

J'ai également ajouté des formats supplémentaires à la page de téléchargement du projet. Tu as maintenant le choix entre SVG, PDF, letter-PDF, tabloïd-PDF, A4-PDF, A3-PDF, A2-PDF, A1-PDF et A0-PDF.

## Le badge de contrôle de qualité
J'ai ajouté le badge de contrôle de qualité pour signaler (ou corriger) les fautes de frappe, les liens brisés, la grammaire et d'autres petites améliorations.

![Tu vois une faute de frappe ? Tiens-moi au courant et tu obtiendras ceci](https://posts.freesewing.org/uploads/badge_quality_control_6acb8c10c2.svg)

Ces contributions ne semblent peut-être pas bouleversantes, mais elles sont néanmoins importantes.

Entre travailler sans relâche sur le contenu parfait avant de le publier, ou le faire sortir rapidement avec toutes ses imperfections, je penche fortement pour la seconde option. Je compte donc un peu sur vous pour me faire savoir quand je me suis trompé.

## En attendant le mois d'octobre

Il y a 5 modèles sur lesquels je travaille actuellement. Et tous sont prêts au point où je dois les fabriquer pour vérifier qu'ils fonctionnent comme prévu. D'abord une mousseline, puis la vraie.

C'est un peu un goulot d'étranglement pour moi parce que j'ai un long trajet à faire, donc mon temps de couture est généralement limité aux week-ends.

Le seul moyen que je vois pour accélérer le processus de publication des patrons est de faire participer les gens aux tests des patrons. Je ne pense pas que ce soit quelque chose que je puisse demander aux gens de faire, parce qu'il s'agit de tests préliminaires. Sans compter que je n'ai rien à leur offrir pour adoucir le marché. Qu'est-ce que je vais te donner, un modèle gratuit ?

Néanmoins, au cas où certains d'entre vous voudraient aider en faisant une mousseline et en me faisant savoir comment cela s'est passé, voici ce qui est actuellement sur ma planche à dessin :

 - Un bloc de pantalons pour hommes qui devrait être meilleur que Theo(dore).
 - Un bloc pour les jeans selvedge pour hommes
 - Un sweat à capuche zippé pour les hommes
 - Un manteau d'hiver
 - Un modèle de jambières unisexe

Si l'un d'entre vous veut en faire un test, [, faites-le moi savoir](/contact), cela m'aiderait beaucoup. 

