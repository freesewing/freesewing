- - -
- - -



<PatternOptions pattern='breanna' />

## Comprendre la tête de manche

The Breanna sleevecap was designed to be adaptable into different types of sleeves and garments. As a result, the sleevecap alone has 20 options to control its shape. Whereas that may seem a bit overwhelming at first, understanding how the sleevecap is drafted makes it easy to understand what all the individual options do.

### La bounding box (boîte englobante)

The *bounding box* of the sleevecap is a rectangle that is as wide as the sleeve, and as high as the sleevecap. Inside this box, we will construct our sleevecap later.

![The Breanna sleevecap](sleevecap.svg)

The image above shows a sleevecap, starting at point 1, then going up until point 4, and then down again to point 2.

<Note>

###### Repérer le devant de la manche

Dans notre exemple, le devant de la manche est à droite. Mais comment le sait-on ? 

Alors que les patrons l'indiquent généralement par des repères (une seule encoche pour le devant, une double encoche pour l'arrière), on peut aussi repérer où se trouve le devant d'une tête de manche par sa forme plus courbe. The backside of the
sleevecap will also be curved, but it's a flatter curve. C'est en raison de la forme de l'épaule humaine, qui est plus arrondie sur le devant du corps. La tête de manche sera donc elle aussi plus courbe sur le devant, pour s'adapter à l'épaule.

</Note>

The width of the sleevecap (and thus the width of the sleeve at the bottom of the armhole) is equal to the distance between points 1 and 2. That distance depends on the measurements of the model, the amount of ease, the cut of the garment and so on. For our sleevecap, all we need to know is that we start with a given width. And while that width can be influenced by other factors, we can not influence it by any of the sleevecap options.

![Controlling the top of the sleevecap](sleevecaptop.svg)

The height of the sleevecap is equal to the distance between points 3 and 4. The exact height is a trade-off between the measurments of the model, options, ease, sleevecap ease, and the fact that the sleeve ultimately has to fit the armhole. So the height may vary, and we don't control the exact value. But there are two options that control the shape of our sleevecap:

 - [Sleevecap top X](/docs/patterns/breanna/options/sleevecaptopfactorx/) : Controls the horizontal placement of point 3 and 4
 - [Sleevecap top Y](/docs/patterns/breanna/options/sleevecaptopfactory/) : Controls the vertical placement of point 4

In other words, point 4 can be made higher and lower and, perhaps less intutitively, it can also be changed to lie more to the right or the left, rather than smack in the middle as in our example.

### Les points d'inflexion

![Controlling the inflection points](sleevecapinflection.svg)

With points 1, 2, 3, and 4 in place, we have a box to draw our sleevecap in. Now it's time to map out our *inflection points*. These are points 5 and 6 on our drawing, and their placement is determined by the following 4 options:

 - [Sleevecap back X](/docs/patterns/breanna/options/sleevecapbackfactorx) : Controls the horizontal placement of point 5
 - [Sleevecap back Y](/docs/patterns/breanna/options/sleevecapbackfactory) : Controls the vertical placement of point 5
 - [Sleevecap front X](/docs/patterns/breanna/options/sleevecapbackfactorx) : Controls the horizontal placement of point 6
 - [Sleevecap front Y](/docs/patterns/breanna/options/sleevecapbackfactory) : Controls the vertical placement of point 6

<Note>

Comme vous le voyez dans notre exemple, ces points ne se trouvent pas toujours sur la ligne de la tête de manche. Mais ils permettent de créer des points qui se trouveront toujours sur la tête de manche : les points d'ancrage.

</Note>

### Les points d'ancrage

![Controlling the anchor points](sleevecapanchor.svg)

Ultimately, our sleevecap will be the combination of 5 curves. In addition to points 1 and 2, the four *anchor points* that are marked in orange in our example will be the start/finish of those curves.

