---
title: "Breanna Körperblock: Design Optionen"
---

<PatternOptions pattern='breanna' />

## Die Ärmel verstehen

Die Breanna Sleevecap wurde so entworfen, dass sie sich an verschiedene Arten von Ärmeln und Kleidungsstücken anpassen kann. Das Ergebnis ist, dass die Ärmel allein über 20 Optionen zur Kontrolle der Form. Das mag auf den ersten Blick etwas überwältigend erscheinen, aber wenn du verstehst, wie die sleevecap aufgebaut ist, kannst du leicht nachvollziehen, was die einzelnen Optionen bewirken.

### Die Begrenzungsbox

The _bounding box_ of the sleevecap is a rectangle that is as wide as the sleeve, and as high as the sleevecap. Innerhalb dieses Kastens werden wir später unsere Sleevecap bauen.

![Die Breanna-Ärmel](sleevecap.svg)

Das obrige Bild zeigt eine Armkugel, beginnend am Punkt 1, dann nach oben gehend bis Punkt 4 und dann wieder nach unten zu Punkt 2.

<Note>

###### Finden Sie heraus, welches die Vorderseite der Ärmel(cap)

ist. In unserem Beispiel befindet sich die Vorderseite der Ärmel auf der rechten Seite. Aber wie würden Sie es wissen?

Während Muster typischerweise eine Anzeige haben, die zeigt, welche Seite welche ist (eine einzige Note
bedeutet die Front, während ein Doppelbett den Rücken bedeutet), können Sie auch
die Vorderseite einer Ärmel erkennen, da sie kurviger ist. Die Rückseite der
Ärmelkarte wird ebenfalls gebogen, aber es ist eine flachere Kurve. Das liegt daran, dass die menschliche Schulter
auf der Vorderseite des Körpers stärker ausgeprägt und gekrümmt ist, daher ist die Ärmelkappe
dort stärker gekrümmt, um sich der Schulter anzupassen.

</Note>

The width of the sleevecap (and thus the width of the sleeve at the bottom of the armhole) is equal to the distance between points 1 and 2. That distance depends on the measurements of the model, the amount of ease, the cut of the garment and so on. For our sleevecap, all we need to know is that we start with a given width. And while that width can be influenced by other factors, we can not influence it by any of the sleevecap options.

![Oberseite der Ärmel steuern](sleevecaptop.svg)

Die Höhe der Ärmel entspricht der Entfernung zwischen den Punkten 3 und 4. Die genaue Höhe ist ein Kompromiss zwischen den Maßen des Modells, den Optionen, der Bequemlichkeit, der Bequemlichkeit der Ärmelkappe und der Tatsache , dass der Ärmel letztendlich zum Armloch passen muss. Die Höhe kann also variieren und wir kontrollieren nicht den exakten Wert. Aber es gibt zwei Optionen, die die Form unserer Ärmel kontrollieren:

- [Sleevecap Top X](/docs/patterns/breanna/options/sleevecaptopfactorx/) : Steuert die horizontale Platzierung von Punkt 3 und 4
- [Sleevecap oben Y](/docs/patterns/breanna/options/sleevecaptopfactory/) : Steuert die vertikale Platzierung von Punkt 4

In other words, point 4 can be made higher and lower and, perhaps less intutitively, it can also be changed to lie more to the right or the left, rather than smack in the middle as in our example.

### Die Wendepunkte

![Steuerung der Ablenkungspunkte](sleevecapinflection.svg)

Mit den Punkten 1, 2, 3 und 4 haben wir ein Kästchen zum Einzeichnen unserer Ärmel. Jetzt ist es an der Zeit, unsere _Wendepunkte_darzustellen. Das sind die Punkte 5 und 6 auf unserer Zeichnung, und ihre Platzierung wird durch die folgenden 4 Optionen bestimmt:

- [Sleevecap zurück X](/docs/patterns/breanna/options/sleevecapbackfactorx) : Steuert die horizontale Platzierung von Punkt 5
- [Sleevecap zurück Y](/docs/patterns/breanna/options/sleevecapbackfactory) : Steuert die vertikale Platzierung von Punkt 5
- [Sleevecap Front X](/docs/patterns/breanna/options/sleevecapbackfactorx) : Steuert die horizontale Platzierung von Punkt 6
- [Sleevecap Front Y](/docs/patterns/breanna/options/sleevecapbackfactory) : Steuert die vertikale Platzierung von Punkt 6

<Note>

Wie Sie in unserem Beispiel sehen, liegen diese Punkte nicht immer auf unserer Ärmel-Linie. Stattdessen sind sie
hilfreich, um die Punkte zu schaffen, die immer auf der Ärmel liegen: die Ankerpunkte.

</Note>

### Die Ankerpunkte

![Steuerung der Ankerpunkte](sleevecapanchor.svg)

Letztlich wird unsere Ärmel die Kombination aus 5 Kurven sein. In addition to points 1 and 2, the four _anchor points_ that are marked in orange in our example will be the start/finish of those curves.

