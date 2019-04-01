import { name, version } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    preDraft: function({ settings }) {
      if (svg.attributes.get("freesewing:plugin-bust") === false) {
        svg.attributes.set("freesewing:plugin-bust", version);
        settings.measurements.bust = settings.measurements.chestCircumference;
        settings.measurements.chestCircumference =
          settings.measurements.highBust;
      }
    }
  }
};
