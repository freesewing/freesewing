export const calculateReduction = function(part) {
  let { store, measurements, options } = part.shorthand();
  if (store.get("reduction") === true) return;

  let chest = measurements.chestCircumference * (1 + options.chestEase);
  let waist = measurements.naturalWaist * (1 + options.waistEase);
  let hips = measurements.hipsCircumference * (1 + options.hipsEase);
  let waistReduction = chest - waist;
  let hipsReduction = chest - hips;

  // If your waist > chest, this pattern is not going to work for you as-is.
  if (waistReduction < 0) waistReduction = 0;
  if (hipsReduction < 0) hipsReduction = 0;
  store.set("waistReduction", waistReduction);
  store.set("hipsReduction", hipsReduction);
  store.set("reduction", true);
};

export const addButtons = function(
  part,
  origin = "cfNeck",
  snippet = "button"
) {
  let { points, options, snippets, Snippet } = part.shorthand();
  let len = points.cfNeck.dist(points.cfHips) * (1 - options.buttonFreeLength);
  for (let i = 1; i <= options.buttons; i++) {
    points["button" + i] = points[origin].shift(
      -90,
      (len / options.buttons) * i
    );
    snippets[snippet + i] = new Snippet(snippet, points["button" + i]);
  }
  if (options.extraTopButton === "yes")
    snippets["top" + snippet] = new Snippet(
      snippet,
      points[origin].shift(-90, len / options.buttons / 2)
    );
};

export const addButtonHoles = (part, origin) =>
  addButtons(part, origin, "buttonhole");

export const draftBarrelCuff = part => {
  let { store, points, measurements, options, Point } = part.shorthand();
  let height = measurements.shoulderToWrist * options.cuffLength;
  let width =
    measurements.wristCircumference *
    (1 + options.cuffEase + options.cuffOverlap + options.cuffDrape);
  store.set("cuffHeight", height);
  points.topLeft = new Point(0, 0);
  points.topRight = new Point(width, 0);
  points.bottomLeft = new Point(0, height);
  points.bottomRight = new Point(width, height);

  return part;
};

export const decorateBarrelCuff = part => {
  let {
    macro,
    snippets,
    Snippet,
    points,
    measurements,
    options,
    Point
  } = part.shorthand();
  // Title
  points.title = new Point(points.bottomRight.x / 2, points.bottomRight.y / 2);
  macro("title", {
    nr: 10,
    title: "cuff",
    at: points.title,
    scale: 0.8
  });

  // Button and buttonhole
  let margin = measurements.wristCircumference * options.cuffOverlap;
  points.buttonLineTop = points.topRight.shift(180, margin / 2);
  points.buttonLineBottom = points.bottomRight.shift(180, margin / 2);
  points.buttonholeLineTop = points.topLeft.shift(0, margin / 2);
  points.buttonholeLineBottom = points.bottomLeft.shift(0, margin / 2);

  for (let i = 1; i <= options.cuffButtonRows; i++) {
    points["button" + i] = points.buttonLineTop.shiftFractionTowards(
      points.buttonLineBottom,
      (1 / (options.cuffButtonRows + 1)) * i
    );
    snippets["button" + i] = new Snippet("button", points["button" + i]);
    points["buttonhole" + i] = new Point(
      points.buttonholeLineTop.x,
      points["button" + i].y
    );
    snippets["buttonhole" + i] = new Snippet(
      "buttonhole",
      points["buttonhole" + i]
    ).attr("data-rotate", 90);
    if (options.barrelcuffNarrowButton === "yes") {
      points["narrowButton" + i] = points["button" + i].shift(180, margin);
      snippets["narrowButton" + i] = new Snippet(
        "button",
        points["narrowButton" + i]
      );
    }
  }

  return part;
};

export const draftFrenchCuff = part => {
  let { store, points, measurements, options, Point } = part.shorthand();
  let margin = measurements.wristCircumference * options.cuffOverlap;
  let height = measurements.shoulderToWrist * options.cuffLength;
  let width =
    measurements.wristCircumference *
      (1 + options.cuffEase + options.cuffOverlap + options.cuffDrape) +
    margin / 2;
  store.set("cuffHeight", height);
  points.topLeft = new Point(0, 0);
  points.topRight = new Point(width, 0);
  points.midLeft = new Point(0, height);
  points.midRight = new Point(width, height);
  points.bottomLeft = new Point(0, height * 2);
  points.bottomRight = new Point(width, height * 2);

  return part;
};

export const decorateFrenchCuff = part => {
  let {
    macro,
    snippets,
    Snippet,
    points,
    measurements,
    options,
    Point
  } = part.shorthand();
  // Title
  points.title = new Point(points.bottomRight.x / 2, points.bottomRight.y / 2);
  macro("title", {
    nr: 10,
    title: "cuff",
    at: points.title,
    scale: 0.8
  });

  // Buttonholes
  let margin = measurements.wristCircumference * options.cuffOverlap;
  points.buttonLineTop = points.topRight.shift(180, margin * 0.75);
  points.buttonLineBottom = points.bottomRight.shift(180, margin * 0.75);
  points.buttonholeLineTop = points.topLeft.shift(0, margin * 0.75);
  points.buttonholeLineBottom = points.bottomLeft.shift(0, margin * 0.75);

  points.button1 = points.buttonLineTop.shiftFractionTowards(
    points.buttonLineBottom,
    0.2
  );
  points.button2 = points.buttonLineTop.shiftFractionTowards(
    points.buttonLineBottom,
    0.8
  );
  points.button3 = points.buttonholeLineTop.shiftFractionTowards(
    points.buttonholeLineBottom,
    0.2
  );
  points.button4 = points.buttonholeLineTop.shiftFractionTowards(
    points.buttonholeLineBottom,
    0.8
  );
  snippets.buttonhole1 = new Snippet("buttonhole", points.button1).attr(
    "data-rotate",
    90
  );
  snippets.buttonhole2 = new Snippet("buttonhole", points.button2).attr(
    "data-rotate",
    90
  );
  snippets.buttonhole3 = new Snippet("buttonhole", points.button3).attr(
    "data-rotate",
    90
  );
  snippets.buttonhole4 = new Snippet("buttonhole", points.button4).attr(
    "data-rotate",
    90
  );

  return part;
};
