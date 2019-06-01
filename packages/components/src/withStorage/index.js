import React from "react";
import { storage } from "@freesewing/utils";

const withStorage = (WrappedComponent, name) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.setStorageData = this.setStorageData.bind(this);
      this.updateStorageData = this.updateStorageData.bind(this);
      this.state = { data: storage.get(name) || {} };
    }

    setStorageData(data) {
      storage.set(name, data);
    }

    updateStorageData(value, l1 = false, l2 = false, l3 = false) {
      if (!l1) return;
      let data = this.state.data;

      if (l2 && typeof data[l1] === "undefined") data[l1] = {};
      if (l3 && typeof data[l1][l2] === "undefined") data[l1][l2] = {};

      if (l3) data[l1][l2][l3] = value;
      else if (l2) data[l1][l2] = value;
      else data[l1] = value;
      this.setState({ data });
      storage.set(name, data);
    }

    render() {
      return (
        <WrappedComponent
          storageData={this.state.data}
          updateStorageData={this.updateStorageData}
          {...this.props}
        />
      );
    }
  };
};

export default withStorage;
