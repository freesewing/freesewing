---
author: 1
caption: "Les balances, comment ça marche ?"
date: "2018-01-04"
intro: "La version 1.3.0 de Freesewing core est sortie ; elle contient des corrections tellement bonnes que nous les avons rétroportées sur tous tes brouillons."
title: "La version 1.3.0 de Freesewing core est sortie ; elle contient des corrections tellement bonnes que nous les avons rétroportées sur tous tes brouillons."
---

Le dernier jour de 2017, dans notre [récapitulatif mensuel de toute l'actualité du freesewing](/blog/roundup-2017-12/) , nous avons parlé de le problème imminent des brouillons incorrectement mis à l'échelle, alias [Core issue #204 - The Inkscape default units quandary](https://github.com/freesewing/core/issues/204).

Je ne reviendrai pas sur [tout ça](/blog/roundup-2017-12/) , mais cela se résume au fait que les [Inkscape](http://inkscape.org/) mainteneurs ont changé le DPI (points par pouce) interne d'Inkscape de 90 à 96. Un changement qui entre en vigueur à partir de la version 0.92.

Si elle n'est pas cochée, cette modification entraînera une mise à l'échelle incorrecte de tous les motifs de couture libre. C'est parce que nous partons du principe que le SVG a une résolution de 90DPI et que nous le redimensionnons en conséquence.

![Le moment où nous avons réalisé tout l'impact du changement d'IAP.](https://posts.freesewing.org/uploads/oh_shit_90b4969a5d.gif)

Lorsque le passage à 96DPI entrera en vigueur, tous les motifs seront décalés de 6,66 %. C'est vraiment le genre de différence qui est trop petite pour être remarquée en regardant un modèle, mais qui est assez grande pour gâcher complètement ton vêtement.

La question est également plus gênante qu'il n'y paraît à première vue. Tout d'abord parce que nous ne pouvons pas simplement passer à 96DPI car il y a maintenant deux versions sur qui utilisent un DPI par défaut différent sous le capot. Nous avons besoin d'une solution qui fonctionne pour les deux.

![Capture d'écran d'un motif de broderie libre dont l'échelle est incorrecte dans la dernière version d'Inkscape.](https://posts.freesewing.org/uploads/inkscape_b96e2bb510.png)

De plus, bien que tout correctif que nous mettons en œuvre s'applique aux nouveaux projets, tous les projets existants générés avant le correctif seront toujours affectés.

En d'autres termes, si tu as dessiné un modèle la semaine dernière ou il y a un mois, ce modèle ne sera pas correctement mis à l'échelle dans une version récente d'Inkscape.  
Et comme nous utilisons Inkscape dans notre chaîne d'outils SVG-PDF, il ne serait pas non plus mis à l'échelle correctement si tu venais ici et téléchargeais un PDF.

De toute évidence, il fallait faire quelque chose. Et rapidement.

## Le correctif pour les nouveaux brouillons

À partir de la version 1.3.0 du noyau, nos fichiers SVG ne dépendent plus d'aucun paramètre DPI.

Plutôt que d'utiliser les unités internes et d'appliquer une transformation SVG pour mettre à l'échelle l'ensemble du motif , nous avons fixé les unités à mm et mis à jour la viewBox SVG pour appliquer la mise à l'échelle.

De toute évidence, c'est ainsi que nous aurions dû procéder dès le départ. Chaque jour est un jour d'école.

Si tu t'inquiètes de l'utilisation des mm dans ton projet (parce que tu es habitué aux unités impériales ), sois assuré que ces mm resteront sous le capot. Tu ne pourras pas faire la différence.

## Le correctif pour les brouillons préexistants

Pour éviter les problèmes avec les brouillons préexistants, nous devions trouver une solution pour ceux-ci aussi.

Nous avons essentiellement deux options :

 - Refais tous ces brouillons
 - Rattache-les à leur place sans modifier le projet lui-même.

La réécriture résout le problème car chaque nouvelle version sera traitée par la dernière version de base qui inclut la correction.

Cependant, la version de base est également livrée avec des mises à jour régulières, des ajustements et des correctifs dans les modèles eux-mêmes. Ainsi, en refaisant un brouillon généré sur une version précédente de core, il n'y a aucune garantie que le brouillon ne changera pas.

En principe, ce changement serait toujours une amélioration. Mais le bug de l'un est la caractéristique de l'autre , et nous préférons ne pas [déplacer ton fromage](https://en.wikipedia.org/wiki/Who_Moved_My_Cheese%3F).

![Ne touche pas à mes affaires](https://posts.freesewing.org/uploads/who_moved_my_cheese_0cd51a25d6.jpg)

Nous avons donc décidé de remplacer toutes les ébauches que nous avons dans nos dossiers par le nouveau code de mise à l'échelle, , sans toucher à aucun autre aspect de l'ébauche.

Au moment où tu lis ces lignes, cela a déjà été fait, et tous les brouillons de freesewing devraient maintenant être mis à l'échelle correctement. Partout.

## Aussi : connaissance de la version

Nous avons également apporté des modifications à nos systèmes de base pour stocker la version de freesewing core qui a généré ton brouillon.

Si, depuis que tu as créé ton brouillon, nous avons mis en place de nouvelles fonctionnalités ou des correctifs, tu seras averti par qu'une mise à jour est disponible :

![Si ton projet est généré avec une ancienne version de freesewing core, nous t'en informerons](https://posts.freesewing.org/uploads/upgrade_dee342e3fb.png)

C'est à toi de décider si tu mets à jour ton brouillon ou non. Si tu ne veux pas perdre les informations contenues dans ton *vieux projet*, plutôt que de le mettre à jour, tu peux le forker.








