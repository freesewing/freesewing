import { BuildMainShape } from "./shape";

export default function(part) {
  let frontPart = true;

  let {
    options,
    measurements,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    store,
    complete,
    sa,
    paperless,
    macro
  } = part.shorthand();

  BuildMainShape(part, true);

  paths.seam = paths.leftSide
    .clone()
    .join(paths.bottom)
    .join(paths.sideSeam)
    .join(paths.waist)
    .attr("class", "fabric");

  // Complete?
  if (complete) {
    macro("cutonfold", {
      from: points.lWaist,
      to: points.lLeg,
      margin: 5,
      offset: 10
    });
    macro("title", {
      at: points.titleAnchor,
      title: "1x " + "cutOnFold" + " " + "fromFabric"
    });

    /*
    let so = {
      from: points.lWaist,
      to: points.lLeg,
      margin: 5,
      offset: -10,
      prefix: ''
    };
    points["cutonfoldFrom" + so.prefix] = so.from.shiftFractionTowards(
      so.to,
      so.margin / 100
    );
    points["cutonfoldTo" + so.prefix] = so.to.shiftFractionTowards(
      so.from,
      so.margin / 100
    );
    points["cutonfoldVia1" + so.prefix] = points["cutonfoldFrom" + so.prefix]
      .shiftTowards(so.from, so.offset)
      .rotate(-90, points["cutonfoldFrom" + so.prefix]);
    points["cutonfoldVia2" + so.prefix] = points["cutonfoldTo" + so.prefix]
      .shiftTowards(so.to, so.offset)
      .rotate(90, points["cutonfoldTo" + so.prefix]);
    let text = so.grainline ? "cutOnFoldAndGrainline" : "cutOnFold";
    paths["cutonfold" + so.prefix] = new this.Path()
      .move(points["cutonfoldFrom" + so.prefix])
      .line(points["cutonfoldVia1" + so.prefix])
      .line(points["cutonfoldVia2" + so.prefix])
      .line(points["cutonfoldTo" + so.prefix])
      .attr("class", "note")
      .attr("marker-start", "url(#cutonfoldFrom)")
      .attr("marker-end", "url(#cutonfoldTo)")
      .attr("data-text", text)
      .attr("data-text-class", "center fill-note");
    */

    macro("title", {
      at: points.titleAnchor,
      title: "1x " + "cutOnFold" + " " + "fromFabric"
    });
    macro("grainline", {
      from: points.grainlineTop,
      to: points.grainlineBottom
    });

    points.scaleBox = points.logoAnchor.shift(270, 100);
    macro("scalebox", { at: points.scaleBox });

    snippets.logo = new Snippet("logo", points.logoAnchor);

    if (sa) {
      paths.sa = new Path()
        .move(points.lHem)
        .join(
          paths.bottom
            .join(paths.sideSeam)
            .join(paths.waistSA)
            .offset(sa)
        )
        .line(points.lWaist)
        .attr("class", "fabric sa");
    }

    if (paperless) {
      macro("hd", {
        from: points.lHem,
        to: points.rHem,
        y: points.rHem.y - options.paperlessOffset
      });
    }
  }

  return part;
}
