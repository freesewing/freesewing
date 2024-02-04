---
title: '¿Por qué tengo que volver a hacer clic para confirmar que quiero suscribirme después de haber hecho clic en el enlace de confirmación que me enviasteis?'
---

Hay dos aspectos que hacen que la suscripción a nuestro boletín requiera varios clics:

- [Las personas sólo deberían poder inscribirse ellas mismas](#people-should-only-be-able-to-sign-up-themselves)
- [Las peticiones GET no deben hacer cambios](#get-requests-should-not-make-changes)

## Las personas sólo deberían poder inscribirse ellas mismas

Éste es bastante fácil de entender. One should not be able to subscribe somebody else's email address to the FreeSewing newsletter.

This is why, after indicating you want to sign up, we sent you a confirmation email to the email address you provided. If you receive this email, it confirms not only that the email address is working, but also that you have access to it.

In other words, only after you click the link in the confirmation email can we know for certain that:

- La dirección de correo electrónico es válida
- El propietario de la dirección de correo electrónico desea suscribirse

Ahí se acabaría todo. Excepto por un detalle técnico que también es importante:

## Las peticiones GET no deben hacer cambios

<Warning compact>Esto es más técnico y más difícil de entender</Warning>

Another reason is that while we could make it so that clicking the link in your email would immediately subscribe you, it would be in violation of internet standards. ____ En concreto, la definición del método GET __del protocolo HTTP__ que establece que:


<Note>
<h5>Las peticiones GET sólo deben recuperar datos y no deben tener ningún otro efecto.</h5>

[wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages)
</Note>

Una solicitud GET __ es lo que ocurre cuando sigues un enlace. Merely following a link should not make any changes (like subscribing you to a newsletter).

For example, when you receive an email, your email client may _preload_ the links in it in the background. So that they are quicker to load should you click on them.

Obviamente, esta precarga no debe confirmar tu suscripción. Which is why you need to click a button to confirm. Because that will trigger a __POST request__ and those can make changes.

<Tip>

##### Esto no se aplica a los usuarios que se suscriban a través de su cuenta

Nada de esto se aplica a los usuarios que se suscriban a nuestro boletín habilitando la opción
en nuestra cuenta.  En este caso, no necesitamos pasar por el proceso de validación del correo electrónico
, puesto que ya lo hicimos cuando te registraste. 

Para los usuarios, suscribirse (y darse de baja) es instantáneo (si tienes curiosidad, 
utilizamos una __PUT request__ idempotente bajo el capó).
</Tip>


