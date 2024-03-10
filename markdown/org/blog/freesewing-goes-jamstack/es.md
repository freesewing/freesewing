---
author: 1
caption: "Foto de <a href='https://stock.tookapic.com/jenniferforjoy' target='_BLANK' rel='nofollow'>Jennifer</a>"
date: "2017-06-12"
intro: "Cuando lanzamos el núcleo de freesewing a finales de marzo, mi atención se centró inmediatamente en construir nuestro front-end para que freesewing.org pudiera sustituir completamente a makemypattern.com ."
title: "Somos JAMstack, somos JAMstack, somos JAMstack, somos JAMstack, somos JAMstack, somos JAMstack, somos JAMstack, y espero que a ti también te guste JAMstack"
---

Cuando lanzamos el núcleo de freesewing a finales de marzo, mi atención se centró inmediatamente en construir nuestro front-end para que [freesewing.org](/) pudiera sustituir completamente a [makemypattern.com](https://makemypattern.com/).

Creo que el valor de Freesewing reside en la plataforma central y en nuestros patrones. Pero sin una forma fácil de exponer ese valor, se ignorará en gran medida.

Así que necesitábamos un sitio web que permitiera a la gente generar patrones. Makemypattern.com &mdash; posiblemente la mejor comparación de algo similar &mdash; se ejecuta en Drupal 7, y mi idea inicial era ejecutar el nuevo sitio en Drupal 8. Recorrí ese camino lo suficiente como para confiar en que podría hacerlo funcionar y conectarlo a nuestro backend. En ese momento cambié de marcha y centré mi atención en lo que ahora se conoce como núcleo de costura libre.

El núcleo tardó unos 7 meses en construirse, y muchas cosas han cambiado desde entonces. O quizás he cambiado, desde luego he aprendido mucho por el camino. En cualquier caso, he decidido hacer las cosas de otra manera.

## El problema con un CMS

No tengo ningún problema con Drupal, pero la idea de gestionar el sitio web de freesewing a través de cualquier Sistema de Gestión de Contenidos (CMS) no me atrae.

Una de las razones principales es que se almacena mucha información bajo una capa opaca de base de datos, lo que dificulta su gestión. Lo mismo ocurre con el contenido, donde las entradas, los metadatos, las imágenes, etc., están repartidos en tablas, ubicaciones y carpetas. Pero también está el tema que contiene un montón de cosas, están los módulos personalizados de Drupal para conectar con el backend, etc., etc.

> Quería ese mismo enfoque en un sitio web. Excepto que no puede ser estático porque tiene que, ya sabes, hacer cosas.

Cuando estábamos finalizando el núcleo, construí un sitio de documentación para él basado en [Jekyll](https://jekyllrb.com/). En comparación, me pareció un soplo de aire fresco. Sólo un puñado de archivos markdown, con algo de SASS, imágenes y algo de JavaScript, y todo se compila en un sitio web estático.

Es fácil de gestionar, y se integra perfectamente con un flujo de trabajo centrado en GitHub que resultará familiar a los posibles colaboradores.

Quería ese mismo enfoque en un sitio web. Excepto que no puede ser estático porque tiene que, ya sabes, hacer cosas.


## Un enfoque alternativo: JAMstack

Conocí JAMstack cuando empecé a buscar alojamiento para el sitio de documentación de dicho núcleo. Inicialmente se alojó en las páginas de GitHub, que proporciona alojamiento gratuito. También tienen SSL o un nombre de dominio personalizado, pero no puedes tener ambos. Lo cual era algo que rompía el trato.

Buscando alternativas, me topé con [Netlify](https://www.netlify.com/), que hace tanto SSL como dominios personalizados y tiene un nivel gratuito para proyectos de código abierto (gracias, chicos). Además, [este vídeo del director general de Netlify, Mathias Biilmann](https://vimeo.com/163522126) me entusiasmó mucho con JAMstack.

A menos que estés familiarizado con JAMstack, te sugiero que veas el vídeo, pero se reduce a esto:

 - **J** = JavaScript
 - **A** = APIs
 - **M** = Marca

La idea es que construyas tu sitio estático (marcado) que luego conviertas en interactivo con JavaScript que se conecte a una o varias API.

Así que, en nuestro caso, en lugar de tener un sitio de documentación sencillo con markdown fácil de editar y un CMS complejo que se encargue de las cosas delicadas, vamos a construir un sitio sencillo que se genere estáticamente, pero que utilice JavaScript y API para hacer las cosas inteligentes.

## Correr antes de poder andar

Debo admitir que en mi entusiasmo por adoptar este nuevo enfoque me adelanté un poco. De repente, ya no estaba construyendo un simple sitio web, sino que estaba hasta arriba de renderizado isomórfico, enrutamiento del lado del cliente, React y Redux, Node.js y transpilación ES6.

> Si no sabes lo que significa nada de eso, quizá te hagas una idea de la frustración que sentí mientras intentaba domar a todas estas nuevas bestias.
> 
> Si sabes lo que significa todo esto, ¿dónde estabas en abril cuando atravesé el valle del Reaccionar de la muerte?

El caso es que yo no soy desarrollador y me he metido en un buen lío. Aunque aprendía cosas nuevas cada día, no avanzaba mucho en la tarea que tenía entre manos, y me sentía frustrada por mi incapacidad para hacer incluso las cosas más mundanas.

Tras un mes de frustración, montones de pruebas y aparentemente aún más errores, tiré la toalla. Eff este nuevo y brillante JavaScript que usan todos los jóvenes, yo me quedo con lo que conozco.

Que es esencialmente lo básico de jQuery. En otras palabras, cosas que molaban hace 10 años.

## La mermelada de hace 10 años sigue siendo mermelada, ¿no?

Así que aquí estamos, freesewing.org es un sitio impulsado por el JAMstack. Y sabes qué, parece que hace lo que tiene que hacer.

Hacemos que Jekyll construya un sitio estático, y cuando lo empujamos a nuestra rama maestra, se despliega automáticamente en Netlify.

> Eff this newfangled shiny JavaScript all the young kids are using

Tenemos [una API de datos totalmente nueva](https://github.com/freesewing/data) construida sobre [el marco Slim](https://www.slimframework.com/). Maneja todos los datos del usuario. Cosas como cuentas, medidas, modelos y borradores, pero también comentarios en este sitio web, etc.

También habla con el núcleo por nosotros, y cada vez que redacta un patrón, no sólo te damos el patrón, sino que también realizamos una comparación de tu patrón con una serie de tallas estándar, lo que está muy bien.

Y tenemos otras cosas geniales, como la posibilidad de bifurcar o rehacer un borrador existente.

## Este es un punto de partida

Espero que la experiencia de usuario/interfaz no sea un obstáculo para la gente. Me he esforzado mucho para que el proceso de redacción sea lo más intuitivo posible y creo que, en comparación con nuestra demo (o con la interfaz de makemypattern, para el caso), es una gran mejora.

Por otra parte, seguro que hay cosas que se rompen a la izquierda o a la derecha, o que a algunos de vosotros no os gustan los colores o lo que sea.

La cuestión es que me propuse construir algo que pudiera sustituir a makemypattern.com para poder deciros a todos _Oye, ven a jugar con esto nuevo_.

Creo que, aunque sólo sea eso, ahora puedo hacerlo. Y si ves que se puede mejorar, por favor [únete al esfuerzo](/contribute), sólo estamos empezando.



<small>PD: Para los que os preguntéis por el título de este post:</small>

<YouTube id='oFRbZJXjWIA' />


