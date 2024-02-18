---
author: 1
caption: "Fermerais-tu une voie de circulation parce qu'un conducteur mettrait sa musique trop fort ?"
date: "2017-09-07"
intro: "Merci pour rien Microsoft ; le courrier électronique ne devrait pas être si difficile."
title: "Merci pour rien Microsoft ; le courrier électronique ne devrait pas être si difficile."
---

Les personnes ayant une adresse électronique de Microsoft --- pense à Hotmail, MSN, live.com, outlook.com et leurs nombreuses variantes --- ont beaucoup moins de chances de s'inscrire sur ce site Web.

C'est parce que plus de 4 fois sur 10, ils ne reçoivent jamais l'email d'activation de leur compte.

## Qu'est-ce qui se passe ?

Voyons d'abord ce qui se passe. Voici un extrait pertinent des journaux :

````
Échec : postmaster@mg.freesewing.org -> ********@hotmail.co.uk 'Confirm your freesewing account' 
Réponse du serveur : 550 5.7.1 Malheureusement, les messages de [104.130.122.15] n'ont pas été envoyés. 
Contacte ton fournisseur d'accès à Internet car une partie de son réseau figure sur notre liste de blocage. 
````

Cela signifie qu'une partie du réseau MailGun figure sur leur liste de blocage. Par conséquent, ils (nous verrons plus tard de qui il s'agit) ne transmettent aucun message.

[MailGun](https://www.mailgun.com/) est un service de messagerie populaire pour les développeurs. Il est utilisé par ce site pour envoyer des courriels, comme les courriels d'activation de compte.

D'autres personnes utilisent également ce service, et peut-être que certaines d'entre elles, à un moment donné, ont envoyé des messages de spam par l'intermédiaire de mailgun sur . Ou alors, il s'agit simplement d'un type dont le nom de famille a tendance à déclencher les filtres anti-spam.

![Quelques autres clients de MailGun. Ce n'est pas vraiment un service douteux, n'est-ce pas ?](https://posts.freesewing.org/uploads/mailgun_19f315d4d6.png)

Le fait est que cette adresse IP ou l'une de ses voisines a donné à *une mauvaise réputation*. Cela arrive. Mais refuser catégoriquement d'accepter tout message de cet hôte (ou de tout un réseau d'hôtes) équivaut à fermer une voie d'autoroute (ou une autoroute entière) parce qu'une voiture sur cette voie a joué sa musique odieusement fort cette fois-là.

Ce qui m'amène à notre prochaine question :

## Qui ferait une chose pareille ?

Bonne question. Voici quelques chiffres :

![Un graphique de l'acheminement du courrier depuis le lancement de ce site.](https://posts.freesewing.org/uploads/emailgraph_d14d476efa.png)

Le graphique ci-dessus représente les courriels qui ont été envoyés depuis le lancement de ce site. La petite sous-section du graphique qui est rouge correspond aux courriels qui sont abandonnés.

Ce site Web envoie différents types d'e-mails :

 - L'email de confirmation du compte
 - Les *J'ai oublié mon mot de passe* emails
 - Notifications de réponse aux commentaires

Le graphique représente tous les courriels, mais je me concentre uniquement sur les courriels de confirmation de compte. Ce sont les plus importants après tout.

> À l'exception d'un message aberrant, tous les messages bloqués l'ont été par Microsoft.

Voici une liste de tous les domaines qui ont bloqué les courriels d'activation légitimes envoyés à leurs utilisateurs :

 - btinternet.com
 - hotmail.com
 - hotmail.co.uk
 - live.ca
 - live.com
 - live.com.au
 - live.nl
 - msn.com
 - outlook.com

À l'exception de la toute première entrée de la liste (sur laquelle un seul message a été bloqué), tous ces domaines sont des domaines Microsoft.

Permets-moi de reformuler cela : À part 1 cas aberrant, chaque message qui a été bloqué, l'a été par Microsoft.

## Quel est l'impact ?

Quel impact cela a-t-il sur les gens ?

Eh bien, à l'heure où j'écris ces lignes, il y a 817 utilisateurs enregistrés, et environ 80 % (661) ont également activé leur compte.

![Un nombre disproportionné d'activations en attente provient d'utilisateurs ayant une adresse e-mail gérée par Microsoft](https://posts.freesewing.org/uploads/activations_06987b6065.svg)

Parmi les personnes qui ont pu activer leur compte, moins de 1 % (6) ont une adresse électronique gérée par Microsoft. Dans le groupe des personnes qui n'ont pas, ou n'ont pas pu, activer leur compte, plus de la moitié ont une telle adresse.

Plus de 40 % des courriels de confirmation de compte sont tout simplement bloqués par Microsoft et, d'après le nombre d'activations, , il semble probable que même lorsqu'ils ne sont pas bloqués au niveau du relais SMTP, ils sont filtrés quelque part en aval.

Dans l'état actuel des choses, il semble presque impossible pour l'utilisateur moyen de hotmail/outlook/live/MSN/... de s'inscrire sur ce site.

## Que pouvons-nous faire ?

J'ai choisi mailgun pour plusieurs raisons. Le fait de ne pas avoir à gérer le SMTP soi-même simplifie le code. Le fait de ne pas dépendre d'un deamon SMTP local rend le code plus portable, et MailGun a un tas de fonctionnalités sympas qui te permettent de faire des choses comme répondre à des commentaires par e-mail.

Les méthodes rudimentaires de filtrage des spams de Microsoft n'invalident aucune de ces raisons.

Utiliser MailGun signifie utiliser leurs relais SMTP, et être à la merci de la réputation de ce relais. La seule façon de contourner ce problème est de configurer un relais dédié dans MailGun afin que le trafic de freesewing.org soit protégé de et que nous devenions maîtres de notre propre réputation.

![59 $ par mois ? Peut-être pas](https://posts.freesewing.org/uploads/pricing_52f0e817cb.png)

Pour ce privilège, MailGun facture 59 dollars par mois, soit 708 dollars par an. Je t'invite à jeter un coup d'œil sur [l'historique des dons](/about/pledge#donations-history), et tu comprendras que cela n'arrivera pas non plus.

Je pourrais contester la liste de blocage et essayer de faire débloquer le relais. Mais c'est se battre contre des moulins à vent quand l'hôte n'est pas sous mon contrôle. Sans compter que MailGun n'a pas qu'un seul hôte.

Il semble que je sois à court d'options et franchement à court de patience.

## Ce que je vais faire

Microsoft est un mastodonte, et je ne suis qu'un gars. Je ne peux pas les combattre sur ce point. À moins que je ne leur Titanfall le cul.

![Bloque ça, salope](https://posts.freesewing.org/uploads/titanfall_cb5a210468.gif)

Penses-tu que Gmail est parfois utilisé de façon abusive pour envoyer des spams ? Tu sais que c'est le cas. Penses-tu qu'ils bloqueront un jour tous les courriels provenant de Gmail ? Tu sais qu'ils ne le feront pas.

Hier soir, j'ai donc apporté quelques modifications pour contourner le problème. Si tu as une adresse e-mail *problemtic* , en plus de l'e-mail habituel, ce site enverra un deuxième e-mail par l'intermédiaire de Gmail.

J'aimerais qu'ils bloquent cela.

> ##### Problèmes d'inscription ? De l'aide est disponible
> 
> Si tu as (encore) des problèmes pour t'inscrire, n'hésite pas à [et à prendre contact avec](/contact).

