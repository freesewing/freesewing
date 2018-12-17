import * as en from "./locales/en";
import * as de from "./locales/de";
import * as es from "./locales/es";
import * as fr from "./locales/fr";
import * as nl from "./locales/nl";

const imports = { en, de, es, fr, nl };

const topics = [
  "account",
  "app",
  "email",
  "errors",
  "filter",
  "gdpr",
  "i18n",
  "measurements",
  "options",
  "patterns",
  "plugin"
];

const languages = ["en", "de", "es", "fr", "nl"];

const account = {};
const app = {};
const email = {};
const errors = {};
const filter = {};
const gdpr = {};
const i18n = {};
const measurements = {};
const options = {};
const patterns = {};
const plugin = {};
const strings = {};

for (let lang of languages) account[lang] = imports[lang].account;
for (let lang of languages) app[lang] = imports[lang].app;
for (let lang of languages) email[lang] = imports[lang].email;
for (let lang of languages) errors[lang] = imports[lang].errors;
for (let lang of languages) filter[lang] = imports[lang].filter;
for (let lang of languages) gdpr[lang] = imports[lang].gdpr;
for (let lang of languages) i18n[lang] = imports[lang].i18n;
for (let lang of languages) measurements[lang] = imports[lang].measurements;
for (let lang of languages) options[lang] = imports[lang].options;
for (let lang of languages) patterns[lang] = imports[lang].patterns;
for (let lang of languages) plugin[lang] = imports[lang].plugin;
for (let lang of languages) strings[lang] = imports[lang].strings;

export {
  account,
  app,
  email,
  errors,
  filter,
  gdpr,
  i18n,
  measurements,
  options,
  patterns,
  plugin,
  strings
};
