---
date: "10-01-2023"
edition: "2023q4"
intro: "Bienvenue dans l'édition d'automne 2023 de la lettre d'information de FreeSewing."
title: "2023 Édition d'automne"
---

Bienvenue dans l'édition d'automne 2023 de la lettre d'information de FreeSewing.

Voici ce que nous avons inclus pour toi aujourd'hui :


- 🎉 Annonce de FreeSewing v3.0 (lecture en 2 minutes - par joost)
- ⚠️ Ruptures dans FreeSewing v3 (lecture en 1 minute - par joost)
- 📦 Les créations de FreeSewing sont désormais JBOP (lecture en 1 minute - par joost).
- 🕵️ Derrière les coutures : Jenni (lecture de 6 minutes - par Jenni & Karen)
- 🙏 Tu as des mesures, et je les veux pour notre nouveau site (lecture en 2 minutes - par joost).
- 🇺🇦 Prise en charge de l'ukrainien et d'une lettre d'information en plusieurs langues (lecture en 1 minute - par joost).
- 🤔 Alors quand est-ce que FreeSewing.org fonctionnera avec la version 3 ? (1 minute de lecture - par joost)

&nbsp;

---

&nbsp;

## 🎉 Annonce FreeSewing v3.0

FreeSewing 3.0 est enfin là.

The 3.0 release culminates more than a year of work, and comes just over four years after the v2.0 release. What I’m saying is: I don’t make announcements like this often, and it’s a big deal. Tu devrais t'enthousiasmer.

Beaucoup de travail a été consacré à cette publication, et je ne pourrais pas tout couvrir. To give you a rough idea, FreeSewing's monorepo -- which holds all our code -- was created in early July 2018 when I migrated to a monorepo approach. Its current state is the result of over 92K commits since that day.

Of those 92K commits, more than 45K are the work on v3, as you can see in this output from when I finally got to merge v3 into the main branch (which was frozen since August last year):

```
joost@machine:~/git/freesewing$ git status
Sur la branche main
Ta branche est en avance sur 'origin/main' de 45197 commits.
  (utilise "git push" pour publier tes commits locaux)

rien à commiter, arbre de travail propre
```

Serais-tu surpris si je te disais qu'il y a quelques conflits de fusion à résoudre ?

Quoi qu'il en soit, je sais que le nombre d'engagements est une façon grossière de mesurer les choses. But it's somewhat indicative of the effort expended that the work done over the last 13 months to get to v3 by commit count is roughly similar to the work done in the 4 years prior to that.

It's been an ambitious leap forward, and as I wrote in the previous edition of this newsletter, at times it felt like I had bitten off more than I can chew. Sticking the landing was also fraught with its own set of challenges, as deciding what the release would look like requierd some tough decisions.

Mais nous sommes dans une situation formidable maintenant. After 15 alpha versions and 1 beta version, version 3.0.0 of FreeSewing is now generally available.

I want to thank FreeSewing's patrons for their continued support, as well as all those who contributed to this release, gave their input and feedback, helped with translation, or just had a few nice words of encouragement to spare. It was all needed to get to where we are today, and I'm very appreciative to all of you.

&nbsp;

---

&nbsp;

## ⚠️ Changements dans FreeSewing v3

La version 3.0.0 est une version majeure et comporte donc des changements importants. Listing all of them would be rather challenging, and probably not that useful. But here are three changes that are super obviously going to break your stuff if you rely on FreeSewing code:

- **FreeSewing 3 is ESM only**: Migrating a large Javascript project to ESM modules is enough to make even the most seasoned developers break down and cry, but it’s done.
- **FreeSewing 3 uses named exports**: There are obviously some places where a default export is required (looking at you NextJS) but whereever we can, we now use named exports exclusively because we all know those are better.
- **FreeSewing 3 nécessite Node 18 ou une version plus récente**: je recommande lts/hydrogen

Ceci étant dit, parlons des nouveautés.

&nbsp;

---

&nbsp;

