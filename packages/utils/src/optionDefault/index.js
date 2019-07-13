import optionType from "../optionType";

const optionDefault = option => {
  let type = optionType(option);
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
