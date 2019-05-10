import snippets from "./lib/snippets";
import { version, name } from "../package.json";
import decorate from "./decorate";

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(svg, raiseEvent) {
      raiseEvent("preRender", { data: "foo" });
      //const pointHover = raiseEvent.bind(svg);
      //function(evt) {
      //  raiseEvent.bind(svg)('plugin-designer-pointHover', evt);
      //}
      if (svg.attributes.get("freesewing:plugin-designer") === false) {
        // Add snippets
        svg.defs += snippets;

        // Add SVG attributes
        svg.attributes.add("freesewing:plugin-designer", version);

        // Decorate pattern
        //decorate.points(svg, raiseEvent);
        for (let partId in svg.pattern.parts) {
          let part = svg.pattern.parts[partId];
          if (part.render) {
            for (let pointId in part.points) {
              let point = part.points[pointId];
              let type =
                pointId.substr(0, 1) === "_" ? "point-hidden" : "point";
              let id = "snippet-" + pointId;
              part.snippets[id] = new svg.pattern.Snippet(type, point);
              part.snippets[id].attributes.set("onmouseover", raiseEvent); //(function(){pointHover('test', 'data')}));
            }
          }
        }
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
