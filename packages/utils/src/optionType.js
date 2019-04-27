const optionType = option => {
  if (typeof option === "object") {
    if (typeof option.pct !== "undefined") return "pct";
    if (typeof option.mm !== "undefined") return "mm";
    if (typeof option.deg !== "undefined") return "deg";
    if (typeof option.count !== "undefined") return "count";
    if (typeof option.bool !== "undefined") return "bool";
    if (typeof option.list !== "undefined") return "list";
    return "unknown";
  }

  return "constant";
};

export default optionType;
