---
title: cutonfold
---

Adds a *cut on fold* indicator to your pattern.

| Propriété   | Défaut  | Type                          | Description                                                                 |
| ----------- | ------- | ----------------------------- | --------------------------------------------------------------------------- |
| `from`      |         | [Point](/reference/api/point) | The startpoint of the *cut on fold* indicator                               |
| `to`        |         | [Point](/reference/api/point) | The endpoint of the *cut on fold* indicator                                 |
| `margin`    | 5       | [Point](/reference/api/point) | La distance en % à garder à partir du bord de départ/fin                    |
| `offset`    | 50      | Nombre                        | La distance en mm de décalage par rapport à la ligne du début à la fin      |
| `grainline` | `false` | Booléen                       | Si cet indicateur de découpage correspond également à la ligne de droit-fil |

<Note>

The `cutonfold` macro is provided by the [cutonfold plugin](/reference/plugins/cutonfold).

</Note>



