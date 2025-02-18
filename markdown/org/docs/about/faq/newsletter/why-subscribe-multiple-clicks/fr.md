---
title: Pourquoi dois-je cliquer à nouveau pour confirmer que je veux m'abonner alors que j'ai déjà cliqué sur le lien de confirmation que tu m'as envoyé ?
---

Il y a deux aspects qui font que l'inscription à notre bulletin d'information nécessite plusieurs clics :

- [Les gens devraient uniquement pouvoir s'inscrire eux-mêmes](#people-should-only-be-able-to-sign-up-themselves)
- [Les demandes GET ne doivent pas apporter de modifications](#get-requests-should-not-make-changes)

## Les gens devraient uniquement pouvoir s'inscrire eux-mêmes

Celle-ci est assez facile à comprendre. Il ne devrait pas être possible d'abonner l'adresse électronique de quelqu'un d'autre à la lettre d'information de FreeSewing.

C'est pourquoi, après avoir indiqué que tu voulais t'inscrire, nous t'avons envoyé un e-mail de confirmation à l'adresse e-mail que tu as fournie. Si tu reçois cet email, cela confirme non seulement que l'adresse email fonctionne, mais aussi que tu y as accès.

En d'autres termes, ce n'est qu'après que tu ais cliqué sur le lien dans l'e-mail de confirmation que nous pouvons savoir avec certitude que :

- L'adresse électronique est valide
- Le propriétaire de l'adresse électronique veut s'abonner

Et ça devrait être tout. À l'exception d'un détail technique qui a aussi son importance :

## Les demandes GET ne doivent pas apporter de modifications

<Warning compact>C'est plus technique et plus difficile à comprendre</Warning>

Une autre raison est que nous pourrions faire en sorte que le fait de cliquer sur le lien dans ton e-mail te permette de t'inscrire immédiatement, mais cela serait contraire aux normes de l'Internet. Plus précisément, la définition de la __méthode GET__ du protocole __HTTP__ qui stipule :


<Note>
<h5>Les demandes GET ne doivent récupérer que des données et n'avoir aucun autre effet.</h5>

[wikipedia.org/wiki/Hypertext_Transfer_Protocol#M%C3%A9thodes](https://fr.wikipedia.org/wiki/Hypertext_Transfer_Protocol#M%C3%A9thodes)
</Note>

Une _demande GET_ est ce qui se passe lorsque tu suis un lien. Le simple fait de suivre un lien ne devrait pas apporter de changements (comme l'inscription à une lettre d'information).

Par exemple, lorsque tu reçois un e-mail, ton client de messagerie peut _précharger_ les liens qu'il contient en arrière-plan. Pour qu'ils se chargent plus rapidement sur si tu cliques dessus.

Évidemment, ce préchargement ne doit pas confirmer ton abonnement. C'est pourquoi tu dois cliquer sur un bouton pour confirmer. Parce que cela déclenchera une __requête POST__ et que celles-ci peuvent apporter des changements.

<Tip>

##### Cela ne s'applique pas aux utilisateurs qui s'abonnent par l'intermédiaire de leur compte

Rien de tout cela ne s'applique aux utilisateurs qui s'abonnent à notre newsletter en activant l'option
dans leur compte.  Dans ce cas, nous n'avons pas besoin de passer par le processus de validation de l'email, puisque nous l'avons déjà fait lorsque tu t'es inscrit. 

Pour les utilisateurs, l'abonnement (et le désabonnement) est instantané (si tu es curieux, 
nous utilisons une __PUT request__ idempotente sous le capot).
</Tip>


