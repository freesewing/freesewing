---
date: "2022-07-01"
edition: "2022q3"
intro: "2022 Édition d'été"
title: "2022 Édition d'été"
---

Bienvenue dans l'édition de l'été 2022 de la lettre d'information de FreeSewing. Voici ce qu'il y a pour toi aujourd'hui :

- 🦈 FreeSewing 2.21 ajoute cinq nouveaux modèles (lecture en 4 minutes - par Karen)
- 🔨 Changements dans notre structure monorepo (lecture en 2 minutes - par Natalia).
- 🚸 Chérie, nous avons rétréci FreeSewing : Adapter les modèles FreeSewing pour les enfants (lecture en 2 minutes - par Natalia).
- 👨‍💻 FreeSewing *afk* (lecture en 1 minute - par Lexander)
- 🕵️ Derrière les coutures : Starfetcher (lecture de 4 minutes - par Karen & Starfetcher)
- 💰 Devons-nous être abattus parce que les revenus de FreeSewing sont en baisse ? (lecture en 2 minutes - par Joost)

Sautons dans le vif du sujet !

&nbsp;

&nbsp;

## 🦈 FreeSewing 2.21 ajoute cinq nouveaux modèles

FreeSewing 2.21 ajoute les motifs Bob, Hi, Lucy, Noble et Unice.

### Bob le bavoir

Les adeptes de longue date de FreeSewing reconnaîtront peut-être Bob, un bavoir classique, et le résultat du tutoriel de conception de patrons de FreeSewing. Tu veux coudre Bob sans apprendre à développer un modèle FreeSewing ? Maintenant, tu peux le faire ! Même si nous pensons que tu devrais quand même apprendre à développer un modèle FreeSewing, comme les personnes ci-dessous.

