---
author: "joostdecock"
caption: "Tu nuevo fondo de inicio de sesión para el mes de febrero"
date: "2018-01-31"
intro: "Este es tu resumen mensual de las noticias de libre circulación de las últimas cuatro semanas, y una mirada a lo que nos espera el mes que viene."
title: "Resumen mensual - Enero de 2018: Inkscape DPI, conocimiento de la versión, Bail y Carlita"
---

Este es tu resumen mensual de las noticias de libre circulación de las últimas cuatro semanas, y una mirada a lo que nos espera el mes que viene.

## Echando la vista atrás a enero
![Más como este mes](https://posts.freesewing.org/uploads/coffee_3f501d4076.gif)

Puede que sea [el tiempo deprimente que ha batido récords en mi región ](https://www.theguardian.com/world/2018/jan/19/aint-no-sunshine-winter-darkest-europe), pero siento que enero me ha afectado mucho. Así que veamos si tenemos al menos algo que mostrar en .

### El dilema de las unidades por defecto de Inkscape

A principios de año, lanzamos la versión 1.3.0 del núcleo para resolver el problema nº 204 de [](https://github.com/freesewing/core/issues/204) , también conocido como el dilema de las unidades por defecto de Inkscape.

Fue un arreglo un poco inusual porque nos vimos obligados a hacerlo debido a los cambios realizados por los desarrolladores de Inkscape. Además, no sólo tuvimos que adaptar nuestro código, sino que también tuvimos que retroportar los cambios a todos tus borradores existentes.

Si no estabas al tanto de todo, hemos escrito una entrada en el blog sobre ello: [Freesewing core v1.3.0 is out; Comes with fixes so good that we back-ported them to all your drafts](https://joost.freesewing.org/blog/core-v1.3.0-is-out/).

### Conocimiento de la versión

Ahora hacemos un seguimiento de qué versión de Core generó tu borrador. Lanzamos correcciones y mejoras continuamente. Por tanto, los borradores que tengas almacenados en tu perfil pueden estar obsoletos.

Ahora se te informa de ello, tanto en la propia página del borrador como en tu lista de borradores. Un simple cambio de redacción los actualizará a la última versión.

> ##### Visión a largo plazo del versionado
> 
> Esta solución es un paso adelante respecto a la situación anterior, pero no permite un control de versiones muy granular. Si tienes 10 borradores diferentes de Simon almacenados en tu perfil, y nosotros aumentamos el número de versión del núcleo porque hemos hecho un ajuste en Carlton, todos tus borradores se marcan como obsoletos, aunque los cambios no les afecten.
> 
> Con un único número de versión del núcleo del que depender, no hay una forma obvia de llevar un registro de qué cambios afectan a qué patrón.
> 
> El plan a largo plazo es tener un número de versión del núcleo y un número de versión del patrón. De este modo, un golpe de versión en un patrón no afectará a otros patrones. 
> 
> Un salto de versión en el núcleo seguirá afectando a todos los patrones, pero debería haber muchas menos versiones del núcleo una vez que saquemos todos los patrones del núcleo.
> 
> La idea es que cada patrón esté en su propio repositorio, y utilizaremos Composer para gestionarlos como dependencias. 
> 
> Pero ésta es una idea a largo plazo que no se pondrá en práctica hasta después de que reescribamos el núcleo. Sí, es otra idea a largo plazo.

### Fianza para el tratamiento de errores

En la primera mitad del mes, probamos Rollbar para la gestión de errores y la elaboración de informes. Aunque nos gustó la funcionalidad que proporcionaba, no nos gustó demasiado el posible impacto que podría tener en tu privacidad el envío de ese tipo de datos a un tercero.

Así que decidimos escribir nuestra propia barra antivuelco para pobres, llamada Bail. Bail se utiliza ahora en nuestros datos y backends centrales, de modo que cuando las cosas se rompen, lo sabemos.

Este esfuerzo también condujo a una búsqueda paralela de 2 semanas para escribir pruebas para nuestro backend de datos. Todos los detalles: [Presentamos la libertad bajo fianza: La barra antivuelco de los pobres, porque la privacidad](/blog/introducing-bail/)

### Carlita está aquí

Hace un par de días, lanzamos el [Abrigo Carlita](/patterns/carlita), la versión para mujer de nuestro abrigo Carlton.

Si te apresuraste a hacerte con Carlita, es bueno que sepas que se publicó como parte del núcleo v1.6.0 y que ahora estamos en la v1.6.3, y que se debe sobre todo a correcciones y ajustes en Carlton/Carlita.

Si tienes una versión anterior del patrón, vuelve a redactarlo. Si ya lo has imprimido en , quizás puedas echar un vistazo a [el registro de cambios](https://github.com/freesewing/core/blob/develop/CHANGELOG.md) para averiguar qué ha cambiado.

Si compruebas el registro de cambios, también verás que empezamos el mes con el núcleo v1.2.9 y está ejecutando ahora el núcleo v1.6.3, así que no creo que sea sólo una idea que haya sido un mes ajetreado.

## De cara a febrero

Febrero es un mes corto, así que probablemente sea mejor gestionar las expectativas. Pero aquí tienes lo que tengo pensado para ello:

### Documentación Carlton/Carlita

Francamente, esto es como arrancarme los dientes, así que no esperes que esté terminado para finales de febrero en , pero al menos debería haber avanzado algo en la documentación de para los patrones Carlton y Carlita.

En una nota relacionada, la creciente popularidad de este sitio significa que estoy mucho más ocupado con varias preguntas, y pequeñas cuestiones que necesitan mi atención.

Toda esa retroalimentación es algo bueno porque así es como mejoramos las cosas por aquí. Pero me doy cuenta de que cada vez me resulta más difícil dedicar una gran cantidad de tiempo a una cosa concreta. Que es realmente lo que necesitas cuando te enfrentas a tareas de mayor envergadura, como escribir documentación o diseñar nuevos patrones.

En realidad no tengo una solución para eso, sólo hago la observación.

### Tal vez un lanzamiento de Blake Blazer

Tengo un patrón de chaqueta en mi mesa de dibujo que lleva ahí desde el verano (se llama Blake Blazer). Realmente debería sacar algo de tiempo para envolverlo y publicarlo, pero me he resistido a hacerlo porque parece que no encuentro el momento de hacer realmente la chaqueta.

He utilizado el patrón antes para [mis refashioners hacen este año](/blog/the-refashioners-2017/), pero eso no es exactamente un ejemplo muy representativo.

No creo que encuentre tiempo para hacer una chaqueta en febrero, pero quizá una muselina sea suficiente para publicarla en beta.

### FOSDEM

![Todos los detalles en fosdem.org](https://posts.freesewing.org/uploads/fosdem_bb321397cc.png)

[FOSDEM](http://fosdem.org/) --- el Encuentro Europeo de Desarrolladores de Software Libre y de Código Abierto --- se celebra el primer fin de semana de febrero en Bruselas.

Tengo previsto estar allí el domingo, así que si tú también vas a asistir, avísame o ven a saludarme.