## 📦 Les modèles FreeSewing sont maintenant JBOP

A big driver for the decision to freeze the v2 branch and start working on v3 was to make it easier to mix-and-match parts from various designs.

Design inheritance was already possible in v2, but because the configuration was handled on the design level, it required careful re-configuration of (required) measurements, options, part dependencies, and so on. It was possible but came with a lot of friction.

In v3, all configuration is moved to the part level, and a design is now not much more than just a bunch of parts (JBOP). It is the parts themselves that configure what they need. This includes anything from the measurements they require, the options they provide, the plugins they use, their dependencies, and so on. It is the parts themselves that configure what they need.

For our own designs, I expect to see this new modularity result in the consolidation of common parts into a number of utility designs that are not intended as stand-alone patterns, but rather as providers of common features. As an example, plenty of designs need welt pockets, and today they each implement their own.  In the future, I expect a welt pocket will be something you can just grab as an *off-the-shelf* part so to speak.

It's but one example, but it goes to show that the move to part-based configuration not only makes things easier, it also opens up exciting new avenues that weren't previously accessible.

&nbsp;

---

&nbsp;

## 🕵️ Derrière les coutures : Jenni

Fans of the [FreeSewing Discord](https://discord.freesewing.org/) have probably seen some of the awesome clothes Jenni has made for everyone in her family. We chatted with Jenni to learn a little more about her background and journey to becoming a FreeSewing contributor! The interview below has been edited for length, and any errors, oversights, etc. are entirely the fault of the interviewer.

### Quand et pourquoi as-tu commencé à coudre ? Comment as-tu découvert FreeSewing ? Couds-tu surtout pour toi-même ou pour d'autres personnes, comme tes amis ou ta famille ?

I gradually became aware of FreeSewing when I first started sewing and was pretty confused by all this idea of 'hacking' patterns and modifying them to fit your body. Being able to take really detailed measurements and then generating a pattern to fit you well seemed like a great idea! I looked at it longingly for a bit, I played with it for a bit but didn't actually try any of the patterns for quite a while. Instead I used the patterns produced by one indie designer in particular - Oliver + S kids patterns and Liesl & Co adult sizes, produced by the same designer. Her patterns are very well explained and the kids' patterns take into consideration the needs of that group very directly (proportions, ease, usability). Je me suis donc améliorée en couture en général. I sewed for myself and some family members and friends, mostly tops for other people, but I also made some clothes for my kids. More and more I found that I was ending up sewing stuff for my eldest more than other family members: my kid is skinny anyway so there are some fitting challenges, but also they were / are going through some gender dysphoria experiences as they grew older and came out as non-binary.

There was a tipping point one day when they refused to wear any sort of feminine-gendered swimming costume - and there was school swimming lessons coming up shortly. La couture à la rescousse ! I created a pattern for a Teagan and Shin combo to make a swimming costume with separate top and bottom in a gender neutral style that was acceptable. In fact due to timings we also ended up buying a commercial onesie so that they had a choice of options, but being able to confidently assure my kid that yes, there was something we could definitely do, was very helpful in the moment. I made that Shin / Teagan combo for them, but also a pair of Shin trunks for my younger kid (in a smashing flamey lycra!) and one for my partner, who hates flappy boxer type swimmers and was a bit short on useable speedos. My sister saw the Shin in the bright flame pattern lycra and wanted one too, so I made another one! And I can see more being needed as the originals grown out of, so I won't stop there.

J'ai aussi fait à mon enfant un certain nombre de caleçons Bruce, avec un devant plat. They are very gender euphoric as underwear! Lovely and jolly too, because of course you can use all sorts of small bits of various knits so they end up very colourful. And now I am starting to make some Aarons for my kid, to be used instead of a commercial crop top / bralette. I will have to work out how to make them snug without being too compressive although they do like some compression so we will have to iterate I guess.

### Comment es-tu devenu contributeur ? Quel a été ton travail de collaborateur jusqu'à présent ?

I'm not sure that I am much of a contributor really, despite vaguely wanting to help. What I do do is to share my makes on Discord, and include information about what was challenging and what went well. For instance, using FS patterns for kids does have some difficulties in that clothing can come out as very snug in the body (not enough ease proportionally) or in key areas like the neckline (where it is snug to the neck but not really large enough to get a kid's head through easily - again due to proportions). These are all things that can be handled but it is worth looking out for specifically when trying something new.

