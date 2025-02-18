---
author: "joostdecock"
caption: "Ton nouveau fond d'écran de connexion pour le mois de février"
date: "2018-01-31"
intro: "Voici ton récapitulatif mensuel de l'actualité freesewing des quatre dernières semaines, et un aperçu de ce qui t'attend le mois prochain."
title: "Tour d'horizon mensuel - janvier 2018 : Inkscape DPI, prise de conscience des versions, Bail et Carlita"
---

Voici ton récapitulatif mensuel de l'actualité freesewing des quatre dernières semaines, et un aperçu de ce qui t'attend le mois prochain.

## Retour sur le mois de janvier
![Plus comme ce mois-ci](https://posts.freesewing.org/uploads/coffee_3f501d4076.gif)

C'est peut-être [le temps déprimant qui bat des records dans mon coin de pays ](https://www.theguardian.com/world/2018/jan/19/aint-no-sunshine-winter-darkest-europe), mais j'ai l'impression que le mois de janvier m'a fait beaucoup souffrir. Voyons donc si nous avons au moins quelque chose à montrer pour cela.

### Le dilemme des unités par défaut d'Inkscape

Au début de l'année, nous avons déployé la version 1.3.0 de Core pour résoudre le problème [#204](https://github.com/freesewing/core/issues/204) alias le dilemme des unités par défaut d'Inkscape.

Il s'agit d'une correction un peu inhabituelle car nous avons été contraints par les changements effectués en amont par les développeurs d'Inkscape ( ). De plus, nous n'avons pas seulement dû adapter notre code, mais nous avons également dû rétroporter les modifications à tous tes brouillons existants.

Si tu n'étais pas du tout au courant, nous avons écrit un article de blog à ce sujet : [Freesewing core v1.3.0 est sorti ; Il contient des corrections tellement bonnes que nous les avons rétroportées sur tous vos brouillons](https://joost.freesewing.org/blog/core-v1.3.0-is-out/).

### Connaissance de la version

Nous gardons maintenant la trace de la version de Core qui a généré ton brouillon. Nous mettons en place des correctifs et des améliorations sur en permanence. Ainsi, les brouillons que tu as stockés dans ton profil risquent d'être périmés.

Tu en es désormais informé, à la fois sur la page du projet lui-même et sur ta liste de projets. Un simple remaniement les mettra à niveau vers la dernière version.

> ##### Vision à long terme pour le versioning
> 
> Cette solution est un progrès par rapport à la situation précédente, mais elle ne permet pas un contrôle de version très granulaire. Si tu as 10 versions différentes de Simon stockées dans ton profil, et que nous changeons le numéro de version du noyau parce que nous avons apporté une modification à Carlton, toutes tes versions sont marquées comme étant dépassées, même si les changements ne les affectent pas.
> 
> Avec un seul numéro de version du noyau sur lequel nous pouvons compter, il n'y a pas de moyen évident pour nous de suivre les changements qui ont un impact sur tel ou tel modèle.
> 
> Le plan à long terme est d'avoir un numéro de version du noyau et un numéro de version du modèle. De cette façon, une bosse de version dans un modèle n'aura pas d'impact sur les autres modèles. 
> 
> Un changement de version dans le noyau aura toujours un impact sur tous les modèles, mais il devrait y avoir beaucoup moins de versions du noyau une fois que nous aurons retiré tous les modèles du noyau.
> 
> L'idée est que chaque modèle sera dans son propre dépôt, et nous utiliserons composer pour les gérer comme des dépendances. 
> 
> Mais c'est une idée à long terme qui ne sera pas mise en œuvre avant que nous ayons réécrit le noyau. Oui, c'est une autre idée à long terme.

### Caution pour la gestion des erreurs

Au cours de la première moitié du mois, nous avons essayé Rollbar pour la gestion des erreurs et la création de rapports. Bien que nous aimions la fonctionnalité qu'elle offrait, nous n'étions pas très heureux de l'impact possible sur ta vie privée de l'envoi de ce type de données à une tierce partie.

Nous avons donc décidé d'écrire notre propre arceau de sécurité du pauvre, appelé Bail. Bail est maintenant utilisé dans nos données et dans les backends de base, donc lorsque des choses se cassent, nous le savons.

Cet effort a également conduit à une quête parallèle de deux semaines pour écrire des tests pour notre backend de données. Tous les détails : [Présentation de la caution freesewing : L'arceau de sécurité du pauvre --- parce que la vie privée](/blog/introducing-bail/)

### Carlita est ici

Il y a quelques jours, nous avons publié le manteau Carlita [](/patterns/carlita), la version femme de notre manteau Carlton.

Si tu t'es précipité pour mettre la main sur Carlita, il est bon de savoir qu'elle a été publiée sur dans le cadre de la version 1.6.0 et que nous en sommes maintenant à la version 1.6.3, ce qui est principalement dû à des corrections et à des ajustements dans Carlton/Carlita.

Si tu as une version antérieure du modèle, merci de la reformuler. Si tu as déjà imprimé , jette peut-être un coup d'œil à [le journal des modifications](https://github.com/freesewing/core/blob/develop/CHANGELOG.md) pour savoir ce qui a changé.

Si tu vérifies le journal des modifications, tu verras aussi que nous avons commencé le mois avec la version 1.2.9 et que utilise maintenant la version 1.6.3, donc je ne pense pas que ce soit juste une idée que le mois a été très chargé.

## En attendant le mois de février

Février est un mois court, il est donc probablement préférable de gérer les attentes. Mais voici ce que j'ai en tête pour elle :

### Documentation Carlton/Carlita

Franchement, c'est un peu comme si je m'arrachais les dents, alors ne t'attends pas à ce que ce soit terminé pour fin février, mais je devrais au moins avoir progressé sur la documentation pour les patrons Carlton et Carlita.

Dans le même ordre d'idées, la popularité croissante de ce site signifie que je suis beaucoup plus occupé par diverses questions, et de petits problèmes qui requièrent mon attention.

Tous ces commentaires sont une bonne chose car c'est ainsi que nous améliorons les choses ici. Mais je remarque qu'il devient de plus en plus difficile de consacrer une plus grande partie de son temps à une chose spécifique. Ce qui est vraiment ce dont tu as besoin lorsque tu t'attaques à des tâches plus importantes telles que la rédaction de la documentation ou la conception de nouveaux modèles.

Je n'ai pas vraiment de solution pour cela, je fais juste le constat.

### Peut-être une sortie de Blake Blazer

J'ai un modèle de veste sur ma planche à dessin qui est là depuis l'été (il s'appelle le Blazer Blake). Je devrais vraiment prendre le temps de l'emballer et de le publier, mais j'ai hésité à le faire parce que je n'arrive pas à trouver le temps de faire la veste.

J'ai déjà utilisé ce modèle pour [mes refashioners font cette année](/blog/the-refashioners-2017/), mais ce n'est pas exactement un exemple très représentatif.

Je ne pense pas trouver le temps de faire une veste en février, mais peut-être qu'une mousseline est suffisante pour la publier en version bêta.

### FOSDEM

![Tous les détails sur fosdem.org](https://posts.freesewing.org/uploads/fosdem_bb321397cc.png)

[FOSDEM](http://fosdem.org/) --- la réunion européenne des développeurs de logiciels libres et open source --- a lieu le premier week-end de février à Bruxelles.

Je prévois d'y être le dimanche, alors si tu y participes aussi, fais-le moi savoir ou viens me dire bonjour.

