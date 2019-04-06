export default function(part) {
  let {
    paperless,
    sa,
    snippets,
    Snippet,
    utils,
    store,
    complete,
    points,
    measurements,
    options,
    macro,
    Point,
    paths,
    Path
  } = part.shorthand();

  // Give points their original names
  for (let i of store.get("side")) points[i] = points[i + "Rot2"].clone();

  // Clean up
  for (let i in paths) delete paths[i];
  for (let i in snippets) delete snippets[i];

  paths.saBase = new Path()
    .move(points.hem)
    .line(points.seat)
    .curve(points.seatCp2, points.waistCp1, points.waist)
    .curve_(points.waistCp2, points.armhole)
    .curve(points.armholeCp2, points.armholeHollowCp1, points.armholeHollow)
    .curve(points.armholeHollowCp2, points.armholePitchCp1, points.armholePitch)
    ._curve(points.bustPointCp1, points.bustPoint)
    .curve(points.bustPointCp2, points.psWaistCp1, points.psWaist)
    .line(points.psHem);
  paths.seam = paths.saBase
    .clone()
    .line(points.hem)
    .close()
    .attr("class", "fabric");

  if (complete) {
    points.title = points.psWaist.shiftFractionTowards(points.waist, 0.5);
    macro("title", {
      at: points.title,
      nr: "1b",
      title: "side"
    });

    points.logo = points.psHem.shiftFractionTowards(points.seat, 0.5);
    snippets.logo = new Snippet("logo", points.logo);

    points.grainlineFrom = points.psHem.shiftFractionTowards(points.hem, 0.5);
    points.grainlineTo = new Point(
      points.grainlineFrom.x,
      points.armholePitchCp1.y
    );
    macro("grainline", {
      from: points.grainlineFrom,
      to: points.grainlineTo
    });

    if (sa) {
      paths.sa = paths.saBase
        .offset(sa)
        .line(points.psHem.shift(-90, 3 * sa).shift(180, sa))
        .line(points.hem.shift(-90, 3 * sa).shift(0, sa))
        .close()
        .attr("class", "fabric sa");
    }
  }

  return part;
}
