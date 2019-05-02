/* eslint-disable no-console */
//const path = require("path");
//const fse = require("fs-extra");
const i18n = require("@freesewing/i18n").languages;
console.log(i18n);

//const strings = {
//  languages: {}
//};
//for (let lang of Object.keys(i18n.languages)) {
//  strings.languages[lang] = i18n.languages[lang][lang];
//  strings[lang] = {};
//  for (let s of ['department', 'type'])
//    strings[lang][s] = i18n.filter[lang][s].title;
//  for (let s of ['menswear', 'womenswear', 'accessories'])
//    strings[lang][s] = i18n.filter[lang].department[s];
//  for (let s of ['block', 'pattern'])
//    strings[lang][s] = i18n.filter[lang].type[s];
//  strings[lang].difficulty = i18n.filter[lang].difficulty;
//  strings[lang].name = i18n.app[lang].name;
//
//}
//
//fse.writeFileSync(
//  path.join(".", "lib", "strings.js"),
//  "export default "+JSON.stringify(strings)
//);

//console.log(strings);
