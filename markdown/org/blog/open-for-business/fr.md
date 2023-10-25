---
author: "joostdecock"
caption: "Ouvert 24 heures sur 24 et 7 jours sur 7 à partir d'aujourd'hui"
date: "08-25-2017"
intro: "Freesewing.org est ouvert à la concurrence. C'est-à-dire l'activité qui consiste à donner des patrons de couture gratuits."
title: "Freesewing.org est ouvert à la concurrence. C'est-à-dire l'activité qui consiste à donner des patrons de couture gratuits."
---

Quand j'ai sorti freesewing core en mars, je ne m'attendais pas à ce qu'il faille encore 5 mois pour avoir enfin un front-end digne de ce nom, mais nous y sommes.

À partir d'aujourd'hui, [freesewing.org](https://freesewing.org/) est le lieu incontournable pour tes patrons de couture sur mesure.

Si tu ne connais pas encore le freesewing, je te suggère de commencer par lire [la page à propos](/about/), qui, je l'espère, fait une tentative à moitié décente pour décrire ce qu'est cette chose.

> À partir d'aujourd'hui, mmp ne permettra plus aux nouveaux utilisateurs de s'inscrire et après une période de grâce de quelques mois, je le fermerai

Si tu sais ce que je fais ici, ou si tu as vu *An open-source platform for made-to-measure sewing patterns* en haut de cette page et que cela t'a suffi pour comprendre, cette annonce intervient après 18 mois de travail pour réinventer mon précédent site, [makemypattern.com](https://makemypattern.com/).

À ce propos, makemypattern.com a généré jusqu'à présent plus de 6500 patrons de couture, . Je pense donc qu'il est juste de dire que cela a été un bon parcours.

![Graphique du nombre de motifs générés sur makemypattern.com](https://posts.freesewing.org/uploads/mmp_patterns_82c2056938.png)

Mais [chaque nouveau commencement vient de la fin d'un autre commencement](https://www.youtube.com/watch?v=xGytDsqkQY8). Donc à partir d'aujourd'hui, mmp ne permettra plus aux nouveaux utilisateurs de s'inscrire sur et après une période de grâce de quelques mois, je le fermerai.

Mettez à jour vos signets, parce que [freesewing.org](https://freesewing.org/) est l'endroit où ça se passe.

## Tout est nouveau ou différent, et avec un peu de chance, meilleur

L'idée de générer des patrons de couture sur mesure à partir de tes mesures est la même. À part cela, à peu près tout ce que tu vois ici est différent.

J'ai déjà écrit sur les choix que j'ai faits en construisant ce frontend. Les [questions de principe et d'éthique](/en/blog/privacy-choices/) ainsi que [les questions techniques](/en/blog/freesewing-goes-jamstack/).

Aujourd'hui, je n'entrerai pas dans les détails du fonctionnement sous le capot. J'aimerais plutôt souligner brièvement certains des changements les plus importants pour les utilisateurs du site. Avec un peu de chance, tu en fais partie.

### Modèles et ébauches

Je t'ai dit tout à l'heure que mmp générait plus de 6500 motifs. Je peux aussi te dire que mmp a 10 patrons disponibles.

Alors, qu'est-ce que c'est, 10 ou 6500 ? Eh bien, cela dépend du contexte. Ce qui est ambigu et confus.

Les modèles sont des modèles, et les brouillons sont des brouillons.  
C'est-à-dire qu'un brouillon est ce que tu génères à partir d'un modèle. C'est un modèle rédigé selon tes spécifications exactes.

![Un exemple de brouillon tiré de freesewing.org](https://posts.freesewing.org/uploads/draft_sample_7e92caf0d6.svg)

J'espère qu'en utilisant les deux termes de façon cohérente, cela deviendra explicite.

Ainsi, pour le freesewing, cela signifie qu'il y a 12 patrons disponibles, à partir desquels un certain nombre de brouillons ont été générés que tu peux suivre en direct sur [la page d'état](/status).

### Nouveaux motifs et blocs

Actuellement, 12 modèles sont disponibles sur freesewing.org. Les 10 produits de mmp (note : certains ont changé de nom) plus le nouveau [Sven Sweatshirt](/patterns/sven) et le [Brian Body Block](/patterns/brian).

![Un exemple de sweat-shirt Sven](https://posts.freesewing.org/uploads/sven_b189ad1368.jpg)

Le bloc existait aussi dans le backend mmp, mais il n'était pas disponible pour toi. C'est donc un autre changement, je mets à disposition tous mes blocs (slopers).

Et d'autres sont à venir, j'ai actuellement 3 patrons et 1 bloc sur lesquels je travaille. Ils ne sont pas encore prêts, et je ne voulais pas retarder leur sortie, mais j'espère les avoir tous sortis avant la fin de l'année.

Ce que je veux dire, c'est qu'il faut surveiller cet espace. Ou mieux, consulte les liens en bas de cette page pour connaître les comptes de médias sociaux à suivre.

### Meilleure prise en charge de *les autres*

J'ai [essayé](https://makemypattern.com/blog/imperial-units-have-been-spotted-and-they-might-break-things) et [échoué](https://makemypattern.com/blog/imperial-units-not-worth-it) pour ajouter la prise en charge des unités impériales à makemypattern.com.

Cette fois-ci, les systèmes métrique et impérial sont entièrement pris en charge. Tu peux définir tes unités préférées dans les paramètres de ton compte. Et dans chaque modèle, tu peux régler les unités séparément, juste au cas où il t'arriverait de coudre pour des personnes vivant dans différentes parties du monde.

En parlant de différentes parties du monde, le noyau de freesewing prend entièrement en charge différentes langues. Tu peux obtenir ton modèle dans un certain nombre de langues, et si la tienne ne figure pas dans la liste, tu peux aider à la traduction.

![Le joug de Simon, en français](https://posts.freesewing.org/uploads/yoke_7555f8616c.svg)

On peut dire que c'est un peu une demi-mesure alors que ce site n'est qu'en anglais, mais à petits pas, n'est-ce pas ?

### Compare pour détecter les problèmes au plus tôt

L'un des pièges les plus courants est que les gens prennent les mesures de la mauvaise façon.

Lorsqu'ils génèrent un modèle, ces mesures incorrectes peuvent parfois perturber le modèle d'une manière qui peut être difficile à repérer si tu n'es pas familier avec le modèle.

Une façon d'y remédier est d'améliorer les instructions de mesure, que j'ai ajoutées. Mais ce que je voulais vraiment, c'était un moyen de faire des repérages de manière simple.

![Ces deux-là vont t'aider à prendre des mesures précises](https://posts.freesewing.org/uploads/standing_d66bef801a.jpg)

Se comparer aux autres est le moyen le plus rapide d'être malheureux. Mais dans ce cas, la comparaison a de la valeur.

Mettre ton modèle côte à côte avec un modèle qui est connu pour être correct peut t'aider à repérer les problèmes qui vont au-delà des différences de taille.

La comparaison est donc intégrée. Chaque fois que tu génères un brouillon, tu obtiens deux choses :

 - Ton projet de patron
 - Une comparaison de ton projet avec une série de tailles standard

![Un exemple de brouillon comparé aux tailles standard](https://posts.freesewing.org/uploads/compare_sample_171c3eaecd.svg)

C'est une façon de jeter un coup d'œil rapide à ton projet pour y déceler des problèmes flagrants avant de commencer à travailler dessus.

### Sans papier parce que les arbres sont précieux et que les imprimantes ne vont pas de soi.

Je suis curieux de voir si les brouillons sans papier vont prendre de l'ampleur.

Outre l'avantage évident d'économiser du papier, j'espère que cela permettra aux personnes qui n'ont pas accès à une imprimante d'utiliser le freesewing.

L'idée est que tu n'aies pas besoin d'imprimer ton patron. Au lieu de cela, tu peux la transférer directement sur du tissu ou un autre support.

Pour que cela soit possible, le patron est accompagné de dimensions détaillées et d'une grille métrique (ou impériale si tu aimes ça) qui t'aide à transférer toutes les informations.

![Un exemple de brouillon utilisant le thème de la dématérialisation.](https://posts.freesewing.org/uploads/paperless_sample_def717482e.svg)

Comme je l'ai dit, je suis curieux de voir si cela sera utile aux gens, mais j'ai pensé que cela valait la peine d'essayer.

### J'assure tes arrières (up)

Autre nouveauté : lorsque tu dessineras un modèle, je conserverai ce modèle pour toi, et il restera disponible.

![Toutes tes traites sont conservées et disponibles sur ton compte.](https://posts.freesewing.org/uploads/draft_list_7950e1609a.png)

Tu peux revenir à tout moment pour retélécharger le modèle, le modifier, le remanier ou le forker. Oui [fork it](/docs/site/fork), ce qui est plutôt cool parce que tu peux aussi forker des modèles d'autres personnes après qu'elles aient partagé leur ébauche.

Tu peux aussi ajouter tes propres notes à tes brouillons (et à tes modèles d'ailleurs).

### Blog et vitrine communautaires

Vos créations méritent mieux qu'un album Flickr quelque part, c'est pourquoi j'ai ajouté des vitrines au site. L'idée est d'avoir ici sur le site un recueil d'exemples de choses que les gens ont faites.

![Vitrine du sweat à capuche Hugo par uneanneedecouture](https://posts.freesewing.org/uploads/hugo_b331b0c298.jpg)

Évidemment, je ne peux pas ajouter ton travail si je n'en ai pas connaissance, alors soit tu me contactes, soit tu t'assures d'utiliser le hashtag #freesewing lorsque tu publies à ce sujet.

En parlant de publication, le blog freesewing est également ouvert à tes contributions si tu penses avoir quelque chose à partager.

### Badges bébé

C'est un peu idiot, mais tu peux maintenant débloquer les badges [](/docs/site/badges) sur le site. J'ai ajouté cette fonction au départ parce que je voulais trouver un moyen de remercier les personnes qui ont participé au programme d'accès anticipé.

Il y a quelque temps, j'ai ouvert une version d'accès anticipé du site à pour les personnes intéressées, et j'aimerais remercier tous les qui ont essayé le site, signalé des problèmes, ou simplement donné leur avis ou leurs encouragements.

Ceux d'entre vous qui ont participé devraient tous recevoir ce badge d'accès anticipé tant convoité. S'il manque quelque chose à [ton profil](/profile), [contacte](/contact).

D'autres badges sont disponibles, dont un pour s'inscrire le jour du lancement. [La liste complète des badges se trouve ici](/docs/site/badges).

## Que se passe-t-il maintenant ?

![L'obscurité, de façon réaliste](https://posts.freesewing.org/uploads/darkness_a9b72d2537.svg)

C'est peut-être moi, mais après chaque projet important, j'ai tendance à glisser dans un trou noir de *est-ce que c'est ça ?* désillusion.

Il me faudra peut-être quelques semaines pour m'en remettre, mais que cela ne t'empêche pas de me donner [tes commentaires et tes opinions](/contact) sur le site. Et si tu parviens à casser quelque chose, tu peux [créer un problème](https://github.com/freesewing/site/issues/new).

## Une dernière chose
J'ai travaillé sur ce sujet pendant environ un an et demi, et surtout ces 11 derniers mois de façon assez intensive.

Maintenant qu'il est prêt, peux-tu m'aider à le faire connaître un peu ?

Si tu pouvais en parler à quelqu'un, ou peut-être tweeter ou écrire à ce sujet, tu me rendrais un vrai service.

Merci



