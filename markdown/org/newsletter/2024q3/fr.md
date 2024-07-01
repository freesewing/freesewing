---
date: "2024-07-01"
edition: "2024q3"
intro: "Bienvenue dans l'édition d'été 2024 de la Newsletter de FreeSewing."
title: "2024 Édition d'été"
---

Bienvenue dans l'édition d'été 2024 de la newsletter FreeSewing.

Voici ce que nous avons concocté pour vous en ce premier jour de juillet :

- 💰 Vercel a unilatéralement annulé notre sponsoring open source, et maintenant ? (lecture de 2 minutes par joost).
- 🚢 Pourquoi FreeSewing 3.3 est retardé, et pourquoi vous vous en fichez probablement (lecture d'une minute par joost)
- 🇨🇭But pouvez-vous l'utiliser ? (3 minutes de lecture par joost)
- 🤖 Aucune IA n'a été utilisée pour créer cette newsletter (seulement pour la traduire) (1 minute de lecture par joost)

Pouvons-nous commencer ?

&nbsp;  

&nbsp;

&nbsp;  

&nbsp;

## 💰 Vercel a unilatéralement annulé notre parrainage open source, et maintenant ?

Le 18 juin, nous avons reçu l'email suivant :

> *Hey there,*
>
> *Votre équipe FreeSewing est actuellement inscrite au programme de parrainage de Vercel.
>
> *Votre remise de 100% expire le 14 juin. Pour vous donner le temps de gérer cette transition, nous allons automatiquement inscrire votre équipe à une réduction de 300$/mois pour les 6 prochains mois, commençant le 14 juin et se terminant le 14 décembre.
>
> Merci de vous associer à nous.

Je dois commencer par énoncer l'évidence : Vercel a gracieusement sponsorisé notre
hébergement et nos déploiements depuis un certain temps déjà, et nous l'apprécions beaucoup.
nous en sommes très reconnaissants.

Ceci étant dit, le message est un peu ambigu au point d'être trompeur.
Pour commencer, nous ne sommes pas le seul projet open source à avoir reçu cet
courriel.  Une petite recherche sur Google montre que d'autres projets [ont reçu un message similaire] ().
[similar](https://x.com/Siddhant_K_code/status/1801447290076545099)
(https://www.reddit.com/r/nextjs/comments/1dfh7ak/vercel_just_ended_my_opensource_sponsorship/?rdt=41666).

Ce qui semble trompeur, c'est que Vercel donne l'impression que l'accord a _expiré_.
Mais il est plus que curieux que tous les rapports que j'ai trouvés à ce sujet soient
tous expirent exactement à la même date (14 juin).

Étant donné que Vercel [n'offre plus de
parrainage] (https://vercel.com/guides/can-vercel-sponsor-my-open-source-project),
il semble qu'ils aient décidé d'annuler l'accord et d'offrir un crédit de 6 mois pour faciliter la transition.
pour faciliter la transition.

Ainsi, bien que - une fois de plus - nous soyons reconnaissants pour le service gratuit que nous avons reçu, le message concernant ces changements n'est pas le même que celui de Vercel.
service gratuit que nous avons reçu, les messages concernant ces changements semblent brouiller les pistes quant aux raisons de cette décision.
les raisons de ces changements, ainsi que de créer une incertitude quant à la suite des événements.
ce qui se passera ensuite.

Nous sommes maintenant dans la période de transition où ils réduiront notre facture mensuelle de 300 $ pour les six prochains mois.
300 dollars pour les six prochains mois.  Nous n'avons donc pas eu la possibilité d'agir
avant, étant donné que le courriel nous est parvenu 4 jours après le début de la période de transition.
début de la période de transition.

Nous allons donc garder un œil sur les choses, examiner les alternatives et nos options, mais il se peut que nous devions déplacer certaines choses.
mais il se peut très bien que nous devions changer certaines choses avant le 14 décembre.
Reste à savoir quel sera l'impact sur nos finances.


&nbsp;

---

&nbsp;


## 🚢 Pourquoi FreeSewing 3.3 est retardé, et pourquoi vous vous en fichez probablement

FreeSewing 3.3.0 va être la plus grosse version depuis la 3.0. C'est à dire, quand elle
car elle a été quelque peu bloquée pendant un certain temps.

Les utilisateurs de FreeSewing aux yeux d'aigle ont peut-être remarqué que si vous générez un patron
sur [FreeSewing.org] (https://freesewing.org/) aujourd'hui, il porte le numéro de version "v3.3.0".
version `v3.3.0-rc.1`. Ce `rc` signifie _release candidate_, ce qui indique qu'il s'agit d'une pré-version que nous avons développée.
qu'il s'agit d'une pré-version que nous prévoyons de publier à un moment donné en 3.3.0, mais nous n'en sommes pas encore là.
mais nous n'en sommes pas encore là.

Les raisons pour lesquelles nous n'en sommes pas encore là ont tout à voir avec nos efforts pour
refactoriser notre éditeur de modèles -- plus d'informations à ce sujet plus bas dans cette lettre d'information -- mais
mais ces changements sont soigneusement isolés afin que nous puissions continuer à
continuer à offrir le meilleur et le plus récent de notre travail sur FreeSewing.org.

Ainsi, vous pourriez continuer à voir cette version `v3.3.0-rc.1` pendant un certain temps, ou vous pourriez voir une version `v3.3.0-rc.1` pendant un certain temps.
voir une `v3.3.0-rc.2` ou quelque chose comme ça, mais soyez assuré qu'à terme, la version 3.3.0 sera sur le site,
v3.3.0 est en route.

Mais encore une fois, si FreeSewing.org est la façon dont vous consommez notre logiciel, vous n'avez pas à vous inquiéter.
rien à craindre.


&nbsp;

---

&nbsp;

## 🇨🇭 Mais pouvez-vous swizzler le?

Comme mentionné quelques paragraphes plus haut, la raison pour laquelle la version 3.3.0 est retardée est
parce que nous sommes en train de remanier notre éditeur de patrons. Notre motivation est la suivante
lorsque nous avons terminé la version 3, il y a eu tellement de changements dans le
de conception, de backend, et de frontend que c'était une tâche montagneuse de les relier tous
dans un nouveau FreeSewing.org.

C'est aussi pourquoi, à l'époque, nous avons transplanté notre ancien éditeur de patrons
sans trop de changements. Je peux honnêtement dire qu'à l'époque, je n'avais tout simplement pas
n'avais plus assez de carburant dans le réservoir pour ajouter cela à la fin de la longue marche
vers la v3.

Nous avons également choisi de partager le code entre nos différents environnements web.
donc non seulement FreeSewing.org mais aussi [FreeSewing.dev].
[FreeSewing.dev] (https://freesewing.dev/) et notre environnement de développement autonome.
développement autonome.  Partager du code de cette façon est parfaitement logique, si vous voulez gérer les modes sombre et clair par exemple -- ou différents modes de développement.
ou différents thèmes, il n'est pas nécessaire de réimplémenter cette logique pour chaque thème.
de réimplémenter cette logique pour chaque environnement web.

Notre éditeur de motifs fait partie de ce code _partagé_, mais il est bien sûr un peu plus complexe que la gestion des thèmes.
un peu plus complexe que la gestion des thèmes.  En principe, l'idée reste solide,
mais les aspects pratiques de sa mise en œuvre commencent à nous ralentir.
ralentir.

D'une part, il est facile d'apporter des modifications à l'éditeur qui casseront
quelque chose d'autre.  L'environnement de développement autonome pour les personnes cherchant à
l'environnement de développement autonome pour les personnes cherchant à développer de nouveaux modèles est la première victime de ces pannes.

Mais ce n'est pas parce qu'il est facile de le casser qu'il est... facile.  Au contraire,
c'est plutôt compliqué de s'y retrouver, ce qui crée un énorme
obstacle à surmonter pour les contributeurs, de sorte que seuls les plus intrépides osent s'y aventurer.
s'y aventurer.

Si je veux un jour prendre ma retraite, nous devons faire en sorte que ce soit plus facile à comprendre et plus facile à changer.
plus facile à modifier.  C'est ce qui m'a poussé à créer une branche de fonctionnalités et à m'atteler à cette tâche un peu intimidante.
la tâche un peu intimidante de la réimplémenter.

Mais il y a aussi une autre raison. Parce que nous recevons parfois des questions telles que _puis-je intégrer ceci dans mon propre site web pour vendre des produits ?
intégrer ceci dans mon propre site web pour vendre mes propres patrons ?
est _oui, mais ... ce n'est pas facile_.  Je voulais rendre cela facile -- ou au moins
plus facile -- ce qui inclut la possibilité pour les gens d'utiliser notre éditeur de patrons, mais
mais de le faire à leur façon.

En d'autres termes, il s'agit d'avoir quelque chose de prêt à l'emploi que l'on peut intégrer, mais aussi d'avoir la flexibilité de modifier ces parties.
la flexibilité de changer les parties que vous aimeriez voir différemment.
C'est là qu'intervient le _swizzling_. Changer une implémentation par quelque chose d'autre
par quelque chose d'autre, généralement en remplaçant une implémentation par défaut par quelque chose de personnalisé au moment de l'exécution.
personnalisé au moment de l'exécution.

Supposons que vous souhaitiez utiliser notre éditeur de patrons, mais que vous n'aimiez pas du tout l'icône utilisée pour la marge de couture.
pour la marge de couture. Eh bien, vous pouvez simplement _swizzler_ cette icône en passant
votre propre version, ou bien sûr quelque chose de plus ambitieux.

L'objectif final sera un composant React que nous publierons sur NPM et que vous pourrez intégrer à votre projet.
que vous pouvez intégrer à votre projet, pour éventuellement remplacer certains (sous-)composants.
composants de celui-ci.

C'est un travail en cours, mais aujourd'hui il supporte déjà le swizzling de 143
composants (il y a beaucoup de choses qui vont dans un éditeur de modèles).  Mais vous serez également
de swizzler différents hooks, par exemple celui qui gère l'état de l'éditeur.
de l'éditeur. Bien qu'il soit utile de souligner que nous supportons déjà 4 états
backend : stockage local, stockage de session, état de l'ancre de l'URL, et état natif de React
natif.

Vous serez également en mesure de modifier les différentes méthodes que nous utilisons, comme pour fournir une traduction de
la traduction, les nombres ronds, etc.

Bien que cela soit (devrait être ?) excitant pour les personnes qui cherchent à construire avec
FreeSewing, le but principal ici est d'avoir une fondation qui soit stable mais
suffisamment flexible pour construire des choses sympas. C'est quelque chose que, pour ma part
je suis très enthousiaste à l'idée de ce projet.

&nbsp;

---

&nbsp;

## 🤖 Aucune IA n'a été utilisée pour créer cette newsletter (seulement pour la traduire)

Si vous êtes comme moi, vous n'entendez rien au delà du bruit de vos yeux qui roulent
quand les gens commencent à parler d'_AI_, mais il faut quand même que je clarifie
quelque chose.

FreeSewing a une équipe de traducteurs bénévoles qui font un travail formidable pour s'assurer que le plus grand nombre possible de personnes puissent profiter du site.
que le plus grand nombre puisse profiter des fruits de notre travail.  Le fonctionnement est le suivant
Nous écrivons d'abord tout en anglais, puis les traducteurs se mettent à l'œuvre pour
traduire petit à petit.  Si certaines parties n'ont pas encore été traduites, nous revenons simplement au contenu anglais.
nous revenons simplement au contenu anglais.

Cela fonctionne très bien pour le site web, où la majeure partie du contenu est déjà traduite.
traduit et lorsque de nouveaux éléments sont ajoutés, ils finissent par être traduits également.
et, avec un peu de retard, tout va bien.

Cela ne fonctionne _pas_ pour cette newsletter, et c'est bien sûr comme
tout ce qui ne va pas avec FreeSewing, c'est entièrement de ma faute.  Vous voyez, je suis paresseuse à
et pour ne rien arranger, j'ai tendance à mieux travailler lorsqu'il y a une date butoir.
Ce qui veut dire qu'il est maintenant - vérifie l'horloge - presque 17 heures le jour où la newsletter doit être envoyée.
la lettre d'information doit être envoyée, et je suis encore en train de l'écrire.

Il va sans dire que cela ne laisse absolument pas le temps aux gens de traduire mes
Je me rabats donc sur la traduction automatique.  I
Je sais que nos traducteurs détestent que je fasse cela, car cela donne une mauvaise image de tout le travail qu'ils ont fourni.
leur dur labeur.

Donc, si vous lisez ce document dans une édition non anglaise et que vous trouvez que la traduction laisse à désirer, sachez que c'est à cause de l'absence de traduction.
traduction, soyez assuré que c'est de ma faute et que nos traducteurs n'y sont pour rien.
ne sont pas à blâmer.


joost


