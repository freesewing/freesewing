export default function(part) {
  let {
    options,
    measurements,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete,
    sa,
    paperless,
    macro
  } = part.shorthand();

  let frontPocketSize = options.frontPocketSize * measurements.seatDepth;
  let backPocketSize = options.backPocketSize * measurements.seatDepth;

  points.frontTL = new Point(0, 0);
  points.frontTR = points.frontTL.shift(0, frontPocketSize + 24);
  points.frontBL = points.frontTL.shift(270, frontPocketSize / 2);
  points.frontBR = points.frontTR.shift(270, frontPocketSize / 2);

  points.backTL = points.frontBL.shift(270, 50);
  points.backTR = points.backTL.shift(0, backPocketSize + 24);
  points.backBL = points.backTL.shift(270, backPocketSize / 2);
  points.backBR = points.backTR.shift(270, backPocketSize / 2);

  paths.frontSeam = new Path()
    .move(points.frontTL)
    .line(points.frontBL)
    .line(points.frontBR)
    .line(points.frontTR)
    .line(points.frontTL)
    .close()
    .attr("class", "fabric");
  paths.backSeam = new Path()
    .move(points.backTL)
    .line(points.backBL)
    .line(points.backBR)
    .line(points.backTR)
    .line(points.backTL)
    .close()
    .attr("class", "fabric");

  // Complete?
  if (complete) {
    points.frontTitle = points.frontTL.shift(270, 15).shift(0, 50);
    macro("title", {
      at: points.frontTitle.shift(0,30),
      title: "1x fromFabric"
    });
    points.frontLogo = points.frontTitle.shift(270, 15);
    snippets.frontLogo = new Snippet("logo", points.frontLogo).attr("data-scale", 0.4);
    points.frontText = points.frontLogo
      .shift(-90, 25)
      .attr("data-text", "Waralee")
      .attr("data-text-class", "center");

    points.backTitle = points.backTL.shift(270, 15).shift(0, 50);
    macro("title", {
      at: points.backTitle.shift(0,30),
      title: "1x fromFabric"
    });
    points.backLogo = points.backTitle.shift(270, 15);
    snippets.backLogo = new Snippet("logo", points.backLogo).attr("data-scale", 0.4);
    points.backText = points.backLogo
      .shift(-90, 25)
      .attr("data-text", "Waralee")
      .attr("data-text-class", "center");
  }

  // Paperless?
  if (paperless) {
    macro("hd", {
      from: points.frontTL,
      to: points.frontTR,
      y: points.frontTL.y + 15
    });
    macro("hd", {
      from: points.backTL,
      to: points.backTR,
      y: points.backTL.y + 15
    });
    macro("vd", {
      from: points.frontTL,
      to: points.frontBL,
      x: points.frontTL.x + 15
    });
    macro("vd", {
      from: points.backTL,
      to: points.backBL,
      x: points.backTL.x + 15
    });
  }

  return part;
}
