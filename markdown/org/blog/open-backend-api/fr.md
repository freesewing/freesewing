---
title: Ouvrir l'API de FreeSewing
caption: Une touche vintage ornée en laiton sur un clavier d'ordinateur noir, par PixaBay
date: 20231103
intro: L'API du backend de FreeSewing prend maintenant en charge les clés d'API afin que tu puisses également interagir avec elle.
author: 1
---

Verrouiller les personnes de ton API semble être la chose à la mode de nos jours. Avec des sites comme Twitter -- nay, X -- et Reddit qui verrouillent l'accès à l'API ou font payer l'accès.

J'ai fait exactement le contraire, et dans le cadre du déploiement du nouveau site FreeSewing.org, j'ai construit un nouveau backend qui peut être utilisé par tout le monde.

Le backend prend en charge l'authentification via les clés API, et tu peux générer ces clés ici même dans les paramètres de ton compte. Tu peux en générer autant que tu veux, et définir leur expiration, ainsi que configurer leur niveau d'accès.

## ###### Pour quoi faire ?

Bonne question. Tout d'abord, je pense que c'est la meilleure chose à faire. Mais surtout, j'ai l'impression que si tu dois mettre toutes ces mesures dans FreeSewing, tu devrais peut-être les utiliser ailleurs, non ? Je voulais donc faciliter cela.

Je m'attends à ce que ce soit, au moins dans un premier temps, une fonction de niche. Cependant, j'espère que d'autres personnes travaillant dans le domaine de la conception paramétrique et des patrons de couture sur mesure (ou même simplement des personnes cherchant des mesures) finiront par l'apprécier et, je l'espère, l'intégrer à leurs propres scripts ou outils.

À défaut d'autre chose, je sais que je le ferai.

La [documentation de référence de l'API REST vit ici] (https\://freesewing.dev/reference/backend), si tu cherches la spécification de l'OpenAPI, alors va sur https\://backend3.freesewing.org/docs/.

## Utilise, n'abuse pas

Notre API dorsale fonctionne dans un environnement en nuage et bien que je ne fasse pas payer l'accès à l'API, je dois payer les factures dudit fournisseur de nuage.

Ainsi, tu dois faire attention au nombre de demandes que tu génères. Et si tu as de grands projets, n'hésite pas à me contacter pour en discuter d'abord.

Je surveillerai l'utilisation de notre API dorsale et nous pouvons à tout moment décider de révoquer les clés API si j'estime que l'utilisation dépasse ce que je peux ou veux prendre en charge.
L'utilisation du backend sera surveillée et je pourrais intervenir.
