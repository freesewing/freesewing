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

  // Remove from here
  //options.bowStyle = 'butterfly';
  //options.bowStyle = 'square';
  //options.bowStyle = 'widesquare';
  //options.bowStyle = 'diamond';
  //options.endStyle = 'straight' ;
  //options.endStyle = 'rounded' ;
  //options.endStyle = 'pointed' ;

  //final = true;
  //paperless = true;
  //sa = 10;
  // Remove to here

  if (options.bowStyle == "square") options.tipWidth = options.knotWidth;

  let backWidth = 24;
  let bandLength = 70;
  let transitionLength = 50;
  let halfBackWidth = backWidth / 2;
  let halfTipWidth = options.tipWidth / 2;
  let halfBowLength = options.bowLength / 2;
  let halfKnotWidth = options.knotWidth / 2;

  console.log(options.bowStyle);
  console.log(options.knotWidth);

  let butterfly =
    options.bowStyle == "butterfly" || options.bowStyle == "diamond";

  let tipAdjustment = 0;
  switch (options.endStyle) {
    case "pointed":
      tipAdjustment = halfTipWidth / 1.3;
      break;
    case "rounded":
      tipAdjustment = halfTipWidth;
      break;
  }

  let hhbl /*halfHalfBowLength */ = halfBowLength / 2;
  let bcAdjust = options.bowStyle == "diamond" ? 10 : hhbl - 5;

  let tieStart = new Path();
  let tieLowKnot = new Path();
  let tieTip = new Path();
  let tieTopKnot = new Path();
  let tieEnd = new Path();

  points.Origin = new Point(0, 0);

  points.LowBandEdge = points.Origin.shift(-90, halfBackWidth);
  points.LowKnotEdge = points.Origin.shift(-90, halfKnotWidth);
  points.LowTipEdge = points.Origin.shift(-90, halfTipWidth);

  points.LowBandStart = points.LowBandEdge.clone();
  points.LowBandEnd = points.LowBandEdge.shift(0, bandLength);
  points.LowTransitionEnd = points.LowKnotEdge.shift(
    0,
    bandLength + transitionLength
  );

  console.log(points["LowBandEdge"].x);

  tieStart
    .move(points.Origin)
    .line(points.LowBandStart)
    .line(points.LowBandEnd)
    .line(points.LowTransitionEnd);

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
