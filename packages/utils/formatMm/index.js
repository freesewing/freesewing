/**
 * @freesewing/utils/formatMm | v2.6.0-rc.0
 * A collection of utilities shared across freesewing frontend projects
 * (c) 2020 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */'use strict';const roundMm=(a,b)=>"imperial"===b?Math.round(1e6*a)/1e6:Math.round(10*a)/10,formatImperial=(a,b,c=!1,d=!1,e="html")=>"html"===e?c?`<span>${a}${b}&nbsp;<sup>${c}</sup>/<sub>${d}</sub></span>`:`<span>${a}${b}</span>`:c?`${a}${b} ${c}/${d}`:`${a}${b}`,formatMm=(a,b,c="html")=>{var d=Math.floor,e=Math.abs,f=Math.round;if(a=roundMm(a),"imperial"===b){if(0==a)return formatImperial("",0,!1,!1,c);let b="",g="",h="",i=a/25.4;0>i&&(i*=-1,b="-"),1>e(i)?h=i:(g=d(i),h=i-g);let j="";"html"===c&&(j="\"");let k=f(128*h);return 0==k?formatImperial(b,g,!1,!1,c):0==k%64?formatImperial(b,g,k/64,2,c)+j:0==k%32?formatImperial(b,g,k/32,4,c)+j:0==k%16?formatImperial(b,g,k/16,8,c)+j:0==k%8?formatImperial(b,g,k/8,16,c)+j:0==k%4?formatImperial(b,g,k/4,32,c)+j:0==k%2?formatImperial(b,g,k/2,64,c)+j:b+f(100*i)/100+j}return"html"===c?roundMm(a/10)+"cm":roundMm(a/10)};module.exports=formatMm;
//# sourceMappingURL=index.js.map
