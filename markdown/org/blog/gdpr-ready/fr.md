---
author: 1
caption: "Le changement le plus important est évidemment que nous sommes passés du violet au noir comme couleur emblématique"
date: "24-05-2018"
intro: "Bienvenue sur notre nouveau site Internet. Il est conforme au GDPR, parle 3 langues et sent la peinture mouillée"
title: "Bienvenue sur notre nouveau site Internet. Il est conforme au GDPR, parle 3 langues et sent la peinture mouillée"
---


Demain, 25 mai, le règlement général sur la protection des données (RGPD) de l'Union européenne (UE) entre en vigueur. À partir de ce jour, les entreprises qui ne respectent pas la vie privée des citoyens de l'UE s'exposent à des amendes pouvant aller jusqu'à 4 % de leur chiffre d'affaires annuel mondial.

Cette date marque un tournant décisif pour la protection de la vie privée en ligne, , car les lois les plus strictes du monde en matière de protection des données s'appliquent soudain à un demi-milliard de personnes.

## Ton consentement est maintenant requis

Pour le freesewing, le déploiement du GDPR ne pose pas de problème en tant que tel. Non seulement nous avions un plan solide, mais la seule chose que nous devions absolument ajouter au site était *consent*. Nous ne sommes plus autorisés à traiter tes données sans ton autorisation. Permission que nous devrions demander à la fois de façon explicite et granulaire.

Nous avons donc deux types de questions à te poser :

 - Donnez-vous votre consentement pour traiter vos données de profil ?
 - Donnez-vous votre consentement pour traiter vos données de modèle ?

Nous faisons la distinction parce qu'il s'agit de choses différentes. Un profil/compte est nécessaire pour se connecter au site, poster des commentaires, etc.  
Les données du modèle sont nécessaires pour générer des patrons de couture sur mesure.

Tu seras accueilli par ces questions lorsqu'elles seront pertinentes (c'est-à-dire lorsque nous aurons besoin d'accéder à ces données spécifiques), et tu pourras les consulter à tout moment [dans les paramètres de ton compte](/account).

## Il est de notre devoir de t'informer

En vertu du GDPR, nous devons t'informer sur la façon dont nous traitons les questions de confidentialité. Nous avons déjà écrit sur [notre approche de la vie privée](/blog/privacy-choices) , mais ceci nécessite quelque chose d'un peu plus formel.

Nous avons donc rédigé un avis de confidentialité [](/privacy) qui décrit toutes ces choses.

En plus de notre avis de confidentialité, nous avons créé [une page qui énumère tous tes droits](/rights), et explique comment tu peux les exercer.

Avec ces changements, nous avons couvert ton droit à être informé.

## Respect de la vie privée dès la conception

L'une des exigences les plus vagues mais ayant un impact sur le GDPR est ce que l'on appelle *privacy-by-design*. Nous avons pris le conseil à cœur et avons effectué deux changements inspirés par cela :

 - Chiffrement des données stockées
 - Résiliation des comptes dormants

Nous cryptons désormais les données de ton profil au repos. En d'autres termes, notre base de données contient tes informations, mais elles sont cryptées. Nous ne le décryptons que lorsque nous en avons besoin.

Nous résilierons également les comptes qui sont restés inactifs pendant 12 mois. En d'autres termes, si tu ne te connectes pas sur le site pendant 1 an, ton compte et toutes tes données seront supprimés.

Cependant, pour ce dernier point, il y aura un peu de temps de grâce car nous n'avons pas encore mis en œuvre tous les changements requis. Ce qui m'amène à mon prochain point :

## Nouveau aussi : tout le reste

Ces changements liés au GDPR semblaient être une bonne occasion de revisiter certains des choix que nous avons faits, et de voir s'il y avait matière à amélioration. C'était en tout cas l'idée de départ. En fin de compte, nous avons complètement réécrit le site Web à partir de zéro.

Notre site Web précédent utilisait [Jekyll](https://jekyllrb.com/) comme générateur de site statique, avec une pile de code javascript pour ajouter les éléments dynamiques au site. Bien que cela ait fait l'affaire, il y avait deux inconvénients importants :

 - Jekyll utilise le langage de programmation Ruby. C'est un autre langage de programmation, un autre gestionnaire de paquets et un autre écosystème que les contributeurs potentiels doivent comprendre. Nous voulions éviter cela.
 - Cette pile ** de code JavaScript était plutôt littérale. La maintenabilité commençait à devenir un problème, sans compter qu'il serait difficile pour les nouveaux développeurs de se lancer et de comprendre ce qui se passe.

Alors, pour faire d'une pierre deux coups, nous avons réécrit tout le site en utilisant [Vue.js](https://vuejs.org/) et [Nuxt](https://nuxtjs.org/). Tout notre frontend est désormais écrit en JavaScript - plus besoin de Ruby - et grâce à la nature modulaire de Vue et à son approche basée sur les composants, il devrait être beaucoup plus facile à maintenir.

## Internationalisation, alias i18n

Évidemment, en réécrivant les choses, nous avons ajouté quelques nouvelles fonctionnalités. La plus évidente est que nous prenons désormais entièrement en charge l'i18n (internationalisation).

Bien que la traduction soit une entreprise en cours, nous avons tout mis en place pour la soutenir. À partir d'aujourd'hui, freesewing n'est plus exclusivement disponible en anglais, mais aussi en néerlandais et en espagnol.

J'aimerais remercier [@AnnekeCaramin](/users/annekecaramin) et [@AlfaLyr](/users/alfalyr), nos coordinateurs linguistiques pour le néerlandais et l'espagnol respectivement, mais aussi toutes les autres personnes qui ont aidé à la traduction.

Une vue d'ensemble de l'état des différentes langues est disponible [ici](/i18n), et j'espère que nous pourrons bientôt activer davantage de langues.

## Attention à la peinture mouillée

On peut dire que cette publication est un peu prématurée. Nous avons encore [quelques problèmes à résoudre](https://github.com/freesewing/site/issues), et il nous manque beaucoup de documentation.

Cependant, comme notre délai est imposé de l'extérieur, nous n'avons pas vraiment le choix. C'est-à-dire si nous voulons être pleinement conformes au GDPR, et c'est le cas.

Alors, sois indulgent avec nous pendant que nous continuons à construire ce site Web et notre plateforme. Et n'hésite pas à nous faire savoir quand quelque chose ne va pas.

