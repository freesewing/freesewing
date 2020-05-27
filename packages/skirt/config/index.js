import { version } from "../package.json";

// ?? 🤔 ?? --> https://en.freesewing.dev/packages/core/config

export default {
  name: "basic-skirt",
  version,
  design: "Roopin619",
  code: "Roopin619",
  department: "womenswear",
  type: "pattern",
  difficulty: 3,
  tags: [
    "freesewing",
    "design",
    "diy",
    "fashion",
    "made to measure",
    "parametric design",
    "pattern",
    "sewing",
    "sewing pattern"
  ],
  optionGroups: {
    Type:["skirttype"],
    Hem: ["manipulateHem"],
    Dart: [
      "dartGap","waistDartPosition",
      {Front:["frontLeftDartLength","frontRightDartLength","frontDartWidth"]},
      {Back:["backLeftDartLength","backRightDartLength","backDartWidth"]}
    ],
    Panel: [
      "panelLength","numOfPanels","waistBandWidth","hemExcess"
    ],
    Overall: [
      "naturalWaistToHip"
    ],
    Godet:[
      "numOfGodets","godetWidth","godetLength","frontGodetGap","backGodetGap"
    ],
    Mermaid:[
      "inseamToGround"
    ]
  },
  measurements: ["length","frontWaistArc","backWaistArc","hemLine","frontHipArc","backHipArc","naturalWaist","hipsCircumference","inseam"],
  dependencies: {},  
  inject: {},
  hide: ["alinefront","alineback","basicback","basicfront","waistband","panelfront","flaredpanel","godetfront","godet",
        "godetback","twistedpanel","diagonalpanel","basicsingledartedfront","basicsingledartedback","pencilgatherpanelfront",
        "pencilgatherpanelback","mermaidfront","mermaidback"
],
  parts: ["front","back","extra","alinefront","alineback","basicback","basicfront","waistband","panelfront","flaredpanel","godetback",
        "godetfront","godet","twistedpanel","diagonalpanel","basicsingledartedfront","basicsingledartedback","pencilgatherpanelfront",
        "pencilgatherpanelback","mermaidfront","mermaidback"
],
  options: {
    manipulateHem: { pct: 100, min: -5080, max: 5080 },
    frontLeftDartLength: { pct: 8640, min: 3560, max: 13720 },
    frontRightDartLength: { pct: 8640, min: 3560, max: 13720 },
    backLeftDartLength: { pct: 13970, min: 8890, max: 19050 },
    backRightDartLength: { pct: 12700, min: 7620, max: 17780 },
    frontDartWidth: { pct: 2540, min: 0, max: 6350 },
    backDartWidth: { pct: 2540, min: 0, max: 6980 },
    waistDartPosition: { pct: 8640, min: 3560, max: 13720 },
    naturalWaistToHip: { pct: 22860, min: 17780, max: 27940 },
    dartGap: { pct: 2540, min: 1270, max: 5080 },
    skirttype: {
      list: ['aline','basic','panel','wrapup','panelflared','godet','paneltwisted','paneldiagonal'
      ,'basicsingledarted','pencilgatherpanel','mermaid'
    ],
      dflt: 'basic'
    },
    panelLength: { pct: 53340, min: 40640, max: 66040 },
    waistBandWidth: { pct: 7620, min: 2540, max: 12700 },
    numOfPanels: { count: 8, min: 4, max: 14 },
    naturalWaistToHip: { pct: 20320, min: 12700, max: 27940 },
    hemExcess: { pct: 0, min: -7620, max: 20320 },
    numOfGodets: { count: 6, min: 2, max: 10 },
    godetWidth: { pct: 10160, min: 5080, max: 15240 },
    godetLength: { pct: 25400, min: 17780, max: 33020 },
    frontGodetGap: { pct: 2540, min: 1270, max: 5080 },
    backGodetGap: { pct: 3810, min: 1270, max: 5080 },
    inseamToGround: { pct: 5080, min: 2540, max: 6350 }
  }
};