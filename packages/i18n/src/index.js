import en from "./locales/en";
import de from "./locales/de";
import es from "./locales/es";
import fr from "./locales/fr";
import nl from "./locales/nl";

const languageCodes = ["en", "de", "es", "fr", "nl"];
const imports = { en, de, es, fr, nl };

const strings = {};
const languages = {};

for (let l of languageCodes) {
  strings[l] = imports[l];
  languages[l] = strings[l]["i18n." + l];
}

export { strings, languages };
