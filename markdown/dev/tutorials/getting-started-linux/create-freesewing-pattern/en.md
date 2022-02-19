---
title: Setting up the FreeSewing development environment
order: 40
---

FreeSewing provides a development environment to help you design and develop patterns.

With Node installed, all you need to do to setup this development environment is run this command:

```bash
npx create-freesewing-pattern
```

It will take a moment to download some dependencies, and then will ask you the following questions.

You can change all of these later. It's just to get you started.
If you're not sure what to fill in, you can stick with the defaults or leave them blank.
Only a few of these are mandatory.

-   **Language**: Use the arrow keys to chose the language of your choice
-   **Pattern name**: This will be the name of your pattern, but also the name of the folder we'll setup for you. If you're just kicking the tires, something like `test` will do you fine.
-   **description**: A description of your pattern. It's not mandatory.
-   **Pattern type**: Use the arrow keys to chose either `block` or `pattern`. Choose `pattern` if you're not sure what to pick
-   **department**: Use the arrow keys to pick a department like `tops`, `bottoms` or `accessories`. This is is only relevant if you decide to publish your pattern later. But by that time you will have learned how to change this.
-   **Author**: You can enter your name, or leave this blank for now
-   **GitHub repository**: You can leave this blank for now
-   **Package manager**: Choose either `npm` or `yarn` as your package manager. If you're not sure, pick `npm`.

When you've answered all questions, the command will download the development enviroment,
and set it up based on the choices you made.

This step will take anywhere from a few to about 10 minutes to complete.
But when it's done, you will have a new folder with the development environent inside.
