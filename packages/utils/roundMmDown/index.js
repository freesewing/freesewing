/**
 * @freesewing/utils/roundMmDown | v2.6.0-rc.0
 * A collection of utilities shared across freesewing frontend projects
 * (c) 2020 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */'use strict';const smallestImperialStep=.396875,roundMmDown=(a,b)=>"imperial"===b?a-a%smallestImperialStep:Math.floor(10*a)/10;module.exports=roundMmDown;
//# sourceMappingURL=index.js.map
