---
author: 1
caption: "No bebo, pero esto me pareció apropiado para un post de celebración ¯\_(ツ)_/¯"
date: "2018-08-25"
intro: "Celebrando un año de freesewing.org: Anunciamos la biblioteca freesewing"
title: "Celebrando un año de freesewing.org: Anunciamos la biblioteca freesewing"
---


Hace exactamente un año, las puertas de freesewing.org se abrieron para nuestros usuarios, mientras los de makemypattern.com recibían uno de esos carteles de *nos hemos mudado* .

Echando la vista atrás a [, esa entrada del blog de hace 12 meses](/blog/open-for-business), casi resulta increíble que las cosas que se anunciaron entonces tengan sólo un año. El concepto de borrador, la funcionalidad de comparación o incluso los patrones sin papel. Todos ellos celebran hoy su primer cumpleaños.

Pero no en este sitio, porque [impulsado por la inminente fecha límite del GDPR](/blog/gdpr-plan), abandonamos nuestro sitio basado en Jekyll por un nuevo front-end en algún momento de mayo.

## Más lenguas con menos lenguas

El GDPR era sólo una parte de esa historia. Otras razones para la reescritura fueron nuestro deseo de admitir varios idiomas, y simplificar nuestra pila tecnológica.

En otras palabras, queríamos llegar a personas que hablan distintas lenguas, y queríamos limitar el número de lenguajes de programación necesarios para ello.

### Lenguas más naturales

Lo hemos hecho notablemente bien en este frente. Aunque no encontrarás todo el contenido traducido, las principales funciones de este sitio web están ahora disponibles en cinco idiomas:

 - Inglés
 - Alemán
 - Español
 - Francés
 - Holandés

Lo que realmente es 100% gracias al gran trabajo de [nuestros maravillosos traductores](/i18n/).

### Menos lenguajes de programación

El cambio de [Jekyll]() a un front-end basado en [Nuxt](https://nuxtjs.org/) ha eliminado [Ruby](https://www.ruby-lang.org/) de nuestra pila tecnológica. Freesewing.org funciona ahora con JavaScript, PHP y un poco de C (que ignoraremos por ahora).

Pero eliminar los lenguajes de programación no es un objetivo *an sich*. Más bien, la ambición subyacente es simplificar las cosas, facilitar la participación de la gente en y, en última instancia, atraer a más colaboradores para que el proyecto pueda crecer y florecer.

Hoy en día, diseñar/desarrollar patrones no es un obstáculo insalvable. Tenemos [benjamin](/patterns/benjamin), [florent](/patterns/florent), y [sandy](/patterns/sandy) para demostrarlo. Todos ellos fueron aportados por personas para las que freesewing era inicialmente nuevo, pasaron por el tutorial de diseño, y al final crearon un patrón propio.

Nos gustaría que más gente siguiera sus pasos. Así que hacer que el proceso sea lo más sencillo posible es una inversión de nuestro tiempo que merece la pena.

## Anunciamos freesewing, la biblioteca

Durante los últimos 2 meses, me he tomado un tiempo libre de patronaje y costura para abordar nuestra deuda técnica [](https://en.wikipedia.org/wiki/Technical_debt).

En concreto, me he propuesto reescribir nuestro back-end central desde cero en JavaScript. Pero hay un giro. Ya no es un back-end. Es una biblioteca que puedes utilizar tanto en tu navegador, como en el servidor con [node.js](https://nodejs.org/).

Actualmente se encuentra en la versión 0.10, y cuenta con el núcleo freesewing. Está [disponible en GitHub](https://github.com/freesewing/freesewing) y [NPM](https://www.npmjs.com/package/freesewing), y está completamente documentada en [developer.freesewing.org](https://developer.freesewing.org/).

Y aunque su API es más rica que la de Core, su huella es en realidad mucho menor:

![Comparación de líneas de código entre la nueva biblioteca y (la parte relevante de) el núcleo de freesewing](https://posts.freesewing.org/uploads/corevsfreesewing_c9327c9fa3.svg)

Lo cual es una buena noticia, por si te lo estabas preguntando.

## ¿Qué ocurre después?

Queda mucho trabajo por hacer antes de que podamos utilizarlo realmente en freesewing.org:


 - Todos nuestros patrones existentes deben adaptarse a la versión JS. [Brian](https://github.com/freesewing/brian) es el primer patrón que se ha portado.
 - Reescribe nuestro back-end de datos en JS. Ya que esto eliminará el lenguaje de programación PHP de nuestra pila.
 - Construye un nuevo sitio web utilizando la biblioteca freesewing y nuestro nuevo back-end de datos.

Esto es realmente mucho trabajo, y aunque espero que a finales de año hayamos hecho buenos progresos, no puedo prometer que esté hecho.

## Pero sólo quiero patrones

Lo más probable es que lo único que te importe sean los patrones. Lo que quieres son más patrones, mejores patrones, patrones diferentes. Y toda esta reescritura no te está tocando precisamente las narices.

Lo entiendo. De verdad. Por mi parte, tengo una lista de patrones que me gustaría que se añadieran al sitio. Y mi trabajo en otros aspectos del proyecto me impide añadirlos.

Pero creo que invertir ahora en una experiencia racionalizada para los desarrolladores tendrá un efecto en cadena a largo plazo.

Si queremos unos patrones adicionales, éste no es el enfoque adecuado. Pero si queremos muchos más patrones, creo que sí.

Y quiero muchos más patrones.

