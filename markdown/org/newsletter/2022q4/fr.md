---
date: "2022-10-01"
edition: "2022q4"
intro: "2022 Édition d'automne"
title: "2022 Édition d'automne"
---

Bienvenue dans l'édition d'automne 2022 de la lettre d'information de FreeSewing. Voici ce qu'il y a pour toi aujourd'hui :

- 🏁 FreeSewing 2.22 est sorti et sera la version finale de la v2 (lecture en 1 minute - par Joost).
- 🔱 FreeSewing version 3 ; Qu'est-ce que c'est, et quand peux-tu l'attendre ? (lecture en 3 minutes - par Joost)
- 🚀 Nous avons franchi le cap des 50 000 commits (lecture en 1 minute - par Joost).
- ⛵ FreeSewing au Serendiep à Rotterdam (lecture en 1 minute - par Lexander).
- 🕵️ Derrière les coutures : Enoch (lecture de 4 minutes - par Karen & Enoch)

Sautons dans le vif du sujet !

&nbsp;

&nbsp;

## 🏁 FreeSewing 2.22 est sorti et sera la version finale de la v2.

FreeSewing 2.22 est sorti à la fin du mois d'août, avec une nouvelle peluche conçue par Wouter - qui a également signé pour Hi the shark.  Cette fois, il s'agit de [Octoplushy](https://freesewing.org/designs/octoplushy/) qui est, tu l'as deviné , une pieuvre.

Ce qui est certainement moins adorable, mais peut-être pas pertinent, c'est qu'il s'agira de la dernière version mineure de la version 2.  C'est vrai, la version 3 de FreeSewing arrive , et bien que nous continuions à soutenir la version 2 - sans oublier qu'elle alimente toujours FreeSewing.org - nous nous concentrons maintenant sur la prochaine version majeure : FreeSewing v3.

&nbsp;

---

&nbsp;

## 🔱 FreeSewing version 3 ; Qu'est-ce que c'est, et quand peux-tu l'attendre ?

Depuis un peu plus d'un mois, nous avons mis la base de code de la version 2 en stockage à long terme et avons commencé à travailler sur la version 3. Et même s'il faudra un certain temps avant que cette version ne soit mise en production - ce qui signifie FreeSewing.org pour nous - j'aimerais vous présenter brièvement certaines des choses qui se passent actuellement avec FreeSewing version 3 et qui m'enthousiasment le plus.

### Configuration au niveau de la pièce, alias support de pack

Sur [notre feuille de route](https://github.com/freesewing/freesewing/discussions/1278) - qui, si tu as été attentif, contient de plus en plus de choses sous la rubrique *déjà mises en œuvre* - nous avions ce que l'on appelle un soutien pour les packs **. L'idée était que nous aimerions rendre possible la création de designs en combinant librement différents composants. Par exemple, tu pourrais prendre les manches d'un pack de manches ** et le col d'un pack de cols **, ajouter des poches d'un pack de cols ** et ainsi de suite.

C'est l'une de ces choses qui a beaucoup de sens, mais qui soulève la question : Comment tout cela fonctionnera-t-il sous le capot ? Dans la version 2 de FreeSewing, la mise en œuvre de ces idées n'aurait pas été triviale, car même si nous prenons en charge l'extension des motifs à d'autres dessins, le processus est trop lourd pour ce niveau d'assemblage ad hoc de différents dessins.

C'est donc un point que nous voulions aborder dans la version 3, et pour ce faire, nous avons essentiellement déplacé toute la configuration au niveau de la pièce. Par exemple, une pièce de manchon aura ses propres options définies et la liste des mesures dont elle a besoin, etc. Tu peux maintenant simplement retirer cette partie de manche du modèle (ou à l'avenir d'un pack de manches) et l'utiliser dans ton propre modèle sans avoir à te soucier des mesures, des options et ainsi de suite.

C'est le changement le plus fondamental de la V3, mais c'est quelque chose qui ouvrira la porte à de nombreuses combinaisons créatives de différents modèles à l'avenir.

### Prise en charge de plusieurs ensembles de paramètres, ou comme nous les appelons : Multisets

Les patrons sont finalement rédigés pour les utilisateurs en leur transmettant un ensemble de paramètres **. Les mesures à utiliser, la façon dont tu aimerais que les options soient juste à ta façon et ainsi de suite.

Dans la version 3 de FreeSewing, tu pourras toujours transmettre plusieurs ensembles de ces paramètres au modèle. Il y a un grand nombre d'applications intéressantes. Par exemple, si tu travailles avec un corps asymétrique, tu pourras transmettre deux séries de mesures différentes et dire "*donne-moi ces parties avec ces mesures, et les autres parties avec ces mesures*".

Nous utilisons également cette nouvelle fonctionnalité sous le capot pour gérer la façon dont nous *sample* patterns. C'est lorsque nous comparons différentes itérations d'un modèle entre elles. Avant, c'était un peu boulonné sur le dessus, d'une manière semi-gênante. Mais dans la version 3, il suffit de compiler une liste de différents ensembles de paramètres (comme on se lasse assez vite de taper/dire *ensembles de paramètres* , nous les appelons *multisets*) et ensuite nous pouvons *simplement* les passer au modèle et *fonctionne tout simplement*.

### Support de pile

La prise en charge des piles dans la phase de mise en page est étroitement liée à la prise en charge des multi-ensembles. Les piles sont un peu comme les couches de **. Généralement, lors de la mise en page, chaque partie est indépendante et nous les mettons en page individuellement. Maintenant, tu peux dire que les différentes parties font partie de la même pile ** et qu'elles seront empilées les unes sur les autres dans la mise en page, comme des couches.

C'est encore une fois quelque chose que nous utilisons en interne pour certains de nos travaux d'échantillonnage et de comparaison, mais cela ouvre également des possibilités intéressantes et je suis curieux de voir comment les gens finiront par utiliser ces fonctionnalités.

### Et bien plus encore

Il y a vraiment beaucoup plus de choses dans la version 3, avec des améliorations et des ajustements petits et grands. Mais il s'agit là de quelques-uns des changements les plus fondamentaux. Nous y travaillons encore, alors si tu as une idée géniale, [notre feuille de route](https://github.com/freesewing/freesewing/discussions/1278) est la façon la plus formelle de la proposer. Pour une discussion plus informelle, arrête-toi sur [le Discord FreeSewing](https://discord.freesewing.org/) où nous traînons et coordonnons notre travail.

### Quand la version 3 sera-t-elle disponible ?

La réponse courte à la question de savoir quand tu peux attendre la version 3 est *en 2023*. Si cela te semble long, c'est parce que nous retravaillons vraiment les choses à partir de zéro. Les changements décrits ci-dessus sont vraiment des changements fondamentaux, et ils doivent se répercuter sur l'ensemble de la machinerie construite sur ces fondations avant que tout ne soit réuni dans quelque chose qui puisse être publié sur FreeSewing.org.

Et nous voulons aussi être sûrs de bien faire les choses. Nous allons donc continuer à travailler et le publier lorsqu'il sera prêt.

&nbsp;

---

&nbsp;

## 🚀 Nous avons franchi le cap des 50 000 commits.

Il y a quelques jours, nous avons franchi le seuil des 50 000 commits [sur notre monorepo](https://github.com/freesewing/freesewing).

Les chiffres en eux-mêmes ne sont pas vraiment significatifs, sans compter que tu peux toujours jouer avec le système. Je ne veux donc pas dire que ce jalon a en soi une signification particulière. Mais j'ai l'impression qu'au moment où le plus gros du travail (sur la v3) se passe en coulisses, cela permet de rappeler que FreeSewing est un peu comme un cygne. Il peut sembler glisser vers l'avant apparemment sans effort à un rythme régulier, mais un pédalage frénétique se déroule sous la surface.

&nbsp;

---

&nbsp;

## ⛵ FreeSewing au Serendiep à Rotterdam (lecture en 1 minute - par Lexander).

FreeSewing a été invité à se joindre à une exposition organisée par Serendiep, qui est un navire abritant l'art et la science, avec un espace théâtral et des machines à l'intérieur. L'exposition d'une semaine faisait partie d'un ensemble plus vaste : la ville de Rotterdam célèbre le 150e anniversaire de l'un de ses canaux.

L'atelier a commencé par moi, Lexander, qui ai présenté FreeSewing et expliqué le concept, et nous avons passé la soirée à confectionner un Teagan sans manches en guise de chemise de nuit. Nous étions avec un groupe de quelques personnes et nous avons fait tout le processus de FreeSewing : prendre les mesures, assembler le patron en papier, couper les pièces de tissu et les coudre ensemble.

La Teagan s'adapte bien et dans l'ensemble, c'était une expérience vraiment amusante ! J'ai hâte de voir ce que l'avenir nous réserve.

&nbsp;

---

&nbsp;

## 🕵️ Derrière les coutures : Enoch

L'un de nos animateurs du Contributor Call s'est assis (virtuellement) avec Enoch pour en savoir un peu plus sur son parcours et son cheminement pour devenir un contributeur de FreeSewing ! L'entretien ci-dessous a été édité pour des raisons de longueur, et toute erreur, omission, etc. est entièrement de la faute de l'intervieweur.

### Comment as-tu découvert FreeSewing ?

J'ai appris à coudre à l'école primaire, mais depuis, je n'avais pas fait beaucoup de couture jusqu'à la pandémie. En mars 2020, juste avant l'enfermement, j'ai bouclé un projet de longue date, alors, comme beaucoup de gens, je me suis retrouvé avec un peu de temps libre. Juste avant cela, j'avais enfin reçu un diagnostic pour expliquer mon combat de plusieurs décennies contre l'épuisement (le syndrome des jambes sans repos, entre autres), et la prise de médicaments signifiait que, pour la première fois, j'avais assez d'énergie pour avoir des intérêts et des passe-temps.

J'ai donc dépoussiéré ma vieille machine à coudre et j'ai commencé à m'amuser. À un moment donné, j'ai essayé de faire une pièce pour laquelle je ne trouvais pas de modèle, alors j'ai appris suffisamment de dessins pour rassembler les éléments nécessaires à sa réalisation. Parce que je suis un codeur qui s'intéresse à l'open source, une fois que je l'ai fait sur papier pour moi-même, j'ai voulu l'automatiser, et en l'automatisant, j'ai voulu le rendre disponible pour le plus grand nombre d'organismes possible. J'ai décidé que j'avais besoin d'un modèle paramétrique, et j'ai essayé plusieurs choses avant de trouver FreeSewing.

### Comment es-tu devenu contributeur ?

Une fois que j'ai commencé à développer des patrons dans FreeSewing, je me suis surprise à penser : "Ce serait cool s'il y avait ça. Ce serait cool s'il y avait ça". Par exemple, lors de la conception, je voulais pouvoir générer des dessins au trait pour avoir un aperçu de l'impact des différents réglages et mesures sur les vêtements finis, puis je voulais pouvoir déposer mes tissus et voir ce qu'ils donneraient sur les modèles. Ajouter les types d'options personnalisées que je voulais n'était pas très simple, donc mon premier RP était moi essayant de rendre plus facile le remplacement de petites parties de l'établi. Lors de mes premiers PR, j'ai cassé quelques trucs, alors je me suis plus impliqué en essayant de nettoyer derrière moi. Et puis j'ai vraiment commencé à m'y intéresser.

J'ai déjà travaillé sur des logiciels open source en petites quantités, et j'ai été le seul développeur d'un logiciel qui était techniquement open source, mais c'est la première fois que je fais partie de la communauté d'un logiciel open source, et je trouve cet aspect très gratifiant. Le fait que toutes ces personnes se concentrent sur tous ces domaines différents pour que ce soit bon, et qu'elles soient toutes en communication constante les unes avec les autres, c'est super cool. L'élément humain compte vraiment, et FreeSewing est tellement axé sur l'élément humain à tous les niveaux. Cela me pousse à contribuer à un niveau plus élevé et plus constant. Et je pense que Joost mérite beaucoup de crédit pour avoir écrit cette chose massive et avoir réussi à favoriser cette communauté autour de la construction et de l'amélioration de cette chose.

### Quel a été ton travail de collaborateur jusqu'à présent ?

J'ai fait quelques petites choses, mais il y a deux grandes choses sur lesquelles j'ai travaillé, et une qui est encore en cours !

La première consiste à mettre en place Gitpod. Gitpod te permet de faire ton développement dans le navigateur, ce qui t'évite de gérer les dépendances localement. C'est particulièrement utile pour les développeurs Windows, car notre environnement n'est pas très adapté à Windows, et il n'est pas officiellement pris en charge. J'ai aussi récemment soumis quelques mises à jour de l'environnement pour faciliter les choses pour les utilisateurs de Windows qui préfèrent vraiment développer localement.

La seconde est une mise à jour de l'outil de mise en page d'impression pour le laboratoire. J'ai retravaillé la fonctionnalité de déplacement et de rotation pour qu'elle fonctionne plus facilement et nous avons maintenant la rotation par encliquetage en plus de la rotation libre. J'ai également remanié notre système d'exportation au format PDF de sorte que lorsque tu l'exprimes, il se présente comme tu t'y attendais en fonction de la façon dont tu l'as mis en page. Nous avons beaucoup plus de contrôle sur le carrelage maintenant, et Joost n'a pas besoin de maintenir un code C en plus de tout le reste.

Toujours en cours, l'outil de disposition des coupes te permettra de spécifier une largeur de tissu et de disposer toutes les pièces (et si tu es censé en couper deux, il t'en donnera deux) afin que tu puisses déterminer la quantité de tissu dont ton patron a besoin.

### Es-tu une couturière ? Un codeur ? Les deux ? Ni l'un ni l'autre ?

Les deux ! Mais j'ai définitivement fait plus de codage. C'est mon travail, alors je l'ai fait presque tous les jours pendant dix ans.

### Quand et pourquoi as-tu commencé à coudre ?

J'ai commencé à coudre très tôt - j'ai pris des cours de couture à l'école primaire, et mon père m'a acheté une machine à coudre en échange de la promesse d'ourler tous ses pantalons (ce que je n'ai jamais fait). Ensuite, à l'exception d'un semestre ou deux de conception de costumes à l'université, je n'ai pratiquement plus cousu jusqu'à plus récemment. J'ai tout de même appris à utiliser une machine industrielle !

### Sur quoi travailles-tu en ce moment ?

J'ai été lente ces derniers temps, mais j'ai toujours des idées - j'ai tout un tas de choses à faire pour mon partenaire, je travaille aussi le bois et je suis en train de restaurer un bureau de tankiste en acier et des tables d'appoint en bois de rose du milieu du siècle, et je travaille sur un projet pour l'arrière et l'avant de ma maison. J'ai appris beaucoup de choses sur la modélisation 3D pendant la pandémie, et il fait assez froid maintenant (dans le sud des États-Unis) pour travailler dans le jardin.

### Quel projet viens-tu de terminer ?

Je viens de terminer une tunique pour ma compagne, et j'ai dessiné le costume que j'ai porté au mariage de ma sœur. J'ai confié le projet à un tailleur, mais lorsque le costume a été livré, les manches étaient attachées de la manière la plus déconcertante qui soit, et j'ai fini par devoir les attacher moi-même. Il s'est avéré magnifique, même si je ne suis toujours pas satisfaite des manches.

### Qu'est-ce que tu aimes le plus dans la couture ?

J'aime que la couture ouvre le monde. Tu peux réaliser ou réparer ou personnaliser tout ce que tu veux, et la couture te permet d'obtenir un ajustement parfait (ou au moins d'essayer…), quoi que cela signifie pour toi.  Je suis une personne très axée sur l'esthétique qui a été élevée par des personnes très axées sur l'esthétique, et je crois au pouvoir de transformation des vêtements, alors c'est génial de pouvoir prendre ce contrôle pour soi-même. De plus, j'adore avoir n'importe quelle compétence, et la couture est vraiment toute une catégorie de compétences qui te permet d'imaginer une chose et de dire : "Oui, on peut faire ça."

### Qu'est-ce que tu détestes le plus dans la couture ?

Les déchirures de coutures - ce que je dois faire souvent. Et j'ai parfois l'impression qu'il y a trop d'étapes pour fabriquer les choses qui m'intéressent.

Je pense qu'en réalité, je ne trouve pas souvent la couture comme une activité agréable - d'un côté, je suis très ambitieuse, mais d'un autre côté, j'ai une grande aversion pour le risque et je suis une perfectionniste massive, alors je dois faire trois mousselines avant d'obtenir une version finale de quoi que ce soit. Mais ensuite, je me laisse distraire, ce qui donne lieu à beaucoup de prototypes que je ne fais que porter, même s'il s'agit plus d'une preuve de concept que d'un véritable vêtement. L'exemple le plus extrême date de mon adolescence : J'expérimentais la fabrication de mes propres cartables de poitrine, et le premier que j'ai fabriqué et qui a fonctionné, que j'ai porté pendant probablement deux ans, tenait ensemble avec des rubans et des épingles à nourrice. J'ai fini par en avoir besoin d'un nouveau, que j'ai entièrement cousu, mais pendant ces deux premières années, tu peux voir le contour des épingles à nourrice à travers ma chemise sur chaque photo.

### Quels seraient tes conseils pour les couturiers débutants ?

Commence par un sujet qui t'intéresse. Beaucoup de gens apprennent à commencer avec des échantillonneurs, des sacs à fermeture éclair, etc. et cela fonctionne si cela t'intéresse de développer les principes fondamentaux. Mais si tu veux t'attaquer à quelque chose d'ambitieux, achète du tissu bon marché et lance-toi ! Ce ne sera pas aussi grave que tu le penses, et il y a toujours plus de tissu.

### Couds-tu surtout pour toi-même ou pour d'autres personnes, comme tes amis ou ta famille ?

Je couds surtout pour d'autres personnes, mais il m'arrive de confectionner des choses parce qu'il me semble plus facile de fabriquer un vêtement que d'aller le chercher. Je suppose que je suis une sorte de couturière "faites-le si je ne pense pas qu'il existe dans le monde", mais j'achèterai un tee-shirt même si je pourrais en coudre un. Ou une fois, j'ai cousu un pantalon la veille d'un voyage parce que je n'avais pas assez de pantalons et qu'aller faire les courses me paraissait plus incommode.

### Que fais-tu quand tu ne fais pas de vêtements ou que tu ne dessines pas de patrons ?

Je suis toujours en train de faire quelque chose - travail du bois, design, je code occasionnellement d'autres choses, je fais toujours la vaisselle…. J'aime les puzzles, et j'ai finalement terminé un puzzle de 1500 pièces que je n'arrêtais pas d'interrompre pendant des mois. J'ai fait une petite bibliothèque de puzzles gratuits pour ceux qui sont finis, mais personne ne vient jamais me prendre des puzzles.

### As-tu des animaux domestiques ? La famille ?

Je préfère les gens aux animaux, et je vis avec un partenaire dans une belle maison sans animaux. Mon partenaire et moi partageons la philosophie suivante : "les proches de mes proches sont mes proches", ce qui nous permet de penser à la famille de façon vraiment aimante et expansive. J'ai aussi la chance d'avoir une excellente relation d'adulte avec ma famille d'origine, bien que je ne vive pas actuellement près d'elle.

### Si tu pouvais emmener une personne sur une île inhabitée, qui serait-elle ? Pourquoi ?
Honnêtement, mon partenaire est la personne qu'il te faut - nous vivons ensemble depuis presque 5 ans, et le fait d'être constamment entourés l'un de l'autre pendant la pandémie nous a vraiment rapprochés (et nous a appris à fixer de meilleures limites !), alors je suis sûre que nous nous en sortirions dans le cas d'une île déserte. Ils nous feraient pousser de la nourriture et je nous construirais un abri, et ce serait génial.

### Veux-tu partager des façons de te suivre sur les médias sociaux ?
Tu peux me suivre sur Instagram à @enoch\_tries\_everything, mais sois prévenu qu'il est très rarement mis à jour.



