/**
 * @freesewing/utils/tiler | v2.6.0-rc.0
 * A collection of utilities shared across freesewing frontend projects
 * (c) 2020 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */'use strict';function _interopDefault(a){return a&&"object"==typeof a&&"default"in a?a["default"]:a}var axios=_interopDefault(require("axios"));function useTiler(a="https://tiler.freesewing.org",b=1e4){const c=axios.create({baseURL:a,timeout:b});return{tile:(a,b="pdf",d="a4")=>c.post("/api",{svg:a,format:b,size:d})}}module.exports=useTiler;
//# sourceMappingURL=index.js.map
