import optionType from "../optionType";

const optionDefault = (name, option, recipe) => {
  let type = optionType(option);
  let factor = type === "pct" ? 100 : 1;
  // Default from recipe?
  if (
    recipe &&
    typeof recipe.settings !== "undefined" &&
    typeof recipe.settings.options !== "undefined" &&
    typeof recipe.settings.options[name] !== "undefined"
  )
    return Math.round(10 * recipe.settings.options[name] * factor) / 10;

  switch (type) {
    case "constant":
      return option;
      break;
    case "list":
      return option.dflt;
      break;
    default:
      return option[type];
  }
};

export default optionDefault;
