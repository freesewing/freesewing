export default function(part) {
  let {
    macro,
    options,
    Point,
    Path,
    points,
    paths,
    snippets,
    Snippet,
    complete,
    paperless
  } = part.shorthand();

  let colors = [
    "fabric",
    "lining",
    "interfacing",
    "canvas",
    "various",
    "mark",
    "contrast",
    "note"
  ];
  let sizes = ["xs", "sm", "", "l", "xl"];
  let utility = ["dotted", "dashed", "lashed", "sa", "help", "hidden"];

  let y = 0;
  let w = options.width;
  macro("hd", {
    from: new Point(0, y),
    to: new Point(w, y)
  });
  for (let i in colors) {
    y += 15;
    points["l" + i] = new Point(0, y);
    points["r" + i] = new Point(w, y);
    paths["heading" + i] = new Path()
      .move(points["l" + i])
      .line(points["r" + i])
      .attr("class", colors[i])
      .attr("data-text", colors[i]);
    for (let j in sizes) {
      y += 10;
      points["sl" + i + j] = new Point(0, y);
      points["sr" + i + j] = new Point(w, y);
      paths["size" + i + j] = new Path()
        .move(points["sl" + i + j])
        .line(points["sr" + i + j])
        .attr("class", colors[i])
        .attr("class", "stroke-" + sizes[j])
        .attr(
          "data-text",
          "path." + colors[i] + (sizes[j] === "" ? "" : ".stroke-" + sizes[j])
        )
        .attr("data-text-class", "center");
    }
    for (let j in utility) {
      y += 10;
      points["ul" + i + j] = new Point(0, y);
      points["ur" + i + j] = new Point(w, y);
      paths["util" + i + j] = new Path()
        .move(points["ul" + i + j])
        .line(points["ur" + i + j])
        .attr("class", colors[i])
        .attr("class", utility[j])
        .attr("data-text", "path." + colors[i] + "." + utility[j])
        .attr("data-text-class", "center");
    }
  }

  y += 10;
  points.ftl = new Point(0, y);
  points.ftr = new Point(w, y);
  paths.snip = new Path()
    .move(points.ftl)
    .line(points.ftr)
    .attr("data-text", "fill");
  y += 15;
  for (let i of colors) {
    let h = 10;
    points["_bl" + i] = new Point(0, y);
    points["_br" + i] = new Point(w, y);
    points["_tr" + i] = new Point(w, y - h);
    points["_tl" + i] = new Point(0, y - h);
    paths["box" + i] = new Path()
      .move(points["_bl" + i])
      .line(points["_br" + i])
      .line(points["_tr" + i])
      .line(points["_tl" + i])
      .close()
      .attr("class", i)
      .attr("class", "fill-" + i)
      .attr("data-text", ".fill-" + i);
    if (i === "fabric") paths["box" + i].attr("data-text-class", "fill-canvas");
    y += h * 1.2;
  }

  let text = ["xs", "sm", "", "l", "xl", "xxl"];
  y += 10;
  points.tl = new Point(0, y);
  points.tr = new Point(w, y);
  paths.text = new Path()
    .move(points.tl)
    .line(points.tr)
    .attr("data-text", "text");
  y += 10;
  points.tlc = new Point(0, y);
  points.trc = new Point(w, y);
  paths.textc = new Path()
    .move(points.tlc)
    .line(points.trc)
    .attr("data-text", "text.center")
    .attr("data-text-class", "center");
  y += 10;
  points.tlr = new Point(0, y);
  points.trr = new Point(w, y);
  paths.textr = new Path()
    .move(points.tlr)
    .line(points.trr)
    .attr("data-text", "text.right")
    .attr("data-text-class", "right");
  for (let i in text) {
    y += 15;
    points["t" + i] = new Point(0, y)
      .attr("data-text", "text" + text[i] === "" ? "" : ".text-" + text[i])
      .attr("data-text-class", "text-" + text[i]);
  }
  let snips = {
    logo: 25,
    notch: 15,
    bnotch: 15,
    button: 15,
    buttonhole: 15
  };
  y += 10;
  points.tl = new Point(0, y);
  points.tr = new Point(w, y);
  paths.texts = new Path()
    .move(points.tl)
    .line(points.tr)
    .attr("data-text", "snippets");
  y += 10;
  points["sl1"] = new Point(w * 0.25, y);
  points["sl2"] = new Point(w * 0.5, y);
  points["sl3"] = new Point(w * 0.75, y);
  points["sl1"]
    .attr("data-text", "data-scale: 1\ndata-rotate: 0")
    .attr("data-text-class", "center text-sm")
    .attr("data-text-lineheight", 5);
  points["sl2"]
    .attr("data-text", "data-scale: 1.25\ndata-rotate: 0")
    .attr("data-text-class", "center text-sm")
    .attr("data-text-lineheight", 5);
  points["sl3"]
    .attr("data-text", "data-scale: 0.75\ndata-rotate: 90")
    .attr("data-text-class", "center text-sm")
    .attr("data-text-lineheight", 5);
  y += 55;
  for (let i in snips) {
    points["snt" + i] = new Point(0, y);
    points["snt" + i].attr("data-text", i);
    points["sn1" + i] = new Point(w * 0.25, y);
    points["sn2" + i] = new Point(w * 0.5, y);
    points["sn3" + i] = new Point(w * 0.75, y);
    snippets["sn1" + i] = new Snippet(i, points["sn1" + i]);
    snippets["sn2" + i] = new Snippet(i, points["sn2" + i]);
    snippets["sn2" + i].attr("data-scale", 1.25);
    snippets["sn3" + i] = new Snippet(i, points["sn3" + i]);
    snippets["sn3" + i].attr("data-scale", 0.75).attr("data-rotate", 90);
    y += snips[i];
  }

  y += 10;
  points.ml = new Point(0, y);
  points.mr = new Point(w, y);
  paths.macros = new Path()
    .move(points.ml)
    .line(points.mr)
    .attr("data-text", "macros");

  y += 40;
  macro("title", {
    at: new Point(w / 2, y),
    nr: 5,
    title: "title"
  });

  y += 40;
  macro("grainline", {
    from: new Point(0, y),
    to: new Point(w, y)
  });

  y += 20;
  macro("cutonfold", {
    from: new Point(w, y),
    to: new Point(0, y)
  });

  y += 70;
  points.dimf = new Point(20, y);
  points.dimt = new Point(w - 20, y + 120);
  points.dimv = new Point(20, y + 80);
  paths.dims = new Path().move(points.dimf)._curve(points.dimv, points.dimt);
  macro("hd", {
    from: points.dimf,
    to: points.dimt,
    text: "hd",
    y: y - 15
  });
  macro("vd", {
    from: points.dimt,
    to: points.dimf,
    text: "vd",
    x: 0
  });
  macro("ld", {
    from: points.dimf,
    to: points.dimt,
    text: "ld"
  });
  macro("pd", {
    path: paths.dims,
    text: "pd",
    d: 10
  });

  y += 170;
  macro("scalebox", {
    at: new Point(w / 2, y)
  });

  // Make sure nothing is cut off
  paths.box = new Path()
    .move(new Point(-10, -10))
    .line(new Point(w + 10, y + 10))
    .attr("class", "hidden");

  // Complete?
  if (complete) {
  }

  // Paperless?
  if (paperless) {
  }

  return part;
}
