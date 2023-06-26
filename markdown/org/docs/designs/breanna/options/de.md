---
title: "Breanna body block: Design Options"
---

<PatternOptions pattern='breanna' />

## Die Ärmel verstehen

The Breanna sleevecap was designed to be adaptable into different types of sleeves and garments. As a result, the sleevecap alone has 20 options to control its shape. Whereas that may seem a bit overwhelming at first, understanding how the sleevecap is drafted makes it easy to understand what all the individual options do.

### Die Begrenzungsbox

The _bounding box_ of the sleevecap is a rectangle that is as wide as the sleeve, and as high as the sleevecap. Inside this box, we will construct our sleevecap later.

![The Breanna sleevecap](sleevecap.svg)

The image above shows a sleevecap, starting at point 1, then going up until point 4, and then down again to point 2.

<Note>

###### Finden Sie heraus, welches die Vorderseite der Ärmel(cap)

ist. In unserem Beispiel befindet sich die Vorderseite der Ärmel auf der rechten Seite. Aber wie würden Sie es wissen?

Während Muster typischerweise eine Anzeige haben, die zeigt, welche Seite welche ist (eine einzige Note
bedeutet die Front, während ein Doppelbett den Rücken bedeutet), können Sie auch
die Vorderseite einer Ärmel erkennen, da sie kurviger ist. Die Rückseite der
Ärmelkarte wird ebenfalls gebogen, aber es ist eine flachere Kurve. That's because the human shoulder
is more pronounced and curved on the front of the body, thus the sleevecap is more curved
there to fit the shoulder.

</Note>

The width of the sleevecap (and thus the width of the sleeve at the bottom of the armhole) is equal to the distance between points 1 and 2. That distance depends on the measurements of the model, the amount of ease, the cut of the garment and so on. For our sleevecap, all we need to know is that we start with a given width. And while that width can be influenced by other factors, we can not influence it by any of the sleevecap options.

![Controlling the top of the sleevecap](sleevecaptop.svg)

The height of the sleevecap is equal to the distance between points 3 and 4. The exact height is a trade-off between the measurments of the model, options, ease, sleevecap ease, and the fact that the sleeve ultimately has to fit the armhole. So the height may vary, and we don't control the exact value. But there are two options that control the shape of our sleevecap:

- [Sleevecap Top X](/docs/patterns/breanna/options/sleevecaptopfactorx/) : Steuert die horizontale Platzierung von Punkt 3 und 4
- [Sleevecap oben Y](/docs/patterns/breanna/options/sleevecaptopfactory/) : Steuert die vertikale Platzierung von Punkt 4

In other words, point 4 can be made higher and lower and, perhaps less intutitively, it can also be changed to lie more to the right or the left, rather than smack in the middle as in our example.

### Die Wendepunkte

![Controlling the inflection points](sleevecapinflection.svg)

With points 1, 2, 3, and 4 in place, we have a box to draw our sleevecap in. Now it's time to map out our _inflection points_. These are points 5 and 6 on our drawing, and their placement is determined by the following 4 options:

- [Sleevecap zurück X](/docs/patterns/breanna/options/sleevecapbackfactorx) : Steuert die horizontale Platzierung von Punkt 5
- [Sleevecap zurück Y](/docs/patterns/breanna/options/sleevecapbackfactory) : Steuert die vertikale Platzierung von Punkt 5
- [Sleevecap Front X](/docs/patterns/breanna/options/sleevecapbackfactorx) : Steuert die horizontale Platzierung von Punkt 6
- [Sleevecap Front Y](/docs/patterns/breanna/options/sleevecapbackfactory) : Steuert die vertikale Platzierung von Punkt 6

<Note>

Wie Sie in unserem Beispiel sehen, liegen diese Punkte nicht immer auf unserer Ärmel-Linie. Stattdessen sind sie
hilfreich, um die Punkte zu schaffen, die immer auf der Ärmel liegen: die Ankerpunkte.

</Note>

### Die Ankerpunkte

![Controlling the anchor points](sleevecapanchor.svg)

Ultimately, our sleevecap will be the combination of 5 curves. In addition to points 1 and 2, the four _anchor points_ that are marked in orange in our example will be the start/finish of those curves.

