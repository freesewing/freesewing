---
title: 150|Structure of a part
---

Laten we eerst het voorbeeldvak weghalen. Open `scr/bib.js` en controleer of het er als volgt uitziet:

```js
export default function(part) {
  let { Point, points, Path, paths } = part.shorthand();
  // Ontwerp je patroon hier

  // Complete?
  if (complete) {
    if (sa) {
    }
    // Paperless?
    if (paperless) {
    }
  }
  return part;
}
```

Dit is een leeg 'geraamte' voor een patroondeel. Telkens wanneer je een nieuw onderdeel wil aanmaken, is dit een goed vertrekpunt.

Laten we snel de verschillende secties overlopen. Er is nu nog niet veel te zien, maar het is altijd goed om te begrijpen hoe het in elkaar zit.

## De tekenmethode

```js
export default function(part) {

  // ...

  return part;
}

```

Dit is de boilerplate van de `draftBib`-methode. Het gebruikt het onderdeel als argument en geeft het terug.

<Note>

If you're new to JavaScript, and don't intuitively *get this*, stick with it. Het wordt al snel een tweede natuur.

</Note>

## Using shorthand

```js
let {
  Point,
  points,
  Path,
  paths,
} = part.shorthand();
```

This is FreeSewing's **shorthand** method. It returns an object with a bunch of handy helpers and you use JavaScript's *object destructuring* to only get what you need.

Het voorbeeld hierboven maakt de volgende variabelen beschikbaar:

 - `Point`: de Point constructor, die punten creëert
 - `points`: een verwijzing naar de punten van het onderdeel
 - `Path`: de Path constructor, die paden creëert
 - `paths`: een verwijzing naar de paden van het onderdeel

<Note>

This will all become clear, but if you're curious, the API docs have all the details 
on [the Part.shorthand() method](/reference/api/part/#shorthand)

</Note>

## Boilerplate voor patroondelen

```js
// Complete?
if (complete) {
  if (sa) {
  }
  // Paperless?
  if (paperless) {
  }
}
```

Dit is nog wat meer boilerplatecode die ervoor zorgt dat we de instellingen `complete`, `sa` en `paperless` respecteren.

Je hoeft hier voorlopig niet te diep over na te denken. We beginnen gewoon met ons slabbetje te ontwerpen.
