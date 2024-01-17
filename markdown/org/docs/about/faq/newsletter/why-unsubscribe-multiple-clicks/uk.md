---
title: Why do I have to click again to confirm I want to unsubscribe from the newsletter?
---

While we could make it so that clicking the link in your email would immeadiatly unsubcribe you, it would be in violation of internet standards. Зокрема, визначення __запиту GET__ протоколу __HTTP__, в якому вказується, що:


<Note>
<h5>Запити GET мають лише отримувати дані й не повинні виконувати будь-які інші дії (переклад з англійської).</h5>

[wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages](https://en.wikipedia.org/wiki/HTTP#HTTP/1.1_request_messages)
</Note>

_GET-запит_ — це те, що відбувається, коли Ви переходите за покликанням. Merely following a link should not make any changes (like unsubscribing you from a newsletter).

Наприклад: якщо Ви отримуєте листа, Ваш поштовий клієнт може _попередньо завантажити_ покликання на тлі. Це збільшує швидкість завантаження, коли Ви натиснете на це покликання.

Obviously, this preloading should not unsubscribe you. Саме тому Вам потрібно натиснути окрему кнопку для підтвердження. Це пустить в дію __запит POST__, який може вносити зміни.

<Tip>

##### This does not apply to users unsubscribing through their account

None of this applies to users who unsubscribe from our newsletter by disabling the
option in their account. In this case, you are already clicking a button, rather
than a link in your email.

If you are curious, we use an idempotent __PUT request__ under the hood.
</Tip>


