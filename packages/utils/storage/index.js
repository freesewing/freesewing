/**
 * @freesewing/utils/storage | v2.6.0-rc.0
 * A collection of utilities shared across freesewing frontend projects
 * (c) 2020 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */'use strict';const storage={set:(a,b,c)=>{if("undefined"==typeof localStorage)return b;const d="fs_"+a;return"undefined"==typeof b||null===b?localStorage.removeItem(d):localStorage.setItem(d,c?b:JSON.stringify(b)),b},get:(a,b)=>{if("undefined"==typeof localStorage)return null;const c=localStorage.getItem("fs_"+a);return b?c:JSON.parse(c)}};module.exports=storage;
//# sourceMappingURL=index.js.map
