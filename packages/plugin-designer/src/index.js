import script from "./lib/script";
import snippets from "./lib/snippets";
import { version, name } from "../package.json";
import decorate from "./decorate";

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(svg) {
      if (svg.attributes.get("freesewing:plugin-designer") === false) {
        // Add script and snippets
        svg.script += script;
        svg.defs += snippets;

        // Add SVG attributes
        svg.attributes.add("freesewing:plugin-designer", version);

        // Decorate pattern
        decorate.points(svg);
        decorate.paths(svg);
        svg.debug(
          { style: "info", label: "🚛 Pattern object" },
          "(dumped by designer plugin)",
          svg.pattern
        );
      }
    }
  }
};
