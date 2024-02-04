---
title: Pourquoi dois-je cliquer à nouveau pour confirmer que je veux m'abonner alors que j'ai déjà cliqué sur le lien de confirmation que tu m'as envoyé ?
---

Il y a deux aspects qui font que l'inscription à notre bulletin d'information nécessite plusieurs clics :

- [Les gens ne devraient pouvoir s'inscrire qu'eux-mêmes](#people-should-only-be-able-to-sign-up-themselves)
- [Les demandes GET ne doivent pas apporter de modifications](#get-requests-should-not-make-changes)

## Les gens ne devraient pouvoir s'inscrire qu'eux-mêmes

Celle-ci est assez facile à comprendre. One should not be able to subscribe somebody else's email address to the FreeSewing newsletter.

This is why, after indicating you want to sign up, we sent you a confirmation email to the email address you provided. If you receive this email, it confirms not only that the email address is working, but also that you have access to it.

In other words, only after you click the link in the confirmation email can we know for certain that:

- L'adresse électronique est valide
- Le propriétaire de l'adresse électronique veut s'abonner

C'est là que ça se terminerait. À l'exception d'un détail technique qui a aussi son importance :

## Les demandes GET ne doivent pas apporter de modifications

<Warning compact>C'est plus technique et plus difficile à comprendre</Warning>

Another reason is that while we could make it so that clicking the link in your email would immediately subscribe you, it would be in violation of internet standards. Plus précisément, la définition de la méthode GET du protocole HTTP ____ ____ qui stipule ce qui suit :


<Note>
<h5>Les demandes GET ne doivent récupérer que des données et n'avoir aucun autre effet.</h5>

[wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages)
</Note>

Une demande GET __ est ce qui se passe lorsque tu suis un lien. Merely following a link should not make any changes (like subscribing you to a newsletter).

For example, when you receive an email, your email client may _preload_ the links in it in the background. So that they are quicker to load should you click on them.

Évidemment, ce préchargement ne doit pas confirmer ton abonnement. Which is why you need to click a button to confirm. Because that will trigger a __POST request__ and those can make changes.

<Tip>

##### Cela ne s'applique pas aux utilisateurs qui s'abonnent par l'intermédiaire de leur compte

. Rien de tout cela ne s'applique aux utilisateurs qui s'abonnent à notre newsletter en activant l'option
dans notre compte.  Dans ce cas, nous n'avons pas besoin de passer par le processus de validation de l'email
, puisque nous l'avons déjà fait lorsque tu t'es inscrit. 

Pour les utilisateurs, l'abonnement (et le désabonnement) est instantané (si tu es curieux, 
nous utilisons une __PUT request__ idempotente sous le capot).
</Tip>


