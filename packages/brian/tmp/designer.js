/**
 * @freesewing/plugin-designer | v0.4.2
 * The plugin for freesewing to facilitate pattern design
 * (c) 2018 Joost De Cock <joost@decock.org> (https://github.com/joostdecock)
 * @license MIT
 */
(this.freesewing = this.freesewing || {}),
  (this.freesewing.plugins = this.freesewing.plugins || {}),
  (this.freesewing.plugins.designer = (function() {
    "use strict";
    return {
      hooks: {
        preRenderSvg: function(t) {
          (this.script +=
            "\nfunction pointHover(evt) {\n  var point = evt.target;\n  var id = point.id;\n  var cx = point.getAttribute('x');\n  var cy = point.getAttribute('y');\n  var name = point.getAttribute('data-point');\n  var part = point.getAttribute('data-part');\n  console.log(name+' ('+cx+', '+cy+') @ '+part);\n  var scale = 2;\n  cx = cx-scale*cx;\n  cy = cy-scale*cy;\n  point.setAttribute(\"transform\", 'matrix('+scale+', 0, 0, '+scale+', '+cx+', '+cy+')');\n  pointUnhover(id);\n}\nfunction pointUnhover(id) {\n  setTimeout(function(){\n    document.getElementById(id).removeAttribute(\"transform\", '');\n  }, 500);\n}\n"),
            (this.defs +=
              '\n<g id="point">\n  <circle cy="0" cx="0" r="2" class="note stroke-sm" />\n  <circle cy="0" cx="0" r="0.8" class="fill-note" />\n</g>\n<g id="point-hidden">\n  <circle cy="0" cx="0" r="1" class="canvas stroke-xs" />\n  <path d="M -0.5,-0.5 L 0.5,0.5 M 0.5,-0.5 L -0.5,0.5" class="canvas stroke-sm" />\n</g>\n<g id="path-move-point">\n  <circle cx="0" cy="0" r="2"  class="interfacing stroke-lg" />\n  <circle cx="0" cy="0" r="0.8" class="fill-interfacing" />\n</g>\n<g id="path-line-point">\n  <circle cx="0" cy="0" r="2"  class="note stroke-lg" />\n  <circle cx="0" cy="0" r="0.8" class="fill-note" />\n</g>\n<g id="path-curve-point"> <use xlink:href = "#path-line-point"/> </g>\n<g id="path-handle-point">\n  <circle cx="0" cy="0" r="1" class="fill-various" />\n</g>\n'),
            this.attributes.add("freesewing:theme-designer", "0.4.2");
          var e = function(t, e, n, i, a, r, s) {
              (n[t] = new e(`path-${a}-point`, i, `Path ${r}: ${a}`)),
                n[t].attributes.add("onmouseover", "pointHover(evt)"),
                n[t].attributes.add("id", t),
                n[t].attributes.add(
                  "data-point",
                  i.attributes.get("data-point")
                ),
                n[t].attributes.add("data-path", r),
                n[t].attributes.add("data-part", s);
            },
            n = function(t, e, n, i, a, r, s) {
              let p = new e().move(i).line(a);
              p.attributes.add(
                "class",
                "curve-control stroke-various stroke-sm"
              ),
                p.attributes.add("id", t),
                p.attributes.add("data-path", r),
                p.attributes.add("data-part", s),
                (n[t] = p);
            };
          !(function(t) {
            for (let e in t.pattern.parts) {
              let n = t.pattern.parts[e];
              if (n.render)
                for (let i in n.points) {
                  let a = n.points[i];
                  a.attributes.add("id", t.getUid()),
                    a.attributes.add("data-point", i),
                    a.attributes.add("data-part", e);
                  let r = "_" === i.substr(0, 1) ? "point-hidden" : "point",
                    s = t.getUid();
                  (n.snippets[s] = new t.pattern.snippet(
                    r,
                    a,
                    `Point ${i} in part ${e}`
                  )),
                    n.snippets[s].attributes.add(
                      "onmouseover",
                      "pointHover(evt)"
                    ),
                    n.snippets[s].attributes.add("id", s),
                    n.snippets[s].attributes.add("data-point", i),
                    n.snippets[s].attributes.add("data-part", e);
                }
            }
          })(this),
            (function(t) {
              for (let i in t.pattern.parts) {
                let a = t.pattern.parts[i];
                if (a.render)
                  for (let r in a.paths) {
                    let s,
                      p = a.paths[r];
                    if (!p.render) return !1;
                    for (let o of p.ops)
                      "close" !== o.type &&
                        e(
                          t.getUid(),
                          t.pattern.snippet,
                          a.snippets,
                          o.to,
                          o.type,
                          r,
                          i
                        ),
                        "curve" === o.type &&
                          (e(
                            t.getUid(),
                            t.pattern.snippet,
                            a.snippets,
                            o.cp1,
                            "handle",
                            r,
                            i
                          ),
                          e(
                            t.getUid(),
                            t.pattern.snippet,
                            a.snippets,
                            o.cp2,
                            "handle",
                            r,
                            i
                          ),
                          n(
                            t.getUid(),
                            t.pattern.path,
                            a.paths,
                            s,
                            o.cp1,
                            r,
                            i
                          ),
                          n(
                            t.getUid(),
                            t.pattern.path,
                            a.paths,
                            o.to,
                            o.cp2,
                            r,
                            i
                          )),
                        (s = o.to);
                  }
              }
            })(this),
            console.log(
              "Designer plugin: Here's the pattern object:",
              this.pattern
            ),
            t();
        }
      }
    };
  })());
