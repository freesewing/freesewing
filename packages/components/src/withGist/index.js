import React from "react";
import { storage } from "@freesewing/utils";

const withGist = (WrappedComponent, settings = { gist: {}, store: false }) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.setGist = this.setGist.bind(this);
      this.importGist = this.importGist.bind(this);
      this.updateGist = this.updateGist.bind(this);
      this.state = { gist: settings.gist || {} };
    }

    setGist(gist) {
      this.setState({ gist });
      if (settings.store) storage.set(this.state.gist.name || "gist", gist);
    }

    importGist(gist) {
      if (typeof this.state.gist.settings === "undefined")
        this.updateGist({}, "settings");
      if (typeof this.state.gist.settings.options === "undefined")
        this.updateGist({}, "settings", "options");
      if (typeof gist.settings !== "undefined") {
        // Load settings
        for (let key of Object.keys(gist.settings)) {
          if (key !== "options")
            this.updateGist(gist.settings[key], "settings", key);
        }
        if (typeof gist.settings.options !== "undefined") {
          // Load options
          for (let key of Object.keys(gist.settings.options)) {
            this.updateGist(
              gist.settings.options[key],
              "settings",
              "options",
              key
            );
          }
        }
      }
      // Load root level keys
      for (let key of Object.keys(gist)) {
        if (key !== "settings") this.updateGist(gist[key], key);
      }
    }

    updateGist(value, l1 = false, l2 = false, l3 = false) {
      if (!l1) return;
      let gist = this.state.gist;

      if (l2 && typeof gist[l1] === "undefined") gist[l1] = {};
      if (l3 && typeof gist[l1][l2] === "undefined") gist[l1][l2] = {};

      if (l3) gist[l1][l2][l3] = value;
      else if (l2) gist[l1][l2] = value;
      else if (l1) gist[l1] = value;
      this.setState({ gist });
      if (settings.store) storage.set(this.state.gist.name || "gist", gist);
    }

    render() {
      return (
        <WrappedComponent
          gist={this.state.gist}
          importGist={this.importGist}
          updateGist={this.updateGist}
          {...this.props}
        />
      );
    }
  };
};

export default withGist;