I did manage to write a couple of Showcase posts and in principle I would be happy to do some more of that, but I have so much going on at present in my home and work life that realistically it gets squeezed out. For now I will stick to gradually trying new patterns and feeding back on them in Discord!

### De quel projet de couture/codage es-tu le plus fier ?

A standout project was a big cycling cape I made myself, based on the Folkwear Patterns "Australian Drover's Coat". It hearks back to the rugged leather or oilskin coats that you might wear as a rider in the Outback, only with more hi-vis reflection for use in the (not so) mean streets of Oxford, UK. Not sure whether it is the sewing project I am most proud of as such, though I am definitely very pleased to have finished it! It was a real marathon, and putting the press studs in was great fun (though also a bit nerve-wracking). My partner wants me to make one for him, so that's pretty good too - once I can face another marathon!

### Qu'est-ce que tu aimes le plus dans la couture ? Qu'est-ce que tu détestes le plus dans la couture ? Quelle est la partie la plus difficile de la couture pour toi ?

J'aime le processus de couture (la plupart du temps !). Buttonholes are a bit nerve-wracking) and I enjoy the results too - looking at it, looking at others wearing or using it, using it myself. Fitting things well is still a big challenge, I don’t feel I really understand it yet. I want to try Top Down Centre Out for trouser fitting and I think I understand the concept but have been a bit nervous of taking it on properly, I need to dedicate a slot of time.

### Quels seraient tes conseils pour les couturiers débutants ?

Il y a un sens dans lequel un certain ensemble de phrases contradictoires sont toutes les deux vraies. People like to say "If a thing's worth doing, it's worth doing properly" and of course that's true; but I think that the converse is also true, at the same time: "If a thing's worth doing, it's worth doing badly". Even if you can't do it fully or completely, still do the thing! If you can only do part of it now and part of it tomorrow and the last bit of it next week, still do the thing! Sewing for kids was very liberating - even if it is far from perfect they will still dig it (and even if it is super perfect they may take against it and never end up actually wearing it). Do it, or don't do it - don't let the question of 'can I do it well' be the thing that holds you back.

Pick a project where even if you do make mistakes it will still bring enjoyment. A project where you learn a lot, or where you can give it away to someone, or where you can enjoy the recipient when they wear it, or where you will love the fabric even if there are things you will change next time.

More prosaically I would also say a project that either has really good robust instructions or where you can ask others for help is going to be easier than struggling away by yourself. I mean, unless that is the way you personally learn best - for me, I need a scaffolding of understanding first.

&nbsp;

---

&nbsp;

## 🙏 Tu as des mesures, et je les veux pour notre nouveau site.

TL;DR : J'aimerais utiliser tes mesures. Lis la suite pour tous les détails.

Ok, this requires a bit of backstory to explain so hear me out: FreeSewing is all about made-to-measure sewing patterns. It's our thing, it's what we do, and if you want to get the most value out of FreeSewing, then taking accurate measurements is a necessary first step.

But here's the rub: To the casual visitor on our website -- say someone who Googled *free sewing patterns* -- that's *a lot* of effort to go through just to try the platform. This is why at some point we rolled out a range of *standard sizes* that people could use instead of their own measurements.

Mais cette approche pose des problèmes évidents. First of all, standard sizing is a lie, and doesn't exist. But it doesn't stop people from complaining that *I know I am an XL but your XL did not fit me*. Which is of course our own fault because when it comes to standard sizes, the only way to win is to not play.

