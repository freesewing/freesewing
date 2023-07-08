---
title: i18n
---

Published as [@freesewing/i18n][1], this package provides translations
for the FreeSewing project.

## Languages

We currently provide translations in 5 languages:

 - English
 - German
 - Spanish
 - French
 - Dutch

## How to use these translations

We use these translations in our [repository](https://github.com/freesewing/freesewing)
to translate react components with [react-intl](https://github.com/formatjs/formatjs/tree/main/packages/react-intl):

```js
import { strings } from "@freesewing/i18n";
import { IntlProvider } from "react-intl";

class Base extends React.Component {
  render() {
    const { language } = this.props;

    return (
      <IntlProvider locale={language} messages={strings[language]}>
        {...children}
      </IntlProvier>
    )
  }
}
```

Now all components below will be able to translate messages:

```js
import React from "react";
import { FormattedMessage } from "react-intl";

const Example = props => {
  return <p><FormattedMessage id={"app.aboutFreesewing"} /></p>
};

export default Example;
```

For all details, please refer to
[the react-intl documentation](https://formatjs.io/docs/react-intl).

We also use it in our backend to translate the emails we send out to users.

## Installation

```sh
npm install @freesewing/i18n
```

## Notes

This package provides the translations, but it does not provide the
mechanism for translation.
For that, you can use our [plugin-i18n](/reference/plugins/i18n) plugin.

<Related compact>
To learn more about using translations in a design, see the
[Translation guide](/guides/translation/)
</Related>

[1]: https://www.npmjs.com/package/@freesewing/i18n
