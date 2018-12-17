import { version, name } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(svg) {
      if(svg.attributes.get('freesewing:plugin-i18n') === false) {
        svg.attributes.set('freesewing:plugin-i18n', version);
      }
    },
    insertText: function(locale, text, data) {
      let prefix = data.prefix || "";
      if(typeof data.strings[locale][prefix+text] === "undefined") return text;
      else return data.strings[locale][prefix+text];
    }
  }
};
