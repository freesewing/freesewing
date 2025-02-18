---
author: "joostdecock"
caption: "Tu fondo de conexión para febrero"
date: "2019-01-31"
intro: "¿Realmente estamos a finales de enero? ¿Ya?"
title: "Resumen mensual - Enero 2019: La gran actualización beta"
---


¿Realmente estamos a finales de enero? ¿Ya?

Después de aprovechar las vacaciones de Navidad para portar [Simon](/en/patterns/simon) - no es exactamente el más trivial de los patrones - estoy bastante seguro de que todos los patrones estarán bien. Simón tiene 61 opciones, así que si funciona para Simón, funcionará para todos los patrones, o al menos así lo veo yo.

Ya se han portado siete modelos. Puede que no parezca gran cosa, pero resulta bastante tedioso cada vez que hacemos un cambio que afecta a los patrones, ya que luego tenemos 7 que actualizar. Así que he decidido aparcar la portabilidad de patrones durante un tiempo, y en su lugar centrar mi atención en [nuestro nuevo sitio web beta](/en/).

## Gatsby es ahora nuestro generador de sitios estáticos

El nuevo sitio web está construido sobre [Gatsby](https://www.gatsbyjs.org/), un generador de sitios estáticos escrito en JavaScript y potenciado por [React](https://reactjs.org/). Hemos estado bastante comprometidos con [la arquitectura JAMstack](/en/blog/freesewing-goes-jamstack) aquí en freesewing.org.

Es nuestra tercera reescritura del sitio desde que lanzamos freesewing.org y admito que eso es un poco demasiado. Es decir, espero de verdad que el sitio que estamos construyendo ahora siga existiendo durante un tiempo.

Por otra parte, las iteraciones rápidas son algo bueno, sobre todo porque todavía estábamos buscando nuestros pies. Hacemos lo necesario para hacerlo bien, y aunque la pregunta de *cuál es el propósito de todo esto* quizás esté en la mente de algunos de vosotros, siento como si beta.freesewing.org hubiera llegado al punto de responder a esa pregunta.

## ahora (casi) todo ocurre en tu navegador

Reescribimos nuestra plataforma en JavaScript. Esa cosa que se ejecuta en tu navegador. Antes, cuando querías cambiar el estilo de tus puños o algo así, necesitábamos que enviara tus deseos a un backend, que luego generaba un borrador y lo enviaba de vuelta.

Ahora, cuando ajustas una opción, no necesitamos un viaje de ida y vuelta a un backend para mostrarte cómo quedan las cosas. Porque todo se ejecuta en tu navegador. Así, si cambias algo, se actualiza allí mismo, en tu pantalla.

Eso es más o menos lo que teníamos en mente desde el principio, pero sigue siendo un momento poderoso cuando todas las piezas empiezan por fin a encajar y las cosas funcionan de verdad.

Dicho esto, todavía no todo funciona en el navegador. Concretamente, convertir tus patrones de en PDF es algo de lo que nos encargamos en el backend, ya que todavía estamos trabajando en esa parte.

## No se necesita cuenta

Nuestra nueva demo [](https://beta.freesewing.org/en/demo) te permite probar los neumáticos sin la necesidad de inscribirte. Al registrarte, no es necesario crear una cuenta con contraseña, ya que ahora admite el registro con tu cuenta existente de Google o GitHub.

Las personas que ya tengan una cuenta podrán iniciar sesión con su cuenta de Google o GitHub, siempre que la dirección de correo electrónico de su cuenta de freesewing coincida.

## Puedes cambiarlo todo

Hemos introducido muchos cambios para intentar que a los desarrolladores les resulte más fácil empezar a utilizar freesewing. Pero también hemos hecho cambios para las personas que contribuyen de otras formas.

Todo nuestro contenido (markdown) puede editarse ahora en el sitio. No necesitas una cuenta de GitHub, , sólo tienes que hacer clic en el pequeño icono del lápiz junto al título, enviar tus cambios y listo.

Las mismas buenas noticias para los traductores. Todas las traducciones también se pueden editar en línea. Hemos actualizado también nuestra documentación para traductores y editores para reflejar este nuevo flujo de trabajo simplificado.

## Diseños personalizados

El inicio de sesión/registro con cuentas de GitHub/Google era una función solicitada por los usuarios, y ésta también lo es: Ahora admitimos la creación de un diseño personalizado para tu patrón. Así es como funciona:

Cuando se dibuja un patrón, las distintas partes del patrón se colocan automáticamente en él. A menudo eso está muy bien, pero a veces desearías poder hacer algunos cambios. Por ejemplo, puede que quieras que impriman tu patrón en una copistería, por lo que debes asegurarte en de que cabe en el ancho de su rollo de papel. O quieres ahorrarte algo de papel apretando algunas piezas.

Está en fase beta temprana (es decir, todavía se rompe de vez en cuando), pero ahora puedes cambiar la anchura de tu patrón, mover las partes de tu patrón, girarlas o incluso reflejarlas verticalmente u horizontalmente para adaptarlas a tus planes. Todo eso se puede hacer en tu navegador, en el sitio.

## Documentación para desarrolladores

También hemos integrado nuestra documentación para desarrolladores en el nuevo sitio. Hasta ayer, la documentación sobre la nueva plataforma estaba alojada en un sitio separado, , pero ahora, hemos portado la documentación y todo está integrado en nuestro (futuro) sitio web.

## No migraremos tus borradores

Es hora de hablar de las cosas que no haremos: No migraremos tus borradores existentes. La nueva plataforma es demasiado diferente. No hay forma de que podamos migrar tus borradores existentes de forma que tenga sentido. Así, cuando llegue el día en que cambiemos al nuevo sitio, tus borradores ya no estarán allí.

Puedes descargar todos tus datos de nuestro sitio, pero si no lo haces tú mismo, tus borradores v1 desaparecerán.

## No hay más comentarios

He decidido no implementar la función de comentarios porque creo que tenerlos en crea expectativas equivocadas.

Freesewing no es otro [Pattern Review](https://sewing.patternreview.com/), o [Thread and Needles](https://www.threadandneedles.org/), o [The Fold Line](https://thefoldline.com/), o [Textillia](https://www.textillia.com/), o [Kollabora](http://www.kollabora.com/), o cualquiera que sea el *Raverly de costura* du jour.

No quiero que freesewing.org compita con estos sitios web. Ellos hacen lo suyo, nosotros hacemos lo nuestro. Su propuesta de valor es la comunidad, la nuestra no. Eso no significa que nuestra comunidad no sea valiosa. Sólo significa que no necesitamos que nuestra comunidad se reúna en nuestro sitio web. Nuestra comunidad existe dondequiera que vaya . Ya sea Twitter, Instagram, Reddit, blogs o alguna red social de la que nunca he siquiera oído hablar. No importa, todo está bien.

Construir una comunidad en la web lleva tiempo, esfuerzo y trabajo. Y sencillamente no tenemos ancho de banda para ello. Así que prefiero que nos centremos en [nuestra misión principal](/en/docs/faq/#whats-your-end-game), y dejemos que la gente hable sobre la libre circulación dondequiera que hablen de las cosas.

## ¿Alguien quiere ir a París?

He mencionado que me gustaría hacer algún tipo de reunión este año, y aunque realmente no he tenido tiempo de elaborar lo que eso significaría, puede que acabemos reuniéndonos de todos modos.

En concreto, [Charlotte](https://englishgirlathome.com/) (alias chica inglesa en casa) y [Carmen](https://www.carmencitab.com/) (alias CarmencitaB) están organizando el encuentro [París Sewcial](https://englishgirlathome.com/2019/01/23/paris-sewcial-paris-coud-2019-registration-open/) en mayo. Iré a París para participar en ello, así que si tú también vas a , nos encontraremos allí.

La inscripción es [por aquí](https://www.eventbrite.co.uk/e/paris-sewcial-paris-coud-registration-54520802187). 


