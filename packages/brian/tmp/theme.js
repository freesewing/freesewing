/**
 * @freesewing/plugin-theme | v0.6.1
 * A freesewing plugin that provides a default theme
 * (c) 2018 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */
(this.freesewing = this.freesewing || {}),
  (this.freesewing.plugins = this.freesewing.plugins || {}),
  (this.freesewing.plugins.theme = (function() {
    "use strict";
    return {
      hooks: {
        preRenderSvg: function(t) {
          if (
            ((this.style +=
              'path,circle,rect{fill:none;stroke:none}path{stroke:#000;stroke-opacity:1;stroke-width:.3;stroke-linecap:round;stroke-linejoin:round}.fabric{stroke-width:.6;stroke:#212121}.lining{stroke-width:.6;stroke:#ff5b77}.interfacing{stroke-width:.6;stroke:#64b5f6}.canvas{stroke-width:.6;stroke:#ff9000}.various{stroke-width:.6;stroke:#4caf50}.note{stroke-width:.4;stroke:#dd60dd}.fill-fabric{fill:#212121}.fill-lining{fill:#ff5b77}.fill-interfacing{fill:#64b5f6}.fill-canvas{fill:#ff9000}.fill-various{fill:#4caf50}.fill-note{fill:#dd69dd}text{font-size:5px;font-family:-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;fill:#000;text-anchor:start;font-weight:200;dominant-baseline:ideographic}.text-xs{font-size:3px}.text-sm{font-size:4px}.text-lg{font-size:7px}.text-xl{font-size:9px}.text-xxl{font-size:12px}.center{text-anchor:middle}.right{text-anchor:end}.stroke-xs{stroke-width:.1}.stroke-sm{stroke-width:.2}.stroke-lg{stroke-width:.6}.stroke-xl{stroke-width:1}.stroke-xxl{stroke-width:2}.sa{stroke-dasharray:.4,.8}.help{stroke-width:.2;stroke-dasharray:15,1.5,1,1.5}.dotted{stroke-dasharray:.4,.8}.dashed{stroke-dasharray:1,1.5}.lashed{stroke-dasharray:6,6}.hidden{stroke:none;fill:none}path.grid{fill:none;stroke:#555;stroke-width:0.3}path.gridline{stroke:#555;stroke-width:0.2}path.gridline-lg{stroke:#777;stroke-width:0.2;stroke-dasharray:1.5,1.5}path.gridline-sm{stroke:#999;stroke-width:0.1}path.gridline-xs{stroke:#999;stroke-width:0.1;stroke-dasharray:0.5,0.5}'),
            (this.defs +=
              '<g id="notch"><circle cy="0" cx="0" r="1.4" class="fill-note" /><circle cy="0" cx="0" r="2.8" class="note stroke-xl" /></g>'),
            this.attributes.add("freesewing:plugin-theme", "0.6.1"),
            this.pattern.settings.paperless)
          ) {
            (this.style += "path.gridbox{fill: url(#grid)}"),
              "imperial" === this.pattern.settings.units
                ? (this.defs +=
                    '<pattern id="grid" height="25.4" width="25.4" patternUnits="userSpaceOnUse" >\n  <path class="gridline-lg" d="M 0 0 L 0 25.4 L 25.4 25.4" />\n  <path class="gridline" d="M 12.7 0 L 12.7 25.4 M 0 12.7 L 25.4 12.7" />\n  <path class="gridline-sm" d="M 3.175 0 L 3.175 25.4 M 6.32 0 L 6.35 25.4 M 9.525 0 L 9.525 25.4 M 15.875 0 L 15.875 25.4 M 19.05 0 L 19.05 25.4 M 22.225 0 L 22.225 25.4" />\n  <path class="gridline-sm" d="M 0 3.175 L 25.4 3.175 M 0 6.32 L 25.4 6.35 M 0 9.525 L 25.4 9.525 M 0 15.875 L 25.4 15.875 M 0 19.05 L 25.4 19.05 M 0 22.225 L 25.4 22.225" />\n</pattern>\n')
                : (this.defs +=
                    '<pattern id="grid" height="100" width="100" patternUnits="userSpaceOnUse" >\n  <path class="gridline-lg" d="M 0 0 L 0 100 L 100 100" />\n  <path class="gridline" d="M 50 0 L 50 100 M 0 50 L 100 50" />\n  <path class="gridline-sm" d="M 10 0 L 10 100 M 20 0 L 20 100 M 30 0 L 30 100 M 40 0 L 40 100 M 60 0 L 60 100 M 70 0 L 70 100 M 80 0 L 80 100 M 90 0 L 90 100" />\n  <path class="gridline-sm" d="M 0 10 L 100 10 M 0 20 L 100 20 M 0 30 L 100 30 M 0 40 L 100 40 M 0 60 L 100 60 M 0 70 L 100 70 M 0 80 L 100 80 M 0 90 L 100 90" />\n\n  <path class="gridline-xs" d="M 5 0 L 5 100 M 15 0 L 15 100 M 25 0 L 25 100 M 35 0 L 35 100 M 45 0 L 45 100 M 55 0 L 55 100 M 65 0 L 65 100 M 75 0 L 75 100 M 85 0 L 85 100 M 95 0 L 95 100" />\n  <path class="gridline-xs" d="M 0 5 L 100 5 M 0 15 L 100 15 M 0 25 L 100 25 M 0 35 L 100 35 M 0 45 L 100 45 M 0 55 L 100 55 M 0 65 L 100 65 M 0 75 L 100 75 M 0 85 L 100 85 M 0 95 L 100 95" />\n</pattern>\n');
            for (let t in this.pattern.parts) {
              let e = this.pattern.parts[t],
                i = new this.pattern.point(0, 0);
              void 0 !== e.points.gridAnchor
                ? (i = e.points.gridAnchor)
                : void 0 !== e.points.anchor && (i = e.points.anchor),
                (this.defs += `<pattern id="${
                  e.id
                }grid" xlink:href="#grid" x="${i.x}" y="${i.y}"></pattern>`),
                (e.paths[this.getUid()] = new this.pattern.path()
                  .move(e.topLeft)
                  .line(new this.pattern.point(e.topLeft.x, e.bottomRight.y))
                  .line(e.bottomRight)
                  .line(new this.pattern.point(e.bottomRight.x, e.topLeft.y))
                  .close()
                  .attr("class", "grid")
                  .attr("style", `fill: url(#${e.id}grid)`));
            }
          }
          t();
        }
      }
    };
  })());
