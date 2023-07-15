---
author: "joostdecock"
caption: "This post is mostly about our work on progressive disclosure. Also: Three new patterns!"
date: "2019-10-06"
image: "https://cdn.sanity.io/images/hl5bw8cj/site-content/52db6852590a15208dace4a16a6a1c824037e400-2000x1500.jpg"
intro: "We've just release FreeSewing v2.1 🎉"
title: "FreeSewing v2.1: Three new patterns, expert mode, and help with measurements"
---


We've just release FreeSewing v2.1 🎉

## Meet Penelope, Waralee, and Simone

There are 3 new patterns in this release:

 - [Penelope](/patterns/penelope) is a pencil skirt by [Wouter Van Wageningen](/users/wouter.vdub)
 - [Waralee](/patterns/waralee) are wrap pants, also by [Wouter](/users/wouter.vdub)
 - [Simone](/patterns/simone) is Simon (our versatile button-down pattern) adapted for breasts by [Joost De Cock](/users/joost)

All of these patterns are either womenswear or -- in the case of Waralee -- unisex clothing. Which in an indication of our commitment to bring more womenswear patterns to the site.

Apart from creating new patterns, a lot of efforts have gone into making things simpler, without making them dumber. Let me explain:

## Our work on progressive disclosure

Striking a balance between giving our users all the power of the platform, yet making it easy for newcomers to get started, is an ongoing challenge. We have started making inroads into addressing that issue with so-called *progressive disclosure of complexity*.

The idea -- which we didn't make up, but is a concept in UX design -- is to simplify the experience for most people without limiting the abilities of more advanced users.

We are focusing our attention for progressive disclosure on two areas that are the ones that our users most often struggle with:

 - **Pattern options**: Our patterns often come with dozens of options. That is great for those who like to fine-tune every detail of their pattern, but can be a bit overwhelming for newcomers
 - **Measurements**: Taking accurate measurements is crucial for good results with our patterns, yet not as trivial as you would think.

While we're certainly not there yet, we've made progress on both of these. Let's look at what we've been up to:

### Pattern options: We now have an expert mode, and it's off by default

(some of) Our patterns have had *advanced options* for a while, but they are now hidden by default. That is until you turn on the **Expert mode** in the settings (below the pattern options).

Apart from advanced pattern options, export mode also reveals the lesser-used draft settings such as the ability to change the language, units, details, margin, and contents of your draft.

![Advanced mode](https://posts.freesewing.org/uploads/recreate_a6e2f9c4d6.png)

<Note> 

###### Also shown: Pattern vs Recipe defaults

When configuring your draft, every option has a little button to restore the default value for that option.
Things get more complicated when you're re-creating a recipe. Now when you restore the default, is it the pattern default, or the recipe's default?

The answer used to be the pattern default, but with this release, you'll find that options where the recipe default is different from the pattern
default will have two buttons. Once to restore the pattern default, and another to restore the recipe default. 

You can see this in the screenshot above.

</Note>

### Measurements: Helping you spot mistakes in your measurements

Hemos añadido algunos indicadores para ayudarle a detectar errores o problemas en sus mediciones. Your models will now show a graphical representation of your body measurements, which will allow you to spot any outliers.

![A graphical representation of your model's measurements](https://posts.freesewing.org/uploads/model_c3fa8fc50c.png)

In addition, we are showing you an estimate of your different measurements (based on your neck circumference) next to the actual value. If the difference gets larger, we'll draw your attention to that.

This is a difficult area for us to work in. We want to help you get the best results, and that includes helping you spot issues with your measurements. On the other hand, we in no way want to imply that someone's measurements are *wrong* somehow.

Somos un patrón muy incluyente de tamaño, y una cantidad desproporcionada de nuestros usuarios son personas que luchan por encontrar ropa o patrones de otras tiendas. So on one hand, it might seem like we're setting ourselves up for failure by comparing measurements to a set of more or less *standard* measurements. Pero usted conoce su cuerpo. Usted sabe cuál de sus mediciones se desviará de la media. Y señalamos que lo hacen de alguna manera sólo es una confirmación de que ha estado mediendo correctamente. Por otro lado, si algo salta hacia fuera donde tienes un tamaño bastante medio, sabes que puedes revisar esas mediciones.

Por último, pero no menos importante, mientras intentamos proporcionar orientación sobre las mediciones para ayudar a detectar errores, nunca excluimos a nadie basado en el tamaño o medición. No matter what you throw at us, we will  draft a pattern that works for you, or (our software will) die trying.

## Other changes

 - We have extended our size ranges for our comparison views. Menswear sizes are now sampled from size 32 up to 48, while womenswear is sampled from size 28 up to 46.
 - We've made some changes to the defaults in the Simon pattern, based on our tests with Simone
 - We've added support for preloading models with breasts to our development environment for pattern designers
 - We've implemented fixes and improvements in our Jaeger, Bruce, Benajamin, Simon, Carlton, and Carlita patterns
 - We've added a bunch of missing images in the documentation, and [started an effort to make sure all options have an image to illustrate their purpose](https://github.com/freesewing/freesewing.org/issues/190).

More information is available [in the changelog](https://github.com/freesewing/freesewing/blob/develop/CHANGELOG.md).

We hope you enjoy this release, and please [stop by our chat room](https://discord.freesewing.org/) to share your thoughts, feedback, suggestions, or ideas. We'd love to hear from you 





