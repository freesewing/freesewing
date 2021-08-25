---
title: vd
---

Adds a *vertical dimension* to your pattern.

| Propriété       | Défaut             | Type                          | Description                                                                         |
| --------------- | ------------------ | ----------------------------- | ----------------------------------------------------------------------------------- |
| `from`          |                    | [Point](/reference/api/point) | Le point de départ de la dimension                                                  |
| `to`            |                    | [Point](/reference/api/point) | Le point final de la dimension                                                      |
| `x`             |                    | Nombre                        | La valeur en X à laquelle dessiner la dimension                                     |
| `text`          | Distance verticale | Nombre                        | Le texte correspondant à la dimension si ce n'est pas la distance verticale from-to |
| `noStartMarker` | `false`            | Booléen                       | Ne pas dessiner un marqueur de début                                                |
| `noEndMarker`   | `false`            | Booléen                       | Ne pas dessiner un marqueur de fin                                                  |

<Note>

The `vd` macro is provided by the [dimension plugin](/reference/plugins/dimension).

</Note>





