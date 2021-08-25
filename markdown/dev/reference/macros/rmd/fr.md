---
title: ld
---

Adds a *linear dimension* to your pattern.

| Propriété       | Défaut            | Type                          | Description                                                                    |
| --------------- | ----------------- | ----------------------------- | ------------------------------------------------------------------------------ |
| `from`          |                   | [Point](/reference/api/point) | Le point de départ de la dimension                                             |
| `to`            |                   | [Point](/reference/api/point) | Le point final de la dimension                                                 |
| `d`             | 0                 | Nombre                        | Le décalage avec lequel dessiner la dimension                                  |
| `text`          | Distance linéaire | Nombre                        | Le texte à accoler à la dimension si ce n'est pas la distance linéaire from-to |
| `noStartMarker` | `false`           | Booléen                       | Ne pas dessiner un marqueur de début                                           |
| `noEndMarker`   | `false`           | Booléen                       | Ne pas dessiner un marqueur de fin                                             |

<Note>

The `ld` macro is provided by the [dimension plugin](/reference/plugins/dimension).

</Note>



