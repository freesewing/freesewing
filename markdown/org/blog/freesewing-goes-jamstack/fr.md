---
author: 1
caption: "Photo par <a href='https://stock.tookapic.com/jenniferforjoy' target='_BLANK' rel='nofollow'>Jennifer</a>"
date: "2017-06-12"
intro: "Lorsque nous avons sorti freesewing core à la fin du mois de mars, mon attention s'est immédiatement portée sur la construction de notre front-end afin que freesewing.org puisse remplacer complètement makemypattern.com ."
title: "Nous sommes JAMstack, nous sommes JAMstack, nous sommes JAMstack, nous sommes JAMstack, nous sommes JAMstack, nous sommes JAMstack, nous sommes JAMstack, nous sommes JAMstack, et j'espère que tu aimes aussi JAMstack."
---

Lorsque nous avons lancé freesewing core à la fin du mois de mars, mon attention s'est immédiatement portée sur la construction de notre interface afin que [freesewing.org](/) puisse remplacer [makemypattern.com](https://makemypattern.com/).

Je crois que la valeur du freesewing réside dans la plateforme de base et nos schémas. Mais sans un moyen convivial d'exposer cette valeur, elle sera largement ignorée.

Nous avions donc besoin d'un site Web qui permette aux gens de générer des modèles. Makematyptern.com &mdash; sans doute la meilleure comparaison de quelque chose de similaire &mdash; fonctionne sur Drupal 7, et mon idée initiale était de faire fonctionner le nouveau site sur Drupal 8. J'ai suivi cette voie assez loin pour être sûr de pouvoir la faire fonctionner et la relier à notre système de gestion. C'est à ce moment-là que j'ai changé de vitesse et que j'ai porté mon attention sur ce que l'on appelle aujourd'hui le freesewing core.

La construction de Core a duré environ 7 mois, et beaucoup de choses ont changé depuis. Ou peut-être ai-je changé, j'ai en tout cas beaucoup appris en cours de route. Quoi qu'il en soit, j'ai décidé de faire les choses différemment.

## Le problème avec un CMS

Je n'ai rien contre Drupal, mais l'idée de gérer le site web freesewing par le biais d'un quelconque système de gestion de contenu (CMS) ne m'attire pas.

L'une des principales raisons est que beaucoup d'informations sont stockées sous une couche de base de données opaque, ce qui rend leur gestion difficile. Il en va de même pour le contenu où les articles, les métadonnées, les images, etc. sont tous répartis dans des tables, des emplacements et des dossiers. Mais il y a aussi le thème qui contient un tas de choses, il y a les modules Drupal personnalisés pour se connecter au backend, et ainsi de suite.

> Je voulais la même approche pour un site web. Sauf qu'il ne peut pas être statique parce qu'il doit, tu sais, faire des choses.

Lorsque nous avons finalisé le noyau, j'ai créé un site de documentation basé sur [Jekyll](https://jekyllrb.com/). En comparaison, c'était comme une bouffée d'air frais. Il s'agit simplement d'un tas de fichiers markdown, avec un peu de SASS, des images et un peu de JavaScript jetés dans le mélange, et le tout se compile en un site Web statique soigné.

Il est facile à gérer et s'intègre bien à un flux de travail centré sur GitHub qui sera familier aux contributeurs potentiels.

Je voulais la même approche pour un site web. Sauf qu'il ne peut pas être statique parce qu'il doit, tu sais, faire des choses.


## Une approche alternative : JAMstack

J'ai entendu parler de JAMstack pour la première fois lorsque j'ai commencé à chercher un hébergement pour ledit site de documentation de base. Il était initialement hébergé sur les pages de GitHub qui propose un hébergement gratuit. Ils ont aussi le SSL ou un nom de domaine personnalisé, mais tu ne peux pas avoir les deux. Ce qui était en quelque sorte une rupture d'accord.

