/**
 * @freesewing/utils/formatImperial | v2.6.0-rc.0
 * A collection of utilities shared across freesewing frontend projects
 * (c) 2020 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */'use strict';const formatImperial=(a,b,c=!1,d=!1,e="html")=>"html"===e?c?`<span>${a}${b}&nbsp;<sup>${c}</sup>/<sub>${d}</sub></span>`:`<span>${a}${b}</span>`:c?`${a}${b} ${c}/${d}`:`${a}${b}`;module.exports=formatImperial;
//# sourceMappingURL=index.js.map
