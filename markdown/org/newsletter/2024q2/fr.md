---
date: 04-01-2024
edition: 2024q2
intro: Bienvenue dans l'édition du printemps 2024 de la newsletter de FreeSewing.
title: 2024 Édition de printemps
---

Bienvenue dans l'édition du printemps 2024 de la newsletter de FreeSewing.

Sans blague, voici ce que nous te proposons pour aujourd'hui :

- 👕 FreeSewing 3.2 apporte Tristan, Lumina, Lumira, et plus encore (lecture de 3 minutes par joost).
- 📨 Le courrier électronique gagne en difficultés, encore une fois (lecture en 1 minute par joost)
- 🕸️ Construire le réseau de confiance de FreeSewing suite à la tentative de backdoor du XZ (5 minutes par joost).
- 🤔 Comment les défis de FreeSewing se sont déplacés au fil du temps (lecture de 2 minutes par joost).

On peut commencer ?

&nbsp;

&nbsp;

## 👕 FreeSewing 3.2 apporte Tristan, Lumina, Lumira, etc.

Nous avons publié FreeSewing v3.2 plus tôt au cours du premier trimestre 2024 et il comprend 3 nouveaux modèles
, ainsi qu'une série de corrections de bugs et d'améliorations.

Jetons un coup d'œil aux faits marquants :

### The Tristan Top

Tout d'abord, il y a [le haut Tristan] (https://freesewing.org/designs/tristan). Tristan est un haut avec des coutures princesse et un laçage (facultatif) sur le devant et/ou dans le dos. Originalement il remplit de besoin pour un costume pour un festival de la Renaissance, c'est probablement un bon indicateur de ce que tu vas trouver.