En cherchant des alternatives, je suis tombé sur [Netlify](https://www.netlify.com/), qui fait à la fois du SSL et des domaines personnalisés et qui a un free-tier pour les projets open source (merci les gars). De plus, [cette vidéo du PDG de Netlify, Mathias Biilmann](https://vimeo.com/163522126) m'a vraiment enthousiasmé pour JAMstack.

À moins que tu ne connaisses JAMstack, je te conseille de regarder la vidéo, mais cela se résume à ceci :

 - **J** = JavaScript
 - **A** = APIs
 - **M** = Markup (balisage)

L'idée est que tu construises ton site statique (balisage) que tu rendras ensuite interactif avec du JavaScript qui s'accroche à une ou plusieurs API.

Ainsi, dans notre cas, plutôt que d'avoir un site de documentation simple avec du markdown facile à éditer et un CMS complexe pour gérer les choses dynamiques, construisons un site simple qui est généré de façon statique, mais qui utilise JavaScript et des API pour faire les choses intelligentes.

## Courir avant de pouvoir marcher

Je dois admettre que dans mon enthousiasme à adopter cette nouvelle approche, j'ai pris un peu d'avance. Soudain, je ne construisais plus un simple site, mais j'étais plongé jusqu'au cou dans le rendu isomorphe, le routage côté client, React et Redux, Node.js et le transpiling ES6.

> Si tu ne sais pas ce que cela signifie, tu peux avoir une idée de la frustration que j'ai ressentie en essayant d'apprivoiser toutes ces nouvelles bêtes.
> 
> Si tu sais ce que cela signifie, où étais-tu en avril lorsque j'ai traversé la vallée du Réactus de la mort ?

Le fait est que je ne suis pas un développeur et que j'étais complètement dépassé par les événements. Même si j'apprenais de nouvelles choses chaque jour, je ne faisais pas beaucoup de progrès sur la tâche à accomplir, et je me sentais frustré par mon incapacité à faire même les choses les plus banales.

Après un mois de frustration, de nombreux essais et apparemment encore plus d'erreurs, j'ai jeté l'éponge. Eff ce nouveau JavaScript brillant que tous les jeunes utilisent, je vais m'en tenir à ce que je connais.

Il s'agit essentiellement des bases de jQuery. En d'autres termes, des choses qui étaient plutôt cool il y a 10 ans.

## De la confiture vieille de 10 ans reste de la confiture, n'est-ce pas ?

Alors voilà, freesewing.org est un site alimenté par la JAMstack. Et tu sais quoi, il semble faire ce qu'il doit faire.

Jekyll construit notre site statique, et lorsque nous l'envoyons sur notre branche principale, il est automatiquement déployé sur Netlify.

> Efforce-toi d'utiliser ce nouveau JavaScript brillant que tous les jeunes utilisent.

Nous avons [une toute nouvelle API de données](https://github.com/freesewing/data) basée sur [le cadre Slim](https://www.slimframework.com/). Il gère toutes les données de l'utilisateur. Des choses comme des comptes, des mesures, des modèles et des brouillons, mais aussi des commentaires sur ce site Web et ainsi de suite.

Chaque fois que tu rédiges un modèle, nous ne te donnons pas seulement le modèle, mais nous effectuons également une comparaison de ton modèle avec une série de tailles standard, ce qui est plutôt cool.

Et nous avons d'autres trucs sympas, comme la possibilité de forker ou de reformuler un brouillon existant.

## C'est un point de départ

J'espère que l'expérience utilisateur/l'interface ne sera pas un obstacle pour les gens. J'ai fait beaucoup d'efforts pour rendre le processus de rédaction aussi intuitif que possible et je pense que par rapport à notre démo (ou à l'interface de makemypattern d'ailleurs), c'est une grande amélioration.

Encore une fois, je suis sûr que des choses vont se casser à gauche ou à droite, ou que certains d'entre vous n'aiment pas les couleurs ou quoi que ce soit d'autre.

Le fait est que j'ai entrepris de construire quelque chose qui puisse remplacer makemypattern.com pour que je puisse dire à tous _Hey, venez jouer avec ce nouveau truc_.

Je pense qu'à défaut d'autre chose, je peux le faire maintenant. Et si tu vois des possibilités d'amélioration, n'hésite pas à [rejoindre l'effort](/contribute), nous n'en sommes qu'au début.



<small>PS : pour ceux qui s'interrogent sur le titre de ce billet :</small>

<YouTube id='oFRbZJXjWIA' />


