function FlipAllPointsY(points, mirror, start, end) {
  for (var point in points) {
    if (point.substr(0, start.length) == start) {
      console.log(points[point]);
      points[end + point.substr(start.length)] = points[point].flipY(mirror);
    }
  }
}

export default function(part) {
  let {
    store,
    sa,
    Point,
    points,
    Path,
    paths,
    Snippet,
    snippets,
    options,
    measurements,
    final,
    paperless,
    macro
  } = part.shorthand();

  if (options.bowStyle === "square") options.tipWidth = options.knotWidth;

  for (let option of [
    "ribbonWidth",
    "bandLength",
    "tipWidth",
    "knotWidth",
    "bowLength",
    "collarEase"
  ])
    store.set(option, measurements.neckCircumference * options[option]);

  // For easy access
  const knot = store.get("knotWidth");
  const ribbon = store.get("ribbonWidth");
  const tip = store.get("tipWidth");
  const band = store.get("bandLength");
  const transition = band * options.transitionLength;
  const bow = store.get("bowLength");

  // Points
  points.bandTopLeft = new Point(0, ribbon / -2);
  points.bandBottomLeft = points.bandTopLeft.flipY();
  points.bandTopRight = points.bandTopLeft.shift(0, band);
  points.bandBottomRight = points.bandTopRight.flipY();

  points.transitionTopRight = new Point(band + transition, knot / -2);
  points.transitionBottomRight = points.transitionTopRight.flipY();

  points.tip1Top = new Point(band + transition + 0.5 * bow, tip / -2);
  points.tip1Bottom = points.tip1Top.flipY();
  points.tip2Top = new Point(band + transition + 1.5 * bow, tip / -2);
  points.tip2Bottom = points.tip2Top.flipY();
  points.knotTop = new Point(band + transition + bow, knot / -2);
  points.knotBottom = points.knotTop.flipY();

  if (options.endStyle === "pointed" || options.endStyle === "rounded") {
    points.tip = new Point(points.tip2Bottom.x + points.tip2Bottom.y, 0);
  } else points.tip = new Point(points.tip2Bottom.x, 0);

  if (options.bowStyle === "diamond" || options.bowStyle === "butterfly") {
    const cpl = options.bowStyle === "diamond" ? bow / 10 : bow / 4;

    points.transitionBottomRightCp1 = points.bandBottomRight.shiftOutwards(
      points.transitionBottomRight,
      cpl
    );
    points.transitionTopRightCp2 = points.transitionBottomRightCp1.flipY();
    points.tip1TopCp2 = points.tip1Top.shift(180, cpl);
    points.tip1TopCp1 = points.tip1Top.shift(0, cpl);
    points.tip1BottomCp1 = points.tip1Bottom.shift(180, cpl);
    points.tip1BottomCp2 = points.tip1Bottom.shift(0, cpl);
    points.knotTopCp2 = points.knotTop.shift(180, cpl);
    points.knotTopCp1 = points.knotTop.shift(0, cpl);
    points.knotBottomCp2 = points.knotBottom.shift(0, cpl);
    points.knotBottomCp1 = points.knotBottom.shift(180, cpl);
    points.tip2TopCp2 = points.tip2Top.shift(180, cpl);
    points.tip2BottomCp1 = points.tip2Bottom.shift(180, cpl);
  }

  paths.test = new Path()
    .move(points.bandTopLeft)
    .line(points.bandTopRight)
    .line(points.transitionTopRight)
    .line(points.tip2Top)
    .line(points.tip)
    .line(points.tip2Bottom)
    .line(points.transitionBottomRight)
    .line(points.bandBottomRight)
    .line(points.bandBottomLeft)
    .line(points.bandTopLeft)
    .close();

  return part;

  let butterfly =
    options.bowStyle == "butterfly" || options.bowStyle == "diamond";
  //const bcAdjust = options.bowStyle == "diamond" ? 10 : hhbl - 5;

  points.LowTip = points.LowTipEdge.shift(
    0,
    bandLength + transitionLength + halfBowLength * 3
  );
  points.Tip = points.Origin.shift(
    0,
    bandLength + transitionLength + halfBowLength * 3 + tipAdjustment
  );

  if (butterfly) {
    points.LowTransitionEndCp2 = points.LowBandEnd.shiftOutwards(
      points.LowTransitionEnd,
      bcAdjust
    );
    points.LowHump = points.LowTipEdge.shift(
      0,
      bandLength + transitionLength + halfBowLength
    );
    points.LowHumpCp1 = points.LowHump.shift(180, bcAdjust);
    points.LowHumpCp2 = points.LowHump.shift(0, bcAdjust);
    points.LowValley = points.LowKnotEdge.shift(
      0,
      bandLength + transitionLength + halfBowLength * 2
    );
    points.LowValleyCp1 = points.LowValley.shift(180, bcAdjust);
    points.LowValleyCp2 = points.LowValley.shift(0, bcAdjust);
    points.LowTipCp1 = points.LowTip.shift(180, bcAdjust);
  }

  points.LowTipCp2 = points.LowTip.shiftTowards(
    points.LowTipEdge,
    -tipAdjustment
  );
  points.TipCp1 = points.Tip.shift(-90, halfTipWidth / 4);
  points.TipCp2 = points.Tip.shift(90, halfTipWidth / 4);

  FlipAllPointsY(points, points.Origin, "Low", "Top");

  if (options.endStyle == "rounded") {
    tieTip
      .move(points.LowTip)
      .curve(points.LowTipCp2, points.TipCp1, points.Tip)
      .curve(points.TipCp2, points.TopTipCp2, points.TopTip);
  } else {
    tieTip
      .move(points.LowTip)
      .line(points.Tip)
      .line(points.TopTip);
  }

  if (butterfly) {
    tieLowKnot
      .move(points.LowTransitionEnd)
      .curve(points.LowTransitionEndCp2, points.LowHumpCp1, points.LowHump)
      .curve(points.LowHumpCp2, points.LowValleyCp1, points.LowValley)
      .curve(points.LowValleyCp2, points.LowTipCp1, points.LowTip);
    tieTopKnot = tieTopKnot
      .move(points.TopTransitionEnd)
      .curve(points.TopTransitionEndCp2, points.TopHumpCp1, points.TopHump)
      .curve(points.TopHumpCp2, points.TopValleyCp1, points.TopValley)
      .curve(points.TopValleyCp2, points.TopTipCp1, points.TopTip)
      .reverse();
  }

  tieEnd
    .move(points.TopTransitionEnd)
    .line(points.TopBandEnd)
    .line(points.TopBandStart)
    .line(points.Origin);

  paths.tie = new Path()
    .move(points.Origin)
    .join(tieStart)
    .join(tieLowKnot)
    .join(tieTip)
    .join(tieTopKnot)
    .join(tieEnd)
    .close()
    .attr("class", "fabric");

  // Final?
  if (final) {
    points.grainlineLeft = points.Origin.shift(0, 30);
    points.grainlineRight = points.Origin.shift(
      0,
      bandLength + transitionLength
    );
    macro("grainline", {
      from: points.grainlineLeft,
      to: points.grainlineRight
    });

    points.titleAnchor = points.Origin.shift(
      0,
      bandLength + transitionLength + halfBowLength + 6
    );
    macro("title", { at: points.titleAnchor, nr: 1, title: "Bow Tie" });

    if (!paperless) {
      let scaleboxAnchor = points.LowTipEdge.shift(-90, 30).shift(0, 50);
      macro("scalebox", { at: scaleboxAnchor });
    }

    let logoAnchor = points.Tip.shift(0, 40);
    snippets.logo = new Snippet("logo", logoAnchor);

    // Dummy line
    let h1 = logoAnchor.shift(0, 50);
    let h2 = h1.shift(0, 1);

    paths.hidden = new Path()
      .move(h1)
      .line(h2)
      .attr("class", "hidden");
  }

  if (sa) {
    paths.sa = paths.tie.offset(sa).attr("class", "fabric sa");
  }

  // Paperless?
  if (paperless) {
    macro("hd", {
      from: points.LowBandStart,
      to: points.LowBandEnd,
      y: points.LowBandEdge.y + 15
    });
    macro("hd", {
      from: points.LowBandEnd,
      to: points.LowTransitionEnd,
      y: points.LowBandEdge.y + 15
    });
    macro("vd", {
      from: points.LowBandStart,
      to: points.TopBandStart,
      x: points.LowBandStart.x - 15
    });
    macro("vd", {
      from: points.LowTip,
      to: points.TopTip,
      x: points.Tip.x + 15
    });

    if (butterfly) {
      macro("hd", {
        from: points.LowTransitionEnd,
        to: points.LowHump,
        y: points.LowTip.y + 15
      });
      macro("hd", {
        from: points.LowHump,
        to: points.LowValley,
        y: points.LowTip.y + 15
      });
      macro("hd", {
        from: points.LowValley,
        to: points.LowTip,
        y: points.LowTip.y + 15
      });

      //macro('vd', { from: points.LowTransitionEnd, to: points.TopTransitionEnd, x: points.LowTransitionEnd.x });
      macro("vd", {
        from: points.LowHump,
        to: points.TopHump,
        x: points.LowHump.x
      });
      macro("vd", {
        from: points.LowValley,
        to: points.TopValley,
        x: points.LowValley.x
      });
    } else {
      if (options.bowStyle == "widesquare") {
        macro("vd", {
          from: points.LowTransitionEnd,
          to: points.TopTransitionEnd,
          x: points.LowTransitionEnd.x
        });
      }
      macro("hd", {
        from: points.LowTransitionEnd,
        to: points.LowTip,
        y: points.LowTip.y + 15
      });
    }

    if (tipAdjustment) {
      macro("hd", {
        from: points.LowTip,
        to: points.Tip,
        y: points.LowTip.y + 15
      });
    }
  }

  return part;
}
