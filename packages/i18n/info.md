
# Languages

We currently provide translation in 5 languages:

 - English
 - German
 - Spanish
 - French
 - Dutch

## How to use these translations

We use these translations in our [website repository](https://github.com/freesewing/website) to
translate react components with [react-intl](https://github.com/yahoo/react-intl):

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
[the react-intl documentation](https://github.com/yahoo/react-intl/wiki).


We also use it in our [backend repository](https://github.com/freesewing/website)
to translate the emails we send out to users.
