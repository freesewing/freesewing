***

***

<PatternOptions pattern='breanna' />

## Comprendre la tête de manche

Le chapeau de manche Breanna a été conçu pour être adapté à différents types de manches et de vêtements. Par conséquent, le chapeau de manche à lui seul dispose de 20 options pour contrôler sa forme. Bien que cela puisse paraître un peu assommant de prime abord, comprendre la conception de la tête de manche facilite la compréhension des différentes options.

### La bounding box (boîte englobante)

La *bounding box* de la tête de manche est un rectangle de la largeur de la manche et de la hauteur de la tête de manche. La tête de manche va être construite dans ce rectangle.

![Le chapeau de manche Breanna](sleevecap.svg)

L'image ci-dessus montre une tête de manche, commençant au point 1, puis montant jusqu'au point 4, et ensuite redescendant au point 2.

<Note>

###### Repérer le devant de la manche

Dans notre exemple, le devant de la manche est à droite. Mais comment le sait-on ?

Alors que les patrons l'indiquent généralement par des repères (une seule encoche pour le devant, une double encoche pour l'arrière), on peut aussi repérer où se trouve le devant d'une tête de manche par sa forme plus courbe. La partie de la tête de manche qui sera placée à l'arrière est de forme plus aplatie. C'est en raison de la forme de l'épaule humaine, qui est plus arrondie sur le devant du corps. La tête de manche sera donc elle aussi plus courbe sur le devant, pour s'adapter à l'épaule.

</Note>

