import { version } from "../package.json";

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: "neck",
  version,
  design: "devanshkain",
  code: "devanshkain",
  department: "womenswear",
  type: "block",
  difficulty: 3,
  tags: [
    "freesewing",
    "design",
    "diy",
    "fashion",
    "made to measure",
    "parametric design",
    "block",
    "sewing",
    "sewing pattern"
  ],
  optionGroups: {
    armholeoptions:
    [
    "shoulderslopedepth","armholecenter","armbottomwidth",
    {armholecp: ["topcpspread","midcp2spread","midcp1spread","bottomcpspread"]},
    {armtopshiftup:["armtopshift"]},
    {armholedart:["armholedartlength","armholedartwidth","frontdart","afterdartcurvefactor"]}
    ],
    neckoptions:
    [
    {neckcpspread: ["neckcprightspread","neckcpbottomspread"]},
    {neckcpangle: ["neckcprightangle","neckcpbottomangle"]},
    {neckdimensions: ["neckwidth","neckdepth"]}
    ],
    waistdart: ["waistdartwidth", "waistdartlength"]
  },
  measurements: ["topToWaist","naturalWaist","shoulderToShoulder","naturalWaistToUnderarm","highBust","bustSpan","shoulderSlope"],
  dependencies: {front:["neck","armhole"]},
  inject: {neck: 'armhole',front: 'neck'},
  hide: ["armhole","neck"],
  parts: ["armhole","neck","front"],
  options: {
    //Importing from arm hole
    bottomcpspread: { pct: 18, min: 0, max: 100 },
    midcp1spread: { pct: 10, min: 0, max: 100 },
    midcp2spread: { pct: 9, min: 0, max: 100 },
    topcpspread: { pct: 20, min: 0, max: 100 }, 
    shoulderslopedepth: { mm: 19.05, min: 0, max: 25.4},
    armtopshift: { mm: 0, min: 0, max: 177.8},
    armholecenter: { mm: 0, min: 0, max: 50},
    armbottomwidth: { mm: 0, min: 0, max: 12.7},

    //armholedartoptions
    armholedartlength: { mm: 0, min: 0, max: 76.2},
    armholedartwidth: { mm: 25.4, min: 0, max: 12.7},

    //neck hole
    neckwidth: { mm: 127, min: 0, max: 177.8},
    neckdepth: { mm: 76.2, min: 0, max: 177.8},
    neckcprightspread: { pct: 50, min: 0, max: 100},
    neckcpbottomspread: { pct: 50, min: 0, max:100},
    neckcprightangle: { deg: 0, min: -90, max: 90},
    neckcpbottomangle: { deg: 0, min: -90, max: 90},
    frontdart: {
      list: ['no', 'yes'],
      dflt: 'no'
    },
    afterdartcurvefactor: { mm:0.15 , min: 0 , max:0.5},

    //waist dart
    waistdartwidth: { mm: 50.8, min: 0, max: 50.8 },
    waistdartlength: { mm: 0, min: -101.6, max: 12.7}
  }
};
