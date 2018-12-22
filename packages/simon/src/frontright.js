import frontRightClassicSeperate from "./frontright-classic-seperate";
import frontRightClassicCuton from "./frontright-classic-cuton";
import frontRightSeamless from "./frontright-seamless";

export default part => {
  let { macro, options, points } = part.shorthand();
  macro("flip");
  points.scalebox = points.waist.shiftFractionTowards(points.cfWaist, 0.5);
  macro("scalebox", { at: points.scalebox });

  return options.buttonPlacketStyle === "seamless"
    ? frontRightSeamless(part)
    : options.buttonPlacketType === "seperate"
    ? frontRightClassicSeperate(part)
    : frontRightClassicCuton(part);
};
