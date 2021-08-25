---
title: title
---

Ajoute en brut des snippets à votre patron.

| Propriété  | Défaut  | Type                          | Description                                                                                                                                                                |
| ---------- |:-------:| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `at`       |         | [Point](/reference/api/point) | Le point où insérer le titre                                                                                                                                               |
| `nr`       |         | Chaîne de caractères          | Le nombre de parties de patron                                                                                                                                             |
| `title`    |         | Chaîne de caractères          | Le nom de la partie de patron. Si le titre n'est pas paramétré ou bien une chaîne de caractères vide, cela ne sera pas affiché, et la version apparaîtra en dessous de nr. |
| `prefix`   |         | Chaîne de caractères          | Un préfixe à ajouter aux points créés. Cela autorise plus d'un titre par partie, du moment que vous leur donnez un préfixe différent.                                      |
| `append`   | `false` | Booléen                       | Réglez ça sur `true` pour ajouter `nr` à n'importe quel texte déjà indiqué dans l'attribut `at` de Point, plutôt que de l'écraser                                          |
| `rotation` |    0    | Nombre                        | Une rotation optionnelle en degrés                                                                                                                                         |
| `scale`    |    1    | Nombre                        | Un facteur optionnel de mise à l'échelle                                                                                                                                   |

<Note>

The `title` macro is provided by the [title plugin](/reference/plugins/title).

</Note>



