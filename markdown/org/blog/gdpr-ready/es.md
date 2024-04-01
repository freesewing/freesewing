---
author: 1
caption: "El cambio más importante es, obviamente, que hemos pasado del morado al negro como color distintivo."
date: "2018-05-24"
intro: "Bienvenido a nuestro nuevo sitio web. Cumple la normativa GDPR, habla 3 idiomas y huele a pintura húmeda"
title: "Bienvenido a nuestro nuevo sitio web. Cumple la normativa GDPR, habla 3 idiomas y huele a pintura húmeda"
---


Mañana, 25 de mayo, entra en vigor el Reglamento General de Protección de Datos (RGPD) de la Unión Europea (UE). A partir de ese día, las empresas que no respeten la privacidad de los ciudadanos de la UE se exponen a multas de hasta el 4% de su facturación anual global.

La fecha marca nada menos que un momento decisivo para la privacidad en línea, , ya que las leyes de protección de datos más estrictas del mundo se aplican de repente a 500 millones de personas.

## Ahora se requiere tu consentimiento

Para freesewing, el despliegue del GDPR no plantea un problema como tal. No sólo teníamos un plan sólido, sino que lo único que teníamos que añadir absolutamente al sitio era *consent*. Ya no podemos procesar tus datos sin tu permiso. Permiso que debemos pedir de forma explícita y granular.

Por tanto, tenemos dos tipos de preguntas que hacerte:

 - ¿Das tu consentimiento para procesar los datos de tu perfil?
 - ¿Usted da su consentimiento para procesar los datos de su modelo?

Hacemos la distinción porque son cosas distintas. Se requiere un perfil/cuenta para acceder al sitio, publicar comentarios, etc.  
Los datos del modelo son necesarios para generar patrones de costura a medida.

Te aparecerán estas preguntas cuando sean relevantes (es decir, cuando necesitemos acceder a esos datos concretos), y podrás volver a consultarlas en cualquier momento [en la configuración de tu cuenta](/account).

## Es nuestro deber informarte

Según el GDPR, debemos informarte sobre cómo gestionamos las cuestiones de privacidad. Ya hemos escrito antes sobre [nuestro enfoque de la privacidad](/blog/privacy-choices) , pero esto requiere algo (un poco) más formal.

Así que hemos redactado un aviso de privacidad [](/privacy) que resume todas estas cosas.

Además de nuestro aviso de privacidad, hemos creado [una página que enumera todos tus derechos](/rights), y explica cómo puedes ejercerlos.

Con estos cambios, hemos cubierto tu derecho a estar informado.

## Privacidad por diseño

Uno de los requisitos más imprecisos pero impactantes del GDPR es el denominado *privacy-by-design*. Nos tomamos muy en serio el consejo y hemos hecho dos cambios inspirados en él:

 - Cifrado de datos en reposo
 - Baja de cuentas inactivas

Ahora encriptamos los datos de tu perfil en reposo. En otras palabras, nuestra base de datos contiene tu información, pero está encriptada. Sólo lo desencriptamos cuando lo necesitamos.

También cancelaremos las cuentas que lleven inactivas 12 meses. En otras palabras, si no inicias sesión en el sitio web durante 1 año, se eliminará tu cuenta y todos tus datos.

Sin embargo, para este último asunto, habrá un pequeño periodo de gracia, ya que aún no hemos implementado completamente todos los cambios necesarios. Lo que me lleva al siguiente punto:

## También nuevo: todo lo demás

Estos cambios relacionados con el GDPR nos parecieron una buena oportunidad para revisar algunas de las decisiones que habíamos tomado y ver si había margen de mejora. De todas formas, esa era la idea inicial. Al final, reescribimos completamente el sitio web desde cero.

Nuestro sitio web anterior utilizaba [Jekyll](https://jekyllrb.com/) como generador de sitios estáticos, con un montón de código javascript para hacer añadir los elementos dinámicos al sitio. Aunque eso funcionó, hubo dos inconvenientes importantes:

 - Jekyll utiliza el lenguaje de programación Ruby. Eso es otro lenguaje de programación, otro gestor de paquetes y otro ecosistema en el que los posibles colaboradores tienen que meterse en la cabeza. Queríamos evitarlo.
 - Ese *montón* de código JavaScript era más bien literal. La capacidad de mantenimiento empezaba a ser un problema, por no mencionar que a los nuevos desarrolladores les resultaría difícil incorporarse y entender lo que estaba pasando.

Así que, para matar dos pájaros de un tiro, reescribimos todo el sitio utilizando [Vue.js](https://vuejs.org/) y [Nuxt](https://nuxtjs.org/). Ahora todo nuestro frontend está escrito en JavaScript -ya no hace falta Ruby- y, gracias a la naturaleza modular de Vue y a su enfoque basado en componentes, debería ser mucho más fácil de mantener.

## Internacionalización, también conocida como i18n

Obviamente, al reescribir las cosas, hemos añadido un par de funciones nuevas. La más obvia es que ahora somos totalmente compatibles con i18n (internacionalización).

Aunque la traducción es un esfuerzo continuo, tenemos todo lo necesario para apoyarla. A partir de hoy, freesewing ya no está disponible exclusivamente en inglés, sino también en neerlandés y español.

Me gustaría dar las gracias a [@AnnekeCaramin](/users/annekecaramin) y [@AlfaLyr](/users/alfalyr), nuestros coordinadores lingüísticos para neerlandés y español respectivamente, pero también a todas las demás personas que han ayudado con la traducción.

Una visión general del estado de las diferentes lenguas está disponible [aquí](/i18n), y espero que pronto podamos habilitar más lenguas.

## Cuidado con la pintura húmeda

Podría decirse que este lanzamiento es un poco prematuro. Aún tenemos [un par de problemas abiertos para solucionar](https://github.com/freesewing/site/issues), y nos falta un montón de documentación.

Sin embargo, como nuestro plazo viene impuesto desde fuera, no tenemos muchas opciones al respecto. Es decir, si queremos cumplir plenamente el GDPR, y lo hacemos.

Así que, por favor, ten paciencia con nosotros mientras seguimos construyendo este sitio web y nuestra plataforma. Y no dudes en avisarnos cuando algo vaya mal.

