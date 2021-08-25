---
title: 250|Testing your pattern
---

Avec le contour de base de votre patron prêt, il est maintenant temps de le tester pour voir à quel point il s'adapte bien à différentes mesures, et à l'étendue des options que nous avons fournie.

<Tip>

###### No more grading

FreeSewing patterns are *made-to-measure*, which means that you don't need to
grade your pattern to provide a range of sizes. Vous pouvez échantillonner votre patron
pour différentes mesures et options pour voir s'il s'adapte correctement.

</Tip>

Si le fait de tester votre patron vous semble une masse de travail conséquente, c'est votre jour de chance. FreeSewing peut le faire pour vous. Click the **Test your pattern** button in the top navigation bar of your development environment, and you'll see a number of choices at the right:

 - Tester les options du patron
 - Tester les mesures
 - Tester les modèles

The [API docs on sampling](/reference/api/pattern/#sample) have all the details on how this works, but for now we'll just look at the end result of each of these.

## Tester les options du patron

Nous avons utilisé des options pourcentages, qui peuvent varier entre leurs valeurs minimales et maximales. Pour ces tests, FreeSewing va diviser cette étendue en 10 étapes et ébaucher votre patron pour chacune d'entre elle.

Cliquez sur n'importe quelle option que nous avons ajoutée au patron, et votre bavoir sera dessiné avec une échantillonnage de cet option.

### lengthRatio

L'option `lengthRatio` contrôle la longueur de notre bavoir. La tester confirme qu'elle n'influence que la longueur :

<Example caption="Your bib with the lengthRatio option sampled" sample part="bib" pattern="tutorial" settings={{ sample: { type: "option", option: "lengthRatio" } }} />

### neckRatio

L'option `neckRatio` va déterminer la taille de l'encolure. Pour une même mesure de `head` (tour de tête), varier cette option devrait faire augmenter la largeur de l'encolure.

La tester confirme cela. Nous pouvons également voir que l'encolure devient plus étroite, les attaches seront tournées plus loin pour éviter qu'elles se chevauchent :

<Example caption="Your bib with the neckRatio option sampled" sample part="bib" pattern="tutorial" settings={{ sample: { type: "option", option: "neckRatio" } }} />

### widthRatio

L'option `widthRatio` détermine la largeur de notre bavoir. Pour une même mesure de `head` (tour de tête), varier cette option devrait donner des bavoirs de plus en plus larges.

Si nous testons cela, nous pouvons voir que cela fonctionne comme prévu. Mais il y a une chose qui requiert peut-être votre attention. Élargir le bavoir réduit la longueur depuis le bas de l'encolure jusqu'au bas du bavoir. Ce qui rend le bavoir plus court lorsqu'il est porté.

Even if the *total length* of the bib stays the same, the *useable length* shortens when the bib is made wider. Les utilisateurs ne s'attendent pas à cela, alors c'est une chose que nous devrions corriger dans notre patron. 

<Note>

Adjusting the pattern to make the `widthRatio` not influence the *useable length* of the bib is not
covered in this tutorial. It is left *as an exercise to the reader*.

</Note>

<Example caption="Your bib with the widthRatio option sampled" sample part="bib" pattern="tutorial" settings={{ sample: { type: "option", option: "widthRatio" } }} />

## Tester les mesures

Tester une mesure va faire varier cette mesure de 10% de plus ou de moins tout en laissant à l'identique tout le reste. Cela vous donne l'option de déterminer comment n'importe quelle mesure donnée influence le patron.

Pour notre bavoir, nous employons uniquement une mesure, alors elle influence le patron en entier :

<Example caption="Your bib with the head circumference measurement sampled" sample part="bib" pattern="tutorial" settings={{ sample: { type: "measurement", measurement: "head" } }} />

## Tester les modèles

Whereas testing a measurement will only vary one individual measurement, testing models will draft your pattern for different sets of measurments, which we refer to as *models*.

Sur la surface, le résultat ci-dessous est le même que pour notre test de mesure. Mais c'est parce que notre bavoir n'utilise qu'une seule mesure. Alors tester cette unique mesure revient au même que tester un set de mesures complet.

Mais la plupart des patrons utilise plusieurs mesures, et ce test vous donnera un aperçu de la façon dont votre patron s'adapte à différentes morphologies.

<Example sample caption="Your bib sampled for a range of baby sizes" pattern="tutorial" part="bib" settings={{ sample: { type: "models", models: { baby1: head: 340 }, baby2: 350 baby3: 360 baby4: 370 baby5: 380 baby6: 390 baby7: 400 baby8: 410 baby9: 420 } } }} />

## Le test de l'homme fourmi

A special case of model testing is the so-called *antman test*. It drafts your pattern with a set of *typical* measurements , and then drafts it again with measurements that are 1/10th of those *typical* measurements.

Ce test est nommé d'apèrs [le personnage de bande dessinée](https://en.wikipedia.org/wiki/Ant-Man_(film)) qui peut rapetisser, et pourtant ses habits lui vont toujours.

Le but du test de l'homme fourmi est de mettre en évidence les zones de votre patron où vous avez fait des hypothèses qui ne se mettent pas bien à l'échelle. Many drafting books will tell you to *add 3cm there* or *measure 2 inch to the right*. Ces instructions ne s'adapte pas à l'échelle, et vous devriez les éviter.

Les meilleurs patrons passeront le test de l'homme fourmi avec 2 patrons identiques. L'un sera simplement le dixième de l'autre en termes d'échelle.

<Example sample caption="Congratulations, your bib passes the antman test" pattern="tutorial" part="bib" settings={{ sample: { type: "models", models: { ant: head: 39 }, man: 390 } } }} />

Lorsque vous êtes satisfait de la façon dont votre patron passe les tests, il est temps de le compléter.
