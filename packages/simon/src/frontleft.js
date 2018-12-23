import frontLeftClassicSeperate from "./frontleft-classic-seperate";
import frontLeftClassicCuton from "./frontleft-classic-cuton";
import frontLeftSeamless from "./frontleft-seamless";

export default part => {
  let { options } = part.shorthand();

  return options.buttonholePlacketStyle === "seamless"
    ? frontLeftSeamless(part)
    : options.buttonholePlacketType === "seperate"
    ? frontLeftClassicSeperate(part)
    : frontLeftClassicCuton(part);
};
