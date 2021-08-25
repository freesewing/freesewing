---
title: 100|Setting up the development environment
---

Ouvrez un terminal et entrez la commande suivante :

```bash
npm init freesewing-pattern
```

Cela va charger quelques dépendances, puis vous demander les questions suivantes :

 - **Language**: Use the arrow keys to select the language of your choice
 - **Pattern name**: Enter `tutorial`
 - **description**: Enter `The FreeSewing tutorial`
 - **Pattern type**: Use the arrow key to select `Pattern`
 - **Department**: Use the arrow keys to select `Accessories`
 - **Author**: Enter your GitHub username
 - **GitHub repository**: This will be prefilled for you, so just hit Enter
 - **Package manager**: Use the arrow to choose. En cas de doute, prenez `NPM`.

Après avoir répondu à toutes ces questions, le modèle par défaut sera copié, après quoi toutes les dépendances seront installées.

<Note>

Cela prendra quelques minutes car nous chargeons des logiciels pour votre environnement de développement. 

</Note>

Lorsque c'est prêt, vous devrez exécuter deux commandes en parallèle. Dans le terminal courant, entrez le répertoire qui vient d'être créé pour notre patron `tutorial` et démarrez rollup en mode veille :

```bash
cd tutorial
npm run start
```

Ou si vous choisissez d'utiliser Yarn en tant que gestionnaire de package :

```bash
cd tutorial
yarn start
```

Maintenant, ouvrez un second terminal, et naviguez jusqu'au sous-dossier `example` et exécutez la même commande là :

```bash:
cd tutorial/example
npm run start
```

Ou si vous choisissez d'utiliser Yarn en tant que gestionnaire de package :

```bash
cd tutorial/example
yarn start
```

Si tout se passe bien, votre navigateur s'ouvrira et vous montrera la page suivante :

![L'environnement de développement FreeSewing](./cfp.png)

<Note>

###### Using Windows?

Nous avons testé ceci sur Linux et MacOS, mais pas sur Windows étant donné que je (Joost) ne possède pas une machine Windows sur laquelle je pourrais le tester.

If you run into any issues, join [our chatroom](https://gitter.im/freesewing/development) and
we'll figure it out together.

</Note>

