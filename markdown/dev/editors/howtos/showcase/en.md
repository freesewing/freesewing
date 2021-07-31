---
title: Adding a showcase on freesewing.org
for: editors
---

These are the steps required to add a new [showcase](https://freesewing.org/showcase/) to the website:

 - Create a new folder in the `org/showcase` directory of [our markdown repository](https://github.com/freesewing/markdown/) 
 - Add an `en.md` markdown file to this folder
 - Add one of more images to the folder
 - Add the frontmatter to the file
 - Add the body of the file

Let's look at each step in detail:

## Create a new folder for the showcase


Our [markdown repository](https://github.com/freesewing/markdown/) holds all content
for both freesewing.org and freesewing.dev.

The content for showcases on freesewing.org is in the `org/showcase` folder.

You'll find a bunch of directories here for all the existing showcases. 
Create a new one keeping in mind that this will determine the URL under which the showcase
is available. So:

 - No spaces
 - No uppercase
 - Stick to `a-z` and `-` to be safe

## Add an `en.md` file to the folder

Create an empty file in this folder and name it `en.md`.

## Add one of more images to the folder

Add the images you want to use to the folder.

<Note>We prefer if you use lowercase for all filenames</Note>

## Add the frontmatter

Frontmatter is metadata that we add to the top of the file. 
Please refere to [working with frontmatter](/editors/frontmatter) is you're not sure how to use it.

The following fields need to be filled in:

| Name | Description |
| ---- | ----------- |
| `date` | Must be in format `YYYY-MM-DD`  |
| `title` | Title of the showcase |
| `img` | Filename of the main image. Must be placed in the folder of the showcase |
| `caption` | The caption that will go below the image |
| `patterns` | An array of designs/patterns that are being showcased. Lowercase only |
| `author` | FreeSewing username of the author |

Below is an example:

```md
---
date: 2018-09-29
title: Yoga Outfit by Paul
img: showcase.jpg
caption: "Aaron and Bruce yoga set with stripes by Paul (up-side-down)"
patterns: [aaron,bruce]
author: Tiger751023
---
```

Add the frontmatter to the top of the `en.md` file.

## Add the body

Below the frontmatter, you can write the body of your post, [using markdown](/editors/markdown/).


<Tip>

You can look at [one of the many showcases](https://github.com/freesewing/markdown/tree/develop/org/showcase) for examples.

</Tip>
