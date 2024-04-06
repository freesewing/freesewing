---
title: Abrir la API del backend de FreeSewing
caption: Teclado de ordenador de latón ornamentado vintage en negro, por PixaBay
date: 20231103
intro: La API backend de FreeSewing ahora admite claves API para que también puedas interactuar con ella
author: 1
---

Bloquear a la gente de tu API parece ser lo que está de moda hoy en día. Con sitios como Twitter -no, X- y Reddit bloqueando el acceso a la API o cobrando por ello.

Yo he hecho exactamente lo contrario, y como parte del despliegue del nuevo FreeSewing.org he construido un nuevo backend que está abierto a ser utilizado por cualquiera.

El backend admite la autenticación mediante claves API, y puedes generar esas claves aquí mismo, en la configuración de tu cuenta. Puedes generar tantos como quieras, y establecer su caducidad, así como configurar su nivel de acceso.

## ¿Cuál es la cuestión?

Buena pregunta. En primer lugar, creo que es lo correcto. Pero lo que es más importante, creo que si vas a poner todas esas medidas en FreeSewing, tal vez quieras utilizarlas en otro sitio, ¿no? Así que quería facilitarlo.

Supongo que, al menos al principio, será una función muy especializada. Sin embargo, tengo la esperanza de que otras personas que trabajan en el ámbito del diseño paramétrico y los patrones de costura a medida (o incluso simplemente personas que buscan medidas) lleguen a apreciar esto y, con suerte, lo integren en sus propios guiones o herramientas.

Por lo menos, sé que lo haré.

La [documentación de referencia de la API REST vive aquí](https://freesewing.dev/reference/backend), si buscas la Especificación OpenAPI, entonces ve a https://backend3.freesewing.org/docs/

## Usa, no abuses

Nuestra API backend se ejecuta en un entorno de nube y, aunque no cobro por el acceso a la API, tengo que pagar las facturas de dicho proveedor de nube.

Por ello, te rogamos que seas consciente de la cantidad de solicitudes que generas. Y si tienes grandes planes, por favor, ponte en contacto conmigo para discutirlos primero.

Supervisaré el uso de nuestra API backend y en cualquier momento podremos decidir revocar las claves API si considero que el uso va más allá de lo que puedo o quiero soportar.
Se controlará el uso del backend y puede que intervenga
