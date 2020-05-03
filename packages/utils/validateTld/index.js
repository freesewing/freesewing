/**
 * @freesewing/utils/validateTld | v2.6.0-rc.0
 * A collection of utilities shared across freesewing frontend projects
 * (c) 2020 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */'use strict';function _interopDefault(a){return a&&"object"==typeof a&&"default"in a?a["default"]:a}var tlds=_interopDefault(require("tlds"));const validateTld=a=>{let b=a.split("@").pop().split(".").pop().toLowerCase();return-1!==tlds.indexOf(b)||b};module.exports=validateTld;
//# sourceMappingURL=index.js.map
