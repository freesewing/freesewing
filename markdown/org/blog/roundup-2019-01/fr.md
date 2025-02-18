---
author: "joostdecock"
caption: "Ton arrière-plan de connexion pour le mois de février"
date: "2019-01-31"
intro: "Est-ce vraiment la fin du mois de janvier ? Déjà ?"
title: "Récapitulatif mensuel - janvier 2019 : la grande mise à jour de la bêta."
---


Est-ce vraiment la fin du mois de janvier ? Déjà ?

Après avoir profité des vacances de Noël pour porter [Simon](/en/patterns/simon) - n'étant pas exactement le motif le plus trivial - je suis assez confiant dans le fait que tous les motifs seront corrects. Simon a 61 options, donc si ça marche pour Simon, ça marchera pour tous les patrons, ou du moins c'est comme ça que je le vois.

Sept modèles ont maintenant été portés. Cela peut sembler peu, mais cela devient plutôt fastidieux chaque fois que nous faisons un changement qui touche les modèles, car nous en avons alors 7 à mettre à jour. J'ai donc décidé de mettre le portage des patrons en attente pendant un certain temps, et de concentrer mon attention sur [notre nouveau site Web bêta](/en/).

## Gatsby est maintenant notre générateur de sites statiques

Le nouveau site web est construit au-dessus de [Gatsby](https://www.gatsbyjs.org/), un générateur de site statique écrit en JavaScript et alimenté par [React](https://reactjs.org/). Nous nous sommes beaucoup engagés dans [l'architecture JAMstack](/en/blog/freesewing-goes-jamstack) ici à freesewing.org.

C'est notre troisième réécriture du site depuis que nous avons lancé freesewing.org et j'avoue que c'est un peu beaucoup. J'espère vraiment que le site que nous sommes en train de construire restera en place pendant un certain temps.

Mais encore une fois, les itérations rapides sont une bonne chose, d'autant plus que nous étions encore en train de trouver nos marques. Nous faisons ce qu'il faut pour bien faire, et bien que la question de *quel est le but de tout cela* soit peut-être dans l'esprit de certains d'entre vous, j'ai l'impression que beta.freesewing.org est arrivé à un point où il répond à cette question.

## (presque) tout se passe maintenant dans ton navigateur

Nous avons réécrit notre plateforme en JavaScript. Cette chose qui fonctionne dans ton navigateur. Auparavant, lorsque tu voulais changer le style de tes manchettes ou autre, nous avions besoin de pour envoyer tes souhaits à un backend, qui générait alors un projet et le renvoyait.

Maintenant, lorsque tu modifies une option, nous n'avons pas besoin de faire un aller-retour vers un backend pour te montrer à quoi ressemblent les choses. Parce que tout fonctionne dans ton navigateur. Ainsi, si tu changes quelque chose, , la mise à jour se fait directement sur ton écran.

C'est en quelque sorte ce que nous avions en tête depuis le début, mais c'est toujours un moment fort lorsque toutes les pièces commencent enfin à se mettre en place et que les choses fonctionnent vraiment.

Cela dit, tout ne fonctionne pas encore dans le navigateur. La transformation de tes modèles en PDF est quelque chose que nous gérons en arrière-plan, car nous travaillons toujours sur sur cette partie.

## Aucun compte n'est nécessaire

Notre [nouvelle démo](https://beta.freesewing.org/en/demo) te permet d'essayer sans avoir besoin de t'inscrire. Lors de l'inscription, il n'est pas nécessaire de créer un compte avec un mot de passe, car prend désormais en charge l'inscription avec ton compte Google ou GitHub existant.

Les personnes qui ont déjà un compte pourront se connecter avec leur compte Google ou GitHub, à condition que l'adresse e-mail de leur compte freesewing corresponde.

## Tu peux tout changer

Nous avons apporté de nombreux changements pour que les développeurs puissent commencer plus facilement à utiliser freesewing. Mais nous avons également apporté des changements pour les personnes qui contribuent d'une autre manière.

Tout notre contenu (markdown) peut maintenant être édité sur le site. Pas besoin de compte GitHub, il suffit de cliquer sur la petite icône en forme de crayon à côté du titre, de soumettre tes modifications, et le tour est joué.

Même bonne nouvelle pour les traducteurs. Toutes les traductions peuvent également être éditées en ligne. Nous avons également mis à jour notre documentation pour les traducteurs et les éditeurs afin de refléter ce nouveau flux de travail simplifié.

## Mises en page personnalisées

La connexion/signature avec les comptes GitHub/Google était une fonctionnalité demandée par les utilisateurs, et celle-ci l'est aussi : Nous prenons désormais en charge la création d'une mise en page personnalisée pour ton modèle. Voici comment cela fonctionne :

Lorsqu'un patron est dessiné, les différentes parties du patron sont disposées sur le patron automatiquement. Souvent, c'est très bien, mais parfois, tu aimerais pouvoir faire quelques changements. Par exemple, si tu veux faire imprimer ton patron dans un magasin de photocopie, tu dois t'assurer qu'il correspond à la largeur de leur rouleau de papier. Ou bien tu veux économiser du papier en pressant certaines parties ensemble.

Il s'agit d'une version bêta précoce (c'est-à-dire qu'il y a encore des pannes de temps en temps), mais tu peux maintenant changer la largeur de ton motif, déplacer les parties de ton motif, les faire pivoter ou même les mettre en miroir verticalement ou horizontalement pour qu'elles correspondent à tes plans. Tout cela peut se faire dans ton navigateur, sur le site.

## Documentation pour les développeurs

Nous avons également intégré notre documentation pour les développeurs sur le nouveau site. Jusqu'à hier, la documentation sur la nouvelle plateforme était hébergée sur un site séparé, mais maintenant, nous avons porté la documentation et tout est intégré dans notre (futur) site web.

## Nous ne migrerons pas tes brouillons

Il est temps de parler des choses que nous ne ferons pas : Nous ne migrerons pas tes brouillons existants. La nouvelle plateforme est tout simplement trop différente. Il n'y a aucun moyen pour nous de migrer tes brouillons existants d'une manière qui ait du sens. Ainsi, le jour où nous basculerons sur le nouveau site, tes brouillons ne seront plus là.

Tu peux télécharger toutes tes données sur notre site, mais si tu ne le fais pas toi-même, tes brouillons v1 disparaîtront.

## Plus de commentaires

J'ai décidé de ne pas mettre en place une fonction de commentaires parce que je pense que le fait de les avoir sur suscite de mauvaises attentes.

Freesewing n'est pas une autre [Pattern Review](https://sewing.patternreview.com/), ou [Thread and Needles](https://www.threadandneedles.org/), ou [The Fold Line](https://thefoldline.com/), ou [Textillia](https://www.textillia.com/), ou [Kollabora](http://www.kollabora.com/), ou tout autre *Raverly de la couture* du jour.

Je ne veux pas que freesewing.org soit en concurrence avec ces sites. Ils font leur truc, nous faisons le nôtre. Leur proposition de valeur est la communauté, la nôtre ne l'est pas. Cela ne veut pas dire que notre communauté n'a pas de valeur. Cela signifie simplement que nous n'avons pas besoin que notre communauté se réunisse sur notre site Web. Notre communauté existe partout où elle va . Que ce soit Twitter, Instagram, Reddit, des blogs ou un autre réseau social dont je n'ai jamais même entendu parler. Ce n'est pas grave, tout va bien.

Construire une communauté sur le site web demande du temps, des efforts, du travail. Et nous n'avons tout simplement pas la bande passante pour cela. Je préfère donc que nous nous concentrions sur [notre mission principale](/en/docs/faq/#whats-your-end-game), et que nous laissions les gens parler de freesewing partout où ils parlent de choses.

## Quelqu'un à Paris ?

J'ai mentionné que j'aimerais organiser une sorte de rencontre cette année, et bien que je n'aie pas vraiment eu le temps de réfléchir à ce que cela signifierait, nous pourrions finir par nous rencontrer de toute façon.

Plus précisément, [Charlotte](https://englishgirlathome.com/) (aka English girl at home) et [Carmen](https://www.carmencitab.com/) (aka CarmencitaB) organisent le meetup [Paris Sewcial](https://englishgirlathome.com/2019/01/23/paris-sewcial-paris-coud-2019-registration-open/) en mai. Je me rendrai à Paris pour y participer, alors si vous y êtes aussi, nous nous retrouverons là-bas.

L'inscription se fait [par ici](https://www.eventbrite.co.uk/e/paris-sewcial-paris-coud-registration-54520802187). 


