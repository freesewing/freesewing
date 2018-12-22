import frontRightClassicSeperate from "./frontright-classic-seperate";
import frontRightClassicCuton from "./frontright-classic-cuton";
import frontRightSeamlessSeperate from "./frontright-seamless-seperate";
import frontRightSeamlessCuton from "./frontright-seamless-cuton";

export default part => {
  let { macro, options } = part.shorthand();
  macro("flip");

  return options.buttonPlacketStyle === "seamless"
    ? options.buttonPlacketType === "seperate"
      ? frontRightSeamlessSeperate(part)
      : frontRightSeamlessCuton(part)
    : options.buttonPlacketType === "seperate"
    ? frontRightClassicSeperate(part)
    : frontRightClassicCuton(part);
};
