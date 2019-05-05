export const getProps = obj => {
  let rename = {
    class: "className",
    "marker-start": "markerStart",
    "marker-end": "markerEnd"
  };
  let props = {};
  for (let key in obj.attributes.list) {
    if (key === "style") console.log("style in", key, obj.attributes.get(key));
    if (Object.keys(rename).indexOf(key) !== -1)
      props[rename[key]] = obj.attributes.get(key);
    else if (key !== "style") props[key] = obj.attributes.get(key);
  }

  return props;
};
