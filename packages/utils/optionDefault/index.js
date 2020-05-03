/**
 * @freesewing/utils/optionDefault | v2.6.0-rc.0
 * A collection of utilities shared across freesewing frontend projects
 * (c) 2020 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */'use strict';const optionType=a=>"object"==typeof a?"undefined"==typeof a.pct?"undefined"==typeof a.mm?"undefined"==typeof a.deg?"undefined"==typeof a.count?"undefined"==typeof a.bool?"undefined"==typeof a.list?"unknown":"list":"bool":"count":"deg":"mm":"pct":"constant",optionDefault=(a,b,c)=>{var d=Math.round;let e=optionType(b),f=!1;switch(c&&"undefined"!=typeof c.settings&&"undefined"!=typeof c.settings.options&&"undefined"!=typeof c.settings.options[a]&&(f=!0),e){case"constant":return b;case"list":return f?c.settings.options[a]:b.dflt;default:let g="pct"===e?100:1;return f?d(10*c.settings.options[a]*g)/10:b[e];}};module.exports=optionDefault;
//# sourceMappingURL=index.js.map
