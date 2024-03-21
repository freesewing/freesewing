---
author: 1
caption: "Photo par Flo Dahm de Pexels"
date: "2021-04-18"
intro: "Nous venons de publier FreeSewing v2.15 et il est accompagné d'un nouveau patron : Le patron du pantalon Charlie Chinos ."
title: "Charlie Chinos : qui veut un nouveau pantalon ?"
---


Nous venons de publier FreeSewing v2.15 et il est accompagné d'un nouveau patron : [Le patron du pantalon Charlie Chinos](/designs/charlie/).

Je ne sais plus depuis combien de temps un patron de pantalon chino figure sur ma liste de choses à faire, mais cela se compte en années. Je suis très heureuse d'avoir enfin atterri là où je voulais être.

J'en ai une photo ici, mais à cause du tissu sombre, on ne distingue pas grand-chose :

![Une paire de Charlies par Joost](https://posts.freesewing.org/uploads/joost_b8dee41025.jpg)


Alors à la place, laisse-moi te dire pourquoi je suis si enthousiaste à ce sujet.

##### Basé sur Titan

Tout d'abord, Charlie est basé sur Titan, notre bloc de pantalon unisexe qui est également la base de [notre motif Paco](/designs/paco/). Donc, si tu connais l'un de ces sites, tu sais déjà comment Charlie t'ira.

##### Plus de mesures, plus d'options, un meilleur ajustement

Pour montrer à quel point je pense qu'il s'agit d'une amélioration, j'ai supprimé [Theo](/designs/theo/). Basé sur une ébauche d'Aldrich, Theo utilise très peu de mesures, et bien que cela ait bien fonctionné pour un certain groupe de personnes, c'est un modèle moins polyvalent.

Charlie s'adaptera mieux aux différentes formes de corps, et a beaucoup plus d'options qui te permettent de configurer tes pantalons pour qu'ils soient exactement comme tu le souhaites. Au cas où tu te poserais la question sur , Theo a 5 options, alors que Charlie en a 31.

Ceci étant dit, nous garderons Théo à disposition. Déclassé signifie simplement que nous avons ajouté un petit message d'avertissement sur indiquant que nous recommandons plutôt Charlie.

##### Plus facile à faire

Une autre raison d'opter pour Charlie plutôt que pour Théo : Charlie est plus facile à fabriquer. La braguette et la ceinture sont plus directes, et les poches avant ont été intelligemment conçues pour te donner la facilité de construction que offre avec les poches à couture latérale, tout en conservant l'aspect classique des poches inclinées.

Théo est classé 4 étoiles sur notre échelle de difficulté, et j'ai attribué 3 étoiles à Charlie. Si tu avais peur de faire des pantalons, c'est peut-être le modèle que tu attendais.

##### De vraies poches

Charlie est un modèle unisexe et les poches sont réelles. Tu as des poches passepoilées (alias jetées) à l'arrière, et des poches obliques à l'avant. Dans les deux cas, tu as le contrôle sur la taille et la profondeur des poches.

Les poches avant méritent une mention spéciale. Elles ressemblent à des poches inclinées traditionnelles, mais sont placées sur la couture latérale. Pour que cela soit possible, le panneau arrière du pantalon s'enroule autour du devant, en suivant l'inclinaison de la poche.

## Autres nouvelles de 2.15

Charlie est l'acteur principal, mais il y a beaucoup de travail dans cette version 2.15.

Comme toujours, [le changelog](https://github.com/freesewing/freesewing/blob/develop/CHANGELOG.md) a tous les détails, mais permettez-moi de souligner certains des changements les plus remarquables :

 - Nous avons [un nouveau plugin bartack](https://freesewing.dev/reference/plugins/bartack/)
 - Le plugin [buttons](https://freesewing.dev/reference/plugins/buttons/) fournit new [buttonhole-start](https://freesewing.dev/reference/snippets/buttonhole-start) et [buttonhole-end](https://freesewing.dev/reference/snippets/buttonhole-end) snippets.
 - Le plugin de dimension [](https://freesewing.dev/reference/plugins/dimension/) fournit à une nouvelle macro [rmad](https://freesewing.dev/reference/macros/rmad/)
 - Le plugin du logo [](https://freesewing.dev/reference/plugins/logo/) prend maintenant en charge le mode sombre.
 - Titan et Paco ont une nouvelle option `waistbandHeight`
 - Le noyau n'arrondit plus les coordonnées des points pour éviter les ratés lors de l'utilisation de [path.split](https://freesewing.dev/reference/api/path/split/)
 - [Bella](/designs/bella/) a une fixation à l'épaule pour mieux s'adapter aux vêtements de taille poupée.
 - [Charlie](/designs/charlie/) est le premier modèle à énumérer certaines des dimensions absolues lors de la configuration d'un modèle, mais nous prévoyons de l'étendre à d'autres modèles . Nous avons documenté [les nouvelles méthodes d'élévation](https://freesewing.dev/reference/api/part/raise) pour les concepteurs qui souhaitent utiliser cette fonction.
 - En parlant de documentation, les exemples de notre documentation [pour les développeurs](https://freesewing.dev/) maintenant te permettent de basculer un interrupteur pour révéler les points et les chemins dans les exemples.
 - La méthode [part.getId()](https://freesewing.dev/reference/api/part/getid/) prend maintenant un argument de préfixe.


