---
author: "joostdecock"
caption: "Fotografía de <a href='https://pixabay.com/en/users/herbert2512-2929941/' target='_BLANK' rel='nofollow'>Herbert</a>"
date: "2017-06-16"
intro: "La World Wide Web está erosionando cada vez más tu privacidad. Facebook, Google y una avalancha de redes publicitarias están vigilando las pestañas de tu navegador. Rastrearte en Internet, vigilar los sitios que visitas, para poder recopilar más información sobre ti y venderla a los anunciantes."
title: "Las decisiones que he tomado para proteger tu privacidad. O por qué no recibirás ninguna galleta."
---

La World Wide Web está erosionando cada vez más tu privacidad. Facebook, Google y una avalancha de redes publicitarias están vigilando las pestañas de tu navegador. Rastrearte en Internet, vigilar los sitios que visitas, para poder recopilar más información sobre ti y venderla a los anunciantes.

Perdona mi francés, pero odio esa mierda.

> Facebook, Google y una avalancha de redes publicitarias están vigilando las pestañas de tu navegador

Construir este sitio desde cero ha sido una gran oportunidad para reflexionar sobre cómo hacer las cosas.

Para asegurarme de que no contribuyo al problema, he tomado las siguientes decisiones:

## Cifrado en todas partes

Pasemos todo por https. Eso es sólo [sentido común](https://letsencrypt.org/) en 2017.

## Sin anuncios

Esta es otra obviedad. La plaga número 1 del rastreo online son las redes publicitarias, y no quiero que se acerquen a este sitio.

Afortunadamente, eso no plantea ningún problema, dado que no jugamos con las reglas de la web _Da algo gratis, luego vende los datos de la gente_ .

## Sin código externo

Este sitio no carga código JavaScript externo. Ninguna. Lo que significa que tuve que replantearme algunas cosas que normalmente requieren código externo.

No hay botón Me gusta de Facebook ni integración con Twitter. Seguimos compartiendo en las redes sociales en las entradas de nuestro blog (pista pista), pero es la variedad de HTML sencillo que impide el seguimiento.

En la misma categoría, no hay inicios de sesión sociales. Seguro que el botón _Iniciar sesión con Facebook_ es práctico, pero también una pesadilla si tienes en cuenta lo que afecta a tu privacidad.

Para un sitio generado estáticamente como éste ([consulta este post sobre JAMstack para más detalles](/blog/freesewing-goes-jamstack/)) [Disqus](https://disqus.com/) es prácticamente el estándar de facto para los comentarios. Pero Disqus es bastante horrible cuando se trata de rastrear, así que eso fue un gran no-no para mí.

Una historia similar para la autenticación, donde consideré [Auth0](https://auth0.com/). También en este caso me preocupaba el seguimiento, así que decidí no hacerlo.

Al final me he mordido la bala y he implementado yo mismo la autenticación y los comentarios. El tiempo dirá si fue un buen intercambio.

## Sin galletas
No utilizamos cookies. Evidentemente, no cookies de terceros, pero tampoco cookies propias.

En su lugar, utilizamos el almacenamiento local, que es mejor porque, a diferencia de las cookies, no envía tu información en cada solicitud.

## Sin análisis
He ejecutado [Google Analytics](https://analytics.google.com/) en [makemypattern](https://makemypattern.com/). Es potente, pero obviamente una pesadilla de seguimiento. Así que tampoco iba a tener eso.

Esta cuestión se complica aún más por el hecho de que este sitio estático está alojado en [Netlify](https://www.netlify.com/). Así que no tengo registros del servidor y no puedo ejecutar ningún análisis del lado del servidor.

En su mayor parte, decidí prescindir de los análisis. No necesito saber cuántas personas visitan este sitio. Sigo sabiendo cuántas cuentas de usuario se crean y cuántos patrones se generan, que deberían ser buenos indicadores del bienestar general del sitio.

Pero hay una cosa que quería mantener alejada de la analítica: los registros de referencias. Es uno de los pequeños placeres de la vida repasar esa lista y descubrir [alguien](https://www.reddit.com/r/freepatterns/comments/4zh5nr/is_there_software_to_generate_sewing_patterns/) [vinculado](http://www.makery.uk/2016/08/the-refashioners-2016-joost/) [a](https://closetcasepatterns.com/week-sewing-blogs-vol-98/) [tú](https://opensource.com/life/16/11/free-open-sewing-patterns).

También en este caso he aplicado mi propia solución básica. Si llegas a este sitio desde un enlace externo, informaremos de esa referencia a nuestra propia API. Lo que significa que seguimos recibiendo la información de referencia, pero sin seguimiento.

Tal vez sea sólo vanidad, pero cuando tengo un mal día, esos registros de referencias me hacen sentir mejor (cuando no se trata sólo de spam ruso de referencias). Puede que me equivoque en esto, pero apostaría a que mucha gente que tiene su propio blog puede sentirse identificada con eso.

