---
title: 100|Setting up the development environment
---

Open een terminal en voer de volgende opdracht in:

```bash
npm init freesewing-pattern
```

Deze opdracht laadt een aantal dependencies en stelt je dan de volgende vragen:

 - **Language**: Use the arrow keys to select the language of your choice
 - **Pattern name**: Enter `tutorial`
 - **description**: Enter `The FreeSewing tutorial`
 - **Pattern type**: Use the arrow key to select `Pattern`
 - **Department**: Use the arrow keys to select `Accessories`
 - **Author**: Enter your GitHub username
 - **GitHub repository**: This will be prefilled for you, so just hit Enter
 - **Package manager**: Use the arrow to choose. Kies `NPM` als je het niet zeker weet.

Nadat je deze vragen beantwoord hebt, wordt er een standaardtemplate gekopieerd. Daarna worden alle dependencies geïnstalleerd.

<Note>

Dit duurt een paar minuten aangezien we software voor je development-omgeving aan het laden zijn. 

</Note>

Als het klaar is, moet je twee opdrachten parallel invoeren. In de huidige terminal geef je de directory in die we net gemaakt hebben voor het `tutorial`-patroon en begin rollup in de volgmodus:

```bash
cd tutorial
npm run start
```

Of als je Yarn gekozen hebt als package manager:

```bash
cd tutorial
yarn start
```

Open nu een tweede terminal en navigeer naar de subfolder `example`. Voer daar dezelfde opdracht in:

```bash:
cd tutorial/example
npm run start
```

Of als je Yarn gekozen hebt als package manager:

```bash
cd tutorial/example
yarn start
```

Als alles goed gaat, gaat je browser nu open met de volgende landingspagina:

![De development-omgeving van FreeSewing](./cfp.png)

<Note>

###### Using Windows?

We hebben dit getest op Linux en MacOS, maar nog niet op Windows.

If you run into any issues, join [our chatroom](https://gitter.im/freesewing/development) and
we'll figure it out together.

</Note>