Tristan a été conçu par Natalia qui a également [écrit un article de blog sur le nouveau design de Tristan] (https://freesewing.org/blog/our-newest-design-is-the-tristan-top), c'est un bon endroit pour obtenir tous les détails sur ce nouveau design.

### The Lumina and Lumira Leggings

Je te laisse une seconde pour lire à nouveau ce titre, mais oui, il y a deux modèles de leggings différents avec des noms similaires : [le Lumira Leggings](https://freesewing.org/designs/lumira) et le [Lumina Leggings](https://freesewing.org/designs/lumina).

Les deux sont nés du désir de Wouter d'avoir un bon équipement cycliste, et je te suggère de consulter les notes du concepteur pour [Lumina](https://freesewing.org/designs/lumina#notes) et [Lumira](https://freesewing.org/designs/lumira#notes) pour bien comprendre la différence entre ces designs, pourquoi ils diffèrent, et ce qui te conviendrait le mieux.

### Bug fixes and improvements

Les lecteurs réguliers de la newsletter savent que nous apportons continuellement des améliorations
sur FreeSewing.org et que celles-ci ne sont pas liées à une nouvelle version,
mais c'est une bonne occasion de les énumérer.

- Sandy a un [nouveau panneau d'option](https://freesewing.org/docs/designs/sandy/options/panels) qui a été ajouté par [Paula](https://github.com/freesewing/freesewing/pull/5861). Tu pourrais toujours créer ta jupe circulaire à partir d'un certain nombre de motifs similaires en faisant les correspondances toi-même, mais maintenant le patron s'en chargera pour toi.
- Ce qui a commencé comme un rapport de bogue pour l'aisance du biceps sur
  Jaeger s'est terminé par un changement
  de la façon dont l'encolure des bras est calculée sur Brian, en particulier la profondeur
  de l'emmanchure. Étant donné que Brian est notre bloc le plus fondamental, cela aura
  des effets conjugués sur de nombreuses autres design, tu peux t'attendre à ce que l'emmanchure soit un peu plus basse dans les versions de base des designs.
- Dans [Carlton](https://freesewing.org/designs/carlton) - et donc dans
  [Carlita](https://freesewing.org/designs/carlita) - nous avons corrigé le problème
  où la marge de couture du sous col était mal dessinée.
- Dans [Charlie](https://freesewing.org/designs/charlie), le passepoil de la poche arrière
  (4) et le parement de la poche avant (8) indiquaient à tort de couper 2 au lieu de 4
  dans la liste de coupe. This too is resolved.
- Dans [Hugo](https://freesewing.org/designs/hugo), nous avons corrigé un bug qui provoquait
  une erreur de conception lorsque le réglage complet était désactivé, et nous avons corrigé un problème
  où l'ouverture de la poche avant devenait de plus en plus étroite à mesure que la circonférence de la hanche
  augmentait.
- Nous avons ajouté une nouvelle méthode
  [Path.combine()](https://freesewing.dev/reference/api/path/combine) à
  [notre API de base](https://freesewing.dev/reference/api). Ses origines se trouvent dans une discussion
  dans issue
  \#5976  qui a été
  à l'origine déposée comme un rapport de bogue sur la façon dont Path.join() connecte les trous dans les
  chemins joints - causées soit par les opérations `move`, soit par une différence entre
  les points de fin et de début des chemins joints - pour être remplies avec un segment de ligne
  . Ce comportement est attendu, mais nous avons ajouté
  `Path.combine()` pour faciliter l'autre comportement : Combiner différents chemins
  en un seul objet Path sans altérer les opérations de dessin.
- La [macro titre](https://freesewing.dev/reference/macros/title) peut maintenant être configurée avec un paramètre `notes` et `classes.notes` dans sa configuration, ce qui permet aux concepteurs de
  d'ajouter des notes (au titre) d'une partie de patron.
- Notre [plugin i18n](https://freesewing.dev/reference/plugins/i18n)
  prend désormais en charge la traduction des tableaux imbriqués de chaînes de caractères, ce qui donne aux concepteurs
  plus de flexibilité pour concaténer les parties traduites des chaînes de caractères.

Le [billet de blog sur l'annonce de FreeSewing 3.2] (https://freesewing.org/blog/v3-2-0) contient tous les détails.

&nbsp;

---

&nbsp;

## 📨 Le courrier électronique gagne en difficultés, encore une fois

Si tu lis ceci dans ta boîte de réception, et non une copie archivée sur
FreeSewing.org, c'est que nous avons pu t'envoyer cet e-mail, ce qui est une bonne nouvelle
.

Ce dont tu ne te rends peut-être pas compte, c'est que le faire n'est pas vraiment anodin, et ce, depuis des années. Mais récemment, les choses sont devenues encore plus complexes.  Gmail
(Google) et Yahoo par exemple ont mis en place de nouvelles restrictions au premier
trimestre de
2024 ce qui
nécessite un travail supplémentaire de notre part pour maximiser les chances que cet email
atterrisse effectivement dans ta boîte de réception.

De plus, les expéditeurs d'e-mails dits "volumineux" sont soumis aux contrôles les plus stricts.
. Si tu envoies 5000 messages par jour, tu es considéré comme un expéditeur en masse et
fera l'objet d'un examen plus approfondi. Comme cette lettre d'information compte environ 14 000 abonnés, nous sommes tenus de respecter les normes les plus strictes possibles.

Évidemment, personne n'aime le spam, et je ne plaide pas contre ces règles.
C'est juste que le temps et les efforts nécessaires pour faire fonctionner à grande échelle quelque chose d'aussi
apparemment trivial que l'envoi d'un e-mail ne cessent d'augmenter à mesure que
l'Internet tend vers un modèle de facto de paiement à l'acte.

Pour l'instant, je continue à faire ces efforts, et j'espère qu'ils se sont avérés suffisants
pour que ceci arrive dans ta boîte de réception. Mais c'est quelque chose que nous devrons peut-être réexaminer plus tard
si cela devient une contrainte de plus en plus forte sur notre temps et nos ressources limités.

&nbsp;

---

&nbsp;

## 🕸️ Construire le réseau de confiance de FreeSewing suite à la tentative de backdoor du XZ (5 minutes par joost).

Selon l'endroit où tu lis les infos, tu as peut-être entendu ou lu quelque chose sur
[la tentative de porte dérobée de l'utilitaire de compression xz
] (https://arstechnica.com/security/2024/03/backdoor-found-in-widely-used-linux-utility-breaks-encrypted-ssh-connections/).

En bref, un acteur malveillant a tenté d'introduire une porte dérobée dans cet utilitaire, ce qui, en fin de compte, était une tentative d'introduire clandestinement un exploit RCE dans SSHd.

Ou, en termes [ELI5](https://en.wiktionary.org/wiki/ELI5) : Quelqu'un a contribué au code
d'une petite bibliothèque avec des intentions néfastes. Cela a été fait de manière sournoise
et la cible finale n'était pas la bibliothèque elle-même, mais plutôt un autre projet logiciel
qui utilise cette bibliothèque : Le Secure Shell Deamon. Un _daemon_ est juste un mot
plus cool pour désigner un _service_ sur un ordinateur, parce que pourquoi ne pas rendre les choses plus cool.
Ce démon ou service particulier, le démon _secure shell_, est responsable de
la gestion des connexions Secure Shell (SSH). C'est la référence en matière de gestion à distance
des systèmes Linux (et unix).

Le code introduit clandestinement une porte dérobée RCE. RCE signifie _remote code
execution_, c'est-à-dire qu'il te permet de _faire des choses_ à distance sans avoir besoin de
s'authentifier ou quoi que ce soit d'autre. Ou, pour le dire autrement, il permet de contrôler
un système informatique distant auquel on ne devrait normalement pas avoir accès.
Le fait qu'il soit _gated_ signifie que l'auteur de
le code malveillant a pris des mesures pour s'assurer qu'il était le seul à pouvoir utiliser le code malveillant
. Comme une porte dérobée avec une clé.

Il est difficile d'exagérer la gravité de cette tentative de backdooring, essentiellement
tous les systèmes Linux de la planète.  Ce n'est pas seulement le système d'exploitation
le plus utilisé au monde, sa domination sur les systèmes d'exploitation des serveurs est écrasante.
Ou comme je le dis souvent : _Tout ce qui compte fonctionne sous Linux_.

Cette histoire est en cours et j'espère pour ma part qu'elle fera l'objet d'une mini-série sur Netflix
avec David Cross dans le rôle de [Andres
Freund] (https://github.com/anarazel), mais je m'écarte du sujet. C'est la lettre d'information de FreeSewing
, alors j'ai voulu extraire de cette histoire quelque chose que je pense
être pertinent pour FreeSewing, ou vraiment pour n'importe quel projet open source.

### L'épuisement du mainteneur et le long con de gagner la confiance

L'un des éléments fascinants de cette histoire est de savoir _qui_ a apporté les modifications,
et pourquoi elles ont été acceptées sans un examen suffisant pour révéler l'intention malveillante
de la contribution.

Parce que l'utilisateur qui les a créés a contribué pendant **des années** au projet
et qu'à la lumière de ce travail, son statut s'est élevé à un niveau où il y avait beaucoup
de confiance implicite basée sur son travail, malgré le fait qu'on ne sait pratiquement rien de
qui ou ce qui se cache derrière le nom d'utilisateur `JiaT75` (dans ce cas). Une telle _long con_ est
un investissement important en temps et en efforts, donc l'hypothèse actuellement retenue
est qu'il s'agit d'un acteur national (pense à la NSA ou à l'équivalent
d'un autre pays).  Il est également important de noter que le responsable de xy avait
du mal à faire face à la longue série de responsabilités liées à la maintenance du logiciel
et qu'il cherchait activement de l'aide pour éviter le burnout.  C'est un scénario
qui est scandaleusement courant dans les projets open source et qui crée une situation
où les acteurs malveillants peuvent trop facilement profiter des mainteneurs épuisés
qui cherchent désespérément à se décharger d'une partie du travail.

### Établir un réseau de confiance

Ce problème de _qui peux-tu croire_ n'est bien sûr pas nouveau. Une façon de la contrer
est d'établir un _réseau de confiance_.  C'est ainsi que les choses se passent dans les grands projets
de logiciels libres impliquant de nombreux bénévoles, tels que [le projet Debian
] (https://www.debian.org/).

Concrètement, un tel réseau de confiance repose sur des relations entre
personnes qui connaissent et ont vérifié la véritable identité de chacune d'entre elles.  Par exemple,
, il y a un certain nombre de personnes dans la communauté FreeSewing que j'ai rencontrées dans la vraie vie
. Nous ne nous sommes pas simplement rencontrés face à face, mais nous avons passé du temps ensemble, nous savons
où nous vivons, nous connaissons le partenaire ou la famille de l'autre, ou nous avons d'autres
moyens tangibles qui fournissent un niveau élevé d'assurance que cette personne est vraiment
ce qu'elle prétend être.

Ces personnes, à leur tour, peuvent avoir des liens similaires avec d'autres personnes qu'elles connaissent,
qu'elles ont rencontrées, et en qui elles ont confiance à un niveau qui va bien au-delà du monde en ligne.  Cela
crée un réseau de confiance où tu peux faire confiance à tes amis, et les amis de tes amis et ainsi de suite.

À la lumière des événements actuels, et en reconnaissance de l'accélération rapide de
ce qui est possible avec l'intelligence artificielle générative, FreeSewing
limitera dorénavant tout accès en écriture ou privilèges élevés aux membres de la communauté
qui font partie du réseau de confiance de FreeSewing.

Nous continuerons bien sûr à accepter - ou plutôt à examiner - les contributions de tout le monde. Mais les autorisations qui permettent de faire du mal seront
limitées aux personnes pour lesquelles la confiance a été établie AFK (away from
keyboard).

Afin de faciliter la construction d'un tel réseau de confiance, nous allons commencer à documenter
ces liens entre les personnes.  Cela permettra aux personnes qui souhaitent
prendre plus de responsabilités au sein de FreeSewing de consulter le réseau de confiance et
de voir qui vit près d'eux afin qu'ils puissent se connecter à notre réseau de confiance par l'intermédiaire de
cette personne.

Je sais qu'il est très peu probable que FreeSewing soit la cible d'une tentative de porte dérobée
par un acteur national, mais adopter les meilleures pratiques et être
transparent sur la façon dont nous faisons les choses est une bonne idée.

Je vais donc commencer à construire et à documenter ce réseau de confiance au cours des deux
prochaines semaines, et passer en revue tous les contrôles d'accès et toutes les autorisations pour m'assurer que nous
faisons tout ce que nous pouvons pour empêcher même les acteurs les plus dévoués d'empoisonner
le puits.

&nbsp;

---

&nbsp;

## 🤔 Comment les défis de FreeSewing se sont déplacés au fil du temps.

Sais-tu que [FreeSewing v1 a été publié il y a 7 ans et 7 jours
] (https://freesewing.org/blog/announcing-freesewing) ?  Depuis, nous avons
apporté de nombreux changements, petits et grands, et notre bibliothèque de base et notre système de plugins ont
mûri pour devenir un moyen fiable - et certainement influencé - de concevoir des patrons de couture paramétriques
.

Les défis les plus intéressants d'un point de vue technique ont plus ou moins été résolus. Ce qui reste, c'est le côté face à l'utilisateur, ou
l'expérience utilisateur (UX) comme nous aimons l'appeler.

FreeSewing peut faire beaucoup de choses, alors comment mettre toutes ces fonctionnalités à la disposition des utilisateurs de
sans les submerger ? Est-ce que c'est même possible sur téléphone qui est le moyen principal
par lequel les gens vont en ligne maintenant. Comment créer une expérience intuitive,
ou guider quelqu'un qui arrive sur FreeSewing.org après une recherche _free sewing patterns_
Google vers une compréhension de ce qu'est et fait FreeSewing dans les quelques
secondes où les gens sont susceptibles de lui donner une chance avant de passer au lien
suivant dans leurs résultats de recherche.

Pour être clair : je ne connais pas la réponse à ces questions. Mais c'est
de plus en plus ce à quoi nous consacrons notre temps. Le pourcentage de personnes qui
utilisent directement notre logiciel est insignifiant par rapport au nombre de personnes qui
consomment (uniquement) notre logiciel par l'intermédiaire de notre site Web. Pour la plupart des visiteurs, FreeSewing
**is** est un site Web et s'il s'agit d'autre chose, ce n'est probablement pas clair pour eux,
ou même pertinent.

Il est évident qu'il y a matière à amélioration, mais souvent il n'y a pas de chemin évident
. Peut-être -- ou devrais-je dire presque certainement -- c'est un domaine dans lequel
je n'ai pas le talent ou les compétences nécessaires pour élaborer une sorte de grande stratégie globale. Mais je me retrouve à remettre en question beaucoup de mes propres idées ou impulsions
dans ce domaine.

Alors, je me demandais si nous pouvions faire une petite expérience. Une expérience au cours de laquelle je
te pose - mon cher lecteur - une question simple. Es-tu prêt pour cela ? Voici la question :

> **Qu'est-ce que FreeSewing ?**

J'aimerais entendre ta réponse. Tu peux simplement cliquer sur répondre pour me le faire savoir.

<small>_PS : J'ai enterré cette question à la fin parce que j'ai l'impression que si tu as lu tout
ce qui précède, j'ai probablement envie d'entendre tes pensées.</small>