[Découvre Bob sur FreeSewing.org](https://freesewing.org/designs/bob)

### <strike>BLÅHAJ</strike>, nay Hi

Lorsque (la branche britannique d') un certain géant suédois de l'ameublement aux couleurs jaune/bleu a annoncé qu'il mettrait fin à son requin en peluche universellement aimé, l'Internet n'a pas très bien réagi. Les gens adorent les requins doux et câlins et l'idée de se retrouver un jour sans un requin pour te tenir compagnie lorsque les choses sont difficiles était franchement déstabilisante.

Des plans ont donc été élaborés, des stratégies ont été discutées, mais pendant un certain temps, il semblait que nous allions devoir accepter la défaite. Smash s'adresse à Wouter Van Wageningen, l'un des plus grands créateurs de patrons de FreeSewings, qui s'est lancé dans une mission singulière : Sauver les requins. Il suffit de dire . C'est ce qu'il a fait. Parce que bien sûr, il l'a fait.

Wouter a nommé le modèle Hi et ceux d'entre vous qui partagent ses racines néerlandaises comprendront le jeu de mots ici 🦈 . Tu peux donc maintenant coudre ton propre Hi, un sympathique et fabuleux requin en peluche et franchement une icône de l'Internet.

Il s'agit du premier patron de peluche de FreeSewing, et en tant que tel, il n'est pas adapté à des mesures, mais il est tout de même paramétrique ! Tu peux coudre des Hi de n'importe quelle taille, d'environ 5 centimètres à 5 mètres, et tu peux modifier sa bouche, la pointe de son nez, et rendre ton Hi "agressif" (c'est quand tu lui donnes des dents pointues). Un autre atout de Hi : il conviendra à n'importe qui dans ta vie ! Ton frère ou ta sœur, ton chat, ton beau-frère, ton béguin, ton patron, ton directeur général, ta serveuse ou n'importe qui d'autre dans ta vie a besoin d'un bonjour ? Probablement. As-tu besoin d'un Hi ? C'est presque certain. Doit-il mesurer 5 mètres de long ? Non, mais il veut le faire.

[Découvre Hi sur FreeSewing.org](https://freesewing.org/designs/hi)

### Lucy

[Lucy](https://en.wikipedia.org/wiki/Lucy_Locket) est un accessoire parfait pour la couturière d'inspiration historique, une pochette historique que tu peux nouer autour de ta taille, conçue par SeaZeeZee. Traditionnellement, ils auraient pu être portés sous d'autres couches de vêtements, créant ainsi un moyen facile de transporter des choses qui étaient cachées par des jupes ou des tabliers, mais il n'est pas nécessaire de cacher ta Lucy sous un boisseau (ou un buste). Fais-en un dans à peu près n'importe quel tissu que tu aimes - Lucy est superbe dans ce joli coton à matelasser auquel tu n'as pas pu résister, cette chute que tu aimes trop pour la jeter, ou le textile qui t'intimide mais que tu veux essayer. Une Lucy en paillettes, en velours ou en vinyle ? C'est vraiment cool. 😎

[Découvre Lucy sur FreeSewing.org](https://freesewing.org/designs/lucy)

### Noble

Hi n'est pas le seul modèle publié par Wouter Van Wageningen ce trimestre. Pour ceux qui cherchent à expérimenter leur propre patron, Wouter a créé le bloc Noble, un bloc à couture prince(ss) sans manches basé sur le patron du bloc Bella. Les blocs sont la base d'autres modèles, Noble n'a donc pas de finitions ni de fermetures, mais il constitue un excellent point de départ, sur mesure, pour des modèles à réaliser soi-même.

[Découvre Noble sur FreeSewing.org](https://freesewing.org/designs/noble)

### Unice

Enfin, pour la première fois, la créatrice de FreeSewing Anna Puk a sorti un nouveau patron de sous-vêtements, Unice ! Unice est une variante d'Ursula, un patron de sous-vêtements basique et hautement personnalisable. Tu ne sais pas si tu dois coudre Ursula ou Unice ? Unice a été conçu pour s'adapter à un arrière plein, c'est donc un bon produit à essayer si tu trouves que les sous-vêtements de ta taille ne couvrent pas suffisamment l'arrière, ou si tes jeans sont toujours plus serrés au niveau du siège qu'au niveau des cuisses ou de la taille. Ou, mieux encore, fais les deux ! Après tout, on ne peut jamais avoir trop de sous-vêtements. (Et si tu le fais, saute sur le Discord [](https://freesewing.org/community/where/discord/) ou sur nos canaux sociaux, @freesewing_org sur Instagram et Twitter, et fais-nous savoir comment ils fonctionnent pour toi).

[Découvre Unice sur FreeSewing.org](https://freesewing.org/designs/unice)

&nbsp;

---

&nbsp;

## 🔨 Changements apportés à notre structure monorepo.

De grandes choses sont en train de se produire.

Il y a eu quelques changements dans la structure du monorepo. Avec l'ancien espace de travail à fil unique en paquets maintenant divisé en :
- des dessins pour des dessins
- des plugins pour des plugins
- paquets pour les paquets NPM qui ne sont ni des designs ni des plugins
- sites pour les sites web, code backend, notre tuteur svg et ainsi de suite.

La monorepo a été dépouillée des environnements de développement individuels pour les conceptions. Au lieu de cela, tout le développement des conceptions devrait maintenant se faire en laboratoire. Il y a une nouvelle commande `yarn tips` que tu peux lancer et qui te donnera un résumé rapide de la façon de travailler dans notre monorepo. Et tu peux lancer `yarn lab` pour démarrer le labo depuis la racine du repo, ou depuis n'importe quel dossier de conception ou de plugin.

Si tu veux ajouter un nouveau design, lance `yarn new design` et tout sera pris en charge pour toi.

L'ancien environnement de développement autonome (`npx create-freesewing-pattern`) est obsolète (depuis la version 2.21, un avertissement apparaît lors de l'exécution), mais il est toujours disponible. Ceux qui recherchent un développement autonome devraient essayer le remplacement qui utilise le même environnement de développement amélioré que notre monorepo. Pour le lancer, exécute : `npx @freesewing/new-design`

Tu veux une liste complète des nouveautés ? Jette un coup d'œil aux notes [du dernier appel des contributeurs](https://github.com/freesewing/freesewing/discussions/2270).

&nbsp;

---

&nbsp;

## 🚸 Chérie, nous avons rétréci FreeSewing : Adapter les modèles FreeSewing pour les enfants

D'abord les poupées, maintenant les enfants ! Les contributeurs de FreeSewing semblent vouloir réaliser des versions miniatures de nos modèles.

Nous voulions prendre un moment pour mettre en lumière certains des grands projets que les gens réalisent pour leurs enfants et certaines des leçons qu'ils ont partagées. Ne manque pas les photos dans la vitrine [](https://freesewing.org/showcase/).

Si tu souhaites adapter un modèle FreeSewing pour un jeune, voici quelques éléments à prendre en compte :

- **Fais des vêtements d'essai !** Faire une mousseline est une bonne habitude en général, et c'est particulièrement important quand on coud pour des personnes dont les mensurations n'ont peut-être pas encore été testées avec un modèle FreeSewing, car leurs proportions ne fonctionneront pas forcément bien du premier coup. `comixminx` est la championne incontestée des culottes de couture Shin, ayant cousu plusieurs paires d'essai en vue de fabriquer des paires portables pour chacun de [ses](https://freesewing.org/showcase/shin-swim-trunks-for-comixminxs-kid/) [enfants](https://freesewing.org/showcase/more-shin-swim-shorts/).
- **Envisage d'essayer un bloc.** Comme le montre [l'adorable manteau de corvée](https://freesewing.org/showcase/bob3000-chore-coat/) de `Bob3000`pour son enfant, basé sur le bloc Brian, la forme de base d'un bloc peut être un bon point de départ auquel tu peux ajouter des éléments de design.
- **Utilise beaucoup de facilité lorsque tu dessines pour les tout-petits.** `mathstitch` a fini par dessiner sa propre chemise à col et elle s'est avérée plutôt merveilleuse. Ils ont partagé quelques conseils pour tous ceux qui essaieraient d'adapter un dessin existant à l'avenir ! Ils suggèrent d'ajouter des tas de facilité parce que les tout-petits sont si actifs et si peu coordonnés, qu'ils ont tendance à adopter des postures inhabituelles tout le temps, comme s'accroupir et ramper, et que certains ont de gros ventres et beaucoup de graisse de chiot. 🐶 Un bonnet à manches courtes est approprié. Si ton enfant porte encore des couches, la chemise doit s'évaser au niveau des hanches pour s'y adapter, et tu devras t'assurer que les boutons se terminent suffisamment loin du bas de la chemise.
- **Ajoute des éléments réglables pour que les vêtements tiennent plus longtemps.** `Rowan` a confectionné un minuscule tablier [Albert](https://freesewing.org/showcase/a-tiny-albert-apron/) pour l'anniversaire de leur enfant et a ajouté des éléments ajustables aux bretelles. Excellente idée pour maximiser le nombre d'utilisations qu'ils peuvent faire de cet accessoire très mignon.
- **Couds vite.** `AMJ` rapporte avoir vu des enfants changer de taille entre l'essayage et la couture. 😀

Si tu essaies l'un de nos modèles avec ton enfant, nous espérons que tu viendras en discuter sur [Discord](https://discord.freesewing.org/).

&nbsp;

---

&nbsp;

## 👨‍💻 FreeSewing *afk*

FreeSewing va à l'extérieur ! FreeSewing fera partie du camp [May Contain Hackers](https://mch2022.org/) sous la forme d'une courte présentation par Lexander. Note ton calendrier pour le 24 juillet, 09:40 PM CEST ; il peut être suivi avec un livestream.

Lexander décrira ce qu'est FreeSewing, les motivations de Joost (et d'autres bénévoles) derrière ce projet, un peu de technique, et pourquoi c'est important pour la mode et les vêtements dans leur ensemble. Tu trouveras plus d'informations dans la description complète [sur le site de l'événement](https://program.mch2022.org/mch2021-2020/talk/M9JWKM/).

&nbsp;

---

&nbsp;

## 🕵️ Derrière les coutures : Starfetcher

### Comment as-tu découvert FreeSewing ?

Je ne me souviens plus très bien, mais je pense que je cherchais des patrons de couture un jour et que j'ai eu la glorieuse intuition d'utiliser "patron de couture open source" comme mot clé. Le moteur de recherche a fait son travail.

### Comment es-tu devenu contributeur ?

En lisant la doc des développeurs, j'ai trouvé quelques fautes de frappe et j'ai décidé de les corriger, en commençant les traductions j'en ai trouvé d'autres, et soudain j'étais un contributeur. Rejoindre les appels des contributeurs était la prochaine étape logique, et je n'ai pas regardé en arrière depuis.

### Quel a été ton travail de collaborateur jusqu'à présent ?

En plus de réparer les fautes de frappe et les liens cassés, je fais sporadiquement quelques travaux de traduction et j'ai codé trois modèles inspirés de l'histoire : Lunetius, Tiberius et Walburga.

### Es-tu une couturière ? Un codeur ? Les deux ? Ni l'un ni l'autre ?

Les deux, et cela dépend de mon humeur ce que j'aime le plus faire.

### Quand et pourquoi as-tu commencé à coudre ?

Enfant, ma mère m'a appris les bases, mais ce n'est qu'à la fin de mon adolescence que j'ai commencé à prendre la chose au sérieux, lorsque j'ai décidé de coudre mon propre costume pour ma fête d'anniversaire (mes fêtes d'anniversaire étaient et sont toujours des fêtes costumées). J'ai fait beaucoup d'erreurs (comme finir les bords avant de coudre les pièces ensemble), mais j'étais (et je suis toujours) incroyablement fière de ce projet. Ensuite, j'ai de nouveau fait une pause dans la couture, mais je l'ai redécouverte au milieu de la préadolescence lorsque je me suis remise au cosplay.

### Quel est ton travail quotidien, en dehors de FreeSewing ?

En ce moment, je fais mon doctorat en physique expérimentale, donc j'ai un bon mélange de travail pratique à la machine et de beaucoup de jurons à l'ordinateur à 23 heures.

### Sur quoi travailles-tu en ce moment ?

Actuellement, je travaille à la fabrication d'une armure en mousse pour compléter les parties en tissu de mon costume (composé de Lunetius, Tibère et Walburga, bien sûr). C'est une nouvelle technique pour moi, alors c'est très amusant de jouer avec.

### Quel projet viens-tu de terminer ?

Je viens de terminer de coder et de coudre Pythie la paenula, mon prochain patron FreeSewing pour un autre type de cape d'inspiration historique. Maintenant, je remets à plus tard la chasse aux derniers insectes.

### De quel projet de couture/codage es-tu le plus fier ?

Côté couture, je suis toujours très fière du premier costume que j'ai cousu toute seule, mais le plus délicat jusqu'à présent est le Sailor Fuku que j'ai réalisé il y a quelques années. Oh, et la chemise victorienne avec beaucoup de plis sur le devant, où j'ai également dû ajuster la taille de pratiquement tout (une expérience qui m'a finalement conduite à FreeSewing). Sur le plan du codage, c'est probablement un truc lié au travail où j'ai fait de belles représentations graphiques avec Python et LaTeX.

### De quoi es-tu le plus fier dans ta vie ?

C'est une question difficile ! Probablement toutes les expériences combinées qui m'ont appris tout ce que je sais aujourd'hui.

### Qu'est-ce que tu aimes le plus dans la couture ?

Le sentiment magique quand tu finis quelque chose, que tu le mets et qu'il est juste parfait.

### Qu'est-ce que tu détestes le plus dans la couture ?

Le sentiment d'affaissement lorsque tu termines quelque chose et que tu réalises que quelque chose s'est mal passé et que ton avenir immédiat implique probablement le ramasseur de fil ou le tapis de coupe si tu n'as pas de chance. Oh, et l'ourlet des jupes, surtout l'ourlet de deux jupes combinées à cercle complet parce que tu voulais le volume à 2 heures du matin.

### Quelle est la partie la plus difficile de la couture pour toi ?

Poser les pièces du patron avec la bonne ligne de grain et découper les choses sans oublier la marge de couture.

### Quels seraient tes conseils pour les couturiers débutants ?

Plonge-toi dans l'aventure ! N'aie pas peur de faire des erreurs et n'aie pas peur de demander de l'aide, mais essaie simplement.

### Couds-tu surtout pour toi-même ou pour d'autres personnes, comme tes amis ou ta famille ?

La plupart du temps juste pour moi, bien que j'ai essayé de coudre quelque chose comme cadeau à plusieurs reprises - jusqu'à présent, je n'en ai jamais terminé aucun.

### Que fais-tu quand tu ne fais pas de vêtements ou que tu ne dessines pas de patrons ? - Veux-tu partager des façons de te suivre sur les médias sociaux ?

J'aime les jeux de rôle sur table (DSA, Cthulhu, ...), les jeux vidéo, la lecture, la photographie, l'escrime et le tir à l'arc (toujours en amateur, d'ailleurs). Je suis également responsable de la direction de la partie théâtrale du groupe musical de mon ancienne école. Pas de médias sociaux pour moi.

### As-tu des animaux domestiques ? La famille ?

Malheureusement, il n'y a pas d'animaux de compagnie, bien que mon SO ait un chien adorable. Je suis assez proche de mes parents.

### Es-tu plutôt chien ou plutôt chat ?

Les deux ! Mais si je devais choisir, je choisirais... un pingouin.

### Si tu pouvais emporter une chose sur une île inhabitée, quelle serait-elle ? Pourquoi ?

À part des choses comme de l'eau, de la nourriture et un couteau ? Probablement mon lecteur ebook, amélioré avec des cellules solaires, et chargé à ras bord de livres pour le divertissement et la survie.

### Si tu pouvais emmener une personne sur une île inhabitée, qui serait-elle ? Pourquoi ?

C'est délicat ! Si c'est volontaire, mon SO, mais ils auraient du mal à se passer de l'électricité et des autres avantages de la civilisation. Si ce n'est pas volontaire, quelqu'un qui augmente mes chances de survie, comme un médecin très fort.

&nbsp;

---

&nbsp;

## 💰 Devons-nous être abattus parce que les revenus de FreeSewing sont en baisse ?

Je suppose que tu connais le site [FreeSewing's revenue pledge](https://freesewing.org/docs/various/pledge/)? Si ce n'est pas le cas, vas-y, lis-le. J'attendrai.

Sur les 6 premiers mois de 2022, le chiffre d'affaires de FreeSewing est inférieur de 25 % au chiffre d'affaires (moyen) de 2021.

Ce n'est pas tout à fait inattendu. Il y a eu un afflux de nouveaux patrons pendant la pandémie de Covid, et nous sommes maintenant sur la pente descendante de cette vague. De nombreux mécènes qui ont découvert FreeSewing grâce à notre patron de masque de visage nous quittent maintenant parce qu'ils ne voient pas l'intérêt de prolonger leur soutien. D'autres ressentent la crise du coût de la vie et ont soit réduit leurs cotisations, soit les ont complètement annulées.

Je suis vraiment reconnaissant de toutes ces contributions, mais le fait de voir des clients partir me pousse à me demander si nous n'avons pas un problème ? Personnellement, je ne le pense pas. Mais je n'en suis pas non plus certain à 100 %. Et les mauvais jours, cela alimente certainement mes doutes sur... eh bien, sur tout en fait.

Il y a beaucoup de paramètres différents que tu pourrais mettre en avant pour montrer que FreeSewing est en plein essor. Qu'il s'agisse du nombre de modèles dont nous disposons, de la taille et de l'activité de la communauté, ou de quelque chose d'aussi facile à mesurer que le nombre de commits.

Et pourtant...

Après avoir réfléchi un moment, je me suis dit que la meilleure chose à faire était d'être transparent sur ce qui se passe : FreeSewing se porte bien, mais nous recevons moins de soutien financier qu'auparavant. Les recettes seront inférieures cette année, d'après ce que l'on peut voir, d'au moins 25 %.
