- - -
title: "Breanna body block: Design Options"
- - -

<PatternOptions pattern='breanna' />

## De mouwkop begrijpen

The Breanna sleevecap was designed to be adaptable into different types of sleeves and garments. As a result, the sleevecap alone has 20 options to control its shape. Whereas that may seem a bit overwhelming at first, understanding how the sleevecap is drafted makes it easy to understand what all the individual options do.

### De grenzendoos

The _bounding box_ of the sleevecap is a rectangle that is as wide as the sleeve, and as high as the sleevecap. Inside this box, we will construct our sleevecap later.

![The Breanna sleevecap](sleevecap.svg)

The image above shows a sleevecap, starting at point 1, then going up until point 4, and then down again to point 2.

<Note>

###### Het vinden van de voorkant van de mouw(cap)

In ons voorbeeld staat de voorkant van de mouwkop aan de rechterkant. Maar hoe zou u dat weten?

Terwijl patronen meestal een indicatie hebben die aangeeft welke kant is (een enkel merkteken
betekent het voorpand, overwegende dat een dubbele inkeping de achterkant betekent, kan je ook
de voorkant van een mouwkop herkennen omdat het meer gebogen is. De achterkant van de
mouwkop wordt ook gebogen, maar het is een vlakke curve. That's because the human shoulder
is more pronounced and curved on the front of the body, thus the sleevecap is more curved
there to fit the shoulder.

</Note>

The width of the sleevecap (and thus the width of the sleeve at the bottom of the armhole) is equal to the distance between points 1 and 2. That distance depends on the measurements of the model, the amount of ease, the cut of the garment and so on. For our sleevecap, all we need to know is that we start with a given width. And while that width can be influenced by other factors, we can not influence it by any of the sleevecap options.

![Controlling the top of the sleevecap](sleevecaptop.svg)

The height of the sleevecap is equal to the distance between points 3 and 4. The exact height is a trade-off between the measurments of the model, options, ease, sleevecap ease, and the fact that the sleeve ultimately has to fit the armhole. So the height may vary, and we don't control the exact value. But there are two options that control the shape of our sleevecap:

- [Mouwkop top X](/docs/patterns/breanna/options/sleevecaptopfactorx/) : Bepaalt de horizontale plaatsing van punt 3 en 4
- [Mouwkop top Y](/docs/patterns/breanna/options/sleevecaptopfactory/) : Bepaalt de verticale plaatsing van punt 4

In other words, point 4 can be made higher and lower and, perhaps less intutitively, it can also be changed to lie more to the right or the left, rather than smack in the middle as in our example.

### De inflectiepunten

![Controlling the inflection points](sleevecapinflection.svg)

With points 1, 2, 3, and 4 in place, we have a box to draw our sleevecap in. Now it's time to map out our _inflection points_. These are points 5 and 6 on our drawing, and their placement is determined by the following 4 options:

- [Mouwkop X](/docs/patterns/breanna/options/sleevecapbackfactorx) : Bepaalt de horizontale plaatsing van punt 5
- [Mouwkop Y](/docs/patterns/breanna/options/sleevecapbackfactory) : Bepaalt de verticale plaatsing van punt 5
- [Mouwkop X](/docs/patterns/breanna/options/sleevecapbackfactorx) : Bepaalt de horizontale plaatsing van punt 6
- [Mouwkop Y](/docs/patterns/breanna/options/sleevecapbackfactory) : Bepaalt de verticale plaatsing van punt 6

<Note>

Zoals u in ons voorbeeld ziet, liggen deze punten niet altijd op onze mouwlijn. In plaats daarvan
helpen ze bij het creëren van punten die altijd op de mouwkop liggen: de ankerpunten.

</Note>

### De ankerpunten

![Controlling the anchor points](sleevecapanchor.svg)

Ultimately, our sleevecap will be the combination of 5 curves. In addition to points 1 and 2, the four _anchor points_ that are marked in orange in our example will be the start/finish of those curves.

The points are _offset_ perpendicular from the middle of a line between the two anchor points surrounding them. The offset for each point is controlled by these 4 options:

- [Mouwkop Q1 offset](/docs/patterns/breanna/options/sleevecapq1offset) : Bepaalt de offset loopendicular naar de lijn van punt 2 tot 6
- [Mouwkop Q2 offset](/docs/patterns/breanna/options/sleevecapq2offset) : Bepaalt de offset perpendicular naar de lijn van punt 6 tot 4
- [Mouwkop Q3 offset](/docs/patterns/breanna/options/sleevecapq3offset) : Bepaalt de offset perpendicular naar de lijn van punt 4 tot 5
- [Mouwkop Q4 offset](/docs/patterns/breanna/options/sleevecapq3offset) : Bepaalt de offset perpendicular naar de lijn van punt 5 tot 1

<Note>

We hebben onze mouwkop in 4 kwartalen verdeeld. We starten vooraan (rechts in ons voorbeeld)
met kwart 1. en doe onze weg naar de rug om te eindigen met kwart 4.

Like the offset option, the last options to determine the shape of our sleevecap will just repeat so you can
control each quarter individually.

</Note>

### De spreiding

![Controlling the anchor points](sleevecapspread.svg)

We now have all the start and end points to draw the 5 curves that will make up our sleevecaps. What we're missing are the control points (see [our info on Bézier curves](https://freesewing.dev/concepts/beziercurves) to learn more about how curves are constructed). These are determined by the so-called _spread_.

For each of the anchor points (the ones marked in orange, not points 1 and 2) there is an option to control the spread upwards, and downwards:

- [Mouwkop Q1 neerwaardse spreiding](/docs/patterns/breanna/options/sleevecapq1spread1) : Bepaalt de neerwaartse spreiding in het eerste kwartaal
- [Mouwkop Q1 opwaardse spreiding](/docs/patterns/breanna/options/sleevecapq1spread2) : Bepaalt de opwaartse spreiding in het eerste kwartaal
- [Mouwkop Q2 neerwaardse spreiding](/docs/patterns/breanna/options/sleevecapq2spread1) : Bepaalt de neerwaartse spreiding in het tweede kwartaal
- [Mouwkop Q2 opwaartse spreiding](/docs/patterns/breanna/options/sleevecapq2spread2) : Bepaalt de opwaartse spreiding in het tweede kwartaal
- [Mouwkop Q3 opwaartse spreiding](/docs/patterns/breanna/options/sleevecapq3spread1) : Bepaalt de opwaartse spreiding in het derde kwartaal
- [Mouwkop Q3 neerwaardse spreiding](/docs/patterns/breanna/options/sleevecapq3spread2) : Bepaalt de neerwaartse spreiding in het derde kwartaal
- [Mouwkop Q4 opwaartse spreiding](/docs/patterns/breanna/options/sleevecapq4spread1) : Bepaalt de opwaartse spreiding in het vierde kwartaal
- [Mouwkop Q4 neerwaardse spreiding](/docs/patterns/breanna/options/sleevecapq4spread2) : Bepaalt de neerwaartse spreiding in het vierde kwartaal

<Note>

Attensieve lezers zullen hebben opgemerkt dat punt 4 geen ankerpunt is. Met andere woorden, er is geen garantie
dat het op de mouwkop zal liggen. Dit betekent ook dat de opwaartse spreiding in kwartaal 2 en 3
de hoogte van de mouwkop zal beïnvloeden. Verminder de opwaartse spread, en de curve zal onder punt 4 duiken. Verhoog het en
de curve zal daarboven stijgen.

</Note>

### Takeaways

While the sleevecap in Breanna (and all patterns that extend Breanna) have a lot of options, understanding how the sleevecap is constructed can help you design the exact sleevecap shape you want. To do so:

- Begin met het plaatsen van de bovenkant van je mouwkop
- Bepaal dan de invoegpunten
- Vervolgens, gebruik de offset om de kracht van de curve te controleren
- Tot slot gebruik je de spreiding om de zaken vlot te trekken

What's important to remember is that you're only ever controlling the shape of the sleevecap. Whatever shape you design, it will be fitted to the armhole, meaning that its size can and will be adapted to make sure the sleeve fits the armscye. However, the shape you design will always be respected.
