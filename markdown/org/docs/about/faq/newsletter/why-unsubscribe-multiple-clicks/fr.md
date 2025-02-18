---
title: Pourquoi dois-je cliquer à nouveau pour confirmer que je veux me désabonner de la lettre d'information ?
---

Nous pourrions faire en sorte que le fait de cliquer sur le lien dans ton e-mail te permette de te désinscrire immédiatement, mais cela serait contraire aux normes de l'Internet. Plus précisément, la définition de la __méthode GET__ du protocole __HTTP__ qui stipule :


<Note>
<h5>Les demandes GET ne doivent récupérer que des données et n'avoir aucun autre effet.</h5>

[wikipedia.org/wiki/Hypertext_Transfer_Protocol#M%C3%A9thodes](https://fr.wikipedia.org/wiki/Hypertext_Transfer_Protocol#M%C3%A9thodes)
</Note>

Une _demande GET_ est ce qui se passe lorsque tu suis un lien. Le simple fait de suivre un lien ne devrait pas apporter de changements (comme la désinscription à une lettre d'information).

Par exemple, lorsque tu reçois un e-mail, ton client de messagerie peut _précharger_ les liens qu'il contient en arrière-plan. Pour qu'ils se chargent plus rapidement sur si tu cliques dessus.

Évidemment, ce préchargement ne doit pas te désinscrire. C'est pourquoi tu dois cliquer sur un bouton pour confirmer. Parce que cela déclenchera une __requête POST__ et que celles-ci peuvent apporter des changements.

<Tip>

##### Cela ne s'applique pas aux utilisateurs qui se désinscrivent par l'intermédiaire de leur compte

Rien de tout cela ne s'applique aux utilisateurs qui se désinscrivent à notre newsletter en désactivant l'option
dans leur compte. Dans ce cas, tu cliques déjà sur un bouton, plutôt
que sur un lien dans ton email.

Si tu es curieux, nous utilisons une __PUT request__ idempotente sous le capot.
</Tip>