Die Punkte sind _versetzt_ senkrecht zur Mitte einer Linie zwischen den beiden Ankerpunkten , die sie umgeben. Der Offset für jeden Punkt wird durch diese 4 Optionen kontrolliert:

- [Sleevecap Q1 Offset](/docs/patterns/breanna/options/sleevecapq1offset) : Steuert den senkrechten Offset zur Linie von Punkt 2 bis 6
- [Sleevecap Q2 Offset](/docs/patterns/breanna/options/sleevecapq2offset) : Steuert den senkrechten Offset auf die Linie von Punkt 6 bis 4
- [Sleevecap Q3 Offset](/docs/patterns/breanna/options/sleevecapq3offset) : Steuert den senkrechten Offset auf die Linie von Punkt 4 bis 5
- [Sleevecap Q4 Offset](/docs/patterns/breanna/options/sleevecapq3offset) : Steuert den senkrechten Offset auf die Linie von Punkt 5 bis 1

<Note>

Wir haben unsere Ärmel in 4 Quartale aufgeteilt. Wir beginnen vorne (das rechte Beispiel in unserem Beispiel)
mit Viertel 1, und fahren Sie mit Quartal 4 bis zur Rückseite.

Wie bei der Offset-Option wiederholen sich auch die letzten Optionen, um die Form unserer Ärmelkappe zu bestimmen, so dass du unter
jedes Viertel einzeln steuern kannst.

</Note>

### Die Ausbreitung

![Steuerung der Ankerpunkte](sleevecapspread.svg)

Wir haben jetzt alle Anfangs- und Endpunkte, um die 5 Kurven zu zeichnen, die unsere Ärmel ausmachen. Was uns fehlt, sind die Kontrollpunkte (siehe [unsere Infos zu Bézier-Kurven](https://freesewing.dev/concepts/beziercurves) um mehr darüber zu erfahren, wie Kurven konstruiert werden). Diese werden durch den so genannten _Spread_ bestimmt.

For each of the anchor points (the ones marked in orange, not points 1 and 2) there is an option to control the spread upwards, and downwards:

- [Sleevecap Q1 nach unten ausgebreitet](/docs/patterns/breanna/options/sleevecapq1spread1) : Steuert die Abwärtsverteilung im ersten Quartal
- [Sleevecap Q1 Aufwärtsspread](/docs/patterns/breanna/options/sleevecapq1spread2) : Steuert den Aufwärtsspread im ersten Quartal
- [Sleevecap Q2 nach unten verteilt](/docs/patterns/breanna/options/sleevecapq2spread1) : Steuert die Abwärtsverteilung im zweiten Quartal
- [Sleevecap Q2 upward spread](/docs/patterns/breanna/options/sleevecapq2spread2) : Steuert die Aufwärtsspanne im zweiten Quartal
- [Sleevecap Q3 upward spread](/docs/patterns/breanna/options/sleevecapq3spread1) : Steuert die Aufwärtsspanne im dritten Quartal
- [Sleevecap Q3 nach unten verteilt](/docs/patterns/breanna/options/sleevecapq3spread2) : Steuert die Abwärtsverteilung im dritten Quartal
- [Sleevecap Q4 upward spread](/docs/patterns/breanna/options/sleevecapq4spread1) : Steuert die Aufwärtsspanne im vierten Quartal
- [Sleevecap Q4 Downward Spread](/docs/patterns/breanna/options/sleevecapq4spread2) : Steuert den Downward Spread im vierten Quartal

<Note>

Die aufmerksamen Leser werden bemerkt haben, dass Punkt 4 kein Ankerpunkt ist. Anders ausgedrückt: Es gibt keine Garantie
, dass es auf der Ärmelkante liegen wird. Das bedeutet auch, dass die Aufwärtsverteilung in den Quartalen 2 und 3
die Höhe der Ärmel beeinflussen wird. Reduziert den Aufwärtsausstoß und die Kurve wird unter Punkt 4 abtauchen. Erhöhe es und
die Kurve wird übersteigen.

</Note>

### Takeaways

Für den Ärmelaufschlag in Breanna (und allen anderen Schnittmustern, die Breanna erweitern) gibt es viele Möglichkeiten. Wenn du verstehst, wie der Ärmelaufschlag aufgebaut ist, kannst du genau die Form des Ärmelaufschlags entwerfen, die du willst. Zu tun:

- Beginnen Sie mit der Platzierung der Oberseite Ihrer Sleevecap
- Dann bestimmen Sie die Wendepunkte
- Benutzen Sie als nächstes den Offset um die Steilheit der Kurve zu steuern
- Schließlich, nutzen Sie den Spread, um die Dinge zu glätten

Wichtig ist, dass Sie immer nur die Form der Ärmel kontrollieren. Whatever shape you design, it will be fitted to the armhole, meaning that its size can and will be adapted to make sure the sleeve fits the armscye. Die Form, die Sie entwerfen, wird jedoch stets respektiert.
