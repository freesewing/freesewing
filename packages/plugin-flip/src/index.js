import { name, version } from "../package.json";

export default {
  name: name,
  version: version,
  hooks: {
    preRender: function(svg) {
      if (svg.attributes.get("freesewing:plugin-flip") === false)
        svg.attributes.set("freesewing:plugin-flip", version);
    }
  },
  macros: {
    flip: function() {
      console.log('flip macro');
      let ops = ["from", "to", "cp1", "cp2"];
      for(let id of Object.keys(this.points)) this.points[id].x = this.points[id].x * -1;
      for(let id of Object.keys(this.paths)) {
        for(let op in this.paths[id].ops) {
          for (let type of ops) {
            if(typeof this.paths[id].ops[op][type] !== "undefined")
              this.paths[id].ops[op][type].x = this.paths[id].ops[op][type].x * -1;
          }
        }
      }
      for(let id of Object.keys(this.snippets))
        this.snippets[id].anchor.x = this.snippets[id].anchor.x * -1;
    }
  }
};
