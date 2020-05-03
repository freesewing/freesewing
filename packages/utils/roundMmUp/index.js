/**
 * @freesewing/utils/roundMmUp | v2.6.0-rc.0
 * A collection of utilities shared across freesewing frontend projects
 * (c) 2020 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */'use strict';const smallestImperialStep=.396875,roundMmUp=(a,b)=>"imperial"===b?a-a%smallestImperialStep:Math.ceil(10*a)/10;module.exports=roundMmUp;
//# sourceMappingURL=index.js.map
