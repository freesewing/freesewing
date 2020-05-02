/**
 * @freesewing/utils/measurementAsMm | v2.6.0-rc.0
 * A collection of utilities shared across freesewing frontend projects
 * (c) 2020 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */'use strict';const measurementAsMm=(a,b="metric")=>{if("number"==typeof a)return a*("imperial"===b?25.4:10);if("metric"===b)return a=+a,!isNaN(a)&&10*a;else{const b=a=>{let b=a.trim().split("/");if(2!==b.length||""===b[1])return!1;let c=+b[0],d=+b[1];return!(isNaN(c)||isNaN(d))&&25.4*c/d};let c=a.split(" ");if(1===c.length){let a=c[0];return isNaN(+a)?b(a):25.4*+a}if(2===c.length){let a=+c[0];if(isNaN(a))return!1;let d=b(c[1]);return!1!==d&&25.4*a+d}}return!1};module.exports=measurementAsMm;
//# sourceMappingURL=index.js.map
