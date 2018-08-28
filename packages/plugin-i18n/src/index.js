import { version, name } from "../package.json";
import locales from "../locales";

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(next) {
      this.attributes.add("freesewing:plugin-i18n", version);
      next();
    },
    insertText: function(next) {
      if(typeof locales[this.pattern.settings.locale][this.text] === 'string')
        this.text = locales[this.pattern.settings.locale][this.text];
      next();
    }
  }
};
