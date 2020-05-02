import { version } from '../package.json'

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: 'indsleeve',
  version: version,
  design: 'devanshkain',
  code: 'devanshkain',
  department: 'menswear',
  type: 'pattern',
  difficulty: 3,
  tags: [
    'freesewing',
    'design',
    'diy',
    'fashion',
    'made to measure',
    'parametric design',
    'pattern',
    'sewing',
    'sewing pattern'
  ],
  optionGroups: {
    sleevecapspread: [
      "sleevecapQ1Spread1","sleevecapQ1Spread2","sleevecapQ2Spread1","sleevecapQ2Spread2",
      "sleevecapQ3Spread1","sleevecapQ3Spread2","sleevecapQ4Spread1","sleevecapQ4Spread2"],
   capheight: [
     "capheightlength"
   ],
   wristspread: [
    "wristcpspread","wristlength"
   ],
   sleevecapcp: [
     "angletopfront","anglebottomfront","angletopback","anglebottomback"
   ],
   sleeveType: ["sleevetype"]
  },
  measurements: ["shoulderToWrist","bicepsCircumference","wristCircumference"],
  dependencies: {},
  inject: {},
  hide: [],
  parts: ["sleeve"],
  options: {
    sleevecapQ1Spread1: { pct: 6, min: 4, max: 20 },
    sleevecapQ1Spread2: { pct: 15, min: 4, max: 20 },
    sleevecapQ2Spread1: { pct: 15, min: 4, max: 20 },
    sleevecapQ2Spread2: { pct: 7.5, min: 4, max: 20 },  //8.5 
    sleevecapQ3Spread1: { pct: 8.5, min: 4, max: 20 },  //8
    sleevecapQ3Spread2: { pct: 15, min: 4, max: 20 },
    sleevecapQ4Spread1: { pct: 15, min: 4, max: 20 },
    sleevecapQ4Spread2: { pct: 6, min: 4, max: 20 },
    capheightlength : {mm: 140, min: 101, max:152},
    angletopfront : {deg:7, min:0, max:30},
    angletopback : {deg:10, min:0, max:30},
    anglebottomfront : {deg:0, min:0, max:30},
    anglebottomback : {deg:0, min:0, max:30},
    wristlength : {mm: 203.2, min: 101.6, max:406.4},
    wristcpspread : {pct: 10, min: 6, max:50},
    sleevetype: {
      list: ['basic', 'flared'],
      dflt: 'basic'
    }
  }
};
