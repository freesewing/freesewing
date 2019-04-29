import React from "react";
import { gistDefaults } from "@freesewing/utils";
import { storage, cloneObject } from "@freesewing/utils";

const withGist = (WrappedComponent, settings = { gist: {}, store: false }) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.update = this.update.bind(this);
      this.state = { gist: settings.gist || {} };
    }

    update(value, l1 = false, l2 = false, l3 = false) {
      if (!l1) return;
      let gist = cloneObject(this.state.gist);

      if (typeof gist === "undefined") gist = {};
      if (l1 && typeof gist[l1] === "undefined") gist[l1] = {};
      if (l2 && typeof gist[l1][l2] === "undefined") gist[l1][l2] = {};
      if (l3 && typeof gist[l1][l2][l3] === "undefined") gist[l1][l2][l3] = {};

      if (l3) gist[l1][l2][l3] = value;
      else if (l2) gist[l1][l2] = value;
      else if (l1) gist[l1] = value;
      this.setState({ gist }, () => {
        if (settings.store) storage.set(settings.store, this.state.gist);
      });
    }

    getGist() {
      return this.state.gist;
    }

    loadDefaults(defaults) {
      for (let key of defaults) {
        console.log(key);
      }
    }

    render() {
      return (
        <WrappedComponent
          gist={this.state.gist}
          updateGist={this.update}
          loadGistDefaults={this.loadDefaults}
          {...this.props}
        />
      );
    }
  };
};

export default withGist;
