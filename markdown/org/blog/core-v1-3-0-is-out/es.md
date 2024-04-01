---
author: 1
caption: "Básculas, ¿cómo funcionan?"
date: "2018-01-04"
intro: "Ya está disponible el núcleo de Freesewing v1.3.0; viene con correcciones tan buenas que las hemos retroportado a todos tus borradores"
title: "Ya está disponible el núcleo de Freesewing v1.3.0; viene con correcciones tan buenas que las hemos retroportado a todos tus borradores"
---

El último día de 2017, en nuestro [resumen mensual de todas las noticias de freesewing](/blog/roundup-2017-12/) , escribimos sobre el inminente problema de los borradores escalados incorrectamente, también conocido como [Core issue #204 - The Inkscape default units quandary](https://github.com/freesewing/core/issues/204).

No volveré sobre [todo eso](/blog/roundup-2017-12/) otra vez, pero se reduce al hecho de que los [mantenedores de Inkscape](http://inkscape.org/) han cambiado el DPI (puntos por pulgada) interno de Inkscape de 90 a 96. Un cambio que entra en vigor a partir de la versión 0.92.

Si se deja sin marcar, este cambio provocaría que todos los patrones de cosido libre se escalaran incorrectamente. Eso es porque asumimos 90DPI en nuestra salida SVG, y escalamos en consecuencia.

![Ese momento "oh-mierda" en el que nos dimos cuenta de todo el impacto del cambio de PPP](https://posts.freesewing.org/uploads/oh_shit_90b4969a5d.gif)

Cuando entre en vigor el cambio a 96DPI, todos los patrones se desviarán un 6,66%. Lo cual es realmente el tipo de diferencia que es demasiado pequeña para notarla al echar un vistazo a un patrón, pero lo suficientemente grande como para estropear por completo tu prenda.

La cuestión también es más problemática de lo que parece a primera vista. En primer lugar, porque no podemos simplemente cambiar a 96DPI, ya que ahora hay dos versiones en que utilizan un DPI predeterminado diferente bajo el capó. Necesitamos una solución que funcione para ambos.

![Captura de pantalla de un patrón de costura libre que está escalado incorrectamente en la última versión de Inkscape](https://posts.freesewing.org/uploads/inkscape_b96e2bb510.png)

Además, aunque cualquier corrección que realicemos se aplicaría a los nuevos borradores, todos los borradores existentes generados antes de la corrección seguirían viéndose afectados.

En otras palabras, si redactaste un patrón la semana pasada, o hace un mes, ese patrón no escalaría correctamente en una versión reciente de Inkscape.  
Y como utilizamos Inkscape en nuestra cadena de herramientas de SVG a PDF, también se escalaría incorrectamente si vinieras aquí y descargaras un PDF.

Estaba claro que había que hacer algo. Y rápido.

## La solución para los nuevos borradores

A partir de la versión de hoy del núcleo v1.3.0, nuestros archivos SVG ya no dependen de ningún ajuste de PPP.

En lugar de utilizar las unidades internas y aplicar una transformación SVG para escalar todo el patrón , hemos atornillado las unidades a mm y actualizado la viewBox SVG para aplicar el escalado.

Evidentemente, así es como deberíamos haberlo hecho desde el principio. Todos los días son lectivos.

Si te preocupa el uso de mm en tu borrador (porque estás acostumbrado a las unidades imperiales ), ten por seguro que esos mm permanecerán bajo el capó. No notarás la diferencia.

## La solución para los borradores preexistentes

Para evitar problemas con los borradores preexistentes, también teníamos que encontrar una solución para ellos.

Esencialmente tenemos dos opciones:

 - Vuelve a redactar todos esos borradores
 - Parchéalos in situ sin cambiar el propio borrador

Volver a redactar soluciona el problema, ya que cada nuevo borrador se gestionará con la última versión del núcleo , que sí incluye la corrección.

Sin embargo, el núcleo también incluye actualizaciones periódicas, ajustes y correcciones en los propios patrones. Así que al volver a redactar un borrador generado en una versión anterior de core, no hay garantía de que el borrador de no cambie.

En principio, ese cambio siempre sería una mejora. Pero el error de una persona es la característica de otra, y preferimos no [mover tu queso](https://en.wikipedia.org/wiki/Who_Moved_My_Cheese%3F).

![No toques mis cosas](https://posts.freesewing.org/uploads/who_moved_my_cheese_0cd51a25d6.jpg)

Así que, en su lugar, decidimos parchear todos los borradores que tenemos archivados con el nuevo código de escalado, sin tocar ningún otro aspecto del borrador.

Mientras lees esto, ya se ha hecho, y ahora todos los borradores de libre elección deberían escalarse correctamente. En todas partes.

## También: conocimiento de la versión

También hemos realizado cambios en nuestros sistemas backend para almacenar la versión del núcleo de freesewing que generó tu borrador.

Si desde que generaste tu borrador hemos puesto en marcha nuevas funciones o correcciones, se te notificará que hay una actualización disponible:

![Si tu borrador se genera con una versión antigua del núcleo de freesewing, te lo indicaremos](https://posts.freesewing.org/uploads/upgrade_dee342e3fb.png)

Actualizar o no tu borrador depende de ti. Si no quieres perder la información de tu antiguo borrador de ** , en lugar de actualizarlo in situ, puedes bifurcarlo.








