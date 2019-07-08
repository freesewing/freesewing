export default function(part) {
  let {
    complete,
    macro,
    points,
    paths,
    snippets,
    Snippet,
    sa
  } = part.shorthand();

  paths.seam.render = true;

  if (complete) {
    if (sa) paths.sa.render = true;
    macro("title", {
      at: points.titleAnchor,
      nr: 1,
      title: "bowTie",
      scale: 0.8
    });
    points.scaleboxAnchor = points.bandTopLeft.shift(30, 80);
    macro("scalebox", { at: points.scaleboxAnchor });
  }

  return part;
}