The points are *offset* perpendicular from the middle of a line between the two anchor points surrounding them. The offset for each point is controlled by these 4 options:

 - [Sleevecap Q1 offset](/docs/patterns/breanna/options/sleevecapq1offset) : Controls the offset perpendicular to the line from points 2 to 6
 - [Sleevecap Q2 offset](/docs/patterns/breanna/options/sleevecapq2offset) : Controls the offset perpendicular to the line from points 6 to 4
 - [Sleevecap Q3 offset](/docs/patterns/breanna/options/sleevecapq3offset) : Controls the offset perpendicular to the line from points 4 to 5
 - [Sleevecap Q4 offset](/docs/patterns/breanna/options/sleevecapq3offset) : Controls the offset perpendicular to the line from points 5 to 1

<Note>

Notre manche est divisée en 4 quadrants. Nous commençons à l'avant (à droite dans notre exemple)
avec le quadrant 1, en allant vers l'arrière pour finir avec le quatrième quadrant.

Comme pour l'option décalage, les dernières options pour déterminer la forme de notre tête de manche se répéteront simplement pour que vous puissiez contrôler chaque quadrant individuellement.

</Note>

### La répartition

![Controlling the anchor points](sleevecapspread.svg)

We now have all the start and end points to draw the 5 curves that will make up our sleevecaps. What we're missing are the control points (see [our info on Bézier curves](https://freesewing.dev/concepts/beziercurves) to learn more about how curves are constructed). These are determined by the so-called *spread*.

For each of the anchor points (the ones marked in orange, not points 1 and 2) there is an option to control the spread upwards, and downwards:

 - [Sleevecap Q1 downward spread](/docs/patterns/breanna/options/sleevecapq1spread1) : Controls the downward spread in the first quarter
 - [Sleevecap Q1 upward spread](/docs/patterns/breanna/options/sleevecapq1spread2) : Controls the upward spread in the first quarter
 - [Sleevecap Q2 downward spread](/docs/patterns/breanna/options/sleevecapq2spread1) : Controls the downward spread in the second quarter
 - [Sleevecap Q2 upward spread](/docs/patterns/breanna/options/sleevecapq2spread2) : Controls the upward spread in the second quarter
 - [Sleevecap Q3 upward spread](/docs/patterns/breanna/options/sleevecapq3spread1) : Controls the upward spread in the third quarter
 - [Sleevecap Q3 downward spread](/docs/patterns/breanna/options/sleevecapq3spread2) : Controls the downward spread in the third quarter
 - [Sleevecap Q4 upward spread](/docs/patterns/breanna/options/sleevecapq4spread1) : Controls the upward spread in the fourth quarter
 - [Sleevecap Q4 downward spread](/docs/patterns/breanna/options/sleevecapq4spread2) : Controls the downward spread in the fourth quarter

<Note>

Les lecteurs attentifs auront remarqué que le point 4 n'est pas un point d'ancrage. En d'autres termes, il peut ne pas se trouver sur la ligne de la tête de manche. La hauteur de la tête de manche se répartira donc vers le haut entre les quadrants 2 et 3, en fonction de la hauteur de la tête de manche. Si l'on réduit la répartition vers le haut, la courbe s'infléchira sous le point 4. Si on l'augmente, la courbe passera au dessus.

</Note>

### En résumé

While the sleevecap in Breanna (and all patterns that extend Breanna) have a lot of options, understanding how the sleevecap is constructed can help you design the exact sleevecap shape you want. To do so:

 - Commencez par positionner le haut de votre tête de manche
 - Déterminer ensuite les points d'inflexion
 - Ensuite, utilisez le décalage pour contrôler la pente de la courbe
 - Enfin, utilisez la répartition pour homogénéiser le tout

What's important to remember is that you're only ever controlling the shape of the sleevecap. Whatever shape you design, it will be fitted to the armhole, meaning that its size can and will be adapted to make sure the sleeve fits the armscye. However, the shape you design will always be respected.