The points are _offset_ perpendicular from the middle of a line between the two anchor points surrounding them. The offset for each point is controlled by these 4 options:

- [Sleevecap Q1 Offset](/docs/patterns/breanna/options/sleevecapq1offset) : Steuert den senkrechten Offset zur Linie von Punkt 2 bis 6
- [Sleevecap Q2 Offset](/docs/patterns/breanna/options/sleevecapq2offset) : Steuert den senkrechten Offset auf die Linie von Punkt 6 bis 4
- [Sleevecap Q3 Offset](/docs/patterns/breanna/options/sleevecapq3offset) : Steuert den senkrechten Offset auf die Linie von Punkt 4 bis 5
- [Sleevecap Q4 Offset](/docs/patterns/breanna/options/sleevecapq3offset) : Steuert den senkrechten Offset auf die Linie von Punkt 5 bis 1

<Note>

Wir haben unsere Ärmel in 4 Quartale aufgeteilt. Wir beginnen vorne (das rechte Beispiel in unserem Beispiel)
mit Viertel 1, und fahren Sie mit Quartal 4 bis zur Rückseite.

Like the offset option, the last options to determine the shape of our sleevecap will just repeat so you can
control each quarter individually.

</Note>

### Die Ausbreitung

![Controlling the anchor points](sleevecapspread.svg)

We now have all the start and end points to draw the 5 curves that will make up our sleevecaps. What we're missing are the control points (see [our info on Bézier curves](https://freesewing.dev/concepts/beziercurves) to learn more about how curves are constructed). These are determined by the so-called _spread_.

For each of the anchor points (the ones marked in orange, not points 1 and 2) there is an option to control the spread upwards, and downwards:

- [Sleevecap Q1 nach unten ausgebreitet](/docs/patterns/breanna/options/sleevecapq1spread1) : Steuert die Abwärtsverteilung im ersten Quartal
- [Sleevecap Q1 upward spread](/docs/patterns/breanna/options/sleevecapq1spread2) : Controls the upward spread in the first quarter
- [Sleevecap Q2 nach unten verteilt](/docs/patterns/breanna/options/sleevecapq2spread1) : Steuert die Abwärtsverteilung im zweiten Quartal
- [Sleevecap Q2 upward spread](/docs/patterns/breanna/options/sleevecapq2spread2) : Controls the upward spread in the second quarter
- [Sleevecap Q3 upward spread](/docs/patterns/breanna/options/sleevecapq3spread1) : Controls the upward spread in the third quarter
- [Sleevecap Q3 nach unten verteilt](/docs/patterns/breanna/options/sleevecapq3spread2) : Steuert die Abwärtsverteilung im dritten Quartal
- [Sleevecap Q4 upward spread](/docs/patterns/breanna/options/sleevecapq4spread1) : Controls the upward spread in the fourth quarter
- [Sleevecap Q4 downward spread](/docs/patterns/breanna/options/sleevecapq4spread2) : Controls the downward spread in the fourth quarter

<Note>

Die aufmerksamen Leser werden bemerkt haben, dass Punkt 4 kein Ankerpunkt ist. Anders ausgedrückt: Es gibt keine Garantie
, dass es auf der Ärmelkante liegen wird. Das bedeutet auch, dass die Aufwärtsverteilung in den Quartalen 2 und 3
die Höhe der Ärmel beeinflussen wird. Reduziert den Aufwärtsausstoß und die Kurve wird unter Punkt 4 abtauchen. Erhöhe es und
die Kurve wird übersteigen.

</Note>

### Takeaways

While the sleevecap in Breanna (and all patterns that extend Breanna) have a lot of options, understanding how the sleevecap is constructed can help you design the exact sleevecap shape you want. To do so:

- Beginnen Sie mit der Platzierung der Oberseite Ihrer Sleevecap
- Dann bestimmen Sie die Wendepunkte
- Benutzen Sie als nächstes den Offset um die Steilheit der Kurve zu steuern
- Schließlich, nutzen Sie den Spread, um die Dinge zu glätten

What's important to remember is that you're only ever controlling the shape of the sleevecap. Whatever shape you design, it will be fitted to the armhole, meaning that its size can and will be adapted to make sure the sleeve fits the armscye. However, the shape you design will always be respected.
