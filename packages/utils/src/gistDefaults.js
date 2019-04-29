import defaultGist from "./defaultGist";
import optionDefault from "./optionDefault";

const gistDefaults = (options, gist = false) => {
  if (!gist) gist = defaultGist;
  for (let option of Object.keys(options)) {
    if (
      typeof gist.options !== "undefined" &&
      typeof gist.options[option] !== undefined
    )
      options[option] = gist.options[option];
    else options[option] = optionDefault(options[option]);
  }
  delete gist.options;
  let settings = JSON.parse(JSON.stringify(defaultGist.settings));
  delete settings.locale;
  delete settings.units;
  for (let setting of Object.keys(settings)) {
    if (typeof gist.settings[setting] !== "undefined") {
      settings[setting] = gist.settings[setting];
    }
  }
  settings.options = options;

  return settings;
};

export default gistDefaults;
