<p align="center">
  <a title="Go to freesewing.org" href="https://freesewing.org/"><img src="https://freesewing.org/img/logo/black.svg" align="center" width="150px" alt="Freesewing logo"/></a>
</p>
<h4 align="center"><em>&nbsp;<a title="Go to freesewing.org" href="https://freesewing.org/">freesewing</a></em>
<br><sup>a library for made-to-measure sewing patterns</sup>
</h4>
<p align="center">
  <a href="https://travis-ci.org/freesewing/i18n"><img src="https://badgen.net/travis/freesewing/i18n/master" alt="Travis build"></a>
  <a href="https://www.npmjs.com/package/@freesewing/i18n"><img src="https://badgen.net/npm/v/@freesewing/i18n" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@freesewing/i18n"><img src="https://badgen.net/npm/license/@freesewing/i18n" alt="License"></a>
  <a href="https://codecov.io/gh/freesewing/i18n"><img src="https://badgen.net/codecov/c/github/freesewing/i18n/master" alt="Code coverage"></a>
  <a href="https://gitter.im/freesewing/freesewing"><img src="https://badgen.net/badge/chat/on%20Gitter/cyan" alt="Chat on Gitter"></a>
  <a href="https://freesewing.org/patrons/join"><img src="https://badgen.net/badge/become/a%20Patron/FF5B77" alt="Become a Patron"></a>
</p>

# i18n

These are the translation files for the [Freesewing](https://freesewing.org/) project. 

We currently provide translation in 5 languages:

 - English
 - German
 - Spanish
 - French
 - Dutch

## Install

```sh
npm install --save @freesewing/i18n
```


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
