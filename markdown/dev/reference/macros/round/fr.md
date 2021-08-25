---
title: round
---

Arrondit un coin. Notez que cela ne s'adresse qu'aux coins à 90 degrés.

| Propriété | Défaut  | Type                          | Description                                                         |
| --------- | ------- | ----------------------------- | ------------------------------------------------------------------- |
| `from`    |         | [Point](/reference/api/point) | Le point de départ de l'arrondi                                     |
| `to`      |         | [Point](/reference/api/point) | Le point final de l'arrondi                                         |
| `via`     |         | [Point](/reference/api/point) | Le coin à arrondir                                                  |
| `radius`  | Maximum | Nombre                        | Le rayon en mm si c'est pas le maximum                              |
| `prefix`  |         | Chaîne de caractères          | Un préfixe à donner aux points et aux chemins créés par cette macro |
| `render`  | `false` | Booléen                       | Afficher le chemin créé par cette macro                             |
| `class`   |         | Chaîne de caractères          | Classe(s) à assigner au chemin créé par cette macro                 |

<Note>

The `round` macro is provided by the [round plugin](/reference/plugins/round).

</Note>