Nos tableaux de dimensionnement ne sont pas non plus du tout parfaits. For one thing, while they are based on real people, the other sizes are graded up or down from there.  So the further you move away from the base model, the less confident I am that they make a whole lot of sense.  That's because for the most part, the proprtions remain largely the same.

Et cela nous amène à la chose qui me dérange le plus dans cette approche. You see, we use this sizing table ourself to test the designs we put up at FreeSewing.org. And because the variation in proportions is somewhat limited, we are leaving some people behind, and that's not what we're about.  It would be much better if we could test our patterns not with a smoothly graded up and down range of sizes, but rather on a selection of real people with all of the variation that that entails.

In practical terms, we will be moving away from this idea of *standard sizes* and instead FreeSewing will provide a list of *curated measurements sets*. These will be complete sets of measurements from real people that we can use to test our designs, but that will also be available to users who want to try the platform.

The new (v3) FreeSewing backend also integrates with our new development environment, so designers will be able to access these early in the design process.

I have high hopes that such a readily available collection of curated measurments will make it much easier for designers to support a wider ranger of people and bodies. But, that is not going to happen until the grand total of available measurements sets gets a bit higher than the number of 1 it stands at today (that would be me).

Voici donc ce que je recherche :

- Tu dois être prêt à partager un ensemble complet de mesures.
- Tu es également prêt à partager ta taille
- Et tu es prêt à partager une photo frontale en pied.

Then I'd like to ask if you would consider adding your measurements to FreeSewing's list of curated measurements sets. Si c'est le cas, clique sur répondre.

Cela m'aiderait vraiment, et tu serais en bonne compagnie 😉.


&nbsp;

---

&nbsp;

## 🇺🇦 Prise en charge de l'ukrainien et d'une lettre d'information en plusieurs langues.

Something else that we've been working on -- spearheaded by some our our users from Ukraine -- is to add support for Ukrainian to the website.  That brings the total of supported languages to 6, with English, Spanish, French, German, Dutch, and now Ukrainian.

Internationalisation is a crucial aspect of making FreeSewing available to as many people as possible.  In this case, there's obviously also a great deal of symbolism with the ongoing conflict in Ukraine.  We could have thrown up a banner to say we stand with Ukraine, but instead we opted for something a bit more ambitious and made Ukrainian an officially supported language.

Je souhaite également étendre la même prise en charge multilingue à cette même newsletter. Once the new website goes live (more on that below) your language preference will be taken into account, and the goal is to deliver you the next newsletter in the language of your choice.

The real challenge thare is that I will need to learn to not write this thing at the last minute 😂


&nbsp;

---

&nbsp;

## 🤔 Alors quand est-ce que FreeSewing.org fonctionnera avec la version 3 ?

There’s a lot more in v3 that I could write about, but I need to address the elephant in the room: *So we have 3.0 now, when do non-developers get to use this?*

Bien… Je vais avoir besoin d'un peu plus de temps. Everything is sort of ready, but some things always take more time because you can’t really do them in advance. Des choses comme la traduction, et d'autres tests.

So as a regular user of FreeSewing.org who is not itching to spin up a development environment, you will need to hold on a little longer. But clearly, it’s going to be soon now. Je dirais que c'est une question de semaines, plutôt que de mois.

The biggest outstanding hurdle is migrating the 50k+ users to a completely different infrastructure. I've completely rewritten the FreeSewing backend (can't believe I did not write about the exciting new backend features, but ok), and switched from MongoDB to Sqlite as database, so this not only requires careful planning, it's also slow because all data is encrypted at rest. So everything needs to be decrypted, migrated, then re-encrypted again. And it's like, you start the process before going to bed and then the next morning you find out that user #32062 had some weird setting you didn't think about which caused things to go off the rails, and now you have to start over.

Point is, FreeSewing has grown to a point where migrating all users has become its own mini-project that's too intricate to just throw in with the v3 release. But obviously, it will be my next move once I can uncross my fingers that 3.0.0 is as good as I think it is.

Merci de m'avoir soutenue pendant tout ce temps. Nous y sommes presque maintenant 😃 
