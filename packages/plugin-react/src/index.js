import { version, name } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    postDraft: function(pattern, props) {
      console.log("postDraft hook in react plugin");
    }
  }
};
