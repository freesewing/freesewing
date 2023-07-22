---
date: "2023-04-01"
edition: "2023q2"
intro: "Bienvenue dans l'édition du printemps 2023 de la newsletter de FreeSewing."
title: "2023 Édition de printemps"
---

Bienvenue dans l'édition du printemps 2023 de la newsletter de FreeSewing.

Voici ce que nous avons inclus pour toi aujourd'hui :

- ☕ Suivre tous les potins les plus chauds de FreeSewing (lecture en 3 minutes - par Karen).
- 🐑 Appel aux bergers des patrons (lecture en 2 minutes - par Karen).
- 💵 À la recherche de 1000 vrais fans (lecture en 3 minutes - par Joost).
- 🕵️ Derrière les coutures : Benjamin F. (lecture de 4 minutes - par Benjamin & Karen)
- 🦈 Tu veux écrire pour la newsletter ? (Lecture en 1 minute - par Karen)

&nbsp;

&nbsp;

## ☕ Se tenir au courant des derniers potins de FreeSewing

D'accord, tu es un fan de FreeSewing, tu es impatient de voir arriver la V3, et en attendant, tu te demandes où trouver tous les potins les plus chauds sur ce qui se passe dans les coulisses. Ne crains rien ! Nous avons des solutions pour toi.

Tout d'abord, as-tu consulté notre Discord [](https://freesewing.org/community/where/discord/)? C'est là que tu pourras découvrir en avant-première les patrons prévus pour la V3, des recommandations et des conseils sur les types de tissus, le matériel difficile à trouver, l'entretien de la machine à coudre, les bricolages sympas auxquels les développeurs travaillent en coulisses, et bien d'autres choses encore. Si tu veux être vraiment au courant, c'est ici que ça se passe. (C'est aussi littéralement là que ça se passe, si tu veux participer aux appels bihebdomadaires des contributeurs de FreeSewing, qui se déroulent sur le chat vocal).

