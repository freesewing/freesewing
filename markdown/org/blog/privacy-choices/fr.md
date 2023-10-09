---
author: "joostdecock"
caption: "Photo par <a href='https://pixabay.com/en/users/herbert2512-2929941/' target='_BLANK' rel='nofollow'>Herbert</a>"
date: "2017-06-16"
intro: "Le world wide web érode de plus en plus ta vie privée. Facebook, Google et une avalanche de réseaux publicitaires surveillent tous les onglets de ton navigateur. Ils te suivent sur le Web, gardent un œil sur les sites que tu visites, afin de recueillir plus d'informations sur toi et de les vendre à des annonceurs."
title: "Les choix que j'ai faits pour protéger ta vie privée. Ou pourquoi vous n'aurez pas de cookies."
---

Le world wide web érode de plus en plus ta vie privée. Facebook, Google et une avalanche de réseaux publicitaires surveillent tous les onglets de ton navigateur. Ils te suivent sur le Web, gardent un œil sur les sites que tu visites, afin de recueillir plus d'informations sur toi et de les vendre à des annonceurs.

Pardonne mon français, mais je déteste cette merde.

> Facebook, Google et une avalanche de réseaux publicitaires surveillent tous les onglets de ton navigateur

Construire ce site à partir de zéro a été une excellente occasion de réfléchir à la façon de faire les choses.

Pour m'assurer que je ne contribue pas au problème, j'ai fait les choix suivants :

## Le cryptage partout

Faisons tout passer par https. C'est tout simplement [le bon sens](https://letsencrypt.org/) en 2017.

## Pas de publicité

Cette fois encore, c'est une évidence. Les réseaux publicitaires sont le premier ravageur en ligne et je ne veux pas qu'ils s'approchent de ce site.

Heureusement, cela ne pose pas de problème étant donné que nous ne jouons pas selon les règles du web _. Donne quelque chose gratuitement, puis vends les données des gens_ .

## Pas de code externe

Ce site ne charge aucun code JavaScript externe. Aucun. Ce qui veut dire que j'ai dû repenser certaines choses qui nécessitent généralement un code externe.

Il n'y a pas de bouton "J'aime" de Facebook ni d'intégration de Twitter. Nous avons toujours le partage social sous nos articles de blog (hint hint) mais c'est la variété HTML ordinaire qui empêche le suivi.

Dans la même catégorie, il n'y a pas de logins sociaux. Bien sûr, un bouton _Login with Facebook_ est pratique, mais c'est aussi un peu un cauchemar si tu considères ce que cela implique pour ta vie privée.

Pour un site généré statiquement comme celui-ci ([voir cet article sur JAMstack pour plus de détails](/blog/freesewing-goes-jamstack/)) [Disqus](https://disqus.com/) est pratiquement la norme de facto pour les commentaires. Mais Disqus est assez horrible quand il s'agit de suivi, donc c'était un gros non pour moi.

C'est la même chose pour l'authentification où j'ai envisagé [Auth0](https://auth0.com/). Là aussi, j'étais préoccupée par le suivi, alors j'ai décidé de ne pas le faire.

J'ai fini par mordre la balle et j'ai mis en place l'authentification et les commentaires moi-même. L'avenir nous dira si c'était un bon échange.

## Pas de biscuits
Nous n'utilisons pas de cookies. Évidemment, pas de cookies de tiers, mais même pas de cookies propres.

Au lieu de cela, nous utilisons le stockage local qui est meilleur car, contrairement aux cookies, il n'envoie pas tes informations à chaque demande.

## Pas d'analyse
J'ai lancé [Google Analytics](https://analytics.google.com/) sur [makemypattern](https://makemypattern.com/). C'est puissant, mais c'est évidemment un cauchemar pour le suivi. Alors je n'allais pas avoir ça non plus.

Ce problème est d'autant plus compliqué que ce site statique est hébergé par [Netlify](https://www.netlify.com/). Je n'ai donc pas de journaux de serveur et je ne peux pas effectuer d'analyses côté serveur.

Pour l'essentiel, j'ai décidé de me passer d'analyses. Je n'ai pas besoin de savoir combien de personnes visitent ce site. Je sais encore combien de comptes d'utilisateurs sont créés et combien de modèles sont générés, ce qui devrait être de bons indicateurs du bien-être général du site.

Mais il y a une chose que je voulais garder pour les analyses : les journaux de référence. C'est l'un des petits plaisirs de la vie que de parcourir cette liste et de découvrir [quelqu'un](https://www.reddit.com/r/freepatterns/comments/4zh5nr/is_there_software_to_generate_sewing_patterns/) [a lié](http://www.makery.uk/2016/08/the-refashioners-2016-joost/) [à](https://closetcasepatterns.com/week-sewing-blogs-vol-98/) [tu](https://opensource.com/life/16/11/free-open-sewing-patterns).

Ici aussi, j'ai mis en place ma propre solution dépouillée. Si tu atterris sur ce site à partir d'un lien externe, nous signalerons cette référence à notre propre API. Ce qui signifie que nous recevons toujours les informations de référence, mais pas de suivi.

C'est peut-être juste de la vanité, mais quand je passe une mauvaise journée, ces journaux de référence me font me sentir mieux (quand ce n'est pas juste du spam de référence russe). Je peux me tromper sur ce point, mais je parierais que beaucoup de gens qui ont leur propre blog peuvent s'identifier à cela.

