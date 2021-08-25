---
title: 160|Constructing the neck opening
---

Wat je nodig hebt, is een licht ovale halsopening met een doorsnee die overeenkomt met de hoofdomtrek `head`, vermenigvuldigd met de optie `neckRatio`.

Het zou kunnen dat je dit een paar keer moet proberen voordat het goed zit. Maar aangezien de halsopening zowel horizontaal als verticaal symmetrisch is, moet je maar één kwadrant opbouwen.

Om dat te doen, voegen we een paar punten toe aan het patroon. Eerst moeten we toegang krijgen tot de afmetingen en opties. Daarvoor moet je eerst de shorthand call updaten om aan te geven dat je toegang wil tot `measurements` en `options`:


```js
let {
  Point,
  points,
  Path,
  paths,
  measurements,
  options
} = part.shorthand();
```

Top. Nu kunnen we beginnen:

```js
// Design pattern here
points.right = new Point(measurements.head / 10, 0);
points.bottom = new Point(0, measurements.head / 12);

points.rightCp1 = points.right
  .shift(90, points.bottom.dy(points.right)/2);
points.bottomCp2 = points.bottom
  .shift(0, points.bottom.dx(points.right)/2);

paths.neck = new Path()
  .move(points.right)
  .curve(points.rightCp1, points.bottomCp2, points.bottom)
```

Je hebt een aantal punten toegevoegd aan je patroondeel en je eerste pad getekend. Even kijken naar elke lijn in detail:

```js
points.right = new Point(measurements.head / 10, 0);
```

 - We voegen een punt met de naam `right` toe aan `points`, waar alle punten van het patroondeel opgeslagen zitten
 - We gebruiken de Point constructor, die twee argumenten nodig heeft: de waarden voor punten X en Y
 - De waarde voor X is `measurements.head / 10`
 - De waarde voor Y is `0`

Het deel voor `bottom` is bijna identiek, dus laten we verdergaan met de volgende regel:

```js
points.rightCp1 = points.right
  .shift(90, points.bottom.dy(points.right)/2);
```

 - We're adding a point named `rightCp1`, which will become the *control point* of the right part
 - In plaats van de Point constructor te gebruiken, passen we de `Point.shift()`-methode toe op een bestaand punt
 - De Point constructor vereist twee argumenten: de hoek waarin je het punt verschuift, en de afstand
 - Zoals je ziet, verschuiven we het punt 90 graden, naar boven dus, maar voor de afstand hebben we een andere methode nodig
 - De `Point.dy()`-methode plaatst de delta terug de Y-as tussen het punt waarop je het afroept, en het punt waarheen je het beweegt
 - We verschuiven de helft van de Y-delta

Het volgende punt is weer heel gelijkaardig, behalve dat we het deze keer naar rechts verschuiven (0 graden) voor de helft van de X-delta tussen de punten `bottom` en `right`.

<Tip>

Er bestaan een hele hoop van dit soort methodes voor punten. 
You can find them all in [the Point API docs](/referene/api/point/).

</Tip>

De volgende regel komt met 'paden' op de proppen. Die zijn nieuw:

```js
paths.neck = new Path()
  .move(points.right)
  .curve(points.rightCp1, points.bottomCp2, points.bottom)
```

 - We voegen een pad toe met de naam `neck` aan `paths`, waar alle paden van ons patroondeel opgeslagen zitten
 - We gebruiken de Path constructor, die geen argumenten nodig heeft
 - Dat volgen we op met een `Path.move()`-call die één punt als argument gebruikt
 - En dan is er een `Path.curve()`-call die drie punten als argumenten gebruikt

If you've read through [the high-level overview of FreeSewing](/guides/overview/) you will have learned that paths always start with a `move()` operation. In dit geval hebben we onze `right`-punten verplaatst.

Van daar hebben we een Béziercurve getekend naar het `bottom`-punt door `rightCp1` en `bottomCp2` als controlepunten te gebruiken.

Als dat allemaal gebeurd is, hebben we nu een kwart van de halsopening:

<Example pattern="tutorial" part="step2" caption="You have drawn your first path" />

Eén probleem: we hebben geen enkele garantie dat deze opening de juiste afmeting heeft.

We gaan niet gewoon hopen dat hij de juiste grootte heeft. In de volgende stap zorgen we ervoor dat de afmeting klopt.