Si tu détestes Discord, il y a tout de même des options pour toi. Benjamin F. (de l'émission "Behind the Seams") a récapitulé les points forts de Discord dans une discussion GitHub ici : [Récapitulatifs du Discord](https://github.com/freesewing/freesewing/discussions/3523). Jette-y un coup d'œil pour un survol rapide des récents sujets d'actualité.

Et enfin, il y a bien sûr le site FreeSewing lui-même. Bien que certaines mises à jour soient en attente de la V3, tu peux toujours consulter nos vitrines pour avoir un aperçu des choses merveilleuses et impressionnantes que les utilisateurs de FreeSewing ont réalisées au cours des derniers mois. Quelques points forts :

- Le plus petit Hi jamais fabriqué : [MicroHi](https://freesewing.org/showcase/microhi)
- Ce mode d'emploi détaillé permet de fabriquer une épaule tombante [Sven](https://freesewing.org/showcase/drop-shoulder-sven)
- Un ensemble assorti de [multi-générationnel Florents](https://freesewing.org/showcase/matching-florents)
- Comment [modifier Aaron dans une robe débardeur](https://freesewing.org/showcase/aaron-dress-by-ts)
- Un incroyable et impeccable [Classic Carlton de Boris](https://freesewing.org/showcase/carlton-by-boris) (regarde la broderie de renfort !). -->

...Et un tas d'autres qui n'ont pas trouvé leur place ici mais qui sont tout aussi incroyables, et tu n'auras qu'à aller voir la vitrine [](https://freesewing.org/showcase/) pour en savoir plus. 😉

&nbsp;

---

&nbsp;

## 🐑 Appel aux bergers des patrons

Es-tu un expert dans la réalisation d'un modèle FreeSewing particulier ? Tu as peut-être essayé toutes les options, ou tu sais pourquoi il se dérègle dans certains cas, ou tu l'as fait pour tous tes amis et ta famille en guise de cadeau ? Si cela sonne vrai, alors tu es exactement le type d'expertise que nous recherchons.

Comme tu l'as peut-être remarqué, FreeSewing s'agrandit et ajoute de nouvelles fonctionnalités ! Et lorsque la V3 sortira, elle sera accompagnée de plusieurs nouveaux modèles. Mais chaque modèle a besoin d'une personne qui connaît ses faiblesses et ses subtilités. La plupart du temps, il s'agit du concepteur du modèle. Dans d'autres cas, c'est la personne qui a élaboré la documentation du modèle. Et puis il y a les patrons qui existent sur le site de FreeSewing, mais leur créatrice est passée à de nouveaux défis, ou personne n'a réalisé le patron depuis un moment. Ces modèles peuvent parfois être la proie de problèmes que personne ne remarque. Ensuite, lorsque les nouveaux utilisateurs les essaient, l'expérience peut être inutilement rude.

Un berger des patrons est quelqu'un qui garde un œil sur les choses pour que cela ne se produise pas pour son patron. Tu n'as pas besoin d'être un prodige de la programmation ou un savant de la couture pour ce rôle, mais simplement quelqu'un qui connaît bien le modèle, ce qu'il contient et comment il s'assemble. Si quelque chose se brise, tu peux le réparer toi-même, mais tu peux aussi remplir un rapport de bogue pour informer le reste de la communauté et recruter de l'aide. Si cela t'intéresse, réponds à cet e-mail et fais-le nous savoir !

Bonus : FreeSewing a mis en place un programme de recherche de bugs qui te permet de gagner (a) notre reconnaissance éternelle, et (b) parfois des cadeaux sympas.

&nbsp;

---

&nbsp;

## 💵 A la recherche de 1000 vrais fans

J'ai réalisé il y a quelques semaines que cela fait maintenant plus de 6 mois que nous avons commencé à travailler sur la version 3 de FreeSewing, et c'est à la fois une éternité et pas très long du tout.

C'est une éternité si tu as attendu sa sortie en retenant ton souffle. (Si tu fais partie de ce groupe, sois indulgent avec nous car nous avons été très occupés). Mais ce n'est pas très long du tout si tu considères tous les changements que nous intégrons dans cette nouvelle version majeure. J'ai fait le point l'autre jour et j'ai réalisé qu'il n'y a presque rien que nous ne soyons pas en train de repenser complètement ou de faire différemment et mieux. Une brève liste de ce qui me vient à l'esprit :

- Base de données : De MongoDB à Sqlite
- Backend : Complètement réécrit
- Javascript : De CJS/ESM à ESM pur, et des exportations par défaut aux exportations nommées
- Bundler : Du Rollup à l'Esbuild
- Hébergement : De Netlify à Vercel
- FreeSewing.dev : De Gatsby à NextJS
- FreeSewing.org : De Gatsby à NextJS, et en cours de réécriture complète
- Environnement de développement : De CRA (Créer une application React) à NextJS.
- Bibliothèque de composants : De MaterialUI/MUI à TailwindCSS/DaisyUI

Je m'en tiens ici aux changements techniques, il y a évidemment de nouvelles fonctionnalités et d'autres choses qui seront différentes/améliorées. Mais ce sont les fondements qui changent, tout comme le genre de choses qui ne seront pas immédiatement évidentes pour toi.

La seule chose qui ne figure pas sur la liste ci-dessus est notre processeur de paiement (actuellement PayPal, nous allons probablement migrer vers Stripe), ce qui m'amène à la chose que nous n'avons pas (encore) changée : les abonnements.

Actuellement, nous avons 3 niveaux d'abonnements. 2, 4 et 8 euros par mois. Certains utilisateurs m'ont contacté parce qu'ils voulaient faire plus pour FreeSewing et [nous avons mis en place un plan d'abonnement de 25$/mois pour ces âmes généreuses](https://static.freesewing.org/fs-25/).

Cela m'a fait réfléchir au modèle d'abonnement et à la façon dont le projet est soutenu financièrement en général. Tu te souviens peut-être que j'ai écrit l'année dernière que les revenus de FreeSewing avaient une tendance très légèrement à la baisse, et c'est quelque chose qui a tendance à me rendre nerveuse quand je considère le nombre de changements que nous faisons. Les gens n'aiment généralement pas le changement, et il y a un certain risque que nous nous aliénions des gens avec la v3.

Mais encore une fois, l'attrait pour les masses n'a jamais été notre marque de fabrique. Nous n'avons pas besoin de millions, [tout ce dont vous avez besoin c'est de 1000 vrais fans](https://kk.org/thetechnium/1000-true-fans/). Ainsi, dans la v3, nous allons également remanier les abonnements. Nous mettrons en place un modèle purement [pay what you can](https://en.wikipedia.org/wiki/Pay_what_you_can) . Aujourd'hui, tu peux donc soit ne pas payer, soit payer 2, 4, 8 ou 25 euros/dollars par mois. À l'avenir, tu pourras toujours ne pas payer, ou payer ce qui te semble juste. Les abonnements actuels ne seront pas résiliés, mais tu es bien sûr invité à migrer vers le nouveau modèle d'abonnement.

L'avenir nous dira si c'est une bonne ou une mauvaise chose pour FreeSewing. Mais je crois que miser sur nos vrais fans est notre stratégie gagnante. C'est donc ce que nous ferons 🤞


&nbsp;

---

&nbsp;


## 🕵️ Derrière les coutures : Benjamin F.

Benjamin (BenJamesBen sur GitHub), contributeur de FreeSewing, nous a absolument épatés ces derniers temps par son travail de soutien à FreeSewing. Nous lui avons donc demandé s'il voulait bien être le sujet de la lettre d'information de ce trimestre, et bien sûr, il a non seulement dit oui, mais il est revenu avec quelque chose de fantastique, d'amusant et d'unique. Comme toujours, les erreurs, les oublis, etc. sont entièrement de la faute de l'intervieweur !

### Parle-nous de ton implication dans FreeSewing.
Merci de me donner l'occasion de parler de FreeSewing. Je pense que c'est une organisation assez géniale en ce sens qu'elle fournit des patrons gratuitement aux gens. Pour moi, c'est la meilleure chose que fait FreeSewing. Aux États-Unis, il y a un magasin de détail qui fait régulièrement des soldes où tu peux acheter des patrons en papier pour 2 dollars américains, mais j'ai entendu dire que les patrons sont beaucoup plus chers dans d'autres pays. Et, dans certains endroits, les patrons en papier ne sont tout simplement pas disponibles dans les magasins. FreeSewing propose des patrons gratuits à tout le monde !

### Je vois que tu fais beaucoup de travail de codage pour FreeSewing ?
J'ai travaillé dans le domaine de l'informatique (assurance qualité et tests de logiciels), et j'ai également fait des études en informatique. Une grande partie de ce que j'ai fait dans le passé consiste à regarder le code que d'autres personnes ont écrit, à comprendre ce qu'il fait et à résoudre les problèmes. J'ai donc pris cette expérience et l'ai appliquée à FreeSewing, en testant le site Web et les patrons pour m'assurer que tout fonctionne correctement, et en essayant de corriger les bogues qui apparaissent.

### Es-tu aussi une couturière ?
C'est en fait une bonne question, au sens philosophique du terme. Je possède une machine à coudre et j'ai pris des cours de couture. J'ai une réserve de tissus et de multiples projets inachevés sur lesquels je devrais travailler. Mais la couture proprement dite ? Je n'ai pas l'air de faire beaucoup de couture. C'est vrai que je passe beaucoup de temps à regarder des vidéos de couture sur YouTube. Est-ce que le fait de regarder des vidéos de couture compte pour être une couturière ?

### Quels sont les projets inachevés sur lesquels tu évites de travailler pour regarder YouTube à la place ?
J'ai commencé à travailler sur un modèle de chemise pirate du 18e siècle pour FreeSewing. Tout le code est écrit, et il produit des motifs tout à fait corrects. Cependant, je ne l'ai pas encore testé pour voir si les patrons générés ont un sens en termes d'ajustement. (J'ai deviné les mesures du patron, en inventant des chiffres qui semblaient avoir du sens). L'étape suivante consiste à confectionner un vêtement d'essai pour vérifier l'ajustement, à apporter des modifications au modèle et à changer le code en conséquence.

Je dois aussi à ma sœur un oreiller fait sur mesure. (Il me suffit de coudre un sac rectangulaire avec une fermeture éclair pour qu'elle puisse le remplir de mousse à mémoire de forme supplémentaire qu'elle a sous la main). Et enfin, mon premier projet original inachevé est une chemise de camp de style hawaïen/bowling, Kwik Sew 3484. (J'ai acheté le patron à l'époque où Kwik Sew était sa propre entreprise et fabriquait encore des patrons de vêtements, si cela te donne une idée du temps pendant lequel le projet est resté inachevé).

### La chemise de pirate a l'air intéressante.
Je l'ai choisi parce que 1. Je veux vraiment une chemise de pirate, et 2. Cela semblait être un bon modèle, facile à réaliser (toutes les pièces sont des rectangles !). Cependant, bien que je sois quelque peu intéressée par les vêtements historiques, je ne suis pas du tout intéressée par les méthodes de couture historiques - c'est-à-dire la couture à la main. Je prévois d'utiliser une machine à coudre pour coudre ma chemise de pirate.

Fait amusant : les pirates cousaient aussi à l'aide de machines à coudre (qu'ils prenaient sur les bateaux qu'ils pillaient). Cependant, au lieu d'enlever les épingles au fur et à mesure qu'elles cousaient, elles laissaient les épingles en place et cousaient par-dessus, ce qui peut être très dangereux. C'est pourquoi tant de pirates devaient porter un cache-œil.

### Tu as dit que tu possédais une machine à coudre ?
C'est une machine portant le nom de Kenmore qui a été fabriquée par Janome. Je pense que c'était le modèle le plus basique disponible à l'époque. Pas de réglage de la longueur ou de la largeur du point, boutonnière en 4 étapes, canette à chargement frontal. Je l'ai achetée neuve chez Sears, à l'époque où Sears existait encore et vendait des machines à coudre. (Cela devrait te donner un autre indice sur la durée de l'inachèvement de mon projet de chemise de camping !).

### Quels sont les projets de couture sur lesquels tu aimerais travailler à l'avenir, en supposant que tu termines tes projets inachevés ?
J'aimerais fabriquer mon propre jambon de tailleur. (Un autre modèle simple - juste deux ovales). J'envisage de fabriquer mes propres caleçons car j'en ai besoin de nouveaux. Cependant, je ne sais pas s'il ne serait pas plus pratique ou plus rentable de les acheter simplement dans le magasin. Et, je suis quelque peu intimidée à l'idée de coudre du tissu tricoté. Je me suis également intéressée aux patrons pour coudre ta propre forme de robe/mannequin personnalisée et sur mesure. Cependant, cela semble être un projet trop difficile.

Enfin, un jour, j'aimerais confectionner un vêtement en tissu d'ameublement ou de rideau. Il semble que ce soit un défi intéressant d'utiliser ce type de tissu. De plus, Scarlett O'Hara portait une robe faite de rideaux, ce qui lui a permis d'épouser Rhett Butler. Maria a fabriqué des vêtements à partir de rideaux, et elle a pu épouser le capitaine Von Trapp. (Et, elle était presque une nonne !) Si je fabriquais des vêtements avec des rideaux, imaginez qui je pourrais épouser ! ?

### Pour en revenir au codage, est-ce une tâche difficile de créer un modèle FreeSewing ? Je pense à des personnes qui pourraient être des couturières expérimentées qui peuvent concevoir des patrons mais qui n'ont pas de connaissances en codage.
Il n'est pas forcément difficile de convertir un modèle existant en code. Le premier défi consiste à apprendre à réfléchir à la façon dont le patron est dessiné et à le décrire en termes de mesures et d'angles. Un peu comme si tu devais décrire à quelqu'un la façon de rédiger un modèle au téléphone ou par le biais de messages textuels. Une fois que tu es capable d'écrire des instructions telles que "dessine un point A", "dessine un autre point à 10 cm à un angle de 45 degrés au-dessus et à droite de A et étiquette-le point B", "dessine une ligne entre le point A et le point B", etc.

Le prochain défi pourrait être de prendre le modèle existant qui a été fait pour une personne spécifique et de réfléchir à la façon dont il pourrait être converti en modèles pour d'autres personnes ayant des mesures différentes. Tu devrais te demander "pourquoi la mesure du tissu de cette pièce était-elle de 10 cm" ? Si c'est parce qu'il était légèrement plus grand que la circonférence du poignet, alors peut-être que la mesure pourrait plutôt être convertie en "la circonférence du poignet, plus 10%". Je pense que l'ensemble des compétences pourrait être similaire à celui de la gradation des patrons.

Pour le codage lui-même, la meilleure façon d'apprendre (à part suivre un cours de codage formel, dont il existe de nombreux cours gratuits sur Internet) est peut-être de regarder le code d'un modèle FreeSewing existant. Je soupçonne que de nombreuses personnes apprennent à coder en regardant un code existant, en le copiant et en y apportant des modifications pour voir ce que font les changements. FreeSewing fournit un outil de laboratoire qui te permet de voir les changements apportés aux modèles que tu fais ou que tu modifies, afin que tu puisses jouer avec les choses et apprendre de l'expérimentation. Si tu as besoin d'aide ou si tu es bloqué, il y a plein de gens sur le Discord qui seront ravis de t'aider !

### Merci. Un dernier mot ?
Je trouve quelque peu étonnant que la communauté FreeSewing soit si diversifiée géographiquement, répartie dans le monde entier, et qu'elle soit toujours capable de communiquer et de s'entraider. Je suis heureux de faire partie de cette communauté. Cependant, je me dis qu'avec l'anonymat d'Internet, personne ne m'a vraiment vu ou ne sait qui je suis. Pour ce que tout le monde en sait, je pourrais être un chat sur Internet qui fait semblant d'être une personne. (Si j'étais un chat, cela ne serait pas considéré comme de la "pêche au chat". Nous, les chats, nous appelons ça "pêcher" !)

&nbsp;

---

&nbsp;




## 🦈 Tu veux écrire pour la newsletter ?

Hé ! C'est Karen, ton amie des appels des contributeurs [](https://freesewing.org/community/calls/), du Discord [](discord.freesewing.org), et d'un tas de choses écrites dans cette lettre d'information ! Chaque trimestre, nous publions cette lettre d'information pour tenir les gens au courant des nouveautés de FreeSewing, des mises à jour intéressantes, des réalisations impressionnantes, des projets bizarres, etc. Mais cela ne fonctionne que parce qu'il y a toute une cohorte incroyable de personnes qui créent, conçoivent et contribuent. (C'est là que tu interviens).

Si tu as lu cette lettre d'information et que tu t'es dit :
- "Mais qu'en est-il de la question fill-in-the-blank ?" ou
- "Ooh, ça me rappelle un projet FreeSewing sur lequel j'ai travaillé en coulisses..." ou bien
- "Wow, j'aimerais que quelqu'un fasse une plongée en profondeur sur ce sujet !".

...Nous aimerions bien le savoir. Et si tu veux écrire cet article toi-même, eh bien je serai personnellement ravi et je t'aiderai de toutes les manières possibles à faire de cette possibilité une réalité.

Tu as peut-être confectionné un vêtement qui a nécessité un piratage astucieux ou qui a pris vie tout seul, et tu en es vraiment fier. Tu as peut-être une fourche de la monorepo FreeSewing où tu bricoles quelque chose de passionnant. Peut-être que tu ne sais pas sur quoi tu aimerais écrire, mais tu aimes FreeSewing et tu veux contribuer, ou tu espères te faire un nom en tant que rédacteur réputé. (D'accord, en fait, la réputation est peut-être un peu exagérée, mais cela fait partie de notre charme).

Tendez la main ! Tu peux nous trouver sur [Discord](discord.freesewing.org), ou sur [Github](https://github.com/freesewing/), ou tu peux simplement répondre à cet email. Nous serions ravis d'avoir de tes nouvelles. 🧡


