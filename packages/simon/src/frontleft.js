import frontLeftClassicSeperate from "./frontleft-classic-seperate";
import frontLeftClassicCuton from "./frontleft-classic-cuton";
import frontLeftSeamless from "./frontleft-seamless";

export default part => {
  let {
    sa,
    options,
    complete,
    paperless,
    points,
    macro,
    Path
  } = part.shorthand();

  if (complete && paperless) {
    macro("ld", {
      from: points.neck,
      to: points.shoulder,
      d: 15 + sa
    });
    macro("pd", {
      path: new Path()
        .move(points.armholePitch)
        .curve(points.armholePitchCp2, points.shoulderCp1, points.shoulder),
      d: -15
    });
    macro("vd", {
      from: points.armhole,
      to: points.armholePitch,
      x: points.armhole.x + 15 + sa * 2
    });
    macro("vd", {
      from: points.armhole,
      to: points.shoulder,
      x: points.armhole.x + 30 + sa * 2
    });
    macro("vd", {
      from: points.armhole,
      to: points.neck,
      x: points.armhole.x + 45 + sa * 2
    });
    macro("vd", {
      from: points.waist,
      to: points.armhole,
      x: points.armhole.x + 15 + sa * 2
    });
    macro("vd", {
      from: points.hips,
      to: points.armhole,
      x: points.armhole.x + 30 + sa * 2
    });
    if (options.hemStyle === "baseball") {
      macro("vd", {
        from: points.bballStart,
        to: points.bballEnd,
        x: points.hips.x + 15 + 2 * sa
      });
      macro("vd", {
        from: points.bballStart,
        to: points.hips,
        x: points.hips.x + 30 + 2 * sa
      });
      macro("vd", {
        from: points.bballStart,
        to: points.armhole,
        x: points.hips.x + 45 + 2 * sa
      });
      macro("vd", {
        from: points.bballStart,
        to: points.neck,
        x: points.hips.x + 60 + 2 * sa
      });
      macro("hd", {
        from: points.bballStart,
        to: points.bballEnd,
        y: points.bballStart.y + 15 + 3 * sa
      });
    } else if (options.hemStyle === "slashed") {
      macro("vd", {
        from: points.slashEnd,
        to: points.slashStart,
        x: points.hips.x + 15 + 3 * sa
      });
      macro("vd", {
        from: points.slashEnd,
        to: points.hips,
        x: points.hips.x + 30 + 3 * sa
      });
      macro("vd", {
        from: points.slashEnd,
        to: points.armhole,
        x: points.hips.x + 45 + 3 * sa
      });
      macro("vd", {
        from: points.slashEnd,
        to: points.neck,
        x: points.hips.x + 60 + 3 * sa
      });
    } else {
      macro("vd", {
        from: points.hem,
        to: points.armhole,
        x: points.armhole.x + 45 + 2 * sa
      });
      macro("vd", {
        from: points.hem,
        to: points.neck,
        x: points.armhole.x + 60 + 2 * sa
      });
    }
  }

  return options.buttonholePlacketStyle === "seamless"
    ? frontLeftSeamless(part)
    : options.buttonholePlacketType === "seperate"
    ? frontLeftClassicSeperate(part)
    : frontLeftClassicCuton(part);
};
