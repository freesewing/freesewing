---
title: Розмір припуску на шов
---

Цей [основний параметр][core-settings] контролює базовий розмір шва припуску.  Іншими словами, припуск на шов за замовчуванням буде такого розміру. Інші припуски , які мають бути ширшими, наприклад, припуски на підгин, повинні бути кратні цього розміру.

<Note>

Основна бібліотека FreeSewing потребує лише одного параметра для обробки припусків на шви: `sa`.
However, for convenience, we've split this up into two different settings on the website:

- **[Include Seam Allowance](/docs/about/site/draft/core-settings/sabool)**: Controls whether or not to include seam allowance
- **[Seam Allowance Size](/docs/about/site/draft/core-settings/samm)**: Controls how big to make the seam allowance, if it is included

The latter will only be shown if you've enabled the former.

</Note>
[core-settings]: /docs/about/site/draft/core-settings/
