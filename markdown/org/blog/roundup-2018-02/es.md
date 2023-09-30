---
author: "joostdecock"
caption: "Tu nuevo fondo de inicio de sesión para el mes de marzo"
date: "2018-02-28"
intro: "Este es tu resumen mensual de las noticias de libre circulación de las últimas cuatro semanas, y una mirada a lo que nos espera el mes que viene."
title: "Resumen mensual - Febrero de 2018: Núcleo 1.7.0 con mejoras de Sven, Carlton y Carlita. Más GDRP, vim y Jaeger"
---

Este es tu resumen mensual de las noticias de libre circulación de las últimas cuatro semanas, y una mirada a lo que nos espera el mes que viene.

## Echando la vista atrás a febrero

Tenía la secreta ambición de publicar un nuevo patrón cada mes de este año. Sólo estamos en febrero y parece que ese plan ya se ha descarrilado.

Veamos lo que ocurrió en febrero antes de hablar de lo que no ocurrió.

### Core v1.7.0 ya está disponible

Hoy mismo he dado el pistoletazo de salida a la versión 1.7.0 del núcleo. Como de costumbre, [el registro de cambios](https://github.com/freesewing/core/blob/develop/CHANGELOG.md#170) tiene toda la información, pero lo más significativo para los usuarios son [las nuevas opciones de canalé en el patrón Sven](/docs/patterns/sven/options#ribbing), así como un montón de mejoras adicionales en Carlton/Carlita.

Estas mejoras de Carlton/Carlita se deben a que yo misma y [Anneke](/showcase/maker/annekecaramin) hemos empezado a trabajar en [la documentación de estos patrones](/docs/patterns/carlton/). Y cada vez que escribimos algo como *aplica la entretela fusible aquí*, también volvemos al patrón para marcar exactamente dónde tiene que ir esta entretela fusible.

No hace falta decir que es un montón de trabajo. Pero debería ayudar en la construcción de estos patrones de abrigo, especialmente para aquellas personas para las que es la primera vez que hacen un abrigo.

### Plan de batalla contra el RGPD

No quiero que parezca que escribir una entrada de blog sea un logro en estos días, pero sí creo que merece la pena mencionar [nuestro *plan de batalla GDRP* entrada de blog](/blog/gdpr-plan) porque se trata de avances importantes, y la carga de trabajo que esto genera es significativa.

Aunque todavía no hay nada escrito en piedra, el post esboza nuestro plan para abordar el cumplimiento de la GDRP, algo en lo que nos centraremos en los próximos meses.


### Fragmentos de Vim para el núcleo de freesewing

En [una entrada del blog que es la encarnación del término *nicho*](/blog/core-vim-snippets) anunciamos la disponibilidad de un plugin para vim que proporciona fragmentos específicos del núcleo de libre acceso.

Básicamente, SI quieres desarrollar patrones y SI utilizas el editor vim, esto es para ti.

Podría decirse que son muchos "si".

### Avance de Jaeger

Te presento a Jaeger, el patrón de abrigo deportivo que esperaba publicar este mes.

![Jaeger está listo, pero aún no lo he hecho](jaeger.png")

Aquellos de vosotros que tengáis buena memoria recordaréis que el mes pasado mencioné que quizás publicaría esto durante febrero. Aunque entonces todavía se llamaba de otra manera.

Como también predije el mes pasado, no encontré el tiempo para hacer uno. De hecho, mi mayor problema a la hora de diseñar nuevos patrones parece ser encontrar el tiempo para hacerlos. Lo cual es aún más problemático con un patrón tan complicado como una chaqueta. A decir verdad, aún no sé de dónde saqué tiempo para hacer ese abrigo Carlton.

En fin, todo esto para decir que el patrón está listo, excepto que nunca he hecho la última versión del mismo. Y siento que no puedo soltarlo así.

Así que, si quieres hacer una muselina de esto --- o incluso la cosa real --- házmelo saber en los comentarios de , y me aseguraré de hacerte llegar un borrador.

Eso también podría ayudar a adelantar el lanzamiento de este patrón, pues ya sé que no tendré mucho tiempo para trabajar en una chaqueta el mes que viene.

Hablando de eso...

## De cara a marzo

Tengo dos semanas de vacaciones en marzo (¡Yay!), la mayor parte de las cuales estaré en Bangkok (¡más Yay!).

Eso significa que no coseré mucho el mes que viene, pero debería haber algo de tiempo de calidad para mí y mi portátil, así que quería abordar uno de los temas más importantes de mi lista de cosas por hacer a medio plazo.

Mi plan inicial era reescribir el núcleo, puedes encontrar algunos detalles [en este ticket sobre el asunto](https://github.com/freesewing/core/issues/236)

Sin embargo, de cara a los próximos meses, la cuestión más acuciante es la inminente fecha límite del GDPR en mayo, que también exigirá mucho trabajo.

Así que pensé que tendría más sentido abordar otra cosa de la lista de grandes objetivos: reescribir el frontend.

En lugar de añadir otro montón de código jQuery para gestionar todas las cosas del GDPR, la idea es bifurcar el frontend y portarlo a [vue.js](https://vuejs.org/). Para esto también, [hay una cuestión abierta en la que puedes seguir su progreso](https://github.com/freesewing/site/issues/311).

Dado que tengo cero experiencia con vue.js, esto debería ser divertido. Si quieres ayudar, deja un comentario.

