const partList = config => {
  let parts = {};
  if (config.parts) {
    for (let p of config.parts) parts[p] = p;
  }
  if (config.dependencies) {
    for (let p of Object.keys(config.dependencies)) {
      parts[p] = p;
      if (typeof config.dependencies[p] === "string") {
        parts[config.dependencies[p]] = config.dependencies[p];
      } else {
        for (let d of config.dependencies[p]) parts[d] = d;
      }
    }
  }
  if (config.inject) {
    for (let p of Object.keys(config.inject)) {
      parts[p] = p;
      parts[config.inject[p]] = config.inject[p];
    }
  }
  if (config.hide) {
    for (let p of config.hide) delete parts[p];
  }

  return Object.keys(parts);
};

export default partList;