La largeur de la tête de manche (et donc la largeur de la manche à la base de l'emmanchure) est égale à la distance entre les points 1 et 2. Cette distance dépend des mesures du modèle, de l'aisance choisie, de la coupe du vêtement, etc. Pour notre tête de manche, la seule chose à savoir est qu'on commence avec une largeur donnée. Et bien que cette largeur puisse être influencée par d'autres facteurs, nous ne pouvons pas la modifier par les options de la tête de manche.

![Contrôle du haut de la tête de manche](sleevecaptop.svg)

La hauteur de la tête de manche est égale à la distance entre les points 3 et 4. La hauteur exacte est un compromis entre les mesures du modèle, les options, l'aisance, l'aisance de la tête de manche, et le fait que la manche devra finalement s'ajuster à l'emmanchure. Cette hauteur peut donc varier, et on ne peut choisir sa valeur exacte. Mais deux options permettent de contrôler la forme de notre tête de manche :

-   [Haut de tête de manche X](/docs/patterns/breanna/options/sleevecaptopfactorx/) : Contrôle la position horizontale des points 3 et 4
-   [Haut de tête de manche Y](/docs/patterns/breanna/options/sleevecaptopfactory/) : Contrôle la position verticale du point 4

En d'autres termes, le point 4 peut être placé plus haut ou plus bas, et, ce qui est peut-être moins intuitif, peut aussi être déplacé plus à droite ou plus à gauche, plutôt que rester en plein milieu comme dans notre exemple.

### Les points d'inflexion

![Contrôle des points d'inflexion](sleevecapinflection.svg)

Avec les points 1, 2, 3 et 4 en place, nous avons un rectangle pour dessiner notre tête de manche. Maintenant, il est temps de placer nos *points d'inflexion*. Ce sont les points 5 et 6 de notre dessin, et leur position est déterminée par les 4 options suivantes :

-   [Haut de tête de manche arrière X](/docs/patterns/breanna/options/sleevecapbackfactorx) : Contrôle la position horizontale du point 5
-   [Haut de tête de manche arrière Y](/docs/patterns/breanna/options/sleevecapbackfactory) : Contrôle la position verticale du point 5
-   [Haut de tête de manche avant X](/docs/patterns/breanna/options/sleevecapbackfactorx) : Contrôle la position horizontale du point 6
-   [Haut de tête de manche avant Y](/docs/patterns/breanna/options/sleevecapbackfactory) : Contrôle la position verticale du point 6

<Note>

Comme vous le voyez dans notre exemple, ces points ne se trouvent pas toujours sur la ligne de la tête de manche. Mais ils permettent de créer des points qui se trouveront toujours sur la tête de manche : les points d'ancrage.

</Note>

### Les points d'ancrage

![Contrôle des points d'ancrage](sleevecapanchor.svg)

En fin de compte, notre tête de manche sera la combinaison de 5 courbes. En plus des points 1 et 2, les quatre *points d'ancrage* (en orange dans notre exemple) seront placés au début et à la fin de ces courbes.

Les points sont \*décalés \* perpendiculairement à partir du milieu d'une ligne située entre les deux points d'ancrage qui les entourent. Le décalage pour chaque point est contrôlé par ces 4 options :

-   [Décalage de tête de manche Q1](/docs/patterns/breanna/options/sleevecapq1offset) : contrôle le décalage perpendiculaire à la ligne située entre les points 2 et 6
-   [Décalage de tête de manche Q2](/docs/patterns/breanna/options/sleevecapq2offset) : contrôle le décalage perpendiculaire à la ligne située entre les points 6 et 4
-   [Décalage de tête de manche Q3](/docs/patterns/breanna/options/sleevecapq3offset) : contrôle le décalage perpendiculaire à la ligne située entre les points 4 et 5
-   [Décalage de tête de manche Q4](/docs/patterns/breanna/options/sleevecapq3offset) : contrôle le décalage perpendiculaire à la ligne située entre les points 5 et 1

<Note>

Notre manche est divisée en 4 quadrants. Nous commençons à l'avant (à droite dans notre exemple)
avec le quadrant 1, en allant vers l'arrière pour finir avec le quatrième quadrant.

Comme pour l'option décalage, les dernières options pour déterminer la forme de notre tête de manche se répéteront simplement pour que vous puissiez contrôler chaque quadrant individuellement.

</Note>

### La répartition

![Contrôle des points d'ancrage](sleevecapspread.svg)

Nous avons maintenant tous les points de départ et d'arrivée pour dessiner les 5 courbes qui constitueront nos têtes de manche. Il nous manque les points de contrôle (voir [nos informations sur les courbes de Bézier](https://freesewing.dev/concepts/beziercurves) pour en savoir plus sur la façon dont les courbes sont construites). Celles-ci sont déterminées par ce que l'on appelle *répartition*.

Pour chacun des points d'ancrage (ceux marqués en orange, pas les points 1 et 2), une option permet de contrôler la répartition vers le haut, et vers le bas :

-   [Répartition de tête de manche vers le bas Q1](/docs/patterns/breanna/options/sleevecapq1spread1) : contrôle la répartition vers le bas dans le premier quadrant<0><0>
-   [Répartition de tête de manche vers le haut Q1](/docs/patterns/breanna/options/sleevecapq1spread2) : contrôle la répartition vers le haut dans le premier quadrant<0><0>
-   [Répartition de tête de manche vers le bas Q2](/docs/patterns/breanna/options/sleevecapq2spread1) : contrôle la répartition vers le bas dans le deuxième quadrant<0><0>
-   [Répartition de tête de manche vers le haut Q2](/docs/patterns/breanna/options/sleevecapq2spread2) : contrôle la répartition vers le haut dans le deuxième quadrant<0><0>
-   [Répartition de tête de manche vers le haut Q3](/docs/patterns/breanna/options/sleevecapq3spread1) : contrôle la répartition vers le haut dans le troisième quadrant<0><0>
-   [Répartition de tête de manche vers le bas Q3](/docs/patterns/breanna/options/sleevecapq3spread2) : contrôle la répartition vers le bas dans le troisième quadrant<0><0>
-   [Répartition de tête de manche vers le haut Q4](/docs/patterns/breanna/options/sleevecapq4spread1) : contrôle la répartition vers le haut dans le quatrième quadrant<0><0>
-   [Répartition de tête de manche vers le bas Q4](/docs/patterns/breanna/options/sleevecapq4spread2) : contrôle la répartition vers le bas dans le quatrième quadrant<0><0>

<Note>

Les lecteurs attentifs auront remarqué que le point 4 n'est pas un point d'ancrage. En d'autres termes, il peut ne pas se trouver sur la ligne de la tête de manche. La hauteur de la tête de manche se répartira donc vers le haut entre les quadrants 2 et 3, en fonction de la hauteur de la tête de manche. Si l'on réduit la répartition vers le haut, la courbe s'infléchira sous le point 4. Si on l'augmente, la courbe passera au dessus.

</Note>

### En résumé

While the sleevecap in Breanna (and all patterns that extend Breanna) have a lot of options, understanding how the sleevecap is constructed can help you design the exact sleevecap shape you want. Pour cela :

-   Commencez par positionner le haut de votre tête de manche
-   Déterminer ensuite les points d'inflexion
-   Ensuite, utilisez le décalage pour contrôler la pente de la courbe
-   Enfin, utilisez la répartition pour homogénéiser le tout

Il faut comprendre qu'on ne peut contrôler que la forme de la tête de manche. Quelle que soit la forme que vous voulez, elle devra s'ajuster à l'emmanchure, ce qui signifie que sa taille peut et devra s'adapter. Cependant, la forme sera toujours respectée.
