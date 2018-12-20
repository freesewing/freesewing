export default {
  name: "hugo",
  design: "Joost De Cock",
  code: "Joost De Cock",
  department: "menswear",
  type: "pattern",
  difficulty: 3,
  tags: ["top", "basics"],
  parts: [
    "base",
    "frontBase",
    "backBase",
    "sleeveBase",
    "sleevecap",
    "front",
    "back",
    "sleeve",
    "pocket",
    "pocketFacing",
    "hoodSide",
    "hoodCenter",
    "cuffs",
    "waistband"
  ],
  optionGroups: {
    fit: ["bicepsEase", "chestEase", "cuffEase", "ribbingStretchFactor"],
    style: ["lengthBonus", "sleeveLengthBonus", "ribbingWidth"],
    advanced: ["acrossBackFactor", "backNeckCutout"]
  }
};
